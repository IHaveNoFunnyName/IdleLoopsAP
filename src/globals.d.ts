export { };
declare global {
    var towns: any;
    var skills: any;
    var buffs: any;
    var actions: any;
    var view: any;
    var stats: any;
    var resources: any;
    var resourcesTemplate: any;
    var gameSpeed: any;
    var shouldRestart: any;
    var timer: any;
    var timeCounter: any;
    var effectiveTime: any;
    var timeNeeded: any;
    var totalOfflineMs: any;
    var totalActionList: any;
    var saveName: any;
    var gameIsStopped: any;
    var Action: any;
    var LevelExp: any;
    var Localization: any;
    var Koviko: any;

    var restart: any;
    var resetResources: any;
    var restartStats: any;
    var copyObject: any;
    var addResource: any;
    var load: any;
    var stop: any;
    var pauseGame: any;
    var getSkillLevel: any;
    var getTotalBonusXP: any;
    var setOption: any;
    var intToString: any;
    var getSpeedMult: any;

    interface Window {
        [key: string]: any;
    }
}