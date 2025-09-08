import React from 'react'


const Footer = () => {
  return (
    <>
      <footer className='section__container footer__container'>
        <div className="footer__col">
            <h4>CONTACT INFO</h4>
            <p>
                <span><ion-icon name="location"></ion-icon></span>
                12 Oakwood Lane, Anytown, CA 91234
            </p>
            <p>
                <span><ion-icon name="mail"></ion-icon></span>
                support@dashdeal.com
            </p>
            <p>
                <span><ion-icon name="call"></ion-icon></span>
                (555) 123-4567
            </p>
        </div>


        <div className="footer__col">
            <h4>USEFUL LINK</h4>
            <a href="/">Help</a>
            <a href="/">Track your order</a>
        </div>

        <div className="footer__col">
            <h4>INSTAGRAM</h4>
            <div className="instagram__grid">
                <img src="instagram-1.jpg" alt="" />
                <img src="instagram-2.jpg" alt="" />
                <img src="instagram-3.jpg" alt="" />
                <img src="instagram-4.jpg" alt="" />
                <img src="instagram-5.jpg" alt="" />
                <img src="instagram-6.jpg" alt="" />
            </div>
        </div>
      </footer>

      <div className="footer__bar">
        Copyright &copy; 2025 by DashDeals. All rights reserved. 
      </div>
    </>
  )
}

export default Footer
