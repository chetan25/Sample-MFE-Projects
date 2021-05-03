import { createMachine, assign, Actor, Interpreter } from 'xstate';


export type InputActor<T> = (Actor<InputContext<T>, InputEvent<T>> | Interpreter<InputContext<T>>);

export type InputInsacne<T> = Interpreter<InputContext<T>, any, InputEvent<T>, InputStateSchema<T>>;

export interface InputContext<T> {
    value: T | undefined;
} 
  
type InputStateSchema<T> = 
| {
    value: 'valid';
    context: InputContext<T>
  }
| {
    value: 'inValid';
    context: InputContext<T>
}  
  
type InputEvent<T> = {
    type: 'INPUT_CHANGED';
    value: T
};

const updatInputValue = assign<InputContext<any>, any>({
    value: (_: any, event: { value: any; }) => {
      return event.value;
    }
}) as any;  

export const createInputMachine = <T>(id: string, initialState: string) => {
    return createMachine<InputContext<T>, InputEvent<T>, InputStateSchema<T>>({
        id: id,
        initial: initialState,
        context: {
          value: undefined
        },
        states: {
            valid: {
                always: [
                    {
                        target: 'inValid',
                        cond: 'isInputInValid'
                    },
                ],
                on: {
                    'INPUT_CHANGED': [
                        {
                           actions: 'updatInputValue',
                        }
                    ]
                }
            },
            inValid: {
                always: [
                    {
                        target: 'valid',
                        cond: 'isInputValid'
                    },
                ],
                on: {
                    'INPUT_CHANGED': [
                        {
                        actions: 'updatInputValue',
                        }
                    ]
                }
            }
        }
    }, {
        actions: {
            updatInputValue: updatInputValue
        },
        guards: {
            // isFormValid:  () => void,
            // isFormInValid:  () => {}
        } 
    });
}