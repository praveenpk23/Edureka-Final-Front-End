import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import FoodsPage from '../Foods';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css'
function YourComponentWithoutOrder() {
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user && user.phoneNumber) {
        setUserPhoneNumber(user.phoneNumber.slice(3));
      } else {
        setUserPhoneNumber(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userPhoneNumber) {
      fetchCartData();
    }
  }, [userPhoneNumber]);

  const fetchCartData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userFoodsCollectionRef = firebase.firestore().collection('Cart').doc(userPhoneNumber).collection('Foods');
      const querySnapshot = await userFoodsCollectionRef.where('Remove', '==', false).where('OrderStatus','==','pending').get();

      const userData = querySnapshot.docs.map(async doc => {
        const data = doc.data();
        const foodDetails = await fetchFoodDetails(data.FoodId);
        return { id: doc.id, ...data, foodDetails };
      });

      // Resolve all promises
      const resolvedUserData = await Promise.all(userData);
      setCartData(resolvedUserData);
    } catch (error) {
      console.error('Error fetching user cart data:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFoodDetails = async (foodId) => {
    try {
      const response = await fetch(`http://localhost:3038/Restaurant/${foodId}`);
      const data = await response.json();
      return data; // Assuming the API returns details of the food
    } catch (error) {
      console.error(`Error fetching food details for foodId ${foodId}:`, error);
      return null;
    }
  };

  const handleRemoveItem = async (itemId) => {
    const permission = window.confirm('Are you sure want to remove it');
    if (permission) {
      try {
        await firebase.firestore().collection('Cart').doc(userPhoneNumber).collection('Foods').doc(itemId).update({
          Remove: true
        });
        // Reload cart data after removal
        fetchCartData();
      } catch (error) {
        console.error('Error removing item from cart:', error);
        setError(error.message);
      }
    }
  };

  // const handleOrder = async () => {
  //   console.log(selectedItems)
  //   const orderData = {
  //     PhoneNumber: userPhoneNumber,
  //     Items: selectedItems, 
  //     OrderId:Math.floor(Math.random() * 90000) + 10000,
      
  //   };

  //   try {
  //     // Send POST request to your server
  //     const response = await fetch('http://localhost:3038/api/orders', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(orderData)
  //     });

  //     if (response.ok) {
  //       // Order placed successfully
  //       alert('Order placed successfully!');
  //       // Optionally, you can reset selectedItems state or redirect the user to a different page.
  //     } else {
  //       // Handle error
  //       throw new Error('Failed to place order');
  //     }
  //   } catch (error) {
  //     console.error('Error placing order:', error);
  //     // Handle error
  //     alert('Failed to place order',error);
  //   }
  // };

  const handleOrder = async () => {
    console.log(selectedItems);
  
    const orderData = {
      PhoneNumber: userPhoneNumber,
      Items: selectedItems,
      OrderId: Math.floor(Math.random() * 90000) + 10000,
      Status:'Pending',
    };
  
    try {
      // Send POST request to your server to store data in MongoDB
      const mongoResponse = await fetch('http://localhost:3038/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      // Check if MongoDB request was successful
      if (mongoResponse.ok) {
        // Update Firebase Firestore for each selected item
        await Promise.all(
          selectedItems.map(async (selectedItem) => {
            // Query the Firestore collection for the document with matching FoodId
            const querySnapshot = await firebase.firestore().collection('Cart').doc(userPhoneNumber).collection('Foods')
              .where('FoodId', '==', selectedItem)
              .get();
            
            // Update each document individually
            querySnapshot.forEach(async (doc) => {
              await doc.ref.update({
                Remove: true,
                OrderStatus: 'Ordered',
                OrderDate: new Date(),
              });
            });
            // window.location.reload()
          })
        );
  
        // Order placed successfully
        alert('Order placed successfully!');
        fetchCartData();
        // Optionally, you can reset selectedItems state or redirect the user to a different page.
      } else {
        // Handle MongoDB error
        throw new Error('Failed to store order data in MongoDB');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error
      toast.error('Failed to place order', error);
    }
  };
  
  

  const handleSelectItem = (foodId) => {
    // Check if the foodId is already selected
    const isSelected = selectedItems.some(item => item === foodId);

    if (!isSelected) {
      // Add the foodId to the selectedItems array
      setSelectedItems([...selectedItems, foodId]);
    } else {
      // Remove the foodId from the selectedItems array
      const updatedItems = selectedItems.filter(item => item !== foodId);
      setSelectedItems(updatedItems);
    }
  };

  if (!userPhoneNumber || isLoading) {
    return (
      <> <center style={{marginTop:"15%"}}> <CircularProgress /> </center> </>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

    return (
      // <div style={{ marginBottom: "100px" }}>
      //   <ToastContainer />
      //   <center>
      //     {/* <h1>Cart</h1> */}
      //     {cartData.length > 0 ? (
      //       <>
      //         <div className='CW'>
      //           {cartData.map(item => (
      //             <div key={item.id} className="food-item" style={{ width: "100%" }}>

      //               <Link to={`/FoodsFront/${item.FoodId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      //                 <img className="food-image" src={item.image} alt={item.name} />
      //               </Link>
      //               <div className="">
      //                 <h2 style={{ color: "#192F60" }} className="">{item.name}</h2>
      //                 <br />
      //                 <p style={{ justifyContent: "left" }} className="">{item.description}</p>
      //                 <br />
      //               </div>
      //               <input
      //                 type="checkbox"
      //                 checked={selectedItems.some(selectedItem => selectedItem === item.FoodId)}
      //                 onChange={() => handleSelectItem(item.FoodId)}
      //                 style={{ margin: "30px" }}
      //               />
      //               <Button variant='text' onClick={() => handleRemoveItem(item.id)}>remove</Button>

      //             </div>
      //           ))}
      //         </div>

      //         <div>
      //           <Button variant='contained' onClick={handleOrder} disabled={selectedItems.length === 0}>Place Order</Button>
      //         </div>
      //         <br />
      //       </>
      //     ) : (
      //         <>
      //           <p>No Items in Cart , Order Now</p>
      //           <br />
      //           <hr />
      //           <br />
      //           <span > <FoodsPage /></span>   <br />   <br />
      //         </>
      //       )}
      //   </center>
      // </div>
      <div style={{ marginBottom: "100px" }}>
      <ToastContainer />
      <center>
        {cartData.length > 0 ? (
          <>
            <div className='CW'>
              {cartData.map(item => (
                <div key={item.id} className="food-item">
  
                  <Link to={`/FoodsFront/${item.FoodId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img className="food-image" src={item.image} alt={item.name} />
                  </Link>
                  <div>
                    <h2 className="food-name">{item.name}</h2>
                    <p className="food-description">{item.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedItems.some(selectedItem => selectedItem === item.FoodId)}
                    onChange={() => handleSelectItem(item.FoodId)}
                    className="food-checkbox"
                  />
                  <Button variant='text' onClick={() => handleRemoveItem(item.id)}>remove</Button>
  
                </div>
              ))}
            </div>
  
            <Button variant='contained' className="place-order-btn" onClick={handleOrder} disabled={selectedItems.length === 0}>Place Order</Button>
            <br />
          </>
        ) : (
            <>
            <br />
              <p>No Items in Cart, Order Now</p>
              <br />
              <hr />
              <br />
              <span><FoodsPage /></span> <br /> <br />
            </>
          )}
      </center>
    </div>
    );
}

export default YourComponentWithoutOrder;
