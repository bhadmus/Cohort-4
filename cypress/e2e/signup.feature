Feature: Testing Signup Journeys

  Scenario Outline: Verify that a user can sign up using <source> as a source of info
    Given I am on the mima home page
    When I click The "Sign up" Button
    Then I should see the sign up form page
    When I fill in the "full name"
    And I fill in the "business name"
    And I fill in the "business email"
    And I fill in the "business phone number"
    And I fill in the "business registeration number"
    And I click The "Next" Button
    And I select how I heard about mima through "<source>"
    And I fill in the "password"
    And I click The "Sign Up" Button
    # And I insert the OTP
    # Then I should see the dashboard sidebar content
    #   | panel        |
    #   | Customer     |
    #   | Booking      |
    #   | Orders       |
    #   | Payment Link |
    #   | Paybills     |
    #   | Stock        |
    Examples:
      | source           |
      | Facebook         |
      # | Twitter          |
      # | Others           |
      # | Friends & Family |