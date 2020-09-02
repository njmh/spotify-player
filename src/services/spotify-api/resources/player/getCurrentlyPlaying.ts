import spotifyApi, { ApiResponse } from '../../';

export default async function getCurrentlyPlaying(): Promise<ApiResponse> {
  const response = await spotifyApi.get('https://api.spotify.com/v1/me/player?additional_types=track,episode');
  return response.data;
}
