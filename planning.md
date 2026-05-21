# Goal

Mod the game by overwriting functions and Proxy()'ing the game's objects (they live in global scope), so that locations send to AP (and not their usual unlock) and items read from recieved checks yada yada you know how AP works. Proxy() instead of just setting them as to not have to worry about overwriting more functions than is needed (to stop the game from changing them back).

Userscript is probably the best install method (rather than forking the game), it's been 3 years since an update i'm not worried about it breaking, and there's a named (interally) save system for challenges i can piggy back on to not touch unmodded save data.

Don't touch in loop logic - i.e. `buy supplies` should always give you supplies when finished, rather than needing a "`buy supplies` gives supplies" item or randomising what z1 action gives it. Put another way, with all checks done the game should play normally.

ofc exceptions to this will be made like a 'starting mana' filler, but that's the guiding principle.

## Actions

##### Progress bar ('Progress' internally, i'll call it 'Bar' in AP to differentiate from progression checks)
###### Locations
* 1%/Generic first finish
* 100%
* Checks through the bar? That feels good. But Progress bars give total/unchecked regular actions per %, and i've decided it should stay like that, so maybe more checks are unneeded. But it would feel good.
###### Items
* Unlocking the action 

##### Limited ('Limited'/'Regular' internally)
###### Locations
Other actions add total/unchecked counts as per normal, but checking them sends checks to AP and does NOT itself give a lootable ('good' internally) item. You receive good items from AP.
* Generic first finish
* Every time you get a good item
###### Items
* Good items, the first one also unlocks the action.
* As filler above what's normally possible in game?

I will be happy getting this done as a PoC first without having to worry about the other action types in other zones and even in Z1