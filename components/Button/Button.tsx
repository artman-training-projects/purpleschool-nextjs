import cn from 'classnames';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

export const Button = ({ appearance, className, children, ...props }: ButtonProps): JSX.Element => {
  return (
    <button {...props} className={cn(styles.button, className, styles[appearance])}>
      {children}
    </button>
  );
};
