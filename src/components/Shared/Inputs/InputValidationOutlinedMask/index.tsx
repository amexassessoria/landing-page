import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import { theme } from '@styles/Theme';
import { TextField, BaseTextFieldProps } from '@material-ui/core';
import { IMask, Masks } from '@utils/Masks';
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
        opacity: 1,
      },
      '&.Mui-focused fieldset': {
        borderColor: getColors()?.branco,
        opacity: 1,
      },
    },
  },
})(TextField);

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  EndAdornment?: React.ReactNode;
  type?: 'text' | 'password';
  disabled?: boolean;
  mask: IMask;
}
const Input: React.FC<InputProps> = ({
  name,
  EndAdornment,
  type,
  mask,
  disabled,
  ...rest
}) => {
  const {
    fieldName,
    defaultValue,
    error,

    registerField,
  } = useField(name);
  const inputRef = useRef<BaseTextFieldProps>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <InputMask mask={Masks[mask.value]} disabled={disabled} maskChar="">
      {() => (
        <CssTextField
          name={name}
          variant="outlined"
          label={error ? error : name}
          error={!!error}
          defaultValue={defaultValue}
          inputRef={inputRef}
          color="primary"
          fullWidth
          type={type}
          disabled={disabled}
          InputProps={{
            endAdornment: EndAdornment,
          }}
        />
      )}
    </InputMask>
  );
};

export default Input;
