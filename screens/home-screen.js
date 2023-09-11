class HomeScreen {
  //=======================================Elements===========================================//
  get quickTaskField() {
    return $("android.widget.EditText");
  }

  get addQuickTaskButton() {
    const addTaskButtons = $$("~Add Task");
    return addTaskButtons[1];
  }

  get moreOptionsDropDown() {
    const moreOptionsDropDown = $("~More options");
    return moreOptionsDropDown;
  }

  async optionFromOveflowMenu(option) {
    const selector = `new UiSelector().className("android.widget.TextView").text("${option}")`;
    await $(`android=${selector}`).waitForExist();

    const menuOption = $(`android=${selector}`);
    return menuOption;
  }

  get createTaskButton() {
    const addTaskButton = $("~Add Task");
    return addTaskButton;
  }

  get listsDropDown() {
    return $("android.widget.Spinner");
  }

  async taskFromTheList(taskText) {
    const selector = `new UiSelector().className("android.widget.TextView").text("${taskText}")`;
    await $(`android=${selector}`).waitForExist();
    const task = $(`android=${selector}`);
    return task;
  }

  async taskDueDate(dueDate) {
    const parentSelector = `new UiSelector().className("android.widget.LinearLayout")`;
    await $(`android=${parentSelector}`).waitForExist();
    const allTaskElements = $$(`android=${parentSelector}`); // $$ for selecting multiple elements

    // Select the first element (index 0) from the array
    const taskElement = allTaskElements[0];

    // Find a child element within the parent using UiSelector
    const childSelector = `new UiSelector().className("android.widget.TextView").text("${dueDate}")`;
    await taskElement.$(`android=${childSelector}`).waitForExist();
    const dueDateElement = taskElement.$(`android=${childSelector}`);

    return dueDateElement;
  }

  async screenTitle(screenTitle) {
    const selector = `new UiSelector().className("android.widget.TextView").text("${screenTitle}")`;
    await $(`android=${selector}`).waitForExist();
    const title = $(`android=${selector}`);
    return title;
  }

  async listOptionFromListDDM(listName) {
    const selector = `new UiSelector().className("android.widget.TextView").text("${listName}")`;
    await $(`android=${selector}`).waitForExist();

    const list = $(`android=${selector}`);
    return list;
  }

  get enterListNameField() {
    return $("android.widget.EditText");
  }

  async addButton() {
    const selector = `new UiSelector().className("android.widget.Button").text("ADD")`;
    await $(`android=${selector}`).waitForExist();

    const addBtn = $(`android=${selector}`);
    return addBtn;
  }
  async cancelButton() {
    const selector = `new UiSelector().className("android.widget.Button").text("CANCEL")`;
    await $(`android=${selector}`).waitForExist();

    const cancelBtn = $(`android=${selector}`);
    return cancelBtn;
  }

  //=======================================Actions===========================================//

  async typeQuickTask(taskText) {
    await this.quickTaskField.setValue(taskText);
  }

  async typeListName(listName) {
    await this.enterListNameField.setValue(listName);
  }

  async clickOnAddQuickTaskButton() {
    await this.addQuickTaskButton.click();
  }

  async openMoreOptionsDropDown() {
    await this.moreOptionsDropDown.click();
  }

  async clickOnAddTaskButton() {
    await this.createTaskButton.click();
  }

  async clickOnTask(taskText) {
    const taskElement = await this.taskFromTheList(taskText);
    await taskElement.click();
  }

  async selectListOptionFromDDM(listName) {
    const list = await this.listOptionFromListDDM(listName);
    await list.click();
  }

  async selectOptionFromOverflowMenu(option) {
    const menuOption = await this.optionFromOveflowMenu(option);
    await menuOption.click();
  }

  async openListsDropDown() {
    const dropdown = await this.listsDropDown;
    await dropdown.click();
  }

  async clickOnAddButton() {
    const addBtn = await this.addButton();
    await addBtn.click();
  }

  async clickOnCancelButton() {
    const cancelBtn = await this.cancelButton();
    await cancelBtn.click();
  }

  //=======================================Assertions===========================================//
  async verifyThatTaskIsNotDisplayed(taskText) {
    const selector = `new UiSelector().className("android.widget.TextView").text("${taskText}")`;
    await $(`android=${selector}`).waitForExist({ reverse: true });
    const task = $(`android=${selector}`);
    return task;
  }

  async verifyThatTaskIsDisplayed(taskDescription) {
    const selector = `new UiSelector().className("android.widget.TextView").text("${taskDescription}")`;
    await $(`android=${selector}`).waitForExist();
    const task = $(`android=${selector}`);
    return task;
  }

  async verifyThatAllListsDropDownIsDisplayed() {
    const allListsTitle = await this.listsDropDown;
    const titleExist = await allListsTitle.waitForExist({ timeout: 5000 });
    await expect(titleExist).toBe(true, "Element exists as expected");
  }

  get verifyThatHomeScreenIsDisplayed() {
    return $("android.widget.Spinner");
  }
}
module.exports = new HomeScreen();
