/* eslint-disable @typescript-eslint/no-require-imports */

const puppeteer = require('puppeteer')
const { createClient } = require('@supabase/supabase-js')

const the_climbs = [
  { url: 'theclimb_sillim', name: 'the_climb_sillim', ko: '신림' },
  { url: 'theclimb_sinsa', name: 'the_climb_sinsa', ko: '신사' },
  { url: 'theclimb_magok', name: 'the_climb_magok', ko: '마곡' },
  { url: 'theclimb_sadang', name: 'the_climb_sadang', ko: '사당' },
  { url: 'theclimb_snu', name: 'the_climb_snu', ko: '서울대' },
  { url: 'theclimb_ilsan', name: 'the_climb_ilsan', ko: '일산' },
  { url: 'theclimb_yeonnam', name: 'the_climb_yeonnam', ko: '연남' },
  { url: 'theclimb_b_hongdae', name: 'the_climb_b_hongdae', ko: '홍대' },
  { url: 'theclimb_mullae', name: 'the_climb_mullae', ko: '문래' },
  { url: 'theclimb_isu', name: 'the_climb_isu', ko: '이수' },
  { url: 'theclimb_yangjae', name: 'the_climb_yangjae', ko: '양재' },
  { url: 'theclimb_gangnam', name: 'the_climb_gangnam', ko: '강남' },
  { url: 'theclimb_seongsu', name: 'the_climb_seongsu', ko: '성수' },
  { url: 'theclimb_nonhyeon', name: 'the_climb_nonhyeon', ko: '논현' },
]

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY,
// )

async function crawlNaverData() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
      protocolTimeout: 1000 * 60 * 10,
    })
    const page = await browser.newPage()
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    )
    await page.goto('https://www.instagram.com/accounts/login/', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })
    await page.waitForSelector('input[name="username"]')

    await page.type('input[name="username"]', 'ggyu_ppi')
    await page.type('input[name="password"]', 'as248651')

    await page.click('button[type="submit"]')

    const content = await page.content()
    console.log(content)

    await new Promise((resolve) => setTimeout(resolve, 10000))

    const i = await page.evaluate(() => {
      const imgElements = document.querySelectorAll('img')

      return {
        images: Array.from(imgElements, (img) => img.src),
        alt: Array.from(imgElements, (img) => img.alt),
      }
    })

    console.log(i)

    await page.waitForSelector('img[alt="ggyu_ppi님의 프로필 사진"]', {
      timeout: 100000,
    })

    console.log('done')
    await browser.close()
  } catch (error) {
    console.error(error)
  }
}

crawlNaverData()
