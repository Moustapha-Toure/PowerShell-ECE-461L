import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { Navbar, HardwareDisplay } from '@/components/Components';
import styles from '@/styles/Update.module.css'
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { useStateContext } from '@/context/StateContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Create() {
    const { verifyAuthentication, setDisplayDashboard } = useStateContext();
    useEffect(() => { if (!verifyAuthentication()) { location.replace('/') } })
    const [hardwareSets, setHardwareSets] = useState([]);
    const [fetched, setFetched] = useState(false)
    const [hardwareUpdates, setHardwareUpdates] = useState([]);
    const [currentProject, setCurrentProject] = useState({});
    const store = new Cookies();
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
        if (fetched) {
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
                store.set('user', curUser, { path: '/' })
                setProjects(data['projects']);
                if (data['projects'].length > 0) {
                    setCurrentProject(data['projects'][0]);
                }
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

    useEffect(() => {
        if (!fetched) {
            fetch('http://localhost:5000/getHardwareSets', { method: 'POST' }).then((response) => {
                response.json().then((data) => {
                    let theSets = []
                    const allSets = data['hardwareSets']
                    for (let i in allSets) {
                        const set = {
                            'newQty': 0,
                            'changed': false,
                            'hw': allSets[i]['_id'],
                            'hardwareSet': allSets[i]
                        }
                        theSets.push(set)
                    }
                    setHardwareUpdates(theSets);
                    setHardwareSets(data['hardwareSets'])
                    if (projects !== []) {
                    }
                    setFetched(true)
                })
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.status)
                    console.log(error.headers)
                }
            })
        }
    })

    const selectProject = (event) => {
        const projID = event.target.value.replace('select-', '')
        for (let i in projects) {
            if (projects[i]['_id'] === projID) {
                setCurrentProject(projects[i])
            }
        }
    }
    const updateValue = (event, defVal) => {
        const id = event.currentTarget.id.replace("updateQty-", "");
        let value = event.currentTarget.value;
        if (value === '') {
            value = 0;
        }
        let hardware_Sets = hardwareUpdates;
        for (let i in hardware_Sets) {
            if (hardware_Sets[i]['hw'] === id) {
                const cap = Number(hardware_Sets[i]['hardwareSet']['Availability']) + Number(defVal)
                if (value === cap) {
                    toast.warning(`Only have ${hardware_Sets[i]['hardwareSet']['Availability']} Available for ${hardware_Sets[i]['hardwareSet']['name']}. You also had ${defVal} already out.`, {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "",
                        pauseOnFocusLoss: false
                    });
                }
                if (value > cap) {
                    hardware_Sets[i]['newQty'] = cap;
                    event.currentTarget.value = hardware_Sets[i]['hardwareSet']['Availability']
                    break;
                }
                hardware_Sets[i]['changed'] = true;
                hardware_Sets[i]['newQty'] = value;
                break;
            }
        }
        setHardwareUpdates(hardware_Sets);
    }

    const showInfo = () => {

        toast.info(`To checkin hardware, simply request less than you had checked out. We will checkin the difference`, {
            position: "top-center",
            autoClose: 20000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            pauseOnFocusLoss: false
        });
        toast.info(`To checkout hardware, simply request more than you had checked out. We will checkout the difference`, {
            position: "top-center",
            autoClose: 20000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            pauseOnFocusLoss: false
        });
        toast.info(`First step, from the dropdown, choose which project to update from the dropdown. The values will update according to choosen project.`, {
            position: "top-center",
            autoClose: 15000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            pauseOnFocusLoss: false
        });
    }

    const updateProject = () => {
        const projectID = currentProject['_id']
        let hwUpdates = hardwareUpdates;

        for (let i in hwUpdates) {
            if (hwUpdates[i]['changed'] === false) {
                for (let j in currentProject['hardwareOut']) {
                    if (currentProject['hardwareOut'][j]['hardwareSet'] === hwUpdates[i]['hw']) {
                        hwUpdates[i]['newQty'] = currentProject['hardwareOut'][j]['qtyOut']
                    }
                }
            }
        }

        const send = {
            'userId': user['_id'],
            'projectId': projectID,
            'hardwareChanges': hwUpdates
        }

        fetch('http://localhost:5000/updateProject', { method: 'POST', body: JSON.stringify(send) }).then((response) => {
            response.json().then((data) => {
                if (data['result'] !== 'success') {
                    toast.error(`${data['messages']}`, {
                        position: "bottom-left",
                        autoClose: 15000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        pauseOnFocusLoss: false
                    });
                    return;
                }
                const messages = data['messages']
                for (let i in messages) {
                    toast.info(`For set '${messages[i]['hw']}': ${messages[i]['msg']}`, {
                        position: "bottom-left",
                        autoClose: 15000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        pauseOnFocusLoss: false
                    });
                }
                setFetched(false)
                setDisplayDashboard(true)
                setTimeout(function () { location.reload() }, 2000)
            }
            )
        })
    }
    return (
        <>
            <Head>
                <title>PowerShell</title>
                <meta name="description" content="The ECE-461L SP23 PowerShellTeam Site" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.updateBody}, noselect`} id='update-page-body'>
                <div className='navbar' id='accountNav'>
                    <Navbar />
                </div>
                <div className={styles.updateContainer}>
                    <h1 className={styles.updateTitle}>Update Existing Projects</h1>
                    <div className={styles.updateContent}>
                        <div className={styles.updateHalf}>
                            <h1 style={{ color: 'white', fontSize: '2vw', textAlign: 'center', textDecorationLine: 'underline', fontStyle: 'italic' }}>Choose Project</h1>
                            <p style={{ color: 'white', fontSize: '1vw', cursor: 'help' }} onClick={showInfo} >Need help?</p>
                            <select className={styles.selectInput} name='selectoring' id='selTest' onChange={selectProject}>
                                {projects && projects.length > 0 && projects !== undefined && projects?.map((project) => {
                                    return (
                                        <>
                                            <option className={styles.selectOption} value={`select-${project['_id']}`}>{project['name']}</option>
                                        </>
                                    )
                                })}
                            </select>
                            {hardwareSets && hardwareSets.length > 0 && hardwareSets !== undefined && hardwareSets?.map((hardware) => {
                                let currOut = 0
                                for (let i in currentProject['hardwareOut']) {
                                    if (currentProject['hardwareOut'][i]['hardwareSet'] === hardware['_id']) {
                                        currOut = currentProject['hardwareOut'][i]['qtyOut'];
                                    }
                                }
                                return (
                                    <>
                                        <div className={styles.updateDiv}>
                                            <h1 className={styles.updateName}>{hardware.name}</h1>
                                            <h1 className={styles.ogOut}>Project Currently has: <b><i><u>{currOut}</u></i></b></h1>
                                            <input
                                                id={`updateQty-${hardware['_id']}`}
                                                className={styles.inputHw}
                                                type='number'
                                                max={currOut + hardware['Availability']}
                                                min='0'
                                                // defaultValue={currOut}
                                                onChange={(e) => {updateValue(e, currOut)}}
                                            />
                                        </div>
                                    </>
                                )
                            }
                            )
                            }
                        </div>

                        <div className={styles.hardwareHalf}>
                            <h1 style={{ color: 'white', fontSize: '2vw', textAlign: 'center' }}>View Availability</h1>
                            {hardwareSets.length >= 1 && hardwareSets.map((hardwareSet) =>
                                <>
                                    <div className={styles.setDiv}>
                                        <HardwareDisplay set={hardwareSet} />
                                    </div>
                                </>
                            )}

                            {hardwareSets.length === 0 &&
                                <>
                                    <p style={{ color: 'whitesmoke', fontSize: '4vw', textAlign: 'center' }}>No Sets Yet</p>
                                </>
                            }
                        </div>
                        <div className={styles.submitButton} onClick={updateProject}>
                            <p className={styles.submitTxt}>Update</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}