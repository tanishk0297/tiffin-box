import React from 'react';

const EmailList = ({ emailAddresses }) => {
  const getStartingName = (email) => {
    const atIndex = email.indexOf('@');
    return email.slice(0, atIndex);
  };

  return (
    <ul>
      {emailAddresses.map((email) => (
        <li key={email}>{getStartingName(email)}</li>
      ))}
    </ul>
  );
};

export default EmailList;