const HomeScreen = require("../classes/home-screen");
const lists = require("../fixtures/lists.json");

describe("Task Management", () => {

  beforeEach(async () => {
    await HomeScreen.openListsDropDown();
    const listName = "All Lists"
    // Select "Default" option from the DDM
    await HomeScreen.selectListOptionFromDDM(listName)
  });
  it("User can create a Quick task", async () => {
    // Type Quick Task description
    await HomeScreen.typeQuickTask(lists.Default.quickTask);
    // Click on the "Add task" button
    await HomeScreen.clickOnAddQuickTaskButton();
    // Get created quick task and verify that is created
    const task = await HomeScreen.taskFromTheList(lists.Default.quickTask)
    const taskDescription = await task.getText()
    await expect(taskDescription).toEqual(lists.Default.quickTask);
  });

  it("Quick task is placed in the Default list once the user create it", async () => {
    // Type Quick Task description
    await HomeScreen.typeQuickTask(lists.Default.quickTask2);
    // Click on the "Add task" button
    await HomeScreen.clickOnAddQuickTaskButton();
    // Open lists drop down 
    await HomeScreen.openListsDropDown();
    const lname = "Default"
    // Select "Default" option from the DDM
    await HomeScreen.selectListOptionFromDDM(lname)
    // Get created task and verify that is placed in the "Default" list
    const task = await HomeScreen.taskFromTheList(lists.Default.quickTask2)
    const taskDescription = await task.getText()
    await expect(taskDescription).toEqual(lists.Default.quickTask2);
  });

  it("User can open the 'New Task' screen", async () => {
    await browser.pause(6000);
    await HomeScreen.clickOnAddTaskButton();
    await browser.pause(6000);
    const screenTitle = await HomeScreen.screenTitle("New Task")
    await screenTitle.waitForExist();
    expect(await screenTitle.isExisting()).toBe(true);
  });
});
