import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import Certificate from "./Certificate";
import Error from "./Error";
import Search from "./Search";
import {Spinner, Table} from "react-bootstrap";


const certificates = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isError, setIsError] = useState(true);
    const {auth, certificates, certificatesMetadata} = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        props.handleFetchCertificates();
    }, []);

    if (!auth.loggedIn) {
        return <Redirect to="/"/>;
    }

    const handleClearError = () => {
        setIsError(false);
    }

    const listCertificate = certificates.map(certificate => <Certificate key={certificate.id} certificate={certificate}/>)

    return (
        <>
            {certificatesMetadata.isLoaded ?
                <div>
                    {isError ? <Error errorMessage={"Error message"} handleClearError={handleClearError}/> : null}
                    <Search/>
                    <Table className="mt-3" bordered hover>
                        <thead>
                        <tr className="table-secondary">
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
                <div className="d-flex">
                    <Spinner className="align-self-center" animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
        </>
    )
}

export default certificates;