import { mountSuspended } from '@nuxt/test-utils/runtime';

import App from '~~/app.vue';

describe('submitted', () => {
  it('renders the submitted page', async () => {
    const wrapper = await mountSuspended(App, { route: '/submitted' });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
