


import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import './Details.css';
import firebase from './firebase';
import 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from '@mui/material';
import Cart from './Images/cart.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailNotFound from './DetailNotFound';
function FoodDetailPage() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState('');
  const [CartNo, setCartNo] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [notFound,setNotFound] = useState(false);
  const navigate = useNavigate();
  const firestore = firebase.firestore();

  const fetchData = async () => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        if (user.phoneNumber) {
          setUser(user.phoneNumber.slice(3));
          const query = await firestore.collection('Users').where('mobile', '==', user.phoneNumber.slice(3)).get();
          if (!query.empty) {
            setUserData(query.docs[0].data());
          }
        }
      } else {
        console.log('No user found');
      }
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(`http://localhost:3038/Food/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch food item');
        }
        const data = await response.json();
        setFood(data);
      } catch (error) {
        console.error('Error fetching food:', error);
        setNotFound(true)
      }
    };

    fetchFood();

    return () => {
      setFood(null);
    };
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = async () => {
    const shouldLogout = window.confirm('Are you sure you want to logout?');
    if (shouldLogout) {
      try {
        await firebase.auth().signOut();
        window.location.reload();
        fetchData();
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  };

  const HandleAddtoCart = async (FoodId) => {
    if (user) {
      try {
        const cartCollectionRef = firestore.collection('Cart');
        const userCartRef = cartCollectionRef.doc(user).collection('Foods');
        const secondX =  userCartRef.where('FoodId', '==', FoodId);
        const querySnapshot = await secondX.where('Remove','==',false).get();
        
        if (querySnapshot.empty) { 
          await userCartRef.add({
            FoodId: FoodId,
            Date: new Date(),
            OrderStatus: 'pending',
            Remove: false,
            name:food.name,
            location:food.location,
            image:food.image,
            address:food.address,
            contact:food.contact,
            description:food.description,
          });
          setAddedToCart(true);
          fetchDataAndCountFromUserCart();
        } else {
          toast.error('Item already added to cart');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      toast.error('Login to Add cart');
      navigate('/Login');
    }
  };

  const fetchDataAndCountFromUserCart = async () => {
    try {
      const cartCollectionRef = firestore.collection('Cart');
      const userFoodsCollectionRef = cartCollectionRef.doc(user).collection('Foods').where('Remove','==',false);
      const querySnapshot = await userFoodsCollectionRef.get();
      const userData = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        userData.push(data);
      });
      const numberOfDocuments = querySnapshot.size;
      setCartNo(numberOfDocuments);
      return { userData, numberOfDocuments };
    } catch (error) {
      console.error('Error fetching user cart data:', error);
    }
  };

  useEffect(() => {
    fetchDataAndCountFromUserCart();
  }, [fetchData]);

  useEffect(() => {
    const fetchDataX = async () => {
      try {
        const cartCollectionRef = firestore.collection('Cart');
        const userCartRef = cartCollectionRef.doc(user).collection('Foods');
        const querySnapshot = await userCartRef.where('FoodId', '==', id).where('Remove','==',false).get();
        if (!querySnapshot.empty) {
          setAddedToCart(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchDataX(); // Call the function to fetch data
  
  }, [fetchDataAndCountFromUserCart ]); // Empty dependency array to run the effect only once on mount
  
console.log(addedToCart);
return (
  <div>
    <ToastContainer />
    {food ? (
      <div>
        <header className="headerx" style={{ position: 'relative', textDecoration: 'none' }}>
          <span>
            <a className="LogoX" href="/" style={{ marginLeft: '5%', color: '#eb2929', fontSize: '20px', borderRadius: '50%' }}>W</a>
          </span>
          {userData ? (
            <> 
              <span style={{ position: 'absolute', top: 0, right: 0, marginRight: '5%' }} >
                <Link to='/Cart' >   
                  <img src={Cart} style={{ width: "80%", marginTop: "10px" }} /> 
                  <span className="badge">{CartNo}</span> 
                </Link>
              </span>
            </>
          ) : (
            <>   
              <span>
                <Link className="Login" to='/Login' style={{ textDecoration: 'none', color: 'rgb(255, 255, 255)' }}>Login</Link>
              </span>
              <span style={{ position: 'absolute', top: 0, right: 0, marginRight: '5%' }} className="CA">
                <Link to='/SignUp' className="CA" style={{ textDecoration: 'none', color: 'rgb(255, 255, 255)', border: '1px solid white', padding: '10px', borderRadius: '5px', marginTop: "50px" }}>Create an account</Link>
              </span> 
            </>
          )}
        </header>
        <br /> <br />
        <Link to='/'>Back</Link>
        <center>  
          <img src={food.image} alt={food.name} className='IMGX' /> 
        </center>
        <br />
        <h2 style={{ color: "#192F60" }} className='MainName'>{food.name}</h2>
        <div className='MainName'>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Contact" />
          </Tabs>
          {tabValue === 0 && (
            <div style={{ justifyContent: "left" }}>
              <br />
              <h2 style={{ color: "#192F60" }}>About the place</h2>
              <br />
              <h3 style={{ color: "#192F60" }}>Hotel: {food.restaurant}</h3>
              <br />
              <p style={{ color: "#192F60" }}>Location: {food.location}</p>
              <br />
              <p style={{ color: "#192F60" }}>Address: {food.address}</p>
              <br />
              <p style={{ color: "#192F60" }}>Contact: {food.contact}</p>
            </div>
          )}
          {tabValue === 1 && (
            <div>
              <br />
              <h2 style={{ color: "#192F60" }}>ID : {food.id}</h2>
              <br />
              <p style={{ color: "#192F60" }}>Location: {food.location}</p>
              <br />
              <p style={{ color: "#192F60" }}>Address: {food.address}</p>
              <br />
              <p style={{ color: "#192F60" }}>Contact: {food.contact}</p>
            </div>
          )}
          <br />
          <Button variant='contained' onClick={() => HandleAddtoCart(id)} disabled={addedToCart}>
            {addedToCart ? 'Added to cart' : 'Add to cart'}
            <img src={Cart} style={{ width: "20%", paddingLeft: "10px" }} />
          </Button>
          <br />
          <br />
        </div>
      </div>
    ) : (
     <> {notFound ? (<> <DetailNotFound foodData={id} />  </>):(<center> <br /> <CircularProgress /> </center> )} </>
    )}
  </div>
);

}

export default FoodDetailPage;

