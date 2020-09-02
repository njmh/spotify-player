import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import usePlaylist from 'services/spotify-api/queries/usePlaylist';
import Typography from 'components/Typography';
import CrossfadeImage from 'components/CrossfadeImage';

interface StyleProps {
  hasPlaylist: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    opacity: props => props.hasPlaylist ? 1 : 0,
    transition: '0.8s opacity ease',
  },
  imageWrap: {
    width: 80,
    height: 80,
    padding: 20,
  },
  image: {
    borderRadius: 2,
    boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  label: {
    opacity: 0.5,
  },
  name: {
    maxWidth: 'calc(58.59375vh - 80px)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
});

interface ContextPlaylistProps {
  playlistUri: string | null;
};

const ContextPlaylist: React.FunctionComponent<ContextPlaylistProps> = (props) => {
  const { playlistUri } = props;
  const playlist = usePlaylist(playlistUri);
  const classes = useStyles({ hasPlaylist: playlist !== null });

  const [playlistName, setPlaylistName] = useState<string>('');
  const [playlistImage, setPlaylistImage] = useState<string>('');

  useEffect(() => {
    setPlaylistName(playlist ? playlist.name : '');
    setPlaylistImage(playlist ? playlist.image.url : '');
  }, [playlist]);

  return (
    <div className={classes.root}>
      <div className={classes.imageWrap}>
        {playlistImage && <CrossfadeImage imageUrl={playlistImage} className={classes.image} />}
      </div>
      <div className={classes.details}>
        {playlistName && <Typography size={14} component="div" className={classes.label}>Playlist</Typography>}
        {playlistName && <Typography size={18} weight="medium" className={classes.name} component="div">{playlistName}</Typography>}
      </div>
    </div>
  );
};

export default ContextPlaylist;
