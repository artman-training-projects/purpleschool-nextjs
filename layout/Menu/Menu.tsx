import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { KeyboardEvent, useContext } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { AppContext } from '../../contex/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
  const router = useRouter();
  const { menu, setMenu, firstCategory } = useContext(AppContext);

  const variantsSecondLevel = {
    visible: {
      marginBottom: 20,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    hidden: {
      marginBottom: 0,
    },
  };

  const variantsThirdLevel = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu?.(
      menu.map((m) => ({
        ...m,
        isOpened: m._id.secondCategory === secondCategory && !m.isOpened,
      })),
    );
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Space' || key.code === ' Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
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
              tabIndex={0}
              onClick={() => openSecondLevel(m._id.secondCategory)}
              onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
            >
              {m._id.secondCategory}
            </div>

            <motion.div
              layout
              animate={m.isOpened ? 'visible' : 'hidden'}
              className={cn(styles.secondLevelBlock)}
              initial={m.isOpened ? 'visible' : 'hidden'}
              variants={variantsSecondLevel}
            >
              {buildFThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
            </motion.div>
          </div>
        );
      })}
    </div>
  );

  const buildFThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) =>
    pages.map((p) => (
      <motion.div key={p.title} variants={variantsThirdLevel}>
        <Link href={`/${route}/${p.alias}`}>
          <a
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath,
            })}
            tabIndex={isOpened ? 0 : -1}
          >
            {p.category}
          </a>
        </Link>
      </motion.div>
    ));

  return (
    <nav className={cn(styles.menu)} role="navigation">
      {buildFirstLevel()}
    </nav>
  );
};
