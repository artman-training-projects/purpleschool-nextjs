import { useState } from 'react';
import { Header, Rating } from '../components';

export default function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <div>
      <Header tag="h1">Rating</Header>

      <Rating isEditable rating={rating} setRating={setRating} />
    </div>
  );
}
