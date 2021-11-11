import './App.css';
import Navbar from '../src/Nav/Navbar';
import Header from  './Nav/Header';
import Places from './Places';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import Properties from './Properties';
import Banner from './Banner';
import Prop from './Prop';
import Footer from './Footer';
import Login from './Login';
import Signup from'./Signup';
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { useEffect } from 'react';
import ProductDetails from './ProductDetails';
import Adminbro from './Adminbro';
import User from './User';
import PropertiesList from './PropertiesList';
import BannerList from './BannerList';


function App() {

  const [state,dispatch]= useStateValue();

  useEffect(()=>{
      auth.onAuthStateChanged((authUser)=>{
      if(authUser)
      {
        dispatch({
          type:"SET_USER",
          user:authUser,
        });
      } else{
        dispatch({
          type:"SET_USER",
          user:null,
        });
        
      }
      })
  },[]);



  return (
  <div className="app">
      <Router>
        <Switch>
        <Route path="/use">
           <User/>
        </Route>
        <Route path="/propertieslist">
           <PropertiesList/>
        </Route>
        <Route path="/bannerlist">
           <BannerList/>
        </Route>
        <Route path="/admin">
           <Adminbro/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/ProductDetails">
              <Navbar/> 
              <ProductDetails/>
              {/* <Prop/> */}
              <Banner/>
              <Footer/>
          </Route>
          <Route path="/">
              <Navbar/> 
              <Header/>
              <Places />
              <Properties/>
              <Banner/>
              {/* <Prop/> */}
              <Footer/>
          </Route>

        </Switch>
      </Router> 

      
    </div>
  );
}

export default App;
