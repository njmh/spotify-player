import spotifyApi, { ApiResponse } from '../..';

export default async function previous(): Promise<ApiResponse> {
  const response = await spotifyApi.post('https://api.spotify.com/v1/me/player/previous', {});
  return response.data;
}
