import React from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="header">
            <div className="header_info">
                <h2>The <br /> Greatest <br /> places to live</h2>
                {/* <Link to="/ProductDetails">
                    <Button variant="contained"><p>I am Interested</p> </Button>
                </Link> */}
            </div>
          
        </div>
    )
}

export default Header
 