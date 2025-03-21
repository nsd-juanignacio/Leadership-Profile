import React from 'react';

const DefaultProfile = () => 
    <img width="50px" height="50px" alt="profile" alt="default profile" className="rounded-circle"
    src={process.env.PUBLIC_URL + "/images/generic-profile.png"} />

const HeaderLogo = () => 
    <img alt="header-logo" src={process.env.PUBLIC_URL + "/images/header-logo.png"}/>
export{
    DefaultProfile,
    HeaderLogo
};