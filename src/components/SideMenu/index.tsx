import { NextPage } from "next";
import MenuItem from "../MenuItem";
import { Container } from "./styles";
import HomeIcon from "../../../public/icons/home.svg";
import SquareBlueIcon from "../../../public/icons/square-blue.svg";
import SquareRedIcon from "../../../public/icons/square-red.svg";
import CompleteIcon from "../../../public/icons/complete.svg";
import { useSession } from "next-auth/react";
import { IUser } from "../../interfaces/IUser";

interface IProps {}

const SideMenu: NextPage<IProps> = ({}) => {
  const { data: session } = useSession();

  return (
    <Container>
      <MenuItem
        icon={{
          component: HomeIcon,
        }}
        href="/"
        label="Home"
      />
      <MenuItem
        icon={{
          component: SquareBlueIcon,
        }}
        href={
          session ? `/life/${(session.user as IUser).id}` : "/api/auth/signin"
        }
        label="My life"
      />
      <MenuItem
        icon={{
          component: SquareRedIcon,
        }}
        href={
          session
            ? `/life/${(session.user as IUser).id}?tag=work`
            : "/api/auth/signin"
        }
        label="Work"
      />
      <MenuItem
        icon={{
          component: CompleteIcon,
        }}
        href={
          session
            ? `/life/${(session.user as IUser).id}?status=completed`
            : "/api/auth/signin"
        }
        label="Complete"
      />
    </Container>
  );
};

export default SideMenu;
