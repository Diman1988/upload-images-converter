# upload_images_converter
Converter for images from image/* to webp, jpg, png on client side

How to use, example:

<input
    accept="image/*"
    type="file"
    name="file"
    multiple
    onChange={(value): void => {
      imageConvert(value.target.files)
          .then(files => {
              // ... do something with new images ...
          });
    }
/>
