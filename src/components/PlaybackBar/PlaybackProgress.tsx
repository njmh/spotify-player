import React from 'react';
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import { LinearProgress, Typography } from '@material-ui/core';
import { Playback } from 'types';
import { PlaybackState } from 'enums';
import timeString from 'utils/timeString';

interface StyleProps {
  playbackState?: PlaybackState;
};

const useStyles = makeStyles<Theme, StyleProps>({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: 80,
    textAlign: 'right',
    paddingRight: 16,
    userSelect: 'none',
  },
  playbackProgressCurrent: {
    fontWeight: 500,
  },
  playbackProgressPaused: {
    display: 'inline-block',
    opacity: props => props.playbackState ? (props.playbackState === PlaybackState.Paused ? 0.5 : 0) : 0,
    marginRight: 10,
    transition: '0.3s opacity ease',
  },
  playbackProgressTotal: {
    opacity: 0.5,
  },
  playbackProgressBar: {
    position: 'absolute',
    top: -4,
    left: 0,
    width: '100%',
    height: 4,
  }
});

const PlaybackProgressBar = withStyles({
  root: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  bar: {
    backgroundColor: '#fff',
    transition: 'transform 0s linear' // times returned from API too inconsistent to have nice smooth transtions
  },
})(LinearProgress);

interface PlaybackProgressProps {
  playback: Playback;
};

const PlaybackProgress: React.FunctionComponent<PlaybackProgressProps> = (props) => {
  const { playback } = props;
  const classes = useStyles({ playbackState: playback.state });
  const { duration, current, remaining } = playback;

  const currentPercentage = (current / duration) * 100;

  return (
    <React.Fragment>
      <PlaybackProgressBar className={classes.playbackProgressBar} variant="determinate" value={currentPercentage} />
      <div className={classes.root}>
        <Typography variant="h5" component="div" className={classes.playbackProgressCurrent}>
          <span className={classes.playbackProgressPaused}>Paused</span>
          {timeString(current)}
        </Typography>
        <Typography variant="subtitle1" component="div" className={classes.playbackProgressTotal}>
          -{timeString(remaining)} / {timeString(duration)}
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default PlaybackProgress;
