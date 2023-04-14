import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function UserSignUp({ context }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);

  /**
    send POST request from the form , 
    if 500 is returned or arrays , display error and send user to /error
    else sign the user 
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      emailAddress: username,
      password,
    };
    context.data.createUser(user).then((res) => {
      if (res.length) {
        setErrors(res);
      } else {
        context.actions.signIn(user.emailAddress, user.password).then((res) => {
            if (res === 500) {
              navigate('/error')
            } else if (location.state?.from) {
              navigate(location.state?.from);
            } else {
              navigate('/');
            }
          
        });
      }
    });
  };

  return (
    <>
      <div className='form--centered'>
        <h2>Sign Up</h2>
        {errors.length ? (
          <div className='validation--errors'>
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <label htmlFor='firstName'>First Name</label>
          <input
            id='firstName'
            name='firstName'
            type='text'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor='lastName'>Last Name</label>
          <input
            id='lastName'
            name='lastName'
            type='text'
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor='username'>Email Address</label>
          <input
            id='username'
            name='username'
            type='email'
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='button'
            type='submit'
          >
            Sign Up
          </button>
          <Link
            className='button'
            to={'/'}
          >
            Cancel
          </Link>
        </form>
        <p>
          Already have a user account? Click here to{' '}
          <Link to={'/signin'}>sign in</Link>!
        </p>
      </div>
    </>
  );
}
