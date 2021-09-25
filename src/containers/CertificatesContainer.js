import {changeFilter, clearError, fetchCertificates, searchCertificates} from "../action/createActions";
import {connect} from "react-redux";
import Certificates from "../components/Certificates";

const mapStateToProps = (state) => {
    return {
        certificates: state.certificates,
        auth: state.auth,
        certificatesMetadata: state.certificatesMetadata,
        certificatesError: state.certificatesError
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchCertificates: (number, size) => {
        dispatch(fetchCertificates(number, size));
    },
    handleSearchCertificates: (filter, number, size) => {
        dispatch(searchCertificates(filter,number,size));
    },
    handleClearError: () => {
        dispatch(clearError());
    },
    handleChangeFilter: (filter) => {
        dispatch(changeFilter(filter))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Certificates);