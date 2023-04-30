const { y2mateA, y2mateV } = require('./ytmate')
const atalhos = require('./atalhos.json')

const ytDown = async (url, isVideo = false) => {
    const Play = isVideo ? await y2mateV(url) : await y2mateA(url)
    const OBJ = {
        titulo: Play[0].judul,
        link_youTube: url,
        tamanho: Play[0].size,
        foto: Play[0].thumb,
        url: Play[0].link,
        function_para_download_url: atalhos.function_para_download_url
    }
    return OBJ
}

module.exports = {
    ytDown,
}