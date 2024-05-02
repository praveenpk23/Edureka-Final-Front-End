// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import { useNavigate, useNavigation } from 'react-router';
// export default function Account() {
//   const [userData, setUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
//   const Navigate = useNavigate()
//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       if (user && user.phoneNumber) {
//         fetchCartData(user.phoneNumber.slice(3));
//       } else {
//         setUserData(null);
//         setIsLoading(false);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const fetchCartData = async (userPhoneNumber) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const userDoc = await firebase.firestore().collection('Users').doc(userPhoneNumber).get();
//       if (userDoc.exists) {
//         const userData = userDoc.data();
//         setUserData(userData);
//       } else {
//         setUserData(null);
//       }
//     } catch (error) {
//       console.error('Error fetching user cart data:', error);
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     setOpenLogoutDialog(true);
//   };

//   const handleConfirmLogout = () => {
//     setOpenLogoutDialog(false);
//     firebase.auth().signOut().then(() => {
//       console.log('User signed out successfully');
//       Navigate('/')
//       // window.location.reload();

//     }).catch((error) => {
//       console.error('Error signing out:', error);
//     });
//   };

//   const handleCloseLogoutDialog = () => {
//     setOpenLogoutDialog(false);
//   };

//   if (isLoading) {
//     return (<><center><CircularProgress /></center></>);
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }




//   return (
//     <div>
//       <center>
//         <h1>Account</h1>
//         {userData && (
//           <div>
//             <p>Name: {userData.name}</p>
//             <p>Mobile: {userData.mobile}</p>
//             <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
//             <Dialog
//               open={openLogoutDialog}
//               onClose={handleCloseLogoutDialog}
//               aria-labelledby="alert-dialog-title"
//               aria-describedby="alert-dialog-description"
//             >
//               <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
//               <DialogContent>
//                 <DialogContentText id="alert-dialog-description">
//                   Are you sure you want to logout?
//                 </DialogContentText>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
//                 <Button onClick={handleConfirmLogout} autoFocus>
//                   Confirm
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </div>
//         )}
//       </center>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user && user.phoneNumber) {
        fetchCartData(user.phoneNumber.slice(3));
      } else {
        setUserData(null);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchCartData = async (userPhoneNumber) => {
    setIsLoading(true);
    setError(null);
    try {
      const userDoc = await firebase.firestore().collection('Users').doc(userPhoneNumber).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserData(userData);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching user cart data:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setOpenLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setOpenLogoutDialog(false);
    firebase.auth().signOut().then(() => {
      console.log('User signed out successfully');
      navigate('/');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  if (isLoading) {
    return (<center><CircularProgress /></center>);
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Account</h1>
      {userData && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Name: {userData.name}</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Mobile: {userData.mobile}</p>
          <Button variant="contained" color="primary" onClick={handleLogout} style={{ marginRight: '10px' }}>Logout</Button>
          <Dialog
            open={openLogoutDialog}
            onClose={handleCloseLogoutDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to logout?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseLogoutDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmLogout} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
}
