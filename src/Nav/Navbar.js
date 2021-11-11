import React, { useState,useEffect } from 'react';
import "./Navbar.css";
import './Header.css';
import Modal from 'react-modal';
import Cartbar from '../Cartbar';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { IconButton, withWidth } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { auth } from "../firebase";
import { useStateValue } from "../StateProvider";
import { v4 as uuidv4 } from 'uuid';
import firebase from "firebase";
import {db} from '../firebase';
import Placecard from '../Placecard';
import SideNav from 'react-simple-sidenav';


const customStyles = {
    content : {
      top                   : '55%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      // marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width:'80%'
      
    }
  };

function Navbar() {
    let currentUser = firebase.auth().currentUser;
    //let user = authUser.currentUser.displayName;
    {/* Sign In
		{user ? <p>Hello, {user.displayName}</p> 
  : <p>Please sign in.<p>} */}
  
    var subtitle;

    const [{ user }, dispatch] = useStateValue();

    const [navbar,setnavbar] = useState(false);
    const [cart,setcart] = useState(null);
    const [place,setplace] = useState('');

    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
    
     
    }
    
    function closeModal(){
      setIsOpen(false);
    }

    const changeBackground = () =>{
        if(window.scrollY >= 80){
            setnavbar(true);
        }else{
            setnavbar(false);
        }
    }
    const handleAuthenticaton = () => {
        if (user) {
          auth.signOut();
        }
      }

      useEffect(()=>{
        auth.onAuthStateChanged((authUser)=>{
        if(authUser)
        {
          dispatch({
            type:"SET_USER",
            user:authUser,
          });

          var uid = currentUser.email
          var uid1   = uid.substring(0, uid.lastIndexOf("@"));
          var name = uid1.replace(/[^a-zA-Z0-9 ]/g, "");
          var unid = uuidv4();
          const theID = unid;

        const propref= db.ref('/').child('cart').child(name);        
          propref.on('value',(snapshot)=>{

            if(snapshot.exists()){
                setcart(Object.values(snapshot.val()));
              console.log(Object.values(snapshot.val()))
            }     
          })
        } else{
          dispatch({
            type:"SET_USER",
            user:null,
          });
          
        }
        })
    },[user]);
        const [showNav, setShowNav] = useState();
        const navItems = [
          <Link to={!user && '/login'} style={{textDecoration: 'none'}}>
          <div onClick={handleAuthenticaton} className="sidenav_options">
              <span className="sidenav__optionLineOne">Hello {!user  ? 'Guest' : user.email}</span>
              <br />
              <span className="sidenav__optionLineTwo">{user  ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>,
         <Link to="/" style={{textDecoration: 'none'}}>
         <h1 className="sidenav__optionLineTwo">Home</h1>

     </Link>
          // <a  href="#" className="sidenav__links">
          //   Home
          // </a>,
          // <a target="_blank" href="someLink">
          //   Link2
          // </a>,
          // <a target="_blank" href="someLink">
          //   Link3
          // </a>,
          
        ];
      const title =   
          <h1>Fortune Lands</h1>;
           
    window.addEventListener('scroll',changeBackground);
    return (
        <div className={navbar? 'navbar active':'navbar'}>
            <div className="navbar__container">
                
                <div className="navbar_left">
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <h1>Fortunelands</h1>

                    </Link>
                </div>
                
                <div className="navbar_right">
                    
                    <Link to={!user && '/login'} style={{textDecoration: 'none'}}>
                        <div onClick={handleAuthenticaton} className="header__option">
                            <span className="header__optionLineOne">Hello {!user  ? 'Guest' : user.email}</span>
                            <span className="header__optionLineTwo">{user  ? 'Sign Out' : 'Sign In'}</span>
                        </div>
                    </Link>
                    <div className="navbar_button">
                      <IconButton  className="navbar_iconButton1"  >
                          <MenuIcon className="menuIcon" 
                            onClick={() => setShowNav(true)} />
                              <SideNav 
                              showNav={showNav} 
                              openFromRight={false}
                              titleStyle={{backgroundColor: '#111'}}
                              itemStyle={{backgroundColor: '#FFF'}}
                              onHideNav={() => setShowNav(false)} 
                              title={title} 
                              items={navItems}
                               />                              
                        </IconButton>

                        <IconButton  className="navbar_iconButton"  >
                            <ShoppingCartIcon onClick={openModal}/>
                            <div className="checkout">
                                {/* <button >Open Modal</button> */}
                                <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                                >
                                <button onClick={closeModal}>✖️</button>

                                <h2 ref={_subtitle => (subtitle = _subtitle)}>Your cart</h2>
                                                      
                                <form>
                                {   cart  ? cart.map((ppp)=>(
                                    <Cartbar name={ppp.place} image={ppp.image} />
                                    )):''
                                }       
                                </form>
                                </Modal>
                            </div>
                        </IconButton>
                    </div>
                    

                </div> 
            </div>
            
        </div>
    )
}

export default Navbar
