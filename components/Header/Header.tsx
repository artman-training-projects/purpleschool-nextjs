import { HeaderProps } from './Header.props';
import styles from './Header.module.css';

export const Header = ({ tag: Tag, children }: HeaderProps): JSX.Element => {
  return <Tag className={styles[Tag]}>{children}</Tag>;
};
