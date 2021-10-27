import { KeyboardEvent, useState } from 'react';
import cn from 'classnames';
import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import { Button, Input } from '..';
import GlassIcon from './glass.svg';
import { useRouter } from 'next/dist/client/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      goToSearch();
    }
  };

  return (
    <form {...props} className={cn(styles.search, className)} role="search">
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        appearance="primary"
        aria-label="Искать по сайту"
        className={styles.button}
        onClick={goToSearch}
      >
        <GlassIcon />
      </Button>
    </form>
  );
};
