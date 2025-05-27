import puppeteer from 'puppeteer'
import { NextResponse } from 'next/server'
import { the_climbs } from '@/utils/climbs'
import dayjs from 'dayjs'
import path from 'path'
import fs from 'fs'

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
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

    await page.type(
      'input[name="username"]',
      process.env.NEXT_PUBLIC_INSTAGRAM_ID as string,
    )
    await page.type(
      'input[name="password"]',
      process.env.NEXT_PUBLIC_INSTAGRAM_PASSWORD as string,
    )

    await page.click('button[type="submit"]')

    await page.waitForSelector('img[alt="ggyu_ppi님의 프로필 사진"]', {
      timeout: 100000,
    })

    for (let i = 0; i < the_climbs.length; i++) {
      await page.goto(`https://www.instagram.com/${the_climbs[i].url}/`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })

      // 컨텐츠 로드를 위해 잠시 대기
      await page.evaluate(async () => {
        const delay = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms))

        for (let i = 0; i < 1; i++) {
          // 3번 스크롤
          window.scrollTo(0, document.body.scrollHeight)
          await delay(5000) // 1.5초 대기
        }
      })

      // 컨텐츠 로드를 위해 잠시 대기
      await page.waitForSelector('img', { timeout: 10000 })

      // await page.waitForSelector('img', { timeout: 5000 });
      const images = await page.evaluate(() => {
        const imgElements = document.querySelectorAll('img')

        return {
          images: Array.from(imgElements, (img) => img)
            .filter((img) => !img.src.includes('150x150'))
            .slice(1)
            .map((img) => img.src),
          description: Array.from(imgElements, (img) => img)
            .filter((img) => !img.src.includes('150x150'))
            .slice(1)
            .map((img) => img.alt),
        }
      })

      let formatedData = images.images
        .map((image, index) => {
          const settingRegex = /SETTINGSCHEDULE|SCHEDULE/i
          const description = images.description[index] || ''
          if (!settingRegex.test(description)) return null
          return {
            description: images.description[index],
            image: image,
          }
        })
        .filter((item) => item !== null)

      console.log(formatedData)
      if (formatedData.length === 0) {
        await page.evaluate(async () => {
          const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms))

          for (let i = 0; i < 1; i++) {
            window.scrollTo(0, document.body.scrollHeight)
            await delay(5000)
          }
        })

        // 컨텐츠 로드를 위해 잠시 대기
        await page.waitForSelector('img', { timeout: 10000 })

        const images = await page.evaluate(() => {
          const imgElements = document.querySelectorAll('img')

          return {
            images: Array.from(imgElements, (img) => img)
              .filter((img) => !img.src.includes('150x150'))
              .slice(1)
              .map((img) => img.src),
            description: Array.from(imgElements, (img) => img)
              .filter((img) => !img.src.includes('150x150'))
              .slice(1)
              .map((img) => img.alt),
          }
        })

        formatedData = images.images
          .map((image, index) => {
            const settingRegex = /SETTINGSCHEDULE|SCHEDULE/i
            const description = images.description[index] || ''
            if (!settingRegex.test(description)) return null
            return {
              description: images.description[index],
              image: image,
            }
          })
          .filter((item) => item !== null)
      }
      const response = await fetch(formatedData[0].image)
      const buffer = await response.arrayBuffer()
      const fileName = `${dayjs().format('YYYY-MM')}_${the_climbs[i].ko}_wall.png`
      const publicPath = './public/schedules'

      if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath, { recursive: true })
      }

      const filePath = path.join(publicPath, fileName)
      if (fs.existsSync(filePath)) {
        console.log(`Overwriting existing file: ${filePath}`)
      }

      fs.writeFileSync(filePath, Buffer.from(buffer), { flag: 'w' })
      console.log(`Schedule image saved to: ${filePath}`)
    }

    //   await browser.close();
    // console.log(content)
    // return NextResponse.json({ message: content })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
