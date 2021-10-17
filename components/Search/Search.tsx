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
    <div {...props} className={cn(styles.search, className)}>
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button appearance="primary" className={styles.button} onClick={goToSearch}>
        <GlassIcon />
      </Button>
    </div>
  );
};
