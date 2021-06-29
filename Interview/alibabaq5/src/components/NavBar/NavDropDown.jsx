import react from "react";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";

const DropdownToggle = styled(Dropdown.Toggle)`
  border: none;
  background-color: #fff;
  color: #79889b;
  font-size: 16px;
`;

function NavDropDown(props) {
  const { title } = props;

  return (
    <Dropdown>
      <DropdownToggle id="dropdown-basic">{title}</DropdownToggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">TODO</Dropdown.Item>
        <Dropdown.Item href="#/action-2">TODO</Dropdown.Item>
        <Dropdown.Item href="#/action-3">TODO</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavDropDown;
