import React from  'react';
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

// export default function Home() {
//     return (
//       <main style={{ padding: "1rem 0" }}>
//         <h2>Expenses</h2>
//       </main>
//     );
//   }
export  default class   Home extends React.Component{
    constructor(){
        super();
        this.state = {
            audioDetails: {
                url: null,
                blob: null,
                chunks: null,
                duration: {
                  h: 0,
                  m: 0,
                  s: 0
                }
              }
        }

    }
    
    handleAudioStop(data){
        console.log(data)
        this.setState({ audioDetails: data });
    }
    
    handleAudioUpload(file) {
        console.log(file);
    }
    
    handleCountDown(data) {
        console.log(data);
    };
    
    handleReset() {
        const reset = {
          url: null,
          blob: null,
          chunks: null,
          duration: {
            h: 0,
            m: 0,
            s: 0
          }
        };
        this.setState({ audioDetails: reset });
      }
    
    render() {
       
        return <Recorder
            record={true}
            title={"New recording"}
            audioURL={this.state.audioDetails.url}
            showUIAudio
            handleAudioStop={data => this.handleAudioStop(data)}
            handleAudioUpload={data => this.handleAudioUpload(data)}
            handleCountDown={data => this.handleCountDown(data)}
            handleReset={() => this.handleReset()}
            mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
        />
        
        
        return <h1>Hello, {this.props.name}</h1>;
      }
}
// export function Recording() {
//     return (
//       <main style={{ padding: "1rem 0" }}>
//         <h2>Expenses</h2>
//       </main>
//     );
//   }