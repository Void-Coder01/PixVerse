import { createContext, useState } from 'react';

export const AppContext = createContext(null);

const AppContextProvider = ({children}) => {

    const [isUserLoggedIn, setIsuserLoggedIn ] = useState(null);
    const [showLogin, setShowLogin ] = useState(false);

    const value = {
        isUserLoggedIn,
        setIsuserLoggedIn,
        showLogin,
        setShowLogin
    }


    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider