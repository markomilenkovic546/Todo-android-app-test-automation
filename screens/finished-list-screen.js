class FinishedListScreen {

    // ==================================Elements=====================================//
      async taskFromTheList(taskText) {
        const selector = `new UiSelector().className("android.widget.TextView").text("${taskText}")`;
        await $(`android=${selector}`).waitForExist();
        const task = $(`android=${selector}`);
        return task;
      }

      async taskDueDate(dueDate, index) {
        const parentSelector = `new UiSelector().className("android.widget.LinearLayout")`;
        await $(`android=${parentSelector}`).waitForExist();
        const allTaskElements = $$(`android=${parentSelector}`); // $$ for selecting multiple elements
    
        // Select the element by index from the array
        const taskElement = allTaskElements[index];
    
        // Find a child element within the parent using UiSelector
        const childSelector = `new UiSelector().className("android.widget.TextView").text("${dueDate}")`;
        await taskElement.$(`android=${childSelector}`).waitForExist();
        const dueDateElement = taskElement.$(`android=${childSelector}`);
    
        return dueDateElement;
    }

    async taskCheckBox(index) {
      const parentSelector = `new UiSelector().className("android.widget.LinearLayout")`;
      await $(`android=${parentSelector}`).waitForExist();
      const allTaskElements = $$(`android=${parentSelector}`); // $$ for selecting multiple elements
  
      // Select the element by index from the array
      const taskElement = allTaskElements[index];
  
      // Find a child element within the parent using UiSelector
      const childSelector = `new UiSelector().className("android.widget.CheckBox")`;
      await taskElement.$(`android=${childSelector}`).waitForExist();
      const checkBox = taskElement.$(`android=${childSelector}`);
      return checkBox;
  }

    get listsDropDown() {
      return $("android.widget.Spinner");
    }

    async listOptionFromListDDM(listName) {
      const selector = `new UiSelector().className("android.widget.TextView").text("${listName}")`;
      await $(`android=${selector}`).waitForExist();
  
      const list = $(`android=${selector}`);
      return list;
    }

    async taskStatusChangeMessage() {
      const selector = `new UiSelector().className("android.widget.TextView").text("Task forwarded to redo")`;
      await $(`android=${selector}`).waitForExist();
  
      const message = $(`android=${selector}`);
      return message;
    }
  
    //======================================Actions=======================================//
    async selectListOptionFromDDM(listName) {
      const list = await this.listOptionFromListDDM(listName);
      await list.click();
    }
  
    async openListsDropDown() {
      const dropdown = await this.listsDropDown;
      await dropdown.click();
    }

    async checkTaskAsUndone(index) {
      const taskCheckBox = await this.taskCheckBox(index);
      await taskCheckBox.click()
      
    }
  
    //=======================================Assertions===========================================//

    async verifyThatTaskIsDisplayed(taskDescription) {
      const task = await this.taskFromTheList(taskDescription);
      await task.waitForExist();

    }

    async verifyThatTaskIsNotDisplayed(taskDescription) {
      const selector = `new UiSelector().className("android.widget.TextView").text("${taskDescription}")`;
      await $(`android=${selector}`).waitForExist({ reverse: true });
      const task = $(`android=${selector}`);
    }

    async verifyThatTaskDueDateIsCorrect(dueDate, index) {
      const taskDueDate = await this.taskDueDate(dueDate, index);
      const dueDateText =  await taskDueDate.getText();
      await expect(dueDateText).toEqual(dueDate)
    }

    async verifyThatStatusChangeMessageIsNotDisplayed() {
        const selector = `new UiSelector().className("android.widget.TextView").text("Task forwarded to redo")`;
        await $(`android=${selector}`).waitForExist({ reverse: true });
    }
  
    async verifyThatStatusChangeMessageIsDisplayed() {
        const selector = `new UiSelector().className("android.widget.TextView").text("Task forwarded to redo")`;
        await $(`android=${selector}`).waitForExist();
        const message = $(`android=${selector}`);
        return message;
    }

    
  }
  module.exports = new FinishedListScreen();