// const buffer = Buffer.from(mediaObject.data, 'base64')
// if (Buffer.byteLength(buffer) >= 17000000) document = true
// if (Buffer.byteLength(buffer) <= 5000) return await texas.sendMessage(from, error, { quotedMessageId: mek })
// if (Buffer.byteLength(buffer) >= 60000000) return await texas.sendMessage(from, `A media encontrada possui mais que 60MB\nEscolha uma menor.`, { quotedMessageId: mek })

const fetch = require('node-fetch')
const cheerio = require('cheerio')

const y2mateV = async (yutub) => {
  try {
  function post(url, formdata) {
    return fetch(url, {
      method: 'POST',
      headers: {
        accept: "*/*",
        'accept-language': "en-US,en;q=0.9",
        'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: new URLSearchParams(Object.entries(formdata))
    })
  }
  const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
  let ytId = ytIdRegex.exec(yutub)
  url = 'https://youtu.be/' + ytId[1]
  let res = await post(`https://www.y2mate.com/mates/en68/analyze/ajax`, {
    url,
    q_auto: 0,
    ajax: 1
  })
  const mela = await res.json()
  const $ = cheerio.load(mela.result)
  const hasil = []
  let thumb = $('div').find('.thumbnail.cover > a > img').attr('src')
  let judul = $('div').find('.thumbnail.cover > div > b').text()
  let quality = $('div').find('#mp4 > table > tbody > tr:nth-child(4) > td:nth-child(3) > a').attr('data-fquality')
  let tipe = $('div').find('#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(3) > a').attr('data-ftype')
  let output = `${judul}.` + tipe
  let size = $('div').find('#mp4 > table > tbody > tr:nth-child(4) > td:nth-child(2)').text()
  let id = /var k__id = "(.*?)"/.exec(mela.result)[1]
  let res2 = await post(`https://www.y2mate.com/mates/en68/convert`, {
    type: 'youtube',
    _id: id,
    v_id: ytId[1],
    ajax: '1',
    token: '',
    ftype: tipe,
    fquality: 360
  })
  const meme = await res2.json()
  const supp = cheerio.load(meme.result)
  let link = supp('div').find('a').attr('href')
  hasil.push({ status: true, thumb, judul, quality, tipe, size, output, link })
  return hasil
} catch (e) {
  return [{ status: false }]
}
}


const y2mateA = async (yutub) => {
  try{
  function post(url, formdata) {
    return fetch(url, {
      method: 'POST',
      headers: {
        accept: "*/*",
        'accept-language': "en-US,en;q=0.9",
        'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: new URLSearchParams(Object.entries(formdata))
    })
  }
  const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
  let ytId = ytIdRegex.exec(yutub)
  url = 'https://youtu.be/' + ytId[1]
  let res = await post(`https://www.y2mate.com/mates/en68/analyze/ajax`, {
    url,
    q_auto: 0,
    ajax: 1
  })
  const mela = await res.json()
  const $ = cheerio.load(mela.result)
  const hasil = []
  let thumb = $('div').find('.thumbnail.cover > a > img').attr('src')
  let judul = $('div').find('.thumbnail.cover > div > b').text()
  let size = $('div').find('#mp3 > table > tbody > tr > td:nth-child(2)').text()
  let tipe = $('div').find('#mp3 > table > tbody > tr > td:nth-child(3) > a').attr('data-ftype')
  let output = `${judul}.` + tipe
  let quality = $('div').find('#mp3 > table > tbody > tr > td:nth-child(3) > a').attr('data-fquality')
  let id = /var k__id = "(.*?)"/.exec(mela.result)[1]
  let res2 = await post(`https://www.y2mate.com/mates/en68/convert`, {
    type: 'youtube',
    _id: id,
    v_id: ytId[1],
    ajax: '1',
    token: '',
    ftype: tipe,
    fquality: quality
  })
  const meme = await res2.json()
  const supp = cheerio.load(meme.result)
  let link = supp('div').find('a').attr('href')
  hasil.push({ status: true, thumb, judul, quality, tipe, size, output, link })
  return hasil
} catch (e) {
  return [{ status: false }]
}
}

const ytDown = async (url, type = "mp3") => {
  const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
  let ytId = ytIdRegex.exec(url)
  let res = await fetch(`https://api.vevioz.com/file/${type}/${ytId[1]}`)
  const html = await res.text()
  const $ = cheerio.load(html)

  let el = $('img').parent()
  let anchors = el.find('a')
  let anchorsHrefs = anchors.map((i, el) => {
    return $(el).attr('href')
  }
  ).get()
  for (let index = 0; index < 2; index++) {
    anchorsHrefs.pop()
  }

  return anchorsHrefs[anchorsHrefs.length - 1]
}


module.exports = {
  y2mateV,
  y2mateA,
  ytDown
}