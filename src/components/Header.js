import logo from '../logo.svg';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();
const ColorButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: 'black',
  '&:hover': {
    backgroundColor: '#656565',
  },
}));

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [registerState, setRegisterState] = useState(false);
  const [loginState, setLoginState] = useState(true);
  const [isLogined, setIsLogined] = useState(false);
  const [user, setUser] = useState({
    "email": '',
    "password": '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = () => {
    setRegisterState(true);

    if (user.email === '' || user.password === '') return;
    const data = JSON.stringify({
      "email": user.email,
      "password": user.password,
    });    

    const config = {
      method: 'post',
      url: 'https://cors-heroku-server.herokuapp.com/https://scamsaver-auth.herokuapp.com/api/v0/user',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      console.log("User is successfully Registered");
      setDescription("User is successfully Registered");
    })
    .catch(function (error) {
      console.log(error);
      console.log("This User is already taken.");
      setDescription("This User is already taken.");
    });
    // setOpen(false);
  };

  const handleLogin = () => {
    if (user.email === '' || user.password === '') return;
    const data = JSON.stringify({
      "email": user.email,
      "password": user.password,
    });    
    const config = {
      method: 'post',
      url: 'https://cors-heroku-server.herokuapp.com/https://scamsaver-auth.herokuapp.com/api/v0/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      console.log("User is successfully logined.");
      setIsLogined(true);
      cookies.set("JWT_token",response.data);
      cookies.set("email",user.email);
      setOpen(false);
    })
    .catch(function (error) {
      console.log(error);
      console.log("Username or password is incorrect.");      
      setDescription("Username or password is incorrect.");
    });
  
  };
  
  const handleLogOut = () => {
    cookies.remove("JWT_token");
    cookies.remove("email");
    setIsLogined(false);
  }

  const handleChange = (e) => {
    console.log({...user, [e.target.name]: e.target.value  })
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const convertToRegister = (e) => {
    setRegisterState(true);
    setLoginState(false);
    setDescription("");
  }

  const convertToLogin = (e) => {
    setRegisterState(false);
    setLoginState(true);
    setDescription("");
  }

  useEffect(() => {
      if (cookies.get("JWT_token")) {
        setIsLogined(true);
      }

  }, [isLogined])

  return (
    <div style= {{ width: '100%', display: 'flex', justifyContent:'space-between',  marginRight: '5vw', marginTop: '20px' }}>
      <div className='flex'>
        <div className='align-center'>
          <img src={logo} alt="useMetamask" width="50px"/>
        </div>
        <h3 className='text-red-900 text-xl'>
              Extension
        </h3>
      </div>

      <div>
        {
          isLogined?
          ( 
            <div className='flex'>
              <p className='text-green-700 text-lg mr-5'>{cookies.get("email")}</p>
              <ColorButton variant="contained" onClick={handleLogOut}>
                Log Out
              </ColorButton>
            </div>
          ):
          (    
            <ColorButton variant="contained" onClick={handleClickOpen}>
              Log in
            </ColorButton>
          )
        }
    
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{loginState ? `Login` : `Sign Up`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your email address and password to Login here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              name="email"
              value={user.email}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="password"
              type="password"
              fullWidth
              variant="standard"
              name="password"
              value={user.password}
              onChange={(e) => handleChange(e)}
            />
            <DialogContentText>
              <p className='mt-5 text-red-700'>{description}</p>
            </DialogContentText>
          </DialogContent>
    
            {loginState? (
                <DialogActions>
                  <ColorButton onClick={handleLogin}>Login</ColorButton>
                  <Button onClick={convertToRegister}>Register</Button>
                </DialogActions>
              ): (
                <DialogActions>
                  <Button onClick={convertToLogin}>Login</Button>
                  <ColorButton onClick={handleRegister}>Register</ColorButton>
                </DialogActions>
              )
            }

        </Dialog>
      </div>
    </div>
  );
}
