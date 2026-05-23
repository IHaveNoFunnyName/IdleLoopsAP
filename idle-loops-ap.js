
(async function() {
    'use strict';

    const AP = await import("https://IHaveNoFunnyName.github.io/IdleLoopsAP/archipelago.min.js");

    // I don't know how i'm meant to do this but the AP client seems to only take ids, so i'll just paste in location_name_to_ids from the .apworld
    const location_name_to_id = {'Z1 - Wander - 1%': 1, 'Z1 - Wander - 10%': 2, 'Z1 - Wander - 25%': 3, 'Z1 - Wander - 50%': 4, 'Z1 - Wander - 75%': 5, 'Z1 - Wander - 90%': 6, 'Z1 - Wander - 95%': 7, 'Z1 - Wander - 99%': 8, 'Z1 - Wander - 100%': 9, 'Z1 - Pots - #1': 10, 'Z1 - Pots - #2': 11, 'Z1 - Pots - #3': 12, 'Z1 - Pots - #4': 13, 'Z1 - Pots - #5': 14, 'Z1 - Pots - #6': 15, 'Z1 - Pots - #7': 16, 'Z1 - Pots - #8': 17, 'Z1 - Pots - #9': 18, 'Z1 - Pots - #10': 19, 'Z1 - Pots - #11': 20, 'Z1 - Pots - #12': 21, 'Z1 - Pots - #13': 22, 'Z1 - Pots - #14': 23, 'Z1 - Pots - #15': 24, 'Z1 - Pots - #16': 25, 'Z1 - Pots - #17': 26, 'Z1 - Pots - #18': 27, 'Z1 - Pots - #19': 28, 'Z1 - Pots - #20': 29, 'Z1 - Pots - #21': 30, 'Z1 - Pots - #22': 31, 'Z1 - Pots - #23': 32, 'Z1 - Pots - #24': 33, 'Z1 - Pots - #25': 34, 'Z1 - Pots - #26': 35, 'Z1 - Pots - #27': 36, 'Z1 - Pots - #28': 37, 'Z1 - Pots - #29': 38, 'Z1 - Pots - #30': 39, 'Z1 - Pots - #31': 40, 'Z1 - Pots - #32': 41, 'Z1 - Pots - #33': 42, 'Z1 - Pots - #34': 43, 'Z1 - Pots - #35': 44, 'Z1 - Pots - #36': 45, 'Z1 - Pots - #37': 46, 'Z1 - Pots - #38': 47, 'Z1 - Pots - #39': 48, 'Z1 - Pots - #40': 49, 'Z1 - Pots - #41': 50, 'Z1 - Pots - #42': 51, 'Z1 - Pots - #43': 52, 'Z1 - Pots - #44': 53, 'Z1 - Pots - #45': 54, 'Z1 - Pots - #46': 55, 'Z1 - Pots - #47': 56, 'Z1 - Pots - #48': 57, 'Z1 - Pots - #49': 58, 'Z1 - Pots - #50': 59, 'Z1 - Locks - #1': 60, 'Z1 - Locks - #2': 61, 'Z1 - Locks - #3': 62, 'Z1 - Locks - #4': 63, 'Z1 - Locks - #5': 64, 'Z1 - Locks - #6': 65, 'Z1 - Locks - #7': 66, 'Z1 - Locks - #8': 67, 'Z1 - Locks - #9': 68, 'Z1 - Locks - #10': 69, 'Z1 - BuyGlasses': 70, 'Z1 - BuyManaZ1': 71, 'Z1 - Met - 1%': 72, 'Z1 - Met - 10%': 73, 'Z1 - Met - 25%': 74, 'Z1 - Met - 50%': 75, 'Z1 - Met - 75%': 76, 'Z1 - Met - 90%': 77, 'Z1 - Met - 95%': 78, 'Z1 - Met - 99%': 79, 'Z1 - Met - 100%': 80, 'Z1 - TrainStrength': 81, 'Z1 - SQuests - #1': 82, 'Z1 - SQuests - #2': 83, 'Z1 - SQuests - #3': 84, 'Z1 - SQuests - #4': 85, 'Z1 - SQuests - #5': 86, 'Z1 - SQuests - #6': 87, 'Z1 - SQuests - #7': 88, 'Z1 - SQuests - #8': 89, 'Z1 - SQuests - #9': 90, 'Z1 - SQuests - #10': 91, 'Z1 - SQuests - #11': 92, 'Z1 - SQuests - #12': 93, 'Z1 - SQuests - #13': 94, 'Z1 - SQuests - #14': 95, 'Z1 - SQuests - #15': 96, 'Z1 - SQuests - #16': 97, 'Z1 - SQuests - #17': 98, 'Z1 - SQuests - #18': 99, 'Z1 - SQuests - #19': 100, 'Z1 - SQuests - #20': 101, 'Z1 - Secrets - 1%': 102, 'Z1 - Secrets - 10%': 103, 'Z1 - Secrets - 25%': 104, 'Z1 - Secrets - 50%': 105, 'Z1 - Secrets - 75%': 106, 'Z1 - Secrets - 90%': 107, 'Z1 - Secrets - 95%': 108, 'Z1 - Secrets - 99%': 109, 'Z1 - Secrets - 100%': 110, 'Z1 - LQuests - #1': 111, 'Z1 - LQuests - #2': 112, 'Z1 - LQuests - #3': 113, 'Z1 - LQuests - #4': 114, 'Z1 - LQuests - #5': 115, 'Z1 - LQuests - #6': 116, 'Z1 - LQuests - #7': 117, 'Z1 - LQuests - #8': 118, 'Z1 - LQuests - #9': 119, 'Z1 - LQuests - #10': 120, 'Z1 - ThrowParty': 121, 'Z1 - WarriorLessons': 122, 'Z1 - MageLessons': 123, 'Z1 - Heal - Completion #1': 124, 'Z1 - Fight - Completion #1': 125, 'Z1 - SDungeon - Completion #1': 126, 'Z1 - BuySupplies': 127, 'Z1 - Haggle': 128, 'Z1 - StartJourney': 129, 'Z2 - Forest - 1%': 130, 'Z2 - Forest - 10%': 131, 'Z2 - Forest - 25%': 132, 'Z2 - Forest - 50%': 133, 'Z2 - Forest - 75%': 134, 'Z2 - Forest - 90%': 135, 'Z2 - Forest - 95%': 136, 'Z2 - Forest - 99%': 137, 'Z2 - Forest - 100%': 138, 'Z2 - WildMana - #1': 139, 'Z2 - WildMana - #2': 140, 'Z2 - WildMana - #3': 141, 'Z2 - WildMana - #4': 142, 'Z2 - WildMana - #5': 143, 'Z2 - WildMana - #6': 144, 'Z2 - WildMana - #7': 145, 'Z2 - WildMana - #8': 146, 'Z2 - WildMana - #9': 147, 'Z2 - WildMana - #10': 148, 'Z2 - WildMana - #11': 149, 'Z2 - WildMana - #12': 150, 'Z2 - WildMana - #13': 151, 'Z2 - WildMana - #14': 152, 'Z2 - WildMana - #15': 153, 'Z2 - WildMana - #16': 154, 'Z2 - WildMana - #17': 155, 'Z2 - WildMana - #18': 156, 'Z2 - WildMana - #19': 157, 'Z2 - WildMana - #20': 158, 'Z2 - WildMana - #21': 159, 'Z2 - WildMana - #22': 160, 'Z2 - WildMana - #23': 161, 'Z2 - WildMana - #24': 162, 'Z2 - WildMana - #25': 163, 'Z2 - WildMana - #26': 164, 'Z2 - WildMana - #27': 165, 'Z2 - WildMana - #28': 166, 'Z2 - WildMana - #29': 167, 'Z2 - WildMana - #30': 168, 'Z2 - WildMana - #31': 169, 'Z2 - WildMana - #32': 170, 'Z2 - WildMana - #33': 171, 'Z2 - WildMana - #34': 172, 'Z2 - WildMana - #35': 173, 'Z2 - WildMana - #36': 174, 'Z2 - WildMana - #37': 175, 'Z2 - WildMana - #38': 176, 'Z2 - WildMana - #39': 177, 'Z2 - WildMana - #40': 178, 'Z2 - WildMana - #41': 179, 'Z2 - WildMana - #42': 180, 'Z2 - WildMana - #43': 181, 'Z2 - WildMana - #44': 182, 'Z2 - WildMana - #45': 183, 'Z2 - WildMana - #46': 184, 'Z2 - WildMana - #47': 185, 'Z2 - WildMana - #48': 186, 'Z2 - WildMana - #49': 187, 'Z2 - WildMana - #50': 188, 'Z2 - WildMana - #51': 189, 'Z2 - WildMana - #52': 190, 'Z2 - WildMana - #53': 191, 'Z2 - WildMana - #54': 192, 'Z2 - WildMana - #55': 193, 'Z2 - WildMana - #56': 194, 'Z2 - WildMana - #57': 195, 'Z2 - WildMana - #58': 196, 'Z2 - WildMana - #59': 197, 'Z2 - WildMana - #60': 198, 'Z2 - WildMana - #61': 199, 'Z2 - WildMana - #62': 200, 'Z2 - WildMana - #63': 201, 'Z2 - WildMana - #64': 202, 'Z2 - WildMana - #65': 203, 'Z2 - WildMana - #66': 204, 'Z2 - WildMana - #67': 205, 'Z2 - WildMana - #68': 206, 'Z2 - WildMana - #69': 207, 'Z2 - WildMana - #70': 208, 'Z2 - WildMana - #71': 209, 'Z2 - WildMana - #72': 210, 'Z2 - WildMana - #73': 211, 'Z2 - WildMana - #74': 212, 'Z2 - WildMana - #75': 213, 'Z2 - WildMana - #76': 214, 'Z2 - WildMana - #77': 215, 'Z2 - WildMana - #78': 216, 'Z2 - WildMana - #79': 217, 'Z2 - WildMana - #80': 218, 'Z2 - WildMana - #81': 219, 'Z2 - WildMana - #82': 220, 'Z2 - WildMana - #83': 221, 'Z2 - WildMana - #84': 222, 'Z2 - WildMana - #85': 223, 'Z2 - WildMana - #86': 224, 'Z2 - WildMana - #87': 225, 'Z2 - WildMana - #88': 226, 'Z2 - WildMana - #89': 227, 'Z2 - WildMana - #90': 228, 'Z2 - WildMana - #91': 229, 'Z2 - WildMana - #92': 230, 'Z2 - WildMana - #93': 231, 'Z2 - WildMana - #94': 232, 'Z2 - WildMana - #95': 233, 'Z2 - WildMana - #96': 234, 'Z2 - WildMana - #97': 235, 'Z2 - WildMana - #98': 236, 'Z2 - WildMana - #99': 237, 'Z2 - WildMana - #100': 238, 'Z2 - Herbs - #1': 239, 'Z2 - Herbs - #2': 240, 'Z2 - Herbs - #3': 241, 'Z2 - Herbs - #4': 242, 'Z2 - Herbs - #5': 243, 'Z2 - Herbs - #6': 244, 'Z2 - Herbs - #7': 245, 'Z2 - Herbs - #8': 246, 'Z2 - Herbs - #9': 247, 'Z2 - Herbs - #10': 248, 'Z2 - Herbs - #11': 249, 'Z2 - Herbs - #12': 250, 'Z2 - Herbs - #13': 251, 'Z2 - Herbs - #14': 252, 'Z2 - Herbs - #15': 253, 'Z2 - Herbs - #16': 254, 'Z2 - Herbs - #17': 255, 'Z2 - Herbs - #18': 256, 'Z2 - Herbs - #19': 257, 'Z2 - Herbs - #20': 258, 'Z2 - Herbs - #21': 259, 'Z2 - Herbs - #22': 260, 'Z2 - Herbs - #23': 261, 'Z2 - Herbs - #24': 262, 'Z2 - Herbs - #25': 263, 'Z2 - Herbs - #26': 264, 'Z2 - Herbs - #27': 265, 'Z2 - Herbs - #28': 266, 'Z2 - Herbs - #29': 267, 'Z2 - Herbs - #30': 268, 'Z2 - Herbs - #31': 269, 'Z2 - Herbs - #32': 270, 'Z2 - Herbs - #33': 271, 'Z2 - Herbs - #34': 272, 'Z2 - Herbs - #35': 273, 'Z2 - Herbs - #36': 274, 'Z2 - Herbs - #37': 275, 'Z2 - Herbs - #38': 276, 'Z2 - Herbs - #39': 277, 'Z2 - Herbs - #40': 278, 'Z2 - Herbs - #41': 279, 'Z2 - Herbs - #42': 280, 'Z2 - Herbs - #43': 281, 'Z2 - Herbs - #44': 282, 'Z2 - Herbs - #45': 283, 'Z2 - Herbs - #46': 284, 'Z2 - Herbs - #47': 285, 'Z2 - Herbs - #48': 286, 'Z2 - Herbs - #49': 287, 'Z2 - Herbs - #50': 288, 'Z2 - Herbs - #51': 289, 'Z2 - Herbs - #52': 290, 'Z2 - Herbs - #53': 291, 'Z2 - Herbs - #54': 292, 'Z2 - Herbs - #55': 293, 'Z2 - Herbs - #56': 294, 'Z2 - Herbs - #57': 295, 'Z2 - Herbs - #58': 296, 'Z2 - Herbs - #59': 297, 'Z2 - Herbs - #60': 298, 'Z2 - Herbs - #61': 299, 'Z2 - Herbs - #62': 300, 'Z2 - Herbs - #63': 301, 'Z2 - Herbs - #64': 302, 'Z2 - Herbs - #65': 303, 'Z2 - Herbs - #66': 304, 'Z2 - Herbs - #67': 305, 'Z2 - Herbs - #68': 306, 'Z2 - Herbs - #69': 307, 'Z2 - Herbs - #70': 308, 'Z2 - Herbs - #71': 309, 'Z2 - Herbs - #72': 310, 'Z2 - Herbs - #73': 311, 'Z2 - Herbs - #74': 312, 'Z2 - Herbs - #75': 313, 'Z2 - Herbs - #76': 314, 'Z2 - Herbs - #77': 315, 'Z2 - Herbs - #78': 316, 'Z2 - Herbs - #79': 317, 'Z2 - Herbs - #80': 318, 'Z2 - Herbs - #81': 319, 'Z2 - Herbs - #82': 320, 'Z2 - Herbs - #83': 321, 'Z2 - Herbs - #84': 322, 'Z2 - Herbs - #85': 323, 'Z2 - Herbs - #86': 324, 'Z2 - Herbs - #87': 325, 'Z2 - Herbs - #88': 326, 'Z2 - Herbs - #89': 327, 'Z2 - Herbs - #90': 328, 'Z2 - Herbs - #91': 329, 'Z2 - Herbs - #92': 330, 'Z2 - Herbs - #93': 331, 'Z2 - Herbs - #94': 332, 'Z2 - Herbs - #95': 333, 'Z2 - Herbs - #96': 334, 'Z2 - Herbs - #97': 335, 'Z2 - Herbs - #98': 336, 'Z2 - Herbs - #99': 337, 'Z2 - Herbs - #100': 338, 'Z2 - Herbs - #101': 339, 'Z2 - Herbs - #102': 340, 'Z2 - Herbs - #103': 341, 'Z2 - Herbs - #104': 342, 'Z2 - Herbs - #105': 343, 'Z2 - Herbs - #106': 344, 'Z2 - Herbs - #107': 345, 'Z2 - Herbs - #108': 346, 'Z2 - Herbs - #109': 347, 'Z2 - Herbs - #110': 348, 'Z2 - Herbs - #111': 349, 'Z2 - Herbs - #112': 350, 'Z2 - Herbs - #113': 351, 'Z2 - Herbs - #114': 352, 'Z2 - Herbs - #115': 353, 'Z2 - Herbs - #116': 354, 'Z2 - Herbs - #117': 355, 'Z2 - Herbs - #118': 356, 'Z2 - Herbs - #119': 357, 'Z2 - Herbs - #120': 358, 'Z2 - Herbs - #121': 359, 'Z2 - Herbs - #122': 360, 'Z2 - Herbs - #123': 361, 'Z2 - Herbs - #124': 362, 'Z2 - Herbs - #125': 363, 'Z2 - Herbs - #126': 364, 'Z2 - Herbs - #127': 365, 'Z2 - Herbs - #128': 366, 'Z2 - Herbs - #129': 367, 'Z2 - Herbs - #130': 368, 'Z2 - Herbs - #131': 369, 'Z2 - Herbs - #132': 370, 'Z2 - Herbs - #133': 371, 'Z2 - Herbs - #134': 372, 'Z2 - Herbs - #135': 373, 'Z2 - Herbs - #136': 374, 'Z2 - Herbs - #137': 375, 'Z2 - Herbs - #138': 376, 'Z2 - Herbs - #139': 377, 'Z2 - Herbs - #140': 378, 'Z2 - Herbs - #141': 379, 'Z2 - Herbs - #142': 380, 'Z2 - Herbs - #143': 381, 'Z2 - Herbs - #144': 382, 'Z2 - Herbs - #145': 383, 'Z2 - Herbs - #146': 384, 'Z2 - Herbs - #147': 385, 'Z2 - Herbs - #148': 386, 'Z2 - Herbs - #149': 387, 'Z2 - Herbs - #150': 388, 'Z2 - Herbs - #151': 389, 'Z2 - Herbs - #152': 390, 'Z2 - Herbs - #153': 391, 'Z2 - Herbs - #154': 392, 'Z2 - Herbs - #155': 393, 'Z2 - Herbs - #156': 394, 'Z2 - Herbs - #157': 395, 'Z2 - Herbs - #158': 396, 'Z2 - Herbs - #159': 397, 'Z2 - Herbs - #160': 398, 'Z2 - Herbs - #161': 399, 'Z2 - Herbs - #162': 400, 'Z2 - Herbs - #163': 401, 'Z2 - Herbs - #164': 402, 'Z2 - Herbs - #165': 403, 'Z2 - Herbs - #166': 404, 'Z2 - Herbs - #167': 405, 'Z2 - Herbs - #168': 406, 'Z2 - Herbs - #169': 407, 'Z2 - Herbs - #170': 408, 'Z2 - Herbs - #171': 409, 'Z2 - Herbs - #172': 410, 'Z2 - Herbs - #173': 411, 'Z2 - Herbs - #174': 412, 'Z2 - Herbs - #175': 413, 'Z2 - Herbs - #176': 414, 'Z2 - Herbs - #177': 415, 'Z2 - Herbs - #178': 416, 'Z2 - Herbs - #179': 417, 'Z2 - Herbs - #180': 418, 'Z2 - Herbs - #181': 419, 'Z2 - Herbs - #182': 420, 'Z2 - Herbs - #183': 421, 'Z2 - Herbs - #184': 422, 'Z2 - Herbs - #185': 423, 'Z2 - Herbs - #186': 424, 'Z2 - Herbs - #187': 425, 'Z2 - Herbs - #188': 426, 'Z2 - Herbs - #189': 427, 'Z2 - Herbs - #190': 428, 'Z2 - Herbs - #191': 429, 'Z2 - Herbs - #192': 430, 'Z2 - Herbs - #193': 431, 'Z2 - Herbs - #194': 432, 'Z2 - Herbs - #195': 433, 'Z2 - Herbs - #196': 434, 'Z2 - Herbs - #197': 435, 'Z2 - Herbs - #198': 436, 'Z2 - Herbs - #199': 437, 'Z2 - Herbs - #200': 438, 'Z2 - Hunt - #1': 439, 'Z2 - Hunt - #2': 440, 'Z2 - Hunt - #3': 441, 'Z2 - Hunt - #4': 442, 'Z2 - Hunt - #5': 443, 'Z2 - Hunt - #6': 444, 'Z2 - Hunt - #7': 445, 'Z2 - Hunt - #8': 446, 'Z2 - Hunt - #9': 447, 'Z2 - Hunt - #10': 448, 'Z2 - SitByWaterfall': 449, 'Z2 - Shortcut - 1%': 450, 'Z2 - Shortcut - 10%': 451, 'Z2 - Shortcut - 25%': 452, 'Z2 - Shortcut - 50%': 453, 'Z2 - Shortcut - 75%': 454, 'Z2 - Shortcut - 90%': 455, 'Z2 - Shortcut - 95%': 456, 'Z2 - Shortcut - 99%': 457, 'Z2 - Shortcut - 100%': 458, 'Z2 - Hermit - 1%': 459, 'Z2 - Hermit - 10%': 460, 'Z2 - Hermit - 25%': 461, 'Z2 - Hermit - 50%': 462, 'Z2 - Hermit - 75%': 463, 'Z2 - Hermit - 90%': 464, 'Z2 - Hermit - 95%': 465, 'Z2 - Hermit - 99%': 466, 'Z2 - Hermit - 100%': 467, 'Z2 - PracticalMagic': 468, 'Z2 - LearnAlchemy': 469, 'Z2 - BrewPotions': 470, 'Z2 - TrainDexterity': 471, 'Z2 - TrainSpeed': 472, 'Z2 - Flowers - 1%': 473, 'Z2 - Flowers - 10%': 474, 'Z2 - Flowers - 25%': 475, 'Z2 - Flowers - 50%': 476, 'Z2 - Flowers - 75%': 477, 'Z2 - Flowers - 90%': 478, 'Z2 - Flowers - 95%': 479, 'Z2 - Flowers - 99%': 480, 'Z2 - Flowers - 100%': 481, 'Z2 - BirdWatching': 482, 'Z2 - Thicket - 1%': 483, 'Z2 - Thicket - 10%': 484, 'Z2 - Thicket - 25%': 485, 'Z2 - Thicket - 50%': 486, 'Z2 - Thicket - 75%': 487, 'Z2 - Thicket - 90%': 488, 'Z2 - Thicket - 95%': 489, 'Z2 - Thicket - 99%': 490, 'Z2 - Thicket - 100%': 491, 'Z2 - Witch - 1%': 492, 'Z2 - Witch - 10%': 493, 'Z2 - Witch - 25%': 494, 'Z2 - Witch - 50%': 495, 'Z2 - Witch - 75%': 496, 'Z2 - Witch - 90%': 497, 'Z2 - Witch - 95%': 498, 'Z2 - Witch - 99%': 499, 'Z2 - Witch - 100%': 500, 'Z2 - DarkMagic': 501, 'Z2 - DarkRitual - Completion #1': 502, 'Z2 - DarkRitual - Completion #2': 503, 'Z2 - DarkRitual - Completion #3': 504, 'Z2 - DarkRitual - Completion #4': 505, 'Z2 - DarkRitual - Completion #5': 506, 'Z2 - ContinueOn': 507}

    const bar_locations = [1, 10, 25, 50, 75, 90, 95, 99, 100];
    const limitedRewardRatios = {
        "Pots": 10,
        "Locks": 10,
        "SQuests": 5,
        "LQuests": 5,
    }

    class IdleLoopsAP_class {
        client = false;
        // 0 indexed to make conditions simpler
        goalZone = 0;
        state = {};
        location_name_to_id = location_name_to_id;
        
        /**
         * Called on script load, to inject the AP connect form
         */
        load() {
            // Some light CSS to deal with adding the connect form, but also now it's more centered than it ever was!
            const menu = document.getElementById("menu")
            menu.style.width = "1px";
            menu.style.display = "inline-flex";
            

            const connect = document.createElement("form");
            connect.id = "APconnect";
            connect.style.display = "inline-flex";
            connect.style.position = "fixed";
            connect.style.top = "15px";
            connect.style.right = 0;
            connect.style.width = "500px";
            connect.style.alignItems = "center";

            const apDefaults = {
                host: localStorage.getItem("APhost") || "archipelago.gg",
                port: localStorage.getItem("APport") || "",
                slotName: localStorage.getItem("APslotName") || ""
            };

            connect.addEventListener("submit", (e) => {
                e.preventDefault();

                const host = connect.querySelector("#APhost").value;
                const port = connect.querySelector("#APport").value;
                const slotName = connect.querySelector("#APslotName").value;
                localStorage.setItem("APhost", host);
                localStorage.setItem("APport", port);
                localStorage.setItem("APslotName", slotName);

                this.connect(host, port, slotName);
            });

            connect.innerHTML = `
                <span>Host:&nbsp;</span><input type="text" id="APhost" value="${apDefaults.host}" required style="width:50%;cursor:initial;">
                <span>&nbsp;Port:&nbsp;</span><input type="number" id="APport" value="${apDefaults.port}" required style="width:25%;cursor:initial;">
                <span>&nbsp;Name:&nbsp;</span><input type="text" id="APslotName" value="${apDefaults.slotName}" required style="width:50%;cursor:initial;">
                <button type="submit" style="padding:1px 10px">Connect</button>
            `;

            const manaDisplay = document.getElementById("trackedResources");
            manaDisplay.parentNode.insertBefore(connect, manaDisplay.nextSibling);
        }

        /**
         * Called on form submit. Connects to AP, loads a separate AP save, 
         */
        async connect(host, port, slotName) {
            this.client = new AP.Client();
            try {
                await this.client.login(host + ":" + port, slotName, "Idle Loops");
            } catch (err) {
                alert("Connection failed: " + err);
                return;
            }
            document.getElementById("APconnect").remove();
            this.setup();
            saveName = "APSave" + slotName;
            load();
            if(!stop) pauseGame();
            this.post_load();
        }

        /**
         * Sets up the game for Archipelago, overwriting functions and injecting HTML, anything that isn't wiped by the game loading.
         * I don't know why i split it like this when i'm not planning on handling dis/reconnecting yet. There is no un-setup. Refresh.
         * Called after a successful connection but before data from the connection is processed.
         */
        setup() {
            const logElement = document.createElement("div");
            logElement.id = "ap-log";
            logElement.style.width = "535px";
            logElement.style.maxHeight = "591px";
            logElement.style.overflowY = "auto";
            logElement.innerHTML = "<div class=\"large bold\" style=\"width:100%;text-align:center;\">AP Log</div>";
            const townColumn = document.getElementById("townColumn");
            townColumn.parentNode.insertBefore(logElement, townColumn.nextSibling);

            this.client.messages.on("message", (content) => {
                const message = document.createElement("div");
                message.textContent = content;
                logElement.appendChild(message);
            });

            this.client.items.on("itemsReceived", (items, index) => {
                for (const item of items) {
                    this.item(item.name);
                }
            });
        }
        post_load() {
            // Idle Loops scatters *all* of its stuff all around global scope
            // but in a way that doesn't show up in `window`
            // i'd really prefer it to be obvious when i'm using global scope
            for(let town = 0; town <= this.goalZone; town++) {

                for(const action of towns[town].totalActionList) {
                    action._visible = action.visible;
                    action.visible = function() {
                        return window.IdleLoopsAP.visible(this);
                    }
                    action._unlocked = action.unlocked;
                    action.unlocked = function() {
                        return window.IdleLoopsAP.unlocked(this);
                    }
                    if(action.type == "normal") {
                        action._finish = action.finish;
                        action.finish = function() {
                            window.IdleLoopsAP.location(`Z${town + 1} - ${this.varName}`);
                            if(this.varName == "StartJourney") {
                                window.IdleLoopsAP.client.goal();
                            }
                            return this._finish();
                        }
                    }
                }

                towns[town] = new Proxy(towns[town], {
                    get: (target, prop, receiver) => {
                        // Item: Number of Limited Actions
                        // Overwrite whatever the game thinks it has with the number of checks of this type recieved
                        if (town <= window.IdleLoopsAP.goalZone && prop.startsWith("good")) {
                            const name = prop.substring(4);
                            if(!name.startsWith("Temp")) {
                                return this.state?.[`Z${town+1} - ${name}`] || 0;
                            }
                        }

                        return Reflect.get(target, prop, receiver);
                    },
                    set: (target, prop, value, receiver) => {

                        // Location: Gaining a lootable Limited Action
                        // The game function that rewards one uses ++, which means it'll read from the proxy
                        // and give a wrong answer, so we need to calculate the # manually

                        // Actually i really don't have to do this, all it does is give a better location name
                        // (i.e. "...Pots - #1", "...Pots - #2" vs "...Pots - #10", "...Pots - #20")
                        // Whatever i realised that after finishing
                        if (value > 0 && town == 0 && prop.startsWith("good")) {
                            const name = prop.substring(4);
                            if(!name.startsWith("Temp")) {
                                const rewardRatio = limitedRewardRatios[name];
                                this.location("Z1 - " + name + " - #" + Math.floor(target['checked' + name] / rewardRatio));
                                return true;
                            }
                        }
                        
                        // Location: Gaining a Progress Bar %
                        // We could get this by overwriting town.finishProgress, but right now i prefer to do as much as possible via proxies
                        // Just documenting alternate solutions to get a head start later if this ends up broken
                        if (town <= window.IdleLoopsAP.goalZone && prop.startsWith("exp")) {
                            const name = prop.substring(3);
                            const prevLevel = target.getLevel(name);
                            Reflect.set(target, prop, value, receiver);
                            const newLevel = target.getLevel(name);
                            for(let i = prevLevel + 1; i <= newLevel; i++) {
                                if(bar_locations.includes(i)) {
                                    this.location("Z" + (town + 1) + " - " + name + " - " + i + "%");
                                }
                            }
                            return true;
                        }

                        return Reflect.set(target, prop, value, receiver);
                    }
                });
                // We need to add a line half way through this function, annoying that means copying a whole function
                towns[town].finishRegular = function(varName, rewardRatio, rewardFunc) {
                    // error state, negative numbers.
                    if (this[`total${varName}`] - this[`checked${varName}`] < 0) {
                        this[`checked${varName}`] = this[`total${varName}`];
                        this[`good${varName}`] = Math.floor(this[`total${varName}`] / rewardRatio);
                        this[`goodTemp${varName}`] = this[`good${varName}`];
                        console.log("Error state fixed");
                    }

                    // only checks unchecked items 
                    // IF there are unchecked items 
                    // AND the user has not disabled checking unchecked items OR there are no checked items left
                    const searchToggler = document.getElementById(`searchToggler${varName}`);
                    if (this[`total${varName}`] - this[`checked${varName}`] > 0 && ((searchToggler && !searchToggler.checked) || this[`goodTemp${varName}`] <= 0)) {
                        if(`Z${this.index + 1} - ${varName} - Search` in window.IdleLoopsAP.state) {
                            this[`checked${varName}`]++;
                            if (this[`checked${varName}`] % rewardRatio === 0) {
                                this[`lootFrom${varName}`] += rewardFunc();
                                this[`good${varName}`]++;
                            }
                        } else {
                            // Alert() seems a better place for this message, but i don't want someone to put like 100 pots in the action list (or have repeat last action on) and get 100 alerts
                            const logElement = document.getElementById("ap-log");
                            const message = document.createElement("div");
                            message.textContent = `Error: You need "Z${this.index + 1} - ${varName} - Search" to check unchecked ${varName}`;
                            logElement.appendChild(message);
                        }
                    } else if (this[`goodTemp${varName}`] > 0) {
                        this[`goodTemp${varName}`]--;
                        this[`lootFrom${varName}`] += rewardFunc();
                    }
                    view.requestUpdate("updateRegular", {name: varName, index: this.index});
                }
            }

            restart = () => {
                shouldRestart = false;
                timer = 0;
                timeCounter = 0;
                effectiveTime = 0;
                timeNeeded = 250 + (50 * this.state["Filler - 50 Starting Mana"]);
                document.title = "Idle Loops";
                resetResources();
                restartStats();
                for (let i = 0; i < towns.length; i++) {
                    towns[i].restart();
                }
                view.requestUpdate("updateSkills");
                actions.restart();
                view.requestUpdate("updateCurrentActionsDivs");
                view.requestUpdate("updateTrials", null);
            }

            // Collect checks from before this connection
            for(const item of this.client.items.received) {
                this.item(item.name);
            }

            // Send any checks that might have been found during a disconnection
            for(const action of towns[0].totalActionList) {
                if(action.type == "progress") {
                    let level = towns[0].getLevel(action.varName);
                    for(let i = 0; i <= level; i++) {
                        if(bar_locations.includes(i)) {
                            this.location(`Z1 - ${action.varName} - ${i}%`);
                        }
                    }
                }
                if(action.type == "limited") {
                    let checks = Math.floor(towns[0][`checked${action.varName}`] / limitedRewardRatios[action.varName]);
                    for(let i = 1; i <= checks; i++) {
                        this.location(`Z1 - ${action.varName} - #${i}`);
                    }
                }
            }
        }


        visible(action) {
            let defaultVisible = false;
            if(action.type == "limited" && towns[action.townNum][`total${action.varName}`] > 0) {
                defaultVisible = action._visible();
            }
            return defaultVisible || `Z${action.townNum + 1} - ${action.varName}` in this.state || `Z${action.townNum + 1} - ${action.varName} - Search` in this.state;
        }

        unlocked(action) {
            let defaultUnlocked = false;
            if(action.type == "limited" && towns[action.townNum][`total${action.varName}`] > 0) {
                defaultUnlocked = `Z${action.townNum + 1} - ${action.varName} - Search` in this.state
            }
            return defaultUnlocked || `Z${action.townNum + 1} - ${action.varName}` in this.state;
        }

        location(x) {
            const check = this.location_name_to_id?.[x] ?? false;
            if(check) {
                this.client.check(check);
            } else {
                console.log('Unknown location: "' + x + '"');
            }
        }
        
        /**
         * Called in order for every item rewarded, and also for every item in history on connection to catch the state up to speed.
         */
        item(x) {
            const [zone, action, ...rest] = x.split(" - ");
            if(x in this.state) {
                this.state[x]++;
            } else {
                this.state[x] = 1;
            }

            if(limitedRewardRatios?.[action]) {
                view.updateRegular({name: action, index: +(zone.substring(1)) - 1});
            }

            if(zone === "Filler") {
                // Starting mana is handled elswehere
                if(action === "1 Starting Gold") {
                    resourcesTemplate.gold = this.state[x];
                } else if(action === "+0.1 Game Speed") {
                    gameSpeed = 1 + (0.1 * this.state[x]);
                }
            }
        }
    }
    window.IdleLoopsAP = new IdleLoopsAP_class();
    window.IdleLoopsAP.load();
})();