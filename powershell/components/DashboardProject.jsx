import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import Link from 'next/link';

const DashboardProject = ({ ProjectName, hw1qty, hw2qty }) => {
    const [displayDetails, setDisplayDetails] = useState(false); // pressing each project will toggle it's visibility
    // document.getElementById(`dashProjectContainer-${ProjectName}`).style.cursor = (displayDetails) ? 'zoom-out' : 'zoom-in';
    const cursorType = (displayDetails) ? 'zoom-out' : 'zoom-in';

    return (
        <div className='dashProjectContainer' id={`dashProjectContainer-${ProjectName}`} style={{ cursor: `${cursorType}`}}>
            <h1 className='projectName' style={{ textAlign: "center", padding: "5% 0%" }}
                onClick={() => setDisplayDetails(!displayDetails)}
                aria-controls={`projectDetails-${ProjectName}`}
                aria-expanded={displayDetails}
            >
                {ProjectName}
            </h1>
            {displayDetails &&
                <>
                    {/* <hr className="dashLine"/> */}
                    <Fade right>
                        <Link href='/Hardware'>
                            <div className="detailContainer" id={`projectDetails-${ProjectName}`}>
                                <p className='projectDetails'>Hardware Set 1 x{hw1qty}</p>
                                <p className='projectDetails'>Hardware Set 2 x{hw2qty}</p>
                                <p className='projectDetails'>Hardware Set 3 x{hw2qty}</p>
                            </div>
                        </Link>
                    </Fade>
                </>
            }
        </div >
    )
}

{/* <div className='dashProjectContainer'>
    <h1 className='projectName' >{ProjectName}</h1>
    <p className='projectDetails'>Hardware Set 1 x{hw1qty}</p>
    <p className='projectDetails'>Hardware Set 2 x{hw2qty}</p>
</div > */}

export default DashboardProject