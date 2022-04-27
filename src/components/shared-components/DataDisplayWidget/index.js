import React from 'react'
import { Card, Avatar } from 'antd'
import Flex from '../Flex'
import CustomStatistic from '../CustomStatistic'

const DataDisplayWidget = props => {
	const { size, value, title, icon, color, avatarSize, vertical, cardClassName, centerCardBody, centerIcon } = props
	const customStatisticProps = { size, value, title }
	return (
		<Card className={cardClassName}
			bodyStyle={centerCardBody ? { display: "flex", justifyContent: "center", alignItems: "center", height: "100%" } : {}}
		>
			<Flex alignItems="center" flexDirection={vertical ? 'column' : 'row'}>
				<Avatar size={avatarSize} shape="square" icon={icon} className={`ant-avatar-${color}`} style={centerIcon ? { display: "flex", justifyContent: "center", alignItems: "center" } : {}} />
				<div className={vertical ? 'mt-3 text-center' : 'ml-3'}>
					<CustomStatistic {...customStatisticProps} />
				</div>
			</Flex>
		</Card>
	)
}

DataDisplayWidget.defaultProps = {
	avatarSize: 50,
	vertical: false
};

export default DataDisplayWidget
