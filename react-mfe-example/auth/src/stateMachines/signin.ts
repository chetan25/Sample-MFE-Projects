import { createMachine, assign, spawn, Actor, Interpreter, sendParent } from 'xstate';

type FormStateSchema = 
| {
  value: 'invalid';
    context: FormContext
  } 
| {
  value: 'valid';
  context: FormContext
}
|  {
  value: 'init';
  context: FormContext
};

// The events that the machine handles
type FormEvent = 
| { 
  type: 'INPUT_CHANGED'; 
  data: {
    value: string;
    key: string;
  };
}
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
  type: 'UPDATE_FORM_INPUT',
  data: {
    value: string;
    key: string;
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
   isValid: boolean;
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
    value: string;
    isValid: boolean;
    id: string;
  }
}


export interface InputContext {
  value: string;
  error?: boolean;
  helperText: string;
  label : string;
  id: string;
  required: boolean;
  type?: string
} 

type InputStateSchema = 
| {
  value: 'active';
    context: InputContext
  }


// export const InputMachine = createMachine<InputContext, InputEvent, InputStateSchema>({
//   initial: 'invalid',
//   context: {
//     value: ''
//   },
//   states: {
//     invalid: {
//       always: [
//           {
//             target: 'valid',
//             cond: 'isInputValid'
//           },
//       ],
//       on: {
//         'INPUT_CHANGED': [
//           {
//             actions: 'updatInputValue',
//           }
//         ]
//       }
//     },
//     valid: {
//       always: [
//         {
//           target: 'invalid',
//           cond: 'isInputInValid'
//         },
//     ],
//       on: {
//         'INPUT_CHANGED': [
//           {
//             actions: 'updatInputValue',
//           }
//         ]
//       }
//     }
//   }
// });

const createInputMachine = (
  {
    initialState,
    id,
    helperText,
    label,
    required,
    type,
  }: {
    initialState: 'active',
    id: string,
    helperText: string,
    label : string,
    required: boolean,
    type?: string,
  }
) => {
   return  createMachine<InputContext, InputEvent, InputStateSchema>({
    id: id, 
    initial: initialState,
    context: {
      value: '',
      helperText: helperText,
      label : label,
      id: id,
      required: required,
      type: type || 'text',
      error: false
    },
    states: {
      active: {
        on: {
          'INPUT_VALUE_CHANGED': [
            {
              actions: assign({
                value: (_, event) => {
                   console.log(event.value, 'event.value');
                    return event.value;
                  }
                }) 
            }
          ],
          'UPDATE_ERROR_STATE': [
            {
              actions: assign({
                error: (_, event) => {
                    return event.value;
                  }
                }) 
            }
          ],
          'UPDATE_FORM': {
            actions: sendParent((_, event) => ({
              data: event.data,
              type: 'UPDATE_FORM_INPUT'
            }))
          }
        },
      },
    }
  });
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
    isValid: false
  },
  states: {
    init: {
      on: {
        'ADD_INPUTS': [
          {
            actions: assign({
              inputs: (context, event) => {
                // spwaning a new input  machine
                const { id, initialState, helperText, label, required} = event.data;
                const input = spawn(createInputMachine({
                  initialState,
                  id,
                  helperText,
                  label,
                  required
                }));
      
                //@ts-ignore
                return context.inputs.concat(input);
              } 
            })
          }
        ]
      }
    },
    invalid: {
      always: [
          {
            // target: 'valid',
            // cond: 'isFormValid'
          },
      ],
      on: {
        'INPUT_CHANGED': [
          {
            // actions: 'updateFormValues',
          }
        ]
      }
    },
    valid: {
      // entry: ['notifyInactive'],
      always: [
        {
          target: 'invalid',
          // cond: 'isFormInValid'
        },
    ],
      on: {
        'INPUT_CHANGED': [
          {
            // actions: 'updateFormValues',
          }
        ]
      }
    }
  }
}, {
  actions: {
    // updateFormValues: () => {},
  },
  guards: {
    // isFormValid:  () => {},
    // isFormInValid:  () => {}
  }  
});
