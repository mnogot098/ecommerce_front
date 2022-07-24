import React from 'react'
import {Navbar,Container,Nav, NavDropdown} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'

function Header() {

  const user = JSON.parse(localStorage.getItem('user-info'))
  const navigate = useNavigate();
  const logout = () =>
  {
    localStorage.clear();
    navigate('/login',{ replace: true })
  }
  return (
    <div>
        <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">E-commerce</Navbar.Brand>
          <Nav className="me-auto navbar_wrapper">
            {
              localStorage.getItem('user-info')?
              <>
              <Link to="/add">Add Product</Link>
              <Link to="/products_list">Product-list</Link>
              </>
              :
              <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              </>
            }
          </Nav>
          {
            localStorage.getItem('user-info')?
            <Nav>
            <NavDropdown title={user.name}>
              <NavDropdown.Item onClick={logout}>
                Logout
              </NavDropdown.Item>
              <NavDropdown.Item>
                {user.email}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          :
          null
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header