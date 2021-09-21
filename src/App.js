import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.scss';
import Main from "./components/Main";
import {combineReducers, createStore} from "redux";
import {authErrorReducer, authReducer} from "./reducers/reducers";
import {Provider} from "react-redux";
import LoginContainer from "./containers/LoginContainer";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomePage from "./components/HomePage";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react'
import PageNotFound from "./components/PageNotFound";
import Certificates from "./components/Certificates";

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['authError']
}

const rootReducer = combineReducers({
    auth: authReducer,
    authError: authErrorReducer
});

const persistRootReducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(persistRootReducer);

const persistor = persistStore(store);

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="App">
                    <BrowserRouter>
                        <Header/>
                        <Main>
                            <Switch>
                                <Route exact path="/" component={LoginContainer}/>
                                <Route exact path="/home" component={Certificates}/>
                                <Route component={PageNotFound}/>
                            </Switch>
                        </Main>
                        <Footer/>
                    </BrowserRouter>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
