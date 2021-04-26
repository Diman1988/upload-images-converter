type IMimoTypes = "image/webp" | "image/jpeg" | "image/jpg" | "image/png";
const imageConvert = async (
    files: FileList,
    format: IMimoTypes = "image/webp",
    correctWidth = 500,
    correctHeight = 500
): Promise<File[]> => {
    const getCanvasesBlob = (
        canvases: HTMLCanvasElement[]
    ): Promise<Blob[]> => {
        const promises: Promise<Blob>[] = [];
        canvases.forEach((canvas) => {
            promises.push(
                new Promise((resolve, reject) => {
                    canvas.toBlob((blob) => {
                        if (blob !== null) {
                            resolve(blob);
                        }
                        reject(new Error("Blob with error"));
                    }, format);
                })
            )
        })
        return Promise.all(promises);
    }

    const promises: Promise<HTMLCanvasElement>[] = [];

    for (let i = 0; i < files.length; i++) {
        const tempFile = files.item(i);
        if (tempFile !== null) {
            // Create a promise for process an image
            const imgPromise: Promise<HTMLCanvasElement> = new Promise((resolve, reject) => {
                const tempImg = new Image(); // Img should be created to read file
                tempImg.src = URL.createObjectURL(tempFile); // Convert file to URL
                tempImg.onload = (): void => { // When file loaded
                    const imageWidth = tempImg.width; // Actual image width
                    const imageHeight = tempImg.height; // Actual image height
                    const width = correctWidth / imageWidth; // Scale width coefficient
                    const height = correctHeight / imageHeight; // Scale height coefficient
                    const tempCanvas = document.createElement("canvas"); // Create a canvas
                    tempCanvas.width = correctWidth; // Initialaize canvas width
                    tempCanvas.height = correctHeight; // Initialaize canvas height
                    // Init drow parameters
                    let cropWidth = 0;
                    let cropHeight = 0;
                    let cropedSide = 0;
                    // Getting 2D context from canvas
                    const can = tempCanvas.getContext("2d") as CanvasRenderingContext2D;
                    // Check image ratio
                    if (imageWidth > imageHeight) {
                        cropedSide = imageHeight;
                        cropWidth = (imageWidth - cropedSide) / 2;
                        cropHeight = (imageHeight - cropedSide) / 2;
                        can.drawImage(tempImg, cropWidth, cropHeight, cropedSide, cropedSide, 0, 0, correctWidth, correctHeight);
                    } else if (imageWidth < imageHeight) {
                        cropedSide = imageWidth;
                        cropWidth = (imageWidth - cropedSide) / 2;
                        cropHeight = (imageHeight - cropedSide) / 2;
                        can.drawImage(tempImg, cropWidth, cropHeight, cropedSide, cropedSide, 0, 0, correctWidth, correctHeight);
                    } else if (imageWidth === imageHeight) {
                        can.drawImage(tempImg, 0, 0, correctWidth, correctHeight);
                    }
                    can.scale(width, height); // Scale canvas image by context
                    resolve(tempCanvas);
                }
                tempImg.onerror = (): void => reject(new Error("Image load error"));
            });
            promises.push(imgPromise); // Add promise to array
        }
    }

    try {
        // Run promises from array to preccess images
        const newImages = await Promise.all(promises)
            .then((canvases) => getCanvasesBlob(canvases)) // Converting to blob with format
            .then(blobs => {
                const fileArray = [] as File[]; // Temp array for make list of images (FileList emulator but not readonly)

                for (let i = 0; i < blobs.length; i++) {
                    const file = new File([blobs[i] as Blob], `image_${i}.webp`, { type: format });
                    fileArray.push(file);
                }

                return fileArray;
            })
        return newImages;
    } catch {
        throw new Error("Something wrong with files");
    }
}

export { imageConvert };
