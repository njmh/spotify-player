import { Show } from "types";
import digestImages from './digestImages';

export default function digestShow(showData: any) : Show | null {
  if (!showData) return null;

  const {
    uri,
    href,
    name,
    description,
    publisher,
  } = showData;

  const images = digestImages(showData.images);

  const show: Show = {
    uri,
    href,
    name,
    description,
    publisher,
    image: images[0],
  };

  return show;
}
