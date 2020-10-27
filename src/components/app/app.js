import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import ErrorMessage from '../errorMessage';
import styled from 'styled-components';


export default class App extends Component{

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
                </Container>
            </>
        );
    }
 
};

