/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LessonComponentsPage from './lesson.page-object';
import { LessonDeleteDialog } from './lesson.page-object';
import LessonUpdatePage from './lesson-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Lesson e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let lessonUpdatePage: LessonUpdatePage;
  let lessonComponentsPage: LessonComponentsPage;
  /*let lessonDeleteDialog: LessonDeleteDialog;*/

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

  it('should load Lessons', async () => {
    await navBarPage.getEntityPage('lesson');
    lessonComponentsPage = new LessonComponentsPage();
    expect(await lessonComponentsPage.getTitle().getText()).to.match(/Lessons/);
  });

  it('should load create Lesson page', async () => {
    await lessonComponentsPage.clickOnCreateButton();
    lessonUpdatePage = new LessonUpdatePage();
    expect(await lessonUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Lesson/);
  });

  /* it('should create and save Lessons', async () => {
        const nbButtonsBeforeCreate = await lessonComponentsPage.countDeleteButtons();

        await lessonUpdatePage.setTitleInput('title');
        expect(await lessonUpdatePage.getTitleInput()).to.match(/title/);
        await lessonUpdatePage.setDescriptionInput('description');
        expect(await lessonUpdatePage.getDescriptionInput()).to.match(/description/);
        await lessonUpdatePage.setMinNumQuestionsInput('5');
        expect(await lessonUpdatePage.getMinNumQuestionsInput()).to.eq('5');
        await lessonUpdatePage.authorSelectLastOption();
        // lessonUpdatePage.instructionSelectLastOption();
        // lessonUpdatePage.questionSelectLastOption();
        await waitUntilDisplayed(lessonUpdatePage.getSaveButton());
        await lessonUpdatePage.save();
        await waitUntilHidden(lessonUpdatePage.getSaveButton());
        expect(await lessonUpdatePage.getSaveButton().isPresent()).to.be.false;

        await lessonComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await lessonComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

  /* it('should delete last Lesson', async () => {
        await lessonComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await lessonComponentsPage.countDeleteButtons();
        await lessonComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        lessonDeleteDialog = new LessonDeleteDialog();
        expect(await lessonDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jamkingApp.lesson.delete.question/);
        await lessonDeleteDialog.clickOnConfirmButton();

        await lessonComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await lessonComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
