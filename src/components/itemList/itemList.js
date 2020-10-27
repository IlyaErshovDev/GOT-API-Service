import React, {Component} from 'react';
import gotService from '../../services/gotService';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const CharList = styled.ul`
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: .25rem;
    margin-top: 10px;
    box-sizing: border-box;
    cursor: pointer;
    
`;


export default class ItemList extends Component {
    gotService = new gotService();
    
    state = {
        charList: null,
        loading: false,
        error: false
    }
    onCharDetailsLoaded = (charList) => {
        console.log(charList);
        this.setState({
            charList,
            loading: false
        })
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this.gotService.getAllCharacters()
        .then( this.onCharDetailsLoaded )
        .catch( () => this.onError())
        
    }

    onError(){
        this.setState({
            char: null,
            error: true
        })
    }

    renderItems(data) {
        return data.map((item) => {
            return (
                <li key={item.id} className="list-group-item"  onClick={() => this.props.onCharSelected(item.id)} >
                    {item.name}
                </li>
            )
        })
    }

    render() {

        const {charList, error} = this.state;
        
        if (error) {
            return <ErrorMessage/>
        }

        if (!charList || this.state.loading) {
            return  <CharList><Spinner/></CharList>
        }

        const items = this.renderItems(charList);

        return (
            <CharList>
                {items}
            </CharList>
        );
    }
}