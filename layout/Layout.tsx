import { FunctionComponent, KeyboardEvent, useRef, useState } from 'react';
import cn from 'classnames';
import { LayoutProps } from './Layout.props';
import { AppContextProvider, IAppContext } from '../contex/app.context';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import styles from './Layout.module.css';
import { Up } from '../components';

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === 'Space' || key.code === ' Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }

    setIsSkipLinkDisplayed(false);
  };

  return (
    <div className={styles.wrapper}>
      <a
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed,
        })}
        tabIndex={1}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipContentAction}
      >
        К содержанию
      </a>

      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} role="main" tabIndex={0}>
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>,
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider firstCategory={props.firstCategory} menu={props.menu}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
