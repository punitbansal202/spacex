import React from 'react';
import LaunchProgram from './containers/LaunchProgram/LaunchProgram'

function App(props) {

        return  <LaunchProgram query={"bangalore"} history={props.history}/>
        
}

export default App
