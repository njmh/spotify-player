import axios, { AxiosResponse } from 'axios';
import { getAuth } from 'services/spotify-auth';

interface ApiOptions {
  headers?: {
    [key: string]: string;
  };
}

export type ApiResponse = AxiosResponse;

export interface ApiError {
  code: string;
  message: string;
};

export function handleApiError(error: any): void {
  // TODO: handle API errors
}

export const get = (url: string): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {

    try {
      let options: ApiOptions = {};
      const { accessToken } = await getAuth() || {};
      if (!accessToken) return reject('Spotify not authenticated');
      options.headers = { Authorization: `Bearer ${accessToken}` };

      const apiResult = await axios.get(url, options);

      return resolve(apiResult);
    } catch (error) {
      handleApiError(error);
      return reject(error);
    }

  });
};

export const post = (url: string, postData: any): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {

    try {
      let options: ApiOptions = {};
      const { accessToken } = await getAuth() || {};
      if (!accessToken) return reject('Spotify not authenticated');
      options.headers = { Authorization: `Bearer ${accessToken}` };

      const apiResult = await axios.post(url, postData, options);

      return resolve(apiResult.data);
    } catch (error) {
      handleApiError(error);
      return reject(error);
    }

  });
};

export const put = (url: string, putData: any): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {

    try {
      let options: ApiOptions = {};
      const { accessToken } = await getAuth() || {};
      if (!accessToken) return reject('Spotify not authenticated');
      options.headers = { Authorization: `Bearer ${accessToken}` };

      const apiResult = await axios.put(url, putData, options);

      return resolve(apiResult.data);
    } catch (error) {
      handleApiError(error);
      return reject(error);
    }

  });
};

const spotifyApi = {
  get,
  post,
  put,
}

export default spotifyApi;
