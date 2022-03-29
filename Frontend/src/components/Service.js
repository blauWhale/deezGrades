import React, {useState} from "react"
import {Button, Col, Container, Row} from "react-bootstrap"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Service() {
    const [serviceContent, setServiceContent] = useState([]);
    const [serviceTotalPages, setServiceTotalPages]=useState(0)
    const MySwal = withReactContent(Swal)

    const fetchServiceContent = async (page, sortBy, asc) => {
        console.log('http://localhost:8080/api/service?page=' + page + "&sort=" + sortBy + "&asc=" + asc)
        return request('http://localhost:8080/api/service?page=' + page + "&sort=" + sortBy + "&asc=" + asc)
    }

    const searchService = async (search, currentSort, ascending) => {
        return request('http://localhost:8080/api/service?page=' + 0 + "&sort=" + currentSort + "&asc=" + ascending + "&search=" + search)
    }

    const deleteService= (id) =>{
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                return await fetch("http://localhost:8080/api/service/" + id, { method: 'DELETE' })
                    .then(() => {
                        MySwal.fire(
                            'Deleted!',
                            'Service been deleted.',
                            'success'
                        )
                        fetchServiceContent(0,"name",true)
                    })
                    .catch(err=>{
                        MySwal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: err
                        })
                    })
            }
        })

    }


    const request= async(url)=>{
        return await fetch(url)
            .then(res => res.json())
            .then((data) => {
                setServiceTotalPages(data.totalPages)
                setServiceContent(data.content)
            })
            .catch(console.log)
    }

    const serviceElement = {
        viewButton: (
            <Button variant="outline-secondary" className="w-100" href="/provider">View Provider</Button>),
        createButton: (<Button variant="secondary" className="w-100">Create Service</Button>),
        title: (<h2>Service</h2>),
        thead: [
            {value: "Name", sort: true, col:"col-md-1", sortBy:"name"},
            {value: "Begin Date", sort: false, col:"col-md-3", sortBy: "contactPerson"},
            {value: "End Date", sort: false, col:"col-md-3"},
            {value: "Contract Category", sort: false, col:"col-md-2"},
            {value: "Action", sort: false, col:"col-md-2"}],
        tableContent: (serviceContent.map((service) => {
                return (
                    <tr key={service.id}>
                        <td>{service.name}</td>
                        <td>{service.beginDate}</td>
                        <td>{service.endDate}</td>
                        <td>{service.contractCategory}</td>
                        <td>
                            <Container>
                                <Row>
                                    <Col><i className="bi bi-pencil-fill"/></Col>
                                    <Col><i className="bi bi-trash-fill" onClick={()=>{deleteService(service.id)}}/></Col>
                                </Row>
                            </Container>
                        </td>
                    </tr>
                )
            })
        )
    }


    return {
        fetchServiceContent,
        serviceElement,
        serviceTotalPages,
        searchService
    }
}

export default Service