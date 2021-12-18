import React from 'react'
import { Timeline, Card, Avatar } from 'antd';

const data = [{ id: 1, name: "Giann", action: "Created list for ayuda.", color: "green", date: "10-11-2021" },
{ id: 2, name: "Giann", action: "Deleted 5 users.", color: "red", date: "10-16-2021" },
{ id: 3, name: "Rojhon", action: "Edited mothly funds for October 2021.", color: "blue", date: "10-21-2021" },
{ id: 4, name: "Von", action: "Created list for good employees for this month.", color: "green", date: "10-21-2021" },
{ id: 2, name: "Giann", action: "Deleted 2 documents.", color: "red", date: "10-16-2021" },
{ id: 2, name: "Giann", action: "Deleted 5 users.", color: "red", date: "10-16-2021" },
{ id: 3, name: "Rojhon", action: "Edited mothly funds for October 2021.", color: "blue", date: "10-21-2021" },
{ id: 4, name: "Von", action: "Created list for good employees for this month.", color: "green", date: "10-21-2021" },
{ id: 2, name: "Giann", action: "Deleted 2 documents.", color: "red", date: "10-16-2021" },
{ id: 2, name: "Giann", action: "Deleted 5 users.", color: "red", date: "10-16-2021" },
{ id: 3, name: "Rojhon", action: "Edited mothly funds for October 2021.", color: "blue", date: "10-21-2021" },
{ id: 4, name: "Von", action: "Created list for good employees for this month.", color: "green", date: "10-21-2021" },
{ id: 2, name: "Giann", action: "Deleted 2 documents.", color: "red", date: "10-16-2021" },
{ id: 2, name: "Giann", action: "Deleted 5 users.", color: "red", date: "10-16-2021" },
{ id: 3, name: "Rojhon", action: "Edited mothly funds for October 2021.", color: "blue", date: "10-21-2021" },
{ id: 4, name: "Von", action: "Created list for good employees for this month.", color: "green", date: "10-21-2021" },
{ id: 2, name: "Giann", action: "Deleted 2 documents.", color: "red", date: "10-16-2021" },]

const index = () => {
    return (
        <div>
            <h1>Audit/Session</h1>
            <Card>
                <Timeline>
                    {data.map((user) => (
                        <Timeline.Item color={user.color}>
                            <h4>
                                <img
                                    style={{ height: "25px", width: "25px", marginRight: "5px"}}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                
                                />
                                {user.name}
                            </h4>
                            {user.date} - {user.action}

                        </Timeline.Item>
                    ))}
                </Timeline>
            </Card>
        </div>
    )
}

export default index
