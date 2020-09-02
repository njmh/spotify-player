import React, { useEffect } from 'react';
import setWindowTitle from 'utils/setWindowTitle';
import useSpotifyAuth from 'services/spotify-auth';
import SpotifyPlayer from 'screens/SpotifyPlayer';

const App: React.FunctionComponent = () => {
  const spotifyAuthenticated = useSpotifyAuth();

  useEffect(() => {
    let existingWindowTitle: string | null = null;
    const handleWindowBlur = (): void => {
      existingWindowTitle = document.title;
      setWindowTitle(null);
    }
    const handleWindowFocus = (): void => {
      if (existingWindowTitle) setWindowTitle(existingWindowTitle);
    }
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    }
  }, []);

  return spotifyAuthenticated ? <SpotifyPlayer /> : null;
}

export default App;
