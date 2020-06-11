import styled from 'styled-components';

export const BoxContainer = styled.div`

  max-width: 900px;
  margin: 50px auto 0;

  ul {
    margin: 30px 0;
    list-style: none;
  }

  ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul li span {
    color: #999;
    font-size: 13px;
  }

  ul li + li {
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid #eee;
  }

`;

export const Header = styled.header`

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 21px;
    padding-left: 15px;
    margin-left: 15px;
    border-left: 1px solid #ddd;
  }


`;

export const FileInfo = styled.a`
  
  display: flex;
  align-items: center;
  text-decoration: none;

  strong {
    font-weight: normal;
    font-size: 14px;
    margin-left: 10px;
    color: #333;
  }
  
`;