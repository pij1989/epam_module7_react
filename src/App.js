import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Main>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                    </Switch>
                </Main>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
