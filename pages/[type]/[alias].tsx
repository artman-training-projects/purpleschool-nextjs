import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'node:querystring';
import axios from 'axios';
import { withLayout } from '../../layout/Layout';
import { firstLevelMenu } from '../../helpers/helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { TopPageComponent } from '../../page-components';
import { API } from '../../helpers/api';

export default withLayout(function TopPage({
  firstCategory,
  page,
  products,
}: TopPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta content={page.metaDescription} name="description" />

        <meta content={page.metaTitle} property="og:title" />
        <meta content={page.metaDescription} property="og:description" />
        <meta content="article" property="og:type" />
      </Head>

      <TopPageComponent firstCategory={firstCategory} page={page} products={products} />
    </>
  );
});

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<unknown, Record<string, MenuItem[]>>(API.topPage.find, {
      firstCategory: m.id,
    });
    paths = paths.concat(menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`)));
  }

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<GetStaticPropsResult<TopPageProps>> {
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
    const { data: menu } = await axios.post<unknown, Record<string, MenuItem[]>>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    });

    if (menu.length == 0) {
      return {
        notFound: true,
      };
    }

    const { data: page } = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);

    const { data: products } = await axios.post<unknown, Record<string, ProductModel[]>>(
      API.product.find,
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

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
