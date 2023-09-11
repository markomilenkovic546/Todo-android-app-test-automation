const HomeScreen = require("../screens/home-screen");
const NewTaskScreen = require("../screens/new-task-screen");
const ListScreen = require("../screens/list-screen");
const lists = require("../fixtures/todo-lists.json");

browser.addCommand('createTask', async function (taskDescription, listName) {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(taskDescription);
    await NewTaskScreen.openDueDateCalendar();
    await NewTaskScreen.clickOkButton();
    await driver.hideKeyboard();
    await NewTaskScreen.swipeToTheBottom();
    await NewTaskScreen.openAddTolistDropDown();
    await NewTaskScreen.selectListOptionFromDDM(listName);
    await NewTaskScreen.clickOnSaveTaskButton();
  });