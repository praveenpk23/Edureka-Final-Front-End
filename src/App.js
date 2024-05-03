// import logo from './logo.svg';
// import './App.css'
// import Home from './Home'
// import FoodDetailPage from './Details';
// import Login from './Auth/Login'
// import SignUp from './Auth/SignUp'
// import Navbar from './Cart/Navbar';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Footer from './Footer';
// // import './App.css'; // Import the CSS file for styling
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import NotFound from './NotFound';
// function App() {
//   return (
// <> 
// <Router>
//       <div className="App">
//         <div className="content"> 
//           <Routes>
//             <Route path='/' element={<Home />} />
//             <Route path='/Login' element={<Login />} />
//             <Route path='/SignUp' element={<SignUp />} />
//             <Route path='/Cart/*' element={<Navbar />} />
//             <Route path='/FoodsFront/:id' element={<FoodDetailPage />} />
//             {/* Define a catch-all route for 404 */}
//             <Route path='*' element={<NotFound />} />
//           </Routes>
//         </div>
      
//       </div>
//     </Router>
//           <Footer />
//    </>
//      );
// }

// export default App;


import logo from './logo.svg';
import './App.css'
import React from 'react';
import Home from './Home'
import FoodDetailPage from './Details';
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import Navbar from './Cart/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './Footer';
// import './App.css'; // Import the CSS file for styling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './NotFound';
import OfflineImage from './Images/no-disconnect.png'
function App() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOffline = () => setIsOnline(false);
    const handleOnline = () => setIsOnline(true);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <div className="App">
          {!isOnline && (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <img style={{width:"70%"}} src={OfflineImage} alt="Offline" />
              <h2>You are offline</h2>
              <p>Please check your internet connection</p>
            </div>
          )}
          {isOnline && (
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Cart/*" element={<Navbar />} />
                <Route path="/FoodsFront/:id" element={<FoodDetailPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          )}
                        <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Home from './Home';
// import FoodDetailPage from './Details';
// import Login from './Auth/Login';
// import SignUp from './Auth/SignUp';
// import Navbar from './Cart/Navbar';
// import Footer from './Footer';
// import NotFound from './NotFound';
// import OfflineImage from './Images/no-disconnect.png'; // Import your offline image
// import './App.css'
// function App() {
//   const [isOnline, setIsOnline] = React.useState(navigator.onLine);

//   React.useEffect(() => {
//     const handleOffline = () => setIsOnline(false);
//     const handleOnline = () => setIsOnline(true);

//     window.addEventListener('offline', handleOffline);
//     window.addEventListener('online', handleOnline);

//     return () => {
//       window.removeEventListener('offline', handleOffline);
//       window.removeEventListener('online', handleOnline);
//     };
//   }, []);

//   return (
//     <>
//       <ToastContainer />
//       <Router>
//         <div className="App">
//           {!isOnline && (
//             <div style={{ textAlign: 'center', marginTop: '50px' }}>
//               <img style={{width:"70%"}} src={OfflineImage} alt="Offline" />
//               <h2>You are offline</h2>
//               <p>Please check your internet connection</p>
//             </div>
//           )}
//           {isOnline && (
//             <div className="content">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/Login" element={<Login />} />
//                 <Route path="/SignUp" element={<SignUp />} />
//                 <Route path="/Cart/*" element={<Navbar />} />
//                 <Route path="/FoodsFront/:id" element={<FoodDetailPage />} />
//                 <Route path="*" element={<NotFound />} />
//               </Routes>
//             </div>
//           )}
//                         <Footer />
//         </div>
//       </Router>
//     </>
//   );
// }

// export default App;
