/**
 * 今日の日付を取得・時刻を0:0:0に設定する
 */
export const getDateString = function (date: Date) {
  const todayString = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`
  return todayString
}

/**
 * 数字が1桁の場合は01のように0を追加して2桁に
 *
 * @param i 数字
 */
export const formatTime = (i: number | string) => {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

/**
 * 経過秒数をhh:mm:ssの時間表記に変換
 *
 * @param i 秒数
 * @param type 時間（hour）または分(minutes)
 */
export const printTime = (i: number, type: string) => {
  let time
  if (type == 'hour') {
    const hour = formatTime(Math.floor(i / 3600))
    const minute = formatTime(Math.floor((i % 3600) / 60))
    const sec = formatTime(i % 60)
    time = `${hour}:${minute}:${sec}`
  } else if (type == 'minutes') {
    const minute = formatTime(Math.floor(i / 60))
    const sec = formatTime(i % 60)
    time = `${minute}:${sec}`
  }
  return time
}

/**
 * LocalStorage
 *
 * @param key
 */
export function getItem(key: string) {
  const value = localStorage.getItem(key)
  if (value !== null) {
    return value
  }
  return ''
}

export function removeItem(key: string) {
  localStorage.removeItem(key)
}

export function setItem(key: string, value: any) {
  localStorage.setItem(key, value)
}
