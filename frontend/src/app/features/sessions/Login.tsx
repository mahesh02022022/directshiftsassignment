import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { loginUser, resetErrorState } from "./sessionSlice";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";

function Login() {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const errorMessages = useSelector(
    (state: RootState) => state.session.errorMessages
  );
  const [errors, setErrors] = useState<Array<string>>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loading = false;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = createTheme();

  useEffect(() => {
    emailRef?.current?.focus();
    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      dispatch(resetErrorState());
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors([]);
    if (
      emailRef?.current === undefined ||
      emailRef.current.value === "" ||
      passwordRef?.current === undefined ||
      passwordRef.current.value === ""
    ) {
      return setErrors(["Please fill out all fields"]);
    }
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const response = (await dispatch(loginUser(payload))) as any;
    console.log(response);
    if (errorMessages.length === 0) {
      navigate("/");
    } else {
      return setErrors(errorMessages);
    }
  }

  const passwordInput = (
    <OutlinedInput
      id="password"
      label="Password"
      variant="Password"
      type={showPassword ? "text" : "password"}
      inputRef={passwordRef}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            onMouseDown={() => setShowPassword(!showPassword)}
            edge="end"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              padding: "10,10",
              display: "block",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="flex items-center">
              <Container maxWidth="xl">
                <div className="left-px:100px"></div>
                <div>
                  <Card sx={{ boxShadow: 4, maxWidth: "md" }}>
                    <CardContent>
                      <Typography component="h5" variant="h5" align="center">
                        <LockOutlinedIcon />
                        Sign in
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
                <div></div>
              </Container>
            </div>

            <section style={{ marginTop: "0em" }}>
              <Container maxWidth="xl">
                <Card sx={{ boxShadow: 4, maxWidth: "md" }}>
                  <CardContent>
                    <Container maxWidth="sm">
                      <Typography
                        component="h1"
                        variant="h5"
                        align="center"
                      ></Typography>

                      {errors.length > 0 ? (
                        <Alert severity="error" aria-live="assertive">
                          {errors.map((error, index) => {
                            return <p key={`alert-${index}`}>{error}</p>;
                          })}
                        </Alert>
                      ) : (
                        <></>
                      )}
                      <form onSubmit={handleSubmit}>
                        <FormGroup
                          row={true}
                          id="email-group"
                          sx={{ marginTop: "1em" }}
                        >
                          <FormControl fullWidth>
                            <InputLabel
                              required
                              htmlFor="email"
                              id="email-label"
                            >
                              Email Address
                            </InputLabel>
                            <Input
                              id="email"
                              type="email"
                              inputRef={emailRef}
                            />

                            {/* <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              inputRef={emailRef}
                              autoFocus
                            /> */}
                          </FormControl>
                        </FormGroup>
                        <FormGroup
                          row={true}
                          id="password-group"
                          sx={{ marginTop: "1em" }}
                        >
                          <FormControl fullWidth>
                            <InputLabel
                              required
                              htmlFor="password"
                              id="password-label"
                            >
                              Password
                            </InputLabel>
                            {passwordInput}
                            {/* <TextField
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password-label"
                              autoComplete="current-password"
                            /> */}
                          </FormControl>
                        </FormGroup>
                        <FormGroup
                          row={true}
                          id="submit-group"
                          sx={{ marginTop: "1em" }}
                        >
                          <FormControl fullWidth>
                            <Button
                              disabled={loading}
                              variant="contained"
                              color="primary"
                              type="submit"
                              id="submit-button"
                            >
                              Login
                            </Button>
                          </FormControl>
                        </FormGroup>
                      </form>
                    </Container>
                  </CardContent>
                  <Divider light={false} />
                  <CardActions
                    sx={{ marginTop: "1em", justifyContent: "center" }}
                    disableSpacing
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        <Link to="/forgot-password">Forgot Password?</Link>
                      </Typography>
                      <Link to="/signup">Create an Account!</Link>
                    </Box>
                  </CardActions>
                </Card>
              </Container>
            </section>

            {/* closing tags */}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Login;
