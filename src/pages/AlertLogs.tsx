import { Card, Result } from 'antd'
import { WarningOutlined } from '@ant-design/icons'

export default function AlertLogs() {
  return (
    <Card
      className="dashboard-card"
      style={{ minHeight: 'calc(100vh - 112px)' }}
    >
      <div className="card-border" />
      <Result
        icon={<WarningOutlined style={{ color: '#ff4d4f' }} />}
        title="警报日志"
        subTitle="该页面正在开发中，敬请期待..."
        status="info"
      />
    </Card>
  )
}
