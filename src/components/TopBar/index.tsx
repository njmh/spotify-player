import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomDrawer from 'components/CustomDrawer';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    zIndex: 999,
  },
  left: {
    marginRight: 'auto',
  },
  right: {
    marginLeft: 'auto',
  },
  logo: {
    position: 'absolute',
    top: 20,
    left: 'calc(50% - 20px)',
    width: 40,
    height: 40,
    margin: '0 auto',
    '& svg': {
      width: 40,
      height: 40,
    }
  },
});

interface TopBarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  logo?: React.ReactNode;
};

const TopBar: React.FunctionComponent<TopBarProps> = (props) => {
  const { left, right, logo } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CustomDrawer anchor="top" open={true} paperOpacity={0.99}>
        {left && <div className={classes.left}>{left}</div>}
        {logo && <div className={classes.logo}>{logo}</div>}
        {right && <div className={classes.right}>{right}</div>}
      </CustomDrawer>
    </div>
  );
};

export default TopBar;
