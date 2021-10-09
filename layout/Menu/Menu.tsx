import { useContext } from 'react';
import cn from 'classnames';
import { AppContext } from '../../contex/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';

import styles from './Menu.module.css';
import CoursesIcon from './icons/courses.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import ServicesIcon from './icons/services.svg';
import { TopLevelCategory } from '../../interfaces/page.interface';

const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: 'services',
    name: 'Сервисы',
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: 'books',
    name: 'Книги',
    icon: <BooksIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: 'products',
    name: 'Продукты',
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products,
  },
];

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);

  const buildFirstLevel = () => (
    <>
      {firstLevelMenu.map((m) => (
        <div key={m.route}>
          <a href={`/${m.route}`}>
            <div
              className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: m.id === firstCategory,
              })}
            >
              {m.icon}
              <span>{m.name}</span>
            </div>
          </a>

          {m.id === firstCategory && buildSecondLevel(m)}
        </div>
      ))}
    </>
  );

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => (
    <div className={cn(styles.secondBlock)}>
      {menu.map((m) => (
        <div key={m._id.secondCategory}>
          <div className={cn(styles.secondLevel)}>{m._id.secondCategory}</div>
          <div
            className={cn(styles.secondLevelBlock, {
              [styles.secondLevelBlockOpened]: m.isOpened,
            })}
          >
            {buildFThirdLevel(m.pages, menuItem.route)}
          </div>
        </div>
      ))}
    </div>
  );

  const buildFThirdLevel = (pages: PageItem[], route: string) =>
    pages.map((p) => (
      <a
        className={cn(styles.thirdLevel, {
          [styles.thirdLevelActive]: false,
        })}
        href={`/${route}/${p.alias}`}
        key={p.title}
      >
        {p.category}
      </a>
    ));

  return <div className={cn(styles.menu)}>{buildFirstLevel()}</div>;
};
