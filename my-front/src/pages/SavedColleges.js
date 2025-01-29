// SavedColleges.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedColleges = () => {
  const [savedColleges, setSavedColleges] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to login to view saved colleges');
      return;
    }

    axios.get('http://localhost:5002/api/saved-colleges', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setSavedColleges(response.data.savedColleges))
      .catch(error => console.error('Error fetching saved colleges:', error));
  }, []);

  return (
    <div>
      <h1>Saved Colleges</h1>
      <ul>
        {savedColleges.map(college => (
          <li key={college._id}>
            <h2>{college.name}</h2>
            {/* Display other college details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedColleges;
