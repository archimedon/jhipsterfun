import { element, by, ElementFinder } from 'protractor';

export default class AnswerUpdatePage {
  pageTitle: ElementFinder = element(by.id('jamkingApp.answer.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  positInput: ElementFinder = element(by.css('input#answer-posit'));
  correctInput: ElementFinder = element(by.css('input#answer-correct'));
  usePositWithFileInput: ElementFinder = element(by.css('input#answer-usePositWithFile'));
  fileSelect: ElementFinder = element(by.css('select#answer-file'));
  questionSelect: ElementFinder = element(by.css('select#answer-question'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPositInput(posit) {
    await this.positInput.sendKeys(posit);
  }

  async getPositInput() {
    return this.positInput.getAttribute('value');
  }

  getCorrectInput() {
    return this.correctInput;
  }
  getUsePositWithFileInput() {
    return this.usePositWithFileInput;
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

  async questionSelectLastOption() {
    await this.questionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async questionSelectOption(option) {
    await this.questionSelect.sendKeys(option);
  }

  getQuestionSelect() {
    return this.questionSelect;
  }

  async getQuestionSelectedOption() {
    return this.questionSelect.element(by.css('option:checked')).getText();
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
