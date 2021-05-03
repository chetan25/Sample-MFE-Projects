import React from 'react';
import TextField from '@material-ui/core/TextField';
import { InputActor } from '../stateMachines/signin-old';

import { useService} from '@xstate/react';


interface InputFiledProps {
    helperText: string;
    label : string;
    id: string;
    required: boolean;
    type?: string;
    inputMachineRef: InputActor;
    showError?: boolean;
    autoFocus?: boolean;
};

// If we want to Spawn a new manchine from parent and then pass a reference

const InputFiled = ({
    helperText,
    label,
    id,
    required,
    inputMachineRef,
    type = 'text',
    showError = false,
    autoFocus = false
}: InputFiledProps) => {
    //@ts-ignore
    const [state, send] = useService(inputMachineRef);
    const { error } = state.context;

    const handleChange = (e: any) => {
        const val =  e.target!.value;
        send({
          type: 'INPUT_VALUE_CHANGED',
          //@ts-ignore
          value: val
        });
        send({
            type: 'UPDATE_ERROR_STATE',
            //@ts-ignore
            value: (val && val.length < 4 || ( val.length < 4 && showError)) ? true : false
        });
      }
     
    const updateForm = () => {
        send({
            type: 'UPDATE_FORM',
            //@ts-ignore
            data: {
                isValid: state.context.value.length >= 4 ,
                id: state.context.id
            }
        });
    }  

   return (
    <TextField
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        required={required}
        fullWidth
        id={id}
        label={label}
        name={id}
        type={type}
        // autoComplete="email"
        autoFocus={autoFocus}
        error={error || (state.context.value.length < 4 && showError)}
        helperText={(error || (state.context.value.length < 4 && showError)) ? helperText : ''}
        onBlur={updateForm}
    />
   );
}

export default InputFiled;