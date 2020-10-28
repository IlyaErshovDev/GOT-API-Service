import React, {Component} from 'react';
import styled from 'styled-components';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock'


export default class CharacterPage extends Component {
    gotService = new gotService();

    state = {
        selectedChar: 41,
        error: false
    }


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }
    render() {

        if(this.state.error) {
            return <ErrorMessage></ErrorMessage>
        }

        const itemsList = (
            <ItemList onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllCharacters}
            renderItem={(item) => `${item.name} (${item.gender})`}/>
        ),

        charDetails = (
            <CharDetails charId={this.state.selectedChar}>
                <Field field = 'gender' label = 'Gender'/>
                <Field field = 'born' label = 'Born'/>
            </CharDetails>
        );
        
        return (
           <RowBlock left = {itemsList} right = {charDetails} />
        )
    }
}