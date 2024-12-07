import React, { useState } from 'react';
import axios from 'axios';

const localCommunityMap = {
  'Chennai': {
    districts: ['Chennai'],
    taluks: ['Egmore', 'T. Nagar', 'Adyar'],
    pincodes: ['600001', '600017', '600020'],
  },
  'Coimbatore': {
    districts: ['Coimbatore'],
    taluks: ['Gandhipuram', 'RS Puram'],
    pincodes: ['641001', '641002'],
  },
};

const findLocalCommunity = ({ state, district, taluk, pincode }) => {
  for (const [community, details] of Object.entries(localCommunityMap)) {
    if (
      details.districts.includes(district) &&
      (details.taluks.includes(taluk) || details.pincodes.includes(pincode))
    ) {
      return community;
    }
  }
  return 'Unknown';
};

const CompleteSignup = () => {
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    taluk: '',
    area: '',
    pincode: '',
    address: '', 
    localCommunity: '',
    contactNumber: '',
    profilePicture: null,
    skills: [],
    resources: [],
    role: 'user',
  });

  const [previewImage, setPreviewImage] = useState('');

  const combineAddress = () => {
    const { state, district, taluk, area, pincode } = formData;
    return `${area}, ${taluk}, ${district}, ${state} - ${pincode}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      if (['state', 'district', 'taluk', 'area', 'pincode'].includes(name)) {
        updatedData.address = combineAddress();
        updatedData.localCommunity = findLocalCommunity(updatedData);
      }

      return updatedData;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      setFormData({
        ...formData,
        profilePicture: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => submissionData.append(`${key}[]`, item));
      } else {
        submissionData.append(key, value);
      }
    });

    try {
      const response = await axios.post('/api/signup', submissionData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Signup Success:', response.data);
    } catch (error) {
      console.error('Signup Error:', error);
    }
  };

  return (
    <div className="com-div">
      <h2 className="form-header">Complete Your Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label className="form-label">
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          District:
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Taluk:
          <input
            type="text"
            name="taluk"
            value={formData.taluk}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Area:
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Pincode:
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Address (Combined):
          <textarea
            name="address"
            value={formData.address}
            readOnly
            className="form-textarea"
          />
        </label>
        <label className="form-label">
          Local Community:
          <input
            type="text"
            name="localCommunity"
            value={formData.localCommunity}
            readOnly
            className="form-input"
          />
        </label>
        <label className="form-label">
          Contact Number:
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Profile Picture:
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="file-input"
          />
        </label>
        {previewImage && <img src={previewImage} alt="Preview" className="profile-preview" />}
        <button type="submit" className="submit-button">Complete Signup</button>
      </form>
    </div>
  );
};

export default CompleteSignup;
