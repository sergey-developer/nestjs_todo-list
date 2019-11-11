export function logger(req, res, next) {
  console.log('Middleware.logger.request to: ', req.url);
  next();
}
