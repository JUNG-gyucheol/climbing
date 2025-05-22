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
