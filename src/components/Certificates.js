import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import Certificate from "./Certificate";
import Error from "./ErrorCertificates";
import Search from "./Search";
import {Spinner, Table} from "react-bootstrap";
import Pagination from "./Pagination";


const certificates = (props) => {
    const {auth, certificates, certificatesMetadata, certificatesError} = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const page = certificatesMetadata.page;
        props.handleFetchCertificates(page.number, page.size);
    }, []);

    if (!auth.loggedIn) {
        return <Redirect to="/"/>;
    }

    const listCertificate = certificates.map(certificate => <Certificate key={certificate.id}
                                                                         certificate={certificate}/>)

    return (
        <>
            {certificatesMetadata.isLoaded ?
                <div className="d-flex flex-column justify-content-between">
                    <div>
                        {certificatesError.isCertificatesError ? <Error errorMessage={certificatesError.errorMassage}
                                                                        handleClearError={props.handleClearError}/> : null}
                        <Search handleSearchCertificates={props.handleSearchCertificates}
                                handleChangeFilter = {props.handleChangeFilter}
                                page={certificatesMetadata.page}
                                filter={certificatesMetadata.filter}/>
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
                    </div>
                    <Pagination page={certificatesMetadata.page}
                                handleFetchCertificates={props.handleFetchCertificates}/>
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