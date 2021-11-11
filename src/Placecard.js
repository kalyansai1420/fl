import React from 'react';
import './Placecard.css';
// import { Link } from 'react-router-dom';

function Placecard({name,image,prop}) {
    return (
        <div className="placecard">
                <div className="placecard__image">
                    <img src={image}/>
                </div>
            <div className="placecard__info">
                <h2>{name}</h2>
                <p>{prop}</p>
            </div>
            
        </div>
        
    )
}

export default Placecard
