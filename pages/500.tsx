import { withLayout } from '../layout/Layout';
import { Title } from '../components';

export default withLayout(function Error500(): JSX.Element {
  return (
    <>
      <Title tag="h1">Ошибка 500</Title>
    </>
  );
});
