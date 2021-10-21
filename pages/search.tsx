import { GetStaticPropsResult } from 'next';
import axios from 'axios';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

export default withLayout(function Search(): JSX.Element {
  return <>Search</>;
});

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
  const firstCategory = 0;
  const { data: menu } = await axios.post<unknown, Record<string, MenuItem[]>>(API.topPage.find, {
    firstCategory,
  });

  return {
    props: {
      menu,
      firstCategory,
    },
  };
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
