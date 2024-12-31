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
import giphy from './services/giphy.webp'
import line from './services/Untitled.png'
import hi from './services/giphy (1).webp'
import send from './services/giphy (2).webp'
import recv from './services/200.webp'
import useScrollAnimations from './useScroll';
import arr from './Svg/e6e45d2aafca09a4b64c905e968d12ea.png'
import arrow from './services/arrow.png'
import n2 from './Svg/—Pngtree—cloud data sharing pictures_5447925.png'
import n1 from './Svg/—Pngtree—barter exchange concept showing two_18962623.png'
import n3 from './Svg/—Pngtree—volunteer charity_5415812.png'
import n4 from './Svg/rachel-coyne-U7HLzMO4SIY-unsplash.jpg'
import n5 from './Svg/—Pngtree—neighbors clipart family of people_11074551.png'
import n6 from './Svg/—Pngtree—newspaper isolated on transparent background_15387381.png'
import wel from './Svg/—Pngtree—hand drawn children say hello_5937126.png'
import rep from './Svg/—Pngtree—man standing to say hello_7670366.png'
import globe from './Svg/earth.ffd19520c4086c9eb848.png'
import n7 from './Svg/—Pngtree—red triangle alert icon_4750635.png'
const Main = () => {

  return (
    <div className='main'>
      {/* Greetings Section */}
      <div className="greetings">
  <img src={wel} alt="Welcome" />
  <div>
    <h2>
    🌟 Welcome to 🌟<br />
      <strong>Smart Community Engagement</strong>
    </h2>
    <p className="n">
      Discover services that build connections and empower communities to thrive in a smarter, connected world!
    </p>
    <button 
      style={{
        backgroundColor: '#007BFF',
        color: '#fff',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginTop: '20px',
        transition: '0.3s ease',
      }}
      onClick={() => alert('Welcome to the community!')}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
    >
      Join Now
    </button>
    <div className="gradient"></div>
  </div>
  <img src={rep} alt="Representative" />
</div>

      {/* Services Section */}
      <div className="services">
  <div className="ser-tit">
    <div className="ser-tit-main">
      <img src={giphy}></img>
      <h3>Explore Services</h3>
      <img src={giphy}></img>
      
    </div>
    <div>
      <p className="n">Source management ensures seamless collaboration, precise change tracking, and code integrity from development to deployment.</p>
    </div>
    <div className="ser-tit-greet">
    <img src={hand}/>
      <div>
        <h3>Connect, Share, and Support</h3>
        <h3 style={{
  backgroundImage: 'linear-gradient(to right,#00bdf7, rgb(0, 7, 216))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}}>
  Locally and Globally
</h3>

      </div>
      <img src={globe} alt="Rotating Globe" className="rotating-image" />
    </div>
  </div>

  <div className="ser-rem">
    <div className="ser-card1">
      <div className="ser-card1-desc">
        <h1>Share What You Have</h1>
        <p className="ser-card1-main">Save Money, Cut Clutter, Live Green</p>
        <p className='n1'>Offer tools, gadgets, or everyday items for borrowing. Build a community that values sustainability and sharing.</p>
        <button className="ser-card-btn">Share Now</button>
        <div className="ser-card-advantages">
          <ul>
            <li><span>🌍</span><p>Promotes sharing culture</p></li>
            <li><span>💰</span><p>Reduces expenses</p></li>
            <li><span>♻️</span><p>Minimizes waste</p></li>
            <li><span>🤝</span><p>Builds connections</p></li>
            <li><span>🌱</span><p>Encourages sustainability</p></li>
          </ul>
        </div>
      </div>
      <div className="ser-card-img">
        <img src={n1} alt="Share What You Have" />
      </div>
    </div>

    <div className="ser-card2">
      <div className="ser-card-img">
        <img src={n2} alt="Trade Your Talents" />
      </div>
      <div className="ser-card2-desc">
        <h1>Trade Your Talents</h1>
        <p className="ser-card2-main">Learn, Teach, and Create Together</p>
        <p className='n1'>Swap skills like coding, gardening, or DIY repairs. Collaborate, connect, and grow your expertise.</p>
        <button className="ser-card-btn">Trade Now</button>
        <div className="ser-card-advantages">
          <ul>
            <li><span>📚</span><p>Enhances learning</p></li>
            <li><span>💼</span><p>Builds expertise</p></li>
            <li><span>🤝</span><p>Fosters collaboration</p></li>
            <li><span>👨‍🏫</span><p>Encourages teaching</p></li>
            <li><span>🎨</span><p>Promotes creativity</p></li>
          </ul>
        </div>
      </div>
    </div>

    <div className="ser-card3">
      <div className="ser-card3-desc">
        <h1>Find Local Helpers</h1>
        <p className="ser-card3-main">Neighbors Helping Neighbors</p>
        <p className='n1'>Get support for tasks like grocery shopping, babysitting, or pet care. Build strong, helpful connections in your community.</p>
        <button className="ser-card-btn">Help Now</button>
        <div className="ser-card-advantages">
          <ul>
            <li><span>🛒</span><p>Provides task assistance</p></li>
            <li><span>🏘️</span><p>Strengthens community bonds</p></li>
            <li><span>🫂</span><p>Encourages mutual support</p></li>
            <li><span>🤝</span><p>Increases trust locally</p></li>
            <li><span>🔄</span><p>Boosts resource sharing</p></li>
          </ul>
        </div>
      </div>
      <div className="ser-card-img">
        <img src={n3} alt="Find Local Helpers" />
      </div>
    </div>

    <div className="ser-card4">
      <div className="ser-card-img">
        <img src={n4} alt="Get Involved Today" />
      </div>
      <div className="ser-card4-desc">
        <h1>Get Involved Today</h1>
        <p className="ser-card4-main">Make Friends, Make an Impact</p>
        <p className='n1'>Join cleanups, workshops, or cultural events. Build meaningful connections while creating positive change.</p>
        <button className="ser-card-btn">Join Us</button>
        <div className="ser-card-advantages">
          <ul>
            <li><span>🎉</span><p>Encourages participation</p></li>
            <li><span>🌟</span><p>Supports community growth</p></li>
            <li><span>👫</span><p>Fosters social connections</p></li>
            <li><span>🔧</span><p>Drives positive change</p></li>
            <li><span>🌍</span><p>Promotes cultural exchange</p></li>
          </ul>
        </div>
      </div>
    </div>

    <div className="ser-card5">
      <div className="ser-card5-desc">
        <h1>Declutter for Good</h1>
        <p className="ser-card5-main">Find, Share, and Reuse Responsibly</p>
        <p className='n1'>Give away or find free/low-cost items. Reduce waste, embrace minimalism, and support a circular economy.</p>
        <button className="ser-card-btn">Declutter Now</button>
        <div className="ser-card-advantages">
          <ul>
            <li><span>♻️</span><p>Reduces waste</p></li>
            <li><span>🌳</span><p>Supports recycling</p></li>
            <li><span>🧹</span><p>Encourages minimalism</p></li>
            <li><span>🌿</span><p>Promotes eco-friendliness</p></li>
            <li><span>🔄</span><p>Strengthens circular economy</p></li>
          </ul>
        </div>
      </div>
      <div className="ser-card-img">
        <img src={n5} alt="Declutter for Good" />
      </div>
    </div>

    <div className="ser-card6">
      <div className="ser-card-img">
        <img src={n6} alt="Stay Alert" />
        <img src={n7}/>
      </div>
      <div className="ser-card6-desc">
        <h1>Stay Alert, Stay Safe</h1>
        <p className="ser-card6-main">Your Local News, Delivered</p>
        <p className='n1'>Stay informed with real-time updates on news, events, and alerts in your area. Stay prepared and aware.</p>
        <button className="ser-card-btn">Learn More</button>
        <div className="ser-card-advantages">
          <ul>
            <li><span>🕒</span><p>Real-time updates</p></li>
            <li><span>🛡️</span><p>Improves safety awareness</p></li>
            <li><span>📖</span><p>Encourages preparedness</p></li>
            <li><span>📣</span><p>Keeps locals informed</p></li>
            <li><span>🌐</span><p>Builds community awareness</p></li>
          </ul>
        </div>
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
      {/* Blog/Resources Section */}
<div className="blog-section">
  <h3>Community Insights</h3>
  <div className="blog-posts">
    <div className="blog-post">
      <h4>5 Ways to Get Involved in Your Local Community</h4>
      <p>Discover simple ways to contribute to the well-being of your neighborhood. From volunteering to sharing resources, learn how small actions can make a big difference.</p>
      <a href="#">Read More</a>
    </div>
    <div className="blog-post">
      <h4>The Power of Skill Sharing: Building a Stronger Community</h4>
      <p>Explore how skill-sharing initiatives are transforming neighborhoods, fostering learning, and creating lasting connections among community members.</p>
      <a href="#">Read More</a>
    </div>
    <div className="blog-post">
      <h4>Sustainable Living: Community-Driven Eco-Friendly Practices</h4>
      <p>Learn about innovative, community-led projects that are making neighborhoods more sustainable and environmentally friendly.</p>
      <a href="#">Read More</a>
    </div>
    <div className="blog-post">
      <h4>Bridging Generations: Intergenerational Programs in Your Community</h4>
      <p>Discover the benefits of programs that connect younger and older community members, fostering understanding and mutual support.</p>
      <a href="#">Read More</a>
    </div>
  </div>
  <div className="newsletter-signup">
    <h4>Stay Connected with Our Community</h4>
    <p>Sign up for our newsletter to receive the latest community news, event updates, and helpful resources.</p>
    <form>
      <input type="email" placeholder="Enter your email address" required />
      <button type="submit">Subscribe</button>
    </form>
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

      

 </div>
  );
};

export default Main;

