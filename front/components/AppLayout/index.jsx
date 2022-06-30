import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Row, Col } from 'antd';
import {useSelector} from "react-redux";
import {MenuWrapper, SearchInput, Global} from "./styles";

import UserProfile from "../UserProfile";
import LoginForm from "../LoginForm";

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Global />
      <MenuWrapper mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput />
        </Menu.Item>
      </MenuWrapper>
      <Row gutter={20}>
        {/*xs: mobile, sm: tablet, md: small desktop*/}
        <Col xs={24} md={6}>
          {
            me ? <UserProfile /> : <LoginForm />
          }
        </Col>
        <Col xs={24} md={12}>
          { children }
        </Col>
        <Col xs={24} md={6}>
          <a href="https://github.com/betterthem/nodebirdClone" target="_blank" rel="noreferrer noopener">Made by Mucbo</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout;