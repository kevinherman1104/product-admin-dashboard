Feature: Products Management

    Background:
        Given I am on the login page
        When I enter valid credentials
        And I click the submit button
        And I am on the products page

    Scenario: Add a new product and verify it appears in the table
        When I click the add product button
        And I fill in the product details with name "Test Widget", price "10", category "Electronics" and description "A test product"
        And I click the save product button
        Then the dialog should be closed
        And I should see "Test Widget" in the products grid
        And the price for "Test Widget" should display as "$11"
        And the category for "Test Widget" should display as "Electronics"

    Scenario: Show validation error when submitting incomplete form
        When I click the add product button
        And I fill in the product details with name "Test", price "10", category "Electronics" and description ""
        And I click the save product button
        Then I should see a Description field validation error
        And the dialog should remain open

    Scenario: Show validation when submitting empty form
        When I click the add product button
        And I click the save product button
        Then the product name field should be marked as required
        And the dialog should remain open

    Scenario: Close modal by clicking outside without adding a product
        When I click the add product button
        And I close the dialog by clicking outside
        Then the dialog should be closed
        And the products grid should not contain "Unsaved Product"