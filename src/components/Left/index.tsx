import { NextPage } from "next";
import styled from "styled-components";
import { ILeft } from "../../interfaces/IUser";

import RightArrowIcon from "../../../public/icons/right-arrow.svg";
import LeftArrowIcon from "../../../public/icons/left-arrow.svg";
import { useCallback } from "react";

interface IProps {
  lefts: ILeft[];
}

const Left: NextPage<IProps> = ({ lefts }) => {
  const handleAddLeft = useCallback(() => {
    console.log("Add left");
  }, []);

  const handleRemoveLeft = useCallback(() => {
    console.log("Remove left");
  }, []);

  return (
    <ContainerLeft>
      <ButtonLeftOrRight onClick={() => handleAddLeft()}>
        <LeftArrowIcon />
      </ButtonLeftOrRight>
      {lefts.length}
      <ButtonLeftOrRight onClick={() => handleRemoveLeft()}>
        <RightArrowIcon />
      </ButtonLeftOrRight>
    </ContainerLeft>
  );
};

export const ContainerLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  min-width: 100px;
`;

export const ButtonLeftOrRight = styled.button`
  background: none;
  border: none;
  outline: none;
`;

export default Left;
