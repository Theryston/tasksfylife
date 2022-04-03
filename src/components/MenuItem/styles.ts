import styled from "styled-components";

export const Container = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  width: 100%;
  height: 52px;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;

  border: ${({ isActive }) => (isActive ? "2px solid #e1e4e8" : "none")};
  box-sizing: border-box;
  border-radius: 0px 100px 100px 0px;

  flex: none;
  margin: 8px 0px;
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
    background-color: ${(props) => props.theme.colors.DarkGrey};
  }

  svg {
    margin-right: 10px;
  }
`;
