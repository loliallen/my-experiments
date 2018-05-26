import React from 'react'
import './style.css'

const HomePage = (class HomePage extends React.Component{
    render() {
        return<div className = 'main'>
            <div className = 'addme_button' onClick={() =>{
                
            }}> </div>
            <div className = 'paralax header'>ECO trouble</div>
            <div className = 'paralax' style={{height: 800 }}></div>
            <div className = 'content'>My experiments</div>
            <div className = 'paralax' style={{height: 120 }}></div>
            <div className = 'content '>Это была моя первая попытка сделать паралакс </div>
            <div className = 'paralax'></div>
          </div>
      }
})