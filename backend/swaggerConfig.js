import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Your API description",
    },
  },
  // Path to the API docs
  apis: ["./src/routes/mongoDB/contactRoutes.js"], // Adjust the path to where your route files are
};
function swaggerDocs(app, port) {
  const dbContext = process.env.DB_CONTEXT;
  if (!!dbContext && dbContext == "postgreSQL") {
    swaggerOptions.apis = ["./src/routes/postgreSQL/contactRoutes.js"];
  }
  const swaggerSpec = swaggerJsDoc(swaggerOptions);
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
export default swaggerDocs;
