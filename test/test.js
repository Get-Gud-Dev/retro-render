let tests = require('./tests')

let testConditions = {
    resolutionX: 5,
    resolutionY: 5
}


const renderer = require('../index')

renderer.new('viewport')

renderer.generateScreen(testConditions.resolutionX, testConditions.resolutionY)

for( var testsName in tests){
    let testSet = tests[testsName]
    console.log("Running " + testsName + " Tests.")
    for( var testIndex in testSet)
    {
        let runTest = testSet[testIndex]
        console.log("Test: " + runTest.test + " result: " + runTest.result(testConditions, renderer))
        
    }
}