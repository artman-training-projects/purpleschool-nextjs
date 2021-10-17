import { GetStaticPropsResult } from 'next';
import { useState } from 'react';
import axios from 'axios';
import { withLayout } from '../layout/Layout';
import { Title, Rating, Input } from '../components';
import { MenuItem } from '../interfaces/menu.interface';

export default withLayout(function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Title tag="h1">Rating</Title>
      <Rating isEditable rating={rating} setRating={setRating} />
      <Input />
    </>
  );
});

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
  const firstCategory = 0;

  const { data: menu } = await axios.post<unknown, Record<string, MenuItem[]>>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory,
    },
  );

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
