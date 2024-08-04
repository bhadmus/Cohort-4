Feature: Testing Login Journeys

    Scenario: A user with valid credentials should be able to login susccessfully
    * I am on the mima home page
    When I click The "Log in" Button
    And I fill in the "email"
    * I fill in the "password"
    * I click The "Login" Button
    * I should see the dashboard sidebar content
      | panel        |
      | Customer     |
      | Booking      |
      | Orders       |
      | Payment Link |
      | Paybills     |
      | Stock        |
