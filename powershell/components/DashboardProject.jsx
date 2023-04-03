import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';



// const DashboardProject = ({ ProjectName, hw1qty, hw2qty }) => {
const DashboardProject = ({ project: { _id, name, hardwareOut, creator, authorizedUsers, lastProjectUpdate } }) => {
    const store = new Cookies();
    const [user, setUser] = useState(() => {
        return store.get('user') || 'None'
    });
    // const DashboardProject = ({ project }) => {
    const [displayDetails, setDisplayDetails] = useState(false); // pressing each project will toggle it's visibility
    const cursorType = (displayDetails) ? 'zoom-out' : 'zoom-in';
    const onHoverId = () => {
        toast.info(`Press ID to copy to clipboard!`, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            pauseOnFocusLoss: false
        });
    }

    const aboutToNavigate = () => {
        toast.info(`Navigating to Projects`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            pauseOnFocusLoss: false
        });
        setTimeout(() => { location.replace('/Projects/Update') }, 3000)
    }

    const copyToClip = () => {
        navigator.clipboard.writeText(_id)
        toast.success(`Copied the ${name} ID to clipboard`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            pauseOnFocusLoss: false
        });
    }

    const leaveProject = () => {
        const send = {
            'userId': user['_id'],
            'projectId': _id
        }

            fetch('http://localhost:5000/leaveProject', { method: 'POST', body: JSON.stringify(send) }).then((response) => {
                response.json().then((data) => {
                    if(data['result'] !== 'success'){
                        toast.error(`${data['summary']}`, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            pauseOnFocusLoss: false
                        });
                        return;
                    }
                    toast.success(`Nice, leaving project`, {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        pauseOnFocusLoss: false
                    });

                    setTimeout(function() {location.reload()} , 5000)
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
            <div className='dashProjectContainer' id={`dashProjectContainer-${name}`} style={{ cursor: `${cursorType}` }}>
                <h1 className='name' style={{ textAlign: "center", padding: "5% 0%" }}
                    onClick={() => setDisplayDetails(!displayDetails)}
                    aria-controls={`projectDetails-${name}`}
                    aria-expanded={displayDetails}
                >
                    {name}
                </h1>
                {displayDetails &&
                    <>
                        {/* <hr className="dashLine"/> */}
                        <Fade right>
                            <div className="detailContainer" id={`projectDetails-${name}`} style={{ cursor: 'none' }}>
                                <p className='projectDetails projectIdDisplay' onClick={copyToClip} onMouseEnter={onHoverId}>The project id: <u style={{ color: 'red' }}>{_id}</u></p>
                                <p className='projectDetails lastUpdateDisplay'>Last Update on: {lastProjectUpdate}</p>
                                <Link href='/Hardware' onClick={aboutToNavigate} style={{ cursor: 'pointer' }}>
                                    {hardwareOut?.map((hwSet) => {
                                        return (
                                            <>
                                                {hwSet.qtyOut !== 0 &&
                                                    <p className='projectDetails'>{hwSet.hwName} -out- <u style={{ fontStyle: 'oblique', color: 'orange' }}>{hwSet.qtyOut}</u></p>
                                                }
                                            </>
                                        )
                                    })}
                                </Link>
                                <p className='projectDetails' style={{ color: 'crimson', cursor: 'pointer', textAlign: 'end', fontSize: '3vw' }} onClick={leaveProject}>Leave</p>
                            </div>
                        </Fade>
                    </>
                }
            </div >
        </>




        // <>
        //     <div className='dashProjectContainer' id={`dashProjectContainer-${ProjectName}`} style={{ cursor: `${cursorType}` }}>
        //         <h1 className='projectName' style={{ textAlign: "center", padding: "5% 0%" }}
        //             onClick={() => setDisplayDetails(!displayDetails)}
        //             aria-controls={`projectDetails-${ProjectName}`}
        //             aria-expanded={displayDetails}
        //         >
        //             {ProjectName}
        //         </h1>
        //         {displayDetails &&
        //             <>
        //                 {/* <hr className="dashLine"/> */}
        //                 <Fade right>
        //                     <Link href='/Hardware'>
        //                         <div className="detailContainer" id={`projectDetails-${ProjectName}`}>
        //                             <p className='projectDetails'>Hardware Set 1 x{hw1qty}</p>
        //                             <p className='projectDetails'>Hardware Set 2 x{hw2qty}</p>
        //                             <p className='projectDetails'>Hardware Set 3 x{hw2qty}</p>
        //                         </div>
        //                     </Link>
        //                 </Fade>
        //             </>
        //         }
        //     </div >
        // </>
    )
}

export default DashboardProject