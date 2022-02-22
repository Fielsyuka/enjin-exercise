/**
 * 今日の日付を取得・時刻を0:0:0に設定する
 */
export const getTodayDate = function () {
  const today = new Date()
  today.setHours(0, 0, 0)
  return today
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
 */
export const printTime = (i: number) => {
  const hour = formatTime(Math.floor(i / 3600))
  const minute = formatTime(Math.floor(i / 60))
  const sec = formatTime(i % 60)
  const time = `${hour}:${minute}:${sec}`
  return time
}
