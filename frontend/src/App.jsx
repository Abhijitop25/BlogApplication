import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component.jsx";
import UserAuth from "./pages/userAuthForm.page.jsx";
import SignIn from "./pages/login.jsx";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session.jsx";
import EditorPage from "./pages/editor.pages.jsx";
import Home from "./pages/home.page.jsx";

export const UserContext = createContext({});

const App = () => {

    const [userAuth, setUserAuth] = useState({});

    useEffect(() => {

        let userInSession = lookInSession("user");

        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
    },[])

    return (
        <UserContext.Provider value={{userAuth, setUserAuth}}>
            
            
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<UserAuth/>} />   
            <Route path="/editor" element={<EditorPage/>} /> 
        </Routes>
            
        </UserContext.Provider>
    );
}

export default App;