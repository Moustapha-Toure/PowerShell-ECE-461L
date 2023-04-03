import React from 'react'
import Link from 'next/link'
import { FaRegCopyright } from 'react-icons/fa'
import { useStateContext } from '@/context/StateContext'


const Footer = () => {
    const { setDisplayDashboard } = useStateContext();
    return (
        <div className='footerContainer noselect' id='powershellFooter'>

            <div className='flexedFooter'>
                <div className='siteMapContainer' id='siteMap'>
                    <h1 className='siteDescription' id='siteMapText'>
                        SITE MAP
                    </h1>
                    <div className='siteItemContainer'>
                        <div className='siteItems' id='toHomePage'>
                            <Link href='/Home'>
                                <p className='siteMapLabel'>Home Page</p>
                            </Link>
                        </div>
                        <div className='siteItems' id='toUpdateProjects'>
                            <Link href='/Projects/Update'>
                                <p className='siteMapLabel'>Update a Project</p>
                            </Link>
                        </div>
                        <div className='siteItems' id='toCreateProjects'>
                            <Link href='/Projects/Create'>
                                <p className='siteMapLabel'>Create New Project</p>
                            </Link>
                        </div>
                        <div className='siteItems' id='toJoinProjects'>
                            <Link href='/Projects/Join'>
                                <p className='siteMapLabel'>Join Existing Project</p>
                            </Link>
                        </div>
                        <div className='siteItems' id='toProjectDetails'>
                            <p className='siteMapLabel' onClick={() => { setDisplayDashboard(true) }}>Project Details</p>
                        </div>
                        <div className='siteItems' id='toUserAccount'>
                            <Link href='/Account'>
                                <p className='siteMapLabel'>View Account</p>
                            </Link>
                        </div>
                        <div className='siteItems' id='toHardwareOverview'>
                            <Link href='/Hardware'>
                                <p className='siteMapLabel'>Hardware Count</p>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='teamContainer' id='theTeam'>
                    <h1 className='siteDescription' id='teamDescriptionText'>SHELL-TEAM</h1>
                    <div className='shellTeamMembers'>
                        <Link href='https://docs.google.com/document/d/1g7lu6oLj1zgdVEreWLX_8UjbJ6uPzyDRTO68TcLL0RM/edit?usp=sharing' target='_blank' className='toRez'>
                            <p className='shellMembers'>Moustapha Tour&eacute;</p>
                        </Link>
                        <p className='shellMembers'>Ethan Blumenfeld</p>
                        <p className='shellMembers'>Paul Clauss</p>
                        <p className='shellMembers'>Rifah Tasnim</p>
                        <p className='shellMembers'>Justin Ye</p>
                    </div>
                </div>

            </div>

            <div className='copyrightContainer'>
                <p className='copyrightText'>ECE 461L PowerShell</p>
                <FaRegCopyright className='copyrightText' id='copyrightIcon' style={{ color: 'white' }} />
                <p className='copyrightText' id='crSpring'>Spring 2023</p>
            </div>

        </div>
    )
}

export default Footer