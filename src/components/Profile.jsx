import React, { } from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile';
import Card from './Card';

const Profile = () => {
  const user = useSelector((state) => state.user);
  
  return (
    user && (
      <div className='flex items-center justify-center'>
        <EditProfile user={user} />
        <Card user={user} />
      </div>
    )
  );
}

export default Profile