import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    configureRecaptcha();
  }, []);

  const configureRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      defaultCountry: 'IN'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'pincode') {
      setPincode(value);
    // } else if (name === 'email') {
    //   setEmail(value);
    // } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'mobile') {
      setMobile(value);
    } else if (name === 'otp') {
      setOtp(value);
    }
  };

  const checkEmailExists = async (email) => {
    const snapshot = await firebase.firestore().collection('Users').where('mobile','==',mobile).get();
    return !snapshot.empty;
  };

  const onSubmitPersonalInfo = async (e) => {
    
    e.preventDefault();
    if(mobile.length!== 10){
      toast.error('Enter 10 digit valid mobile number!')
      return false
    }
    const emailExists = await checkEmailExists(email,mobile);
    if (emailExists) {
      // Email already exists, show error or handle as needed
      toast.error(mobile+' already exists use different number.');
      return;
    }

    // Proceed to OTP authentication
    setIsLoading(true);
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = '+91' + mobile;
    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
      setIsLoading(false);
      setResendCountdown(30);
    } catch (error) {
      console.log('SMS not sent:', error);
      setIsLoading(false);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    window.confirmationResult.confirm(otp)
      .then(async (result) => {
        const user = result.user;
        const phoneNumber = user.phoneNumber.slice(3);

        try {
          await firebase.firestore().collection('Users').doc(phoneNumber).set({
            name: name,
            pincode: pincode,
            email: email,
            password: password,
            mobile: phoneNumber
          });
          navigate('/');
        } catch (error) {
          console.error('Error storing user information:', error);
        }
      })
      .catch((error) => {
        console.log('User couldn\'t sign in (bad verification code?):', error);
        setIsLoading(false);
      });
  };

  // const handleResendOTP = () => {
  //   setOtpSent(false);
  //   setResendOtp(true);
  //   const phoneNumber = '+' + mobile;

  //   const appVerifier = window.recaptchaVerifier;
  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber(phoneNumber, appVerifier)
  //     .then((confirmationResult) => {
  //       window.confirmationResult = confirmationResult;
  //       setIsLoading(false);
  //       setOtpSent(true);
  //       setResendCountdown(30);
  //       setResendOtp(false);
  //     })
  //     .catch((error) => {
  //       console.log('SMS not sent:', error);
  //       setIsLoading(false);
  //     });
  // };

  const handleResendOTP = () => {
    setOtpSent(false);
    setResendOtp(true);
    const phoneNumber = '+91' + mobile; // Define phoneNumber here

    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsLoading(false);
        setOtpSent(true);
        alert('OTP has been resent successfully.');
        setResendCountdown(30);
        setResendOtp(false);
      })
      .catch((error) => {
        console.log('SMS not sent:', error);
        setIsLoading(false);
      });
      setResendCountdown(30); // Reset countdown
  };
  

  const handleChangeNumber = () => {
    setOtpSent(false);
    setMobile('');
    setResendCountdown(0);
  };

  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);
  return (
    <> 
    <ToastContainer />
        <Link to='/' style={{color:"black", margin:"20px",position:"fixed"}}>← Back</Link>
        <br /> <br />
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box p={3} bgcolor="white" boxShadow={3}>
        <center> <h1> Signup to <a target='__blank' href='https://workfys.in/' style={{color:"blue",textDecoration:"none"}}>Workfys</a> Food Delivery</h1> </center>
        <form onSubmit={otpSent ? onSubmitOTP : onSubmitPersonalInfo}>
          <div id="sign-in-button"></div>
          {otpSent ? (
            <TextField
              type="number"
              name="otp"
              label="OTP Number"
              required
              value={otp}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          ) : (
            <>
              <TextField
                type="text"
                name="name"
                label="Name"
                required
                value={name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                type="text"
                name="pincode"
                label="Pincode"
                required
                value={pincode}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              {/* <TextField
                type="email"
                name="email"
                label="Email"
                required
                value={email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                required
                value={password}
                onChange={handleChange}
                fullWidth
                margin="normal"
              /> */}
              <TextField
                type="number"
                name="mobile"
                label="Mobile number"
                required
                value={mobile}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
          <Button
            type="submit"
            disabled={isLoading || resendOtp}
            variant="contained"
            fullWidth
          >
            {isLoading ? 'Loading...' : otpSent ? 'Submit OTP' : 'Next'}
          </Button>
          {otpSent && (
            <Box mt={2}>
              {resendCountdown === 0 ? (
                <Button onClick={handleResendOTP} variant="text" fullWidth>
                  Resend OTP
                </Button>
              ) : (
                <Typography align="center">
                  Resend OTP in {resendCountdown} seconds
                </Typography>
              )}
              <Button onClick={handleChangeNumber} variant="text" fullWidth>
                Change Number
              </Button>
            </Box>
         
        )}
        </form>
        <br />
        <hr />
        <br />
        <center>  <p> Already a User <Link style={{color:"blue"}} to='/Login'>Login</Link> !! </p> </center>
      </Box>
    </Box>
     </>

  
  );
};

export default Login;
