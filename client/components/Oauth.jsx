import React from 'react';

const responseType = 'code';
const redirectUri = 'http://localhost:3000/oauthcallback';
const scope = 'profile email openid';
const consentLink = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&access_type=offline&include_granted_scopes=true`;

export default () => {

  return (
    <a href={consentLink}><button>Sign Up with your Google Account!</button></a>
  )
};