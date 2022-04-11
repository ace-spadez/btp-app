import React, { Fragment, useEffect, useState } from 'react';
import { Recorder } from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import Button from '@mui/material/Button';
import { FileUploader } from "react-drag-drop-files";
import { CircularProgress } from '@mui/material';
import CanvasJSReact from '../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const { ipcRenderer } = window.require('electron');

const fileTypes = ["wav"];

let charts2 =[]
// export default function Home() {
//     return (
//       <main style={{ padding: "1rem 0" }}>
//         <h2>Expenses</h2>
//       </main>
//     );
//   }
function UploadAudio() {
  const [flask_data, set_flask_data] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [highlighting, setHighlighting] = useState(false);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFilePicked2, setIsFilePicked2] = useState(false);
  const [gotimage, set_gotimage] = useState(null);
  const [gotimage2, set_gotimage2] = useState(null);

  const [gotwave, set_gotwave] = useState(null);
  const [gotwave2, set_gotwave2] = useState(null);
  const [gotoptions, set_gotoptions] = useState(null);
  const [gotoptions2, set_gotoptions2] = useState(null);
  // const [charts2,set_charts]=useState([]);


  const syncHandler = (e) => {
    console.log("came here")
    console.log(charts2)
    for (var i = 0; i < charts2.length; i++) {
      var chart = charts2[i];

      if (!chart.options.axisX) chart.options.axisX = {};

      if (!chart.options.axisY) chart.options.axisY = {};

      if (e.trigger === "reset") {
        chart.options.axisX.viewportMinimum = chart.options.axisX.viewportMaximum = null;
        chart.options.axisY.viewportMinimum = chart.options.axisY.viewportMaximum = null;
        chart.render()

      } else if (chart !== e.chart) {
        console.log("not same bro")
        chart.options.axisX.viewportMinimum = e.axisX[0].viewportMinimum;
        chart.options.axisX.viewportMaximum = e.axisX[0].viewportMaximum;

        chart.options.axisY.viewportMinimum = e.axisY[0].viewportMinimum;
        chart.options.axisY.viewportMaximum = e.axisY[0].viewportMaximum;
        chart.render()

      }
    }
  }

  const [options, set_options] = useState({
    theme: "light",
    animationEnabled: true,
    zoomEnabled: true,
    rangeChanged: syncHandler,
    title: {
      text: "Intonation Profile"
    },
    axisX: {
      title: "Time (in sec)",
      suffix: "sec",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY: {
      title: "Frequency [Hz]",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    data: [{
      type: "scatter",
      color: "blue",
      markerSize: 5,
      toolTipContent: "Time: {x}sec Frequency: {y}Hz",
      dataPoints: [
        
      ]
    },
    {
      type: "scatter",
      color: "orange",
      toolTipContent: "Temperature: {x}°CSales: {y}",
      markerSize: 7,
      dataPoints: [
        
      ]
    }

    ]
  })

  const [options2, set_options2] = useState({
    theme: "light",
    animationEnabled: true,
    zoomEnabled: true,
    rangeChanged: syncHandler,
    title: {
      text: "WavePattern"
    },
    axisX: {
      title: "Time (in sec)",
      suffix: "sec",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY: {
      title: "Frequency [Hz]",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    data: [{
      type: "line",
      color: "red",
      toolTipContent: "Time: {x}sec Frequency: {y}Hz",
      dataPoints: [
        
      ]
    },
    {
      type: "scatter",
      color: "orange",
      toolTipContent: "Temperature: {x}°CSales: {y}",
      markerSize: 7,
      dataPoints: [
        
      ]
    }

    ]
  })


  

  const [gotfinal, set_gotfinal] = useState(null);

  const [api_success, set_api_success] = useState("");
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    setSelectedFile(file.path);
    setIsFilePicked(true);


  };
  


  const getimage = async () => {

    const port = ipcRenderer.sendSync('get-port-number');
    setAnalyzing(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filepath: selectedFile })
    };
    
    await fetch(`http://0.0.0.0:${port}/wavepattern`, requestOptions, { 'Access-Control-Allow-Origin': '*' })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        set_api_success("success")
        let temp_options = { ...options2 }
        temp_options["data"][0]["dataPoints"] = response.dataPoints
        set_options2(temp_options)
        set_gotoptions2(temp_options)
        
      })
      .catch(err => {
        console.log(err)
      })


    setAnalyzing(false);


  }

  const updatecharts=(ref)=>{
    console.log("before " + charts2.length)
    // set_charts([...charts2,ref])
    charts2.push(ref)
    console.log("after "+charts2.length)
  }
  
  const getimage4 = async () => {
    setHighlighting(true);


    const port = ipcRenderer.sendSync('get-port-number');

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filepath: selectedFile })
    };

    await fetch(`http://0.0.0.0:${port}/highlight`, requestOptions, { 'Access-Control-Allow-Origin': '*' })
      .then(response => response.json())
      .then(response => {
        set_api_success("success")
        let temp_options = { ...options }
        temp_options["data"][0]["dataPoints"] = response.normal
        temp_options["data"][1]["dataPoints"] = response.highlight
        set_options(temp_options)
        set_gotoptions(response)
      })
      .catch(err => {
        console.log(err)
      })

    setHighlighting(false);

  }
  return (
    <Fragment>
      <div style={{ overflow: "scroll", height: "100%" }}>
        {/* <h3 style={{color:'black',marginTop:"10px",fontWeight:'bold',textAlign:'center'}} >Upload the Audio to Analyze</h3> */}
        <div style={{ width: '100%', alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '500px', marginTop: '50px' }}>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
          </div>
        </div>

        <div >

          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderWidth: '2px', borderColor: 'black' }}>
          
            {isFilePicked && !analyzing ? <Button variant="contained" style={{ marginBottom: '10px', padding: '5px 20px' }} onClick={() => getimage()}>WavePattern</Button> : null}
            
            {isFilePicked && analyzing ? <Button style={{ marginBottom: '10px', padding: '5px 20px' }} onClick={() => getimage()}><CircularProgress color="success"></CircularProgress></Button> : null}
            {isFilePicked & !highlighting ? <Button variant="contained" style={{}} onClick={() => getimage4()}>Highlight</Button> : null}
            {isFilePicked & highlighting ? <Button style={{}} onClick={() => getimage4()}><CircularProgress color="success"></CircularProgress></Button> : null}


            <div>
              {gotoptions2?<div style={{ width: '1000px',height:'300px' }}>
          <CanvasJSChart  options={options2} onRef={ref => updatecharts(ref)}/>
        </div> :null}


            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderWidth: '2px', borderColor: 'black' }}>
          
            
            <br></br>
            {isFilePicked & highlighting ? <Button style={{}} onClick={() => getimage4()}><CircularProgress color="success"></CircularProgress></Button> : null}
            {gotfinal ? <img src={"data:image/png;base64," + gotfinal} alt="Please Try again" width="600" height="350"></img> : null}
            
                {gotoptions?<div style={{ width: '1000px',height:'400px' }}>
                  <CanvasJSChart options={options} onRef={ref => updatecharts(ref)} />
                </div>:null}
            


          </div>

          


        </div>
        {/* <div style={{width:'800px'}}>
      <CanvasJSChart  options = {options}/>
      </div> */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
      </div>
    </Fragment>
  );

}
export default UploadAudio;