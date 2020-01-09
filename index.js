const convert = require('./dist/lib/index').default

const filePath = __dirname + '/test.d.ts'

console.log(convert(filePath))