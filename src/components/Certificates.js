import React, {useEffect, useState} from "react";
import {getCertificates} from "../services/certificate.service";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const certificates = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [certificates, setCertificates] = useState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const auth = useSelector(state => state.auth);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        getCertificates(setCertificates);
    }, []);

    if (!auth.loggedIn) {
        return <Redirect to="/"/>;
    }

    return (
        <div style={{alignSelf: 'center'}}>
            <h1>Home Page</h1>
        </div>
    )
}

export default certificates;