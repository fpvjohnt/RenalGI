import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FoodRecommendation() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/food/recommendations', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setRecommendations(response.data.recommendedFoods);
      } catch (error) {
        console.error('Error fetching AI recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h3>AI-Powered Food Recommendations</h3>
      <ul>
        {recommendations.map((food, index) => (
          <li key={index}>{food}</li>
        ))}
      </ul>
    </div>
  );
}

export default FoodRecommendation;
