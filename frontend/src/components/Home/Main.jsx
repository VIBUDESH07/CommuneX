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
          <h2>Welcome to the Smart Community Engagement and Resource Sharing Platform! 🌟</h2>
          <h3>Connect, Share, and Support Your Community—Locally and Globally</h3>
        </div>
        <img src={logo1} className='image' alt="Globalization Logo" />
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

      {/* Services Section */}
      <div className="services">
        <div className='ser-tit'>
        <img src={der}></img>
        <h3>Services</h3><img src={der}></img>
        </div>
        <div className='ser-rem'>
          <div>
            <img src={hand} alt="Hand Illustration" />
          </div>

          <div className='ser-tot'>
            <div className='ser-card'>
              <h1>Resource Sharing</h1>
              <p>
                Easily lend or borrow everyday items within your local community to reduce waste and save money. From tools to appliances, it’s a sustainable way to meet your needs without buying new items.
              </p>
              <p>Saves money, reduces waste, and promotes sustainability.</p>
            </div>

            <div className='ser-card2'>
              <h1>Skill Exchange</h1>
              <p>
                Trade your skills or expertise in one area for help in another. Whether it’s coding, gardening, or home repairs, skill-sharing makes services affordable and builds a community of mutual support.
              </p>
              <p>Encourages collaboration, eliminates monetary barriers, and creates a supportive network.</p>
            </div>

            <div className='ser-card3'>
              <h1>Local Support Networks</h1>
              <p>
                Get help with everyday tasks from your neighbors. Whether it’s carrying groceries or walking a dog, local support brings people together for mutual aid, especially for vulnerable individuals.
              </p>
              <p>Builds a supportive, connected community that cares for its members.</p>
            </div>

            <div className='ser-card4'>
              <h1>Community Events and Activities</h1>
              <p>
                Organize or participate in community events like cleanups, cultural activities, or workshops. Engage with your neighborhood and make a positive impact while having fun.
              </p>
              <p>Strengthens social bonds, promotes community engagement, and fosters positive interactions.</p>
            </div>

            <div className='ser-card5'>
              <h1>Marketplace for Free/Low-Cost Goods</h1>
              <p>
                Share items you no longer need or find free or low-cost goods in your area. Whether you’re moving, decluttering, or looking for something specific, the platform offers a way to give and receive items responsibly.
              </p>
              <p>Reduces waste, supports recycling, and ensures items are reused rather than discarded.</p>
            </div>

            <div className='ser-card7'>
              <h1>Local News and Alerts</h1>
              <p>
                Stay informed with local news, emergency alerts, and notifications from community organizations. Whether it’s a weather warning or a local event, the platform ensures you're always in the loop.
              </p>
              <p>Keeps the community informed, promotes safety, and helps people take action during crises.</p>
            </div>
          </div>
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
        <h2>Ready to Make a Difference in Your Community?</h2>
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
