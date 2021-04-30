import { createMachine } from 'xstate';

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
  value: 'active';
  context: FormContext
}

// The events that the machine handles
type FormEvent = { 
  type: 'INPUT_CHANGED'; 
  data: {
    value: string;
    key: string;
  };
};

// The context (extended state) of the machine
export interface FormContext {
  fields: {
    password: string;
    email: string;
  };
}

const signInFormMachine = createMachine<FormContext, FormEvent, FormStateSchema>({
  id: 'formState',
  initial: 'invalid',
  context: {
    fields: {
      password: '',
      email: ''
    }
  },
  states: {
    invalid: {
      always: [
          {
            target: 'valid',
            cond: 'isFormValid'
          },
      ],
      on: {
        'INPUT_CHANGED': [
          {
            actions: 'updateFormValues',
          }
        ]
      }
    },
    valid: {
      // entry: ['notifyInactive'],
      always: [
        {
          target: 'invalid',
          cond: 'isFormInValid'
        },
    ],
      on: {
        'INPUT_CHANGED': [
          {
            actions: 'updateFormValues',
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

export default signInFormMachine;