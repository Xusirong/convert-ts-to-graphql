const convertDir = require('./dist/lib/index').convertDir

convertDir({
    baseUrl: __dirname,
    inputDir: '/test/input',
    outputDir: '/test/output',
    anyType: 'Json'
})

const convertFile = require('./dist/lib/index').convertFile

console.log(
    'convertFile测试================', 
    convertFile({
        baseUrl: __dirname,
        inputFile: '/test/input/type.d.ts',
        anyType: 'Json'
    })
)

const convertCode = require('./dist/lib/index').convertCode

const code = 
`interface A extends B {
    name: string
}

interface B extends C {
    age: number
}

interface C {
    phone: number
}
`

console.log(
    'convertCode测试================', 
    convertCode(code, 'Json')
)