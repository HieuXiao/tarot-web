const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const { createClient } = require("redis");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const { CARD_MEANINGS, CARD_IMAGES } = require("./tarotData");

const app = express();
const PORT = 3002;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const SESSION_SECRET = process.env.SESSION_SECRET || "change-me-in-production";
const CROSS_SITE_COOKIE = process.env.CROSS_SITE_COOKIE === "true";
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const SESSION_PREFIX = process.env.SESSION_PREFIX || "mystic:";

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on("error", (error) => {
  console.error("Redis client error:", error);
});

const redisStore = new RedisStore({
  client: redisClient,
  prefix: SESSION_PREFIX,
});

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    name: "mystic.sid",
    secret: SESSION_SECRET,
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: CROSS_SITE_COOKIE ? "none" : "lax",
      secure: CROSS_SITE_COOKIE,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// --- Swagger Configuration ---
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tarot API",
      version: "1.0.0",
      description: "API for shuffling and drawing Tarot cards with meanings",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: [path.join(__dirname, "index.js")],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.get("/ping", (req, res) => res.send("pong"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- Helper: Fisher-Yates shuffle ---
function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// --- Helper: build card objects from imgSrc array ---
function buildDeck(imgSrcArray) {
  return imgSrcArray.map((imgSrc, index) => ({
    id: `${imgSrc}-${index}-${Date.now()}`,
    imgSrc,
    isReversed: Math.random() < 0.5,
    flipped: false,
  }));
}

function getSessionDeck(req) {
  return Array.isArray(req.session.deck) ? req.session.deck : null;
}

function ensureSessionDeck(req) {
  const existingDeck = getSessionDeck(req);
  if (existingDeck) return existingDeck;

  const cards = buildDeck(shuffleArray(CARD_IMAGES));
  req.session.deck = cards;
  return cards;
}

function getMeaningByImgSrc(imgSrc) {
  const cardFile = String(imgSrc).split("/").pop() || "";
  return CARD_MEANINGS[cardFile] || null;
}

function sampleWithoutReplacement(items, count) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

/**
 * @openapi
 * /api/shuffle:
 *   get:
 *     summary: Returns a full shuffled deck of 78 tarot cards.
 *     responses:
 *       200:
 *         description: A JSON array of tarot card objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       imgSrc:
 *                         type: string
 *                       isReversed:
 *                         type: boolean
 *                       flipped:
 *                         type: boolean
 */
app.get("/api/shuffle", (_req, res) => {
  const shuffledImages = shuffleArray(CARD_IMAGES);
  const cards = buildDeck(shuffledImages);
  _req.session.deck = cards;
  res.json({ cards });
});

app.get("/api/current-state", (req, res) => {
  const cards = getSessionDeck(req);
  if (!cards) {
    return res.json({ hasDeck: false, cards: [] });
  }

  return res.json({ hasDeck: true, cards });
});

/**
 * @openapi
 * /api/draw:
 *   get:
 *     summary: Returns the meaning and orientation for a specific card or a random one.
 *     parameters:
 *       - in: query
 *         name: imgSrc
 *         schema:
 *           type: string
 *         description: The path to the card image (e.g., Cards/00-TheFool.webp). If omitted, a random card is picked.
 *     responses:
 *       200:
 *         description: The card meaning and metadata.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meaning:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     upright:
 *                       type: string
 *                     reversed:
 *                       type: string
 *                     advice:
 *                       type: object
 *                       properties:
 *                         upright:
 *                           type: string
 *                         reversed:
 *                           type: string
 *                 isReversed:
 *                   type: boolean
 *                 imgSrc:
 *                   type: string
 *       404:
 *         description: Card image not found.
 */
app.get("/api/draw", (req, res) => {
  const deck = ensureSessionDeck(req);
  let { imgSrc } = req.query;

  if (!imgSrc) {
    const unflipped = deck.filter((card) => !card.flipped);
    if (unflipped.length === 0) {
      return res.status(400).json({ error: "No cards left to draw." });
    }
    const randomCard =
      unflipped[Math.floor(Math.random() * unflipped.length)];
    imgSrc = randomCard.imgSrc;
  }

  const deckIndex = deck.findIndex((card) => card.imgSrc === String(imgSrc));
  if (deckIndex === -1) {
    return res.status(404).json({ error: `Card not found in current deck: ${imgSrc}` });
  }

  const deckCard = deck[deckIndex];
  const meaning = getMeaningByImgSrc(deckCard.imgSrc);

  if (!meaning) {
    return res.status(404).json({ error: `Card meaning not found: ${deckCard.imgSrc}` });
  }

  if (!deckCard.flipped) {
    const flippedCount = deck.reduce((count, card) => count + (card.flipped ? 1 : 0), 0);
    deck[deckIndex] = {
      ...deckCard,
      flipped: true,
      flipOrder: flippedCount + 1,
    };
    req.session.deck = deck;
  }

  const updatedCard = deck[deckIndex];
  res.json({ meaning, isReversed: updatedCard.isReversed, imgSrc: updatedCard.imgSrc });
});

// --- Helper: draw multiple unique random cards ---
function drawRandomCardsFromSession(req, count) {
  const deck = ensureSessionDeck(req);
  const unflipped = deck.filter((card) => !card.flipped);

  if (unflipped.length < count) {
    return { error: `Not enough cards left. Remaining: ${unflipped.length}` };
  }

  const selected = sampleWithoutReplacement(unflipped, count);
  let flippedCount = deck.reduce((total, card) => total + (card.flipped ? 1 : 0), 0);

  const selectedImgSrcSet = new Set(selected.map((card) => card.imgSrc));
  const nextDeck = deck.map((card) => {
    if (!selectedImgSrcSet.has(card.imgSrc) || card.flipped) return card;
    flippedCount += 1;
    return {
      ...card,
      flipped: true,
      flipOrder: flippedCount,
    };
  });

  req.session.deck = nextDeck;

  const cards = selected.map((card) => ({
    meaning: getMeaningByImgSrc(card.imgSrc),
    isReversed: card.isReversed,
    imgSrc: card.imgSrc,
  }));

  return { cards };
}

/**
 * @openapi
 * /api/draw/two:
 *   get:
 *     summary: Returns 2 unique random cards with their meanings and orientations.
 *     responses:
 *       200:
 *         description: An array containing 2 card objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       meaning:
 *                         type: object
 *                       isReversed:
 *                         type: boolean
 *                       imgSrc:
 *                         type: string
 */
app.get("/api/draw/two", (_req, res) => {
  const result = drawRandomCardsFromSession(_req, 2);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  return res.json({ cards: result.cards });
});

/**
 * @openapi
 * /api/draw/three:
 *   get:
 *     summary: Returns 3 unique random cards with their meanings and orientations.
 *     responses:
 *       200:
 *         description: An array containing 3 card objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       meaning:
 *                         type: object
 *                       isReversed:
 *                         type: boolean
 *                       imgSrc:
 *                         type: string
 */
app.get("/api/draw/three", (_req, res) => {
  const result = drawRandomCardsFromSession(_req, 3);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  return res.json({ cards: result.cards });
});

async function startServer() {
  await redisClient.connect();
  console.log(`Redis connected at ${REDIS_URL}`);

  app.listen(PORT, () => {
    console.log(`\n🃏 Tarot API server running at http://localhost:${PORT}`);
    console.log(`   GET /api/shuffle  → returns shuffled 78-card deck`);
    console.log(`   GET /api/draw     → returns a card's meaning`);
    console.log(`   📚 Swagger UI available at http://localhost:${PORT}/api-docs\n`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
