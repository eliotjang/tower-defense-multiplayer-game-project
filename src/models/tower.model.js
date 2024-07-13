export const towers = {};

export const addTower = (uuid, tower) => {
    if (!towers[uuid]) {
        towers[uuid] = [];
    }
    towers[uuid].push(tower);
};

// 유저의 타워 목록을 가져오는 함수
export const getUserTowers = (uuid) => {
    return towers[uuid] || [];
};