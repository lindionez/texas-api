const { y2mateA, y2mateV } = require('./ytmate')

const ytDown = async (url, isVideo = false) => {
    const Play = isVideo ? await y2mateV(url) : await y2mateA(url)
    const OBJ = {
        titulo: Play[0].judul,
        link_youTube: url,
        tamanho: Play[0].size,
        thumb: Play[0].thumb,
        url: Play[0].link
    }
    return OBJ
}

module.exports = {
    ytDown,
}