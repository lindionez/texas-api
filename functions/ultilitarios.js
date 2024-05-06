const biblia = require("biblia.js");
const chalk = require('chalk')

/**
 * Get text with color.
 * @param {string} text 
 * @param {string} [color] 
 */
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const randonAtalho = (atalho) => {
    const random = atalho[Math.floor(Math.random() * atalho.length)]
    return random
}

const startOnbiblia = () => {
    const vs = biblia.getRandomVersiculo()
    return console.log(color('[ START ]'), color(`📖 ${vs.nome} ${vs.capitulo}:${vs.versiculo}`, 'yellow'), ` ${vs.escrita}`)
}

module.exports = {
    color,
    randonAtalho,
    startOnbiblia
}