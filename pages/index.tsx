import { Htag } from '../components';
import { Ptag } from '../components';

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag="h1">Some text</Htag>

      <Ptag size="s">Small text</Ptag>
      <Ptag>Medium text</Ptag>
      <Ptag size="l">Large text</Ptag>
    </div>
  );
}
