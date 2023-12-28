import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

export default function Header(){
    return (
        <Navbar bg="light" sticky="top" className="Header">
            <Container>
                <Navbar.Brand>Microblog</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

