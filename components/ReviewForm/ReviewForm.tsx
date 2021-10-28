import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Button, Input, Rating, Textarea } from '..';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({
  productId,
  isOpened,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<unknown, Record<string, IReviewSentResponse>>(
        API.review.createDemo,
        {
          ...formData,
          productId,
        },
      );

      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то опшло не так');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div {...props} className={cn(styles.reviewForm, className)}>
        <Input
          aria-invalid={errors.name ? true : false}
          error={errors.name}
          placeholder="Имя"
          tabIndex={isOpened ? 0 : -1}
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
        />
        <Input
          aria-invalid={errors.title ? true : false}
          className={styles.title}
          error={errors.title}
          placeholder="Заголовок отзыва"
          tabIndex={isOpened ? 0 : -1}
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
        />

        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <Rating
                isEditable
                error={errors.rating}
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
          />
        </div>

        <Textarea
          aria-invalid={errors.description ? true : false}
          aria-label="Текст отзыва"
          className={styles.description}
          placeholder="Текст отзыва"
          tabIndex={isOpened ? 0 : -1}
          {...register('description', { required: { value: true, message: 'Заполните описание' } })}
          error={errors.description}
        />

        <div className={styles.submit}>
          <Button appearance="primary" tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и проверку
          </span>
        </div>
      </div>

      {isSuccess && (
        <div className={cn(styles.panel, styles.success)} role="alert">
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div className={styles.successDescription}>
            Спасибо, ваш отзыв будет опубликован после проверки.
          </div>

          <button
            aria-label="Закрыть оповещение"
            className={styles.close}
            onClick={() => setIsSuccess(false)}
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {error && (
        <div className={cn(styles.panel, styles.error)} role="alert">
          Что-то пошло не так, обновите страницу
          <button
            aria-label="Закрыть оповещение"
            className={styles.close}
            onClick={() => setError('')}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
