# how to start the app?
1. The application requires only `yarn install` and `yarn start` to install and launch. `npm` can be used in place of yarn.
2. run `expo start`

# What you can do?
1. The primary view, seen when the app loads, is a list of created decks which includes the name of each deck and the number of cards.
2. Pressing on a deck in the list should generate an animation, and the app should route to an individual deck view.
3. The individual deck view includes (at a minimum):
    - The deck title
    - number of cards in the deck
    - option to start a quiz for that deck
    - option to add a new question to the deck
4. Pressing the `Start Quiz` or `Add Card` button properly routes to the correct views for those activities.
5. Pressing the 'Start a Quiz' or 'Add Card' button properly routes to the correct views for those activities.
6. Submitting the form correctly adds the question to the deck.
7. The Quiz view starts with a question from the selected deck.
8. The question is displayed, along with a button to show the answer.
9. Pressing the 'Show Answer' button displays the answer.
10. Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
11. The view displays the number of questions remaining.
12. When the last question is answered, a score is displayed. This can be displayed as a percentage of correct answers or just the number of questions answered correctly.
13. When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
14. Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their respective views.
15. The view includes a form for creating a new deck - which should just be an input for the title and a 'Create Deck' button.
16. Pressing the button correctly creates the deck and routes the user to the Individual Deck view for the new deck.
17. Logic for notification has been implemented. Notifications are generated at a specific time if the user hasn't completed at least one quiz for that day.
18. The app works correctly in either Android OR iOS devices (or emulator).
19. Project README identifies which platform(s) have been tested.
20. Project code uses reasonable naming conventions. Components are written for reuse and use a modular structure.
21. There are no build errors when starting the app. There are no errors while using the app. There are no warnings that resulted from not following the best practices listed in the documentation, such as using key for list items. All code is functional and formatted properly.

