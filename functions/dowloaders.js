const axios = require('axios')

exports.youtube = async(url,type) => {
    return new Promise((resolve, reject) => {
      const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:|watch\?.*(?:|\&)v=|embed\/|v\/|shorts\/)|youtu\.be\/)([-_0-9A-Za-z]{11}|[-_0-9A-Za-z]{10})/;
      if (ytIdRegex.test(url)) {
      const iconfig = {
          q: ytIdRegex.exec(url), 
          vt: "home",
      }
      axios.request("https://yt1s.com/api/ajaxSearch/index",{
          method: "post",
          data: new URLSearchParams(Object.entries(iconfig)),
          headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
          }}).then(async(gdata) => {
          const cconfig = {
              vid: gdata.data.vid,
              k: type === "mp3" ? gdata.data.links.mp3["mp3128"]["k"] : gdata.data.links.mp4["135"]["k"],
          }
          const { data } = await axios.request("https://yt1s.com/api/ajaxConvert/convert",{
              method: "post",
              data: new URLSearchParams(Object.entries(cconfig)),
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                  "Cookie": "__atuvc=2|26; __atssc=google;2",
              }})
          const result = {
              titulo: data.title,
              nome: gdata.data.a,
              id: data.vid,
              formato: type === "mp3" ? "mp3" : "mp4",
              qualidade: type === "mp3" ? gdata.data.links.mp3.mp3128.q : gdata.data.links.mp4["135"].q,
              tamanho: type === "mp3" ? gdata.data.links.mp3["mp3128"].size : gdata.data.links.mp4["135"].size,
              foto: `https://i.ytimg.com/vi/${data.vid}/0.jpg`,
              url: data.dlink,
          };
          resolve(result)
      }).catch("Error")
      } else resolve({ error: true, })
  })
  }