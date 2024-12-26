import React ,{useEffect}from 'react';
import logo1 from './globalization.svg';
import logo2 from './OBJECTIVES/download.svg';
import img1 from './OBJECTIVES/images_1.svg';
import img2 from './OBJECTIVES/images-_1_.svg';
import img3 from './OBJECTIVES/images-_2_.svg';
import img4 from './OBJECTIVES/images-_3_.svg';
import img5 from './OBJECTIVES/images-_4_.svg';
import img6 from './OBJECTIVES/images.svg';
import hand from './services/clipart2493730.png';
import der from './services/giphy.webp'
import line from './services/Untitled.png'
import hi from './services/giphy (1).webp'
import send from './services/giphy (2).webp'
import recv from './services/200.webp'
import useScrollAnimations from './useScroll';
import ne from './services/new.png';
import arrow from './services/arrow.png'
import n1 from './Svg/3132812_37135.svg'
import n2 from './services/Screenshot 2024-12-01 085728.png'
import n3 from './services/Screenshot 2024-12-01 085823.png'
import n4 from './services/Screenshot 2024-12-01 085919.png'
import n5 from './services/Screenshot 2024-12-01 090010.png'
import n6 from './services/Screenshot 2024-12-01 090047.png'

const Main = () => {
  useEffect(() => {
    // Dynamically add scroll-animate class to all sections
    const sections = document.querySelectorAll('div'); // Adjust selector as needed
    sections.forEach((section) => {
      section.classList.add('scroll-animate');
    });
  }, []);

  useScrollAnimations(); // Attach scroll animations

  return (
    <div className='main'>
      {/* Greetings Section */}
      <div className="greetings">
        <div>
          <h2>Welcome to <br></br><strong>Smart Community Engagement</strong> </h2>
        </div>
        <p>Explore our wide range of services designed to foster meaningful connections, drive innovation, and empower communities to grow and thrive in a smarter, more connected world!</p>
     
      </div>
     
      {/* Services Section */}
      <div className="services">
        <div className='ser-tit'>
          <div className='ser-tit-main'>
        <img src={der}></img>
        <h3>Explore Services</h3><img src={der}></img>
        </div>
        <div className='ser-tit-greet'>
        <h3>Connect, Share, and Support</h3>
        <h3>Locally and Globally</h3> 
        </div>
        </div>
        <div className='ser-rem'>

<div className='ser-card1'>
  <div className='ser-card1-desc'>
    <h1>Resource Sharing</h1>
    <p className='ser-card1-main'>Cut expenses, reduce waste, and embrace eco-friendly habits.</p>
    <p>Share or borrow everyday items like tools or gadgets. Save money, reduce clutter, and live sustainably.</p>
    
  </div>
  <img src={n1} alt="Resource Sharing"></img>
</div>

<div className='ser-card2'>
  <img src={n2} alt="Skill Exchange"></img>
  <div className='ser-card2-desc'>
    <h1>Skill Exchange</h1>
    <p  className='ser-card2-main'>Affordable, empowering, and community-driven solutions.</p>
    <p>Trade skills like coding, gardening, or repairs. Learn, collaborate, and grow together.</p>
    
  </div>
</div>

<div className='ser-card3'>
  <div className='ser-card3-desc'>
    <h1>Local Support Networks</h1>
    <p  className='ser-card3-main'> A caring community for mutual growth and support.</p>
    <p>Find help with tasks like grocery runs, babysitting, or pet care. Build stronger, connected neighborhoods.</p>
   
  </div>
  <img src={n3} alt="Local Support"></img>
</div>

<div className='ser-card4'>
  <img src={n4} alt="Community Events"></img>
  <div className='ser-card4-desc'>
    <h1>Community Events</h1>
    <p  className='ser-card4-main'>Build friendships, foster engagement, and strengthen bonds.</p>
    <p>Participate in events like cleanups, workshops, or cultural activities. Make an impact while having fun.</p>
    
  </div>
</div>

<div className='ser-card5'>
  <div className='ser-card5-desc'>
    <h1>Free/Low-Cost Marketplace</h1>
    <p  className='ser-card5-main'> Reduce waste, recycle smartly, and support circular communities.</p>
    <p>Find, share, or give away items responsibly. Declutter your space and embrace sustainable living.</p>
    
  </div>
  <img src={n5} alt="Marketplace"></img>
</div>

<div className='ser-card6'>
  <img src={n6} alt="Local News"></img>
  <div className='ser-card6-desc'>
    <h1>Local News & Alerts</h1>
    <p  className='ser-card6-main'> Stay safe, prepared, and in-the-know at all times.</p>
    <p>Stay informed with real-time news, events, and alerts. Be proactive and stay connected.</p>
    
  </div>
</div>

</div>


      </div>
      {/* Objectives Section */}
      <div className='objectives'>
        <div>
          <h3>Objectives</h3>
        </div>
        <div className="image-obj">
          {[logo2, img1, img2, img3, img4, img5, img6].map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Objective ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <div className='test-tit'>
        <img src={line}></img>
        <div className='test-title'>
          <img src={hi}></img>
        <h3>What Our Users Say</h3>
        <img src={hi}></img>
        </div>
        <img src={line}></img>
        </div>
        <div className="testimonial-card">
          <p>"This platform has been a game changer! I was able to borrow tools for my home renovation project without having to buy expensive new ones. I love how it brings the community together!"</p>
          <p><strong>- John Doe, Local Resident</strong></p>
        </div>
        <div className="testimonial-card">
          <p>"I found a gardening mentor through the Skill Exchange service. It’s amazing to learn new things while helping someone else out. Truly a great initiative!"</p>
          <p><strong>- Jane Smith, Gardening Enthusiast</strong></p>
        </div>
      </div>
      

      {/* Call to Action Section */}
      <div className="cta">
      <div className="marquee-container">
  <marquee behavior="scroll" direction="left" scrollamount="10">
    <h3>  Make Your Community. Join together ✈️</h3>
      </marquee>
</div>
   <div className='cta-im'>
    <img src={send}></img>
    <div className='ct'>
      <div className='c'>
        <img src={arrow}></img>
        <h2>Ready to Make a Difference in Your Community?</h2>
        <img src={arrow}></img>
        </div>
        <p>Join us today and start sharing, supporting, and growing with your neighbors!</p>
        <button className="cta-btn">Sign Up Now</button>
        </div>
        <img src={recv}></img>
    </div>
        
      <div className="marquee-container">
  <marquee behavior="scroll" direction="right" scrollamount="10">
    <h3>  Make Your Community. Join together ✈️</h3>
      </marquee>
</div>


      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <h3>How It Works ?</h3>
        <div className="steps">
          <div className="step">
            <h4>Step 1: <strong>Sign Up</strong></h4>
            <p>Join the platform in just a few clicks. Fill in your details and become part of a vibrant, supportive community.</p>
          </div>
          <div className="step">
            <h4>Step 2: <strong>Explore Services</strong></h4>
            <p>Browse our various services, from resource sharing to local support networks, and find what suits your needs.</p>
          </div>
          <div className="step">
            <h4>Step 3: <strong>Connect and Engage</strong></h4>
            <p>Start connecting with others in your area. Whether you need help or want to offer your skills, the community is waiting to engage.</p>
          </div>
        </div>
      </div>

      {/* Featured Partners Section */}
      <div className="partners">
        <h3>Our Trusted Partners</h3>
        <div className="partner-logos">
          <img src="partner-logo1.png" alt="Partner 1" />
          <img src="partner-logo2.png" alt="Partner 2" />
          <img src="partner-logo3.png" alt="Partner 3" />
        </div>
      </div>
      <div className="blog-section">
        <h3>Latest Articles</h3>
        <div className="blog-posts">
          <div className="blog-post">
            <h4>5 Ways to Get Involved in Your Local Community</h4>
            <p>Discover simple ways to contribute to the well-being of your neighborhood. From volunteering to sharing resources...</p>
            <a href="#">Read More</a>
          </div>
          <div className="blog-post">
            <h4>How to Start Skill Sharing in Your Area</h4>
            <p>Skill-sharing is a powerful tool for community building. Here’s how you can get started...</p>
            <a href="#">Read More</a>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <div className="footer">
        <div className="footer-links">
          <a href="#about-us">About Us</a>
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#contact">Contact Us</a>
        </div>
        <div className="social-media">
          <a href="https://www.linkedin.com">LinkedIn</a>
          <a href="https://www.github.com">GitHub</a>
          <a href="https://www.instagram.com">Instagram</a>
        </div>
        <p>&copy; 2024 Smart Community Platform. All Rights Reserved.</p>
      </div>

      {/* Blog/Resources Section */}
      
 </div>
  );
};

export default Main;
