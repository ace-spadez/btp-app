import React, { Fragment, useEffect, useState } from 'react';
import { get } from 'utils/requests';

import { Counter } from 'components/counter/Counter';
import Titlebar from 'components/titlebar/Titlebar';

import logo192 from 'iiit.png';
import homeimg from 'home.png';
import micimg from 'mic.png';
import uploadimg from 'upload.png';
import clientimg from 'clients.png';
import gear from 'gear.png';
import wavelogo from 'wavelogo.png';
import styles from 'components/App.module.scss';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import UploadAudio from './UploadAudio';
import Listt from './List';

function App() {
  const [value, setValue] = useState(0);
  useEffect(() => {

    /**
     * Example call to Flask
     * @see /src/utils/requests.js
     * @see /app.py
     */
    setTimeout(() => get(
      'example', // Route
      (response) => alert(response), // Response callback
      (error) => console.error(error) // Error callback
    ), 3000);
  }, []);

  return (
    <Fragment  className={styles.all}>
          <BrowserRouter>

      <Titlebar />  
      <div className={styles.topbar}>
  
        <img src={ logo192 } className={ styles['app-logo'] } alt="logo" />
        <img src={ wavelogo } style={{float:"right",marginRight:"10px"}} className={ styles['app-logo'] } alt="logo" />
        <h3 style={{float:"right",padding:"40px 0px 0 0",color:"#557180"}}> Speech Processing Lab</h3>
      </div  >
      <div className={styles.mainarea} >
        <div className={styles.sidebar}>
        <div className={styles.spacer1}></div>
        <Link to="/"><div onClick={()=>setValue(0)} className={styles.navbaritem}><div className={styles.notch} style={value!==0?{display:"none"}:{}}></div><img src={ homeimg } className={ styles['homeimg'] } alt="logo" /></div></Link>
          <Link to="/record"><div onClick={()=>setValue(1)} className={styles.navbaritem}><div className={styles.notch} style={value!==1?{display:"none"}:{}}></div><img src={ micimg } className={ styles['homeimg'] } alt="logo" /></div></Link>
          <Link to="/upload"> <div onClick={()=>setValue(2)} className={styles.navbaritem}><div className={styles.notch} style={value!==2?{display:"none"}:{}}></div><img src={ uploadimg } className={ styles['homeimg'] } alt="logo" /></div></Link>
          {/* <div onClick={()=>setValue(3)} className={styles.navbaritem}><div className={styles.notch} style={value!==3?{display:"none"}:{}}></div><img src={ clientimg} className={ styles['homeimg'] } alt="logo" /></div> */}
          {/* <div onClick={()=>setValue(4)} className={styles.navbaritem}><div className={styles.notch} style={value!==4?{display:"none"}:{}}></div><img src={ gear} className={ styles['homeimg'] } alt="logo" /></div> */}
          <div className={styles.spacer}></div>
        </div>
        <div  className={styles.body}>

          <Routes>
      <Route path="/" element={<Listt setValue={setValue}/>}/>
      <Route path="/record" element={<Home/>} />
      <Route path="/upload"  element={<UploadAudio/>}/>
    </Routes>
          

        {/* <img src={ logo192 } className={ styles['app-logo'] } alt="logo" /> */}
        </div>
      </div>
          </BrowserRouter>

    </Fragment>
  );
}

export default App;
