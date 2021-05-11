<h1>Upload Images Converter</h1>

<p>Crop and convert images from image/* to webp, jpg, png on client side before upload them to a server.</p>
<p>Script crops an image by center with proportion from options resolution and scales it.</p>
<p>!!Important some browsers don't convert to webp and return png file</p>
<p>It will logged in error console</p>

---

## Options

<div>
    <p>FileList</p>
    <p>Width</p>
    <p>Height</p>
    <p>MIMO image format</p>
    <p>Show errors</p>
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

# How to use, example:

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
