import React from 'react'
import Link from 'next/link'
import { TbBox } from 'react-icons/tb'
import { MdOutlineAccountCircle } from 'react-icons/Md'

const Navbar = () => {
    return (
        <div className='navbarContainer'>
            <div className='pshellNavLogo' id='pshellLogoIcon'>
                <Link href='/Home'>
                    <div className='navLink' id='homeLink'>
                        <h1 id='webname'>PowerShell</h1>
                    </div>
                </Link>
            </div>
            <div className='regNavLinks'>
                <div className='hardwareLogo' id='hardwareIcon'>
                    <Link href='/'>
                        <div className='navLink' id='hardwareLink'>
                            <div className='iconLogo' id='boxIcon'>
                                <TbBox />
                            </div>
                            <h6 className='navbarDesc'>Hardware</h6>
                        </div>
                    </Link>
                </div>
                <div className='accountLogo' id='accountIcon'>
                    <Link href='/Account'>
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
    )
}

export default Navbar