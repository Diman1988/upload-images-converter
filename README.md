<h1>Upload Images Converter</h1>

<p>Crop and convert images from image/* to webp, jpg, png on client side before upload them to a server.</p>
<p>Script crops an image by center with proportion from options resolution and scales it.</p>
<p>!!Important some browsers don't convert to webp and return png file</p>
<p>It will logged in error console</p>

---

## Options

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

<p>If you wanna treat a coffee for me, please:</p>

![alt text](https://github.com/Diman1988/upload-images-converter/blob/main/doge.png?raw=true)

<p>URI: dogecoin:DSMpJ3upyj1j4yAzx4SFxGf2BJq66QxKQB?label=For%20doge%20and%20lib%20future%20%3A%29&message=Buy%20me%20some%20coffee%20%3A%29</p>
<p>Address: DSMpJ3upyj1j4yAzx4SFxGf2BJq66QxKQB</p>
<p>Label: For doge and lib future :)</p>
<p>Message: Treat a coffee for me :)</p>

---
