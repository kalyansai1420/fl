import React from 'react';
import './Cartbar.css'

function Cartbar({name,image,prop}) {
    
    return (
        <div className="cartbar">
                <div className="cartbar_image">
                    <img src={image}/>
                </div>
            <div className="cartbar_info">
                <h2>{name}</h2>
                <p>{prop}</p>
            </div>
            
        </div>
    )
}

export default Cartbar
