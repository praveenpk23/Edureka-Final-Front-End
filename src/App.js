import logo from './logo.svg';
import './App.css'
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

function App() {
  return (
<> 
<Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/Cart/*' element={<Navbar />} />
            <Route path='/FoodsFront/:id' element={<FoodDetailPage />} />
          </Routes>
        </div>
      
      </div>
    </Router>
          <Footer />
   </>
     );
}

export default App;
