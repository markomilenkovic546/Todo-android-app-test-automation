const HomeScreen = require("../screens/home-screen");
const NewTaskScreen = require("../screens/new-task-screen");
const EditTaskScreen = require("../screens/edit-task-screen");
const ListScreen = require("../screens/list-screen");
const AddInBatchModeScreen = require("../screens/add-in-batch-mode-screen");
const lists = require("../fixtures/todo-lists.json");
const FinishedListScreen = require("../screens/finished-list-screen");
const TaskListsScreen = require("../screens/task-lists-screen");
require("../custom-commands/commands.js");

describe("List Management", () => {
  beforeEach(async () => {
    // Launch the app before each test
    await driver.launchApp();
  });


  it("User can navigate to the list screen from the list drop-down", async () => {
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Personal");
    await ListScreen.verifyScreenTitle("Personal");
  });

  it("User can navigate from the list screen to the home screen", async () => {
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Personal");
    await ListScreen.verifyScreenTitle("Personal");
    await ListScreen.openListsDropDown();
    await ListScreen.selectListOptionFromDDM("All Lists");
    await HomeScreen.verifyThatAllListsDropDownIsDisplayed();
  });

  it("User can navigate from the list screen to other list screen", async () => {
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Personal");
    await ListScreen.verifyScreenTitle("Personal");
    await ListScreen.openListsDropDown();
    await ListScreen.selectListOptionFromDDM("Default");
    await ListScreen.verifyScreenTitle("Default");
  });

  it("User can create a list from the 'List' dropdown", async () => {
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("New List");
    await HomeScreen.typeListName("Sport");
    await HomeScreen.clickOnAddButton();
    await ListScreen.verifyScreenTitle("Sport");
  });
  it("User can create a list from the 'New Task'screen", async () => {
    await HomeScreen.clickOnAddTaskButton();
    await driver.hideKeyboard();
    await NewTaskScreen.swipeToTheBottom();
    await NewTaskScreen.clickOnAddListButton();
    await NewTaskScreen.typeListName("Sport");
    await NewTaskScreen.clickOnAddButton();
    await NewTaskScreen.clickOnBackButton();
    await NewTaskScreen.clickOnYesButton();
    await HomeScreen.openListsDropDown();
    await HomeScreen.selectListOptionFromDDM("Sport");
    await ListScreen.verifyScreenTitle("Sport");
  });

  it("User can create a list form the Task Lists screen", async () => {
    await HomeScreen.openMoreOptionsDropDown();
    await HomeScreen.selectOptionFromOverflowMenu("Task Lists");
    await TaskListsScreen.clickOnAddListButton()
    await TaskListsScreen.typeListName("Sport");
    await TaskListsScreen.clickOnAddButton()
    await TaskListsScreen.clickOnTaskList("Sport");
    await ListScreen.verifyScreenTitle("Sport");
  });

  it("User can navigate to the 'Task Lists'screen", async () => {
    await HomeScreen.openMoreOptionsDropDown();
    await HomeScreen.selectOptionFromOverflowMenu("Task Lists");
    await ListScreen.verifyScreenTitle("Task Lists");
  });

  it("User can navigate to the 'List'screen from the 'Task Lists'screen", async () => {
    await HomeScreen.openMoreOptionsDropDown();
    await HomeScreen.selectOptionFromOverflowMenu("Task Lists");
    await TaskListsScreen.verifyScreenTitle("Task Lists");
    await TaskListsScreen.clickOnTaskList("Shopping");
    await ListScreen.verifyScreenTitle("Shopping");
  });

  it("User can open 'Edit List' modal", async () => {
    await HomeScreen.openMoreOptionsDropDown();
    await HomeScreen.selectOptionFromOverflowMenu("Task Lists");
    await TaskListsScreen.clickOnEditListButton("Shopping");
    await TaskListsScreen.verifyThatEditModalIsOpen();
  });

  it("User can close 'Edit List' modal", async () => {
    await HomeScreen.openMoreOptionsDropDown();
    await HomeScreen.selectOptionFromOverflowMenu("Task Lists");
    await TaskListsScreen.clickOnEditListButton("Shopping");
    await TaskListsScreen.clickOnCancelButton();
    await TaskListsScreen.verifyThatEditModalIsNotOpen();
  });

  it("User can edit a list", async () => {
    await HomeScreen.openMoreOptionsDropDown();
    await HomeScreen.selectOptionFromOverflowMenu("Task Lists");
    await TaskListsScreen.clickOnEditListButton();
    await TaskListsScreen.clearTaskListNameField("Shopping");
    await TaskListsScreen.typeListName("Sport");
    await TaskListsScreen.clickOnSaveButton();
    await TaskListsScreen.verifyThatListIsNotDisplayed("Shopping");
    await TaskListsScreen.verifyThatListIsDisplayed("Sport");
  });

  it("User can delete a list", async () => {
    await HomeScreen.openMoreOptionsDropDown();
    await HomeScreen.selectOptionFromOverflowMenu("Task Lists");
    await TaskListsScreen.clickOnDeleteListButton()
    await TaskListsScreen.clickOnDeleteButton()
    await TaskListsScreen.verifyThatListIsNotDisplayed("Shopping");
  });

  it("User can open a Delete List modal", async () => {
    await HomeScreen.openMoreOptionsDropDown();
    await HomeScreen.selectOptionFromOverflowMenu("Task Lists");
    await TaskListsScreen.clickOnDeleteListButton()
    await TaskListsScreen.verifyThatDeleteModalIsOpen()
  });

  it("User can close a Delete List modal", async () => {
    await HomeScreen.openMoreOptionsDropDown();
    await HomeScreen.selectOptionFromOverflowMenu("Task Lists");
    await TaskListsScreen.clickOnDeleteListButton()
    await TaskListsScreen.verifyThatDeleteModalIsOpen()
    await TaskListsScreen.clickOnCancelButton()
    await TaskListsScreen.verifyThatDeleteModalIsNotOpen()
  });
});
