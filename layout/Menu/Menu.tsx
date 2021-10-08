import { useContext, useEffect } from 'react';
import cn from 'classnames';
import { AppContext } from '../../contex/app.context';
import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);

  return (
    <div className={cn(styles.menu)}>
      <ul>
        {menu.map((m) => (
          <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
        ))}
      </ul>
    </div>
  );
};
