import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ItemsList = styled.ul`
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
    
    state = {
        itemList: null,
        loading: false,
        error: false
    }
    onCharDetailsLoaded = (itemList) => {
        this.setState({
            itemList,
            loading: false
        })
    }

    componentDidMount() {
        const {getData} = this.props;

        this.setState({
            loading: true
        })
        getData()
        .then( this.onCharDetailsLoaded )
        .catch( () => this.onError())
        
    }

    onError(){
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItems(data) {
        return data.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li key={id} className="list-group-item"  onClick={() => this.props.onItemSelected(item.id)} >
                    {label}
                </li>
            )
        })
    }

    render() {

        const {itemList, error} = this.state;
        
        if (error) {
            return <ErrorMessage/>
        }

        if (!itemList || this.state.loading) {
            return  <ItemsList><Spinner/></ItemsList>
        }

        const items = this.renderItems(itemList);

        return (
            <ItemsList>
                {items}
            </ItemsList>
        );
    }
}