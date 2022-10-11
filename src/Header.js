import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link ,useNavigate} from 'react-router-dom'


function Header(props) {
  let test = props.logincomponent;
  console.warn(test);
  let user = JSON.parse(localStorage.getItem('staff-info'));
  console.warn(user);
  const navigate = useNavigate();
  function logout(){
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Project Management System</Navbar.Brand>
          <Nav className="mr-auto navbar_wrapper">
            {
         
            user != undefined || user != null?
            
              <>
              <Link to="/projectlist">Project List</Link>
              <Link to="/addproject">Add Project</Link>
            
              </>
              :
              <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              </>
            }
            
          </Nav>
         
        </Container>
        {user?
        <Nav>
            <NavDropdown title={user && user.email}>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        :null
          }
      </Navbar>
    </div>
  )
}
export default Header
