'use strict';

const _this = {};

const ALLOWED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const makeSingleRoute = (method, path, handler) => {
  if (!ALLOWED_METHODS.includes(method)) {
    throw Error(
      `Method must be one of: ${ALLOWED_METHODS.join(", ")}, got ${method}`
    );
  }

  if (typeof handler !== "function" && typeof handler !== "object") {
    throw Error(`Handler must be a function or an object, got ${handler}`);
  }

  if (typeof path !== "string") {
    throw Error(`Path must be a string, got ${path}`);
  }

  path =
    path.charAt(path.length - 1) === "/"
      ? path.slice(0, path.length - 1)
      : path;

  const route = {
    method,
    path,
  };

  if (typeof handler?.handler === "function") {
    route.config = handler;
  } else {
    route.handler = handler;
  }

  return route;
};

const _methods = {};
_methods.GET = (path, handler) => makeSingleRoute("GET", path, handler);
_methods.POST = (path, handler) => makeSingleRoute("POST", path, handler);
_methods.PUT = (path, handler) => makeSingleRoute("PUT", path, handler);
_methods.PATCH = (path, handler) => makeSingleRoute("PATCH", path, handler);
_methods.DELETE = (path, handler) => makeSingleRoute("DELETE", path, handler);

_this.Methods = _methods;

class Router {
  _routes = [];

  constructor (routes = []) {
    this._routes = routes;
  }

  allRoutes () {
    return this._routes;
  }

  addRoute (method, path, handler) {
    this._routes.push(makeSingleRoute(method, path, handler));
  }

  GET (path, handler) {
    this.addRoute("GET", path, handler);
  }

  POST (path, handler) {
    this.addRoute("POST", path, handler);
  }

  PUT (path, handler) {
    this.addRoute("PUT", path, handler);
  }

  PATCH (path, handler) {
    this.addRoute("PATCH", path, handler);
  }

  DELETE (path, handler) {
    this.addRoute("DELETE", path, handler);
  }

  group (prefix = "", routes = []) {
    if (!prefix || routes.length === 0) {
      return;
    }

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];

      this._routes.push(
        makeSingleRoute(
          route.method,
          prefix + route.path,
          route.config || route.handler
        )
      );
    }
  }
}

_this.makeRouter = (routes = []) => {
  return new Router(routes);
};

module.exports = _this;
