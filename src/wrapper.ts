import { ImageFormat } from './constants';
import { imageConvert } from './index';

function wrapper() {
  console.log('wrapper loaded');

  const button = document.getElementById('button') as HTMLInputElement;

  if (button) {
    button.onchange = function () {
      const files = button.files;

      if (files) {
        const before = document.getElementById('before') as HTMLImageElement;
        const after = document.getElementById('after') as HTMLImageElement;
        const label = document.getElementById('label') as HTMLParagraphElement;
        const parameters = {
          files: button.files,
          width: 500,
          height: 500,
          format: ImageFormat.webp,
          showErrors: true,
        };

        imageConvert(parameters)
          .then((result) => {
            console.log('Loaded with parameters:');

            console.log('Width', parameters.width);
            console.log('Height', parameters.height);
            console.log('Format', parameters.format);
            console.log('Debugging', parameters.showErrors);

            return result;
          })
          .then((reslut) => {
            const scale = document.getElementById('scale') as HTMLInputElement;

            scale.disabled = false;
            scale.onclick = function () {
              if (
                before.style.maxWidth !== '100%' &&
                after.style.maxWidth !== '100%'
              ) {
                before.style.maxWidth = '100%';
                after.style.maxWidth = '100%';
                label.innerText = 'scaled';
              } else {
                before.style.maxWidth = '';
                after.style.maxWidth = '';
                label.innerText = 'Not scaled';
              }
            };

            return reslut;
          })
          .then((result) => {
            const imageUrl = URL.createObjectURL(files[0]);

            before.src = imageUrl;
            before.style.display = 'inline';

            return result;
          })
          .then((result) => {
            const imageUrl = URL.createObjectURL(result[0]);

            after.src = imageUrl;
            after.style.display = 'inline';
          });
      }
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).wrapper = wrapper;

export { wrapper };
