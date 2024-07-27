Feature: Calendar Component

  Scenario: Calender types should be displayed correctly.
    Given the user navigates to the calendar page
    Then the user should see these calender types
      | CalendarType |
      | Gregorian    |
      | Jalaali      |

  Scenario: the user should see today's date correctly and navigate between months with Gregorian calender.
    Given Today's date should be
      | Year | Month | Day |
      | 2023 | 5     | 27  |
    And the user navigates to the calendar page
    Then the 27 should be highlighted as today
    And the user should see "2023 June" as label of calendar
    When the user clicks on the next button
    Then the user should see "2023 July" as label of calendar
    When the user clicks on the previous button
    And the user clicks on the previous button
    Then the user should see "2023 May" as label of calendar

  Scenario: the user should be able to changes the calender to Jalaali, see today's date correctly and navigate between months.
    Given Today's date should be
      | Year | Month | Day |
      | 2023 | 5     | 27  |
    And the user navigates to the calendar page
    When the user selects 'Jalaali' calender type
    Then the 6 should be highlighted as today
    And the user should see "1402 تیر" as label of calendar
    When the user clicks on the next button
    Then the user should see "1402 مرداد" as label of calendar
    When the user clicks on the previous button
    And the user clicks on the previous button
    Then the user should see "1402 خرداد" as label of calendar

  Scenario: the week name should be displayed correctly on Gregorian calendar
    Given the user navigates to the calendar page
    Then the user should see these data as a week names
      | Sunday | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday |
      | Sun    | Mon    | Tue     | Wed       | Thu      | Fri    | Sat      |

  Scenario: the week name should be displayed correctly on Jalaali calendar
    Given the user navigates to the calendar page
    When the user selects 'Jalaali' calender type
    Then the user should see these data as a week names
      | Saturday | Sunday | Monday | Tuesday | Wednesday | Thursday | Friday |
      | شنبه     | یکشنبه | دوشنبه | سه‌شنبه | چهارشنبه  | پنجشنبه  | جمعه   |
