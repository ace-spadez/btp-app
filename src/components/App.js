import React, { Fragment, useEffect, useState } from 'react';
import { get } from 'utils/requests';

import { Counter } from 'components/counter/Counter';
import Titlebar from 'components/titlebar/Titlebar';

import logo192 from 'logo192.png';
import homeimg from 'home.png';
import micimg from 'mic.png';
import uploadimg from 'upload.png';
import clientimg from 'clients.png';
import gear from 'gear.png';
import styles from 'components/App.module.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';

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
      <Titlebar />
      <div className={styles.topbar}>
  
        <img src={ logo192 } className={ styles['app-logo'] } alt="logo" />
       


      </div  >
      <div className={styles.mainarea} >
        <div className={styles.sidebar}>
        <div className={styles.spacer1}></div>
          <div onClick={()=>setValue(0)} className={styles.navbaritem}><div className={styles.notch} style={value!==0?{display:"none"}:{}}></div><img src={ homeimg } className={ styles['homeimg'] } alt="logo" /></div>
          <div onClick={()=>setValue(1)} className={styles.navbaritem}><div className={styles.notch} style={value!==1?{display:"none"}:{}}></div><img src={ micimg } className={ styles['homeimg'] } alt="logo" /></div>
          <div onClick={()=>setValue(2)} className={styles.navbaritem}><div className={styles.notch} style={value!==2?{display:"none"}:{}}></div><img src={ uploadimg } className={ styles['homeimg'] } alt="logo" /></div>
          <div onClick={()=>setValue(3)} className={styles.navbaritem}><div className={styles.notch} style={value!==3?{display:"none"}:{}}></div><img src={ clientimg} className={ styles['homeimg'] } alt="logo" /></div>
          <div onClick={()=>setValue(4)} className={styles.navbaritem}><div className={styles.notch} style={value!==4?{display:"none"}:{}}></div><img src={ gear} className={ styles['homeimg'] } alt="logo" /></div>
          <div className={styles.spacer}></div>
        </div>
        <div  className={styles.body}>

          <BrowserRouter>
          <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="record"  />
      <Route path="upload"  />
    </Routes>
          
          </BrowserRouter>

        </div>
      </div>
      {/* <div className={ styles.app }>
        <header className={ styles['app-header'] }>
          <img src={ logo } className={ styles['app-logo'] } alt="logo" />
          <Counter />
          <p>
            Edit
            {' '}
            <code>src/App.js</code>
            {' '}
            and save to reload.
          </p>
          <span>
            <span>Learn </span>
            <a
              className={ styles['app-link'] }
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            <span>, </span>
            <a
              className={ styles['app-link'] }
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux
            </a>
            <span>, </span>
            <a
              className={ styles['app-link'] }
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux Toolkit
            </a>
            ,
            <span> and </span>
            <a
              className={ styles['app-link'] }
              href="https://react-redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Redux
            </a>
          </span>
        </header>
      </div> */}
    </Fragment>
  );
}

export default App;
