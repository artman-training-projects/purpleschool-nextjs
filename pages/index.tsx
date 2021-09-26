import { Htag } from '../components';
import { Button } from '../components';

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag="h1">Some text</Htag>

      <Button appearance="ghost">ghost</Button>
      <Button appearance="primary">primary</Button>
    </div>
  );
}
