class NewTaskScreen {
  // Elements
  async screenTitle(screenTitle) {
    const selector = `new UiSelector().className("android.widget.TextView").text("${screenTitle}")`;
    await $(`android=${selector}`).waitForExist();
    const title = $(`android=${selector}`);
    return title;
  }

  async taskDescriptionInputField() {
    const selector = `new UiSelector().className("android.widget.EditText").text("Enter Task Here")`;
    await $(`android=${selector}`).waitForExist();
    const enterTaskField = $(`android=${selector}`);
    return enterTaskField;
  }

  async dueDateInputField() {
    const selector = `new UiSelector().className("android.widget.EditText").text("Date not set")`;
    await $(`android=${selector}`).waitForExist();
    const dueDateField = $(`android=${selector}`);
    return dueDateField;
  }

  async okButton() {
    const selector = `new UiSelector().className("android.widget.Button").text("OK")`;
    await $(`android=${selector}`).waitForExist();
    const okBtn = $(`android=${selector}`);
    return okBtn;
  }

  async dueDateButton(dueDate) {
    const saveTaskButton = await $(`~${dueDate}`);
    return saveTaskButton;
  }

  get saveTaskButton() {
    const saveTaskButton = $("~Save Task");
    return saveTaskButton;
  }

  get addTolistDropDown() {
    const dropdown = $(`android=new UiSelector().resourceId("com.splendapps.splendo:id/spinnerLists")`);
    return dropdown;
  }

  async listOptionFromListDDM(listName) {
    const selector = `new UiSelector().className("android.widget.TextView").text("${listName}")`;
    await $(`android=${selector}`).waitForExist();

    const list = $(`android=${selector}`);
    return list;
  }

  get addListButton() {
    const addListButton = $("~Add");
    return addListButton;
  }

  /////////actions
  async typeTaskDescription(taskText) {
    const task = await this.taskDescriptionInputField();
    await task.setValue(taskText);
  }

  async clickOnSaveTaskButton() {
    await this.saveTaskButton.click();
  }

  async openDueDateCalendar() {
    const dueDateField = await this.dueDateInputField();
    await dueDateField.click();
  }

  async selectDueDate() {
    function formatDate(date) {
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }

    const today = new Date();
    const formattedDate = formatDate(today);
    console.log(formattedDate);

    const dueDateBtn = await this.dueDateButton(formattedDate);
    await dueDateBtn.click();
  }

  async clickOkButton() {
    const okBtn = await this.okButton();
    await okBtn.click();
  }

  async openAddTolistDropDown() {
    const dropdown = await this.addTolistDropDown;
    await dropdown.click();
  }

  async selectListOptionFromDDM(listName) {
    const list = await this.listOptionFromListDDM(listName);
    await list.click();
  }

  async clickOnAddListButton() {
    await this.addListButton.click();
  }

  async swipeToTheBottom() {
    const { height } = await driver.getWindowSize();
    const anchorPercentage = 50;
    const startPointPercentage = 55;
    const endPointPercentage = 10;

    const anchor = (height * anchorPercentage) / 100;
    const startPoint = (height * startPointPercentage) / 100;
    const endPoint = (height * endPointPercentage) / 100;

    // Press on start point, wait 1s, moveTo endPoint , release
    await driver.touchPerform([
      {
        action: "press",
        options: {
          x: anchor,
          y: startPoint,
        },
      },
      {
        action: "wait",
        options: {
          ms: 1000,
        },
      },
      {
        action: "moveTo",
        options: {
          x: anchor,
          y: endPoint,
        },
      },
      {
        action: "release",
        options: {},
      },
    ]);
  }
}
module.exports = new NewTaskScreen();
