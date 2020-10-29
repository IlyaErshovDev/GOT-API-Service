import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock'


export default class HousesPage extends Component {
    gotService = new gotService();

    state = {
        selectedHouse: 1,
        error: false    
    }


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }
    render() {

        if(this.state.error) {
            return <ErrorMessage></ErrorMessage>
        }

        const itemsList = (
            <ItemList onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllHouses}
            renderItem={(item) => `${item.name} `}/>
        ),

        houseDetails = (
            <ItemDetails itemId={this.state.selectedHouse}
            getData = {this.gotService.getHouse}>
                <Field field = 'name' label = 'Name'/>
                <Field field = 'region' label = 'Region'/>
                <Field field = 'words' label = 'Words'/>
                <Field field = 'titles' label = 'Titles'/>
                <Field field = 'overlord' label = 'Overlord'/>
                <Field field = 'ancestralWeapons' label = 'Ancestral Weapons'/>
            </ItemDetails>
        );
        
        return (
           <RowBlock left = {itemsList} right = {houseDetails} />
        )
    }
}