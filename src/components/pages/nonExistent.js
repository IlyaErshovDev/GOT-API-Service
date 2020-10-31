import React, {Component} from 'react';

import styled from 'styled-components';

const MainInfo = styled.div`
background-color: #fff;
padding: 25px 25px 15px 25px;
margin-bottom: 30px;
border-radius: 5px;

h4 {
    margin-bottom: 20px;
    text-align: center;
}
`;

const NonExistent = () => {
    return (

         
                <MainInfo>
                    <h4>404, That's an error.</h4>
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                    <span>The requested URL /nonexistet was not found on this server. </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                    <span>That’s all we know.</span>
                    </li>
                    </ul>
                </MainInfo>
           
    )
}

export default NonExistent;