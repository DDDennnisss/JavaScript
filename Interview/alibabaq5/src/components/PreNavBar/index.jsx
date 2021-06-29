import react from "react";
import styled from "styled-components";

const NavbarItem = styled.nav`
  height: 30px;
  background-color: #666;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ul {
    display: flex;
  }

  ul li {
    list-style: none;
    color: #c7c7c7;
    padding: 0 4px;
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

const Login = styled.ul`
  margin: auto 40px;
`;

function PreNavBar() {
  const Data1 = [
    {
      title: "社会招聘",
      url: "https://job.alibaba.com/"
    },
    {
      title: "阿里校园合作",
      url: "https://102.alibaba.com/"
    },
    {
      title: "官方微博",
      url: "http://e.weibo.com/campusali"
    }
  ];

  const Data2 = [
    {
      title: "登录",
      url:
        "https://campus.alibaba.com/login.htm?params=https%3A%2F%2Fcampus.alibaba.com%2Findex.htm"
    },
    {
      title: "免费注册",
      url: "http://member1.taobao.com/member/new_register.jhtml"
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
      </ul>

      <Login>
        <li className="">欢迎来到阿里巴巴校园招聘！</li>
        {Data2.map((data) => (
          <>
            <li>
              <a target="_blank" href={data.url}>
                {data.title}
              </a>{" "}
            </li>
          </>
        ))}
      </Login>
    </NavbarItem>
  );
}

export default PreNavBar;
