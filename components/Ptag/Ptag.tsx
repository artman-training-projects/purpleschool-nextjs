import cn from 'classnames';
import { PtagProps } from './Ptag.props';
import styles from './Ptag.module.css';

export const Ptag = ({ size = 'm', children, className, ...props }: PtagProps): JSX.Element => {
  return (
    <p {...props} className={cn(styles.p, className, styles[size])}>
      {children}
    </p>
  );
};
