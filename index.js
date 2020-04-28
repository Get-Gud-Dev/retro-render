const settings = require('../settings')
const state = require('../state')
const tags = require('./tags')
const util = require('../util')


module.exports.new = function(tagName) {
    this.viewport = document.getElementById(tagName)

    /** Generate a pixel array to draw on
     * 
     */
    this.generateScreen = (resolutionX, resolutionY, options) => {

        this.viewport.innerHTML = ""

        this.screen = {
            columnCount: 0,
            rowCount: 0,

            columnPixels: [],
            rowPixels: [],
            rows: [],

            matrix: [[]]
        }

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




/** 
 * 
 */
module.exports.drawWorld = (hits) => {
    let entities = []


    //First look at all hits
    for (var hitIndex in hits) {
        let hit = hits[hitIndex]
        //Each ray can hit multiple objects so cycle through them
        for (var rayHitID in hit) {
            let rayHit = hit[rayHitID]
            for (var hitThingID in rayHit.hit) {
                let hitThing = rayHit.hit[hitThingID]
                //    entities.push(rayHit)
                if (hitThing != null) {
                    let bounds = calculateWallBounds(rayHit.distance, rayHit.hit)
                    renderColumn(hitIndex, rayHit.distance, bounds, rayHit.data)
                }
            }
        }


    }
}


//Given a block and its distance, calculate the bounds of the wall
function calculateWallBounds(distance, wallData) {
    //Observer height of the camera
    let eyeHeight = state.getEyePoint()
    let eyePixels = ScreenData.rowCount / 2

    //Fonts may have different character ratios
    let pixelRatio = state.getPixelRatio()

    //How much apparent height in unit does each pixel represent
    let heightPerPixel = (eyeHeight / eyePixels) * pixelRatio

    //Calculate the ceiling point and floor points in pixels
    let screenHeight = heightPerPixel * ScreenData.rowCount

    //How tall is the screen at the distance
    let dScreenHeight = util.calculateApparentSize(screenHeight, distance)

    //How many pixels high is the screen at this distance
    let dPixels = dScreenHeight / heightPerPixel

    //How many pixels smaller is the screen at distance
    let deltaDPixels = ScreenData.rowCount - dPixels
    
    //Split the pixels up to the top and bottom
    let dPixelSplit = deltaDPixels / 2
    
    //Get an even number of pixels to divide between the top and bottom
    //Giving us the distance from the floor and ceiling to this point.
    let dPixelEven =  2 * Math.round(dPixelSplit / 2)


    //Get the offset between the player and the wall height
    let wallOffset = state.getPosition().y - wallData.height

    //Length of the wall above and below the wall if it was 1m away
    let h1Prime = screenHeight - eyePixels

    //Length of wall above and below the eye respectively.
    let h1 = h1Prime/screenHeight * hPixels
    let h2 = hPixels - h1

    // This is the row number where the wall joins the roof
    let vMax = Math.round(eyePixels + h1)
    // This is the row number where the wall joins the floor
    let vMin = Math.round(eyePixels - h2)

    return { max: vMax, min: vMin }
}

function renderWall() {

}

function renderColumn(number, distance, bounds, data) {

    // Lower pixelID makes for a higher up pixel
    for (var pixelID in ScreenData.columnPixels[number]) {
        // Pixel number raises as you go up, so flip the
        // iterator
        let truePixel = ScreenData.rowCount - 1 - pixelID
        // Get the pixel span to be written
        let pixel = ScreenData.columnPixels[number][pixelID].firstChild

        // If the pixel is above roof level
        // Draw the TOP
        if (truePixel > bounds.max) {
            pixel.style.color = data.top
        }
        //If the pixel is between the roof and floor
        //Draw the WALL
        else if (truePixel <= bounds.max && truePixel >= bounds.min) {
            //pixel.innerHTML = bounds.max - bounds.min
            pixel.style.color = util.changeColor(data.wall, -14*distance)
        }
        //Else, draw the BOTTOM
        else {
            //pixel.innerHTML = bounds.min
            pixel.style.color = data.bottom
        }
        pixel.innerHTML = truePixel
    }
}