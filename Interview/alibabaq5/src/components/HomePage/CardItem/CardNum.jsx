import react from "react";
import styled from "styled-components";
import StyleBttuon from "./StyleButton";

const Card = styled.div`
  width: 382px;
  height: 222px;
  margin: 8.5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
`;

const Header = styled.h2`
  font-size: 18px;
  font-weight: 300;
  color: ${(props) => (props.isDisable ? "grey" : "#F37327")};
  margin-top: -10px;
`;
const SubHeader = styled(Header)`
  font-size: 14px;
  margin-top: 5px;
`;

const StyledBttuon = styled(StyleBttuon)`
  width: 200px;
  margin-top: 30px;
`;

function CardNum(props) {
  const { title, subTitle, isDisable } = props;

  return (
    <Card>
      <div class="content">
        <Header isDisable={isDisable}>{title}</Header>
        <SubHeader isDisable={isDisable}>{subTitle}</SubHeader>

        <StyledBttuon background={isDisable} {...props}>
          马上申请
        </StyledBttuon>
      </div>
    </Card>
  );
}

export default CardNum;
