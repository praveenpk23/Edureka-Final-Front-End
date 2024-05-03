


// import React, { useState, useEffect } from 'react';
// import { CircularProgress } from '@mui/material';

// function OrderPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await fetch('http://localhost:3038/foods');
//         if (!response.ok) {
//           throw new Error('Failed to fetch restaurants');
//         }
//         const restaurantsData = await response.json();
//         setRestaurants(restaurantsData);
//       } catch (error) {
//         console.error('Error fetching restaurants:', error);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch('http://localhost:3038/api/orders');
//         if (!response.ok) {
//           throw new Error('Failed to fetch orders');
//         }
//         const ordersData = await response.json();
//         setOrders(ordersData);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }
//   console.log(restaurants);

//   const findItemData = (itemId) => {
//     return restaurants.find(restaurant => restaurant.id == itemId);
//   };

//   return (
//     <div>
//       <center>
//         <h1>Orders</h1>
//         <br />
//         <ul>
//           {orders.length > 0 ? (
//             orders.map(order => (
//               <li style={{ border: "2px solid black", width: "50%" }} key={order._id}>
//                 {order.Status === 'Delivered' ? (
//                   <p>No Orders Found</p>
//                 ) : (
//                   <span>
//                     <h1>Order Id : {order.OrderId}</h1>
//                     <p>Status: {order.Status}</p>
//                     <ul>
//                       {order.Items.map((item, index) => {
//                         const itemData = findItemData(item);
//                         return (
//                           <li key={index}>
//                             Item: {itemData ? `${itemData.name} - ${itemData.description}` : 'Unknown Item'}
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </span>
//                 )}
//                 <br />
//               </li>
//             ))
//           ) : (
//             <center><p>No Order Found</p></center>
//           )}
//         </ul>
//       </center>
//     </div>
//   );
// }

// export default OrderPage;





// import React, { useState, useEffect } from 'react';
// import { CircularProgress } from '@mui/material';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// function OrderPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await fetch('http://localhost:3038/foods');
//         if (!response.ok) {
//           throw new Error('Failed to fetch restaurants');
//         }
//         const restaurantsData = await response.json();
//         setRestaurants(restaurantsData);
//       } catch (error) {
//         console.error('Error fetching restaurants:', error);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch('http://localhost:3038/api/orders');
//         if (!response.ok) {
//           throw new Error('Failed to fetch orders');
//         }
//         const ordersData = await response.json();
//         setOrders(ordersData);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   const findItemData = (itemId) => {
//     return restaurants.find(restaurant => restaurant.id == itemId);
//   };

//   return (
//     <div>
//       <center>
//         <h1>Orders</h1>
//         <br />
//         <ul>
//           {orders.length > 0 ? (
//             orders.map(order => (
//               <li style={{ border: "2px solid black", width: "50%" }} key={order._id}>
//                 {order.Status === 'Delivered' ? (
//                   <p>No Orders Found</p>
//                 ) : (
//                   <span>
//                     <h1>Order Id : {order.OrderId}</h1>
//                     <p>Status: {order.Status}</p>
//                     <ul>
//                       {order.Items.map((item, index) => {
//                         const itemData = findItemData(item);
//                         return (
//                           <li key={index}  >
//                             {itemData ? (
//                               <div className="foods-containe" style={{width:"80%"}}  >
//                                 <Link key={itemData.id} to={`/FoodsFront/${itemData.id}`} style={{ textDecoration: 'none', color: 'inherit',width:"100%" }}>
//                                   <center>
//                                     <div  className="food-item">
//                                       <img className="food-image" src={itemData.image} alt={itemData.name} />
//                                       <div className="food-details">
//                                         <h2 style={{ color: "#192F60" }} className="food-name">{itemData.name}</h2>
//                                         <br />
//                                         <p style={{ justifyContent: "left" }} className="food-id">{itemData.description}</p>
//                                       </div>
//                                     </div>
//                                   </center>
//                                 </Link>
//                               </div>
//                             ) : (
//                               <p>Unknown Item</p>
//                             )}
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </span>
//                 )}
//                 <br />
//               </li>
//             ))
//           ) : (
//             <center><p>No Order Found</p></center>
//           )}
//         </ul>
//       </center>
//     </div>
//   );
// }

// export default OrderPage;



