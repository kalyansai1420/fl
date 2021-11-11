import './Places.css';
import React from 'react';
import Placecard from './Placecard';
import {db} from './firebase';
import { useEffect, useState } from 'react';


function Places() {
    const [place,setplace]=useState('');
    const [fil,setfil]=useState('');

    useEffect(()=>{
        const propref= db.ref('/').child('explore');
        const fil = db.ref('places').orderByChild('place').equalTo('mumbai');
    
        propref.on('value',(snapshot)=>{
            setplace(snapshot.val());       
        })
        fil.on('value',(snap)=>{
            console.log((snap.val()));
            setfil(snap.val());
        })
    },[])

    return (
        <div className="places">
            <div className="places_title">
                <h1>
                    Explore by places
                </h1>
            </div>
                <div className="places_cards">
                    {place  ?place.map((ppp)=>(
                        <Placecard key={ppp.id} name={ppp.place} image={ppp.image} prop={ppp.properties}/>
                    )):''}
                </div> 
        </div>
    )
}

export default Places
