import { element, by, ElementFinder } from 'protractor';

export default class FileUpdatePage {
  pageTitle: ElementFinder = element(by.id('jamkingApp.file.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#file-name'));
  categorySelect: ElementFinder = element(by.css('select#file-category'));
  urlInput: ElementFinder = element(by.css('input#file-url'));
  dataInput: ElementFinder = element(by.css('input#file_data'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setCategorySelect(category) {
    await this.categorySelect.sendKeys(category);
  }

  async getCategorySelect() {
    return this.categorySelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption() {
    await this.categorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setUrlInput(url) {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  async setDataInput(data) {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput() {
    return this.dataInput.getAttribute('value');
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
