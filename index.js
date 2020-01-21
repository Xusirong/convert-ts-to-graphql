const convert = require('./dist/lib/index').default

const extendsPath = '/test/extends.d.ts'

const genericsPath = '/test/generics.d.ts'

const valueIsInterface = '/test/valueIsInterface.d.ts'

const type = '/test/type.d.ts'

convert({
    baseUrl: __dirname,
    inputFile: extendsPath,
    outDir: 'convert',
    outFile: 'extendsPath.graphql',
    anyType: 'Json'
})

convert({
    baseUrl: __dirname,
    inputFile: genericsPath,
    outDir: 'convert',
    outFile: 'genericsPath.graphql',
    anyType: 'Json'
})

convert({
    baseUrl: __dirname,
    inputFile: valueIsInterface,
    outDir: 'convert',
    outFile: 'valueIsInterface.graphql',
    anyType: 'Json'
})

convert({
    baseUrl: __dirname,
    inputFile: type,
    outDir: 'convert',
    outFile: 'type.graphql',
    anyType: 'Json'
})