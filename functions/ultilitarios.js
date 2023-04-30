const yts = require("yt-search");

const { y2mateA, y2mateV } = require('./ytmate')
const atalhos = require('./atalhos.json')

const ytSr = async(q, res) => {
    const play2 = await yts(q);
    const filtro = play2.all.filter((result) => result?.timestamp?.replace(/[^0-9]/g, "") <= 2500 && result?.timestamp?.replace(/[^0-9]/g, "") !== 000);
    if (!filtro.length) return undefined
    const play1 = filtro[Math.floor(Math.random() * 3)];
    return play1
}

const ytDown = async (url, isVideo = false) => {
    const Play = isVideo ? await y2mateV(url) : await y2mateA(url)
    if (!Play[0].status) return undefined
    const OBJ = {
        titulo: Play[0].judul,
        link_youTube: url,
        tamanho: Play[0].size,
        foto: Play[0].thumb,
        url: Play[0].link,
        function_para_baixar_url: atalhos.function_para_baixar_url
    }
    return OBJ
}

module.exports = {
    ytSr,
    ytDown,
}