import React, {useState} from 'react';
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
import InputFiled from './input-filed';
import { createInputMachine } from '../stateMachines/inputField';
import { emailValid, passwordValid, nameValid } from '../helpers/util';
import { useMachine} from '@xstate/react';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/">Your Website</Link> {new Date().getFullYear()}
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface SignUpProps {
  onSignIn: (email: string | null) => void;
}

export default function SignUp({ onSignIn }: SignUpProps) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

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

  // create a new instance for the email Input State machine
  const fNamedMachine = createInputMachine<string>('fName', 'inValid');
  const [fNameState, fNamseSend, fNameInstance] = useMachine(fNamedMachine, {
      guards: {
          isInputValid: (context) => { 
              return nameValid(context.value);
          },
          isInputInValid: (context) => { 
            return !nameValid(context.value);
          }
      }
  });

  const lNamedMachine = createInputMachine<string>('lName', 'inValid');
  const [lNameState, lNamseSend, lNameInstance] = useMachine(lNamedMachine, {
      guards: {
          isInputValid: (context) => { 
              return nameValid(context.value);
          },
          isInputInValid: (context) => { 
            return !nameValid(context.value);
          }
      }
  });

  const formValid = () => {
    if (
      passwordState.value === 'valid' &&
      emailState.value === 'valid' &&
      lNameState.value === 'valid' &&
      fNameState.value === 'valid'
    ) {
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


  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
               <InputFiled<string>
                label="First Name"
                required={true}
                helperText='First Name is Required'
                id='firstName'
                showError={open}
                autoFocus={true}
                machineInstance={fNameInstance}
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputFiled<string>
                label="Last Name"
                required={true}
                helperText='Last Name is Required'
                id='lastName'
                showError={open}
                machineInstance={lNameInstance}
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFiled<string>
                label='Email'
                required={true}
                helperText='Email is Required'
                id='email'
                showError={open}
                machineInstance={emailInstance}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFiled<string>
                label='Password'
                required={true}
                helperText='Password is Required'
                id='password'
                showError={open}
                machineInstance={passwordInstance}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >Sign Up</Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/auth/signin">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
