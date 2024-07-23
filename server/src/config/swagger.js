import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "API documentation for  API",
    },
    basePath: "/api/v1",
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
