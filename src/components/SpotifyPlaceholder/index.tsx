import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from 'components/Typography';
import SpotifyLogo from 'components/SpotifyLogo';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
    color: '#fff',
  },
  logo: {
    '& > svg': {
      width: '15vw',
      height: '15vw',
    }
  },
  message: {
    marginTop: 60,
  },
});

interface SpotifyPlaceholderProps {
  message?: string;
};

const SpotifyPlaceholder: React.FunctionComponent<SpotifyPlaceholderProps> = (props) => {
  const { message } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <SpotifyLogo />
      </div>
      {message && (
        <div className={classes.message}>
          <Typography size={30} component="div">{message}</Typography>
        </div>
      )}
    </div>
  );
};

export default SpotifyPlaceholder;
