import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Titles from './components/titles';
//import './PastWeatherform.css';
import Form from './components/form';
import Weather from './components/weather';
import PastWeatherForm from './components/PastWeatherForm';
import Canvas from './components/Canvas.jsx';
import { isMoment } from 'moment';
import Chart from './components/Chart';
import {Bar, Line, Pie} from 'react-chartjs-2';
import windmill from './windmill.svg';

const API_KEY="301d2717ec3a763210336cd7e1db6438";
const PastWeather_API_KEY="b8065658c839476d8a905004192604";
class App extends  Component {
  constructor(){
    super();
    this.state={
              temp:undefined,
              tempmin:undefined,
              tempmax:undefined,
              country:undefined,
              city:undefined,
              humidity:undefined,
              desc:undefined,
              wspeed:undefined,
              error:undefined,
              pastcity:undefined,
              paststartdate:undefined,
              pastenddate:undefined,
              location: undefined,
              chartData:[],
              daterange: [],
              windData:[],
              selectedOption:undefined,
              rainData:undefined,
              rightMenu:false
            }
this.handleChangeStart = this.handleChangeStart.bind(this);
this.handleChangeEnd = this.handleChangeEnd.bind(this);
this.handleOptionChange = this.handleOptionChange.bind(this);
this.handleOptionChange1 = this.handleOptionChange1.bind(this);
this.handleOptionChange2 = this.handleOptionChange2.bind(this);
this.resizeIframe = this.resizeIframe.bind(this);
this.showRight = this.showRight.bind(this);
          }
  // componentWillMount(){
  //  this.getPastWeather();
  // }
  getWeather= async (e)=>{
    try{
    e.preventDefault();
    const city=e.target.elements.pastcity.value;
    const country=e.target.elements.pcountry.value;
    const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const data= await api_call.json();
    
  
    if(city && country)
    {
    console.log(data);
    this.setState({temp:(data.main.temp-data.main.temp%1)-273,
                    tempmin:(data.main.temp_min-data.main.temp_min%1)-273,
                    tempmax:(data.main.temp_max-data.main.temp_max%1)-273,
                  country:data.sys.country,
                  city:data.name,
                  humidity:data.main.humidity,
                  desc:data.weather[0].description,
                  wspeed:data.wind.speed,
                error:""});
    }}
    catch (e) {
      alert('Please input valid city and dates');;
    }
  }
  getPastWeather= async (e)=>{
    try{
    e.preventDefault();
    if(e.target.elements.pastcity.value && this.state.paststartdate)
    {console.log(this.state.paststartdate);
    const pastcity=e.target.elements.pastcity.value;
    const paststartdate=[this.state.paststartdate.getFullYear(),this.state.paststartdate.getMonth()+1,this.state.paststartdate.getDate()].join('-');
    let pastenddate = "";
    let urlstring ="";
    if(typeof this.state.pastenddate!=="undefined" && e.target.elements.pastenddate.value  )
    {
    pastenddate=[this.state.pastenddate.getFullYear(),this.state.pastenddate.getMonth()+1,this.state.pastenddate.getDate()].join('-'); 
     urlstring = "&enddate=";
  }
    // console.log(paststartdate);
    // console.log(pastcity);
    // console.log(pastenddate);
    if (pastcity && paststartdate)
    { 
    const pastweatherapi_call=await fetch(`http://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=${pastcity}&format=JSON&date=${paststartdate}${urlstring}${pastenddate}&key=${PastWeather_API_KEY}`);
    const pastdata= await pastweatherapi_call.json(); 
    
      let templabel=[];
      let tempdatasets={};
      let tempdaterange=[];
    
      for(var i=0;i <pastdata.data.weather.length;i++)
      {
         templabel[i] = 'Temperature variation on ' + pastdata.data.weather[i].date;
         tempdaterange[i] = pastdata.data.weather[i].date;
          tempdatasets[i] = { label: 'Temperature variation on ' + pastdata.data.weather[i].date,
                                            data: [pastdata.data.weather[i].hourly[0].tempC,pastdata.data.weather[i].hourly[1].tempC,
                                                  pastdata.data.weather[i].hourly[2].tempC,pastdata.data.weather[i].hourly[3].tempC,
                                                  pastdata.data.weather[i].hourly[4].tempC,pastdata.data.weather[i].hourly[5].tempC,
                                                  pastdata.data.weather[i].hourly[6].tempC,pastdata.data.weather[i].hourly[7].tempC],
                                            backgroundColor:[
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)']}
          }
          let chartdata1 = [];
          for(var i=0;i <pastdata.data.weather.length;i++)
          { chartdata1[i] = [...chartdata1, { labels :  ['00:00','03:00 am','06:00 am', '09:00 am', '12:00 pm','03:00 pm','06:00 pm','09:00 pm'],
                                              datasets : tempdatasets[i]
                                          }]}
          let templabelWind=[];
          let tempdatasetsWind=[];
          for(var i=0;i <pastdata.data.weather.length;i++)
      {
         templabelWind[i] = 'Wind Speed on ' + pastdata.data.weather[i].date;
          tempdatasetsWind[i] = { label: 'Wind Speed on ' + pastdata.data.weather[i].date,
                                            data: [pastdata.data.weather[i].hourly[0].WindGustKmph,pastdata.data.weather[i].hourly[1].WindGustKmph,
                                                  pastdata.data.weather[i].hourly[2].WindGustKmph,pastdata.data.weather[i].hourly[3].WindGustKmph,
                                                  pastdata.data.weather[i].hourly[4].WindGustKmph,pastdata.data.weather[i].hourly[5].WindGustKmph,
                                                  pastdata.data.weather[i].hourly[6].WindGustKmph,pastdata.data.weather[i].hourly[7].WindGustKmph],
                                            backgroundColor:[
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)',
                                                    'rgba(0, 162, 235, 0.6)']}
          }
          let chartdataWind1 = [];
          for(var i=0;i <pastdata.data.weather.length;i++)
          { chartdataWind1[i] = [...chartdataWind1, { labels :  ['00:00','03:00 am','06:00 am', '09:00 am', '12:00 pm','03:00 pm','06:00 pm','09:00 pm'],
                                              datasets : tempdatasetsWind[i]
                                          }]}
                                          let templabelRain=[];
                                          let tempdatasetsRain=[];
                                          for(var i=0;i <pastdata.data.weather.length;i++)
                                      {
                                         templabelRain[i] = 'Rain variation on ' + pastdata.data.weather[i].date;
                                          tempdatasetsRain[i] = { label: 'Rain variation on ' + pastdata.data.weather[i].date,
                                                                            data: [pastdata.data.weather[i].hourly[0].precipMM,pastdata.data.weather[i].hourly[1].precipMM,
                                                                                  pastdata.data.weather[i].hourly[2].precipMM,pastdata.data.weather[i].hourly[3].precipMM,
                                                                                  pastdata.data.weather[i].hourly[4].precipMM,pastdata.data.weather[i].hourly[5].precipMM,
                                                                                  pastdata.data.weather[i].hourly[6].precipMM,pastdata.data.weather[i].hourly[7].precipMM],
                                                                            backgroundColor:[
                                                                                    'rgba(0, 162, 235, 0.6)',
                                                                                    'rgba(0, 162, 235, 0.6)',
                                                                                    'rgba(0, 162, 235, 0.6)',
                                                                                    'rgba(0, 162, 235, 0.6)',
                                                                                    'rgba(0, 162, 235, 0.6)',
                                                                                    'rgba(0, 162, 235, 0.6)',
                                                                                    'rgba(0, 162, 235, 0.6)',
                                                                                    'rgba(0, 162, 235, 0.6)']}
                                          }
                                          let chartdataRain1 = [];
                                          for(var i=0;i <pastdata.data.weather.length;i++)
                                          { chartdataRain1[i] = [...chartdataRain1, { labels :  ['00:00','03:00 am','06:00 am', '09:00 am', '12:00 pm','03:00 pm','06:00 pm','09:00 pm'],
                                                                              datasets : tempdatasetsRain[i]
                                                                          }]}                                  
      this.setState({
        location: pastdata.data.request[0].query,
        daterange : tempdaterange,
        chartData:chartdata1,
        windData:chartdataWind1,
        rainData: chartdataRain1,
        error:""
        });
      
//         console.log(this.state.location);
//         console.log(pastdata);
//                   console.log(this.state.chartData.length);
//                   console.log(pastdata.data.request[0].query);
//                   console.log(pastdata.data.weather[0].date);
//                   console.log(pastdata.data.weather[pastdata.data.weather.length-1].date);
//  //                 console.log(this.state.chartData[0].datasets.data);
//                     console.log(this.state.chartData[0][0].datasets.data);
//                     console.log(this.state.windData[0][0].datasets.data);
//                     // console.log(this.state.chartData);
      
      }
        else
    {
    alert('Please input valid city and dates');}
  }
}
catch (e) {
  alert('Please input valid city and dates');;
}
  }

