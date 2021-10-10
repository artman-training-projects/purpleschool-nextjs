import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import axios from 'axios';
import { withLayout } from '../../layout/Layout';
import { firstLevelMenu } from '../../helpers/helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';

export default withLayout(function Course({ menu, page, products }: CourseProps): JSX.Element {
  return <>{products && products.length}</>;
});

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<unknown, Record<string, MenuItem[]>>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
      {
        firstCategory: m.id,
      },
    );
    paths = paths.concat(menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`)));
  }

  return {
    paths,
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

  const firstCategoryItem = firstLevelMenu.find((m) => m.route == params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  try {
    const { data: menu } = await axios.post<unknown, Record<string, MenuItem[]>>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
      {
        firstCategory: firstCategoryItem.id,
      },
    );

    if (menu.length == 0) {
      return {
        notFound: true,
      };
    }

    const { data: page } = await axios.get<TopPageModel>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias,
    );

    const { data: products } = await axios.post<unknown, Record<string, ProductModel[]>>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
      {
        category: page.category,
        limit: 10,
      },
    );

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
