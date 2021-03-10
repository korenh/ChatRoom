import React from 'react';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import Sign from './components/Sign';
import Chat from './components/Chat';

export default function App(){
    return(
    <Router>
        <Route path='/' exact component={Sign}/>
        <Route path='/chat' component={Chat}/>
    </Router>
    )}