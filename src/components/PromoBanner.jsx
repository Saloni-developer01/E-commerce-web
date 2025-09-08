import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container2  banner__container container bg-white'>
      <div className="banner__card">
        <span><i class="fa-regular fa-truck"></i></span>
        <h4>Free Delivery</h4>
        <p>Offers convenience and the ability to shop from anywhere, anytime. </p>
      </div>
      <div className="banner__card">
        <span><i class="fa-solid fa-circle-dollar-to-slot"></i></span>
        <h4>100% Money Back Guaranty</h4>
        <p>Your satisfaction is guaranteed with our 100% hassle-free return policy.</p>
      </div>
      <div className="banner__card">
        <span><i class="fa-solid fa-phone-volume"></i></span>
        <h4>Strong Support</h4>
        <p>We're here to help with our dedicated customer support service.</p>
      </div>
    </section>
  )
}

export default PromoBanner
