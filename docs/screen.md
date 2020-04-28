## The Screen

The engine has access to a screen object that provides access to the following properties:

| Property | Type | Purpose |
| -------- | -- |------- |
| columnCount | integer | How many characters wide the screen is. |
| rowCount | integer | How many characters high the screen is. |
| columnPixels | pixelContainer[columnNumber][pixelNumber] | A 2d array holding each set of column pixels by column number. |
| rowPixels | pixelContainer[rowNumber][pixelNumber] | A 2d array holding each set of row pixels by row number. | 
| rows | row[rowNumber] | An array that references the row Divs for each row |
| matrix | pixelContainer[x][y] | A 2d array that references each pixel on the screen using the x and y coordinates |