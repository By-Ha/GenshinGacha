/**
 * 神仙保佑
 * 这段代码
 * 必 无BUG
 */


const getRandomInt = (max = 10000) => {
    return Math.floor(Math.random() * max) + 1;
}

const getConfig = (name: string, key: string | number, autoFill: any) => {
    const raw = localStorage.getItem(name)
    if (raw == null) {
        setConfig(name, key, autoFill)
        return autoFill
    }
    const data = JSON.parse(raw)
    if (data[key] == undefined || Object.keys(data[key]).length == 0) {
        setConfig(name, key, autoFill)
        return autoFill
    }
    return data[key]
}
const setConfig = (name: string, key: string | number, value: any) => {
    let raw = localStorage.getItem(name)
    if (raw == null) raw = "{}"
    let data = JSON.parse(raw)
    Object.assign(data, { [key]: value })
    localStorage.setItem(name, JSON.stringify(data))
}

const getFiveProb = (gacha_type: number) => {
    const counter = getConfig('user', 'gachaCounter', { 200: [0, 1, 1, 1, 1, 1], 301: [0, 1, 1, 1, 1, 1], 302: [0, 1, 1, 1, 1, 1] })[gacha_type][5]
    if (gacha_type === 200 || gacha_type === 301) {
        return 60 + 600 * (counter > 73 ? counter - 73 : 0);
    } else {
        if (counter <= 73) {
            return 70 + 700 * (counter > 62 ? counter - 62 : 0);
        } else {
            return 7770 + 350 * (counter - 73);
        }
    }
}

const getFourProb = (gacha_type: number) => {
    const counter = getConfig('user', 'gachaCounter', { 200: [0, 1, 1, 1, 1, 1], 301: [0, 1, 1, 1, 1, 1], 302: [0, 1, 1, 1, 1, 1] })[gacha_type][4]
    if (gacha_type === 200 || gacha_type === 301) {
        return 510 + 5100 * (counter > 8 ? counter - 8 : 0);
    } else {
        if (counter < 8) {
            return 600;
        } else if (counter === 8) {
            return 6600;
        } else {
            return 6600 + 3000 * (counter - 8);
        }
    }
}

const getIsUp = (star: number, gacha_type: number) => {
    const isUp = getConfig('user', 'gachaIsUp', { 200: 0, 301: 0, 302: 0 })[gacha_type]
    switch (gacha_type) {
        case 200: return false
        case 301: return getRandomInt() <= 5000 || (star === 5 && isUp < 0)
        case 302: return getRandomInt() <= 7500
        default: return false
    }
}

const getStar = (gacha_type: number) => {
    const value = getRandomInt();
    const fiveProb = getFiveProb(gacha_type);
    const fourProb = getFourProb(gacha_type) + fiveProb;
    switch (true) {
        case value <= fiveProb: return 5;
        case value <= fourProb: return 4;
        default: return 3;
    }
}

const updateCounter = (star: number, up: boolean, gacha_type: number) => {
    let counter = getConfig('user', 'gachaCounter', { 200: [0, 1, 1, 1, 1, 1], 301: [0, 1, 1, 1, 1, 1], 302: [0, 1, 1, 1, 1, 1] })[gacha_type]
    let isUp = getConfig('user', 'gachaIsUp', { 200: 0, 301: 0, 302: 0 })[gacha_type]
    if (star === 5) {
        counter[5] = 1
        if (up) {
            if (isUp >= 0) isUp++
            else isUp = 1
        } else {
            if (isUp >= 0) isUp = -1
            else isUp--
        }
    }
    else counter[5]++
    if (star === 4) counter[4] = 1
    else counter[4]++
    setConfig('user', 'gachaIsUp', { [gacha_type]: isUp })
    setConfig('user', 'gachaCounter', { [gacha_type]: counter })
}

const once = (gacha_type: number) => {
    const gachaConfig = getConfig('gacha', gacha_type, {})
    if (Object.keys(gachaConfig).length == 0) return
    const star = getStar(gacha_type)
    const up = getIsUp(star, gacha_type)
    const times = getConfig('user', 'gachaCounter', { 200: [0, 1, 1, 1, 1, 1], 301: [0, 1, 1, 1, 1, 1], 302: [0, 1, 1, 1, 1, 1] })[gacha_type][5]
    updateCounter(star, up, gacha_type)

    let result
    if (star === 5) {
        if (up) {
            const index = -1 + getRandomInt(gachaConfig.r5_up_items.length)
            result = gachaConfig.r5_up_items[index]
        } else {
            const index = -1 + getRandomInt(gachaConfig.r5_prob_list.length - gachaConfig.r5_up_items.length) + gachaConfig.r5_up_items.length
            result = gachaConfig.r5_prob_list[index]
        }
        return { result, star: 5, times, up }
    } else if (star === 4) {
        if (up) {
            const index = -1 + getRandomInt(gachaConfig.r4_up_items.length)
            result = gachaConfig.r4_up_items[index]
        } else {
            const index = -1 + getRandomInt(gachaConfig.r4_prob_list.length - gachaConfig.r4_up_items.length) + gachaConfig.r4_up_items.length
            result = gachaConfig.r4_prob_list[index]
        }
        return { result, star: 4, times, up }
    } else {
        const index = -1 + getRandomInt(gachaConfig.r3_prob_list.length)
        result = gachaConfig.r3_prob_list[index]
        return { result, star: 3, times, up: 0 }
    }
}

const tenTimes = (gacha_type: number) => {
    let result = []
    for (let i = 0; i < 10; ++i) {
        result.push(once(gacha_type))
    }
    return result
}

export function gachaOnce(gacha_type: number) {
    return once(gacha_type)
}

export function gachaTenimes(gacha_type: number) {
    return tenTimes(gacha_type)
}