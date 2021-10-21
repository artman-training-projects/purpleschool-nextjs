import { GetStaticPropsResult } from 'next';
import { useState } from 'react';
import axios from 'axios';
import { withLayout } from '../layout/Layout';
import { Title, Rating, Input, Textarea } from '../components';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

export default withLayout(function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Title tag="h1">Rating</Title>
      <Rating isEditable rating={rating} setRating={setRating} />
      <Input />
      <Textarea />
    </>
  );
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
