import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';
import { withStyles } from '@material-ui/core/styles';
import { IMask, Masks } from '@utils/Masks';
import { TextField } from '@material-ui/core';

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
  type?: 'text' | 'password';
  disabled?: boolean;
  mask: IMask;
}
const Input: React.FC<InputProps> = ({
  name,
  label,
  StartAdornment,
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
  const inputRef = useRef<any>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div style={{ margin: 10 }}>
      <InputMask
        mask={Masks[mask.value]}
        defaultValue={defaultValue}
        maskChar={null}
        disabled={disabled}
        ref={inputRef}
      >
        {() => (
          <CssTextField
            name={name}
            variant="filled"
            label={error ? error : label}
            error={!!error}
            defaultValue={defaultValue}
            color="primary"
            fullWidth
            type={type}
            disabled={disabled}
            InputProps={{
              startAdornment: StartAdornment,
            }}
          />
        )}
      </InputMask>
    </div>
  );
};

export default Input;
