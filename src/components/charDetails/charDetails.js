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
            <span>{[field]}</span>
         </li>
    )
};

export {
    Field
}

export default class CharDetails extends Component {
    gotService = new gotService();
    
    state = {
        char: null,
        loading: true,
        error: true,
    }

    componentDidMount() {
        this.updateChar();
        
    }

    onCharDetailsLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }
         this.setState({
            loading: true
        })

        this.gotService.getCharacter(charId)
            .then( this.onCharDetailsLoaded )
            .catch( () => this.onError())
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    } 

    onError(){
        this.setState({
            char: null,
            error: true
        })
    }

    render() {

        if(!this.state.char) {
            return <SelectError>Please, select a character</SelectError>
        }

        const {name, gender, born, died, culture} = this.state.char;
        
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
                   {this.props.children}
                </ul>
            </CharacterBlock>
        );
    }
}