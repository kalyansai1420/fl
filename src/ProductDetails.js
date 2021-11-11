import React, { useState,useEffect } from 'react'
import './ProductDetails.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Button from '@material-ui/core/Button';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import {db} from './firebase';
import firebase from "firebase";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


function ProductDetails() {

  let user = firebase.auth().currentUser;
  const location = useLocation();

  const [place,setplace] = useState('');
  const [plotid,setplotid] = useState('');
  const [userid,setuserid] = useState('');
  const [img,setimg] = useState('');
  const [area,setarea] = useState('');
  const [des,setDes] = useState('');
  const[rating,setrating] =useState(5)

  useEffect(()=>{
    setplace(location.state.title);
    setplotid(location.state.id);
    setimg(location.state.image);
    setarea(location.state.area);
    setplotid(location.state.pid);
  },[])

	useEffect(() => {
		const descr = location.state.description;
		const desData = descr.split('<br/>').map((t) => {
			return (
				<text>
					{t}
					<br />
				</text>
			);
		});
		setDes(desData);
	}, [location.state.description]);

  const options = [
      ` ${location.state.area} Sq-ft`, 
      `${location.state.area*0.11} Sq-yrd`, 
      `${location.state.area*0.09} Sq-m`,
      `${location.state.area*0.000023} Acre`,
      `${location.state.area*0.0023} Cent`,
      `${location.state.area*0.00091} Guntha`
  ];
  const defaultOption = options[0];

  var area_sqft = location.state.area;
    
        const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    // const [title,setTitle] = useState('');
    // const interested = e =>{
    //   e.preventDefault();
    // }
    const pushCart = () =>{
    
    var uid = user.email;
    var uid1   = uid.substring(0, uid.lastIndexOf("@"));
    var name = uid1.replace(/[^a-zA-Z0-9 ]/g, "");
    var unid = uuidv4();
    const theID = unid;
    // console.log(theID);
   
    db.ref('/').child('cart').child(name).child(theID).set({
        place:place,
        image:img,
        area:area, 
  });
  }  
  // var area = location.state.area;

   return (
        <div className="productdetails" id="product">
            <div className="productdetails_left">
            {/* <Carousel responsive={responsive}> */}

                <div className="img-box">
                    <img src={location.state.image}/>   
                </div>  
                  
            {/* </Carousel> */}
       
            </div>
            <div className="productdetails_right">
              
                <h1> {location.state.title}</h1>
                <p>Location</p>
                <h3>{des}</h3>
                <div className="pro">
                    <div className="pro_left">
                      {Array(rating)
                        .fill()
                        .map((_, i) => (
                          <p>🌟</p>
                        ))}     
                    </div>
                    <div className="pro_right">
                        {/* <h3>{area_sqft}</h3> */}
                        <Dropdown options={options}  value={defaultOption} placeholder="Select an option" />
                    </div>
                </div>
              
                
                <Button onClick={pushCart} variant="outlined">I am Interested</Button>

            </div>

        </div>
        
    )
}


export default ProductDetails;
