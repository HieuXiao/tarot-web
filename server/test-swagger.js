const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

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
        url: `http://localhost:3001`,
      },
    ],
  },
  apis: [path.join(__dirname, "index.js")],
};

try {
    const swaggerDocs = swaggerJsdoc(swaggerOptions);
    console.log("Swagger Docs generated successfully:");
    console.log(JSON.stringify(swaggerDocs, null, 2).substring(0, 500) + "...");
} catch (err) {
    console.error("Error generating Swagger Docs:", err);
}
