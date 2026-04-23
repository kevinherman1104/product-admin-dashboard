Feature: Products Management

    Background:
        Given I am on the login page
        When I enter valid credentials
        And I click the submit button
        Then I am on the products page

    Scenario: Add a new product and verify it appears in the table
        When I click the add product button
        And I fill in the product details with name "Test Widget", price "10", category "Electronics" and description "A test product"
        And I click the save product button
        Then the dialog should be closed
        And I should see "Test Widget" in the products grid
        And the price for "Test Widget" should display as "11"
        And the category for "Test Widget" should display as "Electronics"
    
    Scenario: Show validation when submitting empty form
        When I click the add product button
        And I click the save product button
        Then the product name field should be marked as required
        And the dialog should remain open

    Scenario: Show validation when submitting incomplete form 
        When I click the add product button
        And I fill in the product details with name "Test", price "10", category "Electronics" and description ""
        And I click the save product button
        Then the description field should be marked as required
        And the dialog should remain open

    Scenario: Cancel adding a product
        When I click the add product button
        And I fill in the product details with name "Unsaved Product", price "10", category "Electronics" and description "Should not be saved"
        And I click the cancel button
        Then the dialog should be closed
        And I should not see "Unsaved Product" in the products grid