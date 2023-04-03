import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';

// export const [showDashBoard, setShowDashboard] = useState(false);


const Context = createContext();

export const StateContext = ({ children }) => {
    const [displayDashboard, setDisplayDashboard] = useState(false)



    const [hardwareSets, setHardwareSets] = useState([]);
    // State remains on refresh... store in local storage
    useEffect(() => {
        const localHardwareSets = window.localStorage.getItem('hardwareSets');
        // console.log(localHardwareSets)
        if (localHardwareSets && localHardwareSets !== null && localHardwareSets !== '') {
            setHardwareSets(JSON.parse(localHardwareSets));
        }
    }, [],
    );
    useEffect(() => {
        if (hardwareSets !== []) {
            localStorage.setItem('hardwareSets', JSON.stringify(hardwareSets));
        }
    }, [hardwareSets])



    // User variables
    const [userProjects, setUserProjects] = useState(null);
    // State remains on refresh... store in local storage
    useEffect(() => {
        const localUserProjects = window.localStorage.getItem('userProjects');
        // console.log(localUserProjects)
        if (localUserProjects && localUserProjects !== null && localUserProjects !== '') {
            setUserProjects(JSON.parse(localUserProjects));
        }
    }, [],
    );
    useEffect(() => {
        if (userProjects !== null) {
            localStorage.setItem('userProjects', JSON.stringify(userProjects));
        }
    }, [userProjects])

    const [currentUser, setCurrentUser] = useState(null);
    // State remains on refresh... store in local storage
    useEffect(() => {
        const localCurrentUser = window.localStorage.getItem('currentUser');
        // console.log(localCurrentUser)
        if (localCurrentUser && localCurrentUser !== null && localCurrentUser !== '') {
            setCurrentUser(JSON.parse(localCurrentUser));
        }
    }, []);
    useEffect(() => {
        if (currentUser !== null) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }, [currentUser])

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    // State remains on refresh... store in local storage
    useEffect(() => {
        const localIsAuthenticated = window.localStorage.getItem('isAuthenticated');
        // console.log(localIsAuthenticated)
        if (localIsAuthenticated && localIsAuthenticated !== null && localIsAuthenticated !== '') {
            setIsAuthenticated(JSON.parse(localIsAuthenticated));
        }
    }, [],
    );

    useEffect(() => {
        if (isAuthenticated !== null) {
            localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        }
    }, [isAuthenticated])



    const onUser = (data) => {
        console.log('made it to state')
        setCurrentUser(data['user'])
        setIsAuthenticated(true)
        console.log('leaving state')
    }

    const checkAuthentication = () => {
        const localIsAuthenticated = window.localStorage.getItem('isAuthenticated');
        // console.log(localIsAuthenticated)
        if (localIsAuthenticated && localIsAuthenticated !== null && localIsAuthenticated !== '') {
            if (
                (localIsAuthenticated === false) ||
                (localIsAuthenticated === null)
            ) {
                location.replace('/')
            }
        }
    }

    const getUserUpdate = () => {
        const localCurrentUser = window.localStorage.getItem('currentUser');
        // console.log(localCurrentUser)
        if (localCurrentUser && localCurrentUser !== null && localCurrentUser !== '') {
            setCurrentUser(JSON.parse(localCurrentUser));
        }
    }

    const verifyAuthentication = () => {
        const storage = new Cookies();
        if ((!storage.get('user') || (storage.get('user') === 'None') || (storage.get('user') === {}))){
            return false;
        }
        return true;
    }

    return (
        <Context.Provider
            value={{
                displayDashboard, setDisplayDashboard,
                hardwareSets, setHardwareSets,
                userProjects, setUserProjects,
                currentUser, setCurrentUser,
                isAuthenticated, setIsAuthenticated,
                checkAuthentication, onUser, getUserUpdate,
                verifyAuthentication
            }}>
            {children}
        </Context.Provider>
    )
}


export const useStateContext = () => useContext(Context);