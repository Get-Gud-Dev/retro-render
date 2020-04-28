(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const tags = require('./tags')

module.exports.new = function(tagName) {
    this.viewport = document.getElementById(tagName)

    this.screen = {
        columnCount: 0,
        rowCount: 0,

        columnPixels: [],
        rowPixels: [],
        rows: [],

        matrix: [[]]
    }

    /** Generate a pixel array to draw on
     * 
     */
    this.generateScreen = (resolutionX, resolutionY, options) => {

        this.viewport.innerHTML = ""

        this.screen.columnCount = resolutionX
        this.screen.rowCount = resolutionY

        let totalScreenPixels = resolutionY * resolutionX

        for (let i = 0; i < totalScreenPixels; i++) {

            let column = i % resolutionX
            let row = Math.floor(i / resolutionX)
            
            //While establishing the first row of pixels
            //create a new array for each column both in
            //the columns and the matrix
            if (row == 0){
                this.screen.columnPixels[column] = []
                this.screen.matrix.push([])
            }

            //While establishing the first column on every row
            if (column == 0) {
                //Create a new list for that row's pixels
                this.screen.rowPixels[row] = []

                //Generate the row tag and add it to the rows
                //set
                let newRow = tags.row()
                this.screen.rows.push(newRow)

                //Add the new row to viewport
                this.viewport.appendChild(newRow)
            }

            //Create a new Pixel, initialize it with a block
            let pixelContainer =  tags.pixel()
            let pixel = pixelContainer.childNodes[0]
            
            pixel.innerHTML = '█'

            //Screen Housekeeping
            this.screen.columnPixels[column].push(pixelContainer)
            this.screen.rowPixels[row].push(pixelContainer)
            this.screen.matrix[column][row] = pixelContainer

            //Add the pixel to the screen
            this.screen.rows[row].appendChild(pixelContainer)

            if(options == null || options.useSubPixels == true){
                let newSubPixel = tags.subPixel()
                pixelContainer.appendChild(newSubPixel)
            }

        }

    }



    return this
}
},{"./tags":2}],2:[function(require,module,exports){
module.exports.row = () => {
    let newRow = document.createElement('span')
    newRow.classList.add('row')

    return newRow
}

module.exports.pixel = () => {
    let newPixelContainer = document.createElement('span')
    newPixelContainer.classList.add('pixel-container')

    let newPixel = document.createElement('span')
    newPixel.classList.add('pixel')

    newPixelContainer.appendChild(newPixel)

    return newPixelContainer
}

module.exports.subPixel = () => {
    let newSubPixelContainer = document.createElement('span')
    newSubPixelContainer.classList.add('subpixel-container')

    let subPixel0 = document.createElement('span')
    let subPixel1 = document.createElement('span')
    let subPixel2 = document.createElement('span')
    let subPixel3 = document.createElement('span')

    subPixel0.classList.add('subpixel')
    subPixel1.classList.add('subpixel')
    subPixel2.classList.add('subpixel')
    subPixel3.classList.add('subpixel')

    subPixel0.classList.add('subpixel0')
    subPixel1.classList.add('subpixel1')
    subPixel2.classList.add('subpixel2')
    subPixel3.classList.add('subpixel3')

    newSubPixelContainer.appendChild(subPixel0)
    newSubPixelContainer.appendChild(subPixel1)
    newSubPixelContainer.appendChild(subPixel2)
    newSubPixelContainer.appendChild(subPixel3)

    return newSubPixelContainer
}
},{}],3:[function(require,module,exports){
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
},{"../index":1,"./tests":4}],4:[function(require,module,exports){
let screen = require('./screen')

module.exports = {
    screenTests: screen
}
},{"./screen":5}],5:[function(require,module,exports){
module.exports = [
    {test: "column count matches x resolution",
    result: (test, renderer) => {
        return (renderer.screen.columnCount == test.resolutionX)
    }},
    {test: "row count matches y resolution",
    result: (test, renderer) => {
        return (renderer.screen.rowCount == test.resolutionY)
    }},
    {test: "columnPixels length matches x resolution",
    result: (test, renderer) => {
        return (renderer.screen.columnPixels.length == test.resolutionX)
    }},        
    {test: "rowPixels length matches y resolution",
    result: (test, renderer) => {
        return (renderer.screen.rowPixels.length == test.resolutionY)
    }},
]
},{}]},{},[3]);
