
(async function () {
    'use strict';

    const AP = await import("https://IHaveNoFunnyName.github.io/IdleLoopsAP/archipelago.min.js");

    // I don't know how i'm meant to do this but the AP client seems to only take ids, so i'll just paste in location_name_to_ids from the .apworld
    const location_name_to_id = {"Z1 - Wander - 1%": 1, "Z1 - Wander - 5%": 2, "Z1 - Wander - 10%": 3, "Z1 - Wander - 15%": 4, "Z1 - Wander - 20%": 5, "Z1 - Wander - 25%": 6, "Z1 - Wander - 30%": 7, "Z1 - Wander - 40%": 8, "Z1 - Wander - 50%": 9, "Z1 - Wander - 60%": 10, "Z1 - Wander - 70%": 11, "Z1 - Wander - 80%": 12, "Z1 - Wander - 90%": 13, "Z1 - Wander - 95%": 14, "Z1 - Wander - 99%": 15, "Z1 - Wander - 100%": 16, "Z1 - Pots - #1": 17, "Z1 - Pots - #2": 18, "Z1 - Pots - #3": 19, "Z1 - Pots - #4": 20, "Z1 - Pots - #5": 21, "Z1 - Pots - #6": 22, "Z1 - Pots - #7": 23, "Z1 - Pots - #8": 24, "Z1 - Pots - #9": 25, "Z1 - Pots - #10": 26, "Z1 - Pots - #11": 27, "Z1 - Pots - #12": 28, "Z1 - Pots - #13": 29, "Z1 - Pots - #14": 30, "Z1 - Pots - #15": 31, "Z1 - Pots - #16": 32, "Z1 - Pots - #17": 33, "Z1 - Pots - #18": 34, "Z1 - Pots - #19": 35, "Z1 - Pots - #20": 36, "Z1 - Pots - #21": 37, "Z1 - Pots - #22": 38, "Z1 - Pots - #23": 39, "Z1 - Pots - #24": 40, "Z1 - Pots - #25": 41, "Z1 - Pots - #26": 42, "Z1 - Pots - #27": 43, "Z1 - Pots - #28": 44, "Z1 - Pots - #29": 45, "Z1 - Pots - #30": 46, "Z1 - Pots - #31": 47, "Z1 - Pots - #32": 48, "Z1 - Pots - #33": 49, "Z1 - Pots - #34": 50, "Z1 - Pots - #35": 51, "Z1 - Pots - #36": 52, "Z1 - Pots - #37": 53, "Z1 - Pots - #38": 54, "Z1 - Pots - #39": 55, "Z1 - Pots - #40": 56, "Z1 - Pots - #41": 57, "Z1 - Pots - #42": 58, "Z1 - Pots - #43": 59, "Z1 - Pots - #44": 60, "Z1 - Pots - #45": 61, "Z1 - Pots - #46": 62, "Z1 - Pots - #47": 63, "Z1 - Pots - #48": 64, "Z1 - Pots - #49": 65, "Z1 - Pots - #50": 66, "Z1 - Locks - #1": 67, "Z1 - Locks - #2": 68, "Z1 - Locks - #3": 69, "Z1 - Locks - #4": 70, "Z1 - Locks - #5": 71, "Z1 - Locks - #6": 72, "Z1 - Locks - #7": 73, "Z1 - Locks - #8": 74, "Z1 - Locks - #9": 75, "Z1 - Locks - #10": 76, "Z1 - BuyGlasses": 77, "Z1 - BuyMana": 78, "Z1 - Met - 1%": 79, "Z1 - Met - 5%": 80, "Z1 - Met - 10%": 81, "Z1 - Met - 15%": 82, "Z1 - Met - 20%": 83, "Z1 - Met - 25%": 84, "Z1 - Met - 30%": 85, "Z1 - Met - 40%": 86, "Z1 - Met - 50%": 87, "Z1 - Met - 60%": 88, "Z1 - Met - 70%": 89, "Z1 - Met - 80%": 90, "Z1 - Met - 90%": 91, "Z1 - Met - 95%": 92, "Z1 - Met - 99%": 93, "Z1 - Met - 100%": 94, "Z1 - TrainStrength": 95, "Z1 - SQuests - #1": 96, "Z1 - SQuests - #2": 97, "Z1 - SQuests - #3": 98, "Z1 - SQuests - #4": 99, "Z1 - SQuests - #5": 100, "Z1 - SQuests - #6": 101, "Z1 - SQuests - #7": 102, "Z1 - SQuests - #8": 103, "Z1 - SQuests - #9": 104, "Z1 - SQuests - #10": 105, "Z1 - SQuests - #11": 106, "Z1 - SQuests - #12": 107, "Z1 - SQuests - #13": 108, "Z1 - SQuests - #14": 109, "Z1 - SQuests - #15": 110, "Z1 - SQuests - #16": 111, "Z1 - SQuests - #17": 112, "Z1 - SQuests - #18": 113, "Z1 - SQuests - #19": 114, "Z1 - SQuests - #20": 115, "Z1 - Secrets - 1%": 116, "Z1 - Secrets - 5%": 117, "Z1 - Secrets - 10%": 118, "Z1 - Secrets - 15%": 119, "Z1 - Secrets - 20%": 120, "Z1 - Secrets - 25%": 121, "Z1 - Secrets - 30%": 122, "Z1 - Secrets - 40%": 123, "Z1 - Secrets - 50%": 124, "Z1 - Secrets - 60%": 125, "Z1 - Secrets - 70%": 126, "Z1 - Secrets - 80%": 127, "Z1 - Secrets - 90%": 128, "Z1 - Secrets - 95%": 129, "Z1 - Secrets - 99%": 130, "Z1 - Secrets - 100%": 131, "Z1 - LQuests - #1": 132, "Z1 - LQuests - #2": 133, "Z1 - LQuests - #3": 134, "Z1 - LQuests - #4": 135, "Z1 - LQuests - #5": 136, "Z1 - LQuests - #6": 137, "Z1 - LQuests - #7": 138, "Z1 - LQuests - #8": 139, "Z1 - LQuests - #9": 140, "Z1 - LQuests - #10": 141, "Z1 - ThrowParty": 142, "Combat - Level 1": 143, "Combat - Level 10": 179, "Combat - Level 20": 180, "Combat - Level 30": 181, "Combat - Level 40": 182, "Combat - Level 50": 183, "Combat - Level 60": 184, "Combat - Level 70": 185, "Combat - Level 80": 186, "Combat - Level 90": 187, "Combat - Level 100": 188, "Magic - Level 1": 154, "Magic - Level 10": 194, "Magic - Level 20": 195, "Magic - Level 30": 196, "Magic - Level 40": 197, "Magic - Level 50": 198, "Magic - Level 60": 199, "Magic - Level 70": 200, "Magic - Level 80": 201, "Magic - Level 90": 202, "Magic - Level 100": 203, "Z1 - Heal - Completion #1": 165, "Z1 - Heal - Completion #2": 166, "Z1 - Heal - Completion #3": 167, "Z1 - Heal - Completion #4": 168, "Z1 - Heal - Completion #5": 169, "Z1 - Fight - Completion #1": 170, "Z1 - Fight - Completion #2": 171, "Z1 - Fight - Completion #3": 172, "Z1 - SDungeon - Completion #1": 173, "Z1 - SDungeon - Completion #2": 174, "Z1 - SDungeon - Completion #3": 175, "Z1 - BuySupplies": 176, "Z1 - Haggle": 177, "Z1 - StartJourney": 178, "Combat - Level 110": 189, "Combat - Level 120": 190, "Combat - Level 130": 191, "Combat - Level 140": 192, "Combat - Level 150": 193, "Magic - Level 110": 204, "Magic - Level 120": 205, "Magic - Level 130": 206, "Magic - Level 140": 207, "Magic - Level 150": 208, "Z1 - Heal - Completion #6": 209, "Z1 - Heal - Completion #7": 210, "Z1 - Fight - Completion #4": 211, "Z1 - Fight - Completion #5": 212, "Z1 - SDungeon - Completion #4": 213, "Z2 - Forest - 1%": 214, "Z2 - Forest - 5%": 215, "Z2 - Forest - 10%": 216, "Z2 - Forest - 15%": 217, "Z2 - Forest - 20%": 218, "Z2 - Forest - 25%": 219, "Z2 - Forest - 30%": 220, "Z2 - Forest - 40%": 221, "Z2 - Forest - 50%": 222, "Z2 - Forest - 60%": 223, "Z2 - Forest - 70%": 224, "Z2 - Forest - 80%": 225, "Z2 - Forest - 90%": 226, "Z2 - Forest - 95%": 227, "Z2 - Forest - 99%": 228, "Z2 - Forest - 100%": 229, "Z2 - WildMana - #1": 230, "Z2 - WildMana - #2": 231, "Z2 - WildMana - #3": 232, "Z2 - WildMana - #4": 233, "Z2 - WildMana - #5": 234, "Z2 - WildMana - #6": 235, "Z2 - WildMana - #7": 236, "Z2 - WildMana - #8": 237, "Z2 - WildMana - #9": 238, "Z2 - WildMana - #10": 239, "Z2 - WildMana - #11": 240, "Z2 - WildMana - #12": 241, "Z2 - WildMana - #13": 242, "Z2 - WildMana - #14": 243, "Z2 - WildMana - #15": 244, "Z2 - WildMana - #16": 245, "Z2 - WildMana - #17": 246, "Z2 - WildMana - #18": 247, "Z2 - WildMana - #19": 248, "Z2 - WildMana - #20": 249, "Z2 - WildMana - #21": 250, "Z2 - WildMana - #22": 251, "Z2 - WildMana - #23": 252, "Z2 - WildMana - #24": 253, "Z2 - WildMana - #25": 254, "Z2 - WildMana - #26": 255, "Z2 - WildMana - #27": 256, "Z2 - WildMana - #28": 257, "Z2 - WildMana - #29": 258, "Z2 - WildMana - #30": 259, "Z2 - WildMana - #31": 260, "Z2 - WildMana - #32": 261, "Z2 - WildMana - #33": 262, "Z2 - WildMana - #34": 263, "Z2 - WildMana - #35": 264, "Z2 - WildMana - #36": 265, "Z2 - WildMana - #37": 266, "Z2 - WildMana - #38": 267, "Z2 - WildMana - #39": 268, "Z2 - WildMana - #40": 269, "Z2 - WildMana - #41": 270, "Z2 - WildMana - #42": 271, "Z2 - WildMana - #43": 272, "Z2 - WildMana - #44": 273, "Z2 - WildMana - #45": 274, "Z2 - WildMana - #46": 275, "Z2 - WildMana - #47": 276, "Z2 - WildMana - #48": 277, "Z2 - WildMana - #49": 278, "Z2 - WildMana - #50": 279, "Z2 - WildMana - #51": 280, "Z2 - WildMana - #52": 281, "Z2 - WildMana - #53": 282, "Z2 - WildMana - #54": 283, "Z2 - WildMana - #55": 284, "Z2 - WildMana - #56": 285, "Z2 - WildMana - #57": 286, "Z2 - WildMana - #58": 287, "Z2 - WildMana - #59": 288, "Z2 - WildMana - #60": 289, "Z2 - WildMana - #61": 290, "Z2 - WildMana - #62": 291, "Z2 - WildMana - #63": 292, "Z2 - WildMana - #64": 293, "Z2 - WildMana - #65": 294, "Z2 - WildMana - #66": 295, "Z2 - WildMana - #67": 296, "Z2 - WildMana - #68": 297, "Z2 - WildMana - #69": 298, "Z2 - WildMana - #70": 299, "Z2 - WildMana - #71": 300, "Z2 - WildMana - #72": 301, "Z2 - WildMana - #73": 302, "Z2 - WildMana - #74": 303, "Z2 - WildMana - #75": 304, "Z2 - WildMana - #76": 305, "Z2 - WildMana - #77": 306, "Z2 - WildMana - #78": 307, "Z2 - WildMana - #79": 308, "Z2 - WildMana - #80": 309, "Z2 - WildMana - #81": 310, "Z2 - WildMana - #82": 311, "Z2 - WildMana - #83": 312, "Z2 - WildMana - #84": 313, "Z2 - WildMana - #85": 314, "Z2 - WildMana - #86": 315, "Z2 - WildMana - #87": 316, "Z2 - WildMana - #88": 317, "Z2 - WildMana - #89": 318, "Z2 - WildMana - #90": 319, "Z2 - WildMana - #91": 320, "Z2 - WildMana - #92": 321, "Z2 - WildMana - #93": 322, "Z2 - WildMana - #94": 323, "Z2 - WildMana - #95": 324, "Z2 - WildMana - #96": 325, "Z2 - WildMana - #97": 326, "Z2 - WildMana - #98": 327, "Z2 - WildMana - #99": 328, "Z2 - WildMana - #100": 329, "Z2 - Herbs - #1": 330, "Z2 - Herbs - #2": 331, "Z2 - Herbs - #3": 332, "Z2 - Herbs - #4": 333, "Z2 - Herbs - #5": 334, "Z2 - Herbs - #6": 335, "Z2 - Herbs - #7": 336, "Z2 - Herbs - #8": 337, "Z2 - Herbs - #9": 338, "Z2 - Herbs - #10": 339, "Z2 - Herbs - #11": 340, "Z2 - Herbs - #12": 341, "Z2 - Herbs - #13": 342, "Z2 - Herbs - #14": 343, "Z2 - Herbs - #15": 344, "Z2 - Herbs - #16": 345, "Z2 - Herbs - #17": 346, "Z2 - Herbs - #18": 347, "Z2 - Herbs - #19": 348, "Z2 - Herbs - #20": 349, "Z2 - Herbs - #21": 350, "Z2 - Herbs - #22": 351, "Z2 - Herbs - #23": 352, "Z2 - Herbs - #24": 353, "Z2 - Herbs - #25": 354, "Z2 - Herbs - #26": 355, "Z2 - Herbs - #27": 356, "Z2 - Herbs - #28": 357, "Z2 - Herbs - #29": 358, "Z2 - Herbs - #30": 359, "Z2 - Herbs - #31": 360, "Z2 - Herbs - #32": 361, "Z2 - Herbs - #33": 362, "Z2 - Herbs - #34": 363, "Z2 - Herbs - #35": 364, "Z2 - Herbs - #36": 365, "Z2 - Herbs - #37": 366, "Z2 - Herbs - #38": 367, "Z2 - Herbs - #39": 368, "Z2 - Herbs - #40": 369, "Z2 - Herbs - #41": 370, "Z2 - Herbs - #42": 371, "Z2 - Herbs - #43": 372, "Z2 - Herbs - #44": 373, "Z2 - Herbs - #45": 374, "Z2 - Herbs - #46": 375, "Z2 - Herbs - #47": 376, "Z2 - Herbs - #48": 377, "Z2 - Herbs - #49": 378, "Z2 - Herbs - #50": 379, "Z2 - Herbs - #51": 380, "Z2 - Herbs - #52": 381, "Z2 - Herbs - #53": 382, "Z2 - Herbs - #54": 383, "Z2 - Herbs - #55": 384, "Z2 - Herbs - #56": 385, "Z2 - Herbs - #57": 386, "Z2 - Herbs - #58": 387, "Z2 - Herbs - #59": 388, "Z2 - Herbs - #60": 389, "Z2 - Herbs - #61": 390, "Z2 - Herbs - #62": 391, "Z2 - Herbs - #63": 392, "Z2 - Herbs - #64": 393, "Z2 - Herbs - #65": 394, "Z2 - Herbs - #66": 395, "Z2 - Herbs - #67": 396, "Z2 - Herbs - #68": 397, "Z2 - Herbs - #69": 398, "Z2 - Herbs - #70": 399, "Z2 - Herbs - #71": 400, "Z2 - Herbs - #72": 401, "Z2 - Herbs - #73": 402, "Z2 - Herbs - #74": 403, "Z2 - Herbs - #75": 404, "Z2 - Herbs - #76": 405, "Z2 - Herbs - #77": 406, "Z2 - Herbs - #78": 407, "Z2 - Herbs - #79": 408, "Z2 - Herbs - #80": 409, "Z2 - Herbs - #81": 410, "Z2 - Herbs - #82": 411, "Z2 - Herbs - #83": 412, "Z2 - Herbs - #84": 413, "Z2 - Herbs - #85": 414, "Z2 - Herbs - #86": 415, "Z2 - Herbs - #87": 416, "Z2 - Herbs - #88": 417, "Z2 - Herbs - #89": 418, "Z2 - Herbs - #90": 419, "Z2 - Herbs - #91": 420, "Z2 - Herbs - #92": 421, "Z2 - Herbs - #93": 422, "Z2 - Herbs - #94": 423, "Z2 - Herbs - #95": 424, "Z2 - Herbs - #96": 425, "Z2 - Herbs - #97": 426, "Z2 - Herbs - #98": 427, "Z2 - Herbs - #99": 428, "Z2 - Herbs - #100": 429, "Z2 - Herbs - #101": 430, "Z2 - Herbs - #102": 431, "Z2 - Herbs - #103": 432, "Z2 - Herbs - #104": 433, "Z2 - Herbs - #105": 434, "Z2 - Herbs - #106": 435, "Z2 - Herbs - #107": 436, "Z2 - Herbs - #108": 437, "Z2 - Herbs - #109": 438, "Z2 - Herbs - #110": 439, "Z2 - Herbs - #111": 440, "Z2 - Herbs - #112": 441, "Z2 - Herbs - #113": 442, "Z2 - Herbs - #114": 443, "Z2 - Herbs - #115": 444, "Z2 - Herbs - #116": 445, "Z2 - Herbs - #117": 446, "Z2 - Herbs - #118": 447, "Z2 - Herbs - #119": 448, "Z2 - Herbs - #120": 449, "Z2 - Herbs - #121": 450, "Z2 - Herbs - #122": 451, "Z2 - Herbs - #123": 452, "Z2 - Herbs - #124": 453, "Z2 - Herbs - #125": 454, "Z2 - Herbs - #126": 455, "Z2 - Herbs - #127": 456, "Z2 - Herbs - #128": 457, "Z2 - Herbs - #129": 458, "Z2 - Herbs - #130": 459, "Z2 - Herbs - #131": 460, "Z2 - Herbs - #132": 461, "Z2 - Herbs - #133": 462, "Z2 - Herbs - #134": 463, "Z2 - Herbs - #135": 464, "Z2 - Herbs - #136": 465, "Z2 - Herbs - #137": 466, "Z2 - Herbs - #138": 467, "Z2 - Herbs - #139": 468, "Z2 - Herbs - #140": 469, "Z2 - Herbs - #141": 470, "Z2 - Herbs - #142": 471, "Z2 - Herbs - #143": 472, "Z2 - Herbs - #144": 473, "Z2 - Herbs - #145": 474, "Z2 - Herbs - #146": 475, "Z2 - Herbs - #147": 476, "Z2 - Herbs - #148": 477, "Z2 - Herbs - #149": 478, "Z2 - Herbs - #150": 479, "Z2 - Herbs - #151": 480, "Z2 - Herbs - #152": 481, "Z2 - Herbs - #153": 482, "Z2 - Herbs - #154": 483, "Z2 - Herbs - #155": 484, "Z2 - Herbs - #156": 485, "Z2 - Herbs - #157": 486, "Z2 - Herbs - #158": 487, "Z2 - Herbs - #159": 488, "Z2 - Herbs - #160": 489, "Z2 - Herbs - #161": 490, "Z2 - Herbs - #162": 491, "Z2 - Herbs - #163": 492, "Z2 - Herbs - #164": 493, "Z2 - Herbs - #165": 494, "Z2 - Herbs - #166": 495, "Z2 - Herbs - #167": 496, "Z2 - Herbs - #168": 497, "Z2 - Herbs - #169": 498, "Z2 - Herbs - #170": 499, "Z2 - Herbs - #171": 500, "Z2 - Herbs - #172": 501, "Z2 - Herbs - #173": 502, "Z2 - Herbs - #174": 503, "Z2 - Herbs - #175": 504, "Z2 - Herbs - #176": 505, "Z2 - Herbs - #177": 506, "Z2 - Herbs - #178": 507, "Z2 - Herbs - #179": 508, "Z2 - Herbs - #180": 509, "Z2 - Herbs - #181": 510, "Z2 - Herbs - #182": 511, "Z2 - Herbs - #183": 512, "Z2 - Herbs - #184": 513, "Z2 - Herbs - #185": 514, "Z2 - Herbs - #186": 515, "Z2 - Herbs - #187": 516, "Z2 - Herbs - #188": 517, "Z2 - Herbs - #189": 518, "Z2 - Herbs - #190": 519, "Z2 - Herbs - #191": 520, "Z2 - Herbs - #192": 521, "Z2 - Herbs - #193": 522, "Z2 - Herbs - #194": 523, "Z2 - Herbs - #195": 524, "Z2 - Herbs - #196": 525, "Z2 - Herbs - #197": 526, "Z2 - Herbs - #198": 527, "Z2 - Herbs - #199": 528, "Z2 - Herbs - #200": 529, "Z2 - Hunt - #1": 530, "Z2 - Hunt - #2": 531, "Z2 - Hunt - #3": 532, "Z2 - Hunt - #4": 533, "Z2 - Hunt - #5": 534, "Z2 - Hunt - #6": 535, "Z2 - Hunt - #7": 536, "Z2 - Hunt - #8": 537, "Z2 - Hunt - #9": 538, "Z2 - Hunt - #10": 539, "Z2 - Hunt - #11": 540, "Z2 - Hunt - #12": 541, "Z2 - Hunt - #13": 542, "Z2 - Hunt - #14": 543, "Z2 - Hunt - #15": 544, "Z2 - Hunt - #16": 545, "Z2 - Hunt - #17": 546, "Z2 - Hunt - #18": 547, "Z2 - Hunt - #19": 548, "Z2 - Hunt - #20": 549, "Z2 - SitByWaterfall": 550, "Z2 - Shortcut - 1%": 551, "Z2 - Shortcut - 5%": 552, "Z2 - Shortcut - 10%": 553, "Z2 - Shortcut - 15%": 554, "Z2 - Shortcut - 20%": 555, "Z2 - Shortcut - 25%": 556, "Z2 - Shortcut - 30%": 557, "Z2 - Shortcut - 40%": 558, "Z2 - Shortcut - 50%": 559, "Z2 - Shortcut - 60%": 560, "Z2 - Shortcut - 70%": 561, "Z2 - Shortcut - 80%": 562, "Z2 - Shortcut - 90%": 563, "Z2 - Shortcut - 95%": 564, "Z2 - Shortcut - 99%": 565, "Z2 - Shortcut - 100%": 566, "Z2 - Hermit - 1%": 567, "Z2 - Hermit - 5%": 568, "Z2 - Hermit - 10%": 569, "Z2 - Hermit - 15%": 570, "Z2 - Hermit - 20%": 571, "Z2 - Hermit - 25%": 572, "Z2 - Hermit - 30%": 573, "Z2 - Hermit - 40%": 574, "Z2 - Hermit - 50%": 575, "Z2 - Hermit - 60%": 576, "Z2 - Hermit - 70%": 577, "Z2 - Hermit - 80%": 578, "Z2 - Hermit - 90%": 579, "Z2 - Hermit - 95%": 580, "Z2 - Hermit - 99%": 581, "Z2 - Hermit - 100%": 582, "Practical - Level 1": 583, "Practical - Level 10": 584, "Practical - Level 20": 585, "Practical - Level 30": 586, "Practical - Level 40": 587, "Practical - Level 50": 588, "Practical - Level 60": 589, "Practical - Level 70": 590, "Practical - Level 80": 591, "Practical - Level 90": 592, "Practical - Level 100": 593, "Alchemy - Level 1": 594, "Alchemy - Level 10": 595, "Alchemy - Level 20": 596, "Z2 - BrewPotions": 597, "Z2 - TrainDexterity": 598, "Z2 - TrainSpeed": 599, "Z2 - Flowers - 1%": 600, "Z2 - Flowers - 5%": 601, "Z2 - Flowers - 10%": 602, "Z2 - Flowers - 15%": 603, "Z2 - Flowers - 20%": 604, "Z2 - Flowers - 25%": 605, "Z2 - Flowers - 30%": 606, "Z2 - Flowers - 40%": 607, "Z2 - Flowers - 50%": 608, "Z2 - Flowers - 60%": 609, "Z2 - Flowers - 70%": 610, "Z2 - Flowers - 80%": 611, "Z2 - Flowers - 90%": 612, "Z2 - Flowers - 95%": 613, "Z2 - Flowers - 99%": 614, "Z2 - Flowers - 100%": 615, "Z2 - BirdWatching": 616, "Z2 - Thicket - 1%": 617, "Z2 - Thicket - 5%": 618, "Z2 - Thicket - 10%": 619, "Z2 - Thicket - 15%": 620, "Z2 - Thicket - 20%": 621, "Z2 - Thicket - 25%": 622, "Z2 - Thicket - 30%": 623, "Z2 - Thicket - 40%": 624, "Z2 - Thicket - 50%": 625, "Z2 - Thicket - 60%": 626, "Z2 - Thicket - 70%": 627, "Z2 - Thicket - 80%": 628, "Z2 - Thicket - 90%": 629, "Z2 - Thicket - 95%": 630, "Z2 - Thicket - 99%": 631, "Z2 - Thicket - 100%": 632, "Z2 - Witch - 1%": 633, "Z2 - Witch - 5%": 634, "Z2 - Witch - 10%": 635, "Z2 - Witch - 15%": 636, "Z2 - Witch - 20%": 637, "Z2 - Witch - 25%": 638, "Z2 - Witch - 30%": 639, "Z2 - Witch - 40%": 640, "Z2 - Witch - 50%": 641, "Z2 - Witch - 60%": 642, "Z2 - Witch - 70%": 643, "Z2 - Witch - 80%": 644, "Z2 - Witch - 90%": 645, "Z2 - Witch - 95%": 646, "Z2 - Witch - 99%": 647, "Z2 - Witch - 100%": 648, "Dark - Level 1": 649, "Dark - Level 10": 650, "Dark - Level 20": 651, "Dark - Level 30": 652, "Dark - Level 40": 653, "Dark - Level 50": 654, "Dark - Level 60": 655, "Dark - Level 70": 656, "Dark - Level 80": 657, "Dark - Level 90": 658, "Dark - Level 100": 659, "Ritual - Level 1": 660, "Z2 - ContinueOn": 661, "Z1 - Heal - Completion #8": 662, "Z1 - Heal - Completion #9": 663, "Combat - Level 160": 664, "Combat - Level 170": 665, "Combat - Level 180": 666, "Combat - Level 190": 667, "Combat - Level 200": 668, "Magic - Level 160": 669, "Magic - Level 170": 670, "Magic - Level 180": 671, "Magic - Level 190": 672, "Magic - Level 200": 673, "Z1 - Fight - Completion #6": 674, "Z1 - Fight - Completion #7": 675, "Z1 - SDungeon - Completion #5": 676, "Z1 - SDungeon - Completion #6": 677, "Practical - Level 110": 678, "Practical - Level 120": 679, "Practical - Level 130": 680, "Practical - Level 140": 681, "Practical - Level 150": 682, "Practical - Level 160": 683, "Practical - Level 170": 684, "Practical - Level 180": 685, "Practical - Level 190": 686, "Practical - Level 200": 687, "Alchemy - Level 30": 688, "Alchemy - Level 40": 689, "Alchemy - Level 50": 690, "Dark - Level 110": 691, "Dark - Level 120": 692, "Dark - Level 130": 693, "Dark - Level 140": 694, "Dark - Level 150": 695, "Dark - Level 160": 696, "Dark - Level 170": 697, "Dark - Level 180": 698, "Dark - Level 190": 699, "Dark - Level 200": 700, "Z3 - City - 1%": 701, "Z3 - City - 5%": 702, "Z3 - City - 10%": 703, "Z3 - City - 15%": 704, "Z3 - City - 20%": 705, "Z3 - City - 25%": 706, "Z3 - City - 30%": 707, "Z3 - City - 40%": 708, "Z3 - City - 50%": 709, "Z3 - City - 60%": 710, "Z3 - City - 70%": 711, "Z3 - City - 80%": 712, "Z3 - City - 90%": 713, "Z3 - City - 95%": 714, "Z3 - City - 99%": 715, "Z3 - City - 100%": 716, "Z3 - Gamble - #1": 717, "Z3 - Gamble - #2": 718, "Z3 - Gamble - #3": 719, "Z3 - Gamble - #4": 720, "Z3 - Gamble - #5": 721, "Z3 - Gamble - #6": 722, "Z3 - Gamble - #7": 723, "Z3 - Gamble - #8": 724, "Z3 - Gamble - #9": 725, "Z3 - Gamble - #10": 726, "Z3 - Gamble - #11": 727, "Z3 - Gamble - #12": 728, "Z3 - Gamble - #13": 729, "Z3 - Gamble - #14": 730, "Z3 - Gamble - #15": 731, "Z3 - Gamble - #16": 732, "Z3 - Gamble - #17": 733, "Z3 - Gamble - #18": 734, "Z3 - Gamble - #19": 735, "Z3 - Gamble - #20": 736, "Z3 - Drunk - 1%": 737, "Z3 - Drunk - 5%": 738, "Z3 - Drunk - 10%": 739, "Z3 - Drunk - 15%": 740, "Z3 - Drunk - 20%": 741, "Z3 - Drunk - 25%": 742, "Z3 - Drunk - 30%": 743, "Z3 - Drunk - 40%": 744, "Z3 - Drunk - 50%": 745, "Z3 - Drunk - 60%": 746, "Z3 - Drunk - 70%": 747, "Z3 - Drunk - 80%": 748, "Z3 - Drunk - 90%": 749, "Z3 - Drunk - 95%": 750, "Z3 - Drunk - 99%": 751, "Z3 - Drunk - 100%": 752, "Z3 - BuyMana": 753, "Z3 - SellPotions": 754, "Z3 - GatherTeam": 755, "Z3 - LDungeon - Completion #1": 756, "Z3 - LDungeon - Completion #2": 757, "Z3 - Apprentice - 1%": 758, "Z3 - Apprentice - 5%": 759, "Z3 - Apprentice - 10%": 760, "Z3 - Apprentice - 15%": 761, "Z3 - Apprentice - 20%": 762, "Z3 - Apprentice - 25%": 763, "Z3 - Apprentice - 30%": 764, "Z3 - Apprentice - 40%": 765, "Z3 - Apprentice - 50%": 766, "Z3 - Apprentice - 60%": 767, "Z3 - Apprentice - 70%": 768, "Z3 - Apprentice - 80%": 769, "Z3 - Apprentice - 90%": 770, "Z3 - Apprentice - 95%": 771, "Z3 - Apprentice - 99%": 772, "Z3 - Apprentice - 100%": 773, "Z3 - Mason - 1%": 774, "Z3 - Mason - 5%": 775, "Z3 - Mason - 10%": 776, "Z3 - Mason - 15%": 777, "Z3 - Mason - 20%": 778, "Z3 - Mason - 25%": 779, "Z3 - Mason - 30%": 780, "Z3 - Mason - 40%": 781, "Z3 - Mason - 50%": 782, "Z3 - Mason - 60%": 783, "Z3 - Mason - 70%": 784, "Z3 - Mason - 80%": 785, "Z3 - Mason - 90%": 786, "Z3 - Mason - 95%": 787, "Z3 - Mason - 99%": 788, "Z3 - Mason - 100%": 789, "Z3 - Architect - 1%": 790, "Z3 - Architect - 5%": 791, "Z3 - Architect - 10%": 792, "Z3 - Architect - 15%": 793, "Z3 - Architect - 20%": 794, "Z3 - Architect - 25%": 795, "Z3 - Architect - 30%": 796, "Z3 - Architect - 40%": 797, "Z3 - Architect - 50%": 798, "Z3 - Architect - 60%": 799, "Z3 - Architect - 70%": 800, "Z3 - Architect - 80%": 801, "Z3 - Architect - 90%": 802, "Z3 - Architect - 95%": 803, "Z3 - Architect - 99%": 804, "Z3 - Architect - 100%": 805, "Z3 - ReadBooks": 806, "Z3 - BuyPickaxe": 807, "Z3 - StartTrek": 808, "Combat - Level 210": 809, "Combat - Level 220": 810, "Combat - Level 230": 811, "Combat - Level 240": 812, "Combat - Level 250": 813, "Combat - Level 260": 814, "Combat - Level 270": 815, "Combat - Level 280": 816, "Combat - Level 290": 817, "Combat - Level 300": 818, "Magic - Level 210": 819, "Magic - Level 220": 820, "Magic - Level 230": 821, "Magic - Level 240": 822, "Magic - Level 250": 823, "Magic - Level 260": 824, "Magic - Level 270": 825, "Magic - Level 280": 826, "Magic - Level 290": 827, "Magic - Level 300": 828, "Z1 - Heal - Completion #10": 829, "Z1 - Fight - Completion #8": 830, "Z1 - Fight - Completion #9": 831, "Z1 - Fight - Completion #10": 832, "Practical - Level 210": 833, "Practical - Level 220": 834, "Practical - Level 230": 835, "Practical - Level 240": 836, "Practical - Level 250": 837, "Practical - Level 260": 838, "Practical - Level 270": 839, "Practical - Level 280": 840, "Practical - Level 290": 841, "Practical - Level 300": 842, "Alchemy - Level 60": 843, "Alchemy - Level 70": 844, "Alchemy - Level 80": 845, "Alchemy - Level 90": 846, "Alchemy - Level 100": 847, "Dark - Level 210": 848, "Dark - Level 220": 849, "Dark - Level 230": 850, "Dark - Level 240": 851, "Dark - Level 250": 852, "Dark - Level 260": 853, "Dark - Level 270": 854, "Dark - Level 280": 855, "Dark - Level 290": 856, "Dark - Level 300": 857, "Z3 - LDungeon - Completion #3": 858, "Z3 - LDungeon - Completion #4": 859, "Z3 - LDungeon - Completion #5": 860, "Z3 - LDungeon - Completion #6": 861, "Z3 - LDungeon - Completion #7": 862, "Z3 - LDungeon - Completion #8": 863, "Z3 - LDungeon - Completion #9": 864, "Z4 - Mountain - 1%": 865, "Z4 - Mountain - 5%": 866, "Z4 - Mountain - 10%": 867, "Z4 - Mountain - 15%": 868, "Z4 - Mountain - 20%": 869, "Z4 - Mountain - 25%": 870, "Z4 - Mountain - 30%": 871, "Z4 - Mountain - 40%": 872, "Z4 - Mountain - 50%": 873, "Z4 - Mountain - 60%": 874, "Z4 - Mountain - 70%": 875, "Z4 - Mountain - 80%": 876, "Z4 - Mountain - 90%": 877, "Z4 - Mountain - 95%": 878, "Z4 - Mountain - 99%": 879, "Z4 - Mountain - 100%": 880, "Z4 - Geysers - #1": 881, "Z4 - Geysers - #2": 882, "Z4 - Geysers - #3": 883, "Z4 - Geysers - #4": 884, "Z4 - Geysers - #5": 885, "Z4 - Geysers - #6": 886, "Z4 - Geysers - #7": 887, "Z4 - Geysers - #8": 888, "Z4 - Geysers - #9": 889, "Z4 - Geysers - #10": 890, "Z4 - Runes - 1%": 891, "Z4 - Runes - 5%": 892, "Z4 - Runes - 10%": 893, "Z4 - Runes - 15%": 894, "Z4 - Runes - 20%": 895, "Z4 - Runes - 25%": 896, "Z4 - Runes - 30%": 897, "Z4 - Runes - 40%": 898, "Z4 - Runes - 50%": 899, "Z4 - Runes - 60%": 900, "Z4 - Runes - 70%": 901, "Z4 - Runes - 80%": 902, "Z4 - Runes - 90%": 903, "Z4 - Runes - 95%": 904, "Z4 - Runes - 99%": 905, "Z4 - Runes - 100%": 906, "Chronomancy - Level 1": 907, "Chronomancy - Level 10": 908, "Chronomancy - Level 20": 909, "Chronomancy - Level 30": 910, "Chronomancy - Level 40": 911, "Chronomancy - Level 50": 912, "Chronomancy - Level 60": 913, "Chronomancy - Level 70": 914, "Chronomancy - Level 80": 915, "Chronomancy - Level 90": 916, "Chronomancy - Level 100": 917, "Pyromancy - Level 1": 918, "Pyromancy - Level 10": 919, "Pyromancy - Level 20": 920, "Pyromancy - Level 30": 921, "Pyromancy - Level 40": 922, "Pyromancy - Level 50": 923, "Pyromancy - Level 60": 924, "Pyromancy - Level 70": 925, "Pyromancy - Level 80": 926, "Pyromancy - Level 90": 927, "Pyromancy - Level 100": 928, "Z4 - Cavern - 1%": 929, "Z4 - Cavern - 5%": 930, "Z4 - Cavern - 10%": 931, "Z4 - Cavern - 15%": 932, "Z4 - Cavern - 20%": 933, "Z4 - Cavern - 25%": 934, "Z4 - Cavern - 30%": 935, "Z4 - Cavern - 40%": 936, "Z4 - Cavern - 50%": 937, "Z4 - Cavern - 60%": 938, "Z4 - Cavern - 70%": 939, "Z4 - Cavern - 80%": 940, "Z4 - Cavern - 90%": 941, "Z4 - Cavern - 95%": 942, "Z4 - Cavern - 99%": 943, "Z4 - Cavern - 100%": 944, "Z4 - MineSoulstones - #1": 945, "Z4 - MineSoulstones - #2": 946, "Z4 - MineSoulstones - #3": 947, "Z4 - MineSoulstones - #4": 948, "Z4 - MineSoulstones - #5": 949, "Z4 - MineSoulstones - #6": 950, "Z4 - MineSoulstones - #7": 951, "Z4 - MineSoulstones - #8": 952, "Z4 - MineSoulstones - #9": 953, "Z4 - MineSoulstones - #10": 954, "Z4 - MineSoulstones - #11": 955, "Z4 - MineSoulstones - #12": 956, "Z4 - MineSoulstones - #13": 957, "Z4 - MineSoulstones - #14": 958, "Z4 - MineSoulstones - #15": 959, "Z4 - MineSoulstones - #16": 960, "Z4 - MineSoulstones - #17": 961, "Z4 - MineSoulstones - #18": 962, "Z4 - MineSoulstones - #19": 963, "Z4 - MineSoulstones - #20": 964, "Z4 - MineSoulstones - #21": 965, "Z4 - MineSoulstones - #22": 966, "Z4 - MineSoulstones - #23": 967, "Z4 - MineSoulstones - #24": 968, "Z4 - MineSoulstones - #25": 969, "Z4 - MineSoulstones - #26": 970, "Z4 - MineSoulstones - #27": 971, "Z4 - MineSoulstones - #28": 972, "Z4 - MineSoulstones - #29": 973, "Z4 - MineSoulstones - #30": 974, "Z4 - HuntTrolls - Completion #1": 975, "Z4 - HuntTrolls - Completion #2": 976, "Z4 - HuntTrolls - Completion #3": 977, "Z4 - HuntTrolls - Completion #4": 978, "Z4 - HuntTrolls - Completion #5": 979, "Z4 - Illusions - 1%": 980, "Z4 - Illusions - 5%": 981, "Z4 - Illusions - 10%": 982, "Z4 - Illusions - 15%": 983, "Z4 - Illusions - 20%": 984, "Z4 - Illusions - 25%": 985, "Z4 - Illusions - 30%": 986, "Z4 - Illusions - 40%": 987, "Z4 - Illusions - 50%": 988, "Z4 - Illusions - 60%": 989, "Z4 - Illusions - 70%": 990, "Z4 - Illusions - 80%": 991, "Z4 - Illusions - 90%": 992, "Z4 - Illusions - 95%": 993, "Z4 - Illusions - 99%": 994, "Z4 - Illusions - 100%": 995, "Z4 - Artifacts - #1": 996, "Z4 - Artifacts - #2": 997, "Z4 - Artifacts - #3": 998, "Z4 - Artifacts - #4": 999, "Z4 - Artifacts - #5": 1000, "Z4 - Artifacts - #6": 1001, "Z4 - Artifacts - #7": 1002, "Z4 - Artifacts - #8": 1003, "Z4 - Artifacts - #9": 1004, "Z4 - Artifacts - #10": 1005, "Z4 - Artifacts - #11": 1006, "Z4 - Artifacts - #12": 1007, "Z4 - Artifacts - #13": 1008, "Z4 - Artifacts - #14": 1009, "Z4 - Artifacts - #15": 1010, "Z4 - Artifacts - #16": 1011, "Z4 - Artifacts - #17": 1012, "Z4 - Artifacts - #18": 1013, "Z4 - Artifacts - #19": 1014, "Z4 - Artifacts - #20": 1015, "Imbuement - Level 1": 1016, "Z4 - FaceJudgement": 1017}
    const name_map = {"Wander": "Wander", "Mana Pot": "Pots", "Lock": "Locks", "Buy Glasses": "BuyGlasses", "Buy Mana": "BuyMana", "Meet People": "Met", "Train Strength": "TrainStrength", "Short Quest": "SQuests", "Investigate": "Secrets", "Long Quest": "LQuests", "Throw Party": "ThrowParty", "Warrior Lessons": "WarriorLessons", "Mage Lessons": "MageLessons", "Heal The Sick": "Heal", "Fight Monsters": "Fight", "Small Dungeon": "SDungeon", "Buy Supplies": "BuySupplies", "Haggle": "Haggle", "Start Journey": "StartJourney", "Explore Forest": "Forest", "Wild Mana": "WildMana", "Herb": "Herbs", "Hunt": "Hunt", "Sit By Waterfall": "SitByWaterfall", "Old Shortcut": "Shortcut", "Talk To Hermit": "Hermit", "Practical Magic": "Practical", "Learn Alchemy": "LearnAlchemy", "Brew Potions": "BrewPotions", "Train Dexterity": "TrainDexterity", "Train Speed": "TrainSpeed", "Follow Flowers": "Flowers", "Bird Watching": "BirdWatching", "Clear Thicket": "Thicket", "Talk To Witch": "Witch", "Dark Magic": "Dark", "Dark Ritual": "Ritual", "Continue On": "ContinueOn", "Explore City": "City", "Gamble": "Gamble", "Get Drunk": "Drunk", "Sell Potions": "SellPotions", "Adventure Guild": "AdvGuild", "Gather Team": "GatherTeam", "Large Dungeon": "LDungeon", "Crafting Guild": "CraftGuild", "Apprentice": "Apprentice", "Mason": "Mason", "Architect": "Architect", "Read Books": "ReadBooks", "Buy Pickaxe": "BuyPickaxe", "Start Trek": "StartTrek", "Climb Mountain": "Mountain", "Mana Geyser": "Geysers", "Decipher Runes": "Runes", "Chronomancy": "Chronomancy", "Pyromancy": "Pyromancy", "Explore Cavern": "Cavern", "Soulstone": "MineSoulstones", "Hunt Trolls": "HuntTrolls", "Check Walls": "Illusions", "Artifact": "Artifacts", "Face Judgement": "FaceJudgement", "Combat": "Combat", "Magic": "Magic", "Alchemy": "Alchemy", "Imbue Mind": "Imbuement"}

    const bar_locations = [1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
    const skill_locations = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300];
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
        "AdvGuild": 3,
        "LDungeon": 7,
        "CraftGuild": 3,
        "HuntTrolls": 5,
    }

    const skill_actions = ["WarriorLessons", "MageLessons", "PracticalMagic", "LearnAlchemy", "DarkMagic"];

    class IdleLoopsAP_class {
        client = false;
        // 0 indexed cos that's what the game does
        goalZone = 0;
        offlineTime = 0;
        state = {};
        scouts = {};
        location_name_to_id = location_name_to_id;
        newUI = false;

        /**
         * Called on script load, to inject the AP connect form
         */
        load() {
            // Some light CSS. We have two UIs to handle, the original and a responsive one, determined with html.responsive
            // Most of the changes were coincidentally the same ones the responsive UI made, for me it was to make space for
            // the connect form, but it also just looks better, so we don't have to do them on html.responsive 

            // i miss SCSS pensive
            const css = document.createElement("style");
            css.textContent = `
            html:not(.responsive) #menu {
                display: inline-flex;
                width: 1px;
                }
            #APconnect {
                display: inline-flex;
                position: fixed;
                top: 15px;
                right: 0;
                width: 500px;
                align-items: center;
            }
            #actionLogTitle {
                cursor: pointer;
            }
            #actionLogContainer #apSeparator {
                color: black;
            }
            #actionLogContainer:not(.ap) #actionLogTitle {
                color: black;
            }
            #actionLogContainer:not(.ap) #apTitle {
                color: gray;
            }
            #actionLogContainer:not(.ap) #actionLog {
                display: block;
            }
            #actionLogContainer:not(.ap) #apLog {
                display: none !important;
            }
            #actionLogContainer.ap #actionLogTitle {
                color: gray;
            }
            #actionLogContainer.ap #apTitle {
                color: black;
            }
            #actionLogContainer.ap #actionLog {
                display: none;
            }
            #actionLogContainer.ap #apLog {
                display: block;
            }
            `
            document.head.appendChild(css);

            const connect = document.createElement("form");
            connect.id = "APconnect";

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
            saveName = "APSave" + slotName + this.client.room.seedName;
            let first_load = false;
            if(!(window.localStorage[saveName] && window.localStorage[saveName] !== "null")) {
                first_load = true;
            }
            load();
            if(!stop) pauseGame();
            if(first_load) {
                totalOfflineMs = this.offlineTime;
            }
            this.post_load();
        }

        /**
         * Sets up the game for Archipelago, overwriting functions and injecting HTML, anything that isn't wiped by the game loading.
         * I don't know why i split it like this when i'm not planning on handling dis/reconnecting yet. There is no un-setup. Refresh.
         * Called after a successful connection but before data from the connection is processed.
         */
        async setup() {
            const actionlogTitle = document.querySelector("#actionLogTitle");
            this.newUI = actionlogTitle !== null;
            
            const logElement = document.createElement("ul");
            logElement.id = "apLog";
            logElement.style.overflowY = "scroll";

            if (this.newUI) {
                const actionLogContainer = document.getElementById("actionLogContainer");
                const logTitle = document.createElement("span");
                logTitle.innerHTML = " <span id=\"apSeparator\">|</span> <span id=\"apTitle\">AP Log</span>";
                actionLogTitle.appendChild(logTitle);
                actionLogTitle.addEventListener("click", () => {
                    actionLogContainer.classList.toggle("ap");
                });
                actionLogContainer.appendChild(logElement);
            } else {
                const container = document.createElement("div");
                container.style.width = "535px";
                container.style.maxHeight = "591px";
                container.style.overflow = "auto";
                container.innerHTML = "<div class=\"large bold\" style=\"width:100%;text-align:center;\">AP Log</div>";
                container.appendChild(logElement);
                const townColumn = document.getElementById("townColumn");
                townColumn.parentNode.insertBefore(container, townColumn.nextSibling);
            }

            this.client.messages.on("message", (content) => {
                const message = document.createElement("li");
                message.textContent = content;
                logElement.insertBefore(message, logElement.firstChild);
            });

            this.client.items.on("itemsReceived", (items, index) => {
                for (const item of items) {
                    this.item(item.name);
                }
            });

            const data = await this.client.players.self.fetchSlotData();
            this.goalZone = data.goal;
            this.offlineTime = data.bonus;
        }
        post_load() {

            // If the Predictor is installed, hook into it to handle starting filler
            // Because you have to click the connect button the predictor *surely* already exists. Skill issue if you click it before the page fully loads.
            // There's nothing relevant about .predict, it's that the whole predictor is mostly one big function except for this ONE PART that gets called with state
            // And that saves me from having to fork it or something

            // This bit is at the start of post_load so for the new UI we disable the web worker before all our hooking causes it to freak out.
            if (Koviko) {
                const predict = function (prediction, state) {
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
                if (Koviko.predictor) {
                    Koviko.predictor.predict = predict;
                    console.log("AP: Forcing local predictor, ignore next error")
                    Koviko.predictor.handleWorkerMessage({data: {type: "error"}}) 
                } else {
                    Koviko.predict = predict;
                }
            }

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
                        let name = action.varName.startsWith("BuyMana") ? `BuyMana` : action.varName;
                        action._finish = action.finish;
                        action.finish = function () {
                            window.IdleLoopsAP.location(`Z${town + 1} - ${name}`);
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
                        el.addEventListener("mouseover", () => { window.IdleLoopsAP.scoutRegular(scoutcontainer, town, name) });
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

                
                // We need to add a line half way through this function, annoying that means copying a whole function
                const finishRegular = function (varName, rewardRatio, rewardFunc) {
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
                            const logElement = document.getElementById("apLog");
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

                towns[town] = new Proxy(towns[town], {
                    get: (target, prop, receiver) => {
                        // Item: Number of Limited Actions
                        // Overwrite whatever the game thinks it has with the number of checks of this type recieved
                        if (typeof prop === "string" && prop.startsWith("good")) {
                            const name = prop.substring(4);
                            if (!name.startsWith("Temp")) {
                                return this.state?.[`Z${town + 1} - ${name}`] || 0;
                            }
                        } else if (typeof prop === "string" && prop === "finishRegular") {
                            return finishRegular.bind(receiver);
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
                        if (value > 0 && typeof prop === "string" && prop.startsWith("good")) {
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
                        if (typeof prop === "string" && prop.startsWith("exp")) {
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
                        if (value > 0 && typeof prop === "string" && prop.endsWith("LoopCounter")) {
                            const name = prop.substring(0, prop.length - 11);
                            // Silly way to not send checks for buffs, just don't put them in segments
                            if (name in segments) {
                                this.location(`Z${town + 1} - ${name} - Completion #${value / segments[name]}`);
                            }
                        }

                        return Reflect.set(target, prop, value, receiver);
                    }
                });
            }

            for (const skill in skills) {
                if (this.newUI) {
                    skills[skill].levelExp.addExp = function(exp) {
                        const prevLevel = getSkillLevel(skill);
                        const success = LevelExp.prototype.addExp.call(this, exp);
                        const newLevel = getSkillLevel(skill);
                        for (let i = prevLevel + 1; i <= newLevel; i++) {
                            if (skill_locations.includes(i)) {
                                window.IdleLoopsAP.location(`${skill} - Level ${i}`);
                            }
                        }
                    }
                } else {
                    skills[skill] = new Proxy(skills[skill], {
                        set: (target, prop, value, receiver) => {
                            if (prop !== "exp") {
                                return Reflect.set(target, prop, value, receiver);
                            }
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
                }

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
                    this.location(`${buff} - Level ${i}`);
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
            let [zone, action, ...rest] = x.split(" - ");
            if (zone.startsWith("Z")) {
                action = name_map[action] ?? action;
                if (action === "BuyMana") {
                    action = "BuyManaZ" + zone.substring(1);
                }
                x = [zone, action, ...rest].join(" - ");
            }
            if (x in this.state) {
                this.state[x]++;
            } else {
                this.state[x] = 1;
            }

            if (limitedRewardRatios?.[action]) {
                view.updateRegular({ name: action, index: +(zone.substring(1)) - 1 });
            }

            if (zone === "Filler") {
                // Starting mana and gold are handled elsewhere
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
            if (level < skill_locations[skill_locations.length - 1]) {
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