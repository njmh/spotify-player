import { Album } from "types";
import digestArtists from './digestArtists';
import digestImages from './digestImages';

export default function digestAlbum(albumData: any) : Album | null {
  if (!albumData) return null;

  const {
    uri,
    href,
    name,
  } = albumData;

  const artists = digestArtists(albumData.artists);
  const artist = artists.map(artist => artist.name).join(', ');
  const images = digestImages(albumData.images);

  const album: Album = {
    uri,
    href,
    name,
    artist,
    artists,
    image: images[0],
  };

  return album;
}
