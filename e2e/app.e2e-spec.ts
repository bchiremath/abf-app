import { AbfAppPage } from './app.po';

describe('abf-app App', () => {
  let page: AbfAppPage;

  beforeEach(() => {
    page = new AbfAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
