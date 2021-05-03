import { createMachine, assign } from 'xstate';

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

export interface FormContext {
   inpuStates: Record<string, boolean>;
}

export const FormMachine = createMachine<FormContext, FormEvent, FormStateSchema>({
  id: 'formState',
  initial: 'init',
  context: {
    inpuStates: {}
  },
  states: {
    init: {
      on: {
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
