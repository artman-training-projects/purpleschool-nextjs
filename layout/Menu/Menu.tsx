import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
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
            <motion.div
              layout
              animate={m.isOpened ? 'visible' : 'hidden'}
              className={cn(styles.secondLevelBlock)}
              initial={m.isOpened ? 'visible' : 'hidden'}
              variants={variantsSecondLevel}
            >
              {buildFThirdLevel(m.pages, menuItem.route)}
            </motion.div>
          </div>
        );
      })}
    </div>
  );

  const buildFThirdLevel = (pages: PageItem[], route: string) =>
    pages.map((p) => (
      <motion.div key={p.title} variants={variantsThirdLevel}>
        <Link href={`/${route}/${p.alias}`}>
          <a
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath,
            })}
          >
            {p.category}
          </a>
        </Link>
      </motion.div>
    ));

  return <div className={cn(styles.menu)}>{buildFirstLevel()}</div>;
};
