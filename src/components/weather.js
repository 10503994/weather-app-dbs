import React , {Component} from 'react';
import './weather.css';
import windmill from './windmill.svg';
import weatherbg from './weather-data.gif';
class Weather extends Component {


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

var divStyle = {
    font: 'normal  20px/30px sans serif , Verdana',
    color: 'white',
    size: '160%',
    
   
 
     }

     var divStyletemp = {
        font: 'normal  20px/30px sans serif , Verdana',
        color: 'white',
        size: '160%',
        padding: '5px 50px 5px 100px',
        align:'right',
         }

         var divStyletemp1 = {
            font: 'normal  20px/30px sans serif , Verdana',
            color: 'white',
            size: '160%',
            padding: '100px 50px 5px 100px',
            align:'right',
             }

  var bg ="defbg";
  let aaaa=[];
 if(this.props.city && this.props.country)
 {
     aaaa.push(
        <div className="container"><div className={bg}>       
        <div className={a}>
        <div style={divStyle}> <b><font size="6">{this.props.city}, {this.props.country}</font> </b>
        <b ><font size="7" >&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 
         {this.props.temp} &#8451;</font></b>
        
        </div>
        <p style={divStyle} >{this.props.desc}</p>
  
        <div style={{textAlign:"right"}}>
        
      {this.props.tempmin && <p style={divStyletemp}><b>Min {this.props.tempmin} &#8451;</b></p>}
        {this.props.tempmax && <p style={divStyletemp}><b>Max {this.props.tempmax} &#8451;</b></p>}
        </div>

                <p style={divStyletemp1}/>
    
    
    {this.props.wspeed && <a style={divStyle}><img src={windmill} className="App-logo" alt="logo" />   Wind Speed  :{this.props.wspeed} Km/hr</a>}
    <div style={{textAlign:"right"}}>
    {this.props.humidity && <a style={divStyletemp}>Humidity  :{this.props.humidity} %</a>}
    </div>
    {this.props.error && <p style={divStyle}>{this.props.error}</p>}
</div>
</div>
</div>
     );
 }
//         if(this.props.city==="London")
//   bg ="london"; 
//   else
//   if(this.props.city==="Manchester")
//   bg ="manchester"; 
//   else
//   if(this.props.city==="Bangalore")
//   bg ="bangalore"; 
//   else
//   if(this.props.city==="Mumbai")
//   bg ="mumbai";
//   else
//   if(this.props.city==="Amsterdam")
//   bg ="amsterdam";  
//   else
//   if(this.props.city==="Etawah")
//   bg ="etawah";
//   else  
//   if(this.props.city==="Lucknow")
//   bg ="lucknow"; 
//   else  
//   if(this.props.city==="New Delhi" ||this.props.city==="Delhi" )
//   bg ="delhi"; 
//   else  
//   if(this.props.city==="Chennai" )
//   bg ="chennai"; 

  
     
        return( 
            <div>
            {aaaa}
    </div>
)
    }
        
    }


export default Weather;
