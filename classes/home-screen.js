class HomeScreen {
  // Elements

  get quickTaskField() {
    return $("android.widget.EditText");
  }

  get addTaskButton() {
    const addTaskButtons = $$("~Add Task");
    return addTaskButtons[1];
  }

  get taskFromTheList() {
    const taskItem1 =   $$("android.widget.RelativeLayout")[0];
    const taskName1 =   taskItem1.$("android.widget.LinearLayout");
    const taskText1 =   taskName1.$("android.widget.TextView");
    return  taskText1
  }

  //actions
  async typeQuickTask(taskText) {
    await this.quickTaskField.setValue(taskText);
  }

  async clickOnAddTaskButton() {
    await this.addTaskButton.click();
  }

  async clickOnTask() {
    await this.taskFromTheList.click();
  }
 
}
module.exports = new HomeScreen();
