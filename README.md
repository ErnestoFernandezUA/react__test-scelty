[DEMO](https://ernestofernandezua.github.io/react__test-scelty/)

includes:
  - toolkit
  - persist
  - react-router-dom v6.6
  
#Part 2#
Make three separate pages with this Svelte Kit:
SignUp, ResultV1, ResultV2

Working stack:
(sass, vite, svelte-kit, svelte-store - here React)

`SignUp` 
Contains two forms with the following fields:

  `form #1`:
  - сarBrand
  - zipCode

  `form #2`:
  - firstName
  - lastName
  - carModel
  - firstRegistration

Each form has a  back button & next button, which takes a step behind\forward. 

Those field has its own validation rules:
- car Brand( Audi, BMW, Nissan )
- zipCode ( 65000, 66000, 67000, 68000 )

All rest fields are just required, without validation rules.

Validation error message - show a pop-up window with a relevant message. For example that the brand or postal code is unfortunately not serviced. 
If all right - move to the next step

##ResultV1
Display all previously entered data. Components are designed by our choice.

##ResultV2
Same as ResultV1, but: 
First Name + Last Name displayed in one field as FullName
Car Model + Car Brand displayed in one field as Car.

Logic flow:
Step 1 - shows form #1
Step 2 - shows form #2
Step 3 - shows ResultV1/ResultV2 page

After pressing next on step 2 - show a loading window with a progress bar of 0-100% for 6 seconds with a simulated load, after which the redirection randomly to ResultV1 or ResultV2 page
Note: 
Pages ResultV1 and ResultV2 can use one wrapper
No need to use a router to switch to ResultV1/ResultV2 just use a normal redirect
Steps in SignUp page switches with animation
