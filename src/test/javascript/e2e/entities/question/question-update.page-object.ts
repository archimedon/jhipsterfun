import { element, by, ElementFinder } from 'protractor';

export default class QuestionUpdatePage {
  pageTitle: ElementFinder = element(by.id('jamkingApp.question.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  askInput: ElementFinder = element(by.css('input#question-ask'));
  answersAsSelect: ElementFinder = element(by.css('select#question-answersAs'));
  minNumOptionsInput: ElementFinder = element(by.css('input#question-minNumOptions'));
  fileSelect: ElementFinder = element(by.css('select#question-file'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAskInput(ask) {
    await this.askInput.sendKeys(ask);
  }

  async getAskInput() {
    return this.askInput.getAttribute('value');
  }

  async setAnswersAsSelect(answersAs) {
    await this.answersAsSelect.sendKeys(answersAs);
  }

  async getAnswersAsSelect() {
    return this.answersAsSelect.element(by.css('option:checked')).getText();
  }

  async answersAsSelectLastOption() {
    await this.answersAsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setMinNumOptionsInput(minNumOptions) {
    await this.minNumOptionsInput.sendKeys(minNumOptions);
  }

  async getMinNumOptionsInput() {
    return this.minNumOptionsInput.getAttribute('value');
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
