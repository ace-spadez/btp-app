import React,{Fragment,useEffect,useState} from  'react';
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import Button from '@mui/material/Button';
import { FileUploader } from "react-drag-drop-files";
import { CircularProgress } from '@mui/material';

const { ipcRenderer } = window.require('electron');

const fileTypes = ["wav"];
// export default function Home() {
//     return (
//       <main style={{ padding: "1rem 0" }}>
//         <h2>Expenses</h2>
//       </main>
//     );
//   }
function UploadAudio(){
  const [flask_data,set_flask_data]=useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [highlighting, setHighlighting] = useState(false);
  const [selectedFile2, setSelectedFile2] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFilePicked2, setIsFilePicked2] = useState(false);
  const [gotimage,set_gotimage]=useState(null);
  const [gotimage2,set_gotimage2]=useState(null);

  const [gotwave,set_gotwave]=useState(null);
  const [gotwave2,set_gotwave2]=useState(null);

  const [gotfinal,set_gotfinal] = useState(null);

  const [api_success,set_api_success]=useState("");
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

  
  const getimage=async ()=>{
    
    const port = ipcRenderer.sendSync('get-port-number');
    setAnalyzing(true);
     const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filepath:selectedFile  })
    };
    await fetch(`http://0.0.0.0:${port}/example`, requestOptions,{'Access-Control-Allow-Origin':'*'})
        .then(response=>response.json())
        .then(response => {
          set_api_success("success")
          set_gotimage(response.imagename)
          })
        .catch(err=>{
          console.log(err)
        })
    await fetch(`http://0.0.0.0:${port}/wavepattern`, requestOptions,{'Access-Control-Allow-Origin':'*'})
        .then(response=>response.json())
        .then(response => {
          set_api_success("success")
          set_gotwave(response.imagename)
          })
        .catch(err=>{
          console.log(err)
        })


        setAnalyzing(false);
        
        
  }

  const getimage2=async ()=>{
    
    const port = ipcRenderer.sendSync('get-port-number');
    
     const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filepath:selectedFile2  })
    };

    await fetch(`http://0.0.0.0:${port}/example`, requestOptions,{'Access-Control-Allow-Origin':'*'})
    .then(response=>response.json())
    .then(response => {
      set_api_success("success")
      set_gotimage2(response.imagename)
      })
    .catch(err=>{
      console.log(err)
    })


    await fetch(`http://0.0.0.0:${port}/wavepattern`, requestOptions,{'Access-Control-Allow-Origin':'*'})
        .then(response=>response.json())
        .then(response => {
          set_api_success("success")
          set_gotwave2(response.imagename)
          })
        .catch(err=>{
          set_api_success(JSON.stringify(err.json()))
        })


        
        
  }
  const getimage3=async ()=>{
    
    const port = ipcRenderer.sendSync('get-port-number');
    
     const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filepath1:selectedFile,filepath2:selectedFile2  })
    };

    await fetch(`http://0.0.0.0:${port}/speechpattern`, requestOptions,{'Access-Control-Allow-Origin':'*'})
    .then(response=>response.json())
    .then(response => {
      set_api_success("success")
      set_gotfinal(response.imagename)
      })
    .catch(err=>{
      console.log(err)
    })

        
        
  }
  const getimage4=async ()=>{
    setHighlighting(true);
    
    
    const port = ipcRenderer.sendSync('get-port-number');
    
     const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filepath:selectedFile })
    };

    await fetch(`http://0.0.0.0:${port}/highlight`, requestOptions,{'Access-Control-Allow-Origin':'*'})
    .then(response=>response.json())
    .then(response => {
      set_api_success("success")
      set_gotfinal(response.imagename)
      })
    .catch(err=>{
      console.log(err)
    })

        setHighlighting(false);
        
  }
  return (
    <Fragment>
      <div>
      {/* <h3 style={{color:'black',marginTop:"10px",fontWeight:'bold',textAlign:'center'}} >Upload the Audio to Analyze</h3> */}
      <div style={{width:'100%',alignContent:'center',display:'flex',justifyContent:'center'}}>
<div style={{width:'500px',marginTop:'50px'}}>
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
        </div>
        </div>

      <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        
      
      <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'center',borderWidth:'2px',borderColor:'black'}}>
      {/* <h4 style={{color:'grey',marginTop:"1px",fontWeight:'bold',textAlign:'center'}} >Upload the audio to analyze</h4> */}
      {/* <input type="file" name="file" accept="audio/wav" onChange={changeHandler} /> */}
      
      {/* {isFilePicked?<button style={{marginBottom:'10px',borderRadius:'5px',marginTop:'10px',backgroundColor:'black',color:'white',textDecoration:'none',fontWeight:'bold',padding:'5px 20px'}}onClick={()=>getimage()}>Analyze</button>:null} */}
      {isFilePicked && !analyzing?<Button variant="contained" style={{marginBottom:'10px',padding:'5px 20px'}}onClick={()=>getimage()}>Analyze</Button>:null}
      {isFilePicked && analyzing?<Button style={{marginBottom:'10px',padding:'5px 20px'}}onClick={()=>getimage()}><CircularProgress color="success"></CircularProgress></Button>:null}
      
      
      <div>
        {
          gotimage?<span>
      <img src={"data:image/png;base64," + gotimage} alt="Please Try again" width="800" height="400"></img> 
      <br></br>
      <img src={"data:image/png;base64," + gotwave} alt="Please Try again" width="800" height="400"></img>



          </span>:null
        }
     
  </div>
      </div>



      <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'center',borderWidth:'2px',borderColor:'black'}}>
     
       {isFilePicked & !highlighting ?<Button variant="contained" style={{}} onClick={()=>getimage4()}>Highlight</Button>:null}
       {isFilePicked & highlighting ?<Button style={{}} onClick={()=>getimage4()}><CircularProgress color="success"></CircularProgress></Button>:null}
      {gotfinal?<img src={"data:image/png;base64," + gotfinal} alt="Please Try again" width="800" height="800"></img>:null}
      
      
      </div>
      </div>
      {/* {isFilePicked ?<button style={{width:'150px',marginBottom:'10px',marginLeft:"100px"}}onClick={()=>getimage4()}>Highlight</button>:null}
      {gotfinal?<img src={"data:image/png;base64," + gotfinal} alt="Please Try again" width="400" height="400"></img>:null} */}
      </div>
    </Fragment>
  );

}
export default UploadAudio;