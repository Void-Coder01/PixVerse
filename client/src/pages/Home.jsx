import React from 'react';
import Header from '../components/Header'
import Steps from '../components/Steps';
import Description from '../components/Description';
import Testimonials from '../components/Testimonials';
import GenBtn from '../components/GenBtn';


const App = () => {
    return (
        <div>
            <Header/>
            <Steps/>
            <Description/>
            <Testimonials/>
            <GenBtn/>
        </div>
        
    )
}

export default App;