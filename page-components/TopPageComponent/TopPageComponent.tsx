import { Advantages, HhData, Product, Sort, Tag, Title } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';

export function TopPageComponent({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
    products,
    sort: SortEnum.Rating,
  });

  const setSort = (sort: SortEnum): void => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Title tag="h1">{page.title}</Title>
        {products && (
          <Tag color="grey" size="m">
            {products.length}
          </Tag>
        )}
        <Sort setSort={setSort} sort={sort} />
      </div>

      <div>
        {sortedProducts && sortedProducts.map((p) => <Product layout key={p._id} product={p} />)}
      </div>

      <div className={styles.hhTitle}>
        <Title tag="h2">Вакансии - {page.category}</Title>
        {products && (
          <Tag color="red" size="m">
            hh.ru
          </Tag>
        )}
      </div>

      {firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}

      {page.advantages && page.advantages.length > 0 && (
        <>
          <Title tag="h2">Преимущества</Title>
          <Advantages advantages={page.advantages} />
        </>
      )}

      {page.seoText && (
        <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />
      )}

      <Title tag="h2">Получаемые навыки</Title>
      {page.tags.map((t) => (
        <Tag color="primary" key={t}>
          {t}
        </Tag>
      ))}
    </div>
  );
}
