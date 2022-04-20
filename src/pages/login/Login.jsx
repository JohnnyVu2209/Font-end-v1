import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import {
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  FormControl,
  FormHelperText
} from "@mui/material"
import {
  Visibility,
  VisibilityOff
} from "@mui/icons-material"
import classnames from "classnames";


// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
//import { useUserDispatch, loginUser } from "../../context/UserContext";

//Validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ERRORS from "../../../../../../CAPSTONE - LMS/SourceCode/FrontEnd/Front-end/src/constants/ErrorCode";
import { useSelector, useDispatch } from "react-redux";

//service
import authService from "../../services/auth.service";
import { login } from "../../features/auth/authSlice"
import { setMessage, clearMessage } from "../../features/message/messageSlice"
function Login(props) {
  var classes = useStyles();

  // global
  var dispatch = useDispatch();
  var message = useSelector((state) => state.message.message)
  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [showPassword, setShowPassword] = useState(false);
  var [greet, setGreet] = useState("");

  //get time
  useEffect(() => {
    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12)
      setGreet("Good Morning");
    else if (curHr < 18)
      setGreet("Good Afternoon");
    else
      setGreet("Good Evening");
  }, []);

  //Validation 
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(ERRORS.ERR_USER_NOT_BLANK).trim(),
    password: Yup.string().required(ERRORS.ERR_PASSWORD_NOT_BLANK).trim(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const loginUser = (loginVal, password) => {
    setIsLoading(true);
    setTimeout(() => {
      authService.login(loginVal, password).then(
        (data) => {
          setIsLoading(false);
          dispatch(login(data));
          if (message)
            dispatch(clearMessage());
          window.location.reload();
          props.history.push('/app/user')
        }
      ).catch((error) => {
        dispatch(setMessage(ERRORS[error.response.data.Message]));
        setIsLoading(false);
      });
    }, 2000);
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Learning Management</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Typography variant="h1" className={classes.greeting}>
            Login
          </Typography>
          <Typography variant="h2" className={classes.greeting}>
            {greet}, User
          </Typography>
          <Fade in={message ? true : false}>
            <Typography color="secondary" className={classes.errorMessage}>
              Something is wrong with your login or password :(
            </Typography>
          </Fade>
          <FormControl error={errors.username} fullWidth variant="standard" margin="dense">
            <InputLabel htmlFor="standard-username">Username</InputLabel>
            <Input
            id="standard-username"
            type="text"
            {...register('username')}
            onChange={e => setLoginValue(e.target.value)}
            />
            {
              errors.username?.message ? (<FormHelperText id="component-error-text">{errors.username?.message}</FormHelperText>) : null
            }
            
          </FormControl>

          <FormControl error={errors.password} fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              //value={values.password}
              {...register('password')}
              onChange={e => setPasswordValue(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {
              errors.password?.message ? (<FormHelperText id="component-error-text">{errors.password?.message}</FormHelperText>) : null
            }

          </FormControl>
          <div className={classes.formButtons}>
            {isLoading ? (
              <CircularProgress size={26} className={classes.loginLoader} />
            ) : (
              <Button
                disabled={
                  loginValue.length === 0 || passwordValue.length === 0
                }
                onClick={() =>
                  loginUser(
                    loginValue,
                    passwordValue
                  )
                }
                variant="contained"
                color="primary"
                size="large"
              >
                Login
              </Button>
            )}
            <Button
              color="primary"
              size="large"
              className={classes.forgetButton}
            >
              Forget Password
            </Button>
          </div>
          {/* {activeTabId === 0 && (
            <React.Fragment>
              
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )} */}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic</a>, LLC. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
