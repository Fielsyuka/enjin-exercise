/**
 * 今日の日付を取得・時刻を0:0:0に設定する
 */
export const getTodayDate = function () {
  const today = new Date()
  today.setHours(0, 0, 0)
  return today
}
