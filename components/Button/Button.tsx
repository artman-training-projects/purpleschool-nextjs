import { motion } from 'framer-motion';
import cn from 'classnames';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import ArrowIcon from './arrow.svg';

export const Button = ({
  appearance,
  arrow = 'none',
  className,
  children,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
      }}
      {...props}
      className={cn(styles.button, className, styles[appearance])}
    >
      {children}
      {arrow !== 'none' && (
        <span className={cn(styles.arrow, styles[arrow])}>
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  );
};
