import React from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import Footer from "./component/Footer"
import './App.scss';

function App() {
    return (
        <div className="App">
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}

export default App;
