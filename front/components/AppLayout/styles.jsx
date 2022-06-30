import styled, {createGlobalStyle} from 'styled-components';
import { Input, Menu } from 'antd';

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  
  .ant-col:first-child {
    padding-left: 0 !important;
  }
  
  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MenuWrapper = styled(Menu)`
  margin-bottom: 20px;
`;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;


export { SearchInput, MenuWrapper, Global };
