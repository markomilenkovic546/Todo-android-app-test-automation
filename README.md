# TODO List - Android App Test Automation

## Overview

This project is designed to automate the testing of a TODO list Android application using the WebdriverIO and Appium frameworks. It focuses on the testing of two main features: List Management and Task Management.

## Prerequisites

Before running the tests, ensure that you have the following prerequisites installed on your local machine:

- **Java Development Kit**: You will need Java Development Kit (JDK) installed on your machine, as Appium is a Java-based automation tool.

- **Appium Server**: Install and set up the Appium server. [Appium's official website](http://appium.io/).

- **Virtual Device**: Set up an Android virtual device for testing according to capabilities in `wdio.config.js` . You can use tools like Android Emulator or Genymotion to create virtual devices.

- **UIAutomator2**: Ensure that UIAutomator2 is configured for your virtual device. This is necessary for interacting with the Android UI elements.

- To install the necessary dependencies for your project, you should run the following command in your project's root directory: `npm install` 


## Project Structure

- **`screens` folder**: Contains classes where the screen object model is created for the application screens.

- **`e2e-specs` folder**: Contains spec files that contain end-to-end tests.

- **`custom-commands` folder**: Contains custom commands.

- **`fixtures` folder**: Contains test data.

## Running Tests

To run specific test scripts, use the following NPM scripts:

- To run the List Management tests:
`npm run list-management-spec`

- To run the Task Management tests:
`npm run task-management-spec`

- To run all spec files:
`npx wdio wdio.conf.js`

# Generating and Viewing Allure Test Run Reports
Once the the test run is finished, in order to generate test run report and run local server to open report in the browser, run the command `allure generate allure-results && allure open`
