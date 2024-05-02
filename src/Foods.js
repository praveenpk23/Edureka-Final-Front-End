// import React, { useState, useEffect } from "react";

// function FoodsPage() {
//     const [foods, setFoods] = useState([]);

//     useEffect(() => {
//             // Fetch food data from the server
//         fetch('http://localhost:3038/Foods')
//         .then(response => response.json())
//         .then(data => {
//                 setFoods(data);
//                 console.log('Foods',data)
//             })
//             .catch(error => console.error('Error fetching foods:', error));
//     }, []);

//     return (
//         <div>
//             <h1>All Foods</h1>
//             <div className="foods-container">
//                 {foods.map(food => (
//                     <div key={food.id} className="food-item">
//                         {/* <img src={food.image} alt={food.name} /> */}
//                         <p>{food.name}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default FoodsPage;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Food.css'
function FoodsPage() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        // Fetch food data from the server
        fetch('http://localhost:3038/Foods/')
            .then(response => response.json())
            .then(data => {
                setFoods(data);
                console.log('Foods',data);
            })
            .catch(error => console.error('Error fetching foods:', error));
    }, []);

    return (
        <center>
                <div className="foods-container">
                    {foods.map(food => (
                        <Link key={food.id} to={`/FoodsFront/${food.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                         <center>
                         <div className="food-item">
                                <img className="food-image" src={food.image} alt={food.name} />
                                <div className="food-details">
                                    <h2 style={{color:"#192F60"}} className="food-name">{food.name}</h2>
                                    <br />
                                    <p style={{justifyContent:"left",color:"black"}} className="food-idX">{food.description}</p>
                                </div>
                            </div>
                         </center>
                        </Link>
                    ))}
                </div>
        </center>
    );
    
    
    
}

export default FoodsPage;
