
export default function getSpotifyIdFromUri(uri: string | null): string | null {
  const validUri = uri ? /^spotify:[a-zA-Z]+:[a-zA-Z0-9]+$/.test(uri) : false;
  if (!uri || !validUri) return null;
  const [,, spotifyId] = uri.split(':');
  return spotifyId;
}
