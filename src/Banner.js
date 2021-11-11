import React from 'react'
import './Banner.css'
import { useEffect, useState } from 'react';
import BannerCards from './BannerCards';
import {db} from './firebase';

import Slider from "react-slick";

function Banner() {
    
    var settings = {
      infinite: true,
      speed: 1000,
      arrows: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  
    const[title,settitle] = useState('');
    const[title1,settitle1] = useState('');
    const[image,setimage] = useState('');
    useEffect(()=>{
      const propref= db.ref('/').child('banner');
      propref.on('value',(snapshot)=>{
          settitle(snapshot.val());       
      })
  },[])

    return (
        <div className="banner">
          <Slider {...settings}>
              {
                title  ?title.map((ppp)=>(
                  <BannerCards key={ppp.id} title={ppp.title} image={ppp.image} title1={ppp.title1}/>
              )):''
              }
          </Slider>

              {/* {
                title  ?title.map((ppp)=>(
                  <BannerCards key={ppp.id} title={ppp.title} image={ppp.image} title1={ppp.title1}/>
              )):''
              } */}
            {/* <div><BannerCards/></div>
            <div><BannerCards/></div>
            <div><BannerCards/></div>
            <div><BannerCards/></div> */}
        </div>
    )
}

export default Banner
