import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaEnvelopeOpen, FaFireAlt, FaLockOpen, FaNewspaper } from 'react-icons/fa';

const Content = () => {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [volunteerOpportunities, setVolunteerOpportunities] = useState([]);
  const [marketplaceItems, setMarketplaceItems] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [userName, setUserName] = useState('User'); // Replace with actual user data from context or props

  // Simulate fetching data
  useEffect(() => {
    // Fetch community news
    const fetchNews = async () => {
      const newsData = [
        { id: 1, title: 'Community Cleanup Drive', description: 'Join us this Saturday at Central Park to help clean up the neighborhood.' },
        { id: 2, title: 'Local Farmer’s Market', description: 'Check out fresh produce every Sunday at the community square.' },
        { id: 3, title: 'Emergency Alert: Heavy Rain Forecast', description: 'Stay prepared for potential flooding in low-lying areas this week.' },

      ];
      setNews(newsData);
    };

    // Fetch community events
    const fetchEvents = async () => {
      const eventData = [
        { id: 1, title: 'Coding Workshop', date: 'Dec 10, 2024', location: 'Community Center' },
        { id: 2, title: 'Charity Food Drive', date: 'Dec 15, 2024', location: 'Main Square' },
      ];
      setEvents(eventData);
    };

    // Fetch volunteer opportunities
    const fetchVolunteerOpportunities = async () => {
      const opportunities = [
        { id: 1, title: 'Help at Local Shelter', description: 'Assist in organizing and distributing supplies.', date: 'Dec 12, 2024' },
        { id: 2, title: 'Park Beautification', description: 'Join us to plant trees and flowers in the neighborhood park.', date: 'Dec 17, 2024' },
      ];
      setVolunteerOpportunities(opportunities);
    };

    // Fetch marketplace items
    const fetchMarketplaceItems = async () => {
      const items = [
        { id: 1, title: 'Free Books', description: 'A collection of novels and textbooks available for pickup.', location: 'Community Library' },
        { id: 2, title: 'Used Furniture for Sale', description: 'Affordable prices for quality furniture. Check it out!', location: 'Downtown Market' },
      ];
      setMarketplaceItems(items);
    };

    // Fetch emergency alerts
    const fetchAlerts = async () => {
      const alertsData = [
        { id: 1, message: 'Power outage scheduled for Dec 9, 2024, from 10 AM to 2 PM.' },
        { id: 2, message: 'Stay cautious: Reports of slippery roads due to recent rains.' },
      ];
      setAlerts(alertsData);
    };

    fetchNews();
    fetchEvents();
    fetchVolunteerOpportunities();
    fetchMarketplaceItems();
    fetchAlerts();
  }, []);

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Welcome Back, {userName}!</h1>
      <p className="dashboard-description">
        Here’s what’s happening in your community today.
      </p>

      {/* Emergency Alerts Section */}
      <section className="dashboard-section">
        <h2>Emergency Alerts</h2>
        <div className="alert-list">
          {alerts.map((alert) => (
            <div key={alert.id} className="card alert-card">
              <p>{alert.message}</p>
              <FaFireAlt  style={{color:'black'}}/>
            </div>
          ))}
        </div>
      </section>

      {/* Local News Section */}
      <section className="dashboard-section">
        <div className='dashboard-heading'>
          <FaNewspaper style={{fontSize:'25px'}}/>
        <h2>Local News</h2>
        <FaNewspaper style={{fontSize:'25px'}}/>
        </div>
        <div className="news-list">
          {news.map((item) => (
            <div key={item.id} className="card news-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="dashboard-section">
      <div className='dashboard-heading'>
        <FaEnvelope style={{fontSize:'25px'}}/>
        <h2>Upcoming Events</h2>
        <FaEnvelope style={{fontSize:'25px'}}/>
        </div>
        <div className="event-list">
          {events.map((event) => (
            <div key={event.id} className="card event-card">
              <h3>{event.title}</h3>
              <p>
                <strong>Date:</strong> {event.date} <br />
                <strong>Location:</strong> {event.location}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer Opportunities Section */}
      <section className="dashboard-section">
      <div className='dashboard-heading'>
        <FaLockOpen style={{fontSize:'25px'}}/>
        <h2>Volunteer Opportunities</h2>
        <FaLockOpen style={{fontSize:'25px'}}/>
        </div>
        <div className="volunteer-list">
          {volunteerOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="card volunteer-card">
              <h3>{opportunity.title}</h3>
              <p>
                {opportunity.description} <br />
                <strong>Date:</strong> {opportunity.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="dashboard-section">
        <div className='dashboard-heading'>
          
        <h2>Marketplace</h2>
        </div>
        <div className="marketplace-list">
          {marketplaceItems.map((item) => (
            <div key={item.id} className="card marketplace-card">
              <h3>{item.title}</h3>
              <p>
                {item.description} <br />
                <strong>Location:</strong> {item.location}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Content;
