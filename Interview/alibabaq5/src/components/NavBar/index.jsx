import react from "react";
import styled from "styled-components";
import NavDropDown from "./NavDropDown";

const NavbarItem = styled.div`
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    display: flex;
  }

  ul li {
    list-style: none;
    padding: 0 14.5px;
  }

  ul li a {
    text-decoration: none;
    color: #79889b;
    font-size: 16px;

    &:hover {
      color: #f80;
      text-decoration: underline;
    }
  }
`;

const Logo = styled.img`
  height: 60%;
  padding-right: 20px;
`;

function NavBar() {
  const Data = [
    "首页",
    "实习生招聘",
    "应届生招聘",
    "人才计划",
    "薪酬福利",
    "阿里味道",
    "个人中心",
    "Official Website (EN)"
  ];
  return (
    <NavbarItem>
      <Logo alt="logo" src="../../asset/logo.png" />
      <ul>
        {Data.map((data) => (
          <>
            <li>
              <NavDropDown title={data} />
            </li>
          </>
        ))}
      </ul>
    </NavbarItem>
  );
}

export default NavBar;
