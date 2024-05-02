import React, { useEffect, useState } from 'react';
import './HomePage.css'
function ZomatoClone() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurantData();
    }, []);

    const fetchRestaurantData = () => {
        fetch('http://localhost:3001/api/restaurants')
            .then(response => response.json())
            .then(data => {
                setRestaurants(data);
            })
            .catch(error => {
                console.error('Error fetching restaurant data:', error);
            });
    };

    return (
        <div>
            <div className="container-fluid bg-img">
                <header className="header" style={{ position: 'relative', textDecoration: 'none' }}>
                    <br />
                    <span><a className="Login" href="#" style={{ textDecoration: 'none', color: 'white' }}>Login</a></span>
                    <span style={{ position: 'absolute', top: 1, right: 0, marginRight: '5%' }}><a className="CA" href="#" style={{ textDecoration: 'none', color: 'white', border: '1px solid white', padding: '10px', borderRadius: '5px' }}>Create an account</a></span>
                </header>
                <br />
                <div className="col-md-12 text-center" style={{ marginTop: '40px' }}>
                    <span className="Logo">W</span>
                </div>
                <br />
                <div className="col-md-12 text-center">
                    <p className="Pa text-center">Find the best restaurants, cafés, and bars</p>
                </div>
    
                <div className="row">
                    <div className="col-md-5 col-xs-12 text-center">
                        <input className="Location" type="search" list="Plist" placeholder="Please type a location" />
                        <datalist id="Plist" className="dropdown-menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {/* Restaurant locations will be dynamically populated here */}
                        </datalist>
                    </div>
                    <div className="col-md-7 col-xs-12 well text-center">
                        <div style={{ position: 'relative' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search lens" viewBox="0 0 16 16" style={{}}>
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                            <input list="restaurantList" className="Search" type="text" placeholder="Search for restaurants" />
                            <datalist id="restaurantList">
                                {/* Restaurant options will be dynamically populated here */}
                            </datalist>
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="container mt-4">
                <p style={{ color: '#192F60', fontSize: '30px', fontWeight: 'bolder' }}>Quick Searches</p>
                <p style={{ color: '#8C96AB' }}>Discover restaurants by type of meal</p>
                <div className="row" id="quickSearches">
                    {restaurants.map((restaurant, index) => (
                        <div key={index} className="col-md-4 Boz mt-3 col-sm-12" style={{ height: 'min-content', border: '1px solid rgb(255, 255, 255)', background: '#FFFFFF 0% 0% no-repeat padding-box', boxShadow: '0px 3px 6px #00000029', opacity: '1', padding: '0px' }}>
                            <div className="row">
                                <div className="col-6">
                                    <img src='./src/Images/drinks.png' style={{ width: '95%', height: '100%' }} />
                                </div>
                                <div className="col-6">
                                    <h4 style={{ display: 'inline-block', color: '#192F60' }}>{restaurant.title}</h4>
                                    <span style={{ display: 'inline-block', color: '#8C96AB' }}>{restaurant.description}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>  
        </div>
    );
    
}

export default ZomatoClone;
