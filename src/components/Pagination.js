import React from "react";
import Pagination from "@mui/material/Pagination";

const pagination = ({page, handleFetchCertificates}) => {
    console.log(page)

    const handleNumberPageChange = (event, value) => {
        console.log(`Page: ${value}`);
        handleFetchCertificates(value, page.size);
    }

    const handleRowPerPageChange = (event) => {
        let value = event.target.value;
        console.log("Row per page: " + value);
        if (page.totalElements / parseInt(value) < page.number) {
            handleFetchCertificates(1, value);
            return;
        }
        handleFetchCertificates(page.number, value);
    }

    return (
        <div className="d-flex mb-3">
            <div className="flex-grow-1 d-flex justify-content-center">
                <Pagination count={page.totalPages} page={page.number} variant="outlined" shape="rounded"
                            onChange={handleNumberPageChange}/>
            </div>
            <div className="flex-grow-0">
                <select onChange={handleRowPerPageChange} value={page.size}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    )
}

export default pagination;