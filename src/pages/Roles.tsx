import React, { useState, useEffect } from 'react'
import {
  Card,
  Table,
  Button,
  Space,
  Input,
  Select,
  Tag,
  Modal,
  Form,
  Switch,
  Popconfirm,
  message,
  Checkbox,
  Collapse,
} from 'antd'
import {
  TeamOutlined,
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { mockRoles, mockPermissions, RoleItem } from '@/mock'

const { Option } = Select
const { Panel } = Collapse

interface SearchFormType {
  name?: string
  status?: string
}

const permissionNameMap: Record<string, string> = {
  'dashboard:read': '查看',
  'dashboard:write': '编辑',
  'rules:read': '查看',
  'rules:write': '编辑',
  'rules:delete': '删除',
  'assets:read': '查看',
  'assets:write': '编辑',
  'assets:delete': '删除',
  'logs:read': '查看',
  'logs:export': '导出',
  'alerts:read': '查看',
  'alerts:write': '编辑',
  'alerts:delete': '删除',
  'users:read': '查看',
  'users:write': '编辑',
  'users:delete': '删除',
  'roles:read': '查看',
  'roles:write': '编辑',
  'roles:delete': '删除',
}

const Roles: React.FC = () => {
  const [roles, setRoles] = useState<RoleItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searchForm] = Form.useForm()
  const [modalVisible, setModalVisible] = useState(false)
  const [editingRole, setEditingRole] = useState<RoleItem | null>(null)
  const [form] = Form.useForm()
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const fetchRoles = (params?: SearchFormType) => {
    setLoading(true)
    setTimeout(() => {
      let filteredRoles = [...mockRoles]
      if (params?.name) {
        filteredRoles = filteredRoles.filter(
          (r) =>
            r.name.includes(params.name!) ||
            r.code.includes(params.name!)
        )
      }
      if (params?.status) {
        filteredRoles = filteredRoles.filter((r) => r.status === params.status)
      }
      setTotal(filteredRoles.length)
      setRoles(filteredRoles)
      setLoading(false)
    }, 300)
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const handleSearch = (values: SearchFormType) => {
    setCurrentPage(1)
    fetchRoles(values)
  }

  const handleReset = () => {
    searchForm.resetFields()
    setCurrentPage(1)
    fetchRoles()
  }

  const handleAdd = () => {
    setEditingRole(null)
    form.resetFields()
    setSelectedPermissions([])
    setModalVisible(true)
  }

  const handleEdit = (record: RoleItem) => {
    setEditingRole(record)
    form.setFieldsValue({
      name: record.name,
      code: record.code,
      description: record.description,
      status: record.status === 'active',
    })
    setSelectedPermissions(record.permissions.includes('all') 
      ? mockPermissions.flatMap(g => g.permissions)
      : record.permissions
    )
    setModalVisible(true)
  }

  const handleDelete = (id: string) => {
    const role = roles.find(r => r.id === id)
    if (role && role.userCount > 0) {
      message.error('该角色下还有用户，无法删除')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const newRoles = roles.filter((r) => r.id !== id)
      setRoles(newRoles)
      setTotal(newRoles.length)
      message.success('删除成功')
      setLoading(false)
    }, 300)
  }

  const handleStatusChange = (record: RoleItem, checked: boolean) => {
    setLoading(true)
    setTimeout(() => {
      const newStatus = checked ? 'active' as const : 'inactive' as const
      const newRoles = roles.map((r) =>
        r.id === record.id ? { ...r, status: newStatus } as RoleItem : r
      )
      setRoles(newRoles)
      message.success(`已${checked ? '启用' : '禁用'}角色`)
      setLoading(false)
    }, 300)
  }

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (selectedPermissions.length === 0) {
        message.error('请至少选择一个权限')
        return
      }
      setLoading(true)
      setTimeout(() => {
        const newStatus = values.status ? 'active' as const : 'inactive' as const
        const finalPermissions = selectedPermissions.length === mockPermissions.flatMap(g => g.permissions).length
          ? ['all']
          : selectedPermissions
        
        if (editingRole) {
          const newRoles = roles.map((r) =>
            r.id === editingRole.id
              ? {
                  ...r,
                  ...values,
                  status: newStatus,
                  permissions: finalPermissions,
                } as RoleItem
              : r
          )
          setRoles(newRoles)
          message.success('编辑成功')
        } else {
          const newRole: RoleItem = {
            id: String(Date.now()),
            ...values,
            status: newStatus,
            permissions: finalPermissions,
            createTime: new Date().toLocaleString(),
            userCount: 0,
          }
          const newRoles = [newRole, ...roles]
          setRoles(newRoles)
          setTotal(newRoles.length)
          message.success('添加成功')
        }
        setModalVisible(false)
        setLoading(false)
      }, 300)
    })
  }

  const handlePermissionChange = (checked: boolean, permission: string) => {
    setSelectedPermissions(prev => {
      if (checked) {
        return [...prev, permission]
      }
      return prev.filter(p => p !== permission)
    })
  }

  const handleGroupChange = (checked: boolean, groupPermissions: string[]) => {
    setSelectedPermissions(prev => {
      if (checked) {
        return [...new Set([...prev, ...groupPermissions])]
      }
      return prev.filter(p => !groupPermissions.includes(p))
    })
  }

  const isGroupAllSelected = (groupPermissions: string[]) => {
    return groupPermissions.every(p => selectedPermissions.includes(p))
  }

  const isGroupIndeterminate = (groupPermissions: string[]) => {
    const selectedCount = groupPermissions.filter(p => selectedPermissions.includes(p)).length
    return selectedCount > 0 && selectedCount < groupPermissions.length
  }

  const columns: ColumnsType<RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text) => (
        <Space>
          <SettingOutlined style={{ color: '#64ffda' }} />
          <span style={{ color: '#e6f1ff' }}>{text}</span>
        </Space>
      ),
    },
    {
      title: '角色代码',
      dataIndex: 'code',
      key: 'code',
      width: 150,
      render: (text) => (
        <Tag color="blue" style={{ margin: 0 }}>
          {text}
        </Tag>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      render: (text) => <span style={{ color: '#8892b0' }}>{text}</span>,
    },
    {
      title: '用户数',
      dataIndex: 'userCount',
      key: 'userCount',
      width: 80,
      render: (text) => (
        <Tag color={text > 0 ? 'gold' : 'default'} style={{ margin: 0 }}>
          {text} 人
        </Tag>
      ),
    },
    {
      title: '权限数量',
      dataIndex: 'permissions',
      key: 'permissions',
      width: 100,
      render: (permissions) => (
        <span style={{ color: '#64ffda' }}>
          {permissions.includes('all') ? '全部' : permissions.length} 项
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text: string, record) => (
        <Switch
          checked={text === 'active'}
          checkedChildren="启用"
          unCheckedChildren="禁用"
          onChange={(checked) => handleStatusChange(record, checked)}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
      render: (text) => <span style={{ color: '#8892b0', fontSize: 12 }}>{text}</span>,
    },
    {
      title: '操作',
      key: 'action',
      width: 140,
      fixed: 'right',
      render: (_: any, record: RoleItem) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ color: '#64ffda' }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除该角色吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
              disabled={record.userCount > 0}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: 0 }}>
      <Card
        className="dashboard-card"
        style={{ minHeight: 'calc(100vh - 112px)' }}
        title={
          <Space>
            <TeamOutlined style={{ color: '#64ffda' }} />
            <span>角色管理</span>
          </Space>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            style={{ backgroundColor: '#64ffda', borderColor: '#64ffda' }}
          >
            新增角色
          </Button>
        }
      >
        <div className="card-border" />
        
        <Card
          style={{
            marginBottom: 16,
            background: 'rgba(24, 59, 86, 0.3)',
            border: '1px solid rgba(100, 255, 218, 0.15)',
          }}
          styles={{ body: { padding: '12px 16px' }}}
        >
          <Form
            form={searchForm}
            layout="inline"
            onFinish={handleSearch}
          >
            <Form.Item name="name" label="角色名称/代码">
              <Input
                placeholder="请输入角色名称或代码"
                prefix={<SearchOutlined style={{ color: '#8892b0' }} />}
                style={{ width: 200 }}
                allowClear
              />
            </Form.Item>
            <Form.Item name="status" label="状态">
              <Select
                placeholder="请选择状态"
                style={{ width: 140 }}
                allowClear
              >
                <Option value="active">启用</Option>
                <Option value="inactive">禁用</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{ backgroundColor: '#64ffda', borderColor: '#64ffda' }}
                >
                  搜索
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleReset}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        <Table
          columns={columns}
          dataSource={roles}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
            onChange: (page, size) => {
              setCurrentPage(page)
              setPageSize(size)
            },
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title={editingRole ? '编辑角色' : '新增角色'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
        okText="确定"
        cancelText="取消"
        width={600}
        okButtonProps={{
          style: { backgroundColor: '#64ffda', borderColor: '#64ffda' },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: true }}
        >
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item
            name="code"
            label="角色代码"
            rules={[{ required: true, message: '请输入角色代码' }]}
          >
            <Input placeholder="请输入角色代码" disabled={!!editingRole} />
          </Form.Item>
          <Form.Item
            name="description"
            label="角色描述"
          >
            <Input.TextArea 
              placeholder="请输入角色描述" 
              rows={3}
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            valuePropName="checked"
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
        
        <div style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 8, color: '#64ffda', fontWeight: 500 }}>
            权限配置
          </div>
          <Collapse
            defaultActiveKey={mockPermissions.map((_, i) => i.toString())}
            style={{ background: 'transparent' }}
          >
            {mockPermissions.map((group, groupIndex) => (
              <Panel
                key={groupIndex.toString()}
                header={
                  <Space>
                    <Checkbox
                      checked={isGroupAllSelected(group.permissions)}
                      indeterminate={isGroupIndeterminate(group.permissions)}
                      onChange={(e) => handleGroupChange(e.target.checked, group.permissions)}
                    />
                    <span style={{ color: '#e6f1ff' }}>{group.group}</span>
                  </Space>
                }
                style={{
                  background: 'rgba(24, 59, 86, 0.3)',
                  border: '1px solid rgba(100, 255, 218, 0.15)',
                  marginBottom: 8,
                }}
              >
                <Checkbox.Group style={{ width: '100%' }}>
                  <Space wrap>
                    {group.permissions.map((permission) => (
                      <Checkbox
                        key={permission}
                        checked={selectedPermissions.includes(permission)}
                        onChange={(e) => handlePermissionChange(e.target.checked, permission)}
                        style={{ marginBottom: 8, marginRight: 16, color: '#8892b0' }}
                      >
                        {permissionNameMap[permission] || permission}
                      </Checkbox>
                    ))}
                  </Space>
                </Checkbox.Group>
              </Panel>
            ))}
          </Collapse>
        </div>
      </Modal>
    </div>
  )
}

export default Roles
