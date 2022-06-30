// WARNING: can not run this example cos it doesn't install all neeed dependencies
const Joi = require("joi");

const EasyRouter = require("./index");
const routerFactory = EasyRouter.makeRouter();
const { GET, POST, PUT, PATCH, DELETE } = EasyRouter.Methods;

const functionHandler = () => {};
const objectHandler = {
  handler: functionHandler,

  // plugin "hapi-swagger"
  description: "Route description",

  // Joi validation
  validate: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
    query: Joi.object({
      type: Joi.string(),
    }),
    payload: Joi.object({
      name: Joi.string(),
    }),
  }
};

// single route
routerFactory.GET("/", functionHandler);
routerFactory.POST("/items", functionHandler);
routerFactory.GET("/items", functionHandler);
routerFactory.GET("/items/{id}", objectHandler);
routerFactory.PUT("/items/{id}", objectHandler);
routerFactory.PATCH("/items/{id}", objectHandler);
routerFactory.DELETE("/items/{id}", objectHandler);

// group route with "users" prefix
routerFactory.group("/users", [
  GET("/", functionHandler),
  POST("/", functionHandler),
  GET("/{id}", functionHandler),
  PUT("/{id}", objectHandler),
  PATCH("/{id}", objectHandler),
  DELETE("/{id}", objectHandler)
]);

// get all routes
const routes = routerFactory.allRoutes();

// set routes to server
const server = await Glue.compose(Manifest, options);
server.route(routes);
