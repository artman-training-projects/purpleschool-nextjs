import { KeyboardEvent, useEffect, useState, ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import StarIcon from './star.svg';
import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';

export const Rating = forwardRef(
  (
    { isEditable = false, rating, setRating, error, className, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(() => new Array(5).fill(<></>));

    useEffect(() => {
      constructRating(rating);
    }, [rating]);

    const onclick = (i: number) => {
      if (!isEditable || !setRating) {
        return;
      }

      setRating(i);
    };

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return;
      }

      constructRating(i);
    };

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}
          key={i}
          onClick={() => onclick(i + 1)}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
        >
          <StarIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(evt: KeyboardEvent<SVGAElement>) => isEditable && handleSpace(i + 1, evt)}
          />
        </span>
      ));

      setRatingArray(updatedArray);
    };

    const handleSpace = (i: number, evt: KeyboardEvent<SVGAElement>) => {
      if (evt.code !== 'Space' || !setRating) {
        return;
      }

      setRating(i);
    };

    return (
      <div
        {...props}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
        ref={ref}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}

        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  },
);
