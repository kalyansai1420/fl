import React from 'react';
import Modal from 'react-modal';
import {db,storage} from './firebase';
import { useEffect ,useState} from 'react';
import './Adminbro.css'
// import { Button, Link } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropertiesList from './PropertiesList';
import BannerList from './BannerList';
import User from './User'




const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


function Adminbro() {

    const [id, setid] = useState('');
    const [type, settype] = useState('');
    const [description,setdescription] = useState('');
    const [image, setimage] = useState('');
    const [area, setarea] = useState('');
    const [usercount,setusercount]=useState('');
   const[propertiescount,setpropertiescount]=useState('');
    useEffect(()=>{
      db.ref('/').child('Users').on('value', snap =>{
        console.log(snap.numChildren());
        setusercount(snap.numChildren());
    })
    db.ref('/').child('places').on('value', snap =>{
      console.log(snap.numChildren());
      setpropertiescount(snap.numChildren());
  })
    },[])

  
    
    
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }


  
    function afterOpenModal() {
    
     
    }
  
    function closeModal(){
      setIsOpen(false);
    }
  
    const upload = ()=>{
        if(image == null)
          return;
        storage.ref(`/plots/${image.name}`).put(image)
        .on("state_changed" ,
        
        ()=>{
          storage.ref(`/plots/${image.name}`).getDownloadURL().then(
            (url)=>{
              console.log(url);
            }
          )
          }
        );
      }
  const adddata = () => {
    if (description) {
      const uDes = description.replace(/\n\r?/g, " <br/> ");
      db.ref('/').child('places').child(id).set({
                        type: type,
                        id: id,
                        image:image,
                        area:area,
                        // description:description
                        description:uDes
        });
    }
    
        
          
      }
  
    return (
        <div className="admin">
            <h1>welcome admin</h1>
            <button onClick={openModal} className="btn1">Add item</button>

           
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

       
          <button onClick={closeModal}>✖️</button>
          {/* <div>I am a modal</div> */}
          <form  >
            <h3>Id</h3>
            <input type="text" value={id} onChange={e=> setid(e.target.value)}/>
            <h3>type</h3>
            <input type="text" value={type} onChange={e=> settype(e.target.value)}/>
            <h3>Descr</h3>
            <textarea type="text" cols={10} value={description} onChange={e=> setdescription(e.target.value)}/>
            <h3>Image</h3>
            <input type="text" value={image} onChange={(e)=>setimage(e.target.value)}/>
            <h3>area</h3>
            <input type="text" value={area} onChange={(e)=>setarea(e.target.value)}/>
             <button className="btn2" onClick={adddata} >Add item</button>
          </form >
        </Modal>
        <div className="admin_cards">
          <div className="admin_users">
              <h1>Users</h1>
              <h2>{usercount}</h2>
              <Link to="/use" style={{textDecoration: 'none'}}>
                <button className="btn3"><p><User/></p></button>
              </Link>
            </div>
            <div className="admin_properties">
              <h1>Properties</h1>  
              <h2>{propertiescount}</h2>            
              <Link to="/propertieslist" style={{textDecoration: 'none'}}>
                <button className="btn3"><p><PropertiesList/></p></button>
              </Link>            
              </div>
            <div className="admin_banner">
              <h1>BannerList</h1>
              <Link to="/bannerlist" style={{textDecoration: 'none'}}>
                <button className="btn3"><p><BannerList/></p></button>
              </Link> 
            </div>
        </div>
        <div className="home">
          <Link to='/' style={{textDecoration:'none'}}>
            <button className="btn4"><p>Home</p></button>
          </Link>
        </div>
        </div>
    )
}

export default Adminbro
