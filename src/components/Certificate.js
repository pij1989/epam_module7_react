import React from "react";
import {Button} from "react-bootstrap";

const certificate = ({certificate}) => {
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
                    <Button variant="primary">View</Button>
                    <Button variant="warning">Edit</Button>
                    <Button variant="danger">Delete</Button>
                </div>
            </td>
        </tr>
    )
}

export default certificate;