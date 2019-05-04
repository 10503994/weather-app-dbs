import React, { Component } from 'react';
import '../components/titles.css';
import logo from './logo.svg';
import windmill from './windmill.svg';

class Titles extends Component {

render()
{
    return(
        <div className="Title">
        <header className="Title-header">
        <img src={logo} className="App-logo" alt="logo" 
         />
                
        </header>
        </div>
    );

}
}

export default Titles;


