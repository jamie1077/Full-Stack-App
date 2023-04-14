import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function UserSignOut({ context }) {
  //component calls signOut and updates state after render

  useEffect( () => context.actions.signOut() );
  return (
    <Navigate to="/" />
  );
}
