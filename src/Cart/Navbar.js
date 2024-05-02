import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Routes,Route } from 'react-router';
import Order from './Orders';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Account from './Account';
import Cart from './Cart';
import CartI from '../Images/cart.png'
import firebase from 'firebase';
import { useNavigate } from 'react-router';
// Styling using Emotion
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#2196f3', // Example background color
});

const Navbar = () => {
    const [user,setUser] = useState('')
    const [CartNo,setCartNo] = useState('')
    const Navigate = useNavigate();
    const firestore = firebase.firestore();
    const fetchDataAndCountFromUserCart = async () => {
        try {
            // Get a reference to the Cart collection
            const cartCollectionRef = firestore.collection('Cart');
      
            // Get a reference to the specific user's "Foods" collection within the "Cart" collection
            const userFoodsCollectionRef = cartCollectionRef.doc(user).collection('Foods').where('Remove','==',false);
      
            // Query the "Foods" collection for the specific user
            const querySnapshot = await userFoodsCollectionRef.get();
      
            // Initialize an array to store the fetched data
            const userData = [];
            console.log(userData)
      
            // Iterate over the documents in the query snapshot
            querySnapshot.forEach(doc => {
                // Extract data from each document
                const data = doc.data();
                // Push the extracted data into the array
                userData.push(data);
            });
      
            // Log the fetched data
            console.log('User Cart Data:', userData);
      
            // Get the count of documents in the "Foods" collection
            const numberOfDocuments = querySnapshot.size;
            console.log('Number of documents in "Foods" collection:', numberOfDocuments);
            setCartNo(querySnapshot.size)
            // Return the fetched data and the count of documents
            return { userData, numberOfDocuments };
        } catch (error) {
            // Handle errors
            console.error('Error fetching user cart data:', error);
        }
      };
      const fetchData = async () => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                // User is signed in.
                if (user.phoneNumber) {
                    setUser(user.phoneNumber);
                    const Slice = user.phoneNumber.slice(3);
                    setUser(user.phoneNumber.slice(3));
                    console.log(Slice,'DDDDDDDd')
                    // const query = await firestore.collection('Users').where('mobile', '==', Slice).get();
                    // if (!query.empty) {
                    //     setUserData(query.docs[0].data());
                    // }
                }

            } else {
                // User is signed out.
                console.log('No user found')
            }
        });

        // Cleanup function to unsubscribe when the component unmounts
        return () => unsubscribe();
    };
    const auth = firebase.auth();
    useEffect(()=>{
        fetchData();
        fetchDataAndCountFromUserCart();
    },[auth.currentUser,fetchData])
  return (
    
    <> 

<StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Workfys
            </Link>
          </Typography>
          <Button component={Link} to="/Cart" color="inherit">
          <img src={CartI} style={{width:"80%",marginTop:"10px"}} /> <span className="badge">{CartNo}</span>

          </Button>
          <Button component={Link} to="/Cart/Orders" color="inherit">
            Orders
          </Button>
          <Button component={Link} to="/Cart/Account" color="inherit">
            Account
          </Button>
          {/* Add more buttons or links as needed */}
        </Toolbar>
      </StyledAppBar>
      <Routes>
<Route path='/' element={<Cart/>} />
<Route path='/Orders' element={<Order/>} />
<Route path='/Account' element={<Account/>} />
</Routes>
  
   </>
  );
};

export default Navbar;
