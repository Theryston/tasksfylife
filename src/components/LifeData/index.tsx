import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { ILife } from "../../interfaces/IUser";

const LifeData: NextPage<{ life: ILife }> = ({ life }) => {
  return (
    <Link href={`/life/${life.name}`}>
      <a>
        <Container>
          <Image
            src={life.image as string}
            alt="User Profile image"
            width={20}
            height={20}
            objectFit="cover"
            style={{
              borderRadius: "50%",
            }}
          />
          <LifeName>#{life.number?.toString().substring(0, 4)}</LifeName>
        </Container>
      </a>
    </Link>
  );
};

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  cursor: pointer;
  color: ${(props) => props.theme.colors.Grey};

  font-weight: 500;

  border-radius: 20px;
`;

export const LifeName = styled.div`
  margin-left: 5px;
  font-size: 0.9em;
`;

export default LifeData;
