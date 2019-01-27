const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

const options = {
  swaggerDefinition: {
    info: {
      title: 'Swagger - Portfolio API',
      version: '0.0.1',
      description: 'Portfolio API with Swagger',
      contact: {
        email: 'poke@thecodingninja.me',
      },
    },
    basePath: '/api/',
  },
  apis: ['./src/api/routes/*.route.js'],
};

const swaggerSpec = swaggerJSDoc(options);
// Swagger json served at /api/doc/json
router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
// Swagger UI served at /api/doc
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
