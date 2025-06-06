import puppeteer from 'puppeteer'
import OpenAI from 'openai'
import { NextResponse } from 'next/server'
import { the_climbs } from '@/utils/climbs'
import { supabase } from '@/client/client'
import { SettingSchedule } from '@/types/theClimbTypes'
import dayjs from 'dayjs'

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

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

    const formatedDataa = []
    const gptResponse = []
    for (let i = 0; i < the_climbs.length; i++) {
      await page.goto(`https://www.instagram.com/${the_climbs[i].url}/`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })

      // const title = await page.title();
      // 스크롤 함수 추가
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

      /**
       *  포스트 데이터 포맷팅(문제풀이 / 카탈로그 게시물 제거)
       */
      const formatedData = images.images
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

      formatedDataa.push(formatedData)

      const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: `당신은 친근하고 다정한 어투로 대화하는 AI 어시스턴트입니다. 답변은 아무말도 하지 않고 아래와 같이 JSON 형식으로만 해주세요.
              달력안에 색상이 있는 곳이 셋팅날짜입니다.(색상이 조금만 달라도 셋팅날짜 입니다.), 제발 아래 양식 맞춰서 정리해서 답변해주세요. 셋팅 날짜가 여러개 빠져있는데 이미지를 더 자세하게 봐주세요.
              답변하기전에 한 번만 더 확인해주세요.
  
              현재연도는 2025년입니다.
              이미지에서 볼더링 셋팅 날짜를 찾아서 반드시 아래와 같은 유효한 JSON 형식으로만 응답해주세요:
              {
                month: "현재연도-셋팅달력 달(month)",
                setting_date: [
                  {date: "날짜1", color: "색상", "wall": "벽이름1"}, 
                  {date: "날짜2", color: "색상", "wall": "벽이름2"}
                ]
              }
  
              예시:
              {
                "month": "현재연도-02",
                "setting_date": [
                    {"date": "현재연도-02-01", "color": "노랑", "wall": "벽이름1"},
                    {"date": "현재연도-02-02", "color": "노랑", "wall": "벽이름2"}
                ]
              }
              `,
          },
          {
            role: 'user',
            name: 'ggyu',
            content: [
              {
                type: 'text',
                text: '컬러가 있는 부분이 셋팅하는 날짜야! 나는 셋팅하는 날짜를 알고 싶어, 셋팅하는 날짜색상과 달력 아래에 있는 동일한 벽 색상을 찾아서 정리해줘! 답변하기전에 한 번만더 확인해줘',
              },
              {
                type: 'image_url',
                image_url: {
                  url: formatedData[0].image,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
      })

      const content = response.choices[0].message.content
      let settingInfo: SettingSchedule | null = null
      try {
        settingInfo = JSON.parse(content as string)
      } catch (e) {
        console.error('Failed to parse GPT response:', e)
      }
      console.log(settingInfo)

      const { data: branchData } = await supabase
        .from('climbing_branch')
        .select(`id`)
        .eq('branch', the_climbs[i].ko)
        .eq('brand', '더클라임')

      if (branchData) {
        const { data: existingData } = await supabase
          .from('setting_info')
          .select()
          .eq('branch_id', branchData[0].id)
          .eq(
            'setting_date',
            dayjs(settingInfo?.month).add(9, 'hour').toISOString(),
          )

        if (existingData) {
          const { error } = await supabase.from('setting_info').insert({
            branch_id: branchData[0].id,
            brand: '더클라임',
            infos: settingInfo?.setting_date,
            setting_date: dayjs(settingInfo?.month)
              .add(9, 'hour')
              .toISOString(),
          })
          if (error) {
            console.error('Failed to insert setting info:', error)
          }
        }
      }

      gptResponse.push(response)
      if (i + 1 === the_climbs.length) {
        await browser.close()
        return NextResponse.json({ success: true, formatedDataa })
      }
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
