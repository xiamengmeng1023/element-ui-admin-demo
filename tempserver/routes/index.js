var express = require('express')
var router = express.Router()
let connection = require('./conn')
// 连接数据库
connection.connect(() => {
  console.log('数据库连接成功')
})
/* GET home page. */
router.post('/login', (req, res) => {
  let {
    username,
    password
  } = req.body
  // console.log(username, password)
  let sqlStr = `select * from temp where username='${username}' and password='${password}'`
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})

module.exports = router
