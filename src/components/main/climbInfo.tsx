import { TheClimbBranch } from '@/types/theClimbTypes'
import { useRef } from 'react'
import Logo from './logo'
import SettingImage from './SettingImage'

const ClimbInfo: React.FC<{
  branch: TheClimbBranch
}> = ({ branch }) => {
  // const [, setTodayBusinessHours] = useState<string[]>()
  // const [businessHours, setBusinessHours] = useState<(string | number)[][]>()
  const ref = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const result = branch.business_hours
  //     .map((hour) => {
  //       if (dayjs().get('day') === formatDays(hour[0])) {
  //         return hour
  //       }
  //     })
  //     .filter((hour) => hour !== undefined)

  //   const sortedBusinessHours = branch.business_hours
  //     .map((hour) => {
  //       return [formatDays(hour[0]), hour[1]]
  //     })
  //     .sort((a, b) => {
  //       const dayA = (a[0] as number) === 0 ? 7 : (a[0] as number)
  //       const dayB = (b[0] as number) === 0 ? 7 : (b[0] as number)
  //       return dayA - dayB
  //     })

  //   setBusinessHours(sortedBusinessHours)
  //   setTodayBusinessHours(result[0])
  // }, [branch])

  return (
    <div
      ref={ref}
      className="border-charcoal-200 rounded-[10px] border-[1px] bg-yellow-100 px-[15px] py-[8px]">
      <div className="flex items-center justify-center gap-[20px]">
        <div className="flex shrink-0 flex-col items-center justify-center gap-[5px]">
          <Logo branchName={branch.branch} width={100} height={100} />
          <div className="font-pretendard text-[14px] font-[700] text-green-300">
            {branch.brand} {branch.branch}점
          </div>
          <div className="font-pretendard w-[200px] text-center text-[12px] leading-3.5 font-[700] text-green-300">
            {branch.address}
          </div>
        </div>
        <div>
          <span className="font-pretendard text-[14px] font-bold text-green-300">
            영업시간
          </span>
          <div className="font-pretendard flex flex-col gap-[4px] text-[12px] leading-3.5 font-[700] text-green-300">
            {branch ? (
              branch.business_hours.map((hour, index) => {
                return <span key={`${hour[0]}-${index}`}>{hour.join(' ')}</span>
              })
            ) : (
              <span>영업시간 정보가 없습니다.</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-[12px] flex justify-center">
        <div>
          <span className="font-pretendard text-[14px] font-bold text-green-300"></span>
          <div className="flex flex-col gap-[4px]">
            <div className="flex gap-[4px]">
              {branch.setting_info.slice(0, 2).map((v, idx, arr) => {
                if (!v.infos || v.infos.length === 0) return null
                return (
                  <SettingImage
                    key={`${v.setting_date}-${v.infos}`}
                    branch={v}
                    branchName={branch.branch}
                    ref={ref}
                    length={arr.filter((a) => a).length}
                    idx={idx}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClimbInfo
