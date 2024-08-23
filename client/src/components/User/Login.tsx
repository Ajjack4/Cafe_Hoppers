import { Close, Send } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import {  SET_LOGIN_CLOSE,UPDATE_ALERT,START_LOADING, END_LOADING} from "../../slice/slice";
import { useDispatch } from "react-redux";
import { RootState } from "../../slice/stateStore";
import { useSelector } from "react-redux";
import { useState, useRef ,useEffect} from "react";
import PasswordField from "./PasswordField";
import GoogleOneTapLogin from "./GoogleOneTapLogin";
const Login = () => {
  // Type the refs correctly
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const [title,setTitle] = useState<string>("Login");
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  const handleClose = () => {
    dispatch(SET_LOGIN_CLOSE());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    //testing loading
    dispatch(START_LOADING())
    setTimeout(()=>{
      dispatch(END_LOADING())
    },6000)
    //testing
    const Password=passwordRef.current?.value;
    const ConfirmPassword=confirmPasswordRef.current?.value;
    if(Password!==ConfirmPassword){
      dispatch(UPDATE_ALERT({
        ...user,
        alert:{
          open:true,
          severity:"error",
          message:'Passwords do not match',
          
        }
      }))
    }
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isRegister ? setTitle('Register') : setTitle('Login');
  }, [isRegister]);
  return (
    <Dialog open={user.IsLoginOpen} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please fill your information in the fields below:
          </DialogContentText>
          {isRegister && (
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField passwordRef={passwordRef} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: "left", p: "5px 24px" }}>
        {isRegister
          ? "Do you have an account? Sign in now "
          : "Don't you have an account? Create one now "}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Login" : "Register"}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: "center", py: "24px" }}>
        <GoogleOneTapLogin />
      </DialogActions>
    </Dialog>
  );
};

export default Login;
