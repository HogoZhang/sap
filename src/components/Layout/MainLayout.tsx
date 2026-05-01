import { Layout } from 'antd'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppStore } from '@/store'

const { Content } = Layout

export default function MainLayout() {
  const { collapsed } = useAppStore()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Sidebar />
        <Content
          style={{
            margin: 0,
            padding: 16,
            paddingTop: 80,
            minHeight: 280,
            background: '#0a192f',
            transition: 'all 0.2s',
            marginLeft: collapsed ? 64 : 160,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
