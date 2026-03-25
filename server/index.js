const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const { CARD_MEANINGS, CARD_IMAGES } = require("./tarotData");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

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
  res.json({ cards });
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
  let { imgSrc } = req.query;

  if (!imgSrc) {
    // Pick random card
    const randomFile =
      CARD_IMAGES[Math.floor(Math.random() * CARD_IMAGES.length)];
    imgSrc = randomFile;
  }

  // imgSrc may be full path like "Cards/00-TheFool.webp" — extract filename only
  const cardFile = String(imgSrc).split("/").pop() || "";
  const meaning = CARD_MEANINGS[cardFile];

  if (!meaning) {
    return res.status(404).json({ error: `Card not found: ${cardFile}` });
  }

  const isReversed = Math.random() < 0.5;
  res.json({ meaning, isReversed, imgSrc });
});

// --- Helper: draw multiple unique random cards ---
function drawRandomCards(count) {
  const shuffled = shuffleArray(CARD_IMAGES);
  return shuffled.slice(0, count).map((imgSrc) => {
    const cardFile = String(imgSrc).split("/").pop() || "";
    const meaning = CARD_MEANINGS[cardFile];
    return {
      meaning,
      isReversed: Math.random() < 0.5,
      imgSrc,
    };
  });
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
  const cards = drawRandomCards(2);
  res.json({ cards });
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
  const cards = drawRandomCards(3);
  res.json({ cards });
});


app.listen(PORT, () => {
  console.log(`\n🃏 Tarot API server running at http://localhost:${PORT}`);
  console.log(`   GET /api/shuffle  → returns shuffled 78-card deck`);
  console.log(`   GET /api/draw     → returns a card's meaning`);
  console.log(`   📚 Swagger UI available at http://localhost:${PORT}/api-docs\n`);
});
