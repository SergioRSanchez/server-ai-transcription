//  usamos o ffmpeg-static e fluent-ffmpeg (https://creatomate.com/blog/how-to-use-ffmpeg-in-nodejs), famosas ferramentas de tratamento de vídeo usadas na programação
//  com ela podemos converter vídeos em áudio, fazer edições de vídeo, etc...
import ffmpegStatic from 'ffmpeg-static'
import ffmpeg from 'fluent-ffmpeg'

export const createMP3 = () => new Promise((resolve, reject) => {
  // Tell fluent-ffmpeg where it can find FFmpeg
  ffmpeg.setFfmpegPath(ffmpegStatic);

  // Run FFmpeg
  ffmpeg()

    // Input file
    .input('audio.mp4')

    // Audio bit rate
    .outputOptions('-ab', '20k')

    // Output file
    .saveToFile('audio.mp3')

    // Log the percentage of work completed
    .on('progress', (progress) => {
      if (progress.percent) {
        console.log(`Processing: ${Math.floor(progress.percent)}% done`);
      }
    })

    // The callback that is run when FFmpeg is finished
    .on('end', () => {
      console.log('FFmpeg has finished.');
      resolve()
    })

    // The callback that is run when FFmpeg encountered an error
    .on('error', (error) => {
      console.error(error);
      reject('Error converting audio: ', error)
    });
})