const path = require("path");

const BACKEND_API = process.env.BACKEND_API || "http://localhost:4000";
const USER = process.env.GH_USER || "prognovel";
const REPO = process.env.GH_REPO || "prognovel-contents";
const CACHE_FOLDER = path.resolve(__dirname, "../../.cache");

module.exports = {
  BACKEND_API,
  CACHE_FOLDER,
  USER,
  REPO,
};
