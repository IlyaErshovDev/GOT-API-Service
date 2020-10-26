import React, {Component} from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import styled from 'styled-components';
import img from './close-btn.svg'
import { Button } from 'reactstrap';


const RandomHero = styled.div`
background-color: #fff;
padding: 25px 25px 15px 25px;
margin-bottom: 30px;
border-radius: 5px;
h4 {
    margin-bottom: 20px;
    text-align: center;
}
`;

const IconBox = styled.div`align-items: center;
position: absolute;
top: 5px;
right: 25px;
cursor: pointer;
`
const CloseBtn = styled.img`
max-width: 15px;
`;

const Span = styled.span`
font-weight: bold;
`;



export default class RandomChar extends Component {

    constructor() {
        super();
        this.updateChar();
    }

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false,
        flag: false
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
        loading: false
        });
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar() {
        const id = Math.floor(25 + Math.random() * (140 + 1 - 25)); //25 -140
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    toggleRChr = () => {
        this.setState(({flag}) => ({
            flag: !flag
          }))
    }

    render() {

        const {char, loading, error, flag } = this.state;

        if (flag) { 
            return  <Button color="secondary" onClick={this.toggleRChr}>Show random character</Button>;
        } else {
            const errorMessage = error ? <ErrorMessage/> : null;
            const spinner = loading ? <Spinner/> : null;
            const content = !(loading || error) ?  <View char={char}/> : null;
    
            return (
                <RandomHero>
                  <IconBox onClick={this.toggleRChr}>  <CloseBtn src={img}/> </IconBox>
                    {errorMessage}
                    {spinner}
                 {content}
                </RandomHero>
            );
        }
    
    }
}


const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
 

    return (
        <>
              <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <Span>Gender </Span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Span>Born </Span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Span>Died </Span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Span>Culture </Span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </>
    )
};