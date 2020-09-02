import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Playback } from 'types';
import { PlaybackState } from 'enums';
import CustomDrawer from 'components/CustomDrawer';
import PlaybackControls from './PlaybackControls';
import PlaybackProgress from './PlaybackProgress';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    zIndex: 999,
  },
  playbackControls: {
    width: '58.59375vh',
    marginLeft: 50,
  },
  playbackProgress: {
    marginLeft: 'auto',
  },
});

interface PlaybackBarProps {
  playback: Playback | null;
};

const PlaybackBar: React.FunctionComponent<PlaybackBarProps> = (props) => {
  const { playback } = props;
  const classes = useStyles();
  if (!playback) return null;

  const showPlaybackBar = (playback.state === PlaybackState.Playing || playback.state === PlaybackState.Paused);

  return (
    <div className={classes.root}>
      <CustomDrawer anchor="bottom" open={showPlaybackBar} paperOpacity={0.5}>
        <div className={classes.playbackControls}>
          <PlaybackControls playback={playback} />
        </div>
        <div className={classes.playbackProgress}>
          <PlaybackProgress playback={playback} />
        </div>
      </CustomDrawer>
    </div>
  );
};

export default PlaybackBar;
