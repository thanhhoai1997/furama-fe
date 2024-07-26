import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
       
        
          <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',position : 'absolute',bottom : '0px',width : '100%',height: '6vh'}}>
           
            <Link style={{textDecoration : 'none',marginBottom : '1vh'}} className='text-black' to='/'>
              <i>furamaresort@gmail.com </i>
            </Link>
          </div>
       
      );

}

export default Footer;