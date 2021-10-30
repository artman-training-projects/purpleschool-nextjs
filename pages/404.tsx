import { withLayout } from '../layout/Layout';
import { Title } from '../components';

export function Error404(): JSX.Element {
  return (
    <>
      <Title tag="h1">Ошибка 404</Title>
    </>
  );
}

export default withLayout(Error404);
