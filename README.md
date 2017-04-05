Tech Test
=========

Intro
-----

Hi!

Start off with `./src`.

I've intended to demonstrate testing of the reducer functions as a whole, and
whilst I could most likely make a test for every single function, you can see
where I'm going with it and it's not like they'd be difficult to test because
all functions I have created are entirely side-effect free and pure also.

I defined a data structure for both the product objects, and an abstract format
to define the discounts which would in real world terms be stored in a database
somewhere so that a user could define and store their own discounts dynamically.

See `./src/data.js` to see those structures.

Unfortunately the day I picked to do the test has been a bit disrupted by various
errands and happenings, which has meant that I could not do the whole project
in one sitting, I'd imagine that it in total took me around three hours, but
as per your guidelines, I preferred to be thorough and buid something based
fully on the redux/reducer way of thinking about things, functional programming
and generally being clean and expressing data purely in terms of tranformations.

Also to note, floating point is useless for things involving money, so I've used
`decimal.js` which provides (albeit slower) accurate calculations because for
shops money is involved.

Discounts
---------

  * Portal guns have £5 off
  * Curse removing stones are 50% off
  * If there is some beer in the order, the whole order is 50% off


Things I would have likely done given more time:
------------------------------------------------

 * More tests of the `discount.js` file, as that applies reductions and
   transformations in order to update the state based on the discount rules.
 * More tests of various helper functions.
 * Perhaps demonstrate how the discounts and products could be loaded off of
   a backend as opposed to stored as data.
 * Make it look not as ugly.

Usage
-----

How to make it work:

    1. Run `yarn`
    2. Run `gulp dev-bundle`
    3. Open port 3000 in your browser.