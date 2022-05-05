import React from  'react';
import mentor from 'mentor.jpg';
import pk from 'pk.jpg';
import pk1 from 'pk1.jpg';
import styles from 'components/App.module.scss';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';

const { ipcRenderer } = window.require('electron');
const fs = window.require("fs");
const path = window.require("path")
export  default class   List extends React.Component{
    constructor(){
        super();
  

        var fn = fs.readdirSync("/");
        fn.forEach(file=>{console.log(file);});
        this.state = {

             
        }

    }

    
    render() {
       
        return <div style={{height:"100%",width:"100%",display:"flex"}} >
            <div style={{height:"100%",width:"50%",backgroundColor:"white",padding:"20px"}}>
            <img src={pk} style={{width:"100%",borderRadius:"15px",margin:"0",boxShadow:"0px 0px 1px 4px #f0f0f0"}}></img>
            <img src={pk1} style={{width:"100%",borderRadius:"15px",margin:"0",boxShadow:"0px 0px 1px 4px #f0f0f0"}}></img>
            
            </div>
            <div style={{height:"100%",width:"50%",backgroundColor:"white",float:"right"}}>
            
            <h1 style={{fontWeight:"bold",fontFamily:"Gill Sans",fontSize:"45px",color:"#1b1778"}}>Diagnose Parkinson's Disorder By Analysing Speech</h1>
            <p>Parkinson's disease (PD) can affect speech in several ways. Many people with PD speak quietly and in one tone; 
            they don't convey much emotion. Sometimes speech sounds breathy or 
            hoarse. People with Parkinson's might slur words, mumble or trail off
             at the end of a sentence. Most people talk slowly, but some speak 
             rapidly, even stuttering or stammering.
             </p>
            
             <Link to="/record"><Button variant="contained" style={{marginRight:"10px"}} onClick={() => {console.log(this.props.setValue);this.props.setValue(1);}}>Record Audio</Button></Link>
             <Link to="/upload"><Button variant="contained" style={{marginRight:"10px"}} onClick={() => {this.props.setValue(2)}}>Upload Audio & Analyze</Button></Link>
            </div>
            {/* Hello im one of those creators. Anvay Karmore. The other one is Kranthi Kumar and our beloved mentor is Hasvitha Nadimpalli. */}

            {/* <img src={pk} style={{width:"50%",borderRadius:"15px"}}></img> */}
          </div>
        
       
        
        
      }
}
