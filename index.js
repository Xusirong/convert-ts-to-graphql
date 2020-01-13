const convert = require('./dist/lib/index').default

const extendsPath = __dirname + '/test/extends.d.ts'

const genericsPath = __dirname + '/test/generics.d.ts'

console.log(convert(extendsPath))

console.log("-----------------------------")

console.log(convert(genericsPath))