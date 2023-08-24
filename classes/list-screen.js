class ListScreen {

    // Elements
      async taskFromTheList(taskText) {
        const selector = `new UiSelector().className("android.widget.TextView").text("${taskText}")`;
        await $(`android=${selector}`).waitForExist();
        const task = $(`android=${selector}`);
        return task;
      }

      async taskDueDate(dueDate) {
        const parentSelector = `new UiSelector().className("android.widget.LinearLayout")`;
        await $(`android=${parentSelector}`).waitForExist();
        const allTaskElements = $$(`android=${parentSelector}`); // $$ for selecting multiple elements
    
        // Select the first element (index 0) from the array
        const taskElement = allTaskElements[0];
    
        // Now let's find a child element within the parent using UiSelector
        const childSelector = `new UiSelector().className("android.widget.TextView").text("${dueDate}")`;
        await taskElement.$(`android=${childSelector}`).waitForExist();
        const dueDateElement = taskElement.$(`android=${childSelector}`);
    
        return dueDateElement;
    }
  
    //actions
 
  
    // Assertions

    async verifyThatTaskIsDisplayed(taskDescription) {
      const task = await this.taskFromTheList(taskDescription);
      await task.waitForExist();
    }

    async verifyThatTaskDueDateIsCorrect(dueDate) {
      const taskDueDate = await this.taskDueDate(dueDate);
      const dueDateText =  await taskDueDate.getText();
      await expect(dueDateText).toEqual(dueDate)
    }
  }
  module.exports = new ListScreen();
  