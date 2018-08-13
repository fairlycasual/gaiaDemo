
import React from 'react';
import { Navbar, 
         Nav, 
         NavItem, 
         FormGroup,
         FormControl,
         Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Navigation extends React.Component {
  render() {
    return (
      <Navbar>
        <Nav style={{display:"flex", flexDirection:"row", alignContent:"left", fontSize:"14px"}}>
          <NavItem>
            MY GAIA
          </NavItem>
          <NavItem>
            YOGA
          </NavItem>
          <NavItem>
            SEEKING TRUTH
          </NavItem>
          <NavItem>
            TRANSFORMATION
          </NavItem>
          <NavItem>
            FILMS & DOCS
          </NavItem>
          <NavItem>
            CENTERS
          </NavItem>
        </Nav>
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl type="text" placeholder="Search" results="0"/>
            
          </FormGroup>
        </Navbar.Form>
      </Navbar>
    )
  }
}

export default Navigation;