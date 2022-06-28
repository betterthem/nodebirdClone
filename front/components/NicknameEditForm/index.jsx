import React from 'react';
import { FormWrapper } from './styles';
import { Input } from 'antd';

const NicknameEditForm = () => {
  return (
    <FormWrapper>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </FormWrapper>
  )
}

export default NicknameEditForm;