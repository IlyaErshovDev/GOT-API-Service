import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import CharDetails from '../charDetails';
import ItemList from '../itemList';
import styled from 'styled-components';


export default class App extends Component{
    gotService = new gotService();

    state = {
       
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }


   

    render() {

        if(this.state.error) {
            return <ErrorMessage></ErrorMessage>
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <RandomChar/>
                        </Col>
                    </Row>
                <CharacterPage/>
                <Row>
                        <Col md='6'>
                            <ItemList onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllBooks}
                            renderItem={(item) => `${item.name}`}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                </Row>
                <Row>
                        <Col md='6'>
                            <ItemList onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllHouses}
                            renderItem={(item) => `${item.name}`}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                </Row>
                </Container>
            </>
        );
    }
 
};

