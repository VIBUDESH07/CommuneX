import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const localCommunityMap = {
  Chennai: {
    districts: ['Chennai'],
    taluks: {
      Egmore: {
        areas: {
          'Anna Salai': ['T Nagar Apartments', 'Anna Salai Residency', 'Central Heights'],
          'Egmore High Road': ['Egmore Garden Colony', 'Egmore West Residents Association', 'Egmore Elite Apartments'],
          'Periyar Salai': ['Periyar Residency', 'Egmore Plaza'],
        },
      },
      'T. Nagar': {
        areas: {
          'Usman Road': ['Ranganathan Apartments', 'T Nagar Commercial Zone', 'Usman Heights'],
          'Ranganathan Street': ['Ranganathan Street Market Group', 'T Nagar Residency'],
          'North Usman Road': ['Shopping Plaza Association', 'Crescent Apartments'],
        },
      },
      Velachery: {
        areas: {
          'Phoenix Marketcity': ['Phoenix Residency', 'Mall Zone Apartments', 'Phoenix Elite Homes'],
          'Taramani Road': ['Tech Hub Residencies', 'Taramani Heights'],
        },
      },
    },
    pincodes: ['600001', '600017', '600020', '600032', '600042', '600097'],
  },
  Coimbatore: {
    districts: ['Coimbatore'],
    taluks: {
      Gandhipuram: {
        areas: {
          'Cross Cut Road': ['Cross Cut Residents Group', 'Commerce Residency'],
          '100 Feet Road': ['100 Feet Road Businesses Association', 'Trade Towers'],
        },
      },
      Peelamedu: {
        areas: {
          'Avinashi Road': ['Peelamedu Residency', 'Avinashi Residency Group'],
          'Hope College': ['Hope Residents Association', 'Tech Valley Apartments'],
        },
      },
    },
    pincodes: ['641001', '641002', '641004', '641018'],
  },
  Madurai: {
    districts: ['Madurai'],
    taluks: {
      Teppakulam: {
        areas: {
          'East Masi Street': ['Temple Residency', 'Masi Colony', 'Heritage Apartments'],
          'West Masi Street': ['Heritage Residency', 'West End Apartments'],
        },
      },
      'KK Nagar': {
        areas: {
          'Bye Pass Road': ['KK Residency', 'Bypass Heights', 'Sundaram Apartments'],
          'Sundaram Colony': ['Park View Association', 'Elite Apartments'],
        },
      },
    },
    pincodes: ['625001', '625002', '625003', '625007'],
  },
  Salem: {
    districts: ['Salem'],
    taluks: {
      'Fairlands': {
        areas: {
          'Omalur Road': ['Fairlands Residency', 'City Heights', 'Steel Plaza'],
          'Steel Plant Road': ['Steel Heights', 'Industry Residency'],
        },
      },
      Hasthampatti: {
        areas: {
          'Fort Main Road': ['Fort Colony', 'Heritage Residency'],
          'New Bus Stand': ['Transport Hub Residency', 'Standview Apartments'],
        },
      },
    },
    pincodes: ['636001', '636002', '636003', '636008'],
  },
  Trichy: {
    districts: ['Trichy'],
    taluks: {
      Srirangam: {
        areas: {
          'Temple Road': ['Temple Residency', 'Holy Heights', 'River Side Apartments'],
          'East Cauvery Road': ['River View Apartments', 'Cauvery Residency'],
        },
      },
      'Thillai Nagar': {
        areas: {
          'Main Road': ['Thillai Elite', 'Market Residency'],
          'North East Road': ['City Heights', 'Elite Apartments'],
        },
      },
    },
    pincodes: ['620001', '620002', '620005', '620020'],
  },
  Tirunelveli: {
    districts: ['Tirunelveli'],
    taluks: {
      Palayamkottai: {
        areas: {
          'Main Road': ['Palayam Residency', 'City Elite'],
          'Junction Road': ['Junction Heights', 'Business Apartments'],
        },
      },
      'Melapalayam': {
        areas: {
          'Market Road': ['Market Plaza Residency', 'Town Square Apartments'],
          'Hospital Road': ['Healthcare Residency', 'Doctor’s Lane Apartments'],
        },
      },
    },
    pincodes: ['627001', '627002', '627007', '627010'],
  },
  Erode: {
    districts: ['Erode'],
    taluks: {
      Bhavani: {
        areas: {
          'Mettur Road': ['Bhavani Residency', 'Erode Elite'],
          'Cauvery Road': ['River Residency', 'Bhavani Apartments'],
        },
      },
      Gobichettipalayam: {
        areas: {
          'Main Street': ['Gobi Residency', 'Farm View Apartments'],
          'Bus Stand Road': ['Central Heights', 'Gobichettipalayam Plaza'],
        },
      },
    },
    pincodes: ['638001', '638002', '638007', '638452'],
  },
  Vellore: {
    districts: ['Vellore'],
    taluks: {
      Katpadi: {
        areas: {
          'Railway Road': ['Katpadi Residency', 'Railway Heights'],
          'Hospital Road': ['CMC Residency', 'Vellore Elite Apartments'],
        },
      },
      'Arcot': {
        areas: {
          'Bazar Street': ['Arcot Residency', 'Market Plaza Apartments'],
          'Temple Road': ['Temple Residency', 'Holy Heights Apartments'],
        },
      },
    },
    pincodes: ['632001', '632002', '632004', '632007'],
  },
  Kanyakumari: {
    districts: ['Kanyakumari'],
    taluks: {
      Nagercoil: {
        areas: {
          'Main Road': ['City Residency', 'Coastal Heights'],
          'Beach Road': ['Seaside Residency', 'Kanyakumari Elite'],
        },
      },
      'Colachel': {
        areas: {
          'Harbor Road': ['Colachel Residency', 'Harbor Elite Apartments'],
          'Market Street': ['Market Residency', 'Commercial Plaza'],
        },
      },
    },
    pincodes: ['629001', '629002', '629003', '629501'],
  },
};


