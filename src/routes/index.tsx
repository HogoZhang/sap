import { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import MainLayout from '@/components/Layout/MainLayout'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Rules = lazy(() => import('@/pages/Rules'))
const Assets = lazy(() => import('@/pages/Assets'))
const NetworkLogs = lazy(() => import('@/pages/NetworkLogs'))
const AlertLogs = lazy(() => import('@/pages/AlertLogs'))
const Upgrade = lazy(() => import('@/pages/Upgrade'))
const Users = lazy(() => import('@/pages/Users'))
const Roles = lazy(() => import('@/pages/Roles'))

const SuspenseWrapper = () => (
  <Suspense fallback={<div style={{ padding: '50px', textAlign: 'center', color: '#8892b0' }}>加载中...</div>}>
    <Outlet />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <SuspenseWrapper />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'rules', element: <Rules /> },
          { path: 'assets', element: <Assets /> },
          { path: 'network-logs', element: <NetworkLogs /> },
          { path: 'alert-logs', element: <AlertLogs /> },
          { path: 'upgrade', element: <Upgrade /> },
          { path: 'users', element: <Users /> },
          { path: 'roles', element: <Roles /> },
        ],
      },
    ],
  },
])

export const menuItems = [
  { key: '/dashboard', label: '感知大屏', icon: 'dashboard' as const },
  { key: '/rules', label: '规则管理', icon: 'setting' as const },
  { key: '/assets', label: '资产管理', icon: 'server' as const },
  { key: '/network-logs', label: '网络日志', icon: 'file' as const },
  { key: '/alert-logs', label: '警报日志', icon: 'warning' as const },
  { key: '/upgrade', label: '系统升级', icon: 'cloud' as const },
  { key: '/users', label: '用户管理', icon: 'user' as const },
  { key: '/roles', label: '角色管理', icon: 'team' as const },
]
