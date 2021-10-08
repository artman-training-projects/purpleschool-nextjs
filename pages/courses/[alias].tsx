import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { withLayout } from '../../layout/Layout';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';

export default withLayout(function Course({ menu, page, products }: CourseProps): JSX.Element {
  return <>{products && products.length}</>;
});

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const firstCategory = 0;

  const { data: menu } = await axios.post<MenuItem[], Record<string, MenuItem[]>>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory,
    },
  );

  return {
    paths: menu.flatMap((m) => m.pages.map((p) => '/courses/' + p.alias)),
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<GetStaticPropsResult<CourseProps>> {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategory = 0;

  const { data: menu } = await axios.post<MenuItem[], Record<string, MenuItem[]>>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory,
    },
  );

  const { data: page } = await axios.get<TopPageModel>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias,
  );

  const { data: products } = await axios.post<ProductModel[], Record<string, ProductModel[]>>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
    {
      category: page.category,
      limit: 10,
    },
  );

  return {
    props: {
      firstCategory,
      menu,
      page,
      products,
    },
  };
}

interface CourseProps extends Record<string, unknown> {
  firstCategory: number;
  menu: MenuItem[];
  page: TopPageModel;
  products: ProductModel[];
}
