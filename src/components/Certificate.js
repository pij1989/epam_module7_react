import React from "react";

const certificate = ({certificate}) => {
    return (
        <tr>
            <td>{certificate.createDate}</td>
            <td>{certificate.name}</td>
            <td>{certificate.description}</td>
            <td>{certificate.price}</td>
        </tr>
    )
}

export default certificate;