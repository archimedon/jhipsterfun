/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import InstructionComponentsPage from './instruction.page-object';
import { InstructionDeleteDialog } from './instruction.page-object';
import InstructionUpdatePage from './instruction-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Instruction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let instructionUpdatePage: InstructionUpdatePage;
  let instructionComponentsPage: InstructionComponentsPage;
  /*let instructionDeleteDialog: InstructionDeleteDialog;*/

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

  it('should load Instructions', async () => {
    await navBarPage.getEntityPage('instruction');
    instructionComponentsPage = new InstructionComponentsPage();
    expect(await instructionComponentsPage.getTitle().getText()).to.match(/Instructions/);
  });

  it('should load create Instruction page', async () => {
    await instructionComponentsPage.clickOnCreateButton();
    instructionUpdatePage = new InstructionUpdatePage();
    expect(await instructionUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Instruction/);
  });

  /* it('should create and save Instructions', async () => {
        const nbButtonsBeforeCreate = await instructionComponentsPage.countDeleteButtons();

        await instructionUpdatePage.setTitleInput('title');
        expect(await instructionUpdatePage.getTitleInput()).to.match(/title/);
        await instructionUpdatePage.setInputInput('input');
        expect(await instructionUpdatePage.getInputInput()).to.match(/input/);
        await instructionUpdatePage.inputMimeWrapSelectLastOption();
        await instructionUpdatePage.creatorSelectLastOption();
        // instructionUpdatePage.fileSelectLastOption();
        await waitUntilDisplayed(instructionUpdatePage.getSaveButton());
        await instructionUpdatePage.save();
        await waitUntilHidden(instructionUpdatePage.getSaveButton());
        expect(await instructionUpdatePage.getSaveButton().isPresent()).to.be.false;

        await instructionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await instructionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

  /* it('should delete last Instruction', async () => {
        await instructionComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await instructionComponentsPage.countDeleteButtons();
        await instructionComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        instructionDeleteDialog = new InstructionDeleteDialog();
        expect(await instructionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/jamkingApp.instruction.delete.question/);
        await instructionDeleteDialog.clickOnConfirmButton();

        await instructionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await instructionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
