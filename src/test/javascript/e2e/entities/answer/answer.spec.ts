/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AnswerComponentsPage from './answer.page-object';
import { AnswerDeleteDialog } from './answer.page-object';
import AnswerUpdatePage from './answer-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Answer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let answerUpdatePage: AnswerUpdatePage;
  let answerComponentsPage: AnswerComponentsPage;
  /*let answerDeleteDialog: AnswerDeleteDialog;*/

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

  it('should load Answers', async () => {
    await navBarPage.getEntityPage('answer');
    answerComponentsPage = new AnswerComponentsPage();
    expect(await answerComponentsPage.getTitle().getText()).to.match(/Answers/);
  });

  it('should load create Answer page', async () => {
    await answerComponentsPage.clickOnCreateButton();
    answerUpdatePage = new AnswerUpdatePage();
    expect(await answerUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Answer/);
  });

  /* it('should create and save Answers', async () => {
        const nbButtonsBeforeCreate = await answerComponentsPage.countDeleteButtons();

        await answerUpdatePage.setPositInput('posit');
        expect(await answerUpdatePage.getPositInput()).to.match(/posit/);
        const selectedCorrect = await answerUpdatePage.getCorrectInput().isSelected();
        if (selectedCorrect) {
            await answerUpdatePage.getCorrectInput().click();
            expect(await answerUpdatePage.getCorrectInput().isSelected()).to.be.false;
        } else {
            await answerUpdatePage.getCorrectInput().click();
            expect(await answerUpdatePage.getCorrectInput().isSelected()).to.be.true;
        }
        const selectedUsePositWithFile = await answerUpdatePage.getUsePositWithFileInput().isSelected();
        if (selectedUsePositWithFile) {
            await answerUpdatePage.getUsePositWithFileInput().click();
            expect(await answerUpdatePage.getUsePositWithFileInput().isSelected()).to.be.false;
        } else {
            await answerUpdatePage.getUsePositWithFileInput().click();
            expect(await answerUpdatePage.getUsePositWithFileInput().isSelected()).to.be.true;
        }
        // answerUpdatePage.fileSelectLastOption();
        await answerUpdatePage.questionSelectLastOption();
        await waitUntilDisplayed(answerUpdatePage.getSaveButton());
        await answerUpdatePage.save();
        await waitUntilHidden(answerUpdatePage.getSaveButton());
        expect(await answerUpdatePage.getSaveButton().isPresent()).to.be.false;

        await answerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await answerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

  /* it('should delete last Answer', async () => {
        await answerComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await answerComponentsPage.countDeleteButtons();
        await answerComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        answerDeleteDialog = new AnswerDeleteDialog();
        expect(await answerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jamkingApp.answer.delete.question/);
        await answerDeleteDialog.clickOnConfirmButton();

        await answerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await answerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
