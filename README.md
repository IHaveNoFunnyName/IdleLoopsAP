# Install
Click [\<\<HERE\>\>](https://ihavenofunnyname.github.io/IdleLoopsAP/idle-loops-ap.user.js) assuming you have tapermonkey installed 

# Current Issues/TODO
- More UI modding for scouting

# Dev Stuff
When working locally, `npm run dev` will serve the project directory, updating files on save.

Edit your installed `x.user.js` (in Tampermonkey) to say `script.src = '{one of the links spat out by npm run dev}';`
and local changes will be availible simply by refreshing the page.

When making a release (the process being... copying the built js and adding a version number) delete the last line so the user doesn't load a huge source map.