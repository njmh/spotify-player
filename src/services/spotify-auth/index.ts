import { useState, useEffect } from 'react';
import axios from 'axios';
import { queryCache } from 'react-query';
import { SpotifyAuth } from './types';
import getQueryStringParams from 'utils/getQueryStringParams';

const initialSpotifyAuth: SpotifyAuth = {
  accessToken: undefined,
  expiresAt: undefined,
  refreshToken: undefined,
};

const localStorageKey = 'spotify-auth';

export function getAuthUrl(path: string, params: {[key: string]: string} = {}): string {
  const queryString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
  const authUrl = `https://chameleon-spotify-auth.herokuapp.com/${path}?${queryString}`; // hard-coded for now, using a custom built Spotify authenticator for demonstration purposes
  return authUrl;
}

export function setAuthLocalStorage(spotifyAuth: SpotifyAuth, storage: Storage = window.localStorage): void {
  storage.setItem(localStorageKey, JSON.stringify(spotifyAuth));
}

export function getAuthFromLocalStorage(storage: Storage = window.localStorage): SpotifyAuth | null {
  const spotifyAuth = storage.getItem(localStorageKey);
  return spotifyAuth ? JSON.parse(spotifyAuth) : null;
}

export function getAuthFromQueryString(queryString: string = window.location.search): SpotifyAuth | null {

  const {
    access_token: accessToken,
    expires_in: expiresIn,
    refresh_token: refreshToken
  } = getQueryStringParams(queryString);

  if (!accessToken) return null;

  const expiresAt = Date.now() + (Number(expiresIn) * 1000);

  const spotifyAuth = {
    accessToken,
    refreshToken,
    expiresAt,
  };

  return spotifyAuth;
}

export function hasTokenExpired(spotifyAuth: SpotifyAuth | null): boolean {
  if (!spotifyAuth) return false;
  const { expiresAt } = spotifyAuth;
  if (!expiresAt) return false;
  return Date.now() > (expiresAt - 6000);
}

export function redirectToLogin(loginUrl?: string) {
  if (!loginUrl) loginUrl = getAuthUrl('login', { returnUrl: window.location.href });
  window.location.href = loginUrl;
}

export async function refreshAccessToken(refreshToken: string | undefined, refreshUrl?: string): Promise<SpotifyAuth>  {
  if (!refreshToken) return initialSpotifyAuth;
  if (!refreshUrl) refreshUrl = getAuthUrl('refresh', { refresh_token: refreshToken });

  try {
    const refreshResponse = await axios.get(refreshUrl);
    const { access_token: accessToken, expires_in: expiresIn } = refreshResponse.data;

    const expiresAt = Date.now() + (Number(expiresIn) * 1000);

    const newAuth: SpotifyAuth = {
      accessToken,
      expiresAt,
      refreshToken,
    };

    setAuthLocalStorage(newAuth);
    queryCache.invalidateQueries('currentUser');

    return newAuth;

  } catch(error) {
    return initialSpotifyAuth;
  }

}

export async function getAuth(): Promise<SpotifyAuth | null> {
  let spotifyAuth = getAuthFromLocalStorage();
  if (!spotifyAuth) {
    redirectToLogin();
  }

  if (hasTokenExpired(spotifyAuth)) {
    spotifyAuth = await refreshAccessToken(spotifyAuth?.refreshToken);
  }

  return spotifyAuth;
}

export default function useSpotifyAuth(): boolean {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    const authFromQueryString = getAuthFromQueryString();    
    if (authFromQueryString) {
      setAuthLocalStorage(authFromQueryString);
      window.location.href = `${window.location.origin}${window.location.pathname}`;
    }

    const authFromLocalStorage = getAuthFromLocalStorage();
    if (authFromLocalStorage) {
      if (hasTokenExpired(authFromLocalStorage)) {
        setAuthenticated(false);
        (async function() {
          await refreshAccessToken(authFromLocalStorage.refreshToken);
          setAuthenticated(true);
        })();
      } else {
        setAuthenticated(true);
      }

    } else {
      redirectToLogin();
    }

  }, []);
  
  return authenticated;
}
