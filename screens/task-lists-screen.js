class TaskListsScreen {
  // ==================================Elements=====================================//
  get addListButton() {
    const addListButton = $("~New List");
    return addListButton;
  }

  async taskList(listName) {
    const list = await $(
      `//android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[contains(@text, '${listName}')]`
    );

    return list;
  }

  async editListButton() {
    const editButton = await $$("~Edit")[1];
    return editButton;
  }

  async deleteListButton() {
    const deleteButton = await $$("~Delete")[1];
    return deleteButton;
  }

  async cancelButton() {
    const selector = `new UiSelector().className("android.widget.Button").text("CANCEL")`;
    await $(`android=${selector}`).waitForExist();

    const cancelBtn = $(`android=${selector}`);
    return cancelBtn;
  }

  async deleteButton() {
    const selector = `new UiSelector().className("android.widget.Button").text("DELETE")`;
    await $(`android=${selector}`).waitForExist();

    const deleteBtn = $(`android=${selector}`);
    return deleteBtn;
  }

  async addButton() {
    const selector = `new UiSelector().className("android.widget.Button").text("ADD")`;
    await $(`android=${selector}`).waitForExist();

    const addBtn = $(`android=${selector}`);
    return addBtn;
  }

  async saveButton() {
    const selector = `new UiSelector().className("android.widget.Button").text("SAVE")`;
    await $(`android=${selector}`).waitForExist();

    const saveBtn = $(`android=${selector}`);
    return saveBtn;
  }

  async yesButton() {
    const selector = `new UiSelector().className("android.widget.Button").text("YES")`;
    await $(`android=${selector}`).waitForExist();
  }

  async listNameField() {
    const selector = `new UiSelector().className("android.widget.EditText").text("Enter List Name")`;
    await $(`android=${selector}`).waitForExist();
    const listNameField = $(`android=${selector}`);
    return listNameField;
  }

  // ==================================Actions=====================================//
  async clickOnAddListButton() {
    await this.addListButton.click();
  }

  async clickOnTaskList(listName) {
    const list = await this.taskList(listName);
    await list.click();
  }

  async clickOnEditListButton() {
    const editButton = await this.editListButton();
    await editButton.click();
  }

  async clickOnDeleteListButton() {
    const deleteButton = await this.deleteListButton();
    await deleteButton.click();
  }

  async clickOnCancelButton() {
    const cancelButton = await this.cancelButton();
    await cancelButton.click();
  }

  async clickOnDeleteButton() {
    const deleteButton = await this.deleteButton();
    await deleteButton.click();
  }

  async clickOnAddButton() {
    const addButton = await this.addButton();
    await addButton.click();
  }

  async clickOnSaveButton() {
    const saveButton = await this.saveButton();
    await saveButton.click();
  }

  async clickOnSaveButton() {
    const saveButton = await this.saveButton();
    await saveButton.click();
  }

  async clearTaskListNameField(listName) {
    const selector = `new UiSelector().className("android.widget.EditText").text("${listName}")`;
    await $(`android=${selector}`).waitForExist();
    const name = $(`android=${selector}`);
    await name.clearValue();
  }

  async typeListName(listName) {
    const name = await this.listNameField();
    await name.setValue(listName);
  }

  // ==================================Assertions=====================================//
  async verifyScreenTitle(screenTitle) {
    const selector = `new UiSelector().className("android.widget.TextView").text("${screenTitle}")`;
    await $(`android=${selector}`).waitForExist();
    const title = $(`android=${selector}`);
    return title;
  }

  async verifyThatEditModalIsOpen() {
    const selector = `new UiSelector().className("android.widget.TextView").text("Edit List")`;
    await $(`android=${selector}`).waitForExist();
    const modalTitle = $(`android=${selector}`);
    expect(modalTitle).toBeDisplayed();
  }

  async verifyThatEditModalIsNotOpen() {
    const selector = `new UiSelector().className("android.widget.TextView").text("Edit List")`;
    await $(`android=${selector}`).waitForExist({ reverse: true });
  }

  async verifyThatListIsDisplayed(listName) {
    const list = await $(
      `//android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[contains(@text, '${listName}')]`
    );

    await list.waitForExist();
  }

  async verifyThatDeleteModalIsOpen() {
    const selector = `new UiSelector().className("android.widget.TextView").text("Are you sure?")`;
    await $(`android=${selector}`).waitForExist();
    const modalTitle = $(`android=${selector}`);
    expect(modalTitle).toBeDisplayed();
  }

  async verifyThatDeleteModalIsNotOpen() {
    const selector = `new UiSelector().className("android.widget.TextView").text("Are you sure?")`;
    await $(`android=${selector}`).waitForExist({ reverse: true });
  }

  async verifyThatListIsNotDisplayed(listName) {
    const list = await $(
      `//android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[contains(@text, '${listName}')]`
    );

    await list.waitForExist({ reverse: true });
  }

  async verifyThatListSavedMessageIsNotDisplayed() {
    const selector = `new UiSelector().className("android.widget.Toast").text("List Saved")`;
    await $(`android=${selector}`).waitForExist({ reverse: true });
    const message = $(`android=${selector}`);
    return message;
  }

  async verifyThatListSavedMessageIsDisplayed() {
    const selector = `new UiSelector().className("android.widget.Toast").text("List Saved")`;
    await $(`android=${selector}`).waitForExist();
    const message = $(`android=${selector}`);
    return message;
  }

  async verifyThatListDeletedMessageIsNotDisplayed() {
    const selector = `new UiSelector().className("android.widget.Toast").text("List Deleted")`;
    await $(`android=${selector}`).waitForExist({ reverse: true });
    const message = $(`android=${selector}`);
    return message;
  }

  async verifyThatListDeletedMessageIsDisplayed() {
    const selector = `new UiSelector().className("android.widget.Toast").text("List Deleted")`;
    await $(`android=${selector}`).waitForExist();
    const message = $(`android=${selector}`);
    return message;
  }
}

module.exports = new TaskListsScreen();
