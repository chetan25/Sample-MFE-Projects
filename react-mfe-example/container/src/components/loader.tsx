import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LinearProgress  from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => {
   return createStyles({
      bar: {
          width: '100%',
          '& > * + *': {
              margin: theme.spacing(2)
          }
      }
   });
});

const Loader = () => {
    const style = useStyles();
   return (
       <div className={style.bar}>
       <LinearProgress />
       </div>

   )
}

export default Loader;