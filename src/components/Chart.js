import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData,
      location: props.location
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }



  render(){

    var tempcharts = [];
      for(var o=0; o < this.state.chartData.length; o++){
        tempcharts.push(<span >
          <div style={{display: 'inline-block',width: '600px',height: '300px',padding: '5px',margin:'5px',border: '2px solid blue'}}>
        <Bar
          data={this.state.chartData[0]}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Temperature variation in '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        </div>
        </span>);
      }
  
  
    



    return (
      <div className="chart"> 
      <div>{tempcharts}</div>
      <div style={{display: 'inline-block',width: '600px',height: '300px',padding: '5px',margin:'5px',border: '2px solid blue'}}>
        <Bar
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Temperature variation in '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        </div>
        <div>{this.props.chartData.length}</div>
        <div>{this.state.chartData.length}</div>
        <div>{this.state.chartData[1].datasets[1].data[5]}</div>
        <div>{this.props.chartData[1].datasets[1].data[6]}</div>
      <div style={{display: 'inline-block',width: '600px',height: '300px',padding: '5px',margin:'5px',border: '2px solid blue'}}>
        <Line
         
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
          
        />
          </div>
          <div style={{display: 'inline-block',width: '800px',height: '400px',padding: '5px',margin:'5px',border: '2px solid blue'}}>
        <Pie
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
      </div>
    )
  }
}

export default Chart;
