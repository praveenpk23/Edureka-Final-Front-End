
// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// export default function Account() {
//   const [userData, setUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
//   const navigate = useNavigate();

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
//       navigate('/');
//     }).catch((error) => {
//       console.error('Error signing out:', error);
//     });
//   };

//   const handleCloseLogoutDialog = () => {
//     setOpenLogoutDialog(false);
//   };

//   if (isLoading) {
//     return (<center><CircularProgress /></center>);
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h1 style={{ marginBottom: '20px' }}>Account</h1>
//       {userData && (
//         <div style={{ marginBottom: '20px' }}>
//           <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Name: {userData.name}</p>
//           <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Address: {userData.Address}</p>
//           <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Pincode: {userData.pincode}</p>
//           <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Mobile: {userData.mobile}</p>
//           <Button variant="contained" color="primary" onClick={handleLogout} style={{ marginRight: '10px' }}>Logout</Button>
//           <Dialog
//             open={openLogoutDialog}
//             onClose={handleCloseLogoutDialog}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//           >
//             <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
//             <DialogContent>
//               <DialogContentText id="alert-dialog-description">
//                 Are you sure you want to logout?
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseLogoutDialog} color="primary">
//                 Cancel
//               </Button>
//               <Button onClick={handleConfirmLogout} color="primary" autoFocus>
//                 Confirm
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user && user.phoneNumber) {
        fetchUserData(user.phoneNumber.slice(3));
      } else {
        setUserData(null);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchUserData = async (userPhoneNumber) => {
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
      console.error('Error fetching user data:', error);
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

  const handleUpdateDialogOpen = () => {
    setOpenUpdateDialog(true);
    // Set input fields with current user data
    setName(userData.name || '');
    setAddress(userData.address || '');
    setPincode(userData.pincode || '');
    setMobile(userData.mobile || '');
  };

  const handleUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdate = async () => {
    try {
      const userPhoneNumber = firebase.auth().currentUser.phoneNumber.slice(3);
      const userDocRef = firebase.firestore().collection('Users').doc(userPhoneNumber);

      // Update user data
      await userDocRef.update({
        name,
        address,
        pincode,
        mobile
      });

      setOpenUpdateDialog(false);
      // Refresh user data
      fetchUserData(userPhoneNumber);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (isLoading) {
    return (<center><CircularProgress /></center>);
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // return (
  //   <div style={{ textAlign: 'center', padding: '20px' }}>
  //     {/* <h1 style={{ marginBottom: '20px' }}>Account</h1> */}
  //     {userData && (
  //       <div style={{ marginBottom: '20px' }}>
  //         <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Name: {userData.name}</p>
  //         <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Address: {userData.address}</p>
  //         <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Pincode: {userData.pincode}</p>
  //         <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Mobile: {userData.mobile}</p>
  //         <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={handleUpdateDialogOpen}>Update</Button>
  //         <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
  //       </div>
  //     )}
  //     <Dialog
  //       open={openUpdateDialog}
  //       onClose={handleUpdateDialogClose}
  //       aria-labelledby="form-dialog-title"
  //     >
  //       <DialogTitle id="form-dialog-title">Update Information</DialogTitle>
  //       <DialogContent>
  //         <TextField
  //           autoFocus
  //           margin="dense"
  //           id="name"
  //           label="Name"
  //           type="text"
  //           fullWidth
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //         />
  //         <TextField
  //           margin="dense"
  //           id="address"
  //           label="Address"
  //           type="text"
  //           fullWidth
  //           value={address}
  //           onChange={(e) => setAddress(e.target.value)}
  //         />
  //         <TextField
  //           margin="dense"
  //           id="pincode"
  //           label="Pincode"
  //           type="text"
  //           fullWidth
  //           value={pincode}
  //           onChange={(e) => setPincode(e.target.value)}
  //         />
  //         {/* <TextField
  //           margin="dense"
  //           id="mobile"
  //           label="Mobile"
  //           type="text"
  //           fullWidth
  //           value={mobile}
  //           onChange={(e) => setMobile(e.target.value)}
  //         /> */}
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleUpdateDialogClose} color="primary">
  //           Cancel
  //         </Button>
  //         <Button onClick={handleUpdate} color="primary">
  //           Update
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //     <Dialog
  //       open={openLogoutDialog}
  //       onClose={handleCloseLogoutDialog}
  //       aria-labelledby="alert-dialog-title"
  //       aria-describedby="alert-dialog-description"
  //     >
  //       <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
  //       <DialogContent>
  //         <DialogContentText id="alert-dialog-description">
  //           Are you sure you want to logout?
  //         </DialogContentText>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleCloseLogoutDialog} color="primary">
  //           Cancel
  //         </Button>
  //         <Button onClick={handleConfirmLogout} color="primary" autoFocus>
  //           Confirm
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   </div>
  // );


  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {userData && (
        <div style={{ maxWidth: '400px', margin: '0 auto', marginBottom: '20px' }}>
          <h1 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>Account</h1>
          <div style={{ marginBottom: '20px', fontSize: '1.2rem', lineHeight: '1.5' }}>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Address:</strong> {userData.address}</p>
            <p><strong>Pincode:</strong> {userData.pincode}</p>
            <p><strong>Mobile:</strong> {userData.mobile}</p>
          </div>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={handleUpdateDialogOpen}>Update</Button>
          <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
        </div>
      )}
      <Dialog
        open={openUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Update Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            margin="dense"
            id="pincode"
            label="Pincode"
            type="text"
            fullWidth
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose} color="primary" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="primary" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus style={{ fontSize: '1rem', fontWeight: 'bold' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
  


}
