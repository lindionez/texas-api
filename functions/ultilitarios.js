const randonAtalho = (atalho) => {
const random = atalho[Math.floor(Math.random() * atalho.length)]
return random
}

module.exports = {
    randonAtalho
}