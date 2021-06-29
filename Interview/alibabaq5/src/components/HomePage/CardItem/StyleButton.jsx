import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const ButtonStyle = styled(Button)`
  background: ${(props) => props.background || "#F37327"};
  border-radius: 100px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  color: ${(props) => props.color || "#fff"};
  border: ${(props) => props.border || "none"};
  padding: 13px 24px;
  height: auto;

  &:hover {
    box-shadow: none;
    outline: none;
    color: ${(props) => props.hovercolor || "#fff"};
    text-decoration: none;
  }
`;

function StyleButton(props) {
  const { children } = props;

  return <ButtonStyle {...props}>{children}</ButtonStyle>;
}

export default StyleButton;
