import { Header, Tag } from '../components';

export default function Home(): JSX.Element {
  return (
    <div>
      <Header tag="h1">Some text</Header>

      <Tag>Small text</Tag>
      <Tag color="green">Small text</Tag>
      <Tag color="grey">Small text</Tag>
      <Tag color="red" size="s">
        Small text
      </Tag>
      <Tag color="primary" size="s">
        Small text
      </Tag>
    </div>
  );
}
