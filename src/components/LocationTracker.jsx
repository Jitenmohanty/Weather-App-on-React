import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const LocationTracker = ({ onLoadLocation }) => {
  const handleLocation = () => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Request permission to access the user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // On success, update state with the coordinates
          onLoadLocation(position.coords.latitude, position.coords.longitude);
          console.log(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          toast.error('Location blocked!', error);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      toast.error('Please access the location!');
    }
  };

  return (
    <div className='location' onClick={handleLocation}>
     <FaLocationDot />
    </div>
  );
};

export default LocationTracker;
