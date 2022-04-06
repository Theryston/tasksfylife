import type { GetStaticProps, NextPage } from "next";
import styled from "styled-components";
import Life from "../components/Life";
import { ILivesPaginated } from "../interfaces/IPagination";
import Layout from "../layouts";
import FindLivesService from "../services/FindLivesService";

interface IProps {
  livesPaginated: ILivesPaginated;
}

const Home: NextPage<IProps> = ({ livesPaginated }) => {
  livesPaginated = JSON.parse(livesPaginated as any);

  return (
    <Layout>
      <ContainerLives>
        {livesPaginated.lives.map((life, index) => (
          <Life key={index} life={life} />
        ))}
      </ContainerLives>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const livesPaginated = await FindLivesService.execute({
    limit: 100,
    page: 0,
  });

  return {
    props: {
      livesPaginated: JSON.stringify(livesPaginated),
    },
    revalidate: 10,
  };
};

export const ContainerLives = styled.div``;

export default Home;
