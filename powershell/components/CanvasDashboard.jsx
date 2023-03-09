import React from 'react'
import DashboardProject from './DashboardProject'

const CanvasDashboard = () => {


  return (
    <>
      <div className='canvasContainer noselect'>
        <div className='nonCanvasSection'>
          <h1 className='minimizeDashboard'>Minimize Dashboard</h1>
        </div>
        <div className='CanvasSection'>
          <h1 className='canvasHead'>Your Current <u>Projects</u></h1>
          <div className='dashProjects'>
            <DashboardProject ProjectName='Project Name' hw1qty='28' hw2qty='31'/>
            <DashboardProject ProjectName='Mongoose' hw1qty='29' hw2qty='21'/>
            <DashboardProject ProjectName='Circuitry' hw1qty='0' hw2qty='0'/>
            <DashboardProject ProjectName='Example Really Super Duper Long Name' hw1qty='1027' hw2qty='4801'/>
            <DashboardProject ProjectName='Home Gear' hw1qty='11' hw2qty='0'/>
            <DashboardProject ProjectName='Shell Supply' hw1qty='38' hw2qty='0'/>
          </div>
        </div>

      </div>
    </>
  )
}

export default CanvasDashboard