    wrapperFunction = (event) => {
      //do something
      this.getPastWeather(event);
      //do something
      this.getWeather(event);
  }

  handleChangeStart(d){
    
    this.setState({paststartdate: d});
  }

  handleChangeEnd(d){
 
    this.setState({pastenddate: d});
  }

  handleOptionChange()
  {
    this.setState({ selectedOption: '1'
    });
  }

  handleOptionChange1()
  {
    this.setState({ selectedOption: '2'
    });
  }
  handleOptionChange2()
  {
    this.setState({ selectedOption: '3'
  });
}

resizeIframe(obj){
  obj.style.height = 0;
  obj.style.height = obj.contentWindow.document.body.scrollHeight + 200+ 'px';
}

showRight = () => {
  this.setState({ rightMenu: !this.state.rightMenu })
}



  render() 
  
  { let shor = []; 
    let tempcharts = [];
    let windcharts = [];
    let raincharts = [];
let show = [];
show.push( <div >
    <h3>Design Decision</h3>
    <p>We wanted to visually compare the weather of two or more prominent cities using existing dataset,
       Hence we used line graph since time-series visualization is involved and its
        clearer to differentiate if less than five cities are selected.
    We also included a bar chart to further display the distinction. 
    In order to get better results, we should select shorter range</p>
    <h3>Technology Used</h3>
    <p><strong>Dash</strong> is used to make the web-application,
     however we used <strong>Plotly</strong> for the visualization</p>
    
    <h3>Other Alternatives</h3>
    <p>We started with d3.js but it was difficult to interpret given the timeline, 
      then we moved on to chart.js, which we later found to be less flexible.
       Hence, we chose Plotly because it came with Dash which only required the use of <strong>Python</strong>.</p>
    
    <h3>Development</h3>
    <p> It took around 20 hours to learn dash and plotly which was instrumental in development of the project.
    We divided the work into 5 categories , with each of the team member responsible for one or two divisions.
    </p>
    <ul>
    <li> Data selection  <strong>(Ramya)</strong></li>
    <li> Data Manipulation <strong>(Kriti)</strong></li>
    <li> Knowledge transfer <strong> (Everyone) </strong></li>
    <li> Application development <strong>(Asjad) </strong></li>
    <li> UX and UI development <strong>(Prateek)  </strong></li>
    </ul>
    <h3>Project Overview</h3>
    <p> Based on the requirement and our experience we agreed to use <strong>Python</strong> for the development. Since we decided to use <strong>plotly</strong> for visualization we needed to understand the development of application in <strong>Dash</strong>. Each of the team member took their time to learn and understand development of application. Later we sat together and did knowledge transfer.</p>
    <p>
    One of the challenge that occurred after the development of application was, inability of Dash application to get hosted on github. To overcome this issue we hosted the Dash application on hiroku app and then in turn embedded the application on a <strong>React JS</strong> based web app that can be hosted on github.
    The total time taken to develop this application was somewhere around 90 hours, though majority of it was utilized in learning the development in Dash and plotly. 
    The dataset was acquired from National Centers for Environmental Information, 
    National Oceanic and Atmospheric Administration (NOAA).</p> </div>)
    
if (this.state.rightMenu== true)
{ shor=show;
}
if (this.state.rightMenu== false)
{ shor=null;
}



    for(var o=0; o < this.state.chartData.length; o++)
    { 
      let databar = {
        labels :  ['00:00','03:00 am','06:00 am', '09:00 am', '12:00 pm','03:00 pm','06:00 pm','09:00 pm'],
        datasets: [
          {
            label: 'Temperature in celsius ',
            backgroundColor:[
                    'rgba(0, 162, 235, 0.6)',
                    'rgba(0, 162, 235, 0.6)',
                    'rgba(0, 162, 235, 0.6)',
                    'rgba(0, 162, 235, 0.6)',
                    'rgba(0, 162, 235, 0.6)',
                    'rgba(0, 162, 235, 0.6)',
                    'rgba(0, 162, 235, 0.6)',
                    'rgba(0, 162, 235, 0.6)'],
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: this.state.chartData[o][o].datasets.data,
              
          }
        ] };

     tempcharts.push(
       <div style={{display: 'inline-block',width: '650px',height: '325px',padding: '5px',margin:'5px',border: '2px solid blue'}}>
     <Bar 
          data ={databar}
          options={{
                      scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                                    }
                               }]
                              },
                    title:{
                        display:true,
                        text:'Temperature variation in '+this.state.location+ ' on '+ this.state.daterange[o],
                        fontSize:25
                          },
                    legend:{
                        display:true,
                        position:'right'
                            },
                    animation: {
                        duration: 3000,
                        easing: 'easeInBounce',
                              // onProgress: function(animation) {
                              //    progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                              // }
                            },
                          }} />
                          </div>);
                        }
       for(var o=0; o < this.state.windData.length; o++)
      { let datawind =
        {
          labels :  ['00:00','03:00 am','06:00 am', '09:00 am', '12:00 pm','03:00 pm','06:00 pm','09:00 pm'],
          datasets: [
                  {
          label: 'Wind speed in Km/hr ',
          backgroundColor:[
                'rgba(0, 0, 0, 0.6)',
                'rgba(0, 62, 235, 0.6)',
                'rgba(0, 62, 235, 0.6)',
                'rgba(0, 62, 235, 0.6)',
                'rgba(0, 62, 235, 0.6)',
                'rgba(0, 62, 235, 0.6)',
                'rgba(0, 62, 235, 0.6)',
                'rgba(0, 62, 235, 0.6)'],
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.windData[o][o].datasets.data,
         
          type: 'line',
          fill: true
        }]};

        windcharts.push(  
          <div style={{display: 'inline-block',width: '650px',height: '325px',padding: '5px',margin:'5px',border: '2px solid blue'}}>
          <Line 
               data ={datawind}
               options={{
                         responsive: true,
                         hoverMode: 'index',
                         title:{
                             display:true,
                             text:'Wind speed in '+this.state.location+ ' on '+ this.state.daterange[o],
                             fontSize:25
                               },
                         legend:{
                             display:true,
                             position:'right'
                                 },
                         animation: {
                             duration: 3000,
                             easing: 'easeInBounce',
                                   // onProgress: function(animation) {
                                   //    progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                                   // }
                                 },
                         scales: {
                             yAxes: [{
                                 type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                 display: true,
                                 position: 'left',
                                   }]
                               },
                               tooltips: {
                                 mode: "label"
                               }}} />
                               </div>

        );}

        for(var o=0; o < this.state.windData.length; o++)
        { let datarain =
          {
            labels :  ['00:00','03:00 am','06:00 am', '09:00 am', '12:00 pm','03:00 pm','06:00 pm','09:00 pm'],
            datasets: [
                    {
            label: 'Precipitation in MM ',
            backgroundColor:[
                  'rgba(255, 0, 255, 0.6)',
                  'rgba(255, 0, 255, 0.6)',
                  'rgba(255, 0, 255, 0.6)',
                  'rgba(255, 0, 255, 0.6)',
                  'rgba(255, 0, 255, 0.6)',
                  'rgba(255, 0, 255, 0.6)',
                  'rgba(255, 0, 255, 0.6)',
                  'rgba(255, 0, 255, 0.6)'],
            borderColor: 'rgba(255,50,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: this.state.rainData[o][o].datasets.data,
           
            type: 'line',
            fill: true
          }]};
  
          raincharts.push(  
            <div style={{display: 'inline-block',width: '650px',height: '325px',padding: '5px',margin:'5px' ,border: '2px solid blue'}}>
            <Line 
                 data ={datarain}
                 options={{
                           responsive: true,
                           hoverMode: 'index',
                           title:{
                               display:true,
                               text:'Precipitation in '+this.state.location+ ' on '+ this.state.daterange[o],
                               fontSize:25
                                 },
                           legend:{
                               display:true,
                               position:'right'
                                   },
                           animation: {
                               duration: 3000,
                               easing: 'easeInBounce',
                                     // onProgress: function(animation) {
                                     //    progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                                     // }
                                   },
                           scales: {
                               yAxes: [{
                                   type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                   display: true,
                                   position: 'left',
                                     }]
                                 },
                                 tooltips: {
                                   mode: "label"
                                 }}} />
                                 </div>
          );}



    return (
      <div>  <Titles/>
        

      <div style={{textAlign:"right"}}>  <button onClick={this.showRight} className="button1">About Us</button> </div>
      <div style={{margin:"10px", padding:"10px"}}> {shor}</div>
      <embed height = "715" width = "100%" src = "https://weather-app-dbs.herokuapp.com/"/>
     
          <div> {tempcharts}</div>
        <div>{windcharts} </div>
        <div>{raincharts} </div>
        
    </div>
    );
  }
}

export default App;
