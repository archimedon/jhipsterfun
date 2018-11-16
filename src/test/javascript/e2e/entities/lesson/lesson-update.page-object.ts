import { element, by, ElementFinder } from 'protractor';

export default class LessonUpdatePage {
  pageTitle: ElementFinder = element(by.id('jamkingApp.lesson.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#lesson-title'));
  descriptionInput: ElementFinder = element(by.css('textarea#lesson-description'));
  minNumQuestionsInput: ElementFinder = element(by.css('input#lesson-minNumQuestions'));
  authorSelect: ElementFinder = element(by.css('select#lesson-author'));
  instructionSelect: ElementFinder = element(by.css('select#lesson-instruction'));
  questionSelect: ElementFinder = element(by.css('select#lesson-question'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setMinNumQuestionsInput(minNumQuestions) {
    await this.minNumQuestionsInput.sendKeys(minNumQuestions);
  }

  async getMinNumQuestionsInput() {
    return this.minNumQuestionsInput.getAttribute('value');
  }

  async authorSelectLastOption() {
    await this.authorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async authorSelectOption(option) {
    await this.authorSelect.sendKeys(option);
  }

  getAuthorSelect() {
    return this.authorSelect;
  }

  async getAuthorSelectedOption() {
    return this.authorSelect.element(by.css('option:checked')).getText();
  }

  async instructionSelectLastOption() {
    await this.instructionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async instructionSelectOption(option) {
    await this.instructionSelect.sendKeys(option);
  }

  getInstructionSelect() {
    return this.instructionSelect;
  }

  async getInstructionSelectedOption() {
    return this.instructionSelect.element(by.css('option:checked')).getText();
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
