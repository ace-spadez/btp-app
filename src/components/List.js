import React from  'react';
import mentor from 'mentor.jpg';

const { ipcRenderer } = window.require('electron');


export  default class   List extends React.Component{
    constructor(){
        super();
        this.state = {
             
        }

    }

    
    render() {
       
        return <div >
            {/* Hello im one of those creators. Anvay Karmore. The other one is Kranthi Kumar and our beloved mentor is Hasvitha Nadimpalli. */}

            {/* <img src={mentor} style={{width:"100px",height:"100px",borderRadius:"50%"}}></img> */}
          </div>
        
       
        
        
      }
}
