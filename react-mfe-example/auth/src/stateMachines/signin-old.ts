import { createMachine, assign, spawn, Actor, Interpreter, sendParent } from 'xstate';

type FormStateSchema = {
  value: 'init';
  context: FormContext
};

// The events that the machine handles
type FormEvent = 
| {
  type: 'ADD_INPUTS';
  data: {
    helperText: string;
    label : string;
    id: string;
    required: boolean;
    type?: string
    initialState: 'active';
  };
}
| {
  type: 'UPDATE_FORM_INPUT_STATE',
  data: {
    isValid: boolean;
    id: string;
  };
}

// The context (extended state) of the machine
// export interface FormContext {
//   fields: {
//     password: string;
//     email: string;
//   };
// }

export type InputActor = (Actor<InputContext, InputEvent> | Interpreter<InputContext>);

export interface FormContext {
   inputs: InputActor[];
   inpuStates: Record<string, boolean>;
}

type InputEvent = 
| {
  type: 'INPUT_VALUE_CHANGED';
  value: string;
} 
| {
  type: 'UPDATE_ERROR_STATE';
  value: boolean;
}
| {
  type: 'UPDATE_FORM',
  data: {
    isValid: boolean;
    id: string;
  }
}


export interface InputContext {
  value: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  id: string;
  required?: boolean;
  type?: string
} 

type InputStateSchema = 
| {
  value: 'active';
    context: InputContext
  }

type InputState = | {
  value: 'init';
  context: InputContext
}
| {
  value: 'valid';
  context: InputContext
}
|  {
  value: 'invalid';
  context: InputContext
};



// export const OldFormMachine = createMachine<FormContext, FormEvent, FormStateSchema>({
//   id: 'formState',
//   initial: 'invalid',
//   context: {
//     fields: {
//       password: '',
//       email: ''
//     }
//   },
//   states: {
//     invalid: {
//       always: [
//           {
//             target: 'valid',
//             cond: 'isFormValid'
//           },
//       ],
//       on: {
//         'INPUT_CHANGED': [
//           {
//             actions: 'updateFormValues',
//           }
//         ],
//         'UPDATE_FORM_INPUT': [
          
//         ]
//       }
//     },
//     valid: {
//       // entry: ['notifyInactive'],
//       always: [
//         {
//           target: 'invalid',
//           cond: 'isFormInValid'
//         },
//     ],
//       on: {
//         'INPUT_CHANGED': [
//           {
//             actions: 'updateFormValues',
//           }
//         ]
//       }
//     }
//   }
// }, {
//   actions: {
//     // updateFormValues: () => {},
//   },
//   guards: {
//     // isFormValid:  () => {},
//     // isFormInValid:  () => {}
//   }  
// });


export const FormMachine = createMachine<FormContext, FormEvent, FormStateSchema>({
  id: 'formState',
  initial: 'init',
  context: {
    inputs: [],
    inpuStates: {}
  },
  states: {
    init: {
      on: {
        // 'ADD_INPUTS': [
        //   {
        //     actions: assign({
        //       inputs: (context, event) => {
        //         // spwaning a new input  machine
        //         const { id, initialState, helperText, label, required} = event.data;
        //         const input = spawn(createInputMachine({
        //           initialState,
        //           id,
        //           helperText,
        //           label,
        //           required
        //         }));
      
        //         //@ts-ignore
        //         return context.inputs.concat(input);
        //       },
        //       inpuStates: (context, event) => {
        //         const { id, required} = event.data;
        //         const inputState = {
        //           [id]: required ? false : true
        //         }
        //         return {
        //           ...context.inpuStates,
        //           ...inputState
        //         }
        //       }
        //     })
        //   }
        // ],
        'UPDATE_FORM_INPUT_STATE': [
          {
            actions:  assign({
              inpuStates: (context, event) => {
                const { id,isValid } = event.data;

                return {
                  ...context.inpuStates,
                  [id]: isValid
                }
              }
            })
          }
        ]
      }
    },
  }
});
