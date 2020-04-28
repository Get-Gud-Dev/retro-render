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
                screen.rowPixels[row] = []

                //Generate the row tag and add it to the rows
                //set
                let newRow = tags.row()
                screen.rows.push(newRow)

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