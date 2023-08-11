const HomeScreen = require("../classes/home-screen");
describe("Sample test", () => {
  it("It should work", async () => {
    HomeScreen.typeQuickTask("Drink water");
    await browser.pause(3000);
    HomeScreen.clickOnAddTaskButton();
    await browser.pause(3000);
  
   const taskText = await HomeScreen.getTaskText()

    
   


    await expect(taskText).toEqual("Drink waterr");
    await browser.pause(3000);

 
  });
});
