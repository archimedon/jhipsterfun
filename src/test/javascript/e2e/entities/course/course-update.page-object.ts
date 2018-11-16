import { element, by, ElementFinder } from 'protractor';

export default class CourseUpdatePage {
  pageTitle: ElementFinder = element(by.id('jamkingApp.course.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#course-title'));
  descriptionInput: ElementFinder = element(by.css('textarea#course-description'));
  userSelect: ElementFinder = element(by.css('select#course-user'));
  lessonSelect: ElementFinder = element(by.css('select#course-lesson'));

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

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async lessonSelectLastOption() {
    await this.lessonSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async lessonSelectOption(option) {
    await this.lessonSelect.sendKeys(option);
  }

  getLessonSelect() {
    return this.lessonSelect;
  }

  async getLessonSelectedOption() {
    return this.lessonSelect.element(by.css('option:checked')).getText();
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
