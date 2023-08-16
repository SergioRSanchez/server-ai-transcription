//  usamos ytdl-core(https://github.com/fent/node-ytdl-core), ferramenta que faz o download do vídeo do YT
import ytdl from 'ytdl-core';

//  fs é o file system, que é do próprio Node
import fs from 'fs'

export const downloader = (videoId) => new Promise((resolve, reject) => {
  const videoUrl = `https://youtube.com/watch?v=${videoId}`
  console.log('[START DOWNLOAD]', videoUrl)

  ytdl(videoUrl, {
    quality: 'lowestaudio',
    filter: 'audioonly'
  })
    .on('end', () => {
      console.log('[END DOWNLOAD]')
      resolve()
    })
    .on('error', () => {
      console.log('[ERROR]')
      reject('Error downloading video')
    })
    .pipe(fs.createWriteStream('audio.mp4'))
})