import React, { useState, useEffect } from 'react';
import { CircularProgress,Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:3038/foods');
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const restaurantsData = await response.json();
        setRestaurants(restaurantsData);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3038/api/orders');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch orders');
  //       }
  //       const ordersData = await response.json();
  //       setOrders(ordersData);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, []);
  const fetchOrdersData = async () => {
    try {
      const response = await fetch('http://localhost:3038/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const ordersData = await response.json();
      setOrders(ordersData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, []);


  const handleCancel = async (orderId) => {
    const shouldCancel = window.confirm('Are you sure you want to cancel this order?');
  
    if (!shouldCancel) {
      return; // User cancelled the action
    }
  
    try {
      const currentDate = new Date().toISOString(); // Get current date and time
      const response = await fetch(`http://localhost:3038/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Status: 'Cancel',
          CancelTime: currentDate
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }
  
      // Optionally, you can handle the response here
      const updatedOrder = await response.json();
      console.log('Order updated successfully:', updatedOrder);
      fetchOrdersData()
      // You may want to trigger a refresh of the orders after cancelling
      // Call a function to refresh orders or update state accordingly
      // refreshOrders();
    } catch (error) {
      console.error('Error cancelling order:', error);
      // Handle error state or display error message to the user
    }
  };
  
  


  if (loading) {
    return (
      <center style={{marginTop:"100px"}}>  <CircularProgress /> </center>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const findItemData = (itemId) => {
    return restaurants.find(restaurant => restaurant.id == itemId);
  };



  return (
    <div>
      {/* <h1 style={{ textAlign: 'center', marginTop: '20px', fontSize: '2rem' }}>Orders</h1> */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {/* Current Orders */}
        {orders.filter(order => order.Status !== 'Delivered' && order.Status !== 'Cancel').length > 0 ? (
          orders.filter(order => order.Status !== 'Delivered' && order.Status !== 'Cancel').map(order => (
            <li key={order._id} style={{ border: '2px solid black', width: '50%', margin: '20px auto', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ marginBottom: '10px', color: '#192F60' }}>Order Id: {order.OrderId}</h2>
              <p>Status: {order.Status}</p>
              {order.Status === 'Pending' && (<Button variant='text' size='small' color='error' onClick={() => handleCancel(order._id)} style={{ marginTop: '10px', textTransform: 'capitalize' }}>Cancel</Button>
)}
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {order.Items.map((item, index) => {
                  const itemData = findItemData(item);
                  return (
                    <li key={index} style={{ margin: '20px 0', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                      {itemData ? (
                        <Link to={`/FoodsFront/${itemData.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={itemData.image} alt={itemData.name} style={{ width: '100px', height: '100px', marginRight: '20px', borderRadius: '10px' }} />
                            <div>
                              <h3 style={{ marginBottom: '10px', color: '#192F60' }}>{itemData.name}</h3>
                              <p style={{ color: '#555' }}>{itemData.description}</p>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <p>Unknown Item</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))
        ) : (
         <> 
         <br />
          <p style={{ textAlign: 'center' }}>No Current Orders Found</p> 
        </>
        )}
        {/* Order History */}
        {orders.filter(order => order.Status === 'Delivered').length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.5rem', color: '#555' }}>Order History</h2>
            {orders.filter(order => order.Status === 'Delivered').map(order => (
              <li key={order._id} style={{ border: '2px solid green', width: '50%', margin: '20px auto', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <h2 style={{ marginBottom: '10px', color: '#192F60' }}>Order Id: {order.OrderId}</h2>
                <p>Status: {order.Status}</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {order.Items.map((item, index) => {
                    const itemData = findItemData(item);
                    return (
                      <li key={index} style={{ margin: '20px 0', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                        {itemData ? (
                          <Link to={`/FoodsFront/${itemData.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <img src={itemData.image} alt={itemData.name} style={{ width: '100px', height: '100px', marginRight: '20px', borderRadius: '10px' }} />
                              <div>
                                <h3 style={{ marginBottom: '10px', color: '#192F60' }}>{itemData.name}</h3>
                                <p style={{ color: '#555' }}>{itemData.description}</p>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <p>Unknown Item</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </div>
        )}
        {/* Cancelled Orders */}
        {orders.filter(order => order.Status === 'Cancel').length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.5rem', color: 'red' }}>Cancelled Orders</h2>
            {orders.filter(order => order.Status === 'Cancel').map(order => (
              <li key={order._id} style={{ border: '2px solid red', width: '50%', margin: '20px auto', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <h2 style={{ marginBottom: '10px', color: '#192F60' }}>Order Id: {order.OrderId}</h2>
                <p>Status: {order.Status}</p>
                <p>Date: {order.updatedAt}</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {order.Items.map((item, index) => {
                    const itemData = findItemData(item);
                    return (
                      <li key={index} style={{ margin: '20px 0', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                        {itemData ? (
                          <Link to={`/FoodsFront/${itemData.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <img src={itemData.image} alt={itemData.name} style={{ width: '100px', height: '100px', marginRight: '20px', borderRadius: '10px' }} />
                              <div>
                                <h3 style={{ marginBottom: '10px', color: '#192F60' }}>{itemData.name}</h3>
                                <p style={{ color: '#555' }}>{itemData.description}</p>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <p>Unknown Item</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
  
}

export default OrderPage;
