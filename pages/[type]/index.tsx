import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { withLayout } from '../../layout/Layout';
import { firstLevelMenu } from '../../helpers/helpers';

export default withLayout(function Type({ firstCategory }: TypeProps): JSX.Element {
  return <>Type:{firstCategory}</>;
});

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: firstLevelMenu.map((m) => `/${m.route}`),
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<GetStaticPropsResult<TypeProps>> {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = firstLevelMenu.find((m) => m.route == params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  const { data: menu } = await axios.post<unknown, Record<string, MenuItem[]>>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory: firstCategoryItem.id,
    },
  );

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
    },
  };
}

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
