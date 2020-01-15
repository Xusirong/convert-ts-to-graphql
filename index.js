const convert = require('./dist/lib/index').default

const extendsPath = __dirname + '/test/extends.d.ts'

const genericsPath = __dirname + '/test/generics.d.ts'

const valueIsInterface = __dirname + '/test/valueIsInterface.d.ts'

const type = __dirname + '/test/type.d.ts'

// console.log("-----------------------------")

// console.log(convert(extendsPath))

// console.log("-----------------------------")

// console.log(convert(genericsPath))

// console.log("-----------------------------")

// console.log(convert(valueIsInterface))

console.log("-----------------------------")

console.log(convert(type))

console.log("-----------------------------")