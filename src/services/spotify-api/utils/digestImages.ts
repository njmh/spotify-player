import { Image } from "types";

export default function digestImages(imagesArray: any[]) : Image[] {
  const images: Image[] = imagesArray.map((image): Image => ({ ...image }));
  return images;
}
