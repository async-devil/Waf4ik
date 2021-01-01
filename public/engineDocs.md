<h1><center> Render target </center></h1>
<hr></hr>
<h2> Wth is rendertarget(rnd): </h2> 
Render Target is shit that represents canvas, its render
<br></br>
Public members:

``` ts
onUpdate: any
``` 
\- function that is called once every frame

example:

```ts
rnd.onUpdate = () => {
  console.log('new frame!');
};
```

```ts
backGround: string | CanvasGradient | CanvasPattern 
``` 
 background of the window,
can be gradient or solid color

example:

```ts
rnd.backGround = "black";
```

```ts
deltaTime: number
```
how much time in miliseconds spent on rendering last frame

example:
```ts 
console.log("delta time = " + rnd.deltaTime);
```
public functions:
```ts
addSprite(sprite: roundSprite | RectSprite): number
```
adds sprite to render(renders it every frame)

`updateSize()` 
forces render target to change it size (is called every frame, but can be useful in some cases)

`updateRND()`
updater render target size and redraws backround

`get getCTX() `
returns canvas rendering context of render target

`getHeight()`
returns height of render target

`getWidth()`
returns height of render target

`startEveryTick()`
must be called only once, and must will be the last function called, starts updating render target
