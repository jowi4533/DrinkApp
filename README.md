1. In the App.js we create the navigation stacks for routing within the app.
2. All the different views are found in jojax/screens folder.
3. We have some custom components (most buttons) that are located at jojax/components.
4. We have a color scheme that we import to all views located in the jojax/assets folder.
5. The custom fonts are located at jojax/fonts. We had some issues placing them in the assets folder so we had to keep them outside.
6. Some images are located in jojax/pictures folder. The rest are stored in the database.



The explore tab contains of the following screens:

Explore: { screen: Explorescreen }, --- first screen of explore tab
SpecDrinks: { screen: SpecificDrinkscreen }, --- when clickin in on a drink
DrinkCategory: { screen: DrinkCategoryScreen } --- when clicking on a category

-----

The drink tab contains of the following screens:

AllDrinks: { screen: Drinkscreen }, --- the first screen on the drink tab
SpecDrinks: { screen: SpecificDrinkscreen } --- when clickin in on a drink

-----

The mypage tab contains of the following screens:

MyPage: { screen: MyPagescreen },
MyBar: { screen: MyBarscreen },
MyFavoriteDrinks: { screen: MyFavoriteDrinksscreen },
MyNotes: { screen: MyNotesscreen },
Register: { screen: Registerscreen },
Login: { screen: Loginscreen },
SpecDrinks: { screen: SpecificDrinkscreen },
NewNote: { screen: NewNotescreen },
EditNote: { screen: EditNotescreen }

-----
