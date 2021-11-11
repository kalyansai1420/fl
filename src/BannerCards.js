import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './BannerCards.css';

function BannerCards({title,title1,image}) {

  
    return (
        <div className="bannercard">
            <img src={image}/>
            <div className="bannercard_content">
                <h1 className="title">{title}</h1>
                <h2 className="title1">{title1}</h2>
                <button className="btn"> CheckOut</button>
            
            </div>
            
        </div>
    )
}

export default BannerCards
