import Tab from '@material-ui/core/Tab';
import { MenuItem } from '@material-ui/core';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { getColors } from '@styles/colorsTheme';

//Material-UI

export const Container = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      minHeight: 0,
      fontWeight: 'normal',
      fontSize: '1rem',
      width: 150,
      marginRight: theme.spacing(2),
      '&:hover': {
        color: '#4D4F5C',
        opacity: 1,
      },
      '&$selected': {
        color: '#4D4F5C',
        '& .MuiSvgIcon-root': {
          marginLeft: 5,
          color: '#4D4F5C',
        },
      },
      '&:focus': {
        color: '#4D4F5C',
      },
      '& .MuiTab-wrapper': {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
      },
      '& .MuiSvgIcon-root': {
        marginLeft: 5,
        color: '#616161',
        justifyContent: 'flex-end',
      },
      '& .MuiTab-labelIcon': {
        minHeight: 48,
      },
      '& .MuiTab-indicator': {
        height: 4,
      },
    },
    selected: {},
  }),
)(Tab);

export const StyledMenuItem = withStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColors()?.azulEscuro,
    '& .MuiListItemText-root': {
      flex: 'inherit',
    },
    '& .MuiListItemText-primary': {
      minWidth: 0,
      padding: 5,
      color: theme.palette.common.white,
    },
    '& .MuiListItemIcon-root': {
      minWidth: 0,
      color: theme.palette.common.white,
      opacity: 0.5,
      padding: 5,
    },
    '&:focus': {},
  },
}))(MenuItem);

//Material-UI
