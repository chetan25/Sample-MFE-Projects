import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { MemoryHistory } from 'history';

import SignUp from './components/signup';
import SignIn from './components/signin';

// to avoid name collision in production, we would prefix class names generated
const generateClassName = createGenerateClassName({
  productionPrefix: 'auth'
});

interface AuthAppProps {
  history: MemoryHistory;
  onAuthChange: (email: string | null) => void
}

const AuthApp = ({history, onAuthChange}: AuthAppProps) => {  
  return (
    <div>
       <StylesProvider generateClassName={generateClassName}>
           <Router history={history}>
              <Switch>
                  <Route path='/auth/signup'>
                    <SignUp onSignIn={onAuthChange}/>
                  </Route>
                  <Route path='/auth/signin'>
                    <SignIn onSignIn={onAuthChange}/>
                  </Route>
              </Switch>
           </Router>
       </StylesProvider>
    </div>
  );
};

export default AuthApp;