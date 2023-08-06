export const drawImageOnCanvas = (
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  cropX: number,
  cropY: number,
  cropWidth: number,
  cropHeight: number,
  destinationWidth: number,
  destinationHeight: number
) => {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.drawImage(
    img,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    destinationWidth,
    destinationHeight
  );
};
