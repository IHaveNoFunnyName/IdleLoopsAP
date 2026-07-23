export function hook_skill(IdleLoopsAP, skill) {
    if (IdleLoopsAP.newUI) {
        skills[skill].levelExp.addExp = function (exp) {
            const prevLevel = getSkillLevel(skill);
            const success = LevelExp.prototype.addExp.call(this, exp);
            const newLevel = getSkillLevel(skill);
            for (let i = prevLevel + 1; i <= newLevel; i++) {
                IdleLoopsAP.location(`${skill} - Level ${i}`);
            }
        }
        return skills[skill];
    } else {
        return new Proxy(skills[skill], {
            set: (target, prop, value, receiver) => {
                if (prop !== "exp") {
                    return Reflect.set(target, prop, value, receiver);
                }
                const prevLevel = getSkillLevel(skill);
                const success = Reflect.set(target, prop, value, receiver);
                const newLevel = getSkillLevel(skill);
                for (let i = prevLevel + 1; i <= newLevel; i++) {
                    IdleLoopsAP.location(`${skill} - Level ${i}`);
                }
                return success;
            }
        });
    }
}

export function hook_buff(IdleLoopsAP, buff) {
    return new Proxy(buffs[buff], {
        set: (target, prop, value, receiver) => {
            const prevLevel = target[prop];
            const success = Reflect.set(target, prop, value, receiver);
            const newLevel = value;
            for (let i = prevLevel + 1; i <= newLevel; i++) {
                if (IdleLoopsAP.location_name_to_id[`${buff} - Level ${i}`]) {
                    IdleLoopsAP.location(`${buff} - Level ${i}`);
                }
            }
            return success;
        }
    });
}