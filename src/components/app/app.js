import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';


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
           <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                <RandomChar/>
                            </Col>
                        </Row>
                    <Route path='/characters' component={CharacterPage} />
                    <Route path='/houses' component={HousesPage} />
                    <Route path='/books' exact component={BooksPage} />
                    <Route path='/books/:id' render = {
                        ({match}) => {
                            const {id} = match.params;
                            return <BooksItem bookId={id}/>
                        }
                    } />
              
                    </Container>
                </div>
           </Router>
        );
    }
 
};

