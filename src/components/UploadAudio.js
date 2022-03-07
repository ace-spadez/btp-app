import React,{Fragment,useEffect,useState} from  'react';
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
const { ipcRenderer } = window.require('electron');

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
  const [selectedFile2, setSelectedFile2] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFilePicked2, setIsFilePicked2] = useState(false);
  const [gotimage,set_gotimage]=useState(null);
  const [gotimage2,set_gotimage2]=useState(null);

  const [gotwave,set_gotwave]=useState(null);
  const [gotwave2,set_gotwave2]=useState(null);

  const [api_success,set_api_success]=useState("");

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
  return (
    <Fragment>
      <div>
      <h3 style={{color:'blue',marginTop:"10px",fontWeight:'bold',textAlign:'center'}} >Intonation Profile</h3>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
      
      <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'center',borderWidth:'2px',borderColor:'black'}}>
      <h4 style={{color:'blue',marginTop:"1px",fontWeight:'bold',textAlign:'center'}} >Normal Voice</h4>
      <input type="file" name="file" accept="audio/wav" onChange={changeHandler} />
      
      {isFilePicked?<button style={{width:'70px',marginBottom:'10px'}}onClick={()=>getimage()}>submit</button>:null}
      {gotimage?<p>Pitch Pattern</p> :null}
      {gotimage?<img src={"data:image/png;base64," + gotimage} alt="Please Try again" width="300" height="300"></img> :null}
      {gotimage?<p>Wave Form</p> :null}
      {gotimage?<img src={"data:image/png;base64," + gotwave} alt="Please Try again" width="300" height="300"></img> :null}
      </div>
      <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'center',borderWidth:'2px',borderColor:'black'}}>
      <h4 style={{color:'blue',marginTop:"1px",fontWeight:'bold',textAlign:'center'}} >Parkinson Voice</h4>
      <input type="file" name="file" accept="audio/wav" onChange={changeHandler2} />
      
      {isFilePicked2?<button style={{width:'70px',marginBottom:'10px'}}onClick={()=>getimage2()}>submit</button>:null}
      {gotimage2?<p>Pitch Pattern</p> :null}
      {gotimage2?<img src={"data:image/png;base64," + gotimage2} alt="Please Try again" width="300" height="300"></img>:null}
      {gotimage2?<p>Wave from</p> :null}
      {gotimage2?<img src={"data:image/png;base64," + gotwave2} alt="Please Try again" width="300" height="300"></img>:null}
      
      </div>
      </div>
      </div>
    </Fragment>
  );

}
export default UploadAudio;