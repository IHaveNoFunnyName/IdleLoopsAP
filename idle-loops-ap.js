
(async function() {
    'use strict';

    const AP = await import("https://IHaveNoFunnyName.github.io/IdleLoopsAP/archipelago.min.js");

    // I don't know how i'm meant to do this but the AP client seems to only take ids, so i'll just paste in location_name_to_ids from the .apworld
    const location_name_to_id = {'Z1 - Wander - 1%': 1, 'Z1 - Wander - 5%': 2, 'Z1 - Wander - 10%': 3, 'Z1 - Wander - 15%': 4, 'Z1 - Wander - 20%': 5, 'Z1 - Wander - 25%': 6, 'Z1 - Wander - 30%': 7, 'Z1 - Wander - 40%': 8, 'Z1 - Wander - 50%': 9, 'Z1 - Wander - 60%': 10, 'Z1 - Wander - 70%': 11, 'Z1 - Wander - 80%': 12, 'Z1 - Wander - 90%': 13, 'Z1 - Wander - 95%': 14, 'Z1 - Wander - 99%': 15, 'Z1 - Wander - 100%': 16, 'Z1 - Pots - #1': 17, 'Z1 - Pots - #2': 18, 'Z1 - Pots - #3': 19, 'Z1 - Pots - #4': 20, 'Z1 - Pots - #5': 21, 'Z1 - Pots - #6': 22, 'Z1 - Pots - #7': 23, 'Z1 - Pots - #8': 24, 'Z1 - Pots - #9': 25, 'Z1 - Pots - #10': 26, 'Z1 - Pots - #11': 27, 'Z1 - Pots - #12': 28, 'Z1 - Pots - #13': 29, 'Z1 - Pots - #14': 30, 'Z1 - Pots - #15': 31, 'Z1 - Pots - #16': 32, 'Z1 - Pots - #17': 33, 'Z1 - Pots - #18': 34, 'Z1 - Pots - #19': 35, 'Z1 - Pots - #20': 36, 'Z1 - Pots - #21': 37, 'Z1 - Pots - #22': 38, 'Z1 - Pots - #23': 39, 'Z1 - Pots - #24': 40, 'Z1 - Pots - #25': 41, 'Z1 - Pots - #26': 42, 'Z1 - Pots - #27': 43, 'Z1 - Pots - #28': 44, 'Z1 - Pots - #29': 45, 'Z1 - Pots - #30': 46, 'Z1 - Pots - #31': 47, 'Z1 - Pots - #32': 48, 'Z1 - Pots - #33': 49, 'Z1 - Pots - #34': 50, 'Z1 - Pots - #35': 51, 'Z1 - Pots - #36': 52, 'Z1 - Pots - #37': 53, 'Z1 - Pots - #38': 54, 'Z1 - Pots - #39': 55, 'Z1 - Pots - #40': 56, 'Z1 - Pots - #41': 57, 'Z1 - Pots - #42': 58, 'Z1 - Pots - #43': 59, 'Z1 - Pots - #44': 60, 'Z1 - Pots - #45': 61, 'Z1 - Pots - #46': 62, 'Z1 - Pots - #47': 63, 'Z1 - Pots - #48': 64, 'Z1 - Pots - #49': 65, 'Z1 - Pots - #50': 66, 'Z1 - Locks - #1': 67, 'Z1 - Locks - #2': 68, 'Z1 - Locks - #3': 69, 'Z1 - Locks - #4': 70, 'Z1 - Locks - #5': 71, 'Z1 - Locks - #6': 72, 'Z1 - Locks - #7': 73, 'Z1 - Locks - #8': 74, 'Z1 - Locks - #9': 75, 'Z1 - Locks - #10': 76, 'Z1 - BuyGlasses': 77, 'Z1 - BuyManaZ1': 78, 'Z1 - Met - 1%': 79, 'Z1 - Met - 5%': 80, 'Z1 - Met - 10%': 81, 'Z1 - Met - 15%': 82, 'Z1 - Met - 20%': 83, 'Z1 - Met - 25%': 84, 'Z1 - Met - 30%': 85, 'Z1 - Met - 40%': 86, 'Z1 - Met - 50%': 87, 'Z1 - Met - 60%': 88, 'Z1 - Met - 70%': 89, 'Z1 - Met - 80%': 90, 'Z1 - Met - 90%': 91, 'Z1 - Met - 95%': 92, 'Z1 - Met - 99%': 93, 'Z1 - Met - 100%': 94, 'Z1 - TrainStrength': 95, 'Z1 - SQuests - #1': 96, 'Z1 - SQuests - #2': 97, 'Z1 - SQuests - #3': 98, 'Z1 - SQuests - #4': 99, 'Z1 - SQuests - #5': 100, 'Z1 - SQuests - #6': 101, 'Z1 - SQuests - #7': 102, 'Z1 - SQuests - #8': 103, 'Z1 - SQuests - #9': 104, 'Z1 - SQuests - #10': 105, 'Z1 - SQuests - #11': 106, 'Z1 - SQuests - #12': 107, 'Z1 - SQuests - #13': 108, 'Z1 - SQuests - #14': 109, 'Z1 - SQuests - #15': 110, 'Z1 - SQuests - #16': 111, 'Z1 - SQuests - #17': 112, 'Z1 - SQuests - #18': 113, 'Z1 - SQuests - #19': 114, 'Z1 - SQuests - #20': 115, 'Z1 - Secrets - 1%': 116, 'Z1 - Secrets - 5%': 117, 'Z1 - Secrets - 10%': 118, 'Z1 - Secrets - 15%': 119, 'Z1 - Secrets - 20%': 120, 'Z1 - Secrets - 25%': 121, 'Z1 - Secrets - 30%': 122, 'Z1 - Secrets - 40%': 123, 'Z1 - Secrets - 50%': 124, 'Z1 - Secrets - 60%': 125, 'Z1 - Secrets - 70%': 126, 'Z1 - Secrets - 80%': 127, 'Z1 - Secrets - 90%': 128, 'Z1 - Secrets - 95%': 129, 'Z1 - Secrets - 99%': 130, 'Z1 - Secrets - 100%': 131, 'Z1 - LQuests - #1': 132, 'Z1 - LQuests - #2': 133, 'Z1 - LQuests - #3': 134, 'Z1 - LQuests - #4': 135, 'Z1 - LQuests - #5': 136, 'Z1 - LQuests - #6': 137, 'Z1 - LQuests - #7': 138, 'Z1 - LQuests - #8': 139, 'Z1 - LQuests - #9': 140, 'Z1 - LQuests - #10': 141, 'Z1 - ThrowParty': 142, 'Combat - Level 1': 143, 'Combat - Level 10': 144, 'Combat - Level 20': 145, 'Combat - Level 30': 146, 'Combat - Level 40': 147, 'Combat - Level 50': 148, 'Combat - Level 60': 149, 'Combat - Level 70': 150, 'Combat - Level 80': 151, 'Combat - Level 90': 152, 'Combat - Level 100': 153, 'Magic - Level 1': 154, 'Magic - Level 10': 155, 'Magic - Level 20': 156, 'Magic - Level 30': 157, 'Magic - Level 40': 158, 'Magic - Level 50': 159, 'Magic - Level 60': 160, 'Magic - Level 70': 161, 'Magic - Level 80': 162, 'Magic - Level 90': 163, 'Magic - Level 100': 164, 'Z1 - Heal - Completion #1': 165, 'Z1 - Heal - Completion #2': 166, 'Z1 - Heal - Completion #3': 167, 'Z1 - Fight - Completion #1': 168, 'Z1 - Fight - Completion #2': 169, 'Z1 - Fight - Completion #3': 170, 'Z1 - SDungeon - Completion #1': 171, 'Z1 - SDungeon - Completion #2': 172, 'Z1 - SDungeon - Completion #3': 173, 'Z1 - BuySupplies': 174, 'Z1 - Haggle': 175, 'Z1 - StartJourney': 176, 'Z2 - Forest - 1%': 177, 'Z2 - Forest - 5%': 178, 'Z2 - Forest - 10%': 179, 'Z2 - Forest - 15%': 180, 'Z2 - Forest - 20%': 181, 'Z2 - Forest - 25%': 182, 'Z2 - Forest - 30%': 183, 'Z2 - Forest - 40%': 184, 'Z2 - Forest - 50%': 185, 'Z2 - Forest - 60%': 186, 'Z2 - Forest - 70%': 187, 'Z2 - Forest - 80%': 188, 'Z2 - Forest - 90%': 189, 'Z2 - Forest - 95%': 190, 'Z2 - Forest - 99%': 191, 'Z2 - Forest - 100%': 192, 'Z2 - WildMana - #1': 193, 'Z2 - WildMana - #2': 194, 'Z2 - WildMana - #3': 195, 'Z2 - WildMana - #4': 196, 'Z2 - WildMana - #5': 197, 'Z2 - WildMana - #6': 198, 'Z2 - WildMana - #7': 199, 'Z2 - WildMana - #8': 200, 'Z2 - WildMana - #9': 201, 'Z2 - WildMana - #10': 202, 'Z2 - WildMana - #11': 203, 'Z2 - WildMana - #12': 204, 'Z2 - WildMana - #13': 205, 'Z2 - WildMana - #14': 206, 'Z2 - WildMana - #15': 207, 'Z2 - WildMana - #16': 208, 'Z2 - WildMana - #17': 209, 'Z2 - WildMana - #18': 210, 'Z2 - WildMana - #19': 211, 'Z2 - WildMana - #20': 212, 'Z2 - WildMana - #21': 213, 'Z2 - WildMana - #22': 214, 'Z2 - WildMana - #23': 215, 'Z2 - WildMana - #24': 216, 'Z2 - WildMana - #25': 217, 'Z2 - WildMana - #26': 218, 'Z2 - WildMana - #27': 219, 'Z2 - WildMana - #28': 220, 'Z2 - WildMana - #29': 221, 'Z2 - WildMana - #30': 222, 'Z2 - WildMana - #31': 223, 'Z2 - WildMana - #32': 224, 'Z2 - WildMana - #33': 225, 'Z2 - WildMana - #34': 226, 'Z2 - WildMana - #35': 227, 'Z2 - WildMana - #36': 228, 'Z2 - WildMana - #37': 229, 'Z2 - WildMana - #38': 230, 'Z2 - WildMana - #39': 231, 'Z2 - WildMana - #40': 232, 'Z2 - WildMana - #41': 233, 'Z2 - WildMana - #42': 234, 'Z2 - WildMana - #43': 235, 'Z2 - WildMana - #44': 236, 'Z2 - WildMana - #45': 237, 'Z2 - WildMana - #46': 238, 'Z2 - WildMana - #47': 239, 'Z2 - WildMana - #48': 240, 'Z2 - WildMana - #49': 241, 'Z2 - WildMana - #50': 242, 'Z2 - WildMana - #51': 243, 'Z2 - WildMana - #52': 244, 'Z2 - WildMana - #53': 245, 'Z2 - WildMana - #54': 246, 'Z2 - WildMana - #55': 247, 'Z2 - WildMana - #56': 248, 'Z2 - WildMana - #57': 249, 'Z2 - WildMana - #58': 250, 'Z2 - WildMana - #59': 251, 'Z2 - WildMana - #60': 252, 'Z2 - WildMana - #61': 253, 'Z2 - WildMana - #62': 254, 'Z2 - WildMana - #63': 255, 'Z2 - WildMana - #64': 256, 'Z2 - WildMana - #65': 257, 'Z2 - WildMana - #66': 258, 'Z2 - WildMana - #67': 259, 'Z2 - WildMana - #68': 260, 'Z2 - WildMana - #69': 261, 'Z2 - WildMana - #70': 262, 'Z2 - WildMana - #71': 263, 'Z2 - WildMana - #72': 264, 'Z2 - WildMana - #73': 265, 'Z2 - WildMana - #74': 266, 'Z2 - WildMana - #75': 267, 'Z2 - WildMana - #76': 268, 'Z2 - WildMana - #77': 269, 'Z2 - WildMana - #78': 270, 'Z2 - WildMana - #79': 271, 'Z2 - WildMana - #80': 272, 'Z2 - WildMana - #81': 273, 'Z2 - WildMana - #82': 274, 'Z2 - WildMana - #83': 275, 'Z2 - WildMana - #84': 276, 'Z2 - WildMana - #85': 277, 'Z2 - WildMana - #86': 278, 'Z2 - WildMana - #87': 279, 'Z2 - WildMana - #88': 280, 'Z2 - WildMana - #89': 281, 'Z2 - WildMana - #90': 282, 'Z2 - WildMana - #91': 283, 'Z2 - WildMana - #92': 284, 'Z2 - WildMana - #93': 285, 'Z2 - WildMana - #94': 286, 'Z2 - WildMana - #95': 287, 'Z2 - WildMana - #96': 288, 'Z2 - WildMana - #97': 289, 'Z2 - WildMana - #98': 290, 'Z2 - WildMana - #99': 291, 'Z2 - WildMana - #100': 292, 'Z2 - Herbs - #1': 293, 'Z2 - Herbs - #2': 294, 'Z2 - Herbs - #3': 295, 'Z2 - Herbs - #4': 296, 'Z2 - Herbs - #5': 297, 'Z2 - Herbs - #6': 298, 'Z2 - Herbs - #7': 299, 'Z2 - Herbs - #8': 300, 'Z2 - Herbs - #9': 301, 'Z2 - Herbs - #10': 302, 'Z2 - Herbs - #11': 303, 'Z2 - Herbs - #12': 304, 'Z2 - Herbs - #13': 305, 'Z2 - Herbs - #14': 306, 'Z2 - Herbs - #15': 307, 'Z2 - Herbs - #16': 308, 'Z2 - Herbs - #17': 309, 'Z2 - Herbs - #18': 310, 'Z2 - Herbs - #19': 311, 'Z2 - Herbs - #20': 312, 'Z2 - Herbs - #21': 313, 'Z2 - Herbs - #22': 314, 'Z2 - Herbs - #23': 315, 'Z2 - Herbs - #24': 316, 'Z2 - Herbs - #25': 317, 'Z2 - Herbs - #26': 318, 'Z2 - Herbs - #27': 319, 'Z2 - Herbs - #28': 320, 'Z2 - Herbs - #29': 321, 'Z2 - Herbs - #30': 322, 'Z2 - Herbs - #31': 323, 'Z2 - Herbs - #32': 324, 'Z2 - Herbs - #33': 325, 'Z2 - Herbs - #34': 326, 'Z2 - Herbs - #35': 327, 'Z2 - Herbs - #36': 328, 'Z2 - Herbs - #37': 329, 'Z2 - Herbs - #38': 330, 'Z2 - Herbs - #39': 331, 'Z2 - Herbs - #40': 332, 'Z2 - Herbs - #41': 333, 'Z2 - Herbs - #42': 334, 'Z2 - Herbs - #43': 335, 'Z2 - Herbs - #44': 336, 'Z2 - Herbs - #45': 337, 'Z2 - Herbs - #46': 338, 'Z2 - Herbs - #47': 339, 'Z2 - Herbs - #48': 340, 'Z2 - Herbs - #49': 341, 'Z2 - Herbs - #50': 342, 'Z2 - Herbs - #51': 343, 'Z2 - Herbs - #52': 344, 'Z2 - Herbs - #53': 345, 'Z2 - Herbs - #54': 346, 'Z2 - Herbs - #55': 347, 'Z2 - Herbs - #56': 348, 'Z2 - Herbs - #57': 349, 'Z2 - Herbs - #58': 350, 'Z2 - Herbs - #59': 351, 'Z2 - Herbs - #60': 352, 'Z2 - Herbs - #61': 353, 'Z2 - Herbs - #62': 354, 'Z2 - Herbs - #63': 355, 'Z2 - Herbs - #64': 356, 'Z2 - Herbs - #65': 357, 'Z2 - Herbs - #66': 358, 'Z2 - Herbs - #67': 359, 'Z2 - Herbs - #68': 360, 'Z2 - Herbs - #69': 361, 'Z2 - Herbs - #70': 362, 'Z2 - Herbs - #71': 363, 'Z2 - Herbs - #72': 364, 'Z2 - Herbs - #73': 365, 'Z2 - Herbs - #74': 366, 'Z2 - Herbs - #75': 367, 'Z2 - Herbs - #76': 368, 'Z2 - Herbs - #77': 369, 'Z2 - Herbs - #78': 370, 'Z2 - Herbs - #79': 371, 'Z2 - Herbs - #80': 372, 'Z2 - Herbs - #81': 373, 'Z2 - Herbs - #82': 374, 'Z2 - Herbs - #83': 375, 'Z2 - Herbs - #84': 376, 'Z2 - Herbs - #85': 377, 'Z2 - Herbs - #86': 378, 'Z2 - Herbs - #87': 379, 'Z2 - Herbs - #88': 380, 'Z2 - Herbs - #89': 381, 'Z2 - Herbs - #90': 382, 'Z2 - Herbs - #91': 383, 'Z2 - Herbs - #92': 384, 'Z2 - Herbs - #93': 385, 'Z2 - Herbs - #94': 386, 'Z2 - Herbs - #95': 387, 'Z2 - Herbs - #96': 388, 'Z2 - Herbs - #97': 389, 'Z2 - Herbs - #98': 390, 'Z2 - Herbs - #99': 391, 'Z2 - Herbs - #100': 392, 'Z2 - Herbs - #101': 393, 'Z2 - Herbs - #102': 394, 'Z2 - Herbs - #103': 395, 'Z2 - Herbs - #104': 396, 'Z2 - Herbs - #105': 397, 'Z2 - Herbs - #106': 398, 'Z2 - Herbs - #107': 399, 'Z2 - Herbs - #108': 400, 'Z2 - Herbs - #109': 401, 'Z2 - Herbs - #110': 402, 'Z2 - Herbs - #111': 403, 'Z2 - Herbs - #112': 404, 'Z2 - Herbs - #113': 405, 'Z2 - Herbs - #114': 406, 'Z2 - Herbs - #115': 407, 'Z2 - Herbs - #116': 408, 'Z2 - Herbs - #117': 409, 'Z2 - Herbs - #118': 410, 'Z2 - Herbs - #119': 411, 'Z2 - Herbs - #120': 412, 'Z2 - Herbs - #121': 413, 'Z2 - Herbs - #122': 414, 'Z2 - Herbs - #123': 415, 'Z2 - Herbs - #124': 416, 'Z2 - Herbs - #125': 417, 'Z2 - Herbs - #126': 418, 'Z2 - Herbs - #127': 419, 'Z2 - Herbs - #128': 420, 'Z2 - Herbs - #129': 421, 'Z2 - Herbs - #130': 422, 'Z2 - Herbs - #131': 423, 'Z2 - Herbs - #132': 424, 'Z2 - Herbs - #133': 425, 'Z2 - Herbs - #134': 426, 'Z2 - Herbs - #135': 427, 'Z2 - Herbs - #136': 428, 'Z2 - Herbs - #137': 429, 'Z2 - Herbs - #138': 430, 'Z2 - Herbs - #139': 431, 'Z2 - Herbs - #140': 432, 'Z2 - Herbs - #141': 433, 'Z2 - Herbs - #142': 434, 'Z2 - Herbs - #143': 435, 'Z2 - Herbs - #144': 436, 'Z2 - Herbs - #145': 437, 'Z2 - Herbs - #146': 438, 'Z2 - Herbs - #147': 439, 'Z2 - Herbs - #148': 440, 'Z2 - Herbs - #149': 441, 'Z2 - Herbs - #150': 442, 'Z2 - Herbs - #151': 443, 'Z2 - Herbs - #152': 444, 'Z2 - Herbs - #153': 445, 'Z2 - Herbs - #154': 446, 'Z2 - Herbs - #155': 447, 'Z2 - Herbs - #156': 448, 'Z2 - Herbs - #157': 449, 'Z2 - Herbs - #158': 450, 'Z2 - Herbs - #159': 451, 'Z2 - Herbs - #160': 452, 'Z2 - Herbs - #161': 453, 'Z2 - Herbs - #162': 454, 'Z2 - Herbs - #163': 455, 'Z2 - Herbs - #164': 456, 'Z2 - Herbs - #165': 457, 'Z2 - Herbs - #166': 458, 'Z2 - Herbs - #167': 459, 'Z2 - Herbs - #168': 460, 'Z2 - Herbs - #169': 461, 'Z2 - Herbs - #170': 462, 'Z2 - Herbs - #171': 463, 'Z2 - Herbs - #172': 464, 'Z2 - Herbs - #173': 465, 'Z2 - Herbs - #174': 466, 'Z2 - Herbs - #175': 467, 'Z2 - Herbs - #176': 468, 'Z2 - Herbs - #177': 469, 'Z2 - Herbs - #178': 470, 'Z2 - Herbs - #179': 471, 'Z2 - Herbs - #180': 472, 'Z2 - Herbs - #181': 473, 'Z2 - Herbs - #182': 474, 'Z2 - Herbs - #183': 475, 'Z2 - Herbs - #184': 476, 'Z2 - Herbs - #185': 477, 'Z2 - Herbs - #186': 478, 'Z2 - Herbs - #187': 479, 'Z2 - Herbs - #188': 480, 'Z2 - Herbs - #189': 481, 'Z2 - Herbs - #190': 482, 'Z2 - Herbs - #191': 483, 'Z2 - Herbs - #192': 484, 'Z2 - Herbs - #193': 485, 'Z2 - Herbs - #194': 486, 'Z2 - Herbs - #195': 487, 'Z2 - Herbs - #196': 488, 'Z2 - Herbs - #197': 489, 'Z2 - Herbs - #198': 490, 'Z2 - Herbs - #199': 491, 'Z2 - Herbs - #200': 492, 'Z2 - Hunt - #1': 493, 'Z2 - Hunt - #2': 494, 'Z2 - Hunt - #3': 495, 'Z2 - Hunt - #4': 496, 'Z2 - Hunt - #5': 497, 'Z2 - Hunt - #6': 498, 'Z2 - Hunt - #7': 499, 'Z2 - Hunt - #8': 500, 'Z2 - Hunt - #9': 501, 'Z2 - Hunt - #10': 502, 'Z2 - Hunt - #11': 503, 'Z2 - Hunt - #12': 504, 'Z2 - Hunt - #13': 505, 'Z2 - Hunt - #14': 506, 'Z2 - Hunt - #15': 507, 'Z2 - Hunt - #16': 508, 'Z2 - Hunt - #17': 509, 'Z2 - Hunt - #18': 510, 'Z2 - Hunt - #19': 511, 'Z2 - Hunt - #20': 512, 'Z2 - SitByWaterfall': 513, 'Z2 - Shortcut - 1%': 514, 'Z2 - Shortcut - 5%': 515, 'Z2 - Shortcut - 10%': 516, 'Z2 - Shortcut - 15%': 517, 'Z2 - Shortcut - 20%': 518, 'Z2 - Shortcut - 25%': 519, 'Z2 - Shortcut - 30%': 520, 'Z2 - Shortcut - 40%': 521, 'Z2 - Shortcut - 50%': 522, 'Z2 - Shortcut - 60%': 523, 'Z2 - Shortcut - 70%': 524, 'Z2 - Shortcut - 80%': 525, 'Z2 - Shortcut - 90%': 526, 'Z2 - Shortcut - 95%': 527, 'Z2 - Shortcut - 99%': 528, 'Z2 - Shortcut - 100%': 529, 'Z2 - Hermit - 1%': 530, 'Z2 - Hermit - 5%': 531, 'Z2 - Hermit - 10%': 532, 'Z2 - Hermit - 15%': 533, 'Z2 - Hermit - 20%': 534, 'Z2 - Hermit - 25%': 535, 'Z2 - Hermit - 30%': 536, 'Z2 - Hermit - 40%': 537, 'Z2 - Hermit - 50%': 538, 'Z2 - Hermit - 60%': 539, 'Z2 - Hermit - 70%': 540, 'Z2 - Hermit - 80%': 541, 'Z2 - Hermit - 90%': 542, 'Z2 - Hermit - 95%': 543, 'Z2 - Hermit - 99%': 544, 'Z2 - Hermit - 100%': 545, 'Practical - Level 1': 546, 'Practical - Level 10': 547, 'Practical - Level 20': 548, 'Practical - Level 30': 549, 'Practical - Level 40': 550, 'Practical - Level 50': 551, 'Practical - Level 60': 552, 'Practical - Level 70': 553, 'Practical - Level 80': 554, 'Practical - Level 90': 555, 'Practical - Level 100': 556, 'Alchemy - Level 1': 557, 'Alchemy - Level 10': 558, 'Alchemy - Level 20': 559, 'Alchemy - Level 30': 560, 'Alchemy - Level 40': 561, 'Alchemy - Level 50': 562, 'Alchemy - Level 60': 563, 'Alchemy - Level 70': 564, 'Alchemy - Level 80': 565, 'Alchemy - Level 90': 566, 'Alchemy - Level 100': 567, 'Z2 - BrewPotions': 568, 'Z2 - TrainDexterity': 569, 'Z2 - TrainSpeed': 570, 'Z2 - Flowers - 1%': 571, 'Z2 - Flowers - 5%': 572, 'Z2 - Flowers - 10%': 573, 'Z2 - Flowers - 15%': 574, 'Z2 - Flowers - 20%': 575, 'Z2 - Flowers - 25%': 576, 'Z2 - Flowers - 30%': 577, 'Z2 - Flowers - 40%': 578, 'Z2 - Flowers - 50%': 579, 'Z2 - Flowers - 60%': 580, 'Z2 - Flowers - 70%': 581, 'Z2 - Flowers - 80%': 582, 'Z2 - Flowers - 90%': 583, 'Z2 - Flowers - 95%': 584, 'Z2 - Flowers - 99%': 585, 'Z2 - Flowers - 100%': 586, 'Z2 - BirdWatching': 587, 'Z2 - Thicket - 1%': 588, 'Z2 - Thicket - 5%': 589, 'Z2 - Thicket - 10%': 590, 'Z2 - Thicket - 15%': 591, 'Z2 - Thicket - 20%': 592, 'Z2 - Thicket - 25%': 593, 'Z2 - Thicket - 30%': 594, 'Z2 - Thicket - 40%': 595, 'Z2 - Thicket - 50%': 596, 'Z2 - Thicket - 60%': 597, 'Z2 - Thicket - 70%': 598, 'Z2 - Thicket - 80%': 599, 'Z2 - Thicket - 90%': 600, 'Z2 - Thicket - 95%': 601, 'Z2 - Thicket - 99%': 602, 'Z2 - Thicket - 100%': 603, 'Z2 - Witch - 1%': 604, 'Z2 - Witch - 5%': 605, 'Z2 - Witch - 10%': 606, 'Z2 - Witch - 15%': 607, 'Z2 - Witch - 20%': 608, 'Z2 - Witch - 25%': 609, 'Z2 - Witch - 30%': 610, 'Z2 - Witch - 40%': 611, 'Z2 - Witch - 50%': 612, 'Z2 - Witch - 60%': 613, 'Z2 - Witch - 70%': 614, 'Z2 - Witch - 80%': 615, 'Z2 - Witch - 90%': 616, 'Z2 - Witch - 95%': 617, 'Z2 - Witch - 99%': 618, 'Z2 - Witch - 100%': 619, 'Dark - Level 1': 620, 'Dark - Level 10': 621, 'Dark - Level 20': 622, 'Dark - Level 30': 623, 'Dark - Level 40': 624, 'Dark - Level 50': 625, 'Dark - Level 60': 626, 'Dark - Level 70': 627, 'Dark - Level 80': 628, 'Dark - Level 90': 629, 'Dark - Level 100': 630, 'Z2 - DarkRitual - Completion #1': 631, 'Z2 - ContinueOn': 632, 'Z3 - City - 1%': 633, 'Z3 - City - 5%': 634, 'Z3 - City - 10%': 635, 'Z3 - City - 15%': 636, 'Z3 - City - 20%': 637, 'Z3 - City - 25%': 638, 'Z3 - City - 30%': 639, 'Z3 - City - 40%': 640, 'Z3 - City - 50%': 641, 'Z3 - City - 60%': 642, 'Z3 - City - 70%': 643, 'Z3 - City - 80%': 644, 'Z3 - City - 90%': 645, 'Z3 - City - 95%': 646, 'Z3 - City - 99%': 647, 'Z3 - City - 100%': 648, 'Z3 - Gamble - #1': 649, 'Z3 - Gamble - #2': 650, 'Z3 - Gamble - #3': 651, 'Z3 - Gamble - #4': 652, 'Z3 - Gamble - #5': 653, 'Z3 - Gamble - #6': 654, 'Z3 - Gamble - #7': 655, 'Z3 - Gamble - #8': 656, 'Z3 - Gamble - #9': 657, 'Z3 - Gamble - #10': 658, 'Z3 - Gamble - #11': 659, 'Z3 - Gamble - #12': 660, 'Z3 - Gamble - #13': 661, 'Z3 - Gamble - #14': 662, 'Z3 - Gamble - #15': 663, 'Z3 - Gamble - #16': 664, 'Z3 - Gamble - #17': 665, 'Z3 - Gamble - #18': 666, 'Z3 - Gamble - #19': 667, 'Z3 - Gamble - #20': 668, 'Z3 - Drunk': 669, 'Z3 - BuyManaZ3': 670, 'Z3 - SellPotions': 671, 'Z3 - AdvGuild - Completion #1': 672, 'Z3 - GatherTeam': 673, 'Z3 - LDungeon - Completion #1': 674, 'Z3 - LDungeon - Completion #2': 675, 'Z3 - LDungeon - Completion #3': 676, 'Z3 - CraftGuild - Completion #1': 677, 'Z3 - Apprentice - 1%': 678, 'Z3 - Apprentice - 5%': 679, 'Z3 - Apprentice - 10%': 680, 'Z3 - Apprentice - 15%': 681, 'Z3 - Apprentice - 20%': 682, 'Z3 - Apprentice - 25%': 683, 'Z3 - Apprentice - 30%': 684, 'Z3 - Apprentice - 40%': 685, 'Z3 - Apprentice - 50%': 686, 'Z3 - Apprentice - 60%': 687, 'Z3 - Apprentice - 70%': 688, 'Z3 - Apprentice - 80%': 689, 'Z3 - Apprentice - 90%': 690, 'Z3 - Apprentice - 95%': 691, 'Z3 - Apprentice - 99%': 692, 'Z3 - Apprentice - 100%': 693, 'Z3 - Mason - 1%': 694, 'Z3 - Mason - 5%': 695, 'Z3 - Mason - 10%': 696, 'Z3 - Mason - 15%': 697, 'Z3 - Mason - 20%': 698, 'Z3 - Mason - 25%': 699, 'Z3 - Mason - 30%': 700, 'Z3 - Mason - 40%': 701, 'Z3 - Mason - 50%': 702, 'Z3 - Mason - 60%': 703, 'Z3 - Mason - 70%': 704, 'Z3 - Mason - 80%': 705, 'Z3 - Mason - 90%': 706, 'Z3 - Mason - 95%': 707, 'Z3 - Mason - 99%': 708, 'Z3 - Mason - 100%': 709, 'Z3 - Architect - 1%': 710, 'Z3 - Architect - 5%': 711, 'Z3 - Architect - 10%': 712, 'Z3 - Architect - 15%': 713, 'Z3 - Architect - 20%': 714, 'Z3 - Architect - 25%': 715, 'Z3 - Architect - 30%': 716, 'Z3 - Architect - 40%': 717, 'Z3 - Architect - 50%': 718, 'Z3 - Architect - 60%': 719, 'Z3 - Architect - 70%': 720, 'Z3 - Architect - 80%': 721, 'Z3 - Architect - 90%': 722, 'Z3 - Architect - 95%': 723, 'Z3 - Architect - 99%': 724, 'Z3 - Architect - 100%': 725, 'Z3 - ReadBooks': 726, 'Z3 - BuyPickaxe': 727, 'Z3 - StartTrek': 728};

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

    const skill_actions = ["WarriorLessons", "MageLessons", "PracticalMagic", "LearnAlchemy", "DarkMagic"];

    class IdleLoopsAP_class {
        client = false;
        // 0 indexed cos that's what the game does
        goalZone = 0;
        state = {};
        scouts = {};
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

                    if(action.type == "progress") {
                       const el = document.querySelector(`#infoContainer${action.varName} .showthat`);
                       const hover = el.querySelector(".showthis");
                       el.addEventListener("mouseover", () => {window.IdleLoopsAP.scoutProgress(hover, town, action.varName)});
                    }

                    if(action.type == "limited") {
                        const el = document.querySelector(`#infoContainer${action.varName} .showthat`);
                        const badUIdecisions = el.querySelectorAll(".fa-arrow-left")
                        const slash = document.createElement("span");
                        slash.textContent = " / ";
                        badUIdecisions[0].replaceWith(slash);
                        const unchecked = document.createElement("span");
                        unchecked.textContent = "Unchecked: ";
                        badUIdecisions[1].replaceWith(unchecked);

                        const hover = el.querySelector(".showthis");
                        el.addEventListener("mouseover", () => {window.IdleLoopsAP.scoutLimited(hover, town, action.varName)});
                    }

                    // Annoyingly skill actions are of type normal
                    if(action.type == "normal" && !skill_actions.includes(action.varName)) {
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
                        const el = document.querySelector(`#container${action.varName}.showthat`);
                        const hover = el.querySelector(".showthis");
                        const scoutcontainer = document.createElement("div");
                        scoutcontainer.classList.add("scout");
                        hover.prepend(document.createElement("br"));
                        hover.prepend(scoutcontainer);
                        el.addEventListener("mouseover", () => {window.IdleLoopsAP.scoutRegular(scoutcontainer, town, action.varName)});
                    }

                    if(action.type == "multipart") {
                        const el = document.querySelector(`#container${action.varName}.showthat`);
                        const hover = el.querySelector(".showthis");
                        const scoutcontainer = document.createElement("div");
                        scoutcontainer.classList.add("scout");
                        hover.prepend(document.createElement("br"));
                        hover.prepend(scoutcontainer);
                        el.addEventListener("mouseover", () => {window.IdleLoopsAP.scoutMultipart(scoutcontainer, town, action.varName)});
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
                                //this[`lootFrom${varName}`] += rewardFunc();
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

                const el = document.querySelector(`#skill${skill}Container.showthat`);
                const hover = el.querySelector(".showthis");
                const scoutcontainer = document.createElement("div");
                scoutcontainer.classList.add("scout");
                hover.prepend(document.createElement("br"));
                hover.prepend(scoutcontainer);
                el.addEventListener("mouseover", () => {window.IdleLoopsAP.scoutSkill(scoutcontainer, skill)});
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

        async scoutRegular(el, town, varName) {
            const location_name = `Z${town + 1} - ${varName}`;
            if(completedActions.includes(varName)) {
                el.textContent = "No more checks";
                return;
            }
            const location = this.location_name_to_id[location_name];
            let scout
            if(location in this.scouts) {
                scout = this.scouts[location];
            } else {
                el.textContent = `Scouting...`;
                
                scout = await this.client.scout([location], 2)
                this.scouts[location] = scout;
            }
            el.textContent = `Finishing this action will grant ${scout[0].receiver.name}'s "${scout[0].name}"`;
        }

        async scoutProgress(el, town, varName) {
            const lines = el.innerHTML.split("<br>");
            const level = towns[town].getLevel(varName);
            if(level < 100) {
                let next = 0;
                let i = 0;
                while(next <= level) {
                    next = bar_locations[i];
                    i++;
                }
                const location = this.location_name_to_id[`Z${town + 1} - ${varName} - ${next}%`];
                let scout
                if(location in this.scouts) {
                    scout = this.scouts[location];
                } else {
                    lines[0] = `Scouting...`;
                    el.innerHTML = lines.join("<br>");
                    
                    scout = await this.client.scout([location], 2)
                    this.scouts[location] = scout;
                }
                lines[0] = `${scout[0].receiver.name}'s "${scout[0].name}" is at ${next}%`;
            } else {
                lines[0] = "No more checks";
            }
            el.innerHTML = lines.join("<br>");
        }

        async scoutLimited(el, town, varName) {
            const lines = el.innerHTML.split("<br>");
            const checks = Math.floor(towns[town][`checked${varName}`] / limitedRewardRatios[varName]);
            const location_name = `Z${town + 1} - ${varName} - #${checks + 1}`;
            let check;
            if(!this.state?.[`Z${town + 1} - ${varName} - Search`]) {
                check = `"Z${town + 1} - ${varName} - Search" needs to be found first`;
            } else if(location_name in this.location_name_to_id) {
                const location = this.location_name_to_id[location_name];
                let scout
                if(location in this.scouts) {
                    scout = this.scouts[location];
                    check = `${scout[0].receiver.name}'s "${scout[0].name}" Next`
                } else {
                    lines[0] = `Scouting...`;
                    el.innerHTML = lines.join("<br>");

                    scout = await this.client.scout([location], 2)
                    this.scouts[location] = scout;
                    check = `${scout[0].receiver.name}'s "${scout[0].name}" Next`
                }
            } else {
                check = "No more checks";
            }
            lines[0] = `<span style="white-space: pre;">Sends a Check to AP every ${limitedRewardRatios[varName]} checked.\n${check}</span>`;
            el.innerHTML = lines.join("<br>");
        }

        async scoutMultipart(el, town, varName) {
            const location_name_base = `Z${town + 1} - ${varName} - Completion #`;
            let location_name;
            let i = 0;
            while(true) {
                location_name = `${location_name_base}${i + 1}`;
                if(this.client.room.missingLocations.includes(this.location_name_to_id[location_name])) {
                    break;
                }
                if(!(location_name in this.location_name_to_id)) {
                    el.textContent = "No more checks";
                    return;
                }
                i++;
            }
            const location = this.location_name_to_id[location_name];
            let scout
            if(location in this.scouts) {
                scout = this.scouts[location];
            } else {
                el.textContent = `Scouting...`;
                
                scout = await this.client.scout([location], 2)
                this.scouts[location] = scout;
            }
            el.textContent = `Completed difficulty: ${i}. The next completion will grant ${scout[0].receiver.name}'s "${scout[0].name}"`;
        }

        async scoutSkill(el, skill) {
            const level = getSkillLevel(skill);
            if(level < 100) {
                let next = 0;
                let i = 0;
                while(next <= level) {
                    next = skill_locations[i];
                    i++;
                }
                const location = this.location_name_to_id[`${skill} - Level ${next}`];
                let scout
                if(location in this.scouts) {
                    scout = this.scouts[location];
                } else {
                    el.textContent = `Scouting...`;
                    
                    scout = await this.client.scout([location], 2)
                    this.scouts[location] = scout;
                }
                el.textContent = `${scout[0].receiver.name}'s "${scout[0].name}" is at Level ${next}`;
            } else {
                el.textContent = "No more checks";
            }
        }
    }
    window.IdleLoopsAP = new IdleLoopsAP_class();
    window.IdleLoopsAP.load();
})();