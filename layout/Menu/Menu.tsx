import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
import cn from 'classnames';
import { AppContext } from '../../contex/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
  const router = useRouter();
  const { menu, setMenu, firstCategory } = useContext(AppContext);

  const openSecondLevel = (secondCategory: string) => {
    setMenu?.(
      menu.map((m) => ({
        ...m,
        isOpened: m._id.secondCategory === secondCategory && !m.isOpened,
      })),
    );
  };

  const buildFirstLevel = () => (
    <>
      {firstLevelMenu.map((m) => (
        <div key={m.route}>
          <Link href={`/${m.route}`}>
            <a>
              <div
                className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: m.id === firstCategory,
                })}
              >
                {m.icon}
                <span>{m.name}</span>
              </div>
            </a>
          </Link>

          {m.id === firstCategory && buildSecondLevel(m)}
        </div>
      ))}
    </>
  );

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => (
    <div className={cn(styles.secondBlock)}>
      {menu.map((m) => {
        if (m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
          m.isOpened = true;
        }

        return (
          <div key={m._id.secondCategory}>
            <div
              className={cn(styles.secondLevel)}
              onClick={() => openSecondLevel(m._id.secondCategory)}
            >
              {m._id.secondCategory}
            </div>
            <div
              className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpened]: m.isOpened,
              })}
            >
              {buildFThirdLevel(m.pages, menuItem.route)}
            </div>
          </div>
        );
      })}
    </div>
  );

  const buildFThirdLevel = (pages: PageItem[], route: string) =>
    pages.map((p) => (
      <Link href={`/${route}/${p.alias}`} key={p.title}>
        <a
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath,
          })}
        >
          {p.category}
        </a>
      </Link>
    ));

  return <div className={cn(styles.menu)}>{buildFirstLevel()}</div>;
};
