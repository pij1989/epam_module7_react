import React from "react";
import {fetchCertificates} from "../action/createActions";
import {connect} from "react-redux";
import Certificates from "../components/Certificates";

const mapStateToProps = (state) => {
    return {certificates: state.certificates, auth : state.auth}
}

const mapDispatchToProps = dispatch => ({
    handleFetchCertificates: () => {
        dispatch(fetchCertificates());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Certificates);