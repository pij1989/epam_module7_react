import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {Table} from "react-bootstrap";
import Certificate from "./Certificate";

const certificates = (props) => {
    const {auth, certificates} = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        props.handleFetchCertificates();
    }, []);

    if (!auth.loggedIn) {
        return <Redirect to="/"/>;
    }

    const listCertificate = certificates.map(certificate => <Certificate certificate={certificate}/>)

    return (
        <div style={{alignSelf: 'center'}}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Datetime</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {listCertificate}
                </tbody>
            </Table>
        </div>
    )
}

export default certificates;