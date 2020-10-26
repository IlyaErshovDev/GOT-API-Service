import React, {Component} from 'react';
import styled from 'styled-components';
const CharList = styled.ul`
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: .25rem;
    margin-top: 0;
    box-sizing: border-box;
    cursor: pointer;
`;


export default class ItemList extends Component {

    render() {
        return (
            <CharList>
                <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </CharList>
        );
    }
}