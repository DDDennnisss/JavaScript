import react from "react";
import styled from "styled-components";

const NavbarItem = styled.nav`
  height: 30px;
  background-color: #414954;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 20px;

  ul {
    display: flex;
    width: 50%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  ul li {
    list-style: none;
    color: #585756;
    padding: 5px;
    font-size: 14px;
  }

  ul li a {
    text-decoration: none;
    color: #c7c7c7;

    &:hover {
      color: #f80;
      text-decoration: underline;
    }
  }
`;

function Footer() {
  const Data1 = [
    {
      title: "阿里巴巴中国站",
      url: "https://job.alibaba.com/"
    },
    {
      title: "阿里巴巴国际站",
      url: "https://102.alibaba.com/"
    },
    {
      title: "全球速卖通",
      url: "http://e.weibo.com/campusali"
    },
    {
      title: "淘宝网",
      url: "http://e.weibo.com/campusali"
    },
    {
      title: "天猫",
      url: "http://e.weibo.com/campusali"
    },
    {
      title: "支付宝",
      url: "http://e.weibo.com/campusali"
    },
    {
      title: "阿里云",
      url: "http://e.weibo.com/campusali"
    },
    {
      title: "聚划算",
      url: "http://e.weibo.com/campusali"
    },
    {
      title: "一淘",
      url: "http://e.weibo.com/campusali"
    }
  ];

  return (
    <NavbarItem>
      <ul>
        {Data1.map((data) => (
          <>
            <li>
              <a target="_blank" href={data.url}>
                {data.title}
              </a>{" "}
            </li>
            <li>|</li>
          </>
        ))}
        <li>
          <a target="_blank" href="https://102.alibaba.com/">
            Official Website (EN)
          </a>{" "}
        </li>

        <li style={{ color: "#c7c7c7" }}>欢迎来到阿里巴巴校园招聘！</li>
        <li>
          <a target="_blank" href="http://weibo.com/campusali">
            阿里巴巴集团校园招聘
          </a>{" "}
        </li>
      </ul>
    </NavbarItem>
  );
}

export default Footer;
