import React from  'react';
const { ipcRenderer } = window.require('electron');
const fs = require('fs')
const os = require('os')
const dir = `${os.homedir()}/Downloads/tests`

export  default class   Listt extends React.Component{
    constructor(){
        super();
        this.state = {
              isFilePicked:false,
              api_success : "",
              gotimage: null,
              gotwave: null,
              selectedFile: null,
              uploadedFile: null,
              files:[]
        }

    }

    
    render() {
       
        return <div>
            {
                this.state.files.map(e=>{
                    return <div>{e}</div>;
                })
                }
          </div>
        
       
        
        
      }
}
