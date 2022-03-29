import React from "react"
import {Pagination, Table} from "react-bootstrap";


function TableView({content, totalPages, goToPage, currentPage, sort}) {

    const handleGoToPage = (page) => {
        goToPage(page)
    }

    return (
        <>
            <Table responsive hover striped className="shadow p-3 mb-5 bg-white rounded mx-auto bg-black"
                   style={{width: "95%"}}>
                <thead>
                <tr>
                    {content.thead && content.thead.map((th) => {
                        return (
                            <th key={th.value} className={th.col}>{th.value} {th.sort &&
                            <i className="bi bi-arrow-down-up" onClick={() => {
                                sort(th.sortBy)
                            }}/>}</th>)
                    })}
                </tr>
                </thead>
                <tbody>
                {content.tableContent}
                </tbody>
            </Table>

            {totalPages > 1 && (
                <Pagination className="d-flex justify-content-center ">
                    <Pagination.First/>
                    <Pagination.Prev/>
                    {Array.from({length: totalPages}).map((_, page) => (
                        <Pagination.Item key={page} active={page === currentPage} onClick={() => {
                            handleGoToPage(page)
                        }}>{page + 1}</Pagination.Item>
                    ))}
                    <Pagination.Next/>
                    <Pagination.Last/>
                </Pagination>
            )}
        </>
    )
}

export default TableView