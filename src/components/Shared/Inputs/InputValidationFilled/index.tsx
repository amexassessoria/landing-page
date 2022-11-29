import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { TextField, BaseTextFieldProps } from '@material-ui/core';

import { useField } from '@unform/core';

// Material-UI
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
    '& .Mui-disabled': {
      '& .MuiFilledInput-input': {
        color: '#616161',
      },
    },
  },
})(TextField);

// export const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     margin: {
//       margin: theme.spacing(1),
//     },
//   }),
// );

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  StartAdornment?: React.ReactNode;
  disabled?: boolean;
  type?: 'text' | 'password';
}
const Input: React.FC<InputProps> = ({
  name,
  StartAdornment,
  type,
  label,
  disabled,
  ...rest
}) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef<BaseTextFieldProps>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div style={{ margin: 10 }}>
      <CssTextField
        name={name}
        variant="filled"
        label={error ? error : label}
        error={!!error}
        defaultValue={defaultValue}
        inputRef={inputRef}
        color="primary"
        fullWidth
        type={type}
        InputProps={{
          startAdornment: StartAdornment,
        }}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
