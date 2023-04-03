import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { Navbar, HardwareDisplay } from '@/components/Components';
import styles from '@/styles/Create.module.css'
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { useStateContext } from '@/context/StateContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Create() {
    const { verifyAuthentication, setDisplayDashboard } = useStateContext();
    const store = new Cookies();
    const [user, setUser] = useState(() => {
        return store.get('user') || 'None'
    });
    const [projectName, setProjectName] = useState("")
    const [alerted, setAlerted] = useState(0)
    useEffect(() => { if (!verifyAuthentication()) { location.replace('/') } })

    const [hardwareSets, setHardwareSets] = useState([]);
    const [fetched, setFetched] = useState(false)
    const [hardwareUpdates, setHardwareUpdates] = useState([]);

    const updateValue = (event) => {
        const id = event.currentTarget.id.replace("qtyRequested-", "");
        let value = event.currentTarget.value;
        if (value === '') {
            value = 0;
        }
        let hardware_Sets = hardwareUpdates;

        for (let i in hardware_Sets) {
            if (hardware_Sets[i]['hw'] === id) {
                if (value > hardware_Sets[i]['hardwareSet']['Availability']) {
                    hardware_Sets[i]['request'] = hardware_Sets[i]['hardwareSet']['Availability'];
                    toast.warning(`Only have ${hardware_Sets[i]['hardwareSet']['Availability']} Available for ${hardware_Sets[i]['hardwareSet']['name']}`, {
                        position: "top-center",
                        autoClose: 8000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "",
                        pauseOnFocusLoss: false
                    });
                    event.currentTarget.value = hardware_Sets[i]['hardwareSet']['Availability']
                    break;
                }
                hardware_Sets[i]['request'] = value;
                break;
            }
        }
        setHardwareUpdates(hardware_Sets);
    }

    useEffect(() => {
        if (!fetched) {
            fetch('http://localhost:5000/getHardwareSets', { method: 'POST' }).then((response) => {
                response.json().then((data) => {
                    let theSets = []
                    const allSets = data['hardwareSets']
                    for (let i in allSets) {
                        const set = {
                            'request': 0,
                            'hw': allSets[i]['_id'],
                            'hardwareSet': allSets[i]
                        }
                        theSets.push(set)
                    }
                    setHardwareSets(allSets);
                    setHardwareUpdates(theSets);
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
    const ensureValid = (event) => {
        const key = event.key
        if (key === '-') {
            toast.warning(`You can't request negative hardware`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "",
                pauseOnFocusLoss: false
            });
            event.currentTarget.value = event.currentTarget.value.replace(/[-]/g, "")
        }
    }

    const infoAler = () => {
        // Simply alert 2 times is enough
        if(alerted > 2){
            return;
        }
        setAlerted(alerted+1);


        toast.info(`Otherwise, you can checkout more later`, {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "",
            pauseOnFocusLoss: false
        });
        toast.info(`Enter quantity to checkout`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "",
            pauseOnFocusLoss: false
        });
    }

    const createProject = (event) => {
        event.preventDefault();
        const updates = hardwareUpdates
        const send = {
            'user': user,
            'projectName': event.target.projectName.value,
            'hardwareChanges': updates
        }

        fetch('http://localhost:5000/createProject', { method: 'POST', body: JSON.stringify(send) }).then((response) => {
            response.json().then((data) => {
                let curUser = store.get('user')
                curUser['projects']= data['userUpdate']
                store.set('user', curUser)
                store.set('userProjects', data['userUpdate'])
                setDisplayDashboard(true);
                const details = data['details']
                for (let i in details){
                    if(details[i]['wasSuccessful' === 'true']){
                        toast.success(`${details[i]['error']}`, {
                            position: "top-left",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "",
                            pauseOnFocusLoss: false
                        });
                    }
                    else{
                        toast.error(`${details[i]['error']}`, {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "",
                            pauseOnFocusLoss: false
                        });
                    }
                }
            })
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.status)
                console.log(error.headers)
            }
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
            <main className={`${styles.accountBody}, ${styles.noselect}`} id='create-page-body'>
                <div className='navbar' id='accountNav'>
                    <Navbar />
                </div>
                <div id={styles.createContainer} className={`noselect coverPage`}>
                    <h1 id={styles.createTitle}>Create New Project</h1>
                    <Link href='/Projects/Join' className={styles.linkToOther} id={styles.toJoinExisting}>
                        <div className={styles.toJoinExisting}>
                            <p className={styles.toOther}>Join Existing</p>
                        </div>
                    </Link>
                    <Link href='/' className={styles.linkToOther} id={styles.toUpdateExisting}>
                        <div className={styles.toUpdateExisting}>
                            <p className={styles.toOther}>Update Existing Project</p>
                        </div>
                    </Link>
                    <form className={styles.createForm} onSubmit={createProject} >
                        <input
                            required
                            id="projectName"
                            className={styles.nameInput}
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Enter Project Name"
                        />
                        <div className={styles.setsDiv}>
                            {hardwareUpdates.length >= 1 && hardwareUpdates.map((hardwareSet) =>
                                <>
                                    <div className={styles.setInputContainer}>
                                        <HardwareDisplay set={hardwareSet['hardwareSet']} />
                                        <input
                                            id={`qtyRequested-${hardwareSet['hw']}`}
                                            className={styles.requestInput}
                                            name='Request Amount'
                                            type='number'
                                            min={0}
                                            max={hardwareSet['hardwareSet']['Availability']}
                                            onChange={(e) => updateValue(e)}
                                            onKeyUp={ensureValid}
                                            placeholder="0"
                                            onMouseEnter={infoAler}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <input
                            type="submit"
                            value="Create"
                            className={styles.createButton}
                        />
                    </form>
                </div>
            </main >
        </>
    )
}