import React, {Component} from 'react';
import gotService from '../../services/gotService';
import styled from 'styled-components';
import Spinner from '../spinner';


const CharacterBlock = styled.div`
background-color: #fff;
padding: 25px 25px 15px 25px;
margin-top: 10px;
margin-bottom: 40px;
border-radius: 5px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`,
Span = styled.span`
font-weight: bold;
`,
SelectError = styled.span`
color: #fff;
text-align: center;
font-size: 26px;
`;

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <Span>{label}</Span>
            <span>{item[field]}</span>
         </li>
    )
};

export {
    Field
}

export default class ItemDetails extends Component {
    gotService = new gotService();
    
    state = {
        item: null,
        loading: true,
        error: true,
    }

    componentDidMount() {
        this.updateItem();
        
    }

    onCharDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    updateItem() {
        const {getData, itemId} = this.props;
        if (!itemId) {
            return;
        }
         this.setState({
            loading: true
        })

        getData(itemId)
            .then( this.onCharDetailsLoaded )
            .catch( () => this.onError())
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    } 

    onError(){
        this.setState({
            item: null,
            error: true
        })
    }

    render() {

        if(!this.state.item) {
            return <SelectError>Please, select an item</SelectError>
        }

        const {item} = this.state,
        {name} = item;
        
        if (this.state.loading) {
            return (
                <CharacterBlock>
                <Spinner/>
                </CharacterBlock>
            )
        }

        return (
            <CharacterBlock>
             
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                   {
                       React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                       })
                   }
                </ul>
            </CharacterBlock>
        );
    }
}