import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import AddButton from "../AddButton";
import UserData from "../UserData";
import { Container, ContainerActions } from "./styles";

const Header: NextPage = ({}) => {
  return (
    <Container>
      <Link href="/">
        <a>
          <Image
            src="/images/logo.png"
            alt="Network"
            height={50}
            width={50}
            objectFit="cover"
          />
        </a>
      </Link>
      <ContainerActions>
        <AddButton />
        <UserData />
      </ContainerActions>
    </Container>
  );
};

export default Header;
