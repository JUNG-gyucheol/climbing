/* eslint-disable @typescript-eslint/no-require-imports */

const puppeteer = require('puppeteer')
// const { createClient } = require('@supabase/supabase-js')

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
      headless: 'new',
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

    const times = []
    for (const theClimb of the_climbs) {
      console.log('init', theClimb.ko)
      await page.goto(`https://map.naver.com/p/search/더클라임${theClimb.ko}`)
      await new Promise((resolve) => setTimeout(resolve, 5000))

      console.log('searchFrame', theClimb.ko)
      const searchFrame = await page.$('#searchIframe')
      console.log('searchFrame', searchFrame)
      const frame = await searchFrame?.contentFrame()
      console.log('frame', frame)
      if (frame) {
        console.log('inframe', theClimb.ko)
        await frame.evaluate(async (theClimb) => {
          const content = document.querySelectorAll('ul span')
          for (const span of content) {
            if (span.textContent?.includes(theClimb.ko)) {
              span.click()
              return
            }
          }
        }, theClimb)
        await new Promise((resolve) => setTimeout(resolve, 5000))
        const url = page.url()

        console.log('url', url)
        await page.goto(url)
        await new Promise((resolve) => setTimeout(resolve, 5000))
      }
      const EntryIFrame = await page.$('#entryIframe')
      const entryFrame = await EntryIFrame?.contentFrame()
      console.log('entryFrame', theClimb.ko)

      if (!entryFrame) {
        throw new Error('entryFrame not found')
      }

      console.log('climbingContent', theClimb.ko)
      const climbingContent = await entryFrame.evaluate(async () => {
        const content = document.querySelectorAll('em')
        const address = document.querySelectorAll(
          'div[class="place_section_content"] a',
        )
        console.log(address[0].innerText)
        content[0].click()
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const parentElement =
          content[0].parentElement?.parentElement?.parentElement
        const firstClass = parentElement?.classList[0]
        const children = document.querySelectorAll(`div[class="${firstClass}"]`)
        return {
          address: address[0].innerText,
          business_hours: Array.from(children).map((item) =>
            item.innerText.split('\n').splice(0, 2),
          ),
        }
      })
      // console.log('success!!', theClimb.ko)
      // await supabase
      //   .from('climbing_branch')
      //   .update({
      //     business_hours: climbingContent.business_hours,
      //   })
      //   .eq('branch', theClimb.ko)
      // console.log('success!', theClimb.ko)
      times.push(climbingContent)
    }
    console.log(times)
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    // await page.evaluate(() => {
    //   const content = document.querySelectorAll('span')
    //   return Array.from(content).map((item) => item.textContent)
    // })

    // console.log(content)
    await browser.close()
  } catch (error) {
    console.error(error)
  }
}

crawlNaverData()
