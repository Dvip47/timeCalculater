import React, { useState, useEffect } from 'react';

const Greeting = () => {
  const [name, setName] = useState(localStorage.getItem('name') || 'Stranger');
  const [greetingMessage, setGreetingMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const time = new Date().getHours();
    let message;

    if (time < 12) {
      message = 'Good Morning';
    } else if (time >= 12 && time < 18) {
      message = 'Good Afternoon';
    } else {
      message = 'Good Evening';
    }

    setGreetingMessage(message);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('name', name);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="greeting-container">
      <h1 className="greeting">
        {greetingMessage}, 
        {isEditing ? (
          <input className="form-control d-inline w-auto ml-2 font-weight-bold" type="text" value={name} onChange={handleChange} />
        ) : (
            <span className=' ms-3'>
          {name.toUpperCase()}
            </span>
        )}

      </h1>
      {!isEditing && (
          <i className="fa fa-pencil ms-3" onClick={handleEdit} aria-hidden="true"></i> 
      )}
      {isEditing && (
          <i className="fa fa-check ms-3" onClick={handleSave} aria-hidden="true"></i>
      )}
    </div>
  );
};

export default Greeting;
