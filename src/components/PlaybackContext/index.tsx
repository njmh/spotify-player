import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Context } from 'types';
import { PlayingContext } from 'enums';
import CrossfadeImage from 'components/CrossfadeImage';
import ContextPlaylist from './ContextPlaylist';
import { Typography } from '@material-ui/core';

interface StyleProps {
  hasArt: boolean;
  hasPlaylist: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
    color: '#fff',
  },
  details: {
    position: 'absolute',
    top: 80,
    left: 50,
    width: '58.59375vh',
    height: 'calc(100vh - 160px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  playlist: {
    height: props => props.hasPlaylist ? 80 : 50,
    transition: '0.8s height cubic-bezier(.25, .25, 0, 1)',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 10,
  },
  art: {
    width: '58.59375vh',
    height: '58.59375vh',
    boxShadow: props => props.hasArt ? '4px 4px 100px #000' : 'none',
  },
  title: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface PlaybackContextProps {
  title: string | undefined;
  art: string | undefined;
  context: Context | null;
};

const PlaybackContext: React.FunctionComponent<PlaybackContextProps> = (props) => {
  const { title, art, context } = props;
  const hasArt = art !== undefined;
  const hasPlaylist = context?.type === PlayingContext.Playlist;
  const classes = useStyles({ hasArt, hasPlaylist });

  const playlistUri = context && hasPlaylist ? context.uri : null;

  return (
    <div className={classes.root}>
      <div className={classes.details}>
        <div className={classes.playlist}>
          {hasPlaylist && <ContextPlaylist playlistUri={playlistUri} />}
        </div>
        <div className={classes.art}>
          <CrossfadeImage imageUrl={art || ''} />
        </div>
        <div className={classes.title}>
          <Typography variant="h5" component="div">
            {title || ''}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PlaybackContext;
