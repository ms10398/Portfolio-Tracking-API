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
    schemes: ['http'],
    host: 'localhost:3000',
    basePath: '/api/',
  },
  apis: ['./src/api/routes/*.route.js'],
};

const swaggerSpec = swaggerJSDoc(options);

router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
