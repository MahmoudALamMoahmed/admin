const jsonServer = require('json-server')
const multer  = require('multer')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
/* server.get('/echo', (req, res) => {
  res.jsonp(req.query)
}) */

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      let date=new Date()
      let url = date.getTime()+"_"+file.originalname
      req.body.url=url
      cb(null, url)
    }
  })
  
  const bodyParser = multer({ storage: storage }).any()

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(bodyParser)
server.post("/products",(req, res, next) => {
let date = new Date()
req.body.createdAt = date.toISOString()

if(req.body.price){
  req.body.price=Number(req.body.price)
}

let hasErrors = false
let errors={}
if(req.body.title.length<2){
  hasErrors = true
  errors.title="the title length should be at least 2 characters"
}
if(req.body.price.length<=0){
  hasErrors = true
  errors.price="the price is not valid"
}

if(hasErrors){
  //return bad req 400 with validation errors
  res.status(400).jsonp(errors)
  return 
}
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})