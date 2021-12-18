import { COLORS } from 'constants/ChartConstant';


export const sessionColor = [COLORS[0], COLORS[1], COLORS[3], COLORS[5]]
export const sessionData = [22, 4, 13, 6]
export const sessionLabels = ['Settled', 'Scheduled', 'Unscheduled', 'Unsettled']
const jointSessionData = () => {
	let arr = []
	for (let i = 0; i < sessionData.length; i++) {
		const data = sessionData[i];
		const label = sessionLabels[i];
		const color = sessionColor[i]
		arr = [...arr, {
			data: data,
			label: label,
			color: color
		}]
	}
	return arr
}
export const conbinedSessionData = jointSessionData()


export const BlotterReportMost = [
	{
    title: 'Rape',
    update:'Last 10 Mins ago',
    amount: 7616
  },
  {
    title: 'Assault ',
    update:'Last 10 Mins ago',
    amount: 6923
  },
  {
    title: 'Carnap',
    update:'Last 6 Hrs ago',
    amount: 5228
  },
  {
    title: 'Reverse Rape',
    update:'Last 42 Mins ago',
    amount: 3512
  },
  {
    title: 'Gun War HEHE',
    update:'Last 14 Mins ago',
    amount: 1707
  }
]