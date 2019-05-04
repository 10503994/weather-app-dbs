import React , {Component} from 'react';
import './form.css';
import DatePicker from 'react-datepicker';
class PastWeatherForm extends Component {

    render(){

        return(
        <div className="formcontainer">
        <div className="formcss" >
            <form onSubmit={this.props.getPastWeather}>
               <input type="text" name="pastcity" placeholder="Enter City..." className="inbox"/>
               <DatePicker
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                 />

                <DatePicker
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    isClearable={true}
                    placeholderText="Enter optional end date"
                />
               <button className="button">Get Weather</button>
            </form>
        </div>
        </div>
        )
    }
}

export default PastWeatherForm;