const CompleteSignup = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    state: 'Tamil Nadu',
    district: '',
    taluk: '',
    area: '',
    pincode: '',
    address: '',
    localCommunity: '',
    contactNumber: '',
    skills: [],
    profilePicture: '',
    username: '',
  });
  useEffect(() => {
    const username = localStorage.getItem('username') || '';
    setFormData((prevData) => ({ ...prevData, username }));
  }, []);
  const [talukOptions, setTalukOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [communityOptions, setCommunityOptions] = useState([]);

  const handleDistrictChange = (district) => {
    const cityDetails = Object.values(localCommunityMap).find((city) =>
      city.districts.includes(district)
    );
    const taluks = cityDetails ? Object.keys(cityDetails.taluks) : [];
    setTalukOptions(taluks);
    setAreaOptions([]);
    setCommunityOptions([]);
  };

  const handleTalukChange = (taluk) => {
    const district = formData.district;
    const cityDetails = Object.values(localCommunityMap).find((city) =>
      city.districts.includes(district)
    );
    const talukDetails = cityDetails?.taluks[taluk];
    const areas = talukDetails ? Object.keys(talukDetails.areas) : [];
    setAreaOptions(areas);
    setCommunityOptions([]);
  };

  const handleAreaChange = (area) => {
    const district = formData.district;
    const taluk = formData.taluk;
    const cityDetails = Object.values(localCommunityMap).find((city) =>
      city.districts.includes(district)
    );
    const communities = cityDetails?.taluks[taluk]?.areas[area] || [];
    setCommunityOptions(communities);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === 'district') {
        handleDistrictChange(value);
        updatedData.taluk = '';
        updatedData.area = '';
        updatedData.localCommunity = '';
      }

      if (name === 'taluk') {
        handleTalukChange(value);
        updatedData.area = '';
        updatedData.localCommunity = '';
      }

      if (name === 'area') {
        handleAreaChange(value);
        updatedData.localCommunity = '';
      }

      if (['state', 'district', 'taluk', 'area', 'pincode'].includes(name)) {
        updatedData.address = `${updatedData.area}, ${updatedData.taluk}, ${updatedData.district}, ${updatedData.state} - ${updatedData.pincode}`;
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.post('http://localhost:5000/api/complete', formData);
      toast.success('Signup Success');
      navigate('/login');
    } catch (error) {
      toast.error('Signup Error');
    }
  };
  
  return (
    <div className="com-div">
      <h2>Complete Your Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {/* State field */}
        <div className="com-input">
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            readOnly
            className="form-input"
          />
        </div>
  
        {/* District field */}
        <div className="com-input">
          <label>District:</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
  
        {/* Taluk field */}
        <div className="com-input">
          <label>Taluk:</label>
          <select
            name="taluk"
            value={formData.taluk}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select Taluk</option>
            {talukOptions.map((taluk) => (
              <option key={taluk} value={taluk}>
                {taluk}
              </option>
            ))}
          </select>
        </div>
  
        {/* Area field */}
        <div className="com-input">
          <label>Area:</label>
          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select Area</option>
            {areaOptions.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
  
        {/* Community field */}
        <div className="com-input">
          <label>Community:</label>
          <select
            name="localCommunity"
            value={formData.localCommunity}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select Community</option>
            {communityOptions.map((community) => (
              <option key={community} value={community}>
                {community}
              </option>
            ))}
          </select>
        </div>
  
        {/* Pincode field */}
        <div className="com-input">
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
  
        {/* Address field */}
        <div className="com-input">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            readOnly
            className="form-input"
          />
        </div>
  
        {/* Contact Number field */}
        <div className="com-input">
          <label>Contact Number:</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
  
        <div className="com-input">
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            placeholder="Enter skills separated by commas"
            value={formData.skills.join(', ')}
            onChange={(e) => {
              const skills = e.target.value
                .split(',')
                .map((skill) => skill.trim())
                .filter((skill) => skill !== ''); // Avoid empty skills
              setFormData((prevData) => ({ ...prevData, skills }));
            }}
            className="form-input"
          />
        </div>
  
        <div className="com-input">
          <label>Profile Picture (URL):</label>
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            className="form-input"
          />
        </div>
  
        {/* Submit button */}
        <button type="submit" className="submit-button">
          Complete Signup
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
  
};

export default CompleteSignup;