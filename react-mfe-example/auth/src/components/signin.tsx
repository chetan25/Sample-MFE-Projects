import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { assign } from 'xstate';
import signInFormMachine, {FormContext} from '../stateMachines/signin';
import { useMachine} from '@xstate/react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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


const updateFormValues = assign<FormContext, any>({
  fields: (context, event) => {
    const updatedField = event.data ? {
      [event.data.key]: event.data.value 
    } : {};
    return {
      ...context.fields,
      ...updatedField
    };
  }
}) as any;

const isFormValid = (context: FormContext) => {
  return  context.fields.email.length > 4 && context.fields.password.length > 4;
}

const isFormInValid = (context: FormContext) => {
  return !isFormValid(context);
}

export default function SignIn({ onSignIn }: SignInProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [state, send] = useMachine(signInFormMachine, {
    actions: {
      updateFormValues: updateFormValues  
    },
    guards: {
      isFormValid: isFormValid,
      isFormInValid: isFormInValid
    }  
  });
  const { email, password } = state.context.fields;
  
  const handleEmailChange = (e: any) => {
    send({
      type: 'INPUT_CHANGED',
      data: {
        value: e.target!.value,
        key: 'email'
      }
    });
  }

  const handlePasswordChange = (e: any) => {
    send({
      type: 'INPUT_CHANGED',
      data: {
        value: e.target!.value,
        key: 'password'
      }
    });
  }

  const formValid = () => {
    return email.length > 4 && password.length > 4
  }

  const handleSubmit = () => {
    setOpen(false);
     if (formValid()) {
       onSignIn(email);
      } else {
        send({
          type: 'INPUT_CHANGED',
          data: {
            value: email,
            key: 'email'
          }
        });
        send({
          type: 'INPUT_CHANGED',
          data: {
            value: password,
            key: 'password'
          }
        });
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
          <TextField
            onChange={handleEmailChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={(email && email.length < 4) || open ? true : false}
            helperText={(email && email.length < 4) || open ? 'Invalid Email' : ''}
          />
          <TextField
           onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={(password && password.length < 4) || open ? true : false}
            helperText={(password && password.length < 4) || open ? 'Invalid password' : ''}
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
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          onClose={handleClose}
          message="Error in Form"
          key={`bottom + center`}
          className={classes.alert}
          action={
            <React.Fragment>
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }
       />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
