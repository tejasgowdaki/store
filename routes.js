const express = require("express");

const storeRouter = express.Router();

const store = require("./api/store");

const router = app => {
  const apiRoutes = express.Router();

  storeRouter.post("/generate-receipt", store.generateReceipt);

  app.use(storeRouter);

  // If no routes matches
  apiRoutes.use((req, res, next) => {
    if (!req.route) {
      const error = new Error("No route matched");
      error.status = 404;
      return next(error);
    }

    next();
  });
};

module.exports = router;
