// ==UserScript==
// @name         Idle Loops AP
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Mod for Idle Loops to integrate with AP
// @author       Neffy
// @include      https://lloyd-delacroix.github.io/omsi-loops/
// @include      https://dmchurch.github.io/omsi-loops/
// @icon         https://dmchurch.github.io/omsi-loops/favicon-16x16.png
// @grant        none
// ==/UserScript==
function loadScript(id, src) {
	const script = document.createElement('script');
	script.id = 'IdleLoopsAP';
	const version = window.localStorage.getItem('IdleLoopsAPVersion') || '-0.4.2';
	script.src = 'https://IHaveNoFunnyName.github.io/IdleLoopsAP/idle-loops-ap' + version + '.js';
	script.setAttribute('crossorigin', 'anonymous');
	document.head.appendChild(script);
}
setTimeout(() => loadScript(), 200);