import { Artist } from "types";

export default function digestArtists(artistsData: any[]): Artist[] {
  const artists: Artist[] = artistsData.map((artist): Artist => {
    const { uri, href, name } = artist;
    return {
      uri,
      href,
      name,
    };
  });
  return artists;
}
