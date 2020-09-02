import spotifyApi, { ApiResponse } from '../..';
import { RepeatState } from 'enums';

export default async function repeat(repeatState: RepeatState): Promise<ApiResponse> {
  const response = await spotifyApi.put(`https://api.spotify.com/v1/me/player/repeat?state=${repeatState}`, {});
  return response.data;
}
