import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import styled from "styled-components";

const AddButton: NextPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <ContainerButton onClick={() => signIn()}>+</ContainerButton>;
  }

  return <ContainerButton>+</ContainerButton>;
};

export const ContainerButton = styled.button`
  border: none;
  outline: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.LightGrey};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.5em;
`;

export default AddButton;
