import { LoadingButton } from '@mui/lab';
import { Grid, Link, TextField, Typography } from '@mui/material';
import React, { ReactEventHandler, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearErrors, enterAsGuest, login, register, setLoginWindow } from 'redux/reducers/authSlice';
import { LoginWindowType } from './LoginPage';

interface RegisterContentProps {

};

const RegisterContent: React.FC<RegisterContentProps> = () => {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const isInside = useAppSelector((state) => state.auth.loggedInMode !== 'LoggedOut');
    const error = useAppSelector((state) => state.auth.error);

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [samePasswordError, setSamePasswordError] = useState(false);

    
    const handleSubmit: ReactEventHandler = useCallback((e) => {
        dispatch(clearErrors());
        if (password !== confirmPassword) {
            setSamePasswordError(true);
            return;
        }
        setSamePasswordError(false);
        dispatch(register({
            username: username,
            password: password,
            email: email
        })).then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
                dispatch(setLoginWindow('Login'));
            }
        });
    }, [username, password, confirmPassword]);

    useEffect(() => {
        // Clear only if error exists
        if (error)
            dispatch(clearErrors());
    }, [username, password]);

  return (
      <Grid container rowSpacing={2} width={300}>
          <Grid item xs={12}>
              <Typography variant="h4" fontWeight="700">Register</Typography>
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
                  autoComplete="off"
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
                  name="email"
                  required
                  error={typeof (error) === 'object' && error?.Email ? true : false}
                  helperText={typeof (error) === 'object' ? error?.Email : undefined}
                  disabled={isLoading}
                  fullWidth
                  label="Email"
                  type="email"
                  autoComplete="off"
                  //value={username}
                  onChange={(e) => setEmail(e.target.value)}
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
                  autoComplete="off"
                  //value={password}
                  onChange={(e) => {
                      setSamePasswordError(false);
                      setPassword(e.target.value)
                  }}
              />
          </Grid>
          <Grid item xs={12}>
              <TextField
                  name="confirmPassword"
                  required
                  error={samePasswordError ? true : false}
                  helperText={samePasswordError ? 'Password is not the same. ' : undefined}
                  disabled={isLoading}
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  autoComplete="off"
                  //value={password}
                  onChange={(e) => {
                      setSamePasswordError(false);
                      setConfirmPassword(e.target.value)
                  }}
              />
          </Grid>
          <Grid item xs={12}>
              <LoadingButton loading={isLoading} fullWidth variant="contained" onClick={handleSubmit}>Register</LoadingButton>
          </Grid>
          <Grid item xs={12}>
              <Typography color="error">{(error && typeof (error) === 'string') ? error : ""}</Typography>
          </Grid>
      </Grid>
  );
}

export default RegisterContent;