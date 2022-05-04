import React from  'react';
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import AudioRecorder from 'react-audio-recorder'
import styles from 'components/App.module.scss';
import play_btn from 'play.png'
import stop_btn from 'stop-button.png'
import {ReactMic} from '@cleandersonlobo/react-mic';
const { ipcRenderer } = window.require('electron');

export  default class   Home extends React.Component{
    constructor(){
        super();
        this.state = {

              record:false,


              isFilePicked:false,
              api_success : "",
              gotimage: null,
              gotwave: null,
              selectedFile: null,
              uploadedFile: null
        }
    

    }

    startRecording =()=>{
      this.setState({record:true});
    }
    stopRecording =()=>{
      this.setState({record:false});
    }
    onStop=(file)=>{
      // console.log(data);
      console.log(file);
      // let url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = file.blobURL;
      link.download = `new-${new Date()}.wav`;
      link.click();
    }
    onData=(data)=>{
      // console.log(data);
    }
    getimage=async ()=>{
    
      const port = ipcRenderer.sendSync('get-port-number');
      
       const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filepath:this.state.selectedFile  })
      };
      await fetch(`http://0.0.0.0:${port}/example`, requestOptions,{'Access-Control-Allow-Origin':'*'})
          .then(response=>response.json())
          .then(response => {
            this.setState({api_success:true,gotimage:response.imageName})
            })
          .catch(err=>{
            console.log(err)
          })
      await fetch(`http://0.0.0.0:${port}/wavepattern`, requestOptions,{'Access-Control-Allow-Origin':'*'})
          .then(response=>response.json())
          .then(response => {
            this.setState({api_success:true,gotwave:response.imageName})
            })
          .catch(err=>{
            console.log(err)
          }) 
    }
    
    handleAudioStop(data){
        console.log(data)
        this.setState({ audioDetails: data });
    }
    
    handleAudioUpload=async(file)=> {
        console.log(file);
        let url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = `new-${new Date().getMilliseconds()}.wav`;
        link.click();
        // console.log(url);
        // this.setState({selectedFile:url});
        // await this.getimage();
    }
    
    handleCountDown(data) {
        console.log(data);
    };
    
   
    render() {
       
        return <div>
          <h1 style={{marginLeft:"100px",marginTop:"100px"}}>RECORD AUDIO</h1>
        <div className={styles.area}>
          <div >
        <ReactMic style={{width:'200px'}}
          record = {this.state.record}
          className="sound-wave"
          onStop = {this.onStop}
          onData = {this.onData}
          mimeType ="audio/wav"
          /></div>
          {!this.state.record?

        <img onClick={this.startRecording} src={play_btn} className={styles['homeimg']}></img>
          
          
          :null}
            {this.state.record?

<img onClick={this.stopRecording} src={stop_btn} className={styles['homeimg']}></img>


:null}

        </div>
        </div>
        
       
        
        
      }
}
