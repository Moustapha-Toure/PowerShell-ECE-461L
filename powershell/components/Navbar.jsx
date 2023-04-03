import React, { useState, useEffect } from 'react'
import { CanvasDashboard } from './Components'
import { useStateContext } from '@/context/StateContext'
import Link from 'next/link'
import { TbBox } from 'react-icons/tb'
import { SiHandshake } from 'react-icons/si'
import { MdOutlineAccountCircle, MdOutlineCreateNewFolder } from 'react-icons/md'


const Navbar = () => {
    // const [showDashboard, setShowDashboard] = useState(false);
    const { displayDashboard, setDisplayDashboard, hardwareSets, setHardwareSets } = useStateContext();


    return (
        <>
            <div className='navbarContainer' onClick={() => setDisplayDashboard(false)}>
                <div className='pshellNavLogo' id='pshellLogoIcon'>
                    <div className='navLink' id='homeLink'>
                        <Link href='/Home'>
                            <h1 id='webname'>PowerShell</h1>
                        </Link>
                    </div>
                </div>
                <div className='regNavLinks'>
                    <div className='regLogo' id='hardwareIcon' key='toHardware'>
                        <Link href='/Hardware' key='toHardwareLink'>
                            <div className='navLink' id='hardwareLink'>
                                <div className='iconLogo' id='boxIcon'>
                                    <TbBox />
                                </div>
                                <h6 className='navbarDesc'>Hardware</h6>
                            </div>
                        </Link>
                    </div>
                    {displayDashboard &&
                        <>
                            <div className='regLogo' id='hardwareIcon' key='toJoin'>
                                <Link href='/Projects/Join' key='toJoinLink'>
                                    <div className='navLink' id='hardwareLink'>
                                        <div className='iconLogo' id='boxIcon'>
                                            <SiHandshake />
                                        </div>
                                        <h6 className='navbarDesc'>Join</h6>
                                    </div>
                                </Link>
                            </div>
                            <div className='regLogo' id='hardwareIcon' key='toCreate'>
                                <Link href='/Projects/Create' key='toCreateLink'>
                                    <div className='navLink' id='hardwareLink'>
                                        <div className='iconLogo' id='createIcon'>
                                            <MdOutlineCreateNewFolder />
                                        </div>
                                        <h6 className='navbarDesc'>Create</h6>
                                    </div>
                                </Link>
                            </div>
                        </>
                    }
                    <div className='regLogo' id='accountIcon' onMouseEnter={() => setDisplayDashboard(true)} key='toAccount'>
                        <Link href='/Account' key='toAccountLink'>
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
            {displayDashboard && <CanvasDashboard />}
        </>
    )
}

export default Navbar