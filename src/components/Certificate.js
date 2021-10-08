import React from "react";
import {Button} from "react-bootstrap";
import DeleteCertificate from "./DeleteCertificate";
import ViewCertificate from "./ViewCertificate";

const certificate = ({certificate, handleDeleteCertificate, handleViewCertificate}) => {
    const tags = certificate.tags;

    return (
        <tr className="table-light">
            <td>{certificate.createDate}</td>
            <td>{certificate.name}</td>
            <td width='350px'>{tags !== undefined ? certificate.tags.map(tag => tag.name).join(',\n') : null}</td>
            <td width='400px'>{certificate.description}</td>
            <td>{certificate.price}</td>
            <td>
                <div>
                    <ViewCertificate key={certificate.id} certificate={certificate}/>
                    <Button variant="warning">Edit</Button>
                    <DeleteCertificate handleDeleteCertificate={handleDeleteCertificate} id={certificate.id}/>
                </div>
            </td>
        </tr>
    )
}

export default certificate;