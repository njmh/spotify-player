import spotifyApi, { ApiResponse } from '../..';

export default async function next(): Promise<ApiResponse> {
  const response = await spotifyApi.post('https://api.spotify.com/v1/me/player/next', {});
  return response.data;
}
