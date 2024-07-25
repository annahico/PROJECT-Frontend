import React from 'react';
import UserProfile from '../User/User';

export default function Admin() {
  return <UserProfile isAdmin={true} />;
}