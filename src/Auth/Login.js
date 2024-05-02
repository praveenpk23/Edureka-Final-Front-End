import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#23232323';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
  

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const [resendCountdown, setResendCountdown] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            // User is signed in.
            if (user.phoneNumber) {
               navigate('/')
            }

        } else {
            // User is signed out.
            console.log('No user found')
        }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      setMobile(value);
    } else if (name === 'otp') {
      setOtp(value);
    }
  };

  const onSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const usersRef = firebase.firestore().collection('Users').where('mobile', '==', mobile);
  
    try {
      const snapshot = await usersRef.get();
      if (!snapshot.empty) {
        // User exists, proceed with sending OTP
        const appVerifier = window.recaptchaVerifier;
        const phoneNumber = '+91' + mobile; // Assume the country code is provided by the user
        const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
  
        window.confirmationResult = confirmationResult;
        setOtpSent(true);
        setIsLoading(false);
        setResendCountdown(30);
      } else {
        // User doesn't exist, display a message to the user
        toast.error('User does not exist. Please sign up first.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Display error message to the user
      toast.error('Error sending OTP. Please try again later.');
      setIsLoading(false);
    }
  };
  
  
  const onSubmitOTP = (e) => {
    e.preventDefault();
    setIsLoading(true);

    window.confirmationResult
      .confirm(otp)
      .then(async (result) => {
        const user = result.user;
        const phoneNumber = user.phoneNumber.slice(3);

        try {
          const usersRef = firebase.firestore().collection('Users');
          const userDoc = await usersRef.doc(phoneNumber).get();

          if (userDoc.exists) {
            // User document exists, navigate to the desired route
            navigate('/');
          } else {
            // User document doesn't exist, create a new document
            

            // Navigate to the desired route
          }
        } catch (error) {
          console.error('Error checking phone number:', error);
        }
      })
      .catch((error) => {
        console.log('User couldn\'t sign in (bad verification code?):', error);
        toast.error('Bad verification code');
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
  //       // toast.success('OTP has been resent successfully.');
  //       setResendCountdown(30);
  //       setResendOtp(false);
  //     })
  //     .catch((error) => {
  //       console.log('SMS not sent:', error);
  //       setIsLoading(false);
  //     });
  //   setResendCountdown(30);
  // };

 
  const handleResendOTP = () => {
    setOtpSent(false);
    setResendOtp(true);
    // setChangeNumber(false);
    const phoneNumber = '+91' + mobile; // Define phoneNumber here

    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsLoading(false);
        setOtpSent(true);
        // setChangeNumber(false);
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

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      defaultCountry: 'IN'
    });
  };

  useEffect(() => {
    configureCaptcha();
  }, []);

  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const [isFormVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFormVisible(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const referValue = urlParams.get('Refer');

//     if (referValue) {
//       localStorage.setItem('Ref', referValue);
//     }
//   }, []);

  // return (
  //   <center>
  //     {/* <Helmet>
  //       <title>Client Login</title>
  //       <meta name="description" content="Login to Book your service" />
  //       <meta name="keywords" content="workfys,Login,software,service,Booking" />
  //     </Helmet> */}

  //     <div >
  //       {/* <ToastContainer /> */}
  //       <div>
  //         <br />
  //         <form onSubmit={otpSent ? onSubmitOTP : onSignInSubmit}>
  //           <div id="sign-in-button"></div>
  //           {otpSent ? <></> : <input
  //             type="number"
  //             name="mobile"
  //             placeholder="Mobile number"
  //             required
  //             value={mobile}
  //             onChange={handleChange}
  //           />}
  //           {otpSent && (
  //             <input
  //               type="number"
  //               name="otp"
  //               placeholder="OTP Number"
  //               required
  //               value={otp}
  //               onChange={handleChange}
  //             />
  //           )}
  //           <button
  //             type="submit"
  //             disabled={isLoading || resendOtp}
  //           >
  //             {isLoading ? "Loading..." : otpSent ? 'Submit OTP' : 'Send OTP'}
  //           </button>
  //           {otpSent && (
  //             <div>
  //               {resendCountdown === 0 ? (
  //                 <button onClick={handleResendOTP}>
  //                   Resend otp
  //                 </button>
  //               ) : (
  //                 <p>
  //                   Resend OTP in {resendCountdown} seconds
  //                 </p>
  //               )}
  //               <button
  //                 onClick={handleChangeNumber}
  //               >
  //                 Change Number
  //               </button>
  //             </div>
  //           )}
  //         </form>
  //       </div>
  //     </div>
  //   </center>
  // );
  return(
   <> 
   <ToastContainer />
        <Link to='/' style={{color:"black", margin:"20px",position:"fixed"}}>← Back</Link>
   <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      
    >

      <Box p={3} bgcolor="white" boxShadow={3}>
      <center> <h1> Login to <a href='https://workfys.in/' target='_blank' style={{color:"blue",textDecoration:"none"}}>Workfys</a> Food Delivery</h1> </center>
        {/* <center><img style={{width:"150px"}} src={Logo} className='Logo'  /></center> */}
        {/* Your Helmet component can be added here if needed */}
        <form onSubmit={otpSent ? onSubmitOTP : onSignInSubmit}>
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
          )}
          <Button
            type="submit"
            disabled={isLoading || resendOtp}
            variant="contained"
            fullWidth
          >
            {isLoading ? 'Loading...' : otpSent ? 'Submit OTP' : 'Send OTP'}
          </Button>
          <br />
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
         <center> <p style={{marginTop:"20px"}}> New user ? Better <Link style={{color:"blue"}} to='/SignUp'>Signup</Link> </p></center>
        </form>
      </Box>
    </Box>
    </>
  );
};

export default Login;
