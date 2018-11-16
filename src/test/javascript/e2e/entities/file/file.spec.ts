/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FileComponentsPage from './file.page-object';
import { FileDeleteDialog } from './file.page-object';
import FileUpdatePage from './file-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('File e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fileUpdatePage: FileUpdatePage;
  let fileComponentsPage: FileComponentsPage;
  let fileDeleteDialog: FileDeleteDialog;
  const fileToUpload = '../../../../../main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

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

  it('should load Files', async () => {
    await navBarPage.getEntityPage('file');
    fileComponentsPage = new FileComponentsPage();
    expect(await fileComponentsPage.getTitle().getText()).to.match(/Files/);
  });

  it('should load create File page', async () => {
    await fileComponentsPage.clickOnCreateButton();
    fileUpdatePage = new FileUpdatePage();
    expect(await fileUpdatePage.getPageTitle().getText()).to.match(/Create or edit a File/);
  });

  it('should create and save Files', async () => {
    const nbButtonsBeforeCreate = await fileComponentsPage.countDeleteButtons();

    await fileUpdatePage.setNameInput('name');
    expect(await fileUpdatePage.getNameInput()).to.match(/name/);
    await fileUpdatePage.categorySelectLastOption();
    await fileUpdatePage.setUrlInput('url');
    expect(await fileUpdatePage.getUrlInput()).to.match(/url/);
    await fileUpdatePage.setDataInput(absolutePath);
    await waitUntilDisplayed(fileUpdatePage.getSaveButton());
    await fileUpdatePage.save();
    await waitUntilHidden(fileUpdatePage.getSaveButton());
    expect(await fileUpdatePage.getSaveButton().isPresent()).to.be.false;

    await fileComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await fileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last File', async () => {
    await fileComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await fileComponentsPage.countDeleteButtons();
    await fileComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    fileDeleteDialog = new FileDeleteDialog();
    expect(await fileDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jamkingApp.file.delete.question/);
    await fileDeleteDialog.clickOnConfirmButton();

    await fileComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await fileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
