import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PlaybackState } from 'enums';
import useCurrentlyPlaying from 'services/spotify-api/queries/useCurrentlyPlaying';
import setWindowTitle from 'utils/setWindowTitle';
import Typography from 'components/Typography';
import TopBar from 'components/TopBar';
import SpotifyLogo from 'components/SpotifyLogo';
import PlaybackUser from 'components/PlaybackUser';
import PlaybackBackdrop from 'components/PlaybackBackdrop';
import PlaybackBar from 'components/PlaybackBar';
import PlaybackContext from 'components/PlaybackContext';
import PlaybackItem from 'components/PlaybackItem';
import SpotifyPlaceholder from 'components/SpotifyPlaceholder';

const useStyles = makeStyles({
  root: {},
  device: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  deviceLabel: {
    opacity: 0.8,
    marginBottom: 6,
  },
  deviceName: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
});

const SpotifyPlayer: React.FunctionComponent = () => {
  const classes = useStyles();
  const [playbackActive, setPlaybackActive] = useState<boolean>(false);

  const currentlyPlaying = useCurrentlyPlaying(true, playbackActive ? 1000 : 6000);
  const { type, playback, track, album, episode, show, context } = currentlyPlaying;
  const playbackState = playback?.state;

  useEffect(() => {
    setPlaybackActive(playbackState !== PlaybackState.InActive);
  }, [playbackState]);

  const itemName = track?.name || episode?.name;
  const itemArtistOrShow = track?.artist || show?.name;
  const itemTitle = itemName && itemArtistOrShow ? `${itemName} | ${itemArtistOrShow}` : null;
  useEffect(() => {
    setWindowTitle(itemTitle);
  }, [itemTitle]);

  if (playback?.state === PlaybackState.InActive) {
    return <SpotifyPlaceholder message="Start playing music on one of your Spotify connected devices..." />;
  }

  return (
    <div className={classes.root}>
      <TopBar
        logo={<SpotifyLogo />}
        left={(
          <div className={classes.device}>
            {(playback && playback.device) && (
              <>
                <Typography size={12} className={classes.deviceLabel} component="div">Playing on:</Typography>
                <Typography size={14} className={classes.deviceName} component="div" weight="medium">{playback.device.name}</Typography>
              </>
            )}
          </div>
        )}
        right={(
          <PlaybackUser />
        )}
      />
      <PlaybackBackdrop item={album || show} />
      <PlaybackBar playback={playback} />
      <PlaybackContext title={album?.name || show?.name} art={album?.image.url || show?.image.url} context={context} />
      <PlaybackItem type={type} item={track || episode} context={context} />
    </div>
  );
};

export default SpotifyPlayer;
