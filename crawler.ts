// eslint-disable-next-line @typescript-eslint/no-require-imports
const cron = require('node-cron')
// import { crawlNaverData } from '../src/app/api/naver/crawler' // 크롤링 로직을 분리된 파일로 이동

// 매일 자정에 실행
cron.schedule('* * * * *', async () => {
  console.log('Starting crawler job:', new Date().toISOString())
  try {
    // await crawlNaverData()
    console.log('Crawler job completed successfully')
  } catch (error) {
    console.error('Crawler job failed:', error)
  }
})

console.log('Crawler scheduler started')
