const allowedCors = [
  "https://praktikum.tk",
  "http://praktikum.tk",
  "http://samoshin.nomoredomains.monster",
  "https://samoshin.nomoredomains.monster",
  "localhost:3000",
  "http://localhost:3000",
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
  }

  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  const requestHeaders = req.headers["access-control-request-headers"];

  if (method === "OPTIONS") {
    // res.header("Access-Control-Allow-Origin", origin);
    // res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    // return res.end();
  }
  return next();
};
