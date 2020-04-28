# Tags

Tags is a simple module that is used to generate the different tags that the renderer screen uses to draw the screen.

This guide will help you to reconstruct the CSS for the renderer if you don't want the premade one.

## Row

Each horizontal line (row) of the screen is placed in its own span which is assigned the following css:

```css
.row {
    display: block;
    padding:0px;
    margin:0px;
}
```

## Pixel
 A pixel consists of two spans, the outer span, the container, and the inner span which is the pixel itself.

 ```css
.pixel-container{
    display: inline-block;
    width: var(--pixel-width);
    height: var(--pixel-height);
}

.pixel { 
    font-family: 'VGA';
    display: block;
    padding: 0px;
    margin: -0.3px;
    position: relative;
    top: 0px;
    left:0px;
    width: var(--pixel-width);
    height: var(--pixel-height);
}
 ```

 Notice the use of CSS variables which are used for fonts of varying pixel size, the following CSS needs to be applied with appropriate values:

 ```css
:root {
    --window-width:1300px;
    --pixel-width:9px;
    --pixel-height:16px;
}
 ```

## SubPixel

SubPixels are pixels that fit inside the regular pixels, for every pixel there are 4 subpixels. This allows for background and foreground elements that overlap and have appropriate levels of detail.

Subpixels are made up of a subpixel-container and four subpixels. The container is then attached to a pixel-container alongside the pixel.

```css
.subpixel-container { 
    display: block;
    position: relative;
    top: calc(var(--pixel-height) * -1);
    left: 0px;
    bottom:0px;
    left: 0px;
    z-index: -1;
    width: var(--pixel-width);
    height: var(--pixel-height);
}

.subpixel {
    font-family: 'VGA';
    display: block;
    padding:0px;
    margin: -0.3px;
    width: calc(var(--pixel-width)/2);
    height: calc(var(--pixel-height)/2);
}

```

There are an additional four subpixel classes to place a subpixel in each of the corners of its parent pixel:

```css
.subpixel0{
    position: absolute;
    top: 0px;
    left: 0px;
}
.subpixel1{
    position: absolute;
    top: 0px;
    right: 0px;
}
.subpixel2{
    position: absolute;
    bottom: 0px;
    left: 0px;
}
.subpixel3{
    position: absolute;
    bottom: 0px;
    right: 0px;
}
```
