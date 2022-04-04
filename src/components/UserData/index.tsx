import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Container, MyLife } from "./styles";

const UserData: NextPage = () => {
  const { data: session }: { data: any } = useSession();

  if (!session) {
    return <Container onClick={() => signIn()}>Login</Container>;
  }

  return (
    <Link href={`/life/${session.life.name}`}>
      <a>
        <Container>
          <Image
            src={session.user?.image as string}
            alt="User Profile image"
            width={20}
            height={20}
            objectFit="cover"
            style={{
              borderRadius: "50%",
            }}
          />
          <MyLife>My life</MyLife>
        </Container>
      </a>
    </Link>
  );
};

export default UserData;
