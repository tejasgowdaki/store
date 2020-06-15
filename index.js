const fs = require("fs");
const path = require("path");

require("dotenv").config();

const expressApp = require("./expressApp");

expressApp.listen(process.env.PORT);
