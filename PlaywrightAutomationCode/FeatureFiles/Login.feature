Feature: Orange HRM Functionality

    Background: Login
        When I login OrangeHRM application

    Scenario: To validate Assign leave page

        And I Navigate to assign leave page
        When I enter employee details "<employeeName>"

        Examples:
            | employeeName | leaveType | fromDate |
            | Suruthi      |           |          |
