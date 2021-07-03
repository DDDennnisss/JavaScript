import react from "react";
import styled from "styled-components";

const MenuStyle = styled.div`
  position: relative;
  width: 200px;
  z-index: 0;
`
const Open = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
  z-index: 0;
`
const ItemStyle = styled.div`
  background: #aacbff;
  box-sizing: border-box;
  cursor: pointer;
  font-family: Roboto;
  font-size: 20px;
  padding: 10px;
  position: relative;
  text-align: center;
  transition: background-color .05s ease-in-out;
  z-index: 1;

  &:hover {
    background-color: #8cb8ff;
    color: white;
  }
`

const Menu = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [head, ...tail] = React.Children.toArray(children);
  
  return (
    <MenuStyle
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {head}
      {isOpen && <Open>{tail}</Open>}
    </MenuStyle>
  );
};

const Item = ({ children, onClick }) => {
  return (
    <ItemStyle onClick={onClick}>
      {children}
    </ItemStyle>
  );
};

const MenuInstance = (
  <Menu>
    <Item onClick={() => alert('Link one clicked!')}>Link One</Item>
    <Item onClick={() => alert('Link two clicked!')}>Link Two</Item>
    <Item onClick={() => alert('Link three clicked!')}>Link Three</Item>
  </Menu>
);

export default MenuInstance;