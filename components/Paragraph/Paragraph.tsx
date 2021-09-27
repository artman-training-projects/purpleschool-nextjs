import cn from 'classnames';
import { ParagraphProps } from './Paragraph.props';
import styles from './Paragraph.module.css';

export const Paragraph = ({
  size = 'm',
  children,
  className,
  ...props
}: ParagraphProps): JSX.Element => {
  return (
    <p {...props} className={cn(styles.p, className, styles[size])}>
      {children}
    </p>
  );
};
