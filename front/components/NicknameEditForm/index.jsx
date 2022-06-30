import React, {useCallback} from 'react';
import { Input } from 'antd';
import { FormWrapper } from './styles';
import useInput from "../../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_NICKNAME_REQUEST} from "../../reducers/user";

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <FormWrapper
      onFinish={onSubmit}
    >
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
      />
    </FormWrapper>
  );
};

export default NicknameEditForm;
