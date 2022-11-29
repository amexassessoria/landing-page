import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, TextFieldProps } from '@material-ui/core';

const CssTextField = withStyles({
  root: {
    opacity: 1,

    borderBottom: 'none',
    '& .MuiFilledInput-input': {
      padding: '25px 10px 10px ',
      textAlign: 'center',
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#f1f1f1',
      border: '1px solid #c7c7c7',
      borderBottom: 'none',
      borderRadius: 0,
    },
    '& .MuiFilledInput-underline:before': {
      borderBottom: '1px solid #c7c7c7',
    },
    '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
      opacity: 0.5,
    },
  },
})(TextField);

const InputValidation: React.FC<TextFieldProps> = ({ ...props }) => {
  // const classes = useStyles();

  return (
    <div style={{ margin: 5 }}>
      <CssTextField color="primary" fullWidth={true} {...props} />
    </div>
  );
};

export default InputValidation;
