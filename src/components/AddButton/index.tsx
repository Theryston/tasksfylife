import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import CreateCardModal from "../CreateCardModal";

const AddButton: NextPage = () => {
  const [showModalCreateCard, setShowModalCreateCard] =
    useState<boolean>(false);
  const { data: session } = useSession();

  if (!session) {
    return <ContainerButton onClick={() => signIn()}>+</ContainerButton>;
  }

  return (
    <div>
      <CreateCardModal
        show={showModalCreateCard}
        setter={setShowModalCreateCard}
      />
      <ContainerButton onClick={() => setShowModalCreateCard(true)}>
        +
      </ContainerButton>
    </div>
  );
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
