import { useState } from 'react';
import { withLayout } from '../layout/Layout';
import { Title, Rating } from '../components';

export default withLayout(function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Title tag="h1">Rating</Title>

      <Rating isEditable rating={rating} setRating={setRating} />
    </>
  );
});
