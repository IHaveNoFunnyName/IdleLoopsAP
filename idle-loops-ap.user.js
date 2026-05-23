// ==UserScript==
// @name         Idle Loops AP
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Mod for Idle Loops to integrate with AP
// @author       Neffy
// @include      https://lloyd-delacroix.github.io/omsi-loops/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==
function loadScript(id, src) {
	const script = document.createElement('script');
	const version = '0.1.0';
	script.id = id;
	script.src = `${src}-${version}.js`;
	script.setAttribute('crossorigin', 'anonymous');
	document.head.appendChild(script);
}
setTimeout(() => loadScript('IdleLoopsAP', 'https://IHaveNoFunnyName.github.io/IdleLoopsAP/' + 'idle-loops-ap'), 200);