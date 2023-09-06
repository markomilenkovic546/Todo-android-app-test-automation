const HomeScreen = require("../classes/home-screen");
const NewTaskScreen = require("../classes/new-task-screen");
const EditTaskScreen = require("../classes/edit-task-screen");
const ListScreen = require("../classes/list-screen");
const AddInBatchModeScreen = require("../classes/add-in-batch-mode-screen");
const lists = require("../fixtures/todo-lists.json");
const FinishedListScreen = require("../classes/finished-list-screen");
require('../custom-commands/commands.js');



describe("Task Management", () => {
  beforeEach(async () => {
    // Launch the app before each test
    await driver.launchApp();
   
  });

  it("User can create a Quick task", async () => {
    // Type Quick Task description
    await HomeScreen.typeQuickTask(lists[0].Default[0]);
    // Click on the "Add task" button
    await HomeScreen.clickOnAddQuickTaskButton();
    // Get created quick task and verify that is created
    const task = await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[0]);
    
  });

  it("Quick task is saved in the Default list ", async () => {
    // Type Quick Task description
    await HomeScreen.typeQuickTask(lists[0].Default[1]);
    // Click on the "Add task" button
    await HomeScreen.clickOnAddQuickTaskButton();
    // Open lists drop down
    await HomeScreen.openListsDropDown();
    // Select "Default" option from the DDM
    await HomeScreen.selectListOptionFromDDM("Default");
    // Get created task and verify that is placed in the "Default" list
    await ListScreen.verifyThatTaskIsDisplayed(lists[0].Default[1]);

  });

  it("User can open the 'New Task' screen", async () => {
    // Click on the "Add task" (+) button
    await HomeScreen.clickOnAddTaskButton();
    // Verify that "New Task" screen is displayed
    await NewTaskScreen.verifyThatScreenTitleIsCorerct("New Task")
  });

  it("User can create a task from the 'New Task' screen", async () => {
    // Click on the "Add task" (+) button
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[2]);
    await NewTaskScreen.openDueDateCalendar();
    await NewTaskScreen.clickOkButton();
    await NewTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[2])
 
  });

  it("User can create a task with title only (Minimum data required)", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[2]);
    await NewTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Default");
    await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[2])
  });

  it("User can create a task with due time", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[2]);
    await NewTaskScreen.openDueDateCalendar();
    await NewTaskScreen.clickOkButton();
    await NewTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    // Select "Default" option from the DDM
    await HomeScreen.selectListOptionFromDDM("Default");
    // Verify that task is created and is it's saved in the correct default list
    await ListScreen.verifyThatTaskIsDisplayed(lists[0].Default[2])
    //Created task has correctly set due date
    await ListScreen.verifyThatTaskDueDateIsCorrect("Today", 0);
   
  });

  it("User can create a task in specific list", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[3]);
    await driver.hideKeyboard();
    await NewTaskScreen.openAddTolistDropDown();
    await NewTaskScreen.selectListOptionFromDDM("Shopping");
    await NewTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Shopping");
    // Verify that task is saved in the correct list
    await ListScreen.verifyThatTaskIsDisplayed(lists[0].Default[3])
  });

  it("User can create a task with all options", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[3]);
    await NewTaskScreen.openDueDateCalendar();
    await NewTaskScreen.clickOkButton();
    await driver.hideKeyboard();
    await NewTaskScreen.swipeToTheBottom();
    await NewTaskScreen.openAddTolistDropDown();
    await NewTaskScreen.selectListOptionFromDDM("Shopping");
    await NewTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Shopping");
    // Verify that task is saved in the correct list
    await ListScreen.verifyThatTaskIsDisplayed(lists[0].Default[3]);
    //Created task has correctly set due date
    await ListScreen.verifyThatTaskDueDateIsCorrect("Today", 0);
  });

  it("User can quit task creation without saving ", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[4]);
    await NewTaskScreen.clickOnBackButton();
    await NewTaskScreen.clickOnYesButton();
    // Verify that Home screen is displayed
    await HomeScreen.verifyThatAllListsDropDownIsDisplayed()
    // Verify that task is not saved
    await HomeScreen.verifyThatTaskIsNotDisplayed(lists[0].Default[4]);
  });

  it("User can navigate back from New Task screen to Home screen", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.clickOnBackButton();
    // Verify that Home screen is displayed
    await HomeScreen.verifyThatAllListsDropDownIsDisplayed()
  });

  it("User cannot create a task without description", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.openDueDateCalendar();
    await NewTaskScreen.clickOkButton();
    await driver.hideKeyboard();
    await NewTaskScreen.swipeToTheBottom();
    await NewTaskScreen.openAddTolistDropDown();
    await NewTaskScreen.selectListOptionFromDDM("Shopping");
    await NewTaskScreen.clickOnSaveTaskButton();
    // Verify that error message is displayed
    await NewTaskScreen.verifyThatErrorMessageIsDisplayed() 
    // Verify that error message disappeared
    await NewTaskScreen.verifyThatErrorMessageIsNotDisplayed()
  });

  it("User can edit task description", async () => {
    await browser.createTask(lists[1].Personal[0], "Personal");
    await HomeScreen.clickOnTask(lists[1].Personal[0])
    const taskDescriptionField = await EditTaskScreen.taskDescriptionInputFieldWithValue(lists[1].Personal[0])
    await taskDescriptionField.clearValue();
    await EditTaskScreen.typeTaskDescription(lists[0].Default[6]);
    await EditTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[6]);
  });

  it("User can edit a task due date", async () => {
    await browser.createTask(lists[1].Personal[0], "Personal");
    await HomeScreen.clickOnTask(lists[1].Personal[0])
    await EditTaskScreen.openDueDateCalendar("Today");
    await EditTaskScreen.selectTomorrowAsDueDate()
    await EditTaskScreen.clickOkButton();
    await EditTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown()
    // Select "Default" option from the DDM
    await HomeScreen.selectListOptionFromDDM("Personal");
    // Verify that task is created and is it's saved in the correct default list
    await ListScreen.verifyThatTaskIsDisplayed(lists[1].Personal[0])
    //Created task has correctly set due date
    await ListScreen.verifyThatTaskDueDateIsCorrect("Tomorrow", 0);
  });

  it("User can edit a task by moving it to other list", async () => {
    await browser.createTask(lists[1].Personal[0], "Personal");
    await HomeScreen.clickOnTask(lists[1].Personal[0])
    await EditTaskScreen.swipeToTheBottom();
    await EditTaskScreen.openAddTolistDropDown();
    await EditTaskScreen.selectListOptionFromDDM("Work");
    await EditTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Personal");
    await ListScreen.verifyThatTaskIsNotDisplayed(lists[1].Personal[0])
    await ListScreen.openListsDropDown();
    await ListScreen.selectListOptionFromDDM("Work");
    // Verify that task is saved in the correct list
    await ListScreen.verifyThatTaskIsDisplayed(lists[1].Personal[0])
  });

  it("User can create tasks in Batch mode with title only (Minimum data required)", async () => {
    await HomeScreen.openMoreOptionsDropDown()
    await HomeScreen.selectOptionFromOverflowMenu("Add in Batch Mode")
    await AddInBatchModeScreen.typeTaskDescription(`${lists[0].Default[0]}\n${lists[0].Default[1]}\n${lists[0].Default[2]}`);
    await AddInBatchModeScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Default");
    await ListScreen.verifyThatTaskIsDisplayed(lists[0].Default[0])
    await ListScreen.verifyThatTaskIsDisplayed(lists[0].Default[1])
    await ListScreen.verifyThatTaskIsDisplayed(lists[0].Default[2])
  });

  it("User can create tasks in Batch mode with due time", async () => {
    await HomeScreen.openMoreOptionsDropDown()
    await HomeScreen.selectOptionFromOverflowMenu("Add in Batch Mode")
    await AddInBatchModeScreen.typeTaskDescription(`${lists[0].Default[0]}\n${lists[0].Default[1]}\n${lists[0].Default[2]}`);
    await driver.hideKeyboard();
    await AddInBatchModeScreen.openDueDateCalendar();
    await AddInBatchModeScreen.clickOkButton();
    await AddInBatchModeScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Default");
    await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[0])
    await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[1])
    await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[2])
    await ListScreen.verifyThatTaskDueDateIsCorrect("Today", 0)
    await ListScreen.verifyThatTaskDueDateIsCorrect("Today", 1)
    await ListScreen.verifyThatTaskDueDateIsCorrect("Today", 2)
  });

  it("User can create tasks in Batch mode in specific list", async () => {
    await HomeScreen.openMoreOptionsDropDown()
    await HomeScreen.selectOptionFromOverflowMenu("Add in Batch Mode")
    await AddInBatchModeScreen.typeTaskDescription(`${lists[0].Default[0]}\n${lists[0].Default[1]}\n${lists[0].Default[2]}`);
    await driver.hideKeyboard();
    await AddInBatchModeScreen.swipeToTheBottom();
    await AddInBatchModeScreen.openAddTolistDropDown();
    await AddInBatchModeScreen.selectListOptionFromDDM("Shopping");
    await AddInBatchModeScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Shopping");
    await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[0])
    await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[1])
    await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[2])

  });

  it("User can create tasks in Batch mode with all options", async () => {
    await HomeScreen.openMoreOptionsDropDown()
    await HomeScreen.selectOptionFromOverflowMenu("Add in Batch Mode")
    await AddInBatchModeScreen.typeTaskDescription(`${lists[0].Default[0]}\n${lists[0].Default[1]}\n${lists[0].Default[2]}`);
    await driver.hideKeyboard();
    await AddInBatchModeScreen.swipeToTheBottom();
    await AddInBatchModeScreen.openDueDateCalendar();
    await AddInBatchModeScreen.clickOkButton();
    await AddInBatchModeScreen.swipeToTheBottom();
    await AddInBatchModeScreen.openAddTolistDropDown();
    await AddInBatchModeScreen.selectListOptionFromDDM("Shopping");
    await AddInBatchModeScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Shopping");
    await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[0])
    await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[1])
    await HomeScreen.verifyThatTaskIsDisplayed(lists[0].Default[2])
    await ListScreen.verifyThatTaskDueDateIsCorrect("Today", 0)
    await ListScreen.verifyThatTaskDueDateIsCorrect("Today", 1)
    await ListScreen.verifyThatTaskDueDateIsCorrect("Today", 2)
  });

  it("User can quit tasks creation in Batch mode without saving ", async () => {
    await HomeScreen.openMoreOptionsDropDown()
    await HomeScreen.selectOptionFromOverflowMenu("Add in Batch Mode")
    await AddInBatchModeScreen.typeTaskDescription(`${lists[0].Default[0]}\n${lists[0].Default[1]}\n${lists[0].Default[2]}`);
    await AddInBatchModeScreen.clickOnBackButton();
    await AddInBatchModeScreen.clickOnYesButton();
    // Verify that Home screen is displayed
    await HomeScreen.verifyThatAllListsDropDownIsDisplayed()
    // Verify that tasks are not saved
    await HomeScreen.verifyThatTaskIsNotDisplayed(lists[0].Default[0]);
    await HomeScreen.verifyThatTaskIsNotDisplayed(lists[0].Default[1]);
    await HomeScreen.verifyThatTaskIsNotDisplayed(lists[0].Default[2]);
  });

  it("User can navigate back from 'Add In Batch Mode' screen to Home screen", async () => {
    await HomeScreen.openMoreOptionsDropDown()
    await HomeScreen.selectOptionFromOverflowMenu("Add in Batch Mode")
    await AddInBatchModeScreen.clickOnBackButton();
    // Verify that Home screen is displayed
    await HomeScreen.verifyThatAllListsDropDownIsDisplayed()
  });

  it("User cannot create a tasks in Batch mode without description", async () => {
    await HomeScreen.openMoreOptionsDropDown()
    await HomeScreen.selectOptionFromOverflowMenu("Add in Batch Mode")
    await driver.hideKeyboard();
    await AddInBatchModeScreen.swipeToTheBottom();
    await AddInBatchModeScreen.openDueDateCalendar();
    await AddInBatchModeScreen.clickOkButton();
    await AddInBatchModeScreen.swipeToTheBottom();
    await AddInBatchModeScreen.openAddTolistDropDown();
    await AddInBatchModeScreen.selectListOptionFromDDM("Shopping");
    await AddInBatchModeScreen.clickOnSaveTaskButton();
    // Verify that error message is displayed
    await AddInBatchModeScreen.verifyThatErrorMessageIsDisplayed() 
    // Verify that error message disappeared
    await AddInBatchModeScreen.verifyThatErrorMessageIsNotDisplayed()
  });

  it("User can check the task as finished", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[2]);
    await NewTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Default");
    await ListScreen.checkTaskAsFinished(0)
    await ListScreen.verifyThatTaskFinishedMessageIsDisplayed()
    await ListScreen.verifyThatTaskFinishedMessageIsNotDisplayed()
    await ListScreen.verifyThatTaskIsNotDisplayed(lists[0].Default[2]);
    await ListScreen.openListsDropDown();
    await ListScreen.selectListOptionFromDDM("Finished");
    await FinishedListScreen.verifyThatTaskIsDisplayed(lists[0].Default[2]);
    
  })

  it("User can change status of the task from finished to undone", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[2]);
    await NewTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Default");
    await ListScreen.checkTaskAsFinished(0)
    await ListScreen.verifyThatTaskFinishedMessageIsDisplayed()
    await ListScreen.verifyThatTaskFinishedMessageIsNotDisplayed()
    await ListScreen.verifyThatTaskIsNotDisplayed(lists[0].Default[2]);
    await ListScreen.openListsDropDown();
    await ListScreen.selectListOptionFromDDM("Finished");
    await FinishedListScreen.verifyThatTaskIsDisplayed(lists[0].Default[2]);
    await FinishedListScreen.checkTaskAsUndone(0)
    await FinishedListScreen.verifyThatStatusChangeMessageIsDisplayed()
    await FinishedListScreen.verifyThatStatusChangeMessageIsNotDisplayed()
    await FinishedListScreen.verifyThatTaskIsNotDisplayed(lists[0].Default[2]);
    await FinishedListScreen.openListsDropDown()
    await FinishedListScreen.selectListOptionFromDDM("Default");
    await ListScreen.verifyThatTaskIsDisplayed(lists[0].Default[2]);
  })

  it("User can check the task as finished from the edit-task screen", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[2]);
    await NewTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Default");
    await ListScreen.clickOnTask(lists[0].Default[2])
    await EditTaskScreen.checkTaskAsFinished()
    await EditTaskScreen.clickOnSaveTaskButton()
    await ListScreen.verifyThatTaskIsNotDisplayed(lists[0].Default[2]);
    await ListScreen.openListsDropDown();
    await ListScreen.selectListOptionFromDDM("Finished");
    await FinishedListScreen.verifyThatTaskIsDisplayed(lists[0].Default[2]);

  })
});
