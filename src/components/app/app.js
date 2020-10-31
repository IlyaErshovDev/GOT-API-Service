import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BooksPage, HousesPage, BooksItem, NonExistent} from '../pages';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import styled from 'styled-components';
import './app.css';

const MainInfo = styled.div`
background-color: #fff;
padding: 25px 25px 15px 25px;
margin-bottom: 30px;
border-radius: 5px;
h4 {
    margin-bottom: 20px;
    text-align: center;
}
`;

const InfoBlock = ({left, right}) => {
    return (

            <Col md='6'>
                <MainInfo>
                    <h4>Welcome to the GOT DB</h4>
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                    <span>Here you can find information about the heroes and their homes, as well as about the books of this universe.</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                    <span>All the data from free API of Ice And Fire.</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                    <a href="https://anapioficeandfire.com/">Visit the site</a>
                    </li>
                    </ul>
                </MainInfo>
            </Col>
    )
}


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
                    <Route path='/' exact render = {
                        () => {
                         return   <Row>
                            <InfoBlock/>
                            <Col lg={{size: 5, offset: 0}}>
                                <RandomChar/>
                            </Col>
                        </Row>
                        }
                    } />
                    <Route path='/characters' component={CharacterPage} />
                    <Route path='/houses' component={HousesPage} />
                    <Route path='/books' exact component={BooksPage} />
                    <Route path='/books/:id' render = {
                        ({match}) => {
                            const {id} = match.params;
                            return <BooksItem bookId={id}/>
                        }
                    } />
                    {/* <Route  render= { () => <NonExistent/>} exact /> */}
              
                    </Container>
                </div>
           </Router>
        );
    }
 
};

