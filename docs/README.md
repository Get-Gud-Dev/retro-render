# Retro Render

This module is used to create ASCII / ANSI / VGA styled web presentations. It aims to bring things to the next level by allowing for animated texts and implementation of user interfaces, module frameworks, 3d engines, and more.

## How to use Retro Render

### You are defining the drawing rules

* In order to make the most out of Retro Render you already have to know how you want to draw your pixels. Retro render is only responsible for creating and managing the Screen they are drawn on, and drawing them given instruction.

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

