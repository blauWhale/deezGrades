import {Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap"
import React, {useEffect, useState, useRef} from "react"
import "../index.css"
import TableView from "../components/TableView"
import Provider from "../components/Provider";
import Service from "../components/Service";

function Homepage() {

    const [viewingProvider, setViewingProvider] = useState();
    const [currentPage, setCurrentPage] = useState(0)
    const [currentSort, setCurrentSort] = useState("name")
    const [ascending, setAscending] = useState(true)
    const [searchedContendDisplayed, setSearchedContentDisplayed] = useState(false)
    const {fetchProviderContent, providerElement, providerTotalPages} = Provider();
    const {fetchServiceContent, serviceElement, serviceTotalPages} = Service();
    const searchRef = useRef();


    const goToPage = async (page) => {
        setCurrentPage(page)
        await fetchContent(page, currentSort, ascending, searchRef.current.value)
    }

    const reset = async () => {
        setCurrentPage(0)
        setSearchedContentDisplayed(false)
        searchRef.current.value = ""
        await fetchContent(currentPage, currentSort, ascending, searchRef.current.value)
    }
    const fetchContent = async (page, sort, asc, search) => {
        if (viewingProvider) {
            await fetchProviderContent(page, sort, asc, search)
        } else {
            await fetchServiceContent(page, sort, asc, search)
        }
    }

    const sort = async (col) => {
        setCurrentSort(col)
        setAscending(ascending => !ascending);
    }


    useEffect(async () => {
        await fetchContent(currentPage, currentSort, ascending)
    }, [ascending])

    useEffect(async () => {
        setViewingProvider(window.location.pathname === "/provider")
        if (window.location.pathname === "/provider") {
            await fetchProviderContent(currentPage, currentSort, ascending, searchRef.current.value)
        } else {
            await fetchServiceContent(currentPage, currentSort, ascending, searchRef.current.value)
        }
    }, [])

    return (
        <>
            <Container className="mt-5 mb-3 p-0" style={{width: "95%"}}>
                <Row>
                    <Col sm={6}>
                        {viewingProvider ? (providerElement.viewButton) : (serviceElement.viewButton)}
                    </Col>
                    <Col sm={6}>
                        {viewingProvider ? (providerElement.createButton) : (serviceElement.createButton)}
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col sm={searchedContendDisplayed ? 10 : 12}>
                        <InputGroup className="mb-3 mx-auto">
                            <FormControl
                                placeholder="Search"
                                aria-label="Search Field"
                                ref={searchRef}
                                onChange={async () => {
                                    if (searchRef.current.value) {
                                        setSearchedContentDisplayed(true)
                                        setCurrentPage(0)
                                        await fetchContent(currentPage, currentSort, ascending, searchRef.current.value)
                                    } else {
                                        setSearchedContentDisplayed(false)
                                        await fetchContent(currentPage, currentSort, ascending)
                                    }
                                }}
                            />
                        </InputGroup>

                    </Col>
                    {searchedContendDisplayed && (<Col sm={2}><Button variant="secondary" style={{width: "100%"}}
                                                                      onClick={() => reset()}>Reset</Button></Col>)}
                </Row>
            </Container>

            {viewingProvider ? (providerElement.title) : (serviceElement.title)}
            <TableView
                content={viewingProvider ? providerElement : serviceElement}
                sort={sort}
                totalPages={viewingProvider ? providerTotalPages : serviceTotalPages}
                currentPage={currentPage}
                goToPage={goToPage}
            />
        </>
    )
}

export default Homepage
