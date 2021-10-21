import { GetStaticPropsResult } from 'next';
import axios from 'axios';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

export default withLayout(function Home({ menu }: HomeProps): JSX.Element {
  return <></>;
});

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
  const firstCategory = 0;

  const { data: menu } = await axios.post<unknown, Record<string, MenuItem[]>>(API.topPage.find, {
    firstCategory,
  });

  return {
    props: {
      firstCategory,
      menu,
    },
  };
}

interface HomeProps extends Record<string, unknown> {
  firstCategory: number;
  menu: MenuItem[];
}
