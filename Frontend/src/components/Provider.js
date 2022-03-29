import React, {useState} from "react"
import {Button, Col, Container, Row} from "react-bootstrap"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Provider() {
    const [providerContent, setProviderContent] = useState([]);
    const [providerTotalPages, setProviderTotalPages]=useState(0)
    const MySwal = withReactContent(Swal)

    const fetchProviderContent = async (page, sortBy, asc, search) => {
        if(search){
            return request('http://localhost:8080/api/provider?page=' + page + "&sort=" + sortBy + "&asc=" + asc+ "&search=" + search)
        }
        return request('http://localhost:8080/api/provider?page=' + page + "&sort=" + sortBy + "&asc=" + asc)
    }

    const deleteProvider= (id) =>{
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
                return await fetch("http://localhost:8080/api/provider/" + id, { method: 'DELETE' })
                    .then(() => {
                        MySwal.fire(
                            'Deleted!',
                            'Provider been deleted.',
                            'success'
                        )
                        fetchProviderContent(0,"name",true)
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
                setProviderTotalPages(data.totalPages)
                setProviderContent(data.content)
            })
            .catch(console.log)
    }

    const providerElement = {
        viewButton: (
            <Button variant="outline-secondary" className="w-100" href="/service">View Service</Button>),
        createButton: (<Button variant="secondary" className="w-100">Create Provider</Button>),
        title: (<h2>Provider</h2>),
        thead: [
            {value: "Name", sort: true, col:"col-md-3", sortBy:"name"},
            {value: "Contact Person", sort: true, col:"col-md-3", sortBy: "contactPerson"},
            {value: "Third Party / Intra-Group", sort: false, col:"col-md-3"},
            {value: "Website", sort: false, col:"col-md-1"},
            {value: "Action", sort: false, col:"col-md-2"}],
        tableContent: (providerContent.map((provider) => {
                return (
                    <tr key={provider.id}>
                        <td>{provider.name}</td>
                        <td>{provider.contactPerson}</td>
                        <td>{provider.thirdPartyCheck ? "Third Party" : "Intra-Group"}</td>
                        <td><a href={provider.website} target="_blank"><i className="bi bi-globe2"
                                                                            style={{color: "black"}}/></a></td>
                        <td>
                            <Container>
                                <Row>
                                    <Col><i className="bi bi-pencil-fill"/></Col>
                                    <Col><i className="bi bi-trash-fill" onClick={()=>{deleteProvider(provider.id)}}/></Col>
                                </Row>
                            </Container>
                        </td>
                    </tr>
                )
            })
        )
    }


    return {
        fetchProviderContent,
        providerElement,
        providerTotalPages
    }
}

export default Provider