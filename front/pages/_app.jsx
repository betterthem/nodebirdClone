// 모든 곳에서 공통인 곳
import React from 'react';
import PropTypes from "prop-types";
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from "../store/configureStore";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  )
}

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(NodeBird);