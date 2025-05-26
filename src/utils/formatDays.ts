export const formatDays = (day: string) => {
  switch (day) {
    case '일':
      return 0
    case '월':
      return 1
    case '화':
      return 2
    case '수':
      return 3
    case '목':
      return 4
    case '금':
      return 5
    case '토':
      return 6
    default:
      return 0
  }
}
export const formatDayToString = (day: number) => {
  switch (day) {
    case 0:
      return '일'
    case 1:
      return '월'
    case 2:
      return '화'
    case 3:
      return '수'
    case 4:
      return '목'
    case 5:
      return '금'
    case 6:
      return '토'
    default:
      return '일'
  }
}
