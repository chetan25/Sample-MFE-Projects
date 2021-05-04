import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useService } from '@xstate/react';
import { InputInsacne } from '../stateMachines/inputField';

interface InputFiledProps<T> {
    helperText: string;
    label : string;
    id: string;
    required: boolean;
    type?: string;
    showError?: boolean;
    autoFocus?: boolean;
    machineInstance: InputInsacne<T>;
    fullWidth?: boolean;
};

const InputFiled = <T,>({
    helperText,
    label,
    id,
    required,
    machineInstance,
    type = 'text',
    showError = false,
    autoFocus = false,
    fullWidth = true
}: InputFiledProps<T>) => {
    const [state, send] = useService(machineInstance);
    const isInputValid = state.value === 'valid';

    const handleChange = (e: any) => {
        const val =  e.target!.value;
        send({
          type: 'INPUT_CHANGED',
          //@ts-ignore
          value: val
        });
      }
     
   return (
    <TextField
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        required={required}
        fullWidth={fullWidth}
        id={id}
        label={label}
        name={id}
        type={type}
        // autoComplete="email"
        autoFocus={autoFocus}
        error={ state.context.value && !isInputValid || (!isInputValid && showError)}
        helperText={(state.context.value && !isInputValid || (!isInputValid && showError)) ? helperText : ''}
    />
   );
}

export default InputFiled;