const convertDir = require('./dist/lib/index').convertDir

convertDir({
    baseUrl: __dirname,
    inputDir: '/test/input',
    outputDir: '/test/output',
    anyType: 'Json'
})

const convertFile = require('./dist/lib/index').convertFile

console.log(convertFile({
    baseUrl: __dirname,
    inputFile: '/test/input/type.d.ts',
    anyType: 'Json'
}))