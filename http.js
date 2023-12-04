const http = require('http'),
  url = require('url'),
  app = require('./index.js')

const LabObjList = [
  {
    name: '灭火器',
    category: 'extinguisher'
  },
  {
    name: '消防',
    category: 'extinguisher'
  },
  {
    name: '泡沫型',
    category: 'extinguisher'
  },
  {
    name: '插座',
    category: 'socket'
  },
  {
    name: '插头',
    category: 'socket'
  },
  {
    name: '接线板',
    category: 'wiringBoard'
  },
  {
    name: '开关',
    category: 'switch'
  }
]

/**
 * @desc 接受路由，发送识别请求
 */
http
  .createServer((req, res) => {
    const pathname = url.parse(req.url).pathname
    if (pathname === '/detectProduct') {
      resDetect(req, res)
    } else resNotFound(res)
  })
  .listen(1337)

console.log('Server running on 127.0.0.1:1337')

/**
 * @desc 响应404
 * @param {http.ServerResponse} res
 */
function resNotFound(res) {
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end('未找到相应物品TT')
}

/**
 * @desc 响应识物请求
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function resDetect(req, res) {
  let postData = ''
  req.addListener('data', postDataChunk => {
    postData += postDataChunk
  })
  req.addListener('end', () => {
    app.detectProduct(JSON.parse(postData), result => {
      result = { ...result, LabObjList }
      console.log(result)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    })
  })
}
