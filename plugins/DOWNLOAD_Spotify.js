/* Creditos de los tags a @darlyn1234 */
import fetch from 'node-fetch';
import Spotify from 'spotifydl-x';
import fs from 'fs';
import NodeID3 from 'node-id3';
import axios from 'axios';

const credentials = {
  clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
  clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009',
};
const spotify = new Spotify.default(credentials);

const handler = async (m, {conn, text}) => {
  if (!text) throw `*[❗] Inserisci il nome di una canzone da Spotify.*`;
  try {
    const resDL = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${lolkeysapi}&query=${text}`);
    const jsonDL = await resDL.json();
    const linkDL = jsonDL.result[0].link;
    const spty = await spotifydl(linkDL);
    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
    };
    const randomName = getRandom('.mp3');
    const filePath = `./tmp/${randomName}`;
    const artist = spty.data.artists.join(', ') || '-';
    const tags = {
      title: spty.data.name || '-',
      artist: artist,
      album: spty.data.album_name || '-',
      year: spty.data.release_date || '-',
      genre: '-',
      comment: {
        language: 'spa',
        text: '🤴🏻 вσтωнαιтα є∂ιт ƒαвяι115© 🤖',
      },
      unsynchronisedLyrics: {
        language: 'spa',
        text: '🤴🏻 вσтωнαιтα є∂ιт ƒαвяι115© 🤖',
      },
      image: {
        mime: 'image/jpeg',
        type: {
          id: 3,
          name: 'front cover',
        },
        description: 'Spotify Thumbnail',
        imageBuffer: await axios.get(spty.data.cover_url, {responseType: 'arraybuffer'}).then((response) => Buffer.from(response.data, 'binary')),
      },
      mimetype: 'image/jpeg',
      copyright: 'Copyright Darlyn ©2023',
    };
    
    await fs.promises.writeFile(filePath, spty.audio);
    await NodeID3.write(tags, filePath);
      async function loading() {
      var hawemod = [
      "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "《 ████▒▒▒▒▒▒▒▒》30%",
      "《 ███████▒▒▒▒▒》50%",
      "《 ██████████▒▒》80%",
      "《 ████████████》100%"
      ]
            let { key } = await conn.sendMessage(m.chat, {text: `*☠ ¡¡CARICAMENTO!! ☠*`}, {quoted: m})
       for (let i = 0; i < hawemod.length; i++) {
         await new Promise(resolve => setTimeout(resolve, 1000)); 
         await conn.sendMessage(m.chat, {text: hawemod[i], edit: key}, {quoted: m}); 
       }}
      loading()    
    const spotifyi = `❒═════❬ 𝐒𝐏𝐎𝐓𝐈𝐅𝐘 ❭═════╾❒\n┬\n├‣✨ *TÍTOLO:* ${spty.data.name}\n┴\n┬\n├‣🗣️ *ARTISTA:* ${spty.data.artists}\n┴\n┬\n├‣🌐 *𝚄𝚁𝙻*: ${linkDL}\n┴`;
    await conn.sendFile(m.chat, spty.data.cover_url, 'error.jpg', spotifyi, m);
    await conn.sendMessage(m.chat, {audio: fs.readFileSync(`./tmp/${randomName}`), fileName: `${spty.data.name}.mp3`, mimetype: 'audio/mpeg'}, {quoted: m});
  } catch (error) {
    console.error(error);
    throw '*[❗] Errore.*';
  }
}
handler.command = /^(spotify|music)$/i;
export default handler;

async function spotifydl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await spotify.getTrack(url);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Tempo esaurito'));
        }, 300000);
      });
      const audioPromise = spotify.downloadTrack(url);
      const audio = await Promise.race([audioPromise, timeoutPromise]);
      resolve({data: res, audio});
    } catch (error) {
      reject(error);
    }
  });
}
