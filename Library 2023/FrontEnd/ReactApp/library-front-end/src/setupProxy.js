const proxy = require("http-proxy-middleware");
const morgan = require("morgan");

module.exports = app => {
  app.use(
    "/auth-api",
    proxy({
      target: "http://localhost:5001",
      changeOrigin: true,
      pathRewrite: {
        "^/auth-api": "/"
      }
    })
  );

  app.use(
    "/books-api",
    proxy({
      target: "http://localhost:3005",
      changeOrigin: true,
      pathRewrite: {
        "^/books-api": "/"
      }
    })
  );

  app.use(
    "/documents-api",
    proxy({
      target: "http://localhost:8000",
      changeOrigin: true,
      pathRewrite: {
        "^/documents-api": "/"
      }
    })
  );
  
  app.use(morgan('combined'));
};


//There can be more options for prod and dev env as playing with .env files 