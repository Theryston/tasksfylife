import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 300px;
  overflow-y: auto;
  z-index: 1;

  background-color: ${(props) => props.theme.colors.DarkBlue};
  overflow-x: hidden;
  padding: 22px 20px;
  border-radius: 0px 10px 10px 0px;
`;
