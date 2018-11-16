/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TrackComponentsPage from './track.page-object';
import { TrackDeleteDialog } from './track.page-object';
import TrackUpdatePage from './track-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Track e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let trackUpdatePage: TrackUpdatePage;
  let trackComponentsPage: TrackComponentsPage;
  let trackDeleteDialog: TrackDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();

    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Tracks', async () => {
    await navBarPage.getEntityPage('track');
    trackComponentsPage = new TrackComponentsPage();
    expect(await trackComponentsPage.getTitle().getText()).to.match(/Tracks/);
  });

  it('should load create Track page', async () => {
    await trackComponentsPage.clickOnCreateButton();
    trackUpdatePage = new TrackUpdatePage();
    expect(await trackUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Track/);
  });

  it('should create and save Tracks', async () => {
    const nbButtonsBeforeCreate = await trackComponentsPage.countDeleteButtons();

    await trackUpdatePage.setTitleInput('title');
    expect(await trackUpdatePage.getTitleInput()).to.match(/title/);
    await trackUpdatePage.setDescriptionInput('description');
    expect(await trackUpdatePage.getDescriptionInput()).to.match(/description/);
    // trackUpdatePage.courseSelectLastOption();
    await waitUntilDisplayed(trackUpdatePage.getSaveButton());
    await trackUpdatePage.save();
    await waitUntilHidden(trackUpdatePage.getSaveButton());
    expect(await trackUpdatePage.getSaveButton().isPresent()).to.be.false;

    await trackComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await trackComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Track', async () => {
    await trackComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await trackComponentsPage.countDeleteButtons();
    await trackComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    trackDeleteDialog = new TrackDeleteDialog();
    expect(await trackDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jamkingApp.track.delete.question/);
    await trackDeleteDialog.clickOnConfirmButton();

    await trackComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await trackComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
