export default function logger(req, _res, next) {
  console.log(`🥖 Request Received: ${req.method} - ${req.url}`)
  next()
}