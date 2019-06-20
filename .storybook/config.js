import { configure,addDecorator} from '@storybook/react';
import StoryRouter from 'storybook-react-router'; //React Router Wrapper to be able to use react Router on components



function loadStories() {
  require('../src/comps/Button.stories.js');
  require('../src/comps/EntityForm.stories.js');
  require('../src/comps/EForm.stories.js');
  require('../src/comps/EFormAdd.stories.js');
  require('../src/comps/EFormRead.stories.js');
  require('../src/comps/EntityBrowser.stories.js');
  require('../src/comps/EBread.stories.js');
  // You can require as many stories as you need.
}
addDecorator(StoryRouter());
configure(loadStories, module);