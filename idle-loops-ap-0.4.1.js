
(async function () {
    'use strict';

    const AP = await import("./archipelago.min.js");

    // I don't know how i'm meant to do this but the AP client seems to only take ids, so i'll just paste in location_name_to_ids from the .apworld
    const location_name_to_id = { "Z1 - Wander - 1%": 1, "Z1 - Wander - 5%": 2, "Z1 - Wander - 10%": 3, "Z1 - Wander - 15%": 4, "Z1 - Wander - 20%": 5, "Z1 - Wander - 25%": 6, "Z1 - Wander - 30%": 7, "Z1 - Wander - 40%": 8, "Z1 - Wander - 50%": 9, "Z1 - Wander - 60%": 10, "Z1 - Wander - 70%": 11, "Z1 - Wander - 80%": 12, "Z1 - Wander - 90%": 13, "Z1 - Wander - 95%": 14, "Z1 - Wander - 99%": 15, "Z1 - Wander - 100%": 16, "Z1 - Pots - #1": 17, "Z1 - Pots - #2": 18, "Z1 - Pots - #3": 19, "Z1 - Pots - #4": 20, "Z1 - Pots - #5": 21, "Z1 - Pots - #6": 22, "Z1 - Pots - #7": 23, "Z1 - Pots - #8": 24, "Z1 - Pots - #9": 25, "Z1 - Pots - #10": 26, "Z1 - Pots - #11": 27, "Z1 - Pots - #12": 28, "Z1 - Pots - #13": 29, "Z1 - Pots - #14": 30, "Z1 - Pots - #15": 31, "Z1 - Pots - #16": 32, "Z1 - Pots - #17": 33, "Z1 - Pots - #18": 34, "Z1 - Pots - #19": 35, "Z1 - Pots - #20": 36, "Z1 - Pots - #21": 37, "Z1 - Pots - #22": 38, "Z1 - Pots - #23": 39, "Z1 - Pots - #24": 40, "Z1 - Pots - #25": 41, "Z1 - Pots - #26": 42, "Z1 - Pots - #27": 43, "Z1 - Pots - #28": 44, "Z1 - Pots - #29": 45, "Z1 - Pots - #30": 46, "Z1 - Pots - #31": 47, "Z1 - Pots - #32": 48, "Z1 - Pots - #33": 49, "Z1 - Pots - #34": 50, "Z1 - Pots - #35": 51, "Z1 - Pots - #36": 52, "Z1 - Pots - #37": 53, "Z1 - Pots - #38": 54, "Z1 - Pots - #39": 55, "Z1 - Pots - #40": 56, "Z1 - Pots - #41": 57, "Z1 - Pots - #42": 58, "Z1 - Pots - #43": 59, "Z1 - Pots - #44": 60, "Z1 - Pots - #45": 61, "Z1 - Pots - #46": 62, "Z1 - Pots - #47": 63, "Z1 - Pots - #48": 64, "Z1 - Pots - #49": 65, "Z1 - Pots - #50": 66, "Z1 - Locks - #1": 67, "Z1 - Locks - #2": 68, "Z1 - Locks - #3": 69, "Z1 - Locks - #4": 70, "Z1 - Locks - #5": 71, "Z1 - Locks - #6": 72, "Z1 - Locks - #7": 73, "Z1 - Locks - #8": 74, "Z1 - Locks - #9": 75, "Z1 - Locks - #10": 76, "Z1 - BuyGlasses": 77, "Z1 - BuyMana": 78, "Z1 - Met - 1%": 79, "Z1 - Met - 5%": 80, "Z1 - Met - 10%": 81, "Z1 - Met - 15%": 82, "Z1 - Met - 20%": 83, "Z1 - Met - 25%": 84, "Z1 - Met - 30%": 85, "Z1 - Met - 40%": 86, "Z1 - Met - 50%": 87, "Z1 - Met - 60%": 88, "Z1 - Met - 70%": 89, "Z1 - Met - 80%": 90, "Z1 - Met - 90%": 91, "Z1 - Met - 95%": 92, "Z1 - Met - 99%": 93, "Z1 - Met - 100%": 94, "Z1 - TrainStrength": 95, "Z1 - SQuests - #1": 96, "Z1 - SQuests - #2": 97, "Z1 - SQuests - #3": 98, "Z1 - SQuests - #4": 99, "Z1 - SQuests - #5": 100, "Z1 - SQuests - #6": 101, "Z1 - SQuests - #7": 102, "Z1 - SQuests - #8": 103, "Z1 - SQuests - #9": 104, "Z1 - SQuests - #10": 105, "Z1 - SQuests - #11": 106, "Z1 - SQuests - #12": 107, "Z1 - SQuests - #13": 108, "Z1 - SQuests - #14": 109, "Z1 - SQuests - #15": 110, "Z1 - SQuests - #16": 111, "Z1 - SQuests - #17": 112, "Z1 - SQuests - #18": 113, "Z1 - SQuests - #19": 114, "Z1 - SQuests - #20": 115, "Z1 - Secrets - 1%": 116, "Z1 - Secrets - 5%": 117, "Z1 - Secrets - 10%": 118, "Z1 - Secrets - 15%": 119, "Z1 - Secrets - 20%": 120, "Z1 - Secrets - 25%": 121, "Z1 - Secrets - 30%": 122, "Z1 - Secrets - 40%": 123, "Z1 - Secrets - 50%": 124, "Z1 - Secrets - 60%": 125, "Z1 - Secrets - 70%": 126, "Z1 - Secrets - 80%": 127, "Z1 - Secrets - 90%": 128, "Z1 - Secrets - 95%": 129, "Z1 - Secrets - 99%": 130, "Z1 - Secrets - 100%": 131, "Z1 - LQuests - #1": 132, "Z1 - LQuests - #2": 133, "Z1 - LQuests - #3": 134, "Z1 - LQuests - #4": 135, "Z1 - LQuests - #5": 136, "Z1 - LQuests - #6": 137, "Z1 - LQuests - #7": 138, "Z1 - LQuests - #8": 139, "Z1 - LQuests - #9": 140, "Z1 - LQuests - #10": 141, "Z1 - ThrowParty": 142, "Combat - Level 1": 143, "Combat - Level 10": 144, "Combat - Level 20": 145, "Combat - Level 30": 146, "Combat - Level 40": 147, "Combat - Level 50": 148, "Combat - Level 60": 149, "Combat - Level 70": 150, "Combat - Level 80": 151, "Combat - Level 90": 152, "Combat - Level 100": 153, "Magic - Level 1": 154, "Magic - Level 10": 155, "Magic - Level 20": 156, "Magic - Level 30": 157, "Magic - Level 40": 158, "Magic - Level 50": 159, "Magic - Level 60": 160, "Magic - Level 70": 161, "Magic - Level 80": 162, "Magic - Level 90": 163, "Magic - Level 100": 164, "Z1 - Heal - Completion #1": 165, "Z1 - Heal - Completion #2": 166, "Z1 - Heal - Completion #3": 167, "Z1 - Heal - Completion #4": 168, "Z1 - Heal - Completion #5": 169, "Z1 - Fight - Completion #1": 170, "Z1 - Fight - Completion #2": 171, "Z1 - Fight - Completion #3": 172, "Z1 - SDungeon - Completion #1": 173, "Z1 - SDungeon - Completion #2": 174, "Z1 - SDungeon - Completion #3": 175, "Z1 - BuySupplies": 176, "Z1 - Haggle": 177, "Z1 - StartJourney": 178, "Combat - Level 101": 179, "Combat - Level 111": 180, "Combat - Level 121": 181, "Combat - Level 131": 182, "Combat - Level 141": 183, "Magic - Level 101": 184, "Magic - Level 111": 185, "Magic - Level 121": 186, "Magic - Level 131": 187, "Magic - Level 141": 188, "Z1 - Heal - Completion #6": 189, "Z1 - Heal - Completion #7": 190, "Z1 - Fight - Completion #4": 191, "Z1 - Fight - Completion #5": 192, "Z1 - SDungeon - Completion #4": 193, "Z2 - Forest - 1%": 194, "Z2 - Forest - 5%": 195, "Z2 - Forest - 10%": 196, "Z2 - Forest - 15%": 197, "Z2 - Forest - 20%": 198, "Z2 - Forest - 25%": 199, "Z2 - Forest - 30%": 200, "Z2 - Forest - 40%": 201, "Z2 - Forest - 50%": 202, "Z2 - Forest - 60%": 203, "Z2 - Forest - 70%": 204, "Z2 - Forest - 80%": 205, "Z2 - Forest - 90%": 206, "Z2 - Forest - 95%": 207, "Z2 - Forest - 99%": 208, "Z2 - Forest - 100%": 209, "Z2 - WildMana - #1": 210, "Z2 - WildMana - #2": 211, "Z2 - WildMana - #3": 212, "Z2 - WildMana - #4": 213, "Z2 - WildMana - #5": 214, "Z2 - WildMana - #6": 215, "Z2 - WildMana - #7": 216, "Z2 - WildMana - #8": 217, "Z2 - WildMana - #9": 218, "Z2 - WildMana - #10": 219, "Z2 - WildMana - #11": 220, "Z2 - WildMana - #12": 221, "Z2 - WildMana - #13": 222, "Z2 - WildMana - #14": 223, "Z2 - WildMana - #15": 224, "Z2 - WildMana - #16": 225, "Z2 - WildMana - #17": 226, "Z2 - WildMana - #18": 227, "Z2 - WildMana - #19": 228, "Z2 - WildMana - #20": 229, "Z2 - WildMana - #21": 230, "Z2 - WildMana - #22": 231, "Z2 - WildMana - #23": 232, "Z2 - WildMana - #24": 233, "Z2 - WildMana - #25": 234, "Z2 - WildMana - #26": 235, "Z2 - WildMana - #27": 236, "Z2 - WildMana - #28": 237, "Z2 - WildMana - #29": 238, "Z2 - WildMana - #30": 239, "Z2 - WildMana - #31": 240, "Z2 - WildMana - #32": 241, "Z2 - WildMana - #33": 242, "Z2 - WildMana - #34": 243, "Z2 - WildMana - #35": 244, "Z2 - WildMana - #36": 245, "Z2 - WildMana - #37": 246, "Z2 - WildMana - #38": 247, "Z2 - WildMana - #39": 248, "Z2 - WildMana - #40": 249, "Z2 - WildMana - #41": 250, "Z2 - WildMana - #42": 251, "Z2 - WildMana - #43": 252, "Z2 - WildMana - #44": 253, "Z2 - WildMana - #45": 254, "Z2 - WildMana - #46": 255, "Z2 - WildMana - #47": 256, "Z2 - WildMana - #48": 257, "Z2 - WildMana - #49": 258, "Z2 - WildMana - #50": 259, "Z2 - WildMana - #51": 260, "Z2 - WildMana - #52": 261, "Z2 - WildMana - #53": 262, "Z2 - WildMana - #54": 263, "Z2 - WildMana - #55": 264, "Z2 - WildMana - #56": 265, "Z2 - WildMana - #57": 266, "Z2 - WildMana - #58": 267, "Z2 - WildMana - #59": 268, "Z2 - WildMana - #60": 269, "Z2 - WildMana - #61": 270, "Z2 - WildMana - #62": 271, "Z2 - WildMana - #63": 272, "Z2 - WildMana - #64": 273, "Z2 - WildMana - #65": 274, "Z2 - WildMana - #66": 275, "Z2 - WildMana - #67": 276, "Z2 - WildMana - #68": 277, "Z2 - WildMana - #69": 278, "Z2 - WildMana - #70": 279, "Z2 - WildMana - #71": 280, "Z2 - WildMana - #72": 281, "Z2 - WildMana - #73": 282, "Z2 - WildMana - #74": 283, "Z2 - WildMana - #75": 284, "Z2 - WildMana - #76": 285, "Z2 - WildMana - #77": 286, "Z2 - WildMana - #78": 287, "Z2 - WildMana - #79": 288, "Z2 - WildMana - #80": 289, "Z2 - WildMana - #81": 290, "Z2 - WildMana - #82": 291, "Z2 - WildMana - #83": 292, "Z2 - WildMana - #84": 293, "Z2 - WildMana - #85": 294, "Z2 - WildMana - #86": 295, "Z2 - WildMana - #87": 296, "Z2 - WildMana - #88": 297, "Z2 - WildMana - #89": 298, "Z2 - WildMana - #90": 299, "Z2 - WildMana - #91": 300, "Z2 - WildMana - #92": 301, "Z2 - WildMana - #93": 302, "Z2 - WildMana - #94": 303, "Z2 - WildMana - #95": 304, "Z2 - WildMana - #96": 305, "Z2 - WildMana - #97": 306, "Z2 - WildMana - #98": 307, "Z2 - WildMana - #99": 308, "Z2 - WildMana - #100": 309, "Z2 - Herbs - #1": 310, "Z2 - Herbs - #2": 311, "Z2 - Herbs - #3": 312, "Z2 - Herbs - #4": 313, "Z2 - Herbs - #5": 314, "Z2 - Herbs - #6": 315, "Z2 - Herbs - #7": 316, "Z2 - Herbs - #8": 317, "Z2 - Herbs - #9": 318, "Z2 - Herbs - #10": 319, "Z2 - Herbs - #11": 320, "Z2 - Herbs - #12": 321, "Z2 - Herbs - #13": 322, "Z2 - Herbs - #14": 323, "Z2 - Herbs - #15": 324, "Z2 - Herbs - #16": 325, "Z2 - Herbs - #17": 326, "Z2 - Herbs - #18": 327, "Z2 - Herbs - #19": 328, "Z2 - Herbs - #20": 329, "Z2 - Herbs - #21": 330, "Z2 - Herbs - #22": 331, "Z2 - Herbs - #23": 332, "Z2 - Herbs - #24": 333, "Z2 - Herbs - #25": 334, "Z2 - Herbs - #26": 335, "Z2 - Herbs - #27": 336, "Z2 - Herbs - #28": 337, "Z2 - Herbs - #29": 338, "Z2 - Herbs - #30": 339, "Z2 - Herbs - #31": 340, "Z2 - Herbs - #32": 341, "Z2 - Herbs - #33": 342, "Z2 - Herbs - #34": 343, "Z2 - Herbs - #35": 344, "Z2 - Herbs - #36": 345, "Z2 - Herbs - #37": 346, "Z2 - Herbs - #38": 347, "Z2 - Herbs - #39": 348, "Z2 - Herbs - #40": 349, "Z2 - Herbs - #41": 350, "Z2 - Herbs - #42": 351, "Z2 - Herbs - #43": 352, "Z2 - Herbs - #44": 353, "Z2 - Herbs - #45": 354, "Z2 - Herbs - #46": 355, "Z2 - Herbs - #47": 356, "Z2 - Herbs - #48": 357, "Z2 - Herbs - #49": 358, "Z2 - Herbs - #50": 359, "Z2 - Herbs - #51": 360, "Z2 - Herbs - #52": 361, "Z2 - Herbs - #53": 362, "Z2 - Herbs - #54": 363, "Z2 - Herbs - #55": 364, "Z2 - Herbs - #56": 365, "Z2 - Herbs - #57": 366, "Z2 - Herbs - #58": 367, "Z2 - Herbs - #59": 368, "Z2 - Herbs - #60": 369, "Z2 - Herbs - #61": 370, "Z2 - Herbs - #62": 371, "Z2 - Herbs - #63": 372, "Z2 - Herbs - #64": 373, "Z2 - Herbs - #65": 374, "Z2 - Herbs - #66": 375, "Z2 - Herbs - #67": 376, "Z2 - Herbs - #68": 377, "Z2 - Herbs - #69": 378, "Z2 - Herbs - #70": 379, "Z2 - Herbs - #71": 380, "Z2 - Herbs - #72": 381, "Z2 - Herbs - #73": 382, "Z2 - Herbs - #74": 383, "Z2 - Herbs - #75": 384, "Z2 - Herbs - #76": 385, "Z2 - Herbs - #77": 386, "Z2 - Herbs - #78": 387, "Z2 - Herbs - #79": 388, "Z2 - Herbs - #80": 389, "Z2 - Herbs - #81": 390, "Z2 - Herbs - #82": 391, "Z2 - Herbs - #83": 392, "Z2 - Herbs - #84": 393, "Z2 - Herbs - #85": 394, "Z2 - Herbs - #86": 395, "Z2 - Herbs - #87": 396, "Z2 - Herbs - #88": 397, "Z2 - Herbs - #89": 398, "Z2 - Herbs - #90": 399, "Z2 - Herbs - #91": 400, "Z2 - Herbs - #92": 401, "Z2 - Herbs - #93": 402, "Z2 - Herbs - #94": 403, "Z2 - Herbs - #95": 404, "Z2 - Herbs - #96": 405, "Z2 - Herbs - #97": 406, "Z2 - Herbs - #98": 407, "Z2 - Herbs - #99": 408, "Z2 - Herbs - #100": 409, "Z2 - Herbs - #101": 410, "Z2 - Herbs - #102": 411, "Z2 - Herbs - #103": 412, "Z2 - Herbs - #104": 413, "Z2 - Herbs - #105": 414, "Z2 - Herbs - #106": 415, "Z2 - Herbs - #107": 416, "Z2 - Herbs - #108": 417, "Z2 - Herbs - #109": 418, "Z2 - Herbs - #110": 419, "Z2 - Herbs - #111": 420, "Z2 - Herbs - #112": 421, "Z2 - Herbs - #113": 422, "Z2 - Herbs - #114": 423, "Z2 - Herbs - #115": 424, "Z2 - Herbs - #116": 425, "Z2 - Herbs - #117": 426, "Z2 - Herbs - #118": 427, "Z2 - Herbs - #119": 428, "Z2 - Herbs - #120": 429, "Z2 - Herbs - #121": 430, "Z2 - Herbs - #122": 431, "Z2 - Herbs - #123": 432, "Z2 - Herbs - #124": 433, "Z2 - Herbs - #125": 434, "Z2 - Herbs - #126": 435, "Z2 - Herbs - #127": 436, "Z2 - Herbs - #128": 437, "Z2 - Herbs - #129": 438, "Z2 - Herbs - #130": 439, "Z2 - Herbs - #131": 440, "Z2 - Herbs - #132": 441, "Z2 - Herbs - #133": 442, "Z2 - Herbs - #134": 443, "Z2 - Herbs - #135": 444, "Z2 - Herbs - #136": 445, "Z2 - Herbs - #137": 446, "Z2 - Herbs - #138": 447, "Z2 - Herbs - #139": 448, "Z2 - Herbs - #140": 449, "Z2 - Herbs - #141": 450, "Z2 - Herbs - #142": 451, "Z2 - Herbs - #143": 452, "Z2 - Herbs - #144": 453, "Z2 - Herbs - #145": 454, "Z2 - Herbs - #146": 455, "Z2 - Herbs - #147": 456, "Z2 - Herbs - #148": 457, "Z2 - Herbs - #149": 458, "Z2 - Herbs - #150": 459, "Z2 - Herbs - #151": 460, "Z2 - Herbs - #152": 461, "Z2 - Herbs - #153": 462, "Z2 - Herbs - #154": 463, "Z2 - Herbs - #155": 464, "Z2 - Herbs - #156": 465, "Z2 - Herbs - #157": 466, "Z2 - Herbs - #158": 467, "Z2 - Herbs - #159": 468, "Z2 - Herbs - #160": 469, "Z2 - Herbs - #161": 470, "Z2 - Herbs - #162": 471, "Z2 - Herbs - #163": 472, "Z2 - Herbs - #164": 473, "Z2 - Herbs - #165": 474, "Z2 - Herbs - #166": 475, "Z2 - Herbs - #167": 476, "Z2 - Herbs - #168": 477, "Z2 - Herbs - #169": 478, "Z2 - Herbs - #170": 479, "Z2 - Herbs - #171": 480, "Z2 - Herbs - #172": 481, "Z2 - Herbs - #173": 482, "Z2 - Herbs - #174": 483, "Z2 - Herbs - #175": 484, "Z2 - Herbs - #176": 485, "Z2 - Herbs - #177": 486, "Z2 - Herbs - #178": 487, "Z2 - Herbs - #179": 488, "Z2 - Herbs - #180": 489, "Z2 - Herbs - #181": 490, "Z2 - Herbs - #182": 491, "Z2 - Herbs - #183": 492, "Z2 - Herbs - #184": 493, "Z2 - Herbs - #185": 494, "Z2 - Herbs - #186": 495, "Z2 - Herbs - #187": 496, "Z2 - Herbs - #188": 497, "Z2 - Herbs - #189": 498, "Z2 - Herbs - #190": 499, "Z2 - Herbs - #191": 500, "Z2 - Herbs - #192": 501, "Z2 - Herbs - #193": 502, "Z2 - Herbs - #194": 503, "Z2 - Herbs - #195": 504, "Z2 - Herbs - #196": 505, "Z2 - Herbs - #197": 506, "Z2 - Herbs - #198": 507, "Z2 - Herbs - #199": 508, "Z2 - Herbs - #200": 509, "Z2 - Hunt - #1": 510, "Z2 - Hunt - #2": 511, "Z2 - Hunt - #3": 512, "Z2 - Hunt - #4": 513, "Z2 - Hunt - #5": 514, "Z2 - Hunt - #6": 515, "Z2 - Hunt - #7": 516, "Z2 - Hunt - #8": 517, "Z2 - Hunt - #9": 518, "Z2 - Hunt - #10": 519, "Z2 - Hunt - #11": 520, "Z2 - Hunt - #12": 521, "Z2 - Hunt - #13": 522, "Z2 - Hunt - #14": 523, "Z2 - Hunt - #15": 524, "Z2 - Hunt - #16": 525, "Z2 - Hunt - #17": 526, "Z2 - Hunt - #18": 527, "Z2 - Hunt - #19": 528, "Z2 - Hunt - #20": 529, "Z2 - SitByWaterfall": 530, "Z2 - Shortcut - 1%": 531, "Z2 - Shortcut - 5%": 532, "Z2 - Shortcut - 10%": 533, "Z2 - Shortcut - 15%": 534, "Z2 - Shortcut - 20%": 535, "Z2 - Shortcut - 25%": 536, "Z2 - Shortcut - 30%": 537, "Z2 - Shortcut - 40%": 538, "Z2 - Shortcut - 50%": 539, "Z2 - Shortcut - 60%": 540, "Z2 - Shortcut - 70%": 541, "Z2 - Shortcut - 80%": 542, "Z2 - Shortcut - 90%": 543, "Z2 - Shortcut - 95%": 544, "Z2 - Shortcut - 99%": 545, "Z2 - Shortcut - 100%": 546, "Z2 - Hermit - 1%": 547, "Z2 - Hermit - 5%": 548, "Z2 - Hermit - 10%": 549, "Z2 - Hermit - 15%": 550, "Z2 - Hermit - 20%": 551, "Z2 - Hermit - 25%": 552, "Z2 - Hermit - 30%": 553, "Z2 - Hermit - 40%": 554, "Z2 - Hermit - 50%": 555, "Z2 - Hermit - 60%": 556, "Z2 - Hermit - 70%": 557, "Z2 - Hermit - 80%": 558, "Z2 - Hermit - 90%": 559, "Z2 - Hermit - 95%": 560, "Z2 - Hermit - 99%": 561, "Z2 - Hermit - 100%": 562, "Practical - Level 1": 563, "Practical - Level 10": 564, "Practical - Level 20": 565, "Practical - Level 30": 566, "Practical - Level 40": 567, "Practical - Level 50": 568, "Practical - Level 60": 569, "Practical - Level 70": 570, "Practical - Level 80": 571, "Practical - Level 90": 572, "Practical - Level 100": 573, "Alchemy - Level 1": 574, "Alchemy - Level 10": 575, "Alchemy - Level 20": 576, "Z2 - BrewPotions": 577, "Z2 - TrainDexterity": 578, "Z2 - TrainSpeed": 579, "Z2 - Flowers - 1%": 580, "Z2 - Flowers - 5%": 581, "Z2 - Flowers - 10%": 582, "Z2 - Flowers - 15%": 583, "Z2 - Flowers - 20%": 584, "Z2 - Flowers - 25%": 585, "Z2 - Flowers - 30%": 586, "Z2 - Flowers - 40%": 587, "Z2 - Flowers - 50%": 588, "Z2 - Flowers - 60%": 589, "Z2 - Flowers - 70%": 590, "Z2 - Flowers - 80%": 591, "Z2 - Flowers - 90%": 592, "Z2 - Flowers - 95%": 593, "Z2 - Flowers - 99%": 594, "Z2 - Flowers - 100%": 595, "Z2 - BirdWatching": 596, "Z2 - Thicket - 1%": 597, "Z2 - Thicket - 5%": 598, "Z2 - Thicket - 10%": 599, "Z2 - Thicket - 15%": 600, "Z2 - Thicket - 20%": 601, "Z2 - Thicket - 25%": 602, "Z2 - Thicket - 30%": 603, "Z2 - Thicket - 40%": 604, "Z2 - Thicket - 50%": 605, "Z2 - Thicket - 60%": 606, "Z2 - Thicket - 70%": 607, "Z2 - Thicket - 80%": 608, "Z2 - Thicket - 90%": 609, "Z2 - Thicket - 95%": 610, "Z2 - Thicket - 99%": 611, "Z2 - Thicket - 100%": 612, "Z2 - Witch - 1%": 613, "Z2 - Witch - 5%": 614, "Z2 - Witch - 10%": 615, "Z2 - Witch - 15%": 616, "Z2 - Witch - 20%": 617, "Z2 - Witch - 25%": 618, "Z2 - Witch - 30%": 619, "Z2 - Witch - 40%": 620, "Z2 - Witch - 50%": 621, "Z2 - Witch - 60%": 622, "Z2 - Witch - 70%": 623, "Z2 - Witch - 80%": 624, "Z2 - Witch - 90%": 625, "Z2 - Witch - 95%": 626, "Z2 - Witch - 99%": 627, "Z2 - Witch - 100%": 628, "Dark - Level 1": 629, "Dark - Level 10": 630, "Dark - Level 20": 631, "Dark - Level 30": 632, "Dark - Level 40": 633, "Dark - Level 50": 634, "Dark - Level 60": 635, "Dark - Level 70": 636, "Dark - Level 80": 637, "Dark - Level 90": 638, "Dark - Level 100": 639, "Ritual - Level 1": 640, "Z2 - ContinueOn": 641, "Z1 - Heal - Completion #8": 642, "Z1 - Heal - Completion #9": 643, "Combat - Level 160": 644, "Combat - Level 170": 645, "Combat - Level 180": 646, "Combat - Level 190": 647, "Combat - Level 200": 648, "Magic - Level 160": 649, "Magic - Level 170": 650, "Magic - Level 180": 651, "Magic - Level 190": 652, "Magic - Level 200": 653, "Z1 - Fight - Completion #6": 654, "Z1 - Fight - Completion #7": 655, "Z1 - SDungeon - Completion #5": 656, "Z1 - SDungeon - Completion #6": 657, "Practical - Level 110": 658, "Practical - Level 120": 659, "Practical - Level 130": 660, "Practical - Level 140": 661, "Practical - Level 150": 662, "Practical - Level 160": 663, "Practical - Level 170": 664, "Practical - Level 180": 665, "Practical - Level 190": 666, "Practical - Level 200": 667, "Alchemy - Level 30": 668, "Alchemy - Level 40": 669, "Alchemy - Level 50": 670, "Dark - Level 110": 671, "Dark - Level 120": 672, "Dark - Level 130": 673, "Dark - Level 140": 674, "Dark - Level 150": 675, "Dark - Level 160": 676, "Dark - Level 170": 677, "Dark - Level 180": 678, "Dark - Level 190": 679, "Dark - Level 200": 680, "Z3 - City - 1%": 681, "Z3 - City - 5%": 682, "Z3 - City - 10%": 683, "Z3 - City - 15%": 684, "Z3 - City - 20%": 685, "Z3 - City - 25%": 686, "Z3 - City - 30%": 687, "Z3 - City - 40%": 688, "Z3 - City - 50%": 689, "Z3 - City - 60%": 690, "Z3 - City - 70%": 691, "Z3 - City - 80%": 692, "Z3 - City - 90%": 693, "Z3 - City - 95%": 694, "Z3 - City - 99%": 695, "Z3 - City - 100%": 696, "Z3 - Gamble - #1": 697, "Z3 - Gamble - #2": 698, "Z3 - Gamble - #3": 699, "Z3 - Gamble - #4": 700, "Z3 - Gamble - #5": 701, "Z3 - Gamble - #6": 702, "Z3 - Gamble - #7": 703, "Z3 - Gamble - #8": 704, "Z3 - Gamble - #9": 705, "Z3 - Gamble - #10": 706, "Z3 - Gamble - #11": 707, "Z3 - Gamble - #12": 708, "Z3 - Gamble - #13": 709, "Z3 - Gamble - #14": 710, "Z3 - Gamble - #15": 711, "Z3 - Gamble - #16": 712, "Z3 - Gamble - #17": 713, "Z3 - Gamble - #18": 714, "Z3 - Gamble - #19": 715, "Z3 - Gamble - #20": 716, "Z3 - Drunk - 1%": 717, "Z3 - Drunk - 5%": 718, "Z3 - Drunk - 10%": 719, "Z3 - Drunk - 15%": 720, "Z3 - Drunk - 20%": 721, "Z3 - Drunk - 25%": 722, "Z3 - Drunk - 30%": 723, "Z3 - Drunk - 40%": 724, "Z3 - Drunk - 50%": 725, "Z3 - Drunk - 60%": 726, "Z3 - Drunk - 70%": 727, "Z3 - Drunk - 80%": 728, "Z3 - Drunk - 90%": 729, "Z3 - Drunk - 95%": 730, "Z3 - Drunk - 99%": 731, "Z3 - Drunk - 100%": 732, "Z3 - BuyMana": 733, "Z3 - SellPotions": 734, "Z3 - GatherTeam": 735, "Z3 - LDungeon - Completion #1": 736, "Z3 - LDungeon - Completion #2": 737, "Z3 - Apprentice - 1%": 738, "Z3 - Apprentice - 5%": 739, "Z3 - Apprentice - 10%": 740, "Z3 - Apprentice - 15%": 741, "Z3 - Apprentice - 20%": 742, "Z3 - Apprentice - 25%": 743, "Z3 - Apprentice - 30%": 744, "Z3 - Apprentice - 40%": 745, "Z3 - Apprentice - 50%": 746, "Z3 - Apprentice - 60%": 747, "Z3 - Apprentice - 70%": 748, "Z3 - Apprentice - 80%": 749, "Z3 - Apprentice - 90%": 750, "Z3 - Apprentice - 95%": 751, "Z3 - Apprentice - 99%": 752, "Z3 - Apprentice - 100%": 753, "Z3 - Mason - 1%": 754, "Z3 - Mason - 5%": 755, "Z3 - Mason - 10%": 756, "Z3 - Mason - 15%": 757, "Z3 - Mason - 20%": 758, "Z3 - Mason - 25%": 759, "Z3 - Mason - 30%": 760, "Z3 - Mason - 40%": 761, "Z3 - Mason - 50%": 762, "Z3 - Mason - 60%": 763, "Z3 - Mason - 70%": 764, "Z3 - Mason - 80%": 765, "Z3 - Mason - 90%": 766, "Z3 - Mason - 95%": 767, "Z3 - Mason - 99%": 768, "Z3 - Mason - 100%": 769, "Z3 - Architect - 1%": 770, "Z3 - Architect - 5%": 771, "Z3 - Architect - 10%": 772, "Z3 - Architect - 15%": 773, "Z3 - Architect - 20%": 774, "Z3 - Architect - 25%": 775, "Z3 - Architect - 30%": 776, "Z3 - Architect - 40%": 777, "Z3 - Architect - 50%": 778, "Z3 - Architect - 60%": 779, "Z3 - Architect - 70%": 780, "Z3 - Architect - 80%": 781, "Z3 - Architect - 90%": 782, "Z3 - Architect - 95%": 783, "Z3 - Architect - 99%": 784, "Z3 - Architect - 100%": 785, "Z3 - ReadBooks": 786, "Z3 - BuyPickaxe": 787, "Z3 - StartTrek": 788, "Combat - Level 210": 789, "Combat - Level 220": 790, "Combat - Level 230": 791, "Combat - Level 240": 792, "Combat - Level 250": 793, "Combat - Level 260": 794, "Combat - Level 270": 795, "Combat - Level 280": 796, "Combat - Level 290": 797, "Combat - Level 300": 798, "Magic - Level 210": 799, "Magic - Level 220": 800, "Magic - Level 230": 801, "Magic - Level 240": 802, "Magic - Level 250": 803, "Magic - Level 260": 804, "Magic - Level 270": 805, "Magic - Level 280": 806, "Magic - Level 290": 807, "Magic - Level 300": 808, "Z1 - Heal - Completion #10": 809, "Z1 - Fight - Completion #8": 810, "Z1 - Fight - Completion #9": 811, "Z1 - Fight - Completion #10": 812, "Practical - Level 210": 813, "Practical - Level 220": 814, "Practical - Level 230": 815, "Practical - Level 240": 816, "Practical - Level 250": 817, "Practical - Level 260": 818, "Practical - Level 270": 819, "Practical - Level 280": 820, "Practical - Level 290": 821, "Practical - Level 300": 822, "Alchemy - Level 60": 823, "Alchemy - Level 70": 824, "Alchemy - Level 80": 825, "Alchemy - Level 90": 826, "Alchemy - Level 100": 827, "Dark - Level 210": 828, "Dark - Level 220": 829, "Dark - Level 230": 830, "Dark - Level 240": 831, "Dark - Level 250": 832, "Dark - Level 260": 833, "Dark - Level 270": 834, "Dark - Level 280": 835, "Dark - Level 290": 836, "Dark - Level 300": 837, "Z3 - LDungeon - Completion #3": 838, "Z3 - LDungeon - Completion #4": 839, "Z3 - LDungeon - Completion #5": 840, "Z3 - LDungeon - Completion #6": 841, "Z3 - LDungeon - Completion #7": 842, "Z3 - LDungeon - Completion #8": 843, "Z3 - LDungeon - Completion #9": 844, "Z4 - Mountain - 1%": 845, "Z4 - Mountain - 5%": 846, "Z4 - Mountain - 10%": 847, "Z4 - Mountain - 15%": 848, "Z4 - Mountain - 20%": 849, "Z4 - Mountain - 25%": 850, "Z4 - Mountain - 30%": 851, "Z4 - Mountain - 40%": 852, "Z4 - Mountain - 50%": 853, "Z4 - Mountain - 60%": 854, "Z4 - Mountain - 70%": 855, "Z4 - Mountain - 80%": 856, "Z4 - Mountain - 90%": 857, "Z4 - Mountain - 95%": 858, "Z4 - Mountain - 99%": 859, "Z4 - Mountain - 100%": 860, "Z4 - Geysers - #1": 861, "Z4 - Geysers - #2": 862, "Z4 - Geysers - #3": 863, "Z4 - Geysers - #4": 864, "Z4 - Geysers - #5": 865, "Z4 - Geysers - #6": 866, "Z4 - Geysers - #7": 867, "Z4 - Geysers - #8": 868, "Z4 - Geysers - #9": 869, "Z4 - Geysers - #10": 870, "Z4 - Runes - 1%": 871, "Z4 - Runes - 5%": 872, "Z4 - Runes - 10%": 873, "Z4 - Runes - 15%": 874, "Z4 - Runes - 20%": 875, "Z4 - Runes - 25%": 876, "Z4 - Runes - 30%": 877, "Z4 - Runes - 40%": 878, "Z4 - Runes - 50%": 879, "Z4 - Runes - 60%": 880, "Z4 - Runes - 70%": 881, "Z4 - Runes - 80%": 882, "Z4 - Runes - 90%": 883, "Z4 - Runes - 95%": 884, "Z4 - Runes - 99%": 885, "Z4 - Runes - 100%": 886, "Chronomancy - Level 1": 887, "Chronomancy - Level 10": 888, "Chronomancy - Level 20": 889, "Chronomancy - Level 30": 890, "Chronomancy - Level 40": 891, "Chronomancy - Level 50": 892, "Chronomancy - Level 60": 893, "Chronomancy - Level 70": 894, "Chronomancy - Level 80": 895, "Chronomancy - Level 90": 896, "Chronomancy - Level 100": 897, "Pyromancy - Level 1": 898, "Pyromancy - Level 10": 899, "Pyromancy - Level 20": 900, "Pyromancy - Level 30": 901, "Pyromancy - Level 40": 902, "Pyromancy - Level 50": 903, "Pyromancy - Level 60": 904, "Pyromancy - Level 70": 905, "Pyromancy - Level 80": 906, "Pyromancy - Level 90": 907, "Pyromancy - Level 100": 908, "Z4 - Cavern - 1%": 909, "Z4 - Cavern - 5%": 910, "Z4 - Cavern - 10%": 911, "Z4 - Cavern - 15%": 912, "Z4 - Cavern - 20%": 913, "Z4 - Cavern - 25%": 914, "Z4 - Cavern - 30%": 915, "Z4 - Cavern - 40%": 916, "Z4 - Cavern - 50%": 917, "Z4 - Cavern - 60%": 918, "Z4 - Cavern - 70%": 919, "Z4 - Cavern - 80%": 920, "Z4 - Cavern - 90%": 921, "Z4 - Cavern - 95%": 922, "Z4 - Cavern - 99%": 923, "Z4 - Cavern - 100%": 924, "Z4 - MineSoulstones - #1": 925, "Z4 - MineSoulstones - #2": 926, "Z4 - MineSoulstones - #3": 927, "Z4 - MineSoulstones - #4": 928, "Z4 - MineSoulstones - #5": 929, "Z4 - MineSoulstones - #6": 930, "Z4 - MineSoulstones - #7": 931, "Z4 - MineSoulstones - #8": 932, "Z4 - MineSoulstones - #9": 933, "Z4 - MineSoulstones - #10": 934, "Z4 - MineSoulstones - #11": 935, "Z4 - MineSoulstones - #12": 936, "Z4 - MineSoulstones - #13": 937, "Z4 - MineSoulstones - #14": 938, "Z4 - MineSoulstones - #15": 939, "Z4 - MineSoulstones - #16": 940, "Z4 - MineSoulstones - #17": 941, "Z4 - MineSoulstones - #18": 942, "Z4 - MineSoulstones - #19": 943, "Z4 - MineSoulstones - #20": 944, "Z4 - MineSoulstones - #21": 945, "Z4 - MineSoulstones - #22": 946, "Z4 - MineSoulstones - #23": 947, "Z4 - MineSoulstones - #24": 948, "Z4 - MineSoulstones - #25": 949, "Z4 - MineSoulstones - #26": 950, "Z4 - MineSoulstones - #27": 951, "Z4 - MineSoulstones - #28": 952, "Z4 - MineSoulstones - #29": 953, "Z4 - MineSoulstones - #30": 954, "Z4 - HuntTrolls - Completion #1": 955, "Z4 - HuntTrolls - Completion #2": 956, "Z4 - HuntTrolls - Completion #3": 957, "Z4 - HuntTrolls - Completion #4": 958, "Z4 - HuntTrolls - Completion #5": 959, "Z4 - Illusions - 1%": 960, "Z4 - Illusions - 5%": 961, "Z4 - Illusions - 10%": 962, "Z4 - Illusions - 15%": 963, "Z4 - Illusions - 20%": 964, "Z4 - Illusions - 25%": 965, "Z4 - Illusions - 30%": 966, "Z4 - Illusions - 40%": 967, "Z4 - Illusions - 50%": 968, "Z4 - Illusions - 60%": 969, "Z4 - Illusions - 70%": 970, "Z4 - Illusions - 80%": 971, "Z4 - Illusions - 90%": 972, "Z4 - Illusions - 95%": 973, "Z4 - Illusions - 99%": 974, "Z4 - Illusions - 100%": 975, "Z4 - Artifacts - #1": 976, "Z4 - Artifacts - #2": 977, "Z4 - Artifacts - #3": 978, "Z4 - Artifacts - #4": 979, "Z4 - Artifacts - #5": 980, "Z4 - Artifacts - #6": 981, "Z4 - Artifacts - #7": 982, "Z4 - Artifacts - #8": 983, "Z4 - Artifacts - #9": 984, "Z4 - Artifacts - #10": 985, "Z4 - Artifacts - #11": 986, "Z4 - Artifacts - #12": 987, "Z4 - Artifacts - #13": 988, "Z4 - Artifacts - #14": 989, "Z4 - Artifacts - #15": 990, "Z4 - Artifacts - #16": 991, "Z4 - Artifacts - #17": 992, "Z4 - Artifacts - #18": 993, "Z4 - Artifacts - #19": 994, "Z4 - Artifacts - #20": 995, "Imbuement - Level 1": 996, "Z4 - FaceJudgement": 997 }
    const name_map = { "Wander": "Wander", "Mana Pot": "Pots", "Lock": "Locks", "Buy Glasses": "BuyGlasses", "Buy Mana": "BuyMana", "Meet People": "Met", "Train Strength": "TrainStrength", "Short Quest": "SQuests", "Investigate": "Secrets", "Long Quest": "LQuests", "Throw Party": "ThrowParty", "Warrior Lessons": "WarriorLessons", "Mage Lessons": "MageLessons", "Heal The Sick": "Heal", "Fight Monsters": "Fight", "Small Dungeon": "SDungeon", "Buy Supplies": "BuySupplies", "Haggle": "Haggle", "Start Journey": "StartJourney", "Explore Forest": "Forest", "Wild Mana": "WildMana", "Herb": "Herbs", "Hunt": "Hunt", "Sit By Waterfall": "SitByWaterfall", "Old Shortcut": "Shortcut", "Talk To Hermit": "Hermit", "Practical Magic": "Practical", "Learn Alchemy": "LearnAlchemy", "Brew Potions": "BrewPotions", "Train Dexterity": "TrainDexterity", "Train Speed": "TrainSpeed", "Follow Flowers": "Flowers", "Bird Watching": "BirdWatching", "Clear Thicket": "Thicket", "Talk To Witch": "Witch", "Dark Magic": "Dark", "Dark Ritual": "Ritual", "Continue On": "ContinueOn", "Explore City": "City", "Gamble": "Gamble", "Get Drunk": "Drunk", "Sell Potions": "SellPotions", "Adventure Guild": "AdvGuild", "Gather Team": "GatherTeam", "Large Dungeon": "LDungeon", "Crafting Guild": "CraftGuild", "Apprentice": "Apprentice", "Mason": "Mason", "Architect": "Architect", "Read Books": "ReadBooks", "Buy Pickaxe": "BuyPickaxe", "Start Trek": "StartTrek", "Climb Mountain": "Mountain", "Mana Geyser": "Geysers", "Decipher Runes": "Runes", "Chronomancy": "Chronomancy", "Pyromancy": "Pyromancy", "Explore Cavern": "Cavern", "Soulstone": "MineSoulstones", "Hunt Trolls": "HuntTrolls", "Check Walls": "Illusions", "Artifact": "Artifacts", "Face Judgement": "FaceJudgement", "Combat": "Combat", "Magic": "Magic", "Alchemy": "Alchemy", "Imbue Mind": "Imbuement" }
    const name_map_reverse = Object.fromEntries(Object.entries(name_map).map(([k, v]) => [v, k]));

    const bar_locations = [1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
    const skill_locations = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300];

    // The order here is used for the "progressive limited" item, so it's ordered in usefulness > zone (mostly)
    // Max isn't said explicitly anywhere in the code we could just read
    // Will have to be rewritten if we get to Survey
    const limitedActions = {
        "SQuests": { town: 0, max: 20, ratio: 5 },
        "LQuests": { town: 0, max: 10, ratio: 5 },
        "Locks": { town: 0, max: 10, ratio: 10 },
        "WildMana": { town: 1, max: 100, ratio: 10 },
        "Gamble": { town: 2, max: 20, ratio: 10 },
        "Herbs": { town: 1, max: 200, ratio: 10 },
        "Geysers": { town: 3, max: 10, ratio: 100 },
        "MineSoulstones": { town: 3, max: 30, ratio: 10 },
        "Hunt": { town: 1, max: 20, ratio: 10 },
        "Artifacts": { town: 3, max: 20, ratio: 25 },
        "Pots": { town: 0, max: 9999, ratio: 10 },
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
        state = new Proxy({}, {
            get: (target, prop) => {
                if (prop in target) {
                    return target[prop];
                } else {
                    return 0;
                }
            }
        });
        scouts = {};
        location_name_to_id = location_name_to_id;
        predictor = false;
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
            body.t-dark #actionLogContainer #apSeparator {
                color: white;
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
            body.t-dark #actionLogContainer.ap #apTitle {
                color: white;
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
            if (!(window.localStorage[saveName] && window.localStorage[saveName] !== "null")) {
                first_load = true;
            }
            load();
            if ((!stop) && typeof stop !== "function" || (typeof gameIsStopped !== "undefined" && !gameIsStopped)) {
                pauseGame();
            }
            if (first_load) {
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
            this.logElement = logElement;
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
                this.log(content);
            });

            this.client.items.on("itemsReceived", (items, index) => {
                for (const item of items) {
                    this.item(item.name);
                }
                if (this.predictor) this.predictor.cache.reset();
                view.updateNextActions();
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
            if (typeof Koviko !== "undefined") {
                if (Koviko.predictor) {
                    this.predictor = Koviko.predictor;
                    console.log("AP: Forcing local predictor, ignore next error")
                    Koviko.predictor.handleWorkerMessage({ data: { type: "error" } })
                } else {
                    this.predictor = Koviko;
                }
                const predict = function (prediction, state) {
                    if (Object.values(state.stats).every(stat => stat === 0)) {
                        state.resources.mana += (50 * IdleLoopsAP.state["Filler - 50 Starting Mana"]);
                        state.resources.gold += IdleLoopsAP.state["Filler - 1 Starting Gold"]
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
                this.predictor.predict = predict;
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
                            window.IdleLoopsAP.log(`Error: You need "Z${this.index + 1} - ${name_map_reverse[varName]} - Search" to check unchecked ${name_map_reverse[varName]}s`);
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
                                return this.effectiveLimited(name);
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
                                const rewardRatio = limitedActions[name].ratio;
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
                    skills[skill].levelExp.addExp = function (exp) {
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
                timeNeeded = 250 + (50 * (this.state["Filler - 50 Starting Mana"]));
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
                resources.gold = this.state["Filler - 1 Starting Gold"];
                if (getExploreProgress() >= 100) addResource("glasses", true);
                view.requestUpdate("updateResources", null);
            }

            // Collect checks from before this connection
            for (const item of this.client.items.received) {
                this.item(item.name, true);
            }
            if (this.predictor) this.predictor.cache.reset();
            view.updateNextActions();

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
                        if (action.varName in limitedActions) {
                            let checks = Math.floor(towns[town][`checked${action.varName}`] / limitedActions[action.varName].ratio);
                            for (let i = 1; i <= checks; i++) {
                                this.location(`Z${town + 1} - ${action.varName} - #${i}`);
                            }
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

        effectiveLimited(varName) {
            let extra = this.state["Filler - Progressive Lootable"];
            let oldExtra = extra;

            // Edge case for LQuests, we want an extra 'fake' LQuests with max 2, to guarantee 2 rep.
            if ((this.state["Z1 - LQuests"]) < 2) {
                extra -= Math.max(0, 2 - this.state["Z1 - LQuests"]);
                if (extra <= 0) {
                    if (varName === "LQuests") {
                        return (this.state["Z1 - LQuests"]) + oldExtra;
                    } else {
                        return this.state[`Z${limitedActions?.[varName]?.town + 1} - ${varName}`];
                    }
                }
                // Edge case for the edge case - if we somehow managed to cap SQuests with Progressive before finding 2 LQuests,
                // we don't want to double use progressives on LQuests.
                if (oldExtra !== extra && (this.state["Z1 - SQuests"] + extra >= 20)) {
                    extra += oldExtra - extra;
                } else if (varName === "LQuests") {
                    // This path is reached if we have enough to get 2 LQuests but not enough to get 20 SQuests, to which we always return 2
                    return 2;
                }
                oldExtra = extra;
            }

            for (const limited in limitedActions) {

                if (limitedActions[limited].town > this.goalZone) {
                    continue;
                }

                const limitedObj = limitedActions[limited];
                if (varName === limited) {
                    extra -= Math.max(0, limitedObj.max - this.state[`Z${limitedObj.town + 1} - ${limited}`]);
                    if (extra <= 0) {
                        return this.state[`Z${limitedObj.town + 1} - ${limited}`] + oldExtra;
                    } else {
                        return limitedObj.max;
                    }
                }
                if (varName === limited) {
                    return this.state[`Z${limitedObj.town + 1} - ${limited}`];
                }
                extra -= Math.max(0, limitedObj.max - this.state[`Z${limitedObj.town + 1} - ${limited}`]);
                if (extra <= 0) {
                    break;
                }
                oldExtra = extra;
            }

            return this.state[`Z${limitedActions?.[varName]?.town + 1} - ${varName}`];
        }

        lastEffectiveLimited(endVarName) {
            let extra = this.state["Filler - Progressive Lootable"];
            let oldExtra = extra;

            if ((this.state["Z1 - LQuests"]) < 2) {
                extra -= Math.max(0, 2 - this.state["Z1 - LQuests"]);
                if (extra <= 0) {
                    if (endVarName === "LQuests" || typeof endVarName === "undefined") {
                        return "LQuests";
                    }
                    return false;
                }
                if (oldExtra !== extra && (this.state["Z1 - SQuests"] + extra >= 20)) {
                    extra += oldExtra - extra;
                }
            }

            for (const limited in limitedActions) {

                if (limitedActions[limited].town > this.goalZone) {
                    continue;
                }

                const limitedObj = limitedActions[limited];
                extra -= Math.max(0, limitedObj.max - this.state[`Z${limitedObj.town + 1} - ${limited}`]);
                if (extra <= 0) {
                    return endVarName === limited || typeof endVarName === "undefined" ? limited : false;
                }
                if (endVarName === limited) {
                    return false;
                }
                oldExtra = extra;
            }
        }

        visible(action) {
            let defaultVisible = false;
            if (action.type == "limited") {
                defaultVisible = action._visible() || this.effectiveLimited(action.varName) > 0;
            }
            return defaultVisible || `Z${action.townNum + 1} - ${action.varName}` in this.state || `Z${action.townNum + 1} - ${action.varName} - Search` in this.state;
        }

        unlocked(action) {
            let defaultUnlocked = false;
            if (action.type == "limited") {
                defaultUnlocked = `Z${action.townNum + 1} - ${action.varName} - Search` in this.state || this.effectiveLimited(action.varName) > 0;
            }
            return defaultUnlocked || `Z${action.townNum + 1} - ${action.varName}` in this.state;
        }

        location(x) {
            const check = this.location_name_to_id?.[x] ?? false;
            if (check) {
                try {
                    this.client.check(check);
                } catch (error) {
                    console.error('Error checking location:', error.message);
                }
            } else {
                console.log('Unknown location: "' + x + '"');
            }
        }

        /**
         * Called in order for every item rewarded, and also for every item in history on connection to catch the state up to speed.
         */
        item(x, old = false) {
            let [zone, action, ...rest] = x.split(" - ");
            if (zone.startsWith("Z")) {
                action = name_map[action] ?? action;
                if (action === "BuyMana") {
                    action = "BuyManaZ" + zone.substring(1);
                }
                x = [zone, action, ...rest].join(" - ");
            }
            // We don't have to check if it exists, it's proxied to 0 when it doesn't
            // so this will set it to 1 in that case
            this.state[x]++;

            if (limitedActions?.[action]) {
                if (rest.length === 0) {
                    const lastEffective = this.lastEffectiveLimited(action);
                    if (lastEffective && lastEffective !== action) {
                        if (!old) this.log(`Due to Progressive Lootables, ${x} has the effect of adding an extra ${name_map_reverse[lastEffective]} instead`);
                        view.updateRegular({ name: lastEffective, index: +(zone.substring(1)) - 1 });
                    }
                }
                view.updateRegular({ name: action, index: +(zone.substring(1)) - 1 });
            } else if (zone === "Filler") {
                // Starting mana and gold are handled elsewhere
                if (action === "+0.1 Game Speed") {
                    gameSpeed = 1 + (0.1 * this.state[x]);
                } else if (action === "Progressive Lootable") {
                    const effective = this.lastEffectiveLimited();
                    if (!old) this.log(`Progressive Lootable had the effect of an extra ${name_map_reverse[effective]}`);
                    view.updateRegular({ name: effective, index: limitedActions[effective].town });
                }
            } else if (action === "ThrowParty") {
                const unhideMet = document.createElement("style");
                unhideMet.innerHTML = `#infoContainerMet:not(.user-hidden) {
                    display: contents !important;
                }
                :root.editing-hidden-vars #infoContainerMet.user-hidden {
                    display: contents !important;
                }`;
                document.head.appendChild(unhideMet);
            }
        }

        log(x) {
            const message = document.createElement("li");
            message.textContent = x;
            this.logElement.insertBefore(message, this.logElement.firstChild);
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

                    scout = await this.client.scout([location], 0)
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
            const checks = Math.floor(towns[town][`checked${varName}`] / limitedActions[varName].ratio);
            const location_name = `Z${town + 1} - ${varName} - #${checks + 1}`;
            let check;
            if (!this.state[`Z${town + 1} - ${varName} - Search`]) {
                check = `"Z${town + 1} - ${name_map_reverse[varName]} - Search" needs to be found first`;
            } else if (location_name in this.location_name_to_id) {
                const location = this.location_name_to_id[location_name];
                let scout
                if (location in this.scouts) {
                    scout = this.scouts[location];
                    check = `${scout[0].receiver.name}'s "${scout[0].name}" Next`
                } else {
                    lines[0] = `Scouting...`;
                    el.innerHTML = lines.join("<br>");

                    scout = await this.client.scout([location], 0)
                    this.scouts[location] = scout;
                    check = `${scout[0].receiver.name}'s "${scout[0].name}" Next`
                }
            } else {
                check = "No more checks";
            }
            lines[0] = `<span style="white-space: pre;">Sends a Check to AP every ${limitedActions[varName].ratio} checked.\n${check}</span>`;
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
            if (level < 300) {
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