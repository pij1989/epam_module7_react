import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import Certificate from "./Certificate";
import Error from "./ErrorCertificates";
import Search from "./Search";
import {Spinner, Table} from "react-bootstrap";
import Pagination from "./Pagination";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


const certificates = (props) => {
    const {auth, certificates, certificatesMetadata, certificatesError} = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const page = certificatesMetadata.page;
        props.handleFetchCertificates(certificatesMetadata.sort, certificatesMetadata.order, page.number, page.size);
    }, [certificatesMetadata.order]);

    if (!auth.loggedIn) {
        return <Redirect to="/"/>;
    }

    const handleClickDateTimeArrow = () => {
        /*props.handleSortCertificates('createDate', certificatesMetadata.order,
            certificatesMetadata.page.number, certificatesMetadata.page.size);*/
        certificatesMetadata.order === 'asc' ? props.handleChangeOrderCreateDate('desc') : props.handleChangeOrderCreateDate('asc');
        console.log('Sort: ' + certificatesMetadata.sort);
    }

    const handleClickTitleArrow = () => {
        certificatesMetadata.order === 'asc' ? props.handleChangeOrderName('desc') : props.handleChangeOrderName('asc');
       /* console.log('Sort: ' + certificatesMetadata.sort);
        props.handleSortCertificates('name', certificatesMetadata.order,
            certificatesMetadata.page.number, certificatesMetadata.page.size);*/
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
                        <Search handleFetchCertificates={props.handleFetchCertificates}
                                handleSearchCertificates={props.handleSearchCertificates}
                                handleChangeFilter={props.handleChangeFilter}
                                page={certificatesMetadata.page}
                                filter={certificatesMetadata.filter}/>
                        <Table className="mt-3" bordered hover>
                            <thead>
                            <tr className="table-secondary">
                                <th onClick={handleClickDateTimeArrow}>{certificatesMetadata.sort === 'createDate' ?
                                    certificatesMetadata.order === 'asc' ? <ArrowDropDownIcon/> :
                                        <ArrowDropUpIcon/> : null} Datetime
                                </th>
                                <th onClick={handleClickTitleArrow}>{certificatesMetadata.sort === 'name' ?
                                    certificatesMetadata.order === 'asc' ? <ArrowDropDownIcon/> :
                                        <ArrowDropUpIcon/> : null} Title
                                </th>
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
                                handleFetchCertificates={props.handleFetchCertificates}
                                handleSearchCertificates={props.handleSearchCertificates}
                                filter={certificatesMetadata.filter}
                                sort={certificatesMetadata.sort}
                                order={certificatesMetadata.order}/>
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