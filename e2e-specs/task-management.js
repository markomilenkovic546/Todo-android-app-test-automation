const HomeScreen = require("../classes/home-screen");
const NewTaskScreen = require("../classes/New-Task-screen");
const ListScreen = require("../classes/list-screen");
const lists = require("../fixtures/todo-lists.json");


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
    const task = await HomeScreen.taskFromTheList(lists[0].Default[0]);
    const taskDescription = await task.getText();
    await expect(taskDescription).toEqual(lists[0].Default[0]);
  });

  it("Quick task is saved in the Default list ", async () => {
    // Type Quick Task description
    await HomeScreen.typeQuickTask(lists[0].Default[1]);
    // Click on the "Add task" button
    await HomeScreen.clickOnAddQuickTaskButton();
    // Open lists drop down
    await HomeScreen.openListsDropDown();
    const lname = "Default";
    // Select "Default" option from the DDM
    await HomeScreen.selectListOptionFromDDM(lname);
    // Get created task and verify that is placed in the "Default" list
    const task = await ListScreen.taskFromTheList(lists[0].Default[1]);
    const taskDescription = await task.getText();
    await expect(taskDescription).toEqual(lists[0].Default[1]);
  });

  it("User can open the 'New Task' screen", async () => {
    // Click on the "Add task" (+) button
    await HomeScreen.clickOnAddTaskButton();
    const screenTitle = await NewTaskScreen.screenTitle("New Task");
    await screenTitle.waitForExist();
    // Verify that "New Task" screen is displayed
    expect(await screenTitle.isExisting()).toBe(true);
  });

  it("User can create a task from the 'New Task' screen", async () => {
    // Click on the "Add task" (+) button
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[2]);
    await NewTaskScreen.openDueDateCalendar();
    await NewTaskScreen.selectDueDate();
    await NewTaskScreen.clickOkButton();
    await NewTaskScreen.clickOnSaveTaskButton();
    const task = await HomeScreen.taskFromTheList(lists[0].Default[2]);
    const taskDescription = await task.getText();
    await expect(taskDescription).toEqual(lists[0].Default[2]);
  });

  it("Create task with title only (Minimum data required)", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[2]);
    await NewTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Default");
    const task = await HomeScreen.taskFromTheList(lists[0].Default[2]);
    const taskDescription = await task.getText();
    await expect(taskDescription).toEqual(lists[0].Default[2]);
  });

  it("Create task with due time", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[2]);
    await NewTaskScreen.openDueDateCalendar();
    await NewTaskScreen.selectDueDate();
    await NewTaskScreen.clickOkButton();
    await NewTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    // Select "Default" option from the DDM
    await HomeScreen.selectListOptionFromDDM("Default");
    const task = await HomeScreen.taskFromTheList(lists[0].Default[2]);
    const taskDescription = await task.getText();
    // Verify that task is created and is it's saved in the correct default list
    await expect(taskDescription).toEqual(lists[0].Default[2]);
    const taskDueDateElement = await HomeScreen.taskDueDate("Today");
    const dueDateText = await taskDueDateElement.getText();
    //Created task has correctly set due date
    await expect(dueDateText).toEqual("Today");
  });

  it("Create task with specific list", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[3]);
    await driver.hideKeyboard();
    await NewTaskScreen.openAddTolistDropDown();
    await NewTaskScreen.selectListOptionFromDDM("Shopping");
    await NewTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Shopping");
    // Verify that task is saved in the correct list
    const task = await ListScreen.taskFromTheList(lists[0].Default[3]);
  });

  
  it("Create task with all options", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await NewTaskScreen.typeTaskDescription(lists[0].Default[3]);
    await NewTaskScreen.openDueDateCalendar();
    await NewTaskScreen.selectDueDate();
    await NewTaskScreen.clickOkButton();
    await driver.hideKeyboard();
    await NewTaskScreen.swipeToTheBottom()
    await NewTaskScreen.openAddTolistDropDown();
    await NewTaskScreen.selectListOptionFromDDM("Shopping");
    
    await NewTaskScreen.clickOnSaveTaskButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Shopping");
    // Verify that task is saved in the correct list
    const task = await ListScreen.taskFromTheList(lists[0].Default[3]);
    const taskDueDateElement = await ListScreen.taskDueDate("Today");
    const dueDateText = await taskDueDateElement.getText();
    //Created task has correctly set due date
    await expect(dueDateText).toEqual("Today");
  
    await browser.pause(6000);
  });
});
