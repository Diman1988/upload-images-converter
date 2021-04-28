<h1>Upload Images Converter</h1>

Crop and convert images from image/* to webp, jpg, png on client side before upload them to a server

## Options
FileList
Width
Height
MIMO image format

## Default options
Resolution 500 * 500
Image format webp

## Custom options example
```
imageConvert(value.target.files, 750, 450, "image/jpeg")
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
      imageConvert(value.target.files) // Options: FileList, Width, Height, MIMO format (string)
          .then(files => {
              // ... do something with new images ...
          });
    }
/>
// ... code after
```

---
