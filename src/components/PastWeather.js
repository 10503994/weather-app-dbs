import React , {Component} from 'react';
import './Pastweather.css';

class PastWeather extends Component {


  render(){ 
    var a ="def";
//         if(this.props.desc==="clear sky")
//   a ="clear-sky"; 
//   else
//   if(this.props.desc==="light rain")
//   a ="light-rain"; 
//   else
//   if(this.props.desc==="few clouds")
//   a ="few-clouds"; 

  var bg ="defbg";
        if(this.props.city==="London")
  bg ="london"; 
  else
  if(this.props.city==="Manchester")
  bg ="manchester"; 
  else
  if(this.props.city==="Bangalore")
  bg ="bangalore"; 
  else
  if(this.props.city==="Mumbai")
  bg ="mumbai";
  else
  if(this.props.city==="Amsterdam")
  bg ="amsterdam";  
  else
  if(this.props.city==="Etawah")
  bg ="etawah";
  else  
  if(this.props.city==="Lucknow")
  bg ="lucknow"; 
  else  
  if(this.props.city==="New Delhi" ||this.props.city==="Delhi" )
  bg ="delhi"; 
  else  
  if(this.props.city==="Chennai" )
  bg ="chennai"; 

  var divStyle = {
    font: 'normal bold 20px/30px sans serif ,serif,  Georgia'
     }

        return(
                 <div className="container"><div className={bg}>       
            <div className={a} >
            { this.props.city && this.props.country && <p style={divStyle} >Location  : {this.props.city}, {this.props.country}</p>}
            {this.props.temp && <p style={divStyle}>Current Temperture  :{this.props.temp} &#8451;</p>}
           {this.props.tempmin && <p style={divStyle}>Minimum Temperature  :{this.props.tempmin} &#8451;</p>}
            {this.props.tempmax && <p style={divStyle}>Maximum Temperature  :{this.props.tempmax} &#8451;</p>}
        {this.props.humidity && <p style={divStyle}>Humidity  :{this.props.humidity} %</p>}
        {this.props.desc && <p style={divStyle}>Description  :{this.props.desc}</p>}
        {this.props.error && <p style={divStyle}>{this.props.error}</p>}
    </div>
    </div>
    </div>
)
    }
        
    }


export default PastWeather;
