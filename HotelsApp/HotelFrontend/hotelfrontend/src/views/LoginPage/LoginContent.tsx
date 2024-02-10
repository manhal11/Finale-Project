import { LoadingButton } from '@mui/lab';
import { Grid, Link, TextField, Typography } from '@mui/material';
import React, { ReactEventHandler, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearErrors, enterAsGuest, login } from 'redux/reducers/authSlice';
import { LoginWindowType } from './LoginPage';

interface LoginContentProps {

};

const LoginContent: React.FC<LoginContentProps> = () => {

    const dispatch = useAppDispatch();

    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const isInside = useAppSelector((state) => state.auth.loggedInMode !== 'LoggedOut');
    const error = useAppSelector((state) => state.auth.error);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit: ReactEventHandler = useCallback((e) => {
        dispatch(clearErrors());
        dispatch(login({
            username: username,
            password: password
        }));
    }, [username, password]);

    useEffect(() => {
        // Clear only if error exists
        if (error)
            dispatch(clearErrors());
    }, [username, password]);

  return (
      <Grid container rowSpacing={2} width={300}>
          <Grid item xs={12}>
              <Typography variant="h4" fontWeight="700">Login</Typography>
          </Grid>
          <Grid item xs={12}>
              <TextField
                  name="username"
                  required
                  error={typeof (error) === 'object' && error?.Username ? true : false}
                  helperText={typeof (error) === 'object' ? error?.Username : undefined}
                  disabled={isLoading}
                  fullWidth
                  label="Username"
                  type="text"
                  //value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.keyCode == 13) {
                          handleSubmit(e);
                      }
                  }}
              />
          </Grid>
          <Grid item xs={12}>
              <TextField
                  name="password"
                  required
                  error={typeof (error) === 'object' && error?.Password ? true : false}
                  helperText={typeof (error) === 'object' ? error?.Password : undefined}
                  disabled={isLoading}
                  fullWidth
                  label="Password"
                  type="password"
                  //value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.keyCode == 13) {
                          handleSubmit(e);
                      }
                  }}
              />
          </Grid>
          <Grid item xs={12}>
              <LoadingButton loading={isLoading} fullWidth variant="contained" onClick={handleSubmit}>Login</LoadingButton>
          </Grid>
          <Grid item xs={12}>
              <Typography color="error">{(error && typeof (error) === 'string') ? error : ""}</Typography>
          </Grid>
      </Grid>
  );
}

export default LoginContent;