<h1>Upload Images Converter</h1>

<p>Crop, scale and convert images from image/* to webp, jpg, png on client side before upload them to a server.</p>
<p>Script crops an image by center with proportions of target resolution and scales it.</p>
<p>!!Important some browsers don't convert to webp and will return png file</p>
<p>It will logged in error console if error flag is true</p>

---

## Options

# !IMPORTANT

Since version 2.0.0 the function accepts not separate parameters,
but an object:

```
const parameters = {
    files: input.files,
    width: 500, // defalut
    height: 500, // default
    format: ImageFormat.png,
    showErrors: true,
}
```

<div>
    <p>FileList - Object from input element</p>
    <p>Width - number</p>
    <p>Height - number</p>
    <p>MIMO image format - default is "image/webp"</p>
    <p>Show errors - boolean</p>
</div>

## Default options

<div>
    <p>Resolution 500 * 500</p>
    <p>Image format webp</p>
    <p>Show errors false</p>
</div>

## Custom options example

```
imageConvert(value.target.files, 750, 450, "image/jpeg", true)
.then((files) => ...);
```

---

## How to use, example:

```
import { imageConverter } from "upload-images-converter";

// ... code before
<input
    accept="image/*"
    type="file"
    name="file"
    multiple
    onChange={(value) => {
      imageConvert(value.target.files) // Options: FileList, Width, Height, MIMO format (string), false
          .then(files => {
              // ... do something with new images ...
          });
    }
/>
// ... code after
```

---

<p>If you wanna say thanks to me, please:</p>

[Click and donate](https://ko-fi.com/diman)

<p>I like images, but coffee motivate better :)</p>

---
