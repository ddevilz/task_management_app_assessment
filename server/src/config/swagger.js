import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "API documentation for Your API",
    },
    basePath: "/api/v1",
    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The auto-generated id of the task",
            },
            title: {
              type: "string",
              description: "The title of the task",
            },
            description: {
              type: "string",
              description: "The description of the task",
            },
            priority: {
              type: "string",
              description: "The priority of the task",
              enum: ["LOW", "MEDIUM", "HIGH"],
            },
            dueDate: {
              type: "string",
              format: "date-time",
              description: "The due date of the task",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The date the task was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "The date the task was last updated",
            },
          },
          required: ["title", "priority", "dueDate"],
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
