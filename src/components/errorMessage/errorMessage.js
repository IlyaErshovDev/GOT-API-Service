import React from 'react';
import styled from 'styled-components';
const Img = styled.img`
max-width: 90px;
`


const ErrorMessage = () => {
    return (
       <>
        <Img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='error'></Img>
        <span> Woops, something goes wrong ¯\_(ツ)_/¯</span>
        </>
    )
};

export default ErrorMessage;