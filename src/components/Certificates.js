import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {Spinner, Table} from "react-bootstrap";
import Certificate from "./Certificate";

const certificates = (props) => {
    const {auth, certificates, certificatesMetadata} = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        props.handleFetchCertificates();
    }, []);

    if (!auth.loggedIn) {
        return <Redirect to="/"/>;
    }

    const listCertificate = certificates.map(certificate => <Certificate key={certificate.id}
                                                                         certificate={certificate}/>)

    return (
        <>
            {certificatesMetadata.isLoaded ?
                <div>
                    <Table className="mt-5" striped bordered hover>
                        <thead>
                        <tr>
                            <th>Datetime</th>
                            <th>Title</th>
                            <th>Tags</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listCertificate}
                        </tbody>
                    </Table>
                </div> :
                <Spinner className="align-self-center" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
        </>
    )
}

export default certificates;