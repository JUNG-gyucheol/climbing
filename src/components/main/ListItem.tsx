import { TheClimbBranch } from '@/types/theClimbTypes'
import Logo from './logo'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { formatDays } from '@/utils/formatDays'

const ListItem: React.FC<{
  branch: TheClimbBranch
}> = ({ branch }) => {
  const [todayBusinessHours, setTodayBusinessHours] = useState<string[]>()

  useEffect(() => {
    const result = branch.business_hours
      .map((hour) => {
        if (dayjs().get('day') === formatDays(hour[0])) {
          return hour
        }
      })
      .filter((hour) => hour !== undefined)

    setTodayBusinessHours(result[0])
  }, [branch])

  return (
    <div className="border-charcoal-200 flex items-center gap-[10px] rounded-[10px] border-[1px] bg-yellow-100 px-[15px] py-[8px]">
      <div className="flex shrink-0">
        <Logo branchName={branch.branch} width={70} height={70} />
      </div>
      <div>
        <div className="font-pretendard text-[14px] font-[700] text-green-300">
          {branch.branch}
        </div>
        <div className="font-pretendard text-[12px] leading-3.5 font-[700] text-green-300">
          {branch.address}
        </div>
        <div className="font-pretendard text-[12px] leading-3.5 font-[700] text-green-300">
          {todayBusinessHours ? (
            <span>
              {todayBusinessHours?.[0]} {todayBusinessHours?.[1]}
            </span>
          ) : (
            <span>영업시간 정보가 없습니다.</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListItem
