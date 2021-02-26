import userEvent from '@testing-library/user-event';
import React from 'react';

function User(props) {
  const { name, email } = props.user;

  return(
    <div className='user'>
      {name}<br/>{email}
    </div>
  )
}

export default User;