import { storiesOf } from '@storybook/react';
import attributes from './attributes.json';
import { StoryWrapper } from '../../src/components/StoryWrapper/StoryWrapper';
import { newnav } from './newnav';

storiesOf('newnav', module).add('newnav', () => (
  <StoryWrapper attributes={attributes} component={newnav} />
));