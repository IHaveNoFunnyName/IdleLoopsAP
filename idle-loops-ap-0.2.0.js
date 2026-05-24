
(async function() {
    'use strict';

    const AP = await import("https://IHaveNoFunnyName.github.io/IdleLoopsAP/archipelago.min.js");

    // I don't know how i'm meant to do this but the AP client seems to only take ids, so i'll just paste in location_name_to_ids from the .apworld
    const location_name_to_id = {'Z1 - Wander - 1%': 1, 'Z1 - Wander - 5%': 2, 'Z1 - Wander - 10%': 3, 'Z1 - Wander - 15%': 4, 'Z1 - Wander - 20%': 5, 'Z1 - Wander - 25%': 6, 'Z1 - Wander - 30%': 7, 'Z1 - Wander - 40%': 8, 'Z1 - Wander - 50%': 9, 'Z1 - Wander - 60%': 10, 'Z1 - Wander - 70%': 11, 'Z1 - Wander - 80%': 12, 'Z1 - Wander - 90%': 13, 'Z1 - Wander - 95%': 14, 'Z1 - Wander - 99%': 15, 'Z1 - Wander - 100%': 16, 'Z1 - Pots - #1': 17, 'Z1 - Pots - #2': 18, 'Z1 - Pots - #3': 19, 'Z1 - Pots - #4': 20, 'Z1 - Pots - #5': 21, 'Z1 - Pots - #6': 22, 'Z1 - Pots - #7': 23, 'Z1 - Pots - #8': 24, 'Z1 - Pots - #9': 25, 'Z1 - Pots - #10': 26, 'Z1 - Pots - #11': 27, 'Z1 - Pots - #12': 28, 'Z1 - Pots - #13': 29, 'Z1 - Pots - #14': 30, 'Z1 - Pots - #15': 31, 'Z1 - Pots - #16': 32, 'Z1 - Pots - #17': 33, 'Z1 - Pots - #18': 34, 'Z1 - Pots - #19': 35, 'Z1 - Pots - #20': 36, 'Z1 - Pots - #21': 37, 'Z1 - Pots - #22': 38, 'Z1 - Pots - #23': 39, 'Z1 - Pots - #24': 40, 'Z1 - Pots - #25': 41, 'Z1 - Pots - #26': 42, 'Z1 - Pots - #27': 43, 'Z1 - Pots - #28': 44, 'Z1 - Pots - #29': 45, 'Z1 - Pots - #30': 46, 'Z1 - Pots - #31': 47, 'Z1 - Pots - #32': 48, 'Z1 - Pots - #33': 49, 'Z1 - Pots - #34': 50, 'Z1 - Pots - #35': 51, 'Z1 - Pots - #36': 52, 'Z1 - Pots - #37': 53, 'Z1 - Pots - #38': 54, 'Z1 - Pots - #39': 55, 'Z1 - Pots - #40': 56, 'Z1 - Pots - #41': 57, 'Z1 - Pots - #42': 58, 'Z1 - Pots - #43': 59, 'Z1 - Pots - #44': 60, 'Z1 - Pots - #45': 61, 'Z1 - Pots - #46': 62, 'Z1 - Pots - #47': 63, 'Z1 - Pots - #48': 64, 'Z1 - Pots - #49': 65, 'Z1 - Pots - #50': 66, 'Z1 - Locks - #1': 67, 'Z1 - Locks - #2': 68, 'Z1 - Locks - #3': 69, 'Z1 - Locks - #4': 70, 'Z1 - Locks - #5': 71, 'Z1 - Locks - #6': 72, 'Z1 - Locks - #7': 73, 'Z1 - Locks - #8': 74, 'Z1 - Locks - #9': 75, 'Z1 - Locks - #10': 76, 'Z1 - BuyGlasses': 77, 'Z1 - BuyManaZ1': 78, 'Z1 - Met - 1%': 79, 'Z1 - Met - 5%': 80, 'Z1 - Met - 10%': 81, 'Z1 - Met - 15%': 82, 'Z1 - Met - 20%': 83, 'Z1 - Met - 25%': 84, 'Z1 - Met - 30%': 85, 'Z1 - Met - 40%': 86, 'Z1 - Met - 50%': 87, 'Z1 - Met - 60%': 88, 'Z1 - Met - 70%': 89, 'Z1 - Met - 80%': 90, 'Z1 - Met - 90%': 91, 'Z1 - Met - 95%': 92, 'Z1 - Met - 99%': 93, 'Z1 - Met - 100%': 94, 'Z1 - TrainStrength': 95, 'Z1 - SQuests - #1': 96, 'Z1 - SQuests - #2': 97, 'Z1 - SQuests - #3': 98, 'Z1 - SQuests - #4': 99, 'Z1 - SQuests - #5': 100, 'Z1 - SQuests - #6': 101, 'Z1 - SQuests - #7': 102, 'Z1 - SQuests - #8': 103, 'Z1 - SQuests - #9': 104, 'Z1 - SQuests - #10': 105, 'Z1 - SQuests - #11': 106, 'Z1 - SQuests - #12': 107, 'Z1 - SQuests - #13': 108, 'Z1 - SQuests - #14': 109, 'Z1 - SQuests - #15': 110, 'Z1 - SQuests - #16': 111, 'Z1 - SQuests - #17': 112, 'Z1 - SQuests - #18': 113, 'Z1 - SQuests - #19': 114, 'Z1 - SQuests - #20': 115, 'Z1 - Secrets - 1%': 116, 'Z1 - Secrets - 5%': 117, 'Z1 - Secrets - 10%': 118, 'Z1 - Secrets - 15%': 119, 'Z1 - Secrets - 20%': 120, 'Z1 - Secrets - 25%': 121, 'Z1 - Secrets - 30%': 122, 'Z1 - Secrets - 40%': 123, 'Z1 - Secrets - 50%': 124, 'Z1 - Secrets - 60%': 125, 'Z1 - Secrets - 70%': 126, 'Z1 - Secrets - 80%': 127, 'Z1 - Secrets - 90%': 128, 'Z1 - Secrets - 95%': 129, 'Z1 - Secrets - 99%': 130, 'Z1 - Secrets - 100%': 131, 'Z1 - LQuests - #1': 132, 'Z1 - LQuests - #2': 133, 'Z1 - LQuests - #3': 134, 'Z1 - LQuests - #4': 135, 'Z1 - LQuests - #5': 136, 'Z1 - LQuests - #6': 137, 'Z1 - LQuests - #7': 138, 'Z1 - LQuests - #8': 139, 'Z1 - LQuests - #9': 140, 'Z1 - LQuests - #10': 141, 'Z1 - ThrowParty': 142, 'Z1 - WarriorLessons': 143, 'Combat - Level 1': 144, 'Combat - Level 10': 145, 'Combat - Level 20': 146, 'Combat - Level 30': 147, 'Combat - Level 40': 148, 'Combat - Level 50': 149, 'Combat - Level 60': 150, 'Combat - Level 70': 151, 'Combat - Level 80': 152, 'Combat - Level 90': 153, 'Combat - Level 100': 154, 'Z1 - MageLessons': 155, 'Magic - Level 1': 156, 'Magic - Level 10': 157, 'Magic - Level 20': 158, 'Magic - Level 30': 159, 'Magic - Level 40': 160, 'Magic - Level 50': 161, 'Magic - Level 60': 162, 'Magic - Level 70': 163, 'Magic - Level 80': 164, 'Magic - Level 90': 165, 'Magic - Level 100': 166, 'Z1 - Heal - Completion #1': 167, 'Z1 - Heal - Completion #2': 168, 'Z1 - Heal - Completion #3': 169, 'Z1 - Fight - Completion #1': 170, 'Z1 - Fight - Completion #2': 171, 'Z1 - Fight - Completion #3': 172, 'Z1 - SDungeon - Completion #1': 173, 'Z1 - SDungeon - Completion #2': 174, 'Z1 - SDungeon - Completion #3': 175, 'Z1 - BuySupplies': 176, 'Z1 - Haggle': 177, 'Z1 - StartJourney': 178, 'Z2 - Forest - 1%': 179, 'Z2 - Forest - 5%': 180, 'Z2 - Forest - 10%': 181, 'Z2 - Forest - 15%': 182, 'Z2 - Forest - 20%': 183, 'Z2 - Forest - 25%': 184, 'Z2 - Forest - 30%': 185, 'Z2 - Forest - 40%': 186, 'Z2 - Forest - 50%': 187, 'Z2 - Forest - 60%': 188, 'Z2 - Forest - 70%': 189, 'Z2 - Forest - 80%': 190, 'Z2 - Forest - 90%': 191, 'Z2 - Forest - 95%': 192, 'Z2 - Forest - 99%': 193, 'Z2 - Forest - 100%': 194, 'Z2 - WildMana - #1': 195, 'Z2 - WildMana - #2': 196, 'Z2 - WildMana - #3': 197, 'Z2 - WildMana - #4': 198, 'Z2 - WildMana - #5': 199, 'Z2 - WildMana - #6': 200, 'Z2 - WildMana - #7': 201, 'Z2 - WildMana - #8': 202, 'Z2 - WildMana - #9': 203, 'Z2 - WildMana - #10': 204, 'Z2 - WildMana - #11': 205, 'Z2 - WildMana - #12': 206, 'Z2 - WildMana - #13': 207, 'Z2 - WildMana - #14': 208, 'Z2 - WildMana - #15': 209, 'Z2 - WildMana - #16': 210, 'Z2 - WildMana - #17': 211, 'Z2 - WildMana - #18': 212, 'Z2 - WildMana - #19': 213, 'Z2 - WildMana - #20': 214, 'Z2 - WildMana - #21': 215, 'Z2 - WildMana - #22': 216, 'Z2 - WildMana - #23': 217, 'Z2 - WildMana - #24': 218, 'Z2 - WildMana - #25': 219, 'Z2 - WildMana - #26': 220, 'Z2 - WildMana - #27': 221, 'Z2 - WildMana - #28': 222, 'Z2 - WildMana - #29': 223, 'Z2 - WildMana - #30': 224, 'Z2 - WildMana - #31': 225, 'Z2 - WildMana - #32': 226, 'Z2 - WildMana - #33': 227, 'Z2 - WildMana - #34': 228, 'Z2 - WildMana - #35': 229, 'Z2 - WildMana - #36': 230, 'Z2 - WildMana - #37': 231, 'Z2 - WildMana - #38': 232, 'Z2 - WildMana - #39': 233, 'Z2 - WildMana - #40': 234, 'Z2 - WildMana - #41': 235, 'Z2 - WildMana - #42': 236, 'Z2 - WildMana - #43': 237, 'Z2 - WildMana - #44': 238, 'Z2 - WildMana - #45': 239, 'Z2 - WildMana - #46': 240, 'Z2 - WildMana - #47': 241, 'Z2 - WildMana - #48': 242, 'Z2 - WildMana - #49': 243, 'Z2 - WildMana - #50': 244, 'Z2 - WildMana - #51': 245, 'Z2 - WildMana - #52': 246, 'Z2 - WildMana - #53': 247, 'Z2 - WildMana - #54': 248, 'Z2 - WildMana - #55': 249, 'Z2 - WildMana - #56': 250, 'Z2 - WildMana - #57': 251, 'Z2 - WildMana - #58': 252, 'Z2 - WildMana - #59': 253, 'Z2 - WildMana - #60': 254, 'Z2 - WildMana - #61': 255, 'Z2 - WildMana - #62': 256, 'Z2 - WildMana - #63': 257, 'Z2 - WildMana - #64': 258, 'Z2 - WildMana - #65': 259, 'Z2 - WildMana - #66': 260, 'Z2 - WildMana - #67': 261, 'Z2 - WildMana - #68': 262, 'Z2 - WildMana - #69': 263, 'Z2 - WildMana - #70': 264, 'Z2 - WildMana - #71': 265, 'Z2 - WildMana - #72': 266, 'Z2 - WildMana - #73': 267, 'Z2 - WildMana - #74': 268, 'Z2 - WildMana - #75': 269, 'Z2 - WildMana - #76': 270, 'Z2 - WildMana - #77': 271, 'Z2 - WildMana - #78': 272, 'Z2 - WildMana - #79': 273, 'Z2 - WildMana - #80': 274, 'Z2 - WildMana - #81': 275, 'Z2 - WildMana - #82': 276, 'Z2 - WildMana - #83': 277, 'Z2 - WildMana - #84': 278, 'Z2 - WildMana - #85': 279, 'Z2 - WildMana - #86': 280, 'Z2 - WildMana - #87': 281, 'Z2 - WildMana - #88': 282, 'Z2 - WildMana - #89': 283, 'Z2 - WildMana - #90': 284, 'Z2 - WildMana - #91': 285, 'Z2 - WildMana - #92': 286, 'Z2 - WildMana - #93': 287, 'Z2 - WildMana - #94': 288, 'Z2 - WildMana - #95': 289, 'Z2 - WildMana - #96': 290, 'Z2 - WildMana - #97': 291, 'Z2 - WildMana - #98': 292, 'Z2 - WildMana - #99': 293, 'Z2 - WildMana - #100': 294, 'Z2 - Herbs - #1': 295, 'Z2 - Herbs - #2': 296, 'Z2 - Herbs - #3': 297, 'Z2 - Herbs - #4': 298, 'Z2 - Herbs - #5': 299, 'Z2 - Herbs - #6': 300, 'Z2 - Herbs - #7': 301, 'Z2 - Herbs - #8': 302, 'Z2 - Herbs - #9': 303, 'Z2 - Herbs - #10': 304, 'Z2 - Herbs - #11': 305, 'Z2 - Herbs - #12': 306, 'Z2 - Herbs - #13': 307, 'Z2 - Herbs - #14': 308, 'Z2 - Herbs - #15': 309, 'Z2 - Herbs - #16': 310, 'Z2 - Herbs - #17': 311, 'Z2 - Herbs - #18': 312, 'Z2 - Herbs - #19': 313, 'Z2 - Herbs - #20': 314, 'Z2 - Herbs - #21': 315, 'Z2 - Herbs - #22': 316, 'Z2 - Herbs - #23': 317, 'Z2 - Herbs - #24': 318, 'Z2 - Herbs - #25': 319, 'Z2 - Herbs - #26': 320, 'Z2 - Herbs - #27': 321, 'Z2 - Herbs - #28': 322, 'Z2 - Herbs - #29': 323, 'Z2 - Herbs - #30': 324, 'Z2 - Herbs - #31': 325, 'Z2 - Herbs - #32': 326, 'Z2 - Herbs - #33': 327, 'Z2 - Herbs - #34': 328, 'Z2 - Herbs - #35': 329, 'Z2 - Herbs - #36': 330, 'Z2 - Herbs - #37': 331, 'Z2 - Herbs - #38': 332, 'Z2 - Herbs - #39': 333, 'Z2 - Herbs - #40': 334, 'Z2 - Herbs - #41': 335, 'Z2 - Herbs - #42': 336, 'Z2 - Herbs - #43': 337, 'Z2 - Herbs - #44': 338, 'Z2 - Herbs - #45': 339, 'Z2 - Herbs - #46': 340, 'Z2 - Herbs - #47': 341, 'Z2 - Herbs - #48': 342, 'Z2 - Herbs - #49': 343, 'Z2 - Herbs - #50': 344, 'Z2 - Herbs - #51': 345, 'Z2 - Herbs - #52': 346, 'Z2 - Herbs - #53': 347, 'Z2 - Herbs - #54': 348, 'Z2 - Herbs - #55': 349, 'Z2 - Herbs - #56': 350, 'Z2 - Herbs - #57': 351, 'Z2 - Herbs - #58': 352, 'Z2 - Herbs - #59': 353, 'Z2 - Herbs - #60': 354, 'Z2 - Herbs - #61': 355, 'Z2 - Herbs - #62': 356, 'Z2 - Herbs - #63': 357, 'Z2 - Herbs - #64': 358, 'Z2 - Herbs - #65': 359, 'Z2 - Herbs - #66': 360, 'Z2 - Herbs - #67': 361, 'Z2 - Herbs - #68': 362, 'Z2 - Herbs - #69': 363, 'Z2 - Herbs - #70': 364, 'Z2 - Herbs - #71': 365, 'Z2 - Herbs - #72': 366, 'Z2 - Herbs - #73': 367, 'Z2 - Herbs - #74': 368, 'Z2 - Herbs - #75': 369, 'Z2 - Herbs - #76': 370, 'Z2 - Herbs - #77': 371, 'Z2 - Herbs - #78': 372, 'Z2 - Herbs - #79': 373, 'Z2 - Herbs - #80': 374, 'Z2 - Herbs - #81': 375, 'Z2 - Herbs - #82': 376, 'Z2 - Herbs - #83': 377, 'Z2 - Herbs - #84': 378, 'Z2 - Herbs - #85': 379, 'Z2 - Herbs - #86': 380, 'Z2 - Herbs - #87': 381, 'Z2 - Herbs - #88': 382, 'Z2 - Herbs - #89': 383, 'Z2 - Herbs - #90': 384, 'Z2 - Herbs - #91': 385, 'Z2 - Herbs - #92': 386, 'Z2 - Herbs - #93': 387, 'Z2 - Herbs - #94': 388, 'Z2 - Herbs - #95': 389, 'Z2 - Herbs - #96': 390, 'Z2 - Herbs - #97': 391, 'Z2 - Herbs - #98': 392, 'Z2 - Herbs - #99': 393, 'Z2 - Herbs - #100': 394, 'Z2 - Herbs - #101': 395, 'Z2 - Herbs - #102': 396, 'Z2 - Herbs - #103': 397, 'Z2 - Herbs - #104': 398, 'Z2 - Herbs - #105': 399, 'Z2 - Herbs - #106': 400, 'Z2 - Herbs - #107': 401, 'Z2 - Herbs - #108': 402, 'Z2 - Herbs - #109': 403, 'Z2 - Herbs - #110': 404, 'Z2 - Herbs - #111': 405, 'Z2 - Herbs - #112': 406, 'Z2 - Herbs - #113': 407, 'Z2 - Herbs - #114': 408, 'Z2 - Herbs - #115': 409, 'Z2 - Herbs - #116': 410, 'Z2 - Herbs - #117': 411, 'Z2 - Herbs - #118': 412, 'Z2 - Herbs - #119': 413, 'Z2 - Herbs - #120': 414, 'Z2 - Herbs - #121': 415, 'Z2 - Herbs - #122': 416, 'Z2 - Herbs - #123': 417, 'Z2 - Herbs - #124': 418, 'Z2 - Herbs - #125': 419, 'Z2 - Herbs - #126': 420, 'Z2 - Herbs - #127': 421, 'Z2 - Herbs - #128': 422, 'Z2 - Herbs - #129': 423, 'Z2 - Herbs - #130': 424, 'Z2 - Herbs - #131': 425, 'Z2 - Herbs - #132': 426, 'Z2 - Herbs - #133': 427, 'Z2 - Herbs - #134': 428, 'Z2 - Herbs - #135': 429, 'Z2 - Herbs - #136': 430, 'Z2 - Herbs - #137': 431, 'Z2 - Herbs - #138': 432, 'Z2 - Herbs - #139': 433, 'Z2 - Herbs - #140': 434, 'Z2 - Herbs - #141': 435, 'Z2 - Herbs - #142': 436, 'Z2 - Herbs - #143': 437, 'Z2 - Herbs - #144': 438, 'Z2 - Herbs - #145': 439, 'Z2 - Herbs - #146': 440, 'Z2 - Herbs - #147': 441, 'Z2 - Herbs - #148': 442, 'Z2 - Herbs - #149': 443, 'Z2 - Herbs - #150': 444, 'Z2 - Herbs - #151': 445, 'Z2 - Herbs - #152': 446, 'Z2 - Herbs - #153': 447, 'Z2 - Herbs - #154': 448, 'Z2 - Herbs - #155': 449, 'Z2 - Herbs - #156': 450, 'Z2 - Herbs - #157': 451, 'Z2 - Herbs - #158': 452, 'Z2 - Herbs - #159': 453, 'Z2 - Herbs - #160': 454, 'Z2 - Herbs - #161': 455, 'Z2 - Herbs - #162': 456, 'Z2 - Herbs - #163': 457, 'Z2 - Herbs - #164': 458, 'Z2 - Herbs - #165': 459, 'Z2 - Herbs - #166': 460, 'Z2 - Herbs - #167': 461, 'Z2 - Herbs - #168': 462, 'Z2 - Herbs - #169': 463, 'Z2 - Herbs - #170': 464, 'Z2 - Herbs - #171': 465, 'Z2 - Herbs - #172': 466, 'Z2 - Herbs - #173': 467, 'Z2 - Herbs - #174': 468, 'Z2 - Herbs - #175': 469, 'Z2 - Herbs - #176': 470, 'Z2 - Herbs - #177': 471, 'Z2 - Herbs - #178': 472, 'Z2 - Herbs - #179': 473, 'Z2 - Herbs - #180': 474, 'Z2 - Herbs - #181': 475, 'Z2 - Herbs - #182': 476, 'Z2 - Herbs - #183': 477, 'Z2 - Herbs - #184': 478, 'Z2 - Herbs - #185': 479, 'Z2 - Herbs - #186': 480, 'Z2 - Herbs - #187': 481, 'Z2 - Herbs - #188': 482, 'Z2 - Herbs - #189': 483, 'Z2 - Herbs - #190': 484, 'Z2 - Herbs - #191': 485, 'Z2 - Herbs - #192': 486, 'Z2 - Herbs - #193': 487, 'Z2 - Herbs - #194': 488, 'Z2 - Herbs - #195': 489, 'Z2 - Herbs - #196': 490, 'Z2 - Herbs - #197': 491, 'Z2 - Herbs - #198': 492, 'Z2 - Herbs - #199': 493, 'Z2 - Herbs - #200': 494, 'Z2 - Hunt - #1': 495, 'Z2 - Hunt - #2': 496, 'Z2 - Hunt - #3': 497, 'Z2 - Hunt - #4': 498, 'Z2 - Hunt - #5': 499, 'Z2 - Hunt - #6': 500, 'Z2 - Hunt - #7': 501, 'Z2 - Hunt - #8': 502, 'Z2 - Hunt - #9': 503, 'Z2 - Hunt - #10': 504, 'Z2 - Hunt - #11': 505, 'Z2 - Hunt - #12': 506, 'Z2 - Hunt - #13': 507, 'Z2 - Hunt - #14': 508, 'Z2 - Hunt - #15': 509, 'Z2 - Hunt - #16': 510, 'Z2 - Hunt - #17': 511, 'Z2 - Hunt - #18': 512, 'Z2 - Hunt - #19': 513, 'Z2 - Hunt - #20': 514, 'Z2 - SitByWaterfall': 515, 'Z2 - Shortcut - 1%': 516, 'Z2 - Shortcut - 5%': 517, 'Z2 - Shortcut - 10%': 518, 'Z2 - Shortcut - 15%': 519, 'Z2 - Shortcut - 20%': 520, 'Z2 - Shortcut - 25%': 521, 'Z2 - Shortcut - 30%': 522, 'Z2 - Shortcut - 40%': 523, 'Z2 - Shortcut - 50%': 524, 'Z2 - Shortcut - 60%': 525, 'Z2 - Shortcut - 70%': 526, 'Z2 - Shortcut - 80%': 527, 'Z2 - Shortcut - 90%': 528, 'Z2 - Shortcut - 95%': 529, 'Z2 - Shortcut - 99%': 530, 'Z2 - Shortcut - 100%': 531, 'Z2 - Hermit - 1%': 532, 'Z2 - Hermit - 5%': 533, 'Z2 - Hermit - 10%': 534, 'Z2 - Hermit - 15%': 535, 'Z2 - Hermit - 20%': 536, 'Z2 - Hermit - 25%': 537, 'Z2 - Hermit - 30%': 538, 'Z2 - Hermit - 40%': 539, 'Z2 - Hermit - 50%': 540, 'Z2 - Hermit - 60%': 541, 'Z2 - Hermit - 70%': 542, 'Z2 - Hermit - 80%': 543, 'Z2 - Hermit - 90%': 544, 'Z2 - Hermit - 95%': 545, 'Z2 - Hermit - 99%': 546, 'Z2 - Hermit - 100%': 547, 'Z2 - PracticalMagic': 548, 'Practical - Level 1': 549, 'Practical - Level 10': 550, 'Practical - Level 20': 551, 'Practical - Level 30': 552, 'Practical - Level 40': 553, 'Practical - Level 50': 554, 'Practical - Level 60': 555, 'Practical - Level 70': 556, 'Practical - Level 80': 557, 'Practical - Level 90': 558, 'Practical - Level 100': 559, 'Z2 - LearnAlchemy': 560, 'Alchemy - Level 1': 561, 'Alchemy - Level 10': 562, 'Alchemy - Level 20': 563, 'Alchemy - Level 30': 564, 'Alchemy - Level 40': 565, 'Alchemy - Level 50': 566, 'Alchemy - Level 60': 567, 'Alchemy - Level 70': 568, 'Alchemy - Level 80': 569, 'Alchemy - Level 90': 570, 'Alchemy - Level 100': 571, 'Z2 - BrewPotions': 572, 'Z2 - TrainDexterity': 573, 'Z2 - TrainSpeed': 574, 'Z2 - Flowers - 1%': 575, 'Z2 - Flowers - 5%': 576, 'Z2 - Flowers - 10%': 577, 'Z2 - Flowers - 15%': 578, 'Z2 - Flowers - 20%': 579, 'Z2 - Flowers - 25%': 580, 'Z2 - Flowers - 30%': 581, 'Z2 - Flowers - 40%': 582, 'Z2 - Flowers - 50%': 583, 'Z2 - Flowers - 60%': 584, 'Z2 - Flowers - 70%': 585, 'Z2 - Flowers - 80%': 586, 'Z2 - Flowers - 90%': 587, 'Z2 - Flowers - 95%': 588, 'Z2 - Flowers - 99%': 589, 'Z2 - Flowers - 100%': 590, 'Z2 - BirdWatching': 591, 'Z2 - Thicket - 1%': 592, 'Z2 - Thicket - 5%': 593, 'Z2 - Thicket - 10%': 594, 'Z2 - Thicket - 15%': 595, 'Z2 - Thicket - 20%': 596, 'Z2 - Thicket - 25%': 597, 'Z2 - Thicket - 30%': 598, 'Z2 - Thicket - 40%': 599, 'Z2 - Thicket - 50%': 600, 'Z2 - Thicket - 60%': 601, 'Z2 - Thicket - 70%': 602, 'Z2 - Thicket - 80%': 603, 'Z2 - Thicket - 90%': 604, 'Z2 - Thicket - 95%': 605, 'Z2 - Thicket - 99%': 606, 'Z2 - Thicket - 100%': 607, 'Z2 - Witch - 1%': 608, 'Z2 - Witch - 5%': 609, 'Z2 - Witch - 10%': 610, 'Z2 - Witch - 15%': 611, 'Z2 - Witch - 20%': 612, 'Z2 - Witch - 25%': 613, 'Z2 - Witch - 30%': 614, 'Z2 - Witch - 40%': 615, 'Z2 - Witch - 50%': 616, 'Z2 - Witch - 60%': 617, 'Z2 - Witch - 70%': 618, 'Z2 - Witch - 80%': 619, 'Z2 - Witch - 90%': 620, 'Z2 - Witch - 95%': 621, 'Z2 - Witch - 99%': 622, 'Z2 - Witch - 100%': 623, 'Z2 - DarkMagic': 624, 'Dark - Level 1': 625, 'Dark - Level 10': 626, 'Dark - Level 20': 627, 'Dark - Level 30': 628, 'Dark - Level 40': 629, 'Dark - Level 50': 630, 'Dark - Level 60': 631, 'Dark - Level 70': 632, 'Dark - Level 80': 633, 'Dark - Level 90': 634, 'Dark - Level 100': 635, 'Z2 - DarkRitual - Completion #1': 636, 'Z2 - ContinueOn': 637}

    const bar_locations = [1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
    const skill_locations = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const limitedRewardRatios = {
        "Pots": 10,
        "Locks": 10,
        "SQuests": 5,
        "LQuests": 5,
        "WildMana": 10,
        "Herbs": 10,
        "Hunt": 10,
    }
    const segments = {
        "Heal": 3,
        "Fight": 3,
        "SDungeon": 7,
    }

    class IdleLoopsAP_class {
        client = false;
        // 0 indexed cos that's what the game does
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
            await this.setup();
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
        async setup() {
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

            const data = await this.client.players.self.fetchSlotData();
            this.goalZone = data.goal;
        }
        post_load() {
            // Idle Loops scatters *all* of its stuff all around global scope
            // but in a way that doesn't show up in `window`
            // i'd really prefer it to be obvious when i'm using global scope
            for(let town = 0; town <= this.goalZone; town++) {

                // Overwriting action visibility and unlocked
                // And send a check when finishing an action, it's meant to be for the first time but the client filters duplicate checks
                // Not optimized but whatever
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
                            if(window.IdleLoopsAP.goalZone == 0 && this.varName == "StartJourney") {
                                window.IdleLoopsAP.client.goal();
                            } else if(window.IdleLoopsAP.goalZone == 1 && this.varName == "ContinueOn") {
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
                        if (prop.startsWith("good")) {
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
                        if (value > 0 && prop.startsWith("good")) {
                            const name = prop.substring(4);
                            if(!name.startsWith("Temp")) {
                                const rewardRatio = limitedRewardRatios[name];
                                this.location(`Z${town+1} - ${name} - #${Math.floor(target['checked' + name] / rewardRatio)}`);
                                return true;
                            }
                        }
                        
                        // Location: Gaining a Progress Bar %
                        // We could get this by overwriting town.finishProgress, but right now i prefer to do as much as possible via proxies
                        // Just documenting alternate solutions to get a head start later if this ends up broken
                        if (prop.startsWith("exp")) {
                            const name = prop.substring(3);
                            const prevLevel = target.getLevel(name);
                            Reflect.set(target, prop, value, receiver);
                            const newLevel = target.getLevel(name);
                            for(let i = prevLevel + 1; i <= newLevel; i++) {
                                if(bar_locations.includes(i)) {
                                    this.location(`Z${town + 1} - ${name} - ${i}%`);
                                }
                            }
                            return true;
                        }

                        // Location: Finishing a Multipart action
                        // The game doesn't seem to store highest completion so RIP to sending missed checks on reconnection
                        // At least doing your highest completion again is trivial
                        if (value > 0 && prop.endsWith("LoopCounter")) {
                            const name = prop.substring(0, prop.length - 11);
                            this.location(`Z${town + 1} - ${name} - Completion #${value / segments[name]}`);
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

            for(const skill in skills) {
                skills[skill] = new Proxy(skills[skill], {
                    set: (target, prop, value, receiver) => {
                        const prevLevel = getSkillLevel(skill);
                        const success = Reflect.set(target, prop, value, receiver);
                        const newLevel = getSkillLevel(skill);
                        for(let i = prevLevel + 1; i <= newLevel; i++) {
                            if(skill_locations.includes(i)) {
                                window.IdleLoopsAP.location(`${skill} - Level ${i}`);
                            }
                        }
                        return success;
                    }
                });
            }

            restart = () => {
                shouldRestart = false;
                timer = 0;
                timeCounter = 0;
                effectiveTime = 0;
                timeNeeded = 250 + (50 * (this.state?.["Filler - 50 Starting Mana"] ?? 0));
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

            resetResources = () => {
                resources = copyObject(resourcesTemplate);
                resources.gold = this.state?.["Filler - 1 Starting Gold"] ?? 0;
                if(getExploreProgress() >= 100) addResource("glasses", true);
                view.requestUpdate("updateResources", null);
            }

            // If the Predictor is installed, hook into it to handle starting filler
            // Because you have to click the connect button the predictor *surely* already exists. Skill issue if you click it before the page fully loads.
            // There's nothing relevant about .predict, it's that the whole predictor is mostly one big function except for this ONE PART that gets called with state
            // And that saves me from having to fork it or something
            if(window.Koviko) {
                Koviko.predict = function(prediction, state) {
                    if(Object.values(state.stats).every(stat => stat === 0)) {
                        state.resources.mana += (50 * (IdleLoopsAP.state?.["Filler - 50 Starting Mana"] ?? 0));
                        state.resources.gold += IdleLoopsAP.state?.["Filler - 1 Starting Gold"] ?? 0
                    }
                    // Update the amount of ticks necessary to complete the action, but only once at the start of the action
                    prediction.updateTicks(prediction.action, state.stats, state);

                    // Perform all ticks in succession
                    for (let ticks = 0; ticks < prediction.ticks(); ticks++) {
                        state.resources.mana--;
                        if (state.resources.mana >= 0) {
                            if (!this.tick(prediction, state)) break;
                        }
                    }
                }
            }

            // Collect checks from before this connection
            for(const item of this.client.items.received) {
                this.item(item.name);
            }

            // Send any checks that might have been found during a disconnection
            for(let town = 0; town <= this.goalZone; town++) {
                for(const action of towns[town].totalActionList) {
                    if(action.type == "progress") {
                        let level = towns[town].getLevel(action.varName);
                        for(let i = 0; i <= level; i++) {
                            if(bar_locations.includes(i)) {
                                this.location(`Z${town + 1} - ${action.varName} - ${i}%`);
                            }
                        }
                    }
                    if(action.type == "limited") {
                        let checks = Math.floor(towns[town][`checked${action.varName}`] / limitedRewardRatios[action.varName]);
                        for(let i = 1; i <= checks; i++) {
                            this.location(`Z${town + 1} - ${action.varName} - #${i}`);
                        }
                    }
                }
            }
            for(const skill in skills) {
                let level = getSkillLevel(skill);
                for(let i = 1; i <= level; i++) {
                    if(skill_locations.includes(i)) {
                        this.location(`${skill} - Level ${i}`);
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
                // Starting mana and gold are handled elswehere
                if(action === "+0.1 Game Speed") {
                    gameSpeed = 1 + (0.1 * this.state[x]);
                }
            }
        }
    }
    window.IdleLoopsAP = new IdleLoopsAP_class();
    window.IdleLoopsAP.load();
})();