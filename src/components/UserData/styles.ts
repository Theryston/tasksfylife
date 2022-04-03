import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;

  cursor: pointer;
  min-height: 32px;
  background-color: ${(props) => props.theme.colors.LightGrey};
  color: ${(props) => props.theme.colors.Grey};

  font-weight: 500;

  border-radius: 20px;
`;

export const MyLife = styled.span`
  margin-left: 5px;
`;
