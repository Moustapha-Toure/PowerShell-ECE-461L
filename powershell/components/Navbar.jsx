import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { TbBox } from 'react-icons/tb'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { CanvasDashboard } from './Components'


const Navbar = () => {
    const [showDashboard, setShowDashboard] = useState(false);


    return (
        <>
            <div className='navbarContainer' onClick={() => setShowDashboard(false)}>
                <div className='pshellNavLogo' id='pshellLogoIcon'>
                    <div className='navLink' id='homeLink'>
                        <Link href='/Home'>
                            <h1 id='webname'>PowerShell</h1>
                        </Link>
                    </div>
                </div>
                <div className='regNavLinks'>
                    <div className='hardwareLogo' id='hardwareIcon'>
                        <Link href='/Hardware' key='toHardware'>
                            <div className='navLink' id='hardwareLink'>
                                <div className='iconLogo' id='boxIcon'>
                                    <TbBox />
                                </div>
                                <h6 className='navbarDesc'>Hardware</h6>
                            </div>
                        </Link>
                    </div>
                    <div className='accountLogo' id='accountIcon' onMouseEnter={() => setShowDashboard(true)}>
                        <Link href='/Account' key='toAccount'>
                            <div className='navLink' id='accountLink'>
                                <div className='iconLogo' id='profileIcon'>
                                    <MdOutlineAccountCircle />
                                </div>
                                <h6 className='navbarDesc'>Account</h6>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
            {showDashboard && <CanvasDashboard />}
        </>
    )
}

export default Navbar