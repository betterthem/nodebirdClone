import React, {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import {useRouter} from "next/router";
import {END} from "redux-saga";
import axios from "axios";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import {LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST} from "../reducers/user";
import wrapper from "../store/configureStore";

const ErrorMessage = styled.div`
  color: tomato;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [term, password, passwordCheck]);

  return (
    <AppLayout>
      <Head>
        <title>???????????? | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">?????????</label>
          <br/>
          <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor="user-nickname">?????????</label>
          <br/>
          <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">????????????</label>
          <br/>
          <Input name="user-password" type="password" required value={password} onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">???????????? ??????</label>
          <br/>
          <Input name="user-password-check" type="password" required value={passwordCheck} onChange={onChangePasswordCheck} />
          {passwordError && <ErrorMessage>??????????????? ???????????? ????????????.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>???????????? ????????? ???????????????.</Checkbox>
          {termError && <ErrorMessage>????????? ??????????????? ?????????.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>????????????</Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  // ????????? ?????? ??????
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Signup;
