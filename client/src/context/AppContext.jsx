import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext(null);

const AppContextProvider = ({children}) => {

    const [isUserLoggedIn, setIsuserLoggedIn ] = useState(null);
    const [showLogin, setShowLogin ] = useState(false);
    const [userName, setUserName] = useState('');
    const [token , setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit] = useState(false);

    const navigate = useNavigate();

    const backendurl = import.meta.env.VITE_BACKEND_URL
    const loadCreditsData = async () => {
        try {
            const {data} = await axios.get(backendurl + '/api/user/credits',{
                headers : {
                    token
                }
            })

            if(data.success){
                setCredit(data.credits)
                setIsuserLoggedIn(data.user);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setIsuserLoggedIn(null);
    }

    useEffect(()=> {
        if(token){
            loadCreditsData()
        }
    },[token])


    const generateImage = async(prompt) => {
        try{
            const {data} = await axios.post(backendurl+"/api/image/generate-image",{prompt}, {headers : {token}})
            console.log(data);

            await loadCreditsData()
            
            if(data.credits === 0){
                toast.error("You don't have enough credit points")
                navigate('/buy')
                return;
            }

            if(data.success){
                return data.resultImage
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log("API error:", error);
            toast.error(error.message)
        }
    }

    const value = {
        isUserLoggedIn,
        setIsuserLoggedIn,
        showLogin,
        setShowLogin,
        backendurl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditsData,
        logout,
        generateImage
    }


    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider