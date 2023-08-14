const HomeScreen = require("../classes/home-screen");
const lists =  require ("../fixtures/lists.json");
describe("Sample test", () => {
  it("It should work", async () => {
    HomeScreen.typeQuickTask("Drink water");
    await browser.pause(3000);
    HomeScreen.clickOnAddTaskButton();
    await browser.pause(3000);
  
   const taskText = await HomeScreen.taskFromTheList.getText()

    await expect(taskText).toEqual("Drink water");
    await browser.pause(3000);

  });

});
