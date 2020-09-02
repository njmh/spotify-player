
export type PreloadedImage = {
  loaded: boolean;
  width: number;
  height: number;
};

export default async function preLoadImage(url: string): Promise<PreloadedImage> {
  return new Promise(async (resolve, reject) => {

    try {

      const preloadImageContainer = document.createElement('div');
      preloadImageContainer.setAttribute('style', `
        position: absolute;
        width: 0;
        height: 0;
        overflow: hidden;
        background-color: red;
      `);

      const imageElement = document.createElement('img');
      imageElement.setAttribute('src', url);
      imageElement.addEventListener('load', e => {

        const image: PreloadedImage = {
          loaded: true,
          width: imageElement.clientWidth,
          height: imageElement.clientHeight,
        };

        preloadImageContainer.parentElement!.removeChild(preloadImageContainer);

        resolve(image);
      });

      preloadImageContainer.appendChild(imageElement);
      document.body.appendChild(preloadImageContainer);

    } catch (error) {
      reject(error);
    }

  });
}