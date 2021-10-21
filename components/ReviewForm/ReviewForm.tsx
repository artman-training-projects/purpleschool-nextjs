import cn from 'classnames';
import { Button, Input, Rating, Textarea } from '..';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  return (
    <>
      <div {...props} className={cn(styles.reviewForm, className)}>
        <Input placeholder="Имя" />
        <Input className={styles.title} placeholder="Заголовок отзыва" />

        <div className={styles.rating}>
          <span>Оценка:</span>
          <Rating rating={0} />
        </div>

        <Textarea className={styles.description} placeholder="Текст отзыва" />

        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и проверку
          </span>
        </div>
      </div>

      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div className={styles.successDescription}>
          Спасибо, ваш отзыв будет опубликован после проверки.
        </div>

        <CloseIcon className={styles.close} />
      </div>
    </>
  );
};
