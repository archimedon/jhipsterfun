/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import QuestionComponentsPage from './question.page-object';
import { QuestionDeleteDialog } from './question.page-object';
import QuestionUpdatePage from './question-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Question e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questionUpdatePage: QuestionUpdatePage;
  let questionComponentsPage: QuestionComponentsPage;
  /*let questionDeleteDialog: QuestionDeleteDialog;*/

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

  it('should load Questions', async () => {
    await navBarPage.getEntityPage('question');
    questionComponentsPage = new QuestionComponentsPage();
    expect(await questionComponentsPage.getTitle().getText()).to.match(/Questions/);
  });

  it('should load create Question page', async () => {
    await questionComponentsPage.clickOnCreateButton();
    questionUpdatePage = new QuestionUpdatePage();
    expect(await questionUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Question/);
  });

  /* it('should create and save Questions', async () => {
        const nbButtonsBeforeCreate = await questionComponentsPage.countDeleteButtons();

        await questionUpdatePage.setAskInput('ask');
        expect(await questionUpdatePage.getAskInput()).to.match(/ask/);
        await questionUpdatePage.setMinNumOptionsInput('5');
        expect(await questionUpdatePage.getMinNumOptionsInput()).to.eq('5');
        // questionUpdatePage.fileSelectLastOption();
        await waitUntilDisplayed(questionUpdatePage.getSaveButton());
        await questionUpdatePage.save();
        await waitUntilHidden(questionUpdatePage.getSaveButton());
        expect(await questionUpdatePage.getSaveButton().isPresent()).to.be.false;

        await questionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await questionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

  /* it('should delete last Question', async () => {
        await questionComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await questionComponentsPage.countDeleteButtons();
        await questionComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        questionDeleteDialog = new QuestionDeleteDialog();
        expect(await questionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jamkingApp.question.delete.question/);
        await questionDeleteDialog.clickOnConfirmButton();

        await questionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await questionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
