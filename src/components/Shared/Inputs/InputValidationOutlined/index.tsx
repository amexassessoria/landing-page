import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { theme } from '@styles/Theme';
import { TextField, BaseTextFieldProps } from '@material-ui/core';
import { getColors } from '@styles/colorsTheme';

import { useField } from '@unform/core';

// Material-UI
export const CssTextField = withStyles({
  root: {
    width: '100%',
    maxWidth: 400,
    minWidth: 280,
    marginTop: 5,
    marginBottom: 5,
    '& label': {
      color: getColors()?.branco,
      opacity: 0.3,
    },

    '& .MuiFormHelperText-root': {
      color: getColors()?.azulClaro,
    },
    '& label.Mui-error': {
      opacity: 1,
    },

    '& label.Mui-focused': {
      color: getColors()?.branco,
      opacity: 1,
    },
    '& .MuiOutlinedInput-input': {
      caretColor: getColors()?.azulClaro,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: getColors()?.branco,
    },

    '& .MuiInputAdornment-positionEnd': {
      color: getColors()?.azulClaro,
      opacity: 0.3,
      padding: 5,
    },

    '& .MuiInputAdornment-positionEnd .MuiIconButton-root': {
      padding: 0,
      color: getColors()?.azulClaro,
    },

    '& .MuiOutlinedInput-root': {
      color: getColors()?.branco,
      '& fieldset': {
        borderColor: getColors()?.branco,
        opacity: 0.2,
        borderWidth: 2,
        color: getColors()?.branco,
        borderRadius: 5,
      },

      '& placeholder': {
        color: 'red',
      },
      '&:hover fieldset': {
        borderColor: getColors()?.branco,
      },
      '&.Mui-error': {
        opacity: 1,
      },
      '&.Mui-focused': {
        '& .MuiInputAdornment-positionEnd': {
          color: getColors()?.azulClaro,
          opacity: 1,
        },
        '& .MuiInputAdornment-positionEnd .MuiIconButton-root': {
          color: getColors()?.azulClaro,
          opacity: 1,
        },
      },
      '&.Mui-error fieldset': {
        opacity: 0.5,
      },
      '&.Mui-focused fieldset': {
        borderColor: getColors()?.branco,
        opacity: 1,
      },
    },
  },
})(TextField);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  EndAdornment?: React.ReactNode;
  disabled?: boolean;
  type?: 'text' | 'password';
  errorInline?: boolean;
}
const Input: React.FC<InputProps> = ({
  name,
  EndAdornment,
  type,
  label,
  disabled,
  errorInline,
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
    <>
      <CssTextField
        name={name}
        variant="outlined"
        label={error && !errorInline ? error : label}
        error={!!error}
        defaultValue={defaultValue}
        inputRef={inputRef}
        color="primary"
        fullWidth
        type={type}
        InputProps={{
          endAdornment: EndAdornment,
        }}
        disabled={disabled}
      />
      {errorInline && <p style={{ color: '#e6479f' }}>{error}</p>}
    </>
  );
};

export default Input;
