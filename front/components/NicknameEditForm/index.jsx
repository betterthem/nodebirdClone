import React from 'react';
import { Input } from 'antd';
import { FormWrapper } from './styles';

const NicknameEditForm = () => {
  return (
    <FormWrapper>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </FormWrapper>
  );
};

export default NicknameEditForm;
