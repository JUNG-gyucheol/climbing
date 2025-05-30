'use client'

import { TheClimbBranch, TodaySetting } from '@/types/theClimbTypes'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

import SwiperNotice from './SwiperNotice'
import dayjs from 'dayjs'
import BranchList from './branchList'
import ClimbInfo from './climbInfo'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

function Main() {
  const [theClimbs, setTheClimbs] = useState<TheClimbBranch[]>()
  const [todaySetting, setTodaySetting] = useState<TodaySetting[]>()
  const [selectedBranch, setSelectedBranch] = useState<TheClimbBranch>()

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase
        .from('climbing_branch')
        .select(
          `
        *,
       setting_info(*)
      `,
        )
        .gte(
          'setting_info.setting_date',
          dayjs().subtract(2, 'month').startOf('day').toISOString(),
        )

      console.log(data)
      setTheClimbs(data as TheClimbBranch[])
    })()
  }, [])

  useEffect(() => {
    if (theClimbs) {
      const res = theClimbs
        .map((branch) => {
          const todaySettingInfo = branch.setting_info.map((info) => {
            // 당일 셋팅하는 날짜 찾기
            const tempTodaySettingInfo = info.infos?.find((info) => {
              if (dayjs().format('YYYY-MM-DD') === info.date) {
                return true
              }
            })
            return tempTodaySettingInfo
          })
          return { branchName: branch.branch, today: todaySettingInfo[0] }
        })
        .filter((branch) => {
          return branch.today
        })
      setTodaySetting(res)
    }
  }, [theClimbs])

  useEffect(() => {
    if (theClimbs) {
      setSelectedBranch(theClimbs[0])
    }
  }, [theClimbs])

  // useEffect(() => {
  //   fetch('/api/naver')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //     })
  // }, [])

  // useEffect(() => {
  //   fetch('/api/test')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }, [])

  // useEffect(() => {
  //   console.log('ASdsad')
  //   fetch('/api/download')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }, [])

  useEffect(() => {
    fetch('/api/download/schedule')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  // useEffect(() => {
  //   fetch('/api/gpt')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }, [])

  return (
    <div className="flex w-full max-w-[600px] flex-col items-center justify-center">
      <div className="relative w-[300px] text-center">
        <div className="font-heavier text-[34px] font-normal text-yellow-200">
          <span>CLIMBING</span>
        </div>
      </div>
      <div className="mt-[12px] flex w-full max-w-[600px] flex-col flex-wrap justify-center gap-4">
        <section>
          <div className="px-[10px]">
            <span className="font-heavier text-[18px] text-yellow-200">
              Today{"'"}s Setting
            </span>
          </div>
          <SwiperNotice todaySetting={todaySetting} onClickLogo={() => {}} />
        </section>
      </div>
      <div className="mt-[10px] w-full px-[10px]">
        <BranchList
          theClimbs={theClimbs}
          onClickBranch={(branch) => {
            setSelectedBranch(branch)
          }}
        />
      </div>
      <div className="mt-[40px] flex w-full max-w-[600px] flex-col flex-wrap justify-center gap-4">
        <section>
          <div className="px-[10px]">
            {selectedBranch && <ClimbInfo branch={selectedBranch} />}
          </div>
          <div></div>
        </section>
      </div>
    </div>
  )
}

export default Main
