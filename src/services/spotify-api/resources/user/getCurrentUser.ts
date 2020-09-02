import spotifyApi, { ApiResponse } from '../../';

export default async function getCurrentUser(): Promise<ApiResponse> {
  const response = await spotifyApi.get('https://api.spotify.com/v1/me');
  return response.data;
}
