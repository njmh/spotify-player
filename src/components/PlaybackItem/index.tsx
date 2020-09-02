import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Track, Episode, Context } from 'types';
import { PlaybackType, PlayingContext } from 'enums';
import Typography from 'components/Typography';
import { lineClamp } from 'utils/styles';

interface StyleProps {
  hasPlaylist: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>({
  root: {
    position: 'fixed',
    top: 80,
    right: 50,
    width: 'calc(100vw - 58.59375vh - 150px)',
    height: 'calc(100vh - 160px)',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    paddingBottom: props => props.hasPlaylist ? 80 : 110,
    transition: '0.8s padding-bottom cubic-bezier(.25, .25, 0, 1)',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    textAlign: 'center',
  },
  name: {
    ...lineClamp(3),
  },
  artist: {
    opacity: 0.8,
    marginBottom: 10,
    ...lineClamp(2),
  },
  description: {
    opacity: 0.8,
    marginTop: 30,
    maxWidth: 900,
    ...lineClamp(4),
  },
});

interface PlaybackItemProps {
  type: PlaybackType | null;
  item: Track | Episode | null;
  context: Context | null;
};

const PlaybackItem: React.FunctionComponent<PlaybackItemProps> = (props) => {
  const { type, item, context } = props;
  const hasPlaylist = context?.type === PlayingContext.Playlist;
  const classes = useStyles({ hasPlaylist });
  const trackArtist = (type === PlaybackType.Track && item) ? (item as Track).artist : null;
  const episodeDescription = (type === PlaybackType.Episode && item) ? (item as Episode).description : null;

  return (
    <div className={classes.root}>
      <div className={classes.details}>
        {trackArtist && (
          <Typography size={30} component="div" className={classes.artist}>{trackArtist}</Typography>
        )}
        <Typography size={40} component="div" className={classes.name}>{item ? item.name : ''}</Typography>
        {episodeDescription && (
          <Typography size={24} component="div" className={classes.description}>{episodeDescription}</Typography>
        )}
      </div>
    </div>
  );
};

export default PlaybackItem;
