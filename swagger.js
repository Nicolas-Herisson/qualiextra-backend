// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Swagger pour tester l’API en production',
    },
    servers: [
      {
        url: 'https://localhost:3000/api',
        description: 'Serveur de production',
      },
    ],
  },
  apis: ['./routers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
