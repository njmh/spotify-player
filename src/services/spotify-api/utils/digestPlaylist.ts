import { Playlist } from "types";
import digestImages from './digestImages';

export default function digestPlaylist(playlistData: any) : Playlist {

  const {
    uri,
    href,
    name,
  } = playlistData;

  const images = digestImages(playlistData.images);

  const playlist: Playlist = {
    uri,
    href,
    name,
    image: images[0],
  };

  return playlist;
}
