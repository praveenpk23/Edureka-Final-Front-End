
import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import FoodsPage from "./Foods";
import './Home.css';
import firebase from './firebase';
import 'firebase/firestore';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Cart from './Images/cart.png'
import Footer from './Footer'

export default function Home(){

    const [restaurants, setRestaurants] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [user,setUser] = useState('')
    const [userData,setUserData] = useState('')
    const navigate = useNavigate();
    const firestore = firebase.firestore();
    const [CartNo,setCartNo] = useState('')
    const [newOrder, setNewOrder] = useState({ PhoneNumber: '', Items: '',OrderId:''});

    // Auth Check
    const fetchData = async () => {
           const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
               if (user) {
                   // User is signed in.
                   if (user.phoneNumber) {
                       
                       const Slice = user.phoneNumber.slice(3);
                       setUser(user.phoneNumber.slice(3));
                       console.log(Slice)
                       const query = await firestore.collection('Users').where('mobile', '==', Slice).get();
                       if (!query.empty) {
                           setUserData(query.docs[0].data());
                       }
                   }
   
               } else {
                   // User is signed out.
                   console.log('No user found')
               }
           });
   
           // Cleanup function to unsubscribe when the component unmounts
           return () => unsubscribe();
       };
       useEffect(() => {  
          fetchData();
       },[]);
       

    useEffect(() => {
        fetch('http://localhost:3038/Restaurant')
            .then(response => response.json())
            .then(data => {
                setRestaurants(data);
                const uniqueLocations = [...new Set(data.map(restaurant => restaurant.location))];
                setLocations(uniqueLocations);
            })
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleRestaurantChange = (event) => {
        setSelectedRestaurant(event.target.value);
    };

    const handleLocationEnter = (event) => {
        if (event.key === 'Enter') {
            navigateToRestaurant();
        }
    };

    const handleRestaurantEnter = (event) => {
        if (event.key === 'Enter') {
            navigateToRestaurant();
        }
    };

    const navigateToRestaurant = () => {
        const selectedRestaurantObj = restaurants.find(restaurant => restaurant.name === selectedRestaurant);
        if (selectedRestaurantObj) {
            navigate(`/FoodsFront/${selectedRestaurantObj.id}`);
        }
    };

    const locationSuggestions = locations.filter(location =>
        location
    );

    const restaurantSuggestions = restaurants.filter(restaurant =>
        restaurant.location === selectedLocation
    );

    // Logout
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const handleConfirmLogout = () => {
        setOpenLogoutDialog(false);
        firebase.auth().signOut().then(() => {
          console.log('User signed out successfully');
          window.location.reload();
          
        }).catch((error) => {
          console.error('Error signing out:', error);
        });
      };
    
      const handleCloseLogoutDialog = () => {
        setOpenLogoutDialog(false);
      };
    const handleLogout = () => {
        setOpenLogoutDialog(true);
      };

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
      useEffect(()=>{
        fetchDataAndCountFromUserCart();
        },[fetchData])
        
    return(
        <div style={{marginBottom:"100px"}} >
          <div className="Bg" style={{marginBottom:"100px"}}>
              <header className="header" style={{ position: 'relative', textDecoration: 'none' }}>
                  <br />
                {userData ? (
                    <> 
                     <span style={{ position: 'absolute', top: 0, left: 0, marginRight: '5%', }} className="CA">
                    <p style={{cursor:"pointer",marginLeft:"20px",color:"white",fontSize:"25px",fontStyle:"italic" }}> <span style={{color:"black",fontWeight:"bold"}}> {userData.name} 💝</span></p>
                </span>
                      <span style={{ position: 'absolute', top: 0,right:50,  marginRight: '5%', }} className="CA">
                    {/* <Button className="Login" variant='text' onClick={handleLogout}  style={{cursor:"pointer",marginTop:"0px",color:"white" }}>Logout</Button> */}
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
                <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
                <Button onClick={handleConfirmLogout} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
                </span>
                <span style={{ position: 'absolute', top: 0, right: 0, marginRight: '5%', }} >
                    {/* <Button variant='text' onClick={handleLogout}  style={{color:"white" }}>Logout</Button> */}
                  <Link to='/Cart' >   <img src={Cart} style={{width:"80%",marginTop:"10px"}} /> <span className="badge">{CartNo}</span> </Link>
                </span>
                     </>
                ):(<>   <span>
                    <Link className="Login" to='/Login' style={{ textDecoration: 'none', color: 'rgb(255, 255, 255)'  }}>Login</Link>
                </span>
                <span style={{ position: 'absolute', top: 0, right: 0, marginRight: '5%', }} className="CA">
                    <Link to='/SignUp' className="CA" style={{ textDecoration: 'none', color: 'rgb(255, 255, 255)', border: '1px solid white', padding: '10px', borderRadius: '5px',marginTop:"50px" }}>Create an account</Link>
                </span> </>)}
              </header>
              <br /><br /><br />
              <center>
                  <div className="col-md-12 text-center" style={{marginTop:"40px"}}>
                      <span className="Logo">W</span>
                  </div>
                  <br />
                  <center>   
                      <p className="Pa ">
                          Find the best restaurants, cafes, and bars
                      </p>
                  </center>
                  <div style={{marginTop:"40px"}}>
                      <input className="InL" type="text" placeholder="Please type a location" value={selectedLocation} onChange={handleLocationChange} onKeyPress={handleLocationEnter} list="location-suggestions" />
                      <datalist id="location-suggestions">
                          {locationSuggestions.map((location, index) => (
                              <option key={index} value={location} />
                          ))}
                      </datalist>
                      <input className="InR"   type="text" placeholder="Search for restaurants" value={selectedRestaurant} onChange={handleRestaurantChange} onKeyPress={handleRestaurantEnter} list="restaurant-suggestions" />
                      <datalist id="restaurant-suggestions">
                          {restaurantSuggestions.map((restaurant, index) => (
                            <option key={index} value={restaurant.name} />
                          ))}
                      </datalist>
                  </div>
              </center>
              <br />
              <div>
                  <div className="QS mt-4">
                      <p style={{ color: '#192f60', fontSize: '30px', fontWeight: 'bolder' }}>
                          Quick Searches
                      </p>
                      <br />
                      <p style={{ color: '#8c96ab',marginBottom:"3px" }}>Discover restaurants by type of meal</p>
                      <br />
                      <div className="row" id="quickSearches">
                          {/* Quick searches content will be dynamically populated here */}
                      </div>
                  </div>
              </div>
          </div>         
          <FoodsPage />
        </div>
        
    );
}



