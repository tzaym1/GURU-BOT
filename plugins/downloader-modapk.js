import {search, download} from 'aptoide-scraper';
const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {
 if (!text) throw `*[❗] Type the app name you search about.*`;
  try {    
    const searchA = await search(text);
    const data5 = await download(searchA[0].id);
    let response = `📲 *Downloading App* 📲\n\n📌 *Name:* ${data5.name}\n📦 *Package:* ${data5.package}\n🕒 *Last Update:* ${data5.lastup}\n📥 *Size:* ${data5.size}`
    await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
 if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
      return await conn.sendMessage(m.chat, {text: '*[ ⛔ ] This archive is too large.*'}, {quoted: m});
    }
    await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m});
  } catch {
    throw `*[❗] Error, try again later.*`;
  }    
};
handler.command = /^(apk|modapk|dapk2|aptoide|aptoidedl)$/i;
export default handler;
