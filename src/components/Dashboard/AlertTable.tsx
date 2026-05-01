import React, { useState, useEffect } from 'react'
import { Tag } from 'antd'
import { mockAlerts, AlertItem } from '@/mock'

const AlertTable: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([])

  useEffect(() => {
    const showAlerts = mockAlerts.slice(0, 3)
    const doubledAlerts = [...showAlerts, ...showAlerts]
    setAlerts(doubledAlerts)
  }, [])

  const getLevelColor = (level: string) => {
    if (level === 'high') return '#ff4d4f'
    if (level === 'medium') return '#ffd700'
    return '#8892b0'
  }

  const getLevelText = (level: string) => {
    if (level === 'high') return '高'
    if (level === 'medium') return '中'
    return '低'
  }

  const getStatusColor = (text: string) => {
    if (text.includes('已拦截') || text.includes('已隔离') || text.includes('已处理')) {
      return '#64ffda'
    } else if (text.includes('紧急') || text.includes('中')) {
      return '#ffd700'
    }
    return '#8892b0'
  }

  return (
    <div
      style={{
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <style>
        {`
          @keyframes scrollTable {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
          .alert-scroll-container {
            animation: scrollTable 25s linear infinite;
          }
          .alert-scroll-container:hover {
            animation-play-state: paused;
          }
          .alert-table-header {
            display: grid;
            grid-template-columns: 70px 50px 1fr 70px;
            background: rgba(24, 59, 86, 0.95);
            border-bottom: 1px solid rgba(100, 255, 218, 0.3);
            padding: 6px 4px;
            position: sticky;
            top: 0;
            z-index: 10;
          }
          .alert-table-header-item {
            color: #64ffda;
            font-size: 10px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .alert-table-row {
            display: grid;
            grid-template-columns: 70px 50px 1fr 70px;
            border-bottom: 1px solid rgba(100, 255, 218, 0.1);
            padding: 5px 4px;
            align-items: center;
          }
          .alert-table-row:hover {
            background: rgba(100, 255, 218, 0.1);
          }
          .alert-table-cell {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}
      </style>

      <div className="alert-table-header">
        <div className="alert-table-header-item">时间</div>
        <div className="alert-table-header-item">级别</div>
        <div className="alert-table-header-item">类型</div>
        <div className="alert-table-header-item">状态</div>
      </div>

      <div className="alert-scroll-container">
        {alerts.map((alert, index) => (
          <div key={`${alert.id}-${index}`} className="alert-table-row">
            <div className="alert-table-cell">
              <span style={{ color: '#64ffda', fontSize: 10, fontFamily: 'monospace' }}>
                {alert.time}
              </span>
            </div>
            <div className="alert-table-cell">
              <Tag
                style={{
                  margin: 0,
                  fontSize: 9,
                  padding: '0px 4px',
                  border: `1px solid ${getLevelColor(alert.level)}`,
                  background: alert.level === 'high' ? 'rgba(255, 77, 79, 0.2)' : 'transparent',
                  color: getLevelColor(alert.level),
                }}
              >
                {getLevelText(alert.level)}
              </Tag>
            </div>
            <div className="alert-table-cell">
              <span
                style={{
                  color: '#e6f1ff',
                  fontSize: 10,
                }}
              >
                {alert.type}
              </span>
            </div>
            <div className="alert-table-cell">
              <span style={{ color: getStatusColor(alert.status), fontSize: 10 }}>
                {alert.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlertTable
