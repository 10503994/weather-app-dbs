import React , {Component} from 'react';
import './form.css';
class Form extends Component {

    render(){

        return(
        <div className="formcontainer">
        <div className="formcss" >
            <form onSubmit={this.props.getweather}>
                <input type="text" name="city" placeholder="Enter City..." className="inbox"/>
                <input type="text" name="country" placeholder="Enter Country..." className="inbox"/>
                <button className="button">Get Weather</button>
            </form>
        </div>
        </div>
        )
    }
}

export default Form;
