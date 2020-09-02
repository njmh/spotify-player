import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Typography from 'components/Typography';
import useCurrentUser from 'services/spotify-api/queries/useCurrentUser';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(2),
  },
  name: {
    marginRight: theme.spacing(2),
  },
}));

const PlaybackUser: React.FunctionComponent = () => {
  const classes = useStyles();
  const currentUser = useCurrentUser();
  if (!currentUser) return null;

  const { displayName, initials, image } = currentUser;

  return (
    <div className={classes.root}>
      <Typography size={16} component="div" className={classes.name}>{displayName}</Typography>
      <Avatar alt={displayName} src={image.url}>{initials}</Avatar>
    </div>
  );
};

export default PlaybackUser;
