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
  const [options, set_options] = useState({
    theme: "light",
    animationEnabled: true,
    zoomEnabled: true,
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
        { x: 14.2, y: 215 },
        { x: 12.9, y: 175 },
        { x: 16.4, y: 325 },
        { x: 26.9, y: 635 },
        { x: 32.5, y: 464 },
        { x: 22.1, y: 522 },
        { x: 19.4, y: 412 },
        { x: 25.1, y: 614 },
        { x: 34.9, y: 374 },
        { x: 28.7, y: 625 },
        { x: 23.4, y: 544 },
        { x: 31.4, y: 502 },
        { x: 40.8, y: 262 },
        { x: 37.4, y: 312 },
        { x: 42.3, y: 202 },
        { x: 39.1, y: 302 },
        { x: 17.2, y: 408 }
      ]
    },
    {
      type: "scatter",
      color: "orange",
      toolTipContent: "Temperature: {x}°CSales: {y}",
      markerSize: 7,
      dataPoints: [
        { x: 14.2, y: 215 },
        { x: 12.9, y: 175 },
        { x: 16.4, y: 325 },
        { x: 26.9, y: 635 },
        { x: 32.5, y: 464 },
        { x: 22.1, y: 522 },
        { x: 19.4, y: 412 },
        { x: 25.1, y: 614 },
        { x: 34.9, y: 374 },
        { x: 28.7, y: 625 },
        { x: 23.4, y: 544 },
        { x: 31.4, y: 502 },
        { x: 40.8, y: 262 },
        { x: 37.4, y: 312 },
        { x: 42.3, y: 202 },
        { x: 39.1, y: 302 },
        { x: 17.2, y: 408 }
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
  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0].path);
    setIsFilePicked(true);
  };
  const changeHandler2 = (event) => {
    setSelectedFile2(event.target.files[0].path);
    setIsFilePicked2(true);
  };


  const getimage = async () => {

    const port = ipcRenderer.sendSync('get-port-number');
    setAnalyzing(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filepath: selectedFile })
    };
    await fetch(`http://0.0.0.0:${port}/example`, requestOptions, { 'Access-Control-Allow-Origin': '*' })
      .then(response => response.json())
      .then(response => {
        set_api_success("success")
        let temp_options = { ...options }
        temp_options["data"][0]["dataPoints"] = response.dataPoints
        set_options(temp_options)

        console.log(response.dataPoints)
      })
      .catch(err => {
        console.log(err)
      })
    await fetch(`http://0.0.0.0:${port}/wavepattern`, requestOptions, { 'Access-Control-Allow-Origin': '*' })
      .then(response => response.json())
      .then(response => {
        set_api_success("success")
        set_gotwave(response.imagename)
      })
      .catch(err => {
        console.log(err)
      })


    setAnalyzing(false);


  }

  const getimage2 = async () => {

    const port = ipcRenderer.sendSync('get-port-number');

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filepath: selectedFile2 })
    };

    await fetch(`http://0.0.0.0:${port}/example`, requestOptions, { 'Access-Control-Allow-Origin': '*' })
      .then(response => response.json())
      .then(response => {
        set_api_success("success")
        set_gotimage2(response.imagename)
      })
      .catch(err => {
        console.log(err)
      })


    await fetch(`http://0.0.0.0:${port}/wavepattern`, requestOptions, { 'Access-Control-Allow-Origin': '*' })
      .then(response => response.json())
      .then(response => {
        set_api_success("success")
        set_gotwave2(response.imagename)
      })
      .catch(err => {
        set_api_success(JSON.stringify(err.json()))
      })




  }
  const getimage3 = async () => {

    const port = ipcRenderer.sendSync('get-port-number');

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filepath1: selectedFile, filepath2: selectedFile2 })
    };

    await fetch(`http://0.0.0.0:${port}/speechpattern`, requestOptions, { 'Access-Control-Allow-Origin': '*' })
      .then(response => response.json())
      .then(response => {
        set_api_success("success")
        set_gotfinal(response.imagename)
      })
      .catch(err => {
        console.log(err)
      })



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
            <br></br>
            <br></br>
            {isFilePicked & !highlighting ? <Button variant="contained" style={{}} onClick={() => getimage4()}>Highlight</Button> : null}
            <br></br>
            {isFilePicked & highlighting ? <Button style={{}} onClick={() => getimage4()}><CircularProgress color="success"></CircularProgress></Button> : null}
            {gotfinal ? <img src={"data:image/png;base64," + gotfinal} alt="Please Try again" width="600" height="400"></img> : null}
            {
              gotoptions ?
                <div style={{ width: '1000px' }}>
                  <CanvasJSChart options={options} />
                </div> : null
            }


          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderWidth: '2px', borderColor: 'black' }}>
            <br></br>
            <br></br>
            {isFilePicked && !analyzing ? <Button variant="contained" style={{ marginBottom: '10px', padding: '5px 20px' }} onClick={() => getimage()}>WavePattern</Button> : null}
            {isFilePicked && analyzing ? <Button style={{ marginBottom: '10px', padding: '5px 20px' }} onClick={() => getimage()}><CircularProgress color="success"></CircularProgress></Button> : null}


            <div>
              {gotwave ? <img src={"data:image/png;base64," + gotwave} alt="Please Try again" width="1000" height="400"></img> : null}


            </div>
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