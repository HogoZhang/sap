import React from 'react'
import { List, Badge, Tag, Avatar } from 'antd'
import {
  SafetyCertificateOutlined,
  WarningOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  MailOutlined,
  CloudServerOutlined,
  ContainerOutlined,
} from '@ant-design/icons'
import { mockAssets, AssetItem } from '@/mock'

const typeIconMap: Record<string, React.ReactNode> = {
  防火墙: <SafetyCertificateOutlined />,
  IDS: <WarningOutlined />,
  数据库: <DatabaseOutlined />,
  Web服务器: <GlobalOutlined />,
  邮件服务器: <MailOutlined />,
  存储: <CloudServerOutlined />,
}

const AssetCards: React.FC = () => {
  const showAssets = mockAssets.slice(0, 3)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return '#64ffda'
      case 'warning':
        return '#ffd700'
      case 'offline':
        return '#ff4d4f'
      default:
        return '#8892b0'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return '在线'
      case 'warning':
        return '警告'
      case 'offline':
        return '离线'
      default:
        return '未知'
    }
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
          @keyframes assetScroll {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
          .asset-scroll {
            animation: assetScroll 20s linear infinite;
          }
          .asset-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="asset-scroll">
        <List
          dataSource={[...showAssets, ...showAssets]}
          renderItem={(item: AssetItem) => (
            <List.Item
              style={{
                padding: '6px 0',
                borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={32}
                    style={{
                      backgroundColor: 'rgba(24, 59, 86, 0.8)',
                      border: `1px solid ${getStatusColor(item.status)}`,
                      boxShadow: `0 0 10px ${getStatusColor(item.status)}40`,
                    }}
                    icon={typeIconMap[item.type] || <ContainerOutlined />}
                  />
                }
                title={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <span
                      style={{
                        color: '#e6f1ff',
                        fontSize: 11,
                        fontWeight: 500,
                      }}
                    >
                      {item.name}
                    </span>
                    <Badge
                      status={
                        item.status === 'online'
                          ? 'success'
                          : item.status === 'warning'
                          ? 'warning'
                          : 'error'
                      }
                      text={
                        <span
                          style={{
                            color: getStatusColor(item.status),
                            fontSize: 10,
                          }}
                        >
                          {getStatusText(item.status)}
                        </span>
                      }
                    />
                  </div>
                }
                description={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 2,
                    }}
                  >
                    <Tag
                      style={{
                        margin: 0,
                        fontSize: 9,
                        padding: '0px 4px',
                        background: 'rgba(100, 255, 218, 0.1)',
                        border: '1px solid rgba(100, 255, 218, 0.3)',
                        color: '#64ffda',
                      }}
                    >
                      {item.type}
                    </Tag>
                    <span
                      style={{
                        color: '#8892b0',
                        fontSize: 9,
                        fontFamily: 'monospace',
                      }}
                    >
                      {item.ip}
                    </span>
                    <span
                      style={{
                        fontSize: 8,
                        color: '#5a6c84',
                      }}
                    >
                      {item.lastCheck}
                    </span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default AssetCards
