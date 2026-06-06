
(async function () {
    'use strict';

    const AP = await import("https://IHaveNoFunnyName.github.io/IdleLoopsAP/archipelago.min.js");

    // I don't know how i'm meant to do this but the AP client seems to only take ids, so i'll just paste in location_name_to_ids from the .apworld
    const location_name_to_id = { 'Z1 - Wander - 1%': 1, 'Z1 - Wander - 5%': 2, 'Z1 - Wander - 10%': 3, 'Z1 - Wander - 15%': 4, 'Z1 - Wander - 20%': 5, 'Z1 - Wander - 25%': 6, 'Z1 - Wander - 30%': 7, 'Z1 - Wander - 40%': 8, 'Z1 - Wander - 50%': 9, 'Z1 - Wander - 60%': 10, 'Z1 - Wander - 70%': 11, 'Z1 - Wander - 80%': 12, 'Z1 - Wander - 90%': 13, 'Z1 - Wander - 95%': 14, 'Z1 - Wander - 99%': 15, 'Z1 - Wander - 100%': 16, 'Z1 - Pots - #1': 17, 'Z1 - Pots - #2': 18, 'Z1 - Pots - #3': 19, 'Z1 - Pots - #4': 20, 'Z1 - Pots - #5': 21, 'Z1 - Pots - #6': 22, 'Z1 - Pots - #7': 23, 'Z1 - Pots - #8': 24, 'Z1 - Pots - #9': 25, 'Z1 - Pots - #10': 26, 'Z1 - Pots - #11': 27, 'Z1 - Pots - #12': 28, 'Z1 - Pots - #13': 29, 'Z1 - Pots - #14': 30, 'Z1 - Pots - #15': 31, 'Z1 - Pots - #16': 32, 'Z1 - Pots - #17': 33, 'Z1 - Pots - #18': 34, 'Z1 - Pots - #19': 35, 'Z1 - Pots - #20': 36, 'Z1 - Pots - #21': 37, 'Z1 - Pots - #22': 38, 'Z1 - Pots - #23': 39, 'Z1 - Pots - #24': 40, 'Z1 - Pots - #25': 41, 'Z1 - Pots - #26': 42, 'Z1 - Pots - #27': 43, 'Z1 - Pots - #28': 44, 'Z1 - Pots - #29': 45, 'Z1 - Pots - #30': 46, 'Z1 - Pots - #31': 47, 'Z1 - Pots - #32': 48, 'Z1 - Pots - #33': 49, 'Z1 - Pots - #34': 50, 'Z1 - Pots - #35': 51, 'Z1 - Pots - #36': 52, 'Z1 - Pots - #37': 53, 'Z1 - Pots - #38': 54, 'Z1 - Pots - #39': 55, 'Z1 - Pots - #40': 56, 'Z1 - Pots - #41': 57, 'Z1 - Pots - #42': 58, 'Z1 - Pots - #43': 59, 'Z1 - Pots - #44': 60, 'Z1 - Pots - #45': 61, 'Z1 - Pots - #46': 62, 'Z1 - Pots - #47': 63, 'Z1 - Pots - #48': 64, 'Z1 - Pots - #49': 65, 'Z1 - Pots - #50': 66, 'Z1 - Locks - #1': 67, 'Z1 - Locks - #2': 68, 'Z1 - Locks - #3': 69, 'Z1 - Locks - #4': 70, 'Z1 - Locks - #5': 71, 'Z1 - Locks - #6': 72, 'Z1 - Locks - #7': 73, 'Z1 - Locks - #8': 74, 'Z1 - Locks - #9': 75, 'Z1 - Locks - #10': 76, 'Z1 - BuyGlasses': 77, 'Z1 - BuyManaZ1': 78, 'Z1 - Met - 1%': 79, 'Z1 - Met - 5%': 80, 'Z1 - Met - 10%': 81, 'Z1 - Met - 15%': 82, 'Z1 - Met - 20%': 83, 'Z1 - Met - 25%': 84, 'Z1 - Met - 30%': 85, 'Z1 - Met - 40%': 86, 'Z1 - Met - 50%': 87, 'Z1 - Met - 60%': 88, 'Z1 - Met - 70%': 89, 'Z1 - Met - 80%': 90, 'Z1 - Met - 90%': 91, 'Z1 - Met - 95%': 92, 'Z1 - Met - 99%': 93, 'Z1 - Met - 100%': 94, 'Z1 - TrainStrength': 95, 'Z1 - SQuests - #1': 96, 'Z1 - SQuests - #2': 97, 'Z1 - SQuests - #3': 98, 'Z1 - SQuests - #4': 99, 'Z1 - SQuests - #5': 100, 'Z1 - SQuests - #6': 101, 'Z1 - SQuests - #7': 102, 'Z1 - SQuests - #8': 103, 'Z1 - SQuests - #9': 104, 'Z1 - SQuests - #10': 105, 'Z1 - SQuests - #11': 106, 'Z1 - SQuests - #12': 107, 'Z1 - SQuests - #13': 108, 'Z1 - SQuests - #14': 109, 'Z1 - SQuests - #15': 110, 'Z1 - SQuests - #16': 111, 'Z1 - SQuests - #17': 112, 'Z1 -SQuests - #18': 113, 'Z1 - SQuests - #19': 114, 'Z1 - SQuests - #20': 115, 'Z1 - Secrets - 1%': 116, 'Z1 - Secrets - 5%': 117, 'Z1 - Secrets - 10%': 118, 'Z1 - Secrets - 15%': 119, 'Z1 - Secrets - 20%': 120, 'Z1 - Secrets - 25%': 121, 'Z1 - Secrets - 30%': 122, 'Z1 - Secrets - 40%': 123, 'Z1- Secrets - 50%': 124, 'Z1 - Secrets - 60%': 125, 'Z1 - Secrets - 70%': 126, 'Z1 - Secrets - 80%': 127, 'Z1 - Secrets - 90%': 128, 'Z1 - Secrets - 95%': 129, 'Z1 - Secrets - 99%': 130, 'Z1 - Secrets - 100%': 131, 'Z1 - LQuests - #1': 132, 'Z1 - LQuests - #2': 133, 'Z1 - LQuests - #3': 134, 'Z1 - LQuests - #4': 135, 'Z1 - LQuests - #5': 136, 'Z1 - LQuests - #6': 137, 'Z1 - LQuests - #7': 138, 'Z1 - LQuests - #8': 139, 'Z1 - LQuests - #9': 140, 'Z1 - LQuests - #10': 141, 'Z1 - ThrowParty': 142, 'Combat - Level 1': 143, 'Combat - Level 10': 144, 'Combat - Level 20': 145, 'Combat - Level 30': 146, 'Combat - Level 40': 147, 'Combat - Level 50': 148, 'Combat - Level 60': 149, 'Combat - Level 70': 150, 'Combat - Level 80': 151, 'Combat - Level 90': 152, 'Combat - Level 100': 153, 'Combat - Level 110': 154, 'Combat - Level 120': 155, 'Combat - Level 130': 156, 'Combat - Level 140': 157, 'Combat - Level 150': 158, 'Combat - Level 160': 159, 'Combat - Level 170': 160, 'Combat - Level 180': 161, 'Combat - Level 190': 162, 'Combat - Level 200': 163, 'Combat - Level 210': 164, 'Combat - Level 220': 165, 'Combat - Level 230': 166, 'Combat - Level 240': 167, 'Combat -Level 250': 168, 'Combat - Level 260': 169, 'Combat - Level 270': 170, 'Combat - Level 280': 171, 'Combat - Level 290': 172, 'Combat - Level 300': 173, 'Magic - Level 1': 174, 'Magic - Level 10': 175, 'Magic - Level 20': 176, 'Magic - Level 30': 177, 'Magic - Level 40': 178, 'Magic - Level 50': 179, 'Magic - Level 60': 180, 'Magic - Level 70': 181, 'Magic - Level 80': 182, 'Magic - Level 90': 183, 'Magic - Level 100': 184, 'Magic - Level 110': 185, 'Magic - Level 120': 186, 'Magic - Level 130': 187, 'Magic - Level 140': 188, 'Magic - Level 150': 189, 'Magic - Level 160': 190, 'Magic - Level 170': 191, 'Magic - Level 180': 192, 'Magic - Level 190': 193, 'Magic - Level 200': 194, 'Magic - Level 210': 195, 'Magic - Level 220': 196, 'Magic - Level 230': 197, 'Magic - Level 240': 198, 'Magic - Level 250': 199, 'Magic - Level 260': 200, 'Magic - Level 270': 201, 'Magic - Level 280': 202, 'Magic - Level 290': 203, 'Magic - Level 300': 204, 'Z1 - Heal - Completion #1': 205, 'Z1 - Heal - Completion #2': 206, 'Z1 - Heal - Completion #3': 207, 'Z1 - Heal - Completion #4': 208, 'Z1 - Heal - Completion #5': 209, 'Z1 - Heal - Completion #6': 210, 'Z1 - Heal - Completion #7': 211, 'Z1 - Heal - Completion #8': 212, 'Z1 - Heal - Completion #9': 213, 'Z1 - Heal - Completion #10': 214, 'Z1 - Fight - Completion #1': 215, 'Z1 - Fight - Completion #2': 216, 'Z1 - Fight - Completion #3': 217, 'Z1 - Fight - Completion #4': 218, 'Z1 - Fight - Completion #5': 219, 'Z1 - Fight - Completion #6': 220, 'Z1 - Fight - Completion #7': 221, 'Z1 - Fight - Completion #8': 222, 'Z1 - Fight - Completion #9': 223, 'Z1 - Fight - Completion #10': 224, 'Z1 - SDungeon - Completion #1': 225, 'Z1 - SDungeon - Completion #2': 226, 'Z1 - SDungeon - Completion #3': 227, 'Z1 - SDungeon - Completion #4': 228, 'Z1 - SDungeon - Completion #5': 229, 'Z1 - SDungeon - Completion #6': 230, 'Z1 - BuySupplies': 231, 'Z1 - Haggle': 232, 'Z1 - StartJourney': 233, 'Z2 - Forest - 1%': 234, 'Z2 - Forest - 5%': 235, 'Z2 - Forest - 10%': 236, 'Z2 - Forest - 15%': 237, 'Z2 - Forest - 20%': 238, 'Z2 - Forest - 25%': 239, 'Z2 - Forest - 30%': 240, 'Z2 - Forest - 40%': 241, 'Z2 - Forest - 50%': 242, 'Z2 - Forest - 60%': 243, 'Z2 - Forest - 70%': 244, 'Z2 - Forest - 80%': 245, 'Z2 - Forest - 90%': 246, 'Z2 - Forest - 95%': 247, 'Z2 - Forest - 99%': 248, 'Z2 - Forest - 100%': 249, 'Z2 - WildMana - #1': 250, 'Z2 - WildMana - #2': 251, 'Z2 - WildMana - #3': 252, 'Z2 - WildMana - #4': 253, 'Z2 - WildMana - #5': 254, 'Z2 - WildMana - #6': 255, 'Z2 - WildMana - #7': 256, 'Z2 - WildMana - #8': 257, 'Z2 - WildMana - #9': 258, 'Z2 - WildMana - #10': 259, 'Z2 - WildMana - #11': 260, 'Z2 - WildMana - #12': 261, 'Z2 - WildMana - #13': 262, 'Z2 - WildMana - #14': 263, 'Z2 - WildMana - #15': 264, 'Z2 - WildMana - #16': 265, 'Z2 - WildMana - #17': 266, 'Z2 - WildMana - #18': 267, 'Z2 - WildMana - #19': 268, 'Z2 - WildMana - #20': 269, 'Z2 - WildMana - #21': 270, 'Z2 - WildMana - #22': 271, 'Z2 - WildMana - #23': 272, 'Z2 - WildMana - #24': 273, 'Z2 - WildMana - #25': 274, 'Z2 - WildMana - #26': 275, 'Z2 - WildMana - #27': 276, 'Z2 - WildMana - #28': 277, 'Z2 - WildMana - #29': 278, 'Z2 - WildMana - #30': 279, 'Z2 - WildMana - #31': 280, 'Z2 - WildMana - #32': 281, 'Z2 - WildMana - #33': 282, 'Z2 - WildMana - #34': 283, 'Z2 - WildMana - #35': 284, 'Z2 - WildMana - #36': 285, 'Z2 - WildMana - #37': 286, 'Z2 - WildMana - #38': 287, 'Z2 - WildMana - #39': 288, 'Z2 - WildMana - #40': 289, 'Z2 - WildMana - #41': 290, 'Z2 - WildMana - #42': 291, 'Z2 - WildMana - #43': 292, 'Z2 - WildMana - #44': 293, 'Z2 - WildMana - #45': 294, 'Z2 - WildMana - #46': 295, 'Z2 - WildMana - #47': 296, 'Z2 - WildMana - #48': 297, 'Z2 - WildMana - #49': 298, 'Z2 - WildMana - #50': 299, 'Z2 - WildMana - #51': 300, 'Z2 - WildMana - #52': 301, 'Z2 - WildMana - #53': 302, 'Z2 - WildMana - #54': 303, 'Z2 - WildMana - #55': 304, 'Z2 - WildMana - #56': 305, 'Z2 - WildMana - #57': 306, 'Z2 - WildMana - #58': 307, 'Z2 - WildMana - #59': 308, 'Z2 - WildMana - #60': 309, 'Z2 - WildMana - #61': 310, 'Z2 - WildMana - #62': 311, 'Z2 - WildMana - #63': 312, 'Z2 - WildMana - #64': 313, 'Z2 - WildMana - #65': 314, 'Z2 - WildMana - #66': 315, 'Z2 - WildMana - #67': 316, 'Z2 - WildMana - #68': 317, 'Z2 - WildMana - #69': 318, 'Z2 - WildMana - #70': 319, 'Z2 - WildMana - #71': 320, 'Z2 - WildMana - #72': 321, 'Z2 - WildMana - #73': 322, 'Z2 - WildMana - #74': 323, 'Z2 - WildMana - #75': 324, 'Z2 - WildMana - #76': 325, 'Z2 - WildMana - #77': 326, 'Z2 - WildMana - #78': 327, 'Z2 - WildMana - #79': 328, 'Z2 - WildMana - #80': 329, 'Z2 - WildMana - #81': 330, 'Z2 - WildMana - #82': 331, 'Z2 - WildMana - #83': 332, 'Z2 - WildMana - #84': 333, 'Z2 - WildMana - #85': 334, 'Z2 - WildMana - #86': 335, 'Z2 - WildMana - #87': 336, 'Z2 - WildMana - #88': 337, 'Z2 - WildMana - #89': 338, 'Z2 - WildMana - #90': 339, 'Z2 - WildMana - #91': 340, 'Z2 - WildMana - #92': 341, 'Z2 - WildMana - #93': 342, 'Z2 - WildMana - #94': 343, 'Z2 - WildMana - #95': 344, 'Z2 - WildMana - #96': 345, 'Z2 - WildMana - #97': 346, 'Z2 - WildMana - #98': 347, 'Z2 - WildMana - #99': 348, 'Z2 - WildMana - #100': 349, 'Z2 - Herbs - #1': 350, 'Z2 - Herbs - #2': 351, 'Z2 - Herbs - #3': 352, 'Z2 - Herbs - #4': 353, 'Z2 - Herbs - #5': 354, 'Z2 - Herbs - #6': 355, 'Z2 - Herbs - #7': 356, 'Z2 - Herbs - #8': 357, 'Z2 - Herbs - #9': 358, 'Z2 - Herbs - #10': 359, 'Z2 - Herbs - #11': 360, 'Z2 - Herbs - #12': 361, 'Z2 - Herbs - #13': 362, 'Z2 - Herbs - #14': 363, 'Z2 - Herbs - #15': 364, 'Z2 - Herbs - #16': 365, 'Z2 - Herbs - #17': 366, 'Z2 -Herbs - #18': 367, 'Z2 - Herbs - #19': 368, 'Z2 - Herbs - #20': 369, 'Z2 - Herbs - #21': 370, 'Z2 - Herbs - #22': 371, 'Z2 - Herbs - #23': 372, 'Z2 - Herbs - #24': 373, 'Z2 - Herbs - #25': 374, 'Z2 - Herbs - #26': 375, 'Z2 - Herbs - #27': 376, 'Z2 - Herbs - #28': 377, 'Z2 - Herbs - #29': 378, 'Z2 - Herbs - #30': 379, 'Z2 - Herbs - #31': 380, 'Z2 - Herbs - #32': 381, 'Z2 - Herbs - #33': 382, 'Z2 - Herbs - #34': 383, 'Z2 - Herbs - #35': 384, 'Z2 - Herbs - #36': 385, 'Z2 - Herbs - #37': 386, 'Z2 - Herbs - #38': 387, 'Z2 - Herbs - #39': 388, 'Z2 - Herbs - #40': 389, 'Z2 - Herbs - #41': 390, 'Z2 - Herbs - #42': 391, 'Z2 - Herbs - #43': 392, 'Z2 - Herbs - #44': 393, 'Z2 - Herbs - #45': 394, 'Z2 - Herbs - #46': 395, 'Z2 - Herbs - #47': 396, 'Z2 - Herbs - #48': 397, 'Z2 - Herbs - #49': 398, 'Z2 - Herbs - #50': 399, 'Z2 - Herbs - #51': 400, 'Z2 - Herbs - #52': 401, 'Z2 - Herbs - #53': 402, 'Z2 - Herbs - #54': 403, 'Z2 - Herbs - #55': 404, 'Z2 - Herbs - #56': 405, 'Z2 - Herbs - #57': 406, 'Z2 - Herbs - #58': 407, 'Z2 - Herbs - #59': 408, 'Z2 - Herbs - #60': 409, 'Z2 - Herbs - #61': 410, 'Z2 - Herbs - #62': 411, 'Z2 - Herbs - #63': 412, 'Z2 - Herbs - #64': 413, 'Z2 - Herbs - #65': 414, 'Z2 - Herbs - #66': 415, 'Z2 - Herbs - #67': 416, 'Z2 - Herbs - #68': 417, 'Z2 - Herbs - #69': 418, 'Z2 - Herbs - #70': 419, 'Z2 - Herbs - #71': 420, 'Z2 - Herbs - #72': 421, 'Z2 - Herbs - #73': 422, 'Z2 - Herbs - #74': 423, 'Z2 - Herbs - #75': 424, 'Z2 - Herbs - #76': 425, 'Z2 - Herbs - #77': 426, 'Z2 - Herbs - #78': 427, 'Z2 - Herbs - #79': 428, 'Z2 - Herbs - #80': 429, 'Z2 - Herbs - #81': 430, 'Z2 - Herbs - #82': 431, 'Z2 - Herbs - #83': 432, 'Z2 - Herbs - #84': 433, 'Z2 - Herbs - #85': 434, 'Z2 - Herbs - #86': 435, 'Z2 - Herbs - #87': 436, 'Z2 - Herbs -#88': 437, 'Z2 - Herbs - #89': 438, 'Z2 - Herbs - #90': 439, 'Z2 - Herbs - #91': 440, 'Z2 - Herbs - #92': 441, 'Z2 - Herbs - #93': 442, 'Z2 - Herbs - #94': 443, 'Z2 - Herbs - #95': 444, 'Z2 - Herbs - #96': 445, 'Z2 - Herbs - #97': 446, 'Z2 - Herbs - #98': 447, 'Z2 - Herbs - #99': 448, 'Z2 - Herbs - #100': 449, 'Z2 - Herbs - #101': 450, 'Z2 - Herbs - #102': 451, 'Z2 - Herbs - #103': 452, 'Z2 - Herbs - #104': 453, 'Z2 - Herbs - #105': 454, 'Z2 - Herbs - #106': 455, 'Z2 - Herbs - #107': 456, 'Z2 - Herbs - #108': 457, 'Z2 - Herbs - #109': 458, 'Z2 - Herbs - #110': 459, 'Z2 - Herbs -#111': 460, 'Z2 - Herbs - #112': 461, 'Z2 - Herbs - #113': 462, 'Z2 - Herbs - #114': 463, 'Z2 - Herbs - #115': 464, 'Z2 - Herbs - #116': 465, 'Z2 - Herbs - #117': 466, 'Z2 - Herbs - #118': 467, 'Z2 - Herbs - #119': 468, 'Z2 - Herbs - #120': 469, 'Z2 - Herbs - #121': 470, 'Z2 - Herbs - #122': 471, 'Z2 - Herbs - #123': 472, 'Z2 - Herbs - #124': 473, 'Z2 - Herbs - #125': 474, 'Z2 - Herbs - #126': 475, 'Z2 - Herbs - #127': 476, 'Z2 - Herbs - #128': 477, 'Z2 - Herbs - #129': 478, 'Z2 - Herbs - #130': 479, 'Z2 - Herbs - #131': 480, 'Z2 - Herbs - #132': 481, 'Z2 - Herbs - #133': 482, 'Z2 - Herbs - #134': 483, 'Z2 - Herbs - #135': 484, 'Z2 - Herbs - #136': 485, 'Z2 - Herbs - #137': 486, 'Z2 - Herbs - #138': 487, 'Z2 - Herbs - #139': 488, 'Z2 - Herbs - #140': 489, 'Z2 - Herbs - #141': 490, 'Z2 - Herbs - #142': 491, 'Z2 - Herbs - #143': 492, 'Z2 - Herbs - #144': 493, 'Z2 - Herbs - #145': 494, 'Z2 - Herbs - #146': 495, 'Z2 - Herbs - #147': 496, 'Z2 - Herbs - #148': 497, 'Z2 - Herbs - #149': 498, 'Z2 - Herbs - #150': 499, 'Z2 - Herbs - #151': 500, 'Z2 - Herbs - #152': 501, 'Z2 - Herbs - #153': 502, 'Z2 - Herbs - #154': 503, 'Z2 - Herbs - #155': 504, 'Z2 - Herbs - #156': 505, 'Z2 - Herbs - #157': 506, 'Z2 - Herbs - #158': 507, 'Z2 - Herbs - #159': 508, 'Z2 - Herbs - #160': 509, 'Z2 - Herbs - #161': 510, 'Z2 - Herbs - #162': 511, 'Z2 - Herbs - #163': 512, 'Z2 - Herbs - #164': 513, 'Z2 - Herbs - #165': 514, 'Z2 - Herbs - #166': 515, 'Z2 - Herbs - #167': 516, 'Z2 - Herbs - #168': 517, 'Z2 - Herbs - #169': 518, 'Z2 - Herbs - #170': 519, 'Z2 - Herbs - #171': 520, 'Z2 - Herbs - #172': 521, 'Z2 - Herbs - #173': 522, 'Z2 - Herbs - #174': 523, 'Z2 - Herbs - #175': 524, 'Z2 - Herbs - #176': 525, 'Z2 - Herbs - #177': 526, 'Z2 - Herbs - #178': 527, 'Z2- Herbs - #179': 528, 'Z2 - Herbs - #180': 529, 'Z2 - Herbs - #181': 530, 'Z2 - Herbs - #182': 531, 'Z2 - Herbs - #183': 532, 'Z2 - Herbs - #184': 533, 'Z2 - Herbs - #185': 534, 'Z2 - Herbs - #186': 535, 'Z2 - Herbs - #187': 536, 'Z2 - Herbs - #188': 537, 'Z2 - Herbs - #189': 538, 'Z2 - Herbs - #190': 539, 'Z2 - Herbs - #191': 540, 'Z2 - Herbs - #192': 541, 'Z2 - Herbs - #193': 542, 'Z2 - Herbs - #194': 543, 'Z2 - Herbs - #195': 544, 'Z2 - Herbs - #196': 545, 'Z2 - Herbs - #197': 546, 'Z2 - Herbs - #198': 547, 'Z2 - Herbs - #199': 548, 'Z2 - Herbs - #200': 549, 'Z2 - Hunt - #1': 550, 'Z2 - Hunt - #2': 551, 'Z2 - Hunt - #3': 552, 'Z2 - Hunt - #4': 553, 'Z2 - Hunt - #5': 554, 'Z2 - Hunt - #6': 555, 'Z2 - Hunt - #7': 556, 'Z2 - Hunt - #8': 557, 'Z2 - Hunt - #9': 558, 'Z2 - Hunt - #10': 559, 'Z2 - Hunt - #11': 560, 'Z2 - Hunt - #12': 561, 'Z2 - Hunt - #13': 562, 'Z2 - Hunt - #14': 563, 'Z2 - Hunt - #15': 564, 'Z2 - Hunt - #16': 565, 'Z2 - Hunt - #17': 566, 'Z2 - Hunt - #18': 567, 'Z2 - Hunt - #19': 568, 'Z2 - Hunt - #20': 569, 'Z2 - SitByWaterfall': 570, 'Z2 - Shortcut - 1%': 571, 'Z2 - Shortcut - 5%': 572, 'Z2 - Shortcut - 10%': 573, 'Z2 - Shortcut - 15%': 574, 'Z2 - Shortcut - 20%': 575, 'Z2 - Shortcut - 25%': 576, 'Z2 - Shortcut - 30%': 577, 'Z2 - Shortcut - 40%': 578, 'Z2 - Shortcut - 50%': 579, 'Z2 - Shortcut - 60%': 580, 'Z2 - Shortcut - 70%': 581, 'Z2 - Shortcut - 80%': 582, 'Z2 - Shortcut - 90%': 583, 'Z2 - Shortcut - 95%': 584, 'Z2 - Shortcut - 99%': 585, 'Z2 - Shortcut - 100%': 586, 'Z2 - Hermit - 1%': 587, 'Z2 - Hermit - 5%': 588, 'Z2 - Hermit - 10%': 589, 'Z2 - Hermit - 15%': 590, 'Z2 - Hermit - 20%': 591, 'Z2 - Hermit - 25%': 592, 'Z2 - Hermit - 30%': 593, 'Z2 - Hermit - 40%': 594, 'Z2 - Hermit - 50%': 595, 'Z2 - Hermit - 60%': 596, 'Z2 - Hermit - 70%': 597, 'Z2 - Hermit - 80%': 598, 'Z2 - Hermit - 90%': 599, 'Z2 - Hermit - 95%': 600, 'Z2 - Hermit - 99%': 601, 'Z2 - Hermit - 100%': 602, 'Practical - Level 1': 603, 'Practical - Level 10': 604, 'Practical - Level 20': 605, 'Practical - Level 30': 606, 'Practical - Level 40': 607, 'Practical - Level 50': 608, 'Practical - Level 60': 609, 'Practical - Level 70': 610, 'Practical - Level 80': 611, 'Practical - Level 90': 612, 'Practical - Level 100': 613, 'Practical - Level 110': 614, 'Practical - Level 120': 615, 'Practical - Level 130': 616, 'Practical - Level 140': 617, 'Practical - Level 150': 618, 'Practical - Level 160': 619, 'Practical - Level 170': 620, 'Practical - Level 180': 621, 'Practical - Level 190': 622, 'Practical - Level 200': 623, 'Practical - Level 210': 624, 'Practical - Level 220': 625, 'Practical - Level 230': 626, 'Practical - Level 240': 627, 'Practical - Level 250': 628, 'Practical - Level 260': 629, 'Practical - Level 270': 630, 'Practical - Level 280': 631, 'Practical - Level 290': 632, 'Practical - Level 300': 633, 'Alchemy - Level 1': 634, 'Alchemy - Level 10': 635, 'Alchemy - Level 20': 636, 'Alchemy - Level 30': 637, 'Alchemy - Level 40': 638, 'Alchemy - Level 50': 639, 'Alchemy - Level 60': 640, 'Alchemy - Level 70': 641, 'Alchemy - Level 80': 642, 'Alchemy - Level 90': 643, 'Alchemy - Level 100': 644, 'Z2 - BrewPotions': 645, 'Z2 - TrainDexterity': 646, 'Z2 - TrainSpeed': 647, 'Z2 - Flowers - 1%': 648, 'Z2 - Flowers - 5%': 649, 'Z2 - Flowers - 10%': 650, 'Z2 - Flowers - 15%': 651, 'Z2 - Flowers - 20%': 652, 'Z2 - Flowers - 25%': 653, 'Z2 - Flowers - 30%': 654, 'Z2 - Flowers - 40%': 655, 'Z2 - Flowers - 50%': 656, 'Z2 - Flowers - 60%': 657, 'Z2 - Flowers - 70%': 658, 'Z2 - Flowers - 80%': 659, 'Z2 - Flowers - 90%': 660, 'Z2 - Flowers - 95%': 661, 'Z2 - Flowers - 99%': 662, 'Z2 - Flowers - 100%': 663, 'Z2 - BirdWatching': 664, 'Z2 - Thicket - 1%': 665, 'Z2 - Thicket - 5%': 666, 'Z2 - Thicket - 10%': 667, 'Z2 - Thicket - 15%': 668, 'Z2 - Thicket - 20%': 669, 'Z2 - Thicket - 25%': 670, 'Z2 - Thicket - 30%': 671, 'Z2 - Thicket - 40%': 672, 'Z2 - Thicket - 50%': 673, 'Z2 - Thicket - 60%': 674, 'Z2 - Thicket - 70%': 675, 'Z2 - Thicket - 80%': 676, 'Z2 - Thicket - 90%': 677, 'Z2 - Thicket - 95%': 678, 'Z2 - Thicket - 99%': 679, 'Z2 - Thicket - 100%': 680, 'Z2 - Witch - 1%': 681, 'Z2 - Witch - 5%': 682, 'Z2 - Witch - 10%': 683, 'Z2 - Witch - 15%': 684, 'Z2 - Witch - 20%': 685, 'Z2 - Witch - 25%': 686, 'Z2 - Witch - 30%': 687, 'Z2 - Witch - 40%': 688, 'Z2 - Witch - 50%': 689, 'Z2 - Witch - 60%': 690, 'Z2 - Witch - 70%': 691, 'Z2 - Witch- 80%': 692, 'Z2 - Witch - 90%': 693, 'Z2 - Witch - 95%': 694, 'Z2 - Witch - 99%': 695, 'Z2 - Witch - 100%': 696, 'Dark - Level 1': 697, 'Dark - Level 10': 698, 'Dark - Level 20': 699, 'Dark - Level 30': 700, 'Dark - Level 40': 701, 'Dark - Level 50': 702, 'Dark - Level 60': 703, 'Dark - Level 70': 704, 'Dark - Level 80': 705, 'Dark - Level 90': 706, 'Dark - Level 100': 707, 'Dark - Level 110': 708, 'Dark - Level 120': 709, 'Dark - Level 130': 710, 'Dark - Level 140': 711, 'Dark - Level 150': 712, 'Dark - Level 160': 713, 'Dark - Level 170': 714, 'Dark - Level 180': 715, 'Dark -Level 190': 716, 'Dark - Level 200': 717, 'Dark - Level 210': 718, 'Dark - Level 220': 719, 'Dark - Level 230': 720, 'Dark - Level 240': 721, 'Dark - Level 250': 722, 'Dark - Level 260': 723, 'Dark - Level 270': 724, 'Dark - Level 280': 725, 'Dark - Level 290': 726, 'Dark - Level 300': 727, 'Z2 - DarkRitual - Completion #1': 728, 'Z2 - ContinueOn': 729, 'Z3 - City - 1%': 730, 'Z3 - City - 5%': 731, 'Z3 - City - 10%': 732, 'Z3 - City - 15%': 733, 'Z3 - City - 20%': 734, 'Z3 - City - 25%': 735, 'Z3 - City - 30%': 736, 'Z3 - City - 40%': 737, 'Z3 - City - 50%': 738, 'Z3 - City - 60%': 739, 'Z3 - City - 70%': 740, 'Z3 - City - 80%': 741, 'Z3 - City - 90%': 742, 'Z3 - City - 95%': 743, 'Z3 - City - 99%': 744, 'Z3 - City - 100%': 745, 'Z3 - Gamble - #1': 746, 'Z3 - Gamble - #2': 747, 'Z3 - Gamble - #3': 748, 'Z3 - Gamble - #4': 749, 'Z3 - Gamble - #5': 750, 'Z3 - Gamble -#6': 751, 'Z3 - Gamble - #7': 752, 'Z3 - Gamble - #8': 753, 'Z3 - Gamble - #9': 754, 'Z3 - Gamble - #10': 755, 'Z3 - Gamble - #11': 756, 'Z3 - Gamble - #12': 757, 'Z3 - Gamble - #13': 758, 'Z3 - Gamble - #14': 759, 'Z3 - Gamble - #15': 760, 'Z3 - Gamble - #16': 761, 'Z3 - Gamble - #17': 762, 'Z3 - Gamble - #18': 763, 'Z3 - Gamble - #19': 764, 'Z3 - Gamble - #20': 765, 'Z3 - Drunk - 1%': 766, 'Z3 - Drunk - 5%': 767, 'Z3 - Drunk - 10%': 768, 'Z3 - Drunk - 15%': 769, 'Z3 - Drunk - 20%': 770, 'Z3 - Drunk - 25%': 771, 'Z3 - Drunk - 30%': 772, 'Z3 - Drunk - 40%': 773, 'Z3 - Drunk - 50%': 774, 'Z3 - Drunk - 60%': 775, 'Z3 - Drunk - 70%': 776, 'Z3 - Drunk - 80%': 777, 'Z3 - Drunk - 90%': 778, 'Z3 - Drunk - 95%': 779, 'Z3 - Drunk - 99%': 780, 'Z3 - Drunk - 100%': 781, 'Z3 - BuyManaZ3': 782, 'Z3 - SellPotions': 783, 'Z3 - GatherTeam': 784, 'Z3 - LDungeon - Completion #1': 785, 'Z3 - LDungeon - Completion #2': 786, 'Z3 - LDungeon - Completion #3': 787, 'Z3 - LDungeon - Completion #4': 788, 'Z3 - LDungeon - Completion #5': 789, 'Z3 - Apprentice - 1%': 790, 'Z3 - Apprentice - 5%': 791, 'Z3 - Apprentice - 10%': 792, 'Z3 - Apprentice - 15%': 793, 'Z3 - Apprentice - 20%': 794, 'Z3 - Apprentice - 25%': 795, 'Z3 - Apprentice - 30%': 796, 'Z3 - Apprentice - 40%': 797, 'Z3 - Apprentice - 50%': 798, 'Z3 - Apprentice - 60%': 799, 'Z3 - Apprentice - 70%': 800, 'Z3 - Apprentice - 80%': 801, 'Z3 - Apprentice - 90%': 802, 'Z3 - Apprentice - 95%': 803, 'Z3 - Apprentice - 99%': 804, 'Z3 - Apprentice - 100%': 805, 'Z3 - Mason - 1%': 806, 'Z3 - Mason - 5%': 807, 'Z3 - Mason - 10%': 808, 'Z3 - Mason - 15%': 809, 'Z3 - Mason - 20%': 810, 'Z3 - Mason - 25%': 811, 'Z3 - Mason - 30%': 812, 'Z3 - Mason - 40%': 813, 'Z3 - Mason - 50%': 814, 'Z3 - Mason - 60%': 815, 'Z3 - Mason - 70%': 816, 'Z3 - Mason - 80%': 817, 'Z3 - Mason - 90%': 818, 'Z3 - Mason - 95%': 819, 'Z3 - Mason - 99%': 820, 'Z3 - Mason - 100%': 821, 'Z3 - Architect - 1%': 822, 'Z3 - Architect - 5%': 823, 'Z3 - Architect - 10%': 824, 'Z3 - Architect - 15%': 825, 'Z3 - Architect - 20%': 826, 'Z3 - Architect - 25%': 827, 'Z3 - Architect - 30%': 828, 'Z3 - Architect - 40%': 829, 'Z3 - Architect - 50%': 830, 'Z3 - Architect - 60%': 831, 'Z3 - Architect - 70%': 832, 'Z3 - Architect - 80%': 833, 'Z3 - Architect - 90%': 834, 'Z3 - Architect - 95%': 835, 'Z3 - Architect - 99%': 836, 'Z3 - Architect - 100%': 837, 'Z3 - ReadBooks': 838, 'Z3 - BuyPickaxe': 839, 'Z3 - StartTrek': 840, 'Z4 - Mountain - 1%': 841, 'Z4 - Mountain - 5%': 842, 'Z4 - Mountain - 10%': 843, 'Z4 - Mountain - 15%': 844, 'Z4 - Mountain - 20%': 845, 'Z4 - Mountain - 25%': 846, 'Z4 - Mountain - 30%': 847, 'Z4 - Mountain - 40%': 848, 'Z4 - Mountain - 50%': 849, 'Z4 - Mountain - 60%': 850, 'Z4 - Mountain - 70%': 851, 'Z4 - Mountain - 80%': 852, 'Z4 - Mountain - 90%': 853, 'Z4 - Mountain - 95%': 854, 'Z4 - Mountain - 99%': 855, 'Z4 - Mountain - 100%': 856, 'Z4 - Geysers - #1': 857, 'Z4 - Geysers- #2': 858, 'Z4 - Geysers - #3': 859, 'Z4 - Geysers - #4': 860, 'Z4 - Geysers - #5': 861, 'Z4 - Geysers - #6': 862, 'Z4 - Geysers - #7': 863, 'Z4 - Geysers - #8': 864, 'Z4 - Geysers - #9': 865, 'Z4 - Geysers - #10': 866, 'Z4 - Runes - 1%': 867, 'Z4 - Runes - 5%': 868, 'Z4 - Runes - 10%': 869, 'Z4 - Runes - 15%': 870, 'Z4 - Runes - 20%': 871, 'Z4 - Runes - 25%': 872, 'Z4 - Runes - 30%': 873, 'Z4 - Runes - 40%': 874, 'Z4 - Runes - 50%': 875, 'Z4 - Runes - 60%': 876, 'Z4 - Runes - 70%': 877, 'Z4 - Runes - 80%': 878, 'Z4 - Runes - 90%': 879, 'Z4 - Runes - 95%': 880, 'Z4 - Runes - 99%': 881, 'Z4 - Runes - 100%': 882, 'Chronomancy - Level 1': 883, 'Chronomancy - Level 10': 884, 'Chronomancy - Level 20': 885, 'Chronomancy - Level 30': 886, 'Chronomancy - Level 40': 887, 'Chronomancy - Level 50': 888, 'Chronomancy - Level 60': 889, 'Chronomancy - Level 70': 890, 'Chronomancy - Level 80': 891, 'Chronomancy - Level 90': 892, 'Chronomancy - Level 100': 893, 'Pyromancy - Level 1': 894, 'Pyromancy - Level 10': 895, 'Pyromancy - Level 20': 896, 'Pyromancy - Level 30': 897, 'Pyromancy - Level 40': 898, 'Pyromancy - Level 50': 899, 'Pyromancy - Level 60': 900, 'Pyromancy - Level 70': 901, 'Pyromancy - Level 80': 902, 'Pyromancy - Level 90': 903, 'Pyromancy - Level 100': 904, 'Z4 - Cavern - 1%': 905, 'Z4 - Cavern - 5%': 906, 'Z4 - Cavern - 10%': 907, 'Z4 - Cavern - 15%': 908, 'Z4 - Cavern - 20%': 909, 'Z4 - Cavern - 25%': 910, 'Z4 - Cavern - 30%': 911, 'Z4 - Cavern - 40%': 912, 'Z4 - Cavern - 50%': 913, 'Z4 - Cavern - 60%': 914, 'Z4 - Cavern - 70%': 915, 'Z4 - Cavern - 80%': 916, 'Z4 - Cavern - 90%': 917, 'Z4 - Cavern - 95%': 918, 'Z4 - Cavern - 99%': 919, 'Z4 - Cavern - 100%': 920, 'Z4 - MineSoulstones - #1': 921, 'Z4 - MineSoulstones - #2': 922, 'Z4 - MineSoulstones - #3': 923, 'Z4 - MineSoulstones - #4': 924, 'Z4 - MineSoulstones - #5': 925, 'Z4 - MineSoulstones - #6': 926, 'Z4 - MineSoulstones - #7': 927, 'Z4 - MineSoulstones - #8': 928, 'Z4 - MineSoulstones - #9': 929, 'Z4 - MineSoulstones - #10': 930, 'Z4 - MineSoulstones - #11': 931, 'Z4 - MineSoulstones - #12': 932, 'Z4 - MineSoulstones - #13': 933, 'Z4 - MineSoulstones - #14': 934, 'Z4 - MineSoulstones - #15': 935, 'Z4 - MineSoulstones - #16': 936, 'Z4 - MineSoulstones - #17': 937, 'Z4 - MineSoulstones - #18': 938, 'Z4 - MineSoulstones - #19': 939, 'Z4 - MineSoulstones - #20': 940, 'Z4 - MineSoulstones - #21': 941, 'Z4 - MineSoulstones - #22': 942, 'Z4 - MineSoulstones - #23': 943, 'Z4 - MineSoulstones - #24': 944, 'Z4 - MineSoulstones - #25': 945, 'Z4 - MineSoulstones - #26': 946, 'Z4 - MineSoulstones - #27': 947, 'Z4 - MineSoulstones - #28': 948, 'Z4 - MineSoulstones - #29': 949, 'Z4 - MineSoulstones - #30': 950, 'Z4 - HuntTrolls - Completion #1': 951, 'Z4 - HuntTrolls - Completion #2': 952, 'Z4 - HuntTrolls - Completion #3': 953, 'Z4 - HuntTrolls - Completion #4': 954, 'Z4 - HuntTrolls - Completion #5': 955, 'Z4 - Illusions - 1%': 956, 'Z4 - Illusions - 5%': 957, 'Z4 - Illusions - 10%': 958, 'Z4 - Illusions - 15%': 959, 'Z4 - Illusions - 20%': 960, 'Z4 - Illusions - 25%': 961, 'Z4 - Illusions - 30%': 962, 'Z4 - Illusions - 40%': 963, 'Z4 - Illusions - 50%': 964, 'Z4 - Illusions - 60%': 965, 'Z4 - Illusions - 70%': 966, 'Z4 - Illusions - 80%': 967, 'Z4 - Illusions - 90%': 968, 'Z4 - Illusions - 95%': 969, 'Z4 - Illusions - 99%': 970, 'Z4 - Illusions - 100%': 971, 'Z4 - Artifacts - #1': 972, 'Z4 - Artifacts - #2': 973, 'Z4 - Artifacts - #3': 974, 'Z4 - Artifacts - #4': 975, 'Z4 - Artifacts - #5': 976, 'Z4 - Artifacts - #6': 977, 'Z4 - Artifacts - #7': 978, 'Z4 - Artifacts - #8': 979, 'Z4 - Artifacts - #9': 980, 'Z4 - Artifacts - #10': 981, 'Z4 - Artifacts - #11': 982, 'Z4 - Artifacts - #12': 983, 'Z4 - Artifacts - #13': 984, 'Z4 - Artifacts - #14': 985, 'Z4 - Artifacts - #15': 986, 'Z4 - Artifacts - #16': 987, 'Z4 - Artifacts - #17': 988, 'Z4 - Artifacts - #18': 989, 'Z4 - Artifacts - #19': 990, 'Z4 - Artifacts - #20': 991, 'Z4 - ImbueMind - Completion #1': 992, 'Z4 - FaceJudgement': 993 }

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
        "Gamble": 10,
        "Geysers": 100,
        "MineSoulstones": 10,
        "Artifacts": 25,
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
            if (!stop) pauseGame();
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
            for (let town = 0; town <= this.goalZone; town++) {

                // Overwriting action visibility and unlocked
                // And send a check when finishing an action, it's meant to be for the first time but the client filters duplicate checks
                // Not optimized but whatever
                for (const action of towns[town].totalActionList) {
                    action._visible = action.visible;
                    action.visible = function () {
                        return window.IdleLoopsAP.visible(this);
                    }
                    action._unlocked = action.unlocked;
                    action.unlocked = function () {
                        return window.IdleLoopsAP.unlocked(this);
                    }

                    if (action.type == "progress") {
                        const el = document.querySelector(`#infoContainer${action.varName} .showthat`);
                        const hover = el.querySelector(".showthis");
                        el.addEventListener("mouseover", () => { window.IdleLoopsAP.scoutProgress(hover, town, action.varName) });
                    }

                    if (action.type == "limited") {
                        const el = document.querySelector(`#infoContainer${action.varName} .showthat`);
                        const badUIdecisions = el.querySelectorAll(".fa-arrow-left")
                        const slash = document.createElement("span");
                        slash.textContent = " / ";
                        badUIdecisions[0].replaceWith(slash);
                        const unchecked = document.createElement("span");
                        unchecked.textContent = "Unchecked: ";
                        badUIdecisions[1].replaceWith(unchecked);

                        const hover = el.querySelector(".showthis");
                        el.addEventListener("mouseover", () => { window.IdleLoopsAP.scoutLimited(hover, town, action.varName) });
                    }

                    // Annoyingly skill actions are of type normal
                    if (action.type == "normal" && !skill_actions.includes(action.varName)) {
                        action._finish = action.finish;
                        action.finish = function () {
                            window.IdleLoopsAP.location(`Z${town + 1} - ${this.varName}`);
                            if (window.IdleLoopsAP.goalZone == 0 && this.varName == "StartJourney") {
                                window.IdleLoopsAP.client.goal();
                            } else if (window.IdleLoopsAP.goalZone == 1 && this.varName == "ContinueOn") {
                                window.IdleLoopsAP.client.goal();
                            } else if (window.IdleLoopsAP.goalZone == 2 && this.varName == "StartTrek") {
                                window.IdleLoopsAP.client.goal();
                            } else if (window.IdleLoopsAP.goalZone == 3 && this.varName == "FaceJudgement") {
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
                        el.addEventListener("mouseover", () => { window.IdleLoopsAP.scoutRegular(scoutcontainer, town, action.varName) });
                    }

                    if (action.type == "multipart") {
                        const el = document.querySelector(`#container${action.varName}.showthat`);
                        const hover = el.querySelector(".showthis");
                        const scoutcontainer = document.createElement("div");
                        scoutcontainer.classList.add("scout");
                        hover.prepend(document.createElement("br"));
                        hover.prepend(scoutcontainer);
                        el.addEventListener("mouseover", () => { window.IdleLoopsAP.scoutMultipart(scoutcontainer, town, action.varName) });
                    }
                }

                towns[town] = new Proxy(towns[town], {
                    get: (target, prop, receiver) => {
                        // Item: Number of Limited Actions
                        // Overwrite whatever the game thinks it has with the number of checks of this type recieved
                        if (prop.startsWith("good")) {
                            const name = prop.substring(4);
                            if (!name.startsWith("Temp")) {
                                return this.state?.[`Z${town + 1} - ${name}`] || 0;
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
                            if (!name.startsWith("Temp")) {
                                const rewardRatio = limitedRewardRatios[name];
                                this.location(`Z${town + 1} - ${name} - #${Math.floor(target['checked' + name] / rewardRatio)}`);
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
                            for (let i = prevLevel + 1; i <= newLevel; i++) {
                                if (bar_locations.includes(i)) {
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
                            // Silly way to not send checks for buffs, just don't put them in segments
                            if (name in segments) {
                                this.location(`Z${town + 1} - ${name} - Completion #${value / segments[name]}`);
                            }
                        }

                        return Reflect.set(target, prop, value, receiver);
                    }
                });
                // We need to add a line half way through this function, annoying that means copying a whole function
                towns[town].finishRegular = function (varName, rewardRatio, rewardFunc) {
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
                        if (`Z${this.index + 1} - ${varName} - Search` in window.IdleLoopsAP.state) {
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
                    view.requestUpdate("updateRegular", { name: varName, index: this.index });
                }
            }

            for (const skill in skills) {
                skills[skill] = new Proxy(skills[skill], {
                    set: (target, prop, value, receiver) => {
                        const prevLevel = getSkillLevel(skill);
                        const success = Reflect.set(target, prop, value, receiver);
                        const newLevel = getSkillLevel(skill);
                        for (let i = prevLevel + 1; i <= newLevel; i++) {
                            if (skill_locations.includes(i)) {
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
                el.addEventListener("mouseover", () => { window.IdleLoopsAP.scoutSkill(scoutcontainer, skill) });
            }

            for (const buff in buffs) {
                buffs[buff] = new Proxy(buffs[buff], {
                    set: (target, prop, value, receiver) => {
                        const prevLevel = target[prop];
                        const success = Reflect.set(target, prop, value, receiver);
                        const newLevel = value;
                        for (let i = prevLevel + 1; i <= newLevel; i++) {
                            if (skill_locations.includes(i)) {
                                window.IdleLoopsAP.location(`${buff} - Level ${i}`);
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
                if (getExploreProgress() >= 100) addResource("glasses", true);
                view.requestUpdate("updateResources", null);
            }

            // If the Predictor is installed, hook into it to handle starting filler
            // Because you have to click the connect button the predictor *surely* already exists. Skill issue if you click it before the page fully loads.
            // There's nothing relevant about .predict, it's that the whole predictor is mostly one big function except for this ONE PART that gets called with state
            // And that saves me from having to fork it or something
            if (window.Koviko) {
                Koviko.predict = function (prediction, state) {
                    if (Object.values(state.stats).every(stat => stat === 0)) {
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
            for (const item of this.client.items.received) {
                this.item(item.name);
            }

            // Send any checks that might have been found during a disconnection
            for (let town = 0; town <= this.goalZone; town++) {
                for (const action of towns[town].totalActionList) {
                    if (action.type == "progress") {
                        let level = towns[town].getLevel(action.varName);
                        for (let i = 0; i <= level; i++) {
                            if (bar_locations.includes(i)) {
                                this.location(`Z${town + 1} - ${action.varName} - ${i}%`);
                            }
                        }
                    }
                    if (action.type == "limited") {
                        let checks = Math.floor(towns[town][`checked${action.varName}`] / limitedRewardRatios[action.varName]);
                        for (let i = 1; i <= checks; i++) {
                            this.location(`Z${town + 1} - ${action.varName} - #${i}`);
                        }
                    }
                }
            }
            for (const skill in skills) {
                let level = getSkillLevel(skill);
                for (let i = 1; i <= level; i++) {
                    if (skill_locations.includes(i)) {
                        this.location(`${skill} - Level ${i}`);
                    }
                }
            }
            for (const buff in buffs) {
                let level = buffs[buff].amt;
                for (let i = 1; i <= level; i++) {
                    if (skill_locations.includes(i)) {
                        this.location(`${buff} - Level ${i}`);
                    }
                }
            }
        }


        visible(action) {
            let defaultVisible = false;
            if (action.type == "limited" && towns[action.townNum][`total${action.varName}`] > 0) {
                defaultVisible = action._visible();
            }
            return defaultVisible || `Z${action.townNum + 1} - ${action.varName}` in this.state || `Z${action.townNum + 1} - ${action.varName} - Search` in this.state;
        }

        unlocked(action) {
            let defaultUnlocked = false;
            if (action.type == "limited" && towns[action.townNum][`total${action.varName}`] > 0) {
                defaultUnlocked = `Z${action.townNum + 1} - ${action.varName} - Search` in this.state
            }
            return defaultUnlocked || `Z${action.townNum + 1} - ${action.varName}` in this.state;
        }

        location(x) {
            const check = this.location_name_to_id?.[x] ?? false;
            if (check) {
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
            if (x in this.state) {
                this.state[x]++;
            } else {
                this.state[x] = 1;
            }

            if (limitedRewardRatios?.[action]) {
                view.updateRegular({ name: action, index: +(zone.substring(1)) - 1 });
            }

            if (zone === "Filler") {
                // Starting mana and gold are handled elswehere
                if (action === "+0.1 Game Speed") {
                    gameSpeed = 1 + (0.1 * this.state[x]);
                }
            }
        }

        async scoutRegular(el, town, varName) {
            const location_name = `Z${town + 1} - ${varName}`;
            if (completedActions.includes(varName)) {
                el.textContent = "No more checks";
                return;
            }
            const location = this.location_name_to_id[location_name];
            let scout
            if (location in this.scouts) {
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
            if (level < 100) {
                let next = 0;
                let i = 0;
                while (next <= level) {
                    next = bar_locations[i];
                    i++;
                }
                const location = this.location_name_to_id[`Z${town + 1} - ${varName} - ${next}%`];
                let scout
                if (location in this.scouts) {
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
            if (!this.state?.[`Z${town + 1} - ${varName} - Search`]) {
                check = `"Z${town + 1} - ${varName} - Search" needs to be found first`;
            } else if (location_name in this.location_name_to_id) {
                const location = this.location_name_to_id[location_name];
                let scout
                if (location in this.scouts) {
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
            while (true) {
                location_name = `${location_name_base}${i + 1}`;
                if (this.client.room.missingLocations.includes(this.location_name_to_id[location_name])) {
                    break;
                }
                if (!(location_name in this.location_name_to_id)) {
                    el.textContent = "No more checks";
                    return;
                }
                i++;
            }
            const location = this.location_name_to_id[location_name];
            let scout
            if (location in this.scouts) {
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
            if (level < 100) {
                let next = 0;
                let i = 0;
                while (next <= level) {
                    next = skill_locations[i];
                    i++;
                }
                const location = this.location_name_to_id[`${skill} - Level ${next}`];
                let scout
                if (location in this.scouts) {
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