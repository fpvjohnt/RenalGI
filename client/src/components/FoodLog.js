import React, { useState } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import axios from 'axios';

function FoodLog() {
  const [foodData, setFoodData] = useState({
    foodName: '',
    mealTime: '',
    glutenFree: false,
    oxalateLevel: 'low',
    calciumContent: '',
    userComments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/food/add', foodData)
      .then(response => alert(response.data.message))
      .catch(error => alert('Error: ' + error.response.data.error));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField
        label="Food Name"
        name="foodName"
        value={foodData.foodName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Meal Time"
        name="mealTime"
        type="datetime-local"
        value={foodData.mealTime}
        onChange={handleChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={foodData.glutenFree}
            onChange={() => setFoodData({ ...foodData, glutenFree: !foodData.glutenFree })}
          />
        }
        label="Gluten Free"
      />
      <TextField
        select
        label="Oxalate Level"
        name="oxalateLevel"
        value={foodData.oxalateLevel}
        onChange={handleChange}
        required
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </TextField>
      <TextField
        label="Calcium Content (mg)"
        name="calciumContent"
        type="number"
        value={foodData.calciumContent}
        onChange={handleChange}
        required
      />
      <TextField
        label="Comments"
        name="userComments"
        multiline
        rows={3}
        value={foodData.userComments}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Log Food
      </Button>
    </form>
  );
}

export default FoodLog;
