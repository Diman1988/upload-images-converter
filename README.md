# upload_images_converter
Crop and convert images from image/* to webp, jpg, png on client side
Defaul resolution 500 * 500, made for ratio 1:1, but you can try another :)
Resolution can be changed by function parameters

How to use, example:

<input
    accept="image/*"
    type="file"
    name="file"
    multiple
    onChange={(value): void => {
      imageConvert(value.target.files) // Options: FileList, Width, Height, MIMO format (string)
          .then(files => {
              // ... do something with new images ...
          });
    }
/>
