import { NextPage } from "next";
import styled from "styled-components";
import { ILife } from "../../interfaces/IUser";
import Left from "../Left";
import LifeData from "../LifeData";

interface IProps {
  life: ILife;
}

const Life: NextPage<IProps> = ({ life }) => {
  return (
    <Container>
      <ContainerAboutLife>
        <ContainerLifeData>
          <LifeData life={life} />
        </ContainerLifeData>
        <Left lefts={life.lefts} />
      </ContainerAboutLife>
    </Container>
  );
};

export const Container = styled.div`
  width: 300px;
  overflow-y: auto;
`;

export const ContainerLifeData = styled.div`
  padding: 7px 10px;
  border-radius: 20px;
  max-width: 200px;
  background-color: ${(props) => props.theme.colors.LightGrey};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerAboutLife = styled.div`
  display: flex;
  align-items: center;
`;

export default Life;
