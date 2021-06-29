import react from "react";
import styled from "styled-components";
import CardNum from "./CardNum";

const Container = styled.div`
  background-origin: border-box;
  display: flex;
  justify-content: center;
  min-height: auto;
  margin: 100px 0;
`;

function CardItem() {
  return (
    <Container>
      <CardNum
        title="应届生入口"
        subTitle="毕业时间：2020年11月-2021年10月"
        isDisable={true}
      />
      <CardNum
        title="实习生入口"
        subTitle="毕业时间：2021年11月-2022年10月"
        onClick={() =>
          (window.location.href =
            "https://campus.alibaba.com/traineePositionList.htm")
        }
      />
      <CardNum
        title="人才计划"
        subTitle="毕业时间：2020年11月及以后"
        onClick={() =>
          (window.location.href = "https://campus.alibaba.com/talentPlan.htm")
        }
      />
    </Container>
  );
}

export default CardItem;
