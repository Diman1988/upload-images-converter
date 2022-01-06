import { imageConvert } from './index';

function wrapper() {
  console.log('wrapper');

  const button = document.getElementById('button') as HTMLInputElement;

  if (button){
    button.onchange = function () {
      const files = button.files;

      console.log(files);
      if (files) {
        const before = document.getElementById('before') as HTMLImageElement;
        const after = document.getElementById('after') as HTMLImageElement;
        const label = document.getElementById('label') as HTMLParagraphElement;

        imageConvert(button.files, 500, 500, 'image/webp', true)
          .then((reslut) => {
            const scale = document.getElementById('scale') as HTMLInputElement;
            scale.disabled = false;
            scale.onclick = function () {
              if (before.style.maxWidth !== '100%' && after.style.maxWidth !== '100%') {
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
            console.log(before);

            return result;
          })
          .then((result) => {
            const imageUrl = URL.createObjectURL(result[0]);

            after.src = imageUrl;
            after.style.display = 'inline';
            console.log(after);
          });
      }
    };
  }
  console.log(button);

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).wrapper = wrapper;

export { wrapper };
