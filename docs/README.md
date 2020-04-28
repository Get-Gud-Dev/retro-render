# Retro Render

This module is used to create ASCII / ANSI / VGA styled web presentations. It aims to bring things to the next level by allowing for animated texts and implementation of user interfaces, module frameworks, 3d engines, and more.

## Tests

I wrote .. some .. tests, you can see how to use them yourself on the [tests help page](tests.md)

## How to use Retro Render

### Fonts / CSS

The pub folder of the module contains a simple starter pack that can be used. Additionally a guide to the different DOM tags that are used by the renderer and the CSS that they use is available on the [tags help page](tags.md).

### You are defining the drawing rules

> In order to make the most out of Retro Render you already have to know how you want to draw your pixels. Retro render is only responsible for creating and managing the Screen they are drawn on, and drawing them given instruction.

### Browserify or Webpack necessary

* Retro-Render manipulates the DOM direct so you need to be packing this module up alongside the rest of your engine and sending it off to the client.

### Initializing and Drawing a Screen

Create a new Renderer like so:

```js
const Render = require('retro-render')


//Provide the ID of a div that will contain your render
let newRenderer = Render.new( "viewport-tag" )


//Generate the screen
//Provide X resolution, Y resolution, and opional options.
newRenderer.generateScreen(25, 6, {useSubPixels:false})
```

### Available Options

| Option | Type | Functionality |
| ------ | ---- | ------------- |
| useSubPixels | boolean | Should the renderer draw the sub pixels? |

### Manipulating the Screen
The screen is the current, dirty way of manipulating pixels. You can read all about it on the [screen help page](screen.md)

You can iterate through `newRenderer.screen.rowPixels[rowNumber]` or `columnPixels[column]` or use the `matrix[x][y]` property to manipulate a pixel directly.

Each of these references a `pixel-container` and you can get the `pixel` or `subpixel-container` like so:

```js
// Get the first pixel of the first row
let pixelContainer = renderer.screen.rowPixels[0][0]

// The pixel is the first child
let targetPixel = pixelContainer.childNodes[0]

// The subpixel is the second child
let subPixels = pixelContainer.childNodes[1]

// Sub pixels are ordered: top-left, top-right, bottom-right, bottom-left
let topLeft = subPixels.childNodes[0]
let topRight = subPixels.childNodes[1]
let bottomRight = subPixels.childNodes[2]
let bottomLeft = subPixels.childNodes[3]
```

#### Colour

Now that you have the pixel you want, you can change the style property to change its colour:

```js
pixel.style.color = '#fffffff'
```

#### Character

I need to do some research before I can get the character mapping right again, brb.