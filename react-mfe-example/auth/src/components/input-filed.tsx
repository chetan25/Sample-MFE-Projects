import React from 'react';
import TextField from '@material-ui/core/TextField';
import { InputActor } from '../stateMachines/signin';

import { useService} from '@xstate/react';

interface InputFiledProps {
    helperText: string;
    label : string;
    id: string;
    required: boolean;
    type?: string;
    inputMachineRef: InputActor
};

const InputFiled = ({
    helperText,
    label,
    id,
    required,
    inputMachineRef,
    type = 'text'
}: InputFiledProps) => {
    //@ts-ignore
    const [state, send] = useService(inputMachineRef);
    const { error } = state.context;

    console.log(state, 'state');
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
            value: val && val.length < 4 ? true : false
        });
      }
     
    const updateForm = () => {
        send({
            type: 'UPDATE_FORM',
            //@ts-ignore
            data: {
                value: state.context.value,
                isValid: state.context.error,
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
        autoFocus
        error={error}
        helperText={error ? helperText : ''}
        onBlur={updateForm}
    />
   );
}

export default InputFiled;