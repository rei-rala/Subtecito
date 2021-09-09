export const timeStampToDate = (timestamp) => {
  const date = new Date(timestamp * 1000)

  const dUpd = {
    DD: ('0' + date.getDate().toString()).slice(-2),
    MM: ('0' + (date.getMonth() + 1).toString()).slice(-2),
    YYYY: date.getFullYear(),
    hh: ('0' + date.getHours().toString()).slice(-2),
    mm: ('0' + date.getMinutes().toString()).slice(-2),
    ss: ('0' + date.getSeconds().toString()).slice(-2),
    full: {
      date: null,
      time: null,
      full: null
    }
  }
  dUpd.full.date = `${dUpd.DD}/${dUpd.MM}/${dUpd.YYYY}`
  dUpd.full.time = `${dUpd.hh}:${dUpd.mm}:${dUpd.ss}`
  dUpd.full.full = `${dUpd.DD}/${dUpd.MM}/${dUpd.YYYY} ${dUpd.hh}:${dUpd.mm}:${dUpd.ss}`

  return dUpd
}