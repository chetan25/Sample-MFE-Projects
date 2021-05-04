import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { useMachine} from '@xstate/react';
import InputFiled from './input-filed';
import { createInputMachine } from '../stateMachines/inputField';
import { emailValid, passwordValid } from '../helpers/util';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'none',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    background: 'red'
  }
}));

interface SignInProps {
  onSignIn: (email: string | null) => void
};


// const updateFormValues = assign<FormContext, any>({
//   fields: (context, event) => {
//     const updatedField = event.data ? {
//       [event.data.key]: event.data.value 
//     } : {};
//     return {
//       ...context.fields,
//       ...updatedField
//     };
//   }
// }) as any;


export default function SignIn({ onSignIn }: SignInProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // const [formState, formSend] = useMachine(FormMachine);

  // create a new instance for the email Input State machine
  const emailMachine = createInputMachine<string>('email', 'inValid');
  const [emailState, emailSend, emailInstance] = useMachine(emailMachine, {
      guards: {
          isInputValid: (context) => { 
              return emailValid(context.value);
          },
          isInputInValid: (context) => { 
            return !emailValid(context.value);
          }
      }
  });

  // create a new instance of Input machine for password
  const passwordMachine = createInputMachine<string>('password', 'inValid');
  const [passwordState, passwordSend, passwordInstance] = useMachine(passwordMachine, {
      guards: {
          isInputValid: (context) => { 
              return passwordValid(context.value);
          },
          isInputInValid: (context) => { 
            return !passwordValid(context.value);
          }
      }
  });

  const formValid = () => {
    if (passwordState.value === 'valid' && emailState.value === 'valid') {
      return true;
    }
    return false;
  }

  const handleSubmit = () => {
    setOpen(false);
    if (formValid()) {
       if (emailState.context.value) {
          onSignIn(emailState.context.value);
       }
    } else {
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={classes.form}
          noValidate
        >
          <InputFiled<string>
            label='Email'
            required={true}
            helperText='Email is Required'
            id='email'
            showError={open}
            autoFocus={true}
            machineInstance={emailInstance}
          />
          <InputFiled<string>
            label='Password'
            required={true}
            helperText='Password is Required'
            id='password'
            showError={open}
            autoFocus={true}
            machineInstance={passwordInstance}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/auth/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
