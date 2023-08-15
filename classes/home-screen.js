class HomeScreen {
  // Elements
  get quickTaskField() {
    return $("android.widget.EditText");
  }

  get addQuickTaskButton() {
    const addTaskButtons = $$("~Add Task");
    return addTaskButtons[1];
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

  async screenTitle(screenTitle) {
    const selector = `new UiSelector().className("android.widget.TextView").text("${screenTitle}")`;
    await $(`android=${selector}`).waitForExist();
    const title = $(`android=${selector}`);
    return title;
  }

  async listOptionFromListDDM(listName) {
    const selector = `new UiSelector().resourceId("com.splendapps.splendo:id/navLineName").text("${listName}")`;
    await $(`android=${selector}`).waitForExist();

    const list = $(`android=${selector}`);
    return list;
  }

  //actions
  async typeQuickTask(taskText) {
    await this.quickTaskField.setValue(taskText);
  }

  async clickOnAddQuickTaskButton() {
    await this.addQuickTaskButton.click();
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

  async openListsDropDown() {
    const dropdown = await this.listsDropDown;
    await dropdown.click();
  }
}
module.exports = new HomeScreen();
