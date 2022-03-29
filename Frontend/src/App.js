import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"


import Homepage from "./pages/Homepage"
import NavigationBar from "./components/Navbar"
import ProviderCreation from "./pages/ProviderCreation"

import { Container } from "react-bootstrap"


function App() {
    return (
        <div className="App">
            <NavigationBar />
            <Container>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/provider" />} />
                        <Route exact path="/provider" element={<Homepage />} />
                        <Route path="/service" element={<Homepage />} />
                        <Route path="/provider/new" element={<ProviderCreation />} />
                    </Routes>
                </Router>

            </Container>

        </div>
    )
}

export default App;
