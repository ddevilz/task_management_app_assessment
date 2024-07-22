import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index.js";
import { errorHandler } from "./utils/errorHandler.js";
import swaggerSpec from "./config/swagger.js";

const app = express();

app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);
app.get("/", (_req, res) => {
  return res.send("Hey there Devashish here - API");
});

app.all("*", (_req, res) => {
  return res.status(400).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
