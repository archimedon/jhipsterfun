import { element, by, ElementFinder } from 'protractor';

export default class InstructionUpdatePage {
  pageTitle: ElementFinder = element(by.id('jamkingApp.instruction.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#instruction-title'));
  inputInput: ElementFinder = element(by.css('textarea#instruction-input'));
  inputMimeWrapSelect: ElementFinder = element(by.css('select#instruction-inputMimeWrap'));
  creatorSelect: ElementFinder = element(by.css('select#instruction-creator'));
  fileSelect: ElementFinder = element(by.css('select#instruction-file'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setInputInput(input) {
    await this.inputInput.sendKeys(input);
  }

  async getInputInput() {
    return this.inputInput.getAttribute('value');
  }

  async setInputMimeWrapSelect(inputMimeWrap) {
    await this.inputMimeWrapSelect.sendKeys(inputMimeWrap);
  }

  async getInputMimeWrapSelect() {
    return this.inputMimeWrapSelect.element(by.css('option:checked')).getText();
  }

  async inputMimeWrapSelectLastOption() {
    await this.inputMimeWrapSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async creatorSelectLastOption() {
    await this.creatorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async creatorSelectOption(option) {
    await this.creatorSelect.sendKeys(option);
  }

  getCreatorSelect() {
    return this.creatorSelect;
  }

  async getCreatorSelectedOption() {
    return this.creatorSelect.element(by.css('option:checked')).getText();
  }

  async fileSelectLastOption() {
    await this.fileSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async fileSelectOption(option) {
    await this.fileSelect.sendKeys(option);
  }

  getFileSelect() {
    return this.fileSelect;
  }

  async getFileSelectedOption() {
    return this.fileSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
