import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock'


export default class BooksPage extends Component {
    gotService = new gotService();

    state = {
        selectedBook: 1,
        error: false    
    }


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }
    render() {

        if(this.state.error) {
            return <ErrorMessage></ErrorMessage>
        }

        const itemsList = (
            <ItemList onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllBooks}
            renderItem={(item) => `${item.name} `}/>
        ),

        bookDetails = (
            <ItemDetails itemId={this.state.selectedBook}
                getData = {this.gotService.getBook}>
                <Field field = 'name' label = 'Name'/>
                <Field field = 'numberOfPages' label = 'Number of pages'/>
                <Field field = 'publisher' label = 'Publisher'/>
                <Field field = 'released' label = 'Released'/>
            </ItemDetails>
        );
        
        return (
           <RowBlock left = {itemsList} right = {bookDetails} />
        )
    }
}