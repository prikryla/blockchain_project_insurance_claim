import React, { useState } from 'react';

function Form(props) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    coveragePeriod: '',
    user: props.currentUser,
    status: '',
    cost: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    props.submit(formData.date, formData.coveragePeriod, formData.user, formData.cost)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Coverage Period:
        <select
          name="coveragePeriod"
          value={formData.coveragePeriod}
          onChange={handleInputChange}
        >
          <option value="1">1 month</option>
          <option value="3">3 months</option>
          <option value="6">6 months</option>
          <option value="12">12 months</option>
        </select>
      </label>
      <br />

      <label>
        Cost:
        <select
        name="cost"
        value={formData.cost}
        onChange={handleInputChange}
        >
            <option value="100">100 dollars</option>
            <option value="200">200 dollars</option>
            <option value="500">500 dollars</option>
            <option value="1000">1000 dollars</option>
        </select>
        </label>

      <br />

      <button type="submit">Submit</button>
      <button onClick={() => props.hide(false)}>Hide</button>
      
    </form>
  );
}

export default Form;
