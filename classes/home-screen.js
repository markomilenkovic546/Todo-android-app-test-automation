class HomeScreen {
  // Elements

  get quickTaskField() {
    return $("android.widget.EditText");
  }

  get addTaskButton() {
    const addTaskButtons = $$("~Add Task");
    return addTaskButtons[1];
  }

  async taskFromTheList(index) {
    const taskItem1 =  await $$("android.widget.RelativeLayout")[index];
    const taskName1 =  await taskItem1.$("android.widget.LinearLayout");
    const taskText1 =  await taskName1.$("android.widget.TextView");
    return  taskText1
  }

  //actions
  async typeQuickTask(taskText) {
    await this.quickTaskField.setValue(taskText);
  }

  async clickOnAddTaskButton() {
    await this.addTaskButton.click();
  }

  async clickOnTask(index) {
    await this.taskFromTheList(index).click();
  }
  async getTaskText(index) {
    return await this.taskFromTheList(index).getText();
  }
}
module.exports = new HomeScreen();
