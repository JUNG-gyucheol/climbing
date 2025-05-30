export const the_climbs = [
  // { url: 'theclimb_sillim', name: 'the_climb_sillim', ko: '신림' },
  // { url: 'theclimb_sinsa', name: 'the_climb_sinsa', ko: '신사' },
  // { url: 'theclimb_magok', name: 'the_climb_magok', ko: '마곡' },
  // { url: 'theclimb_sadang', name: 'the_climb_sadang', ko: '사당' },
  // { url: 'theclimb_snu', name: 'the_climb_snu', ko: '서울대' },
  // { url: 'theclimb_ilsan', name: 'the_climb_ilsan', ko: '일산' },
  // { url: 'theclimb_yeonnam', name: 'the_climb_yeonnam', ko: '연남' },
  // { url: 'theclimb_b_hongdae', name: 'the_climb_b_hongdae', ko: '홍대' },
  // { url: 'theclimb_mullae', name: 'the_climb_mullae', ko: '문래' },
  // { url: 'theclimb_isu', name: 'the_climb_isu', ko: '이수' },
  { url: 'theclimb_yangjae', name: 'the_climb_yangjae', ko: '양재' },
  { url: 'theclimb_gangnam', name: 'the_climb_gangnam', ko: '강남' },
  { url: 'theclimb_seongsu', name: 'the_climb_seongsu', ko: '성수' },
  { url: 'theclimb_nonhyeon', name: 'the_climb_nonhyeon', ko: '논현' },
]

export const getImages = (branch: string) => {
  switch (branch) {
    case '신림':
      return `/images/${the_climbs[0].name}_logo.png`
    case '신사':
      return `/images/${the_climbs[1].name}_logo.png`
    case '마곡':
      return `/images/${the_climbs[2].name}_logo.png`
    case '사당':
      return `/images/${the_climbs[3].name}_logo.png`
    case '서울대':
      return `/images/${the_climbs[4].name}_logo.png`
    case '일산':
      return `/images/${the_climbs[5].name}_logo.png`
    case '연남':
      return `/images/${the_climbs[6].name}_logo.png`
    case '홍대':
      return `/images/${the_climbs[7].name}_logo.png`
    case '문래':
      return `/images/${the_climbs[8].name}_logo.png`
    case '이수':
      return `/images/${the_climbs[9].name}_logo.png`
    case '양재':
      return `/images/${the_climbs[10].name}_logo.png`
    case '강남':
      return `/images/${the_climbs[11].name}_logo.png`
    case '성수':
      return `/images/${the_climbs[12].name}_logo.png`
    case '논현':
      return `/images/${the_climbs[13].name}_logo.png`
    default:
      return ''
  }
}
