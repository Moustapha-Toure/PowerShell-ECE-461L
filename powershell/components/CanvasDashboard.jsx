import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { DashboardProject } from './Components'
import { useStateContext } from '@/context/StateContext'


export const Wrenches = new URL('../Assets/Images/Hardware/Wrenches.jpg', import.meta.url);
export const Tools = new URL('../Assets/Images/Hardware/Power-tools.jpg', import.meta.url);

const CanvasDashboard = () => {
  const { setDisplayDashboard, verifyAuthentication } = useStateContext();
  useEffect(() => { verifyAuthentication() })
  const store = new Cookies();
  const [fetched, setFetched] = useState(false)
  const [user, setUser] = useState(() => {
    return store.get('user') || 'None'
  });

  const [projects, setProjects] = useState(() => {
    return store.get('userProjects') || []
  });

  useEffect(() => {
    if (!(user) && (user !== undefined) && (user !== 'None')) {
      return
    }
    if(fetched){
      return
    }
    fetch('http://localhost:5000/getProjects', { method: 'POST', body: JSON.stringify(user) }).then((response) => {
      response.json().then((data) => {
        if (data['result'] != 'success') {
          location.replace('/')
        }
        store.set('userProjects', data['projects'], { path: '/' });
        const curUser = store.get('user')
        curUser['projects'] = data['projects']
        store.set('user', curUser, { path: '/'})
        setProjects(data['projects']);
        setFetched(true)
      })
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.status)
        console.log(error.headers)
      }
    })

  }, [projects]);
  return (
    <>
      <div className='canvasContainer noselect'>
        <div className='nonCanvasSection' onClick={() => setDisplayDashboard(false)}>
          <h1 className='minimizeDashboard'>Minimize Dashboard</h1>
        </div>
        {(projects !== undefined) && (projects !== null) && (projects) && projects.length > 0 &&
          <div className='CanvasSection yesProjectSection'>
            <h1 className='canvasHead'>Your Current <u>Projects</u></h1>
            <div className='dashProjects'>
              {(projects !== undefined) && (projects !== null) && (projects) && projects.length > 0 && projects?.map((project) => {
                return (
                  <>
                    <DashboardProject project={project} />
                  </>
                )
              })}
            </div>
          </div>
        }
        {(projects === undefined) || (projects === null) || !(projects) || projects.length === 0 &&
          <div className='CanvasSection noProjectSection'>
            <h1 className='canvasHead' style={{ color: 'wheat'}}>You have <u>NO</u> Projects</h1>
            <div className='fixThat'>
              <p id='fixTittle'>Aye yay yayeee... Let's fix that!</p>
              <p id='fixTxt' onClick={() => location.replace('/Projects/Create')}>Create a new Project</p>
              <p id='fixTxt' onClick={() => location.replace('/Projects/Join')}>...Or join Existing Project</p>
            </div>
          </div>
        }

      </div>
    </>
  )
}

export default CanvasDashboard