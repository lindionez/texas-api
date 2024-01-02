const yts = require("yt-search");

const ytSr = async(q, noFilter) => {
    const play2 = await yts(q);
    if (noFilter) return play2.all
    const filtro = play2.all.filter((result) => result?.timestamp?.replace(/[^0-9]/g, "") <= 2500 && result?.timestamp?.replace(/[^0-9]/g, "") !== 000);
    if (!filtro.length) return undefined
    const play1 = filtro[Math.floor(Math.random() * 3)];
    return play1
}

const randonAtalho = (atalho) => {
const random = atalho[Math.floor(Math.random() * atalho.length)]
return random
}

module.exports = {
    ytSr,
    randonAtalho
}