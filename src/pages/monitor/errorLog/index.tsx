import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Table,
  Tag,
  message,
} from 'antd';
import dayjs from 'dayjs';

import { useModal } from '@/hooks/useModal';
import { usePagination } from '@/hooks/usePagination';

import {
  TABLE_COLUMNS,
  SOURCE_MAP,
  SOURCE_OPTIONS,
  RESOLVED_OPTIONS,
  MATCH_TYPE_OPTIONS,
  getActionColumn,
} from './constants';
import { useErrorLogStore } from './store';

import type { ErrorLogItem, WhitelistItem } from './services';

export default function ErrorLog() {
  const {
    list,
    total,
    loading,
    currentLog,
    stats,
    whitelist,
    filters,
    fetchErrorLogs,
    fetchStats,
    fetchWhitelist,
    handleViewDetail,
    handleResolve,
    setFilters,
    clearCurrentLog,
    handleAddWhitelist,
    handleUpdateWhitelist,
    handleDeleteWhitelist,
  } = useErrorLogStore();

  const {
    isOpen: drawerOpen,
    open: openDrawer,
    close: closeDrawer,
  } = useModal();
  const {
    isOpen: whitelistDrawerOpen,
    open: openWhitelistDrawer,
    close: closeWhitelistDrawer,
  } = useModal();

  const { pagination, handleTableChange } = usePagination();

  const isFirstRenderRef = useRef(true);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      fetchErrorLogs(filters, pagination.current, pagination.pageSize);
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchErrorLogs(filters, pagination.current, pagination.pageSize);
    }, 300);
  }, [filters, pagination, fetchErrorLogs]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fetchStats();
    fetchWhitelist();
  }, []);

  const handleViewDetailWithDrawer = useCallback(
    (record: ErrorLogItem) => {
      handleViewDetail(record);
      openDrawer();
    },
    [handleViewDetail, openDrawer],
  );

  const handleResolveWithRefresh = useCallback(
    async (id: number) => {
      await handleResolve(id);
      fetchErrorLogs(filters, pagination.current, pagination.pageSize);
      fetchStats();
    },
    [handleResolve, fetchErrorLogs, filters, pagination, fetchStats],
  );

  const handleFilterChange = useCallback(
    (key: string, value: string | undefined) => {
      setFilters({ ...filters, [key]: value });
    },
    [setFilters, filters],
  );

  const handleDateRangeChange = useCallback(
    (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
      if (dates && dates[0] && dates[1]) {
        setFilters({
          ...filters,
          startTime: dates[0]?.startOf('day').toISOString(),
          endTime: dates[1]?.endOf('day').toISOString(),
        });
      } else {
        const newFilters = { ...filters };
        delete newFilters.startTime;
        delete newFilters.endTime;
        setFilters(newFilters);
      }
    },
    [setFilters, filters],
  );

  const handleCloseDrawer = useCallback(() => {
    closeDrawer();
    clearCurrentLog();
  }, [closeDrawer, clearCurrentLog]);

  const columns = useMemo(() => {
    return [
      ...TABLE_COLUMNS,
      getActionColumn(handleViewDetailWithDrawer, handleResolveWithRefresh),
    ];
  }, [handleViewDetailWithDrawer, handleResolveWithRefresh]);

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <DatePicker.RangePicker
          onChange={handleDateRangeChange}
          placeholder={['开始时间', '结束时间']}
        />
        <Select
          placeholder="错误来源"
          allowClear
          style={{ width: 120 }}
          value={filters.source}
          onChange={(value) => handleFilterChange('source', value)}
          options={SOURCE_OPTIONS}
        />
        <Select
          placeholder="处理状态"
          allowClear
          style={{ width: 120 }}
          value={filters.isResolved}
          onChange={(value) => handleFilterChange('isResolved', value)}
          options={RESOLVED_OPTIONS}
        />
        <Input.Search
          placeholder="描述关键词"
          style={{ width: 200 }}
          allowClear
          value={filters.keyword}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              handleFilterChange('keyword', undefined);
            }
          }}
          onSearch={(value) =>
            handleFilterChange('keyword', value || undefined)
          }
        />
        <div style={{ flex: 1 }} />
        <Button onClick={openWhitelistDrawer}>白名单管理</Button>
      </div>

      {stats && (
        <div style={{ marginBottom: 16, display: 'flex', gap: 24 }}>
          <span>总计: {stats.total}</span>
          <span>未处理: {stats.unresolved}</span>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={list}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total,
          onChange: (page, pageSize) => {
            handleTableChange({ current: page, pageSize });
          },
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        scroll={{ x: 1200 }}
      />

      <Drawer
        title="错误详情"
        width={600}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      >
        {currentLog && (
          <div>
            <p>
              <strong>来源：</strong>
              {SOURCE_MAP[currentLog.source]?.text || currentLog.source}
            </p>
            <p>
              <strong>错误类型：</strong>
              {currentLog.errorType}
            </p>
            <p>
              <strong>错误消息：</strong>
              {currentLog.message}
            </p>
            {currentLog.file && (
              <p>
                <strong>文件：</strong>
                {currentLog.file}
                {currentLog.line && `:${currentLog.line}`}
                {currentLog.column && `:${currentLog.column}`}
              </p>
            )}
            {currentLog.url && (
              <p>
                <strong>请求URL：</strong>
                {currentLog.url}
              </p>
            )}
            {currentLog.method && (
              <p>
                <strong>请求方法：</strong>
                {currentLog.method}
              </p>
            )}
            {currentLog.statusCode && (
              <p>
                <strong>状态码：</strong>
                {currentLog.statusCode}
              </p>
            )}
            {currentLog.stack && (
              <div>
                <strong>堆栈信息：</strong>
                <pre
                  style={{
                    background: '#f5f5f5',
                    padding: 12,
                    overflow: 'auto',
                    maxHeight: 300,
                    fontSize: 12,
                  }}
                >
                  {currentLog.stack}
                </pre>
              </div>
            )}
            {currentLog.extra && (
              <div>
                <strong>额外信息：</strong>
                <pre
                  style={{
                    background: '#f5f5f5',
                    padding: 12,
                    overflow: 'auto',
                    maxHeight: 200,
                    fontSize: 12,
                  }}
                >
                  {JSON.stringify(currentLog.extra, null, 2)}
                </pre>
              </div>
            )}
            <p>
              <strong>创建时间：</strong>
              {dayjs(currentLog.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </p>
            {currentLog.isResolved && (
              <>
                <p>
                  <strong>处理时间：</strong>
                  {currentLog.resolvedAt
                    ? dayjs(currentLog.resolvedAt).format('YYYY-MM-DD HH:mm:ss')
                    : '-'}
                </p>
              </>
            )}
          </div>
        )}
      </Drawer>

      <Drawer
        title="白名单管理"
        width={600}
        open={whitelistDrawerOpen}
        onClose={closeWhitelistDrawer}
      >
        <WhitelistManager
          whitelist={whitelist}
          onRefresh={fetchWhitelist}
          onAdd={handleAddWhitelist}
          onUpdate={handleUpdateWhitelist}
          onDelete={handleDeleteWhitelist}
        />
      </Drawer>
    </div>
  );
}

function WhitelistManager({
  whitelist,
  onRefresh,
  onAdd,
  onUpdate,
  onDelete,
}: {
  whitelist: WhitelistItem[];
  onRefresh: () => void;
  onAdd: (values: WhitelistItem) => Promise<boolean>;
  onUpdate: (values: WhitelistItem) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
}) {
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAdd = async (values: WhitelistItem) => {
    try {
      if (!values.pattern || !values.pattern.trim()) {
        message.error('匹配模式不能为空');
        return;
      }

      try {
        new RegExp(values.pattern, 'i');
      } catch {
        message.error('正则表达式格式无效');
        return;
      }

      let success = false;
      if (editingId) {
        success = await onUpdate({ ...values, id: editingId });
      } else {
        success = await onAdd(values);
      }

      if (success) {
        form.resetFields();
        setEditingId(null);
        onRefresh();
      }
    } catch (error) {
      message.error(`${error}，操作白名单失败！`);
    }
  };

  const handleDelete = async (id: number) => {
    if (!id || id <= 0) {
      console.error('无效的白名单ID');
      return;
    }

    const success = await onDelete(id);
    if (success) {
      onRefresh();
    }
  };

  const handleEdit = (item: WhitelistItem) => {
    setEditingId(item.id);
    form.setFieldsValue(item);
  };

  return (
    <div>
      <Form form={form} onFinish={handleAdd} layout="vertical">
        <Form.Item
          name="name"
          label="规则名称"
          rules={[{ required: true, message: '请输入规则名称' }]}
        >
          <Input placeholder="请输入规则名称" />
        </Form.Item>
        <Form.Item
          name="matchType"
          label="匹配类型"
          rules={[{ required: true, message: '请选择匹配类型' }]}
        >
          <Select options={MATCH_TYPE_OPTIONS} />
        </Form.Item>
        <Form.Item
          name="pattern"
          label="匹配模式（正则表达式）"
          rules={[{ required: true, message: '请输入匹配模式' }]}
        >
          <Input placeholder="例如: .*ResizeObserver.*" />
        </Form.Item>
        <Form.Item name="remark" label="备注">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingId ? '更新' : '添加'}
          </Button>
          {editingId && (
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => {
                setEditingId(null);
                form.resetFields();
              }}
            >
              取消
            </Button>
          )}
        </Form.Item>
      </Form>

      <Table
        dataSource={whitelist}
        rowKey="id"
        size="small"
        columns={[
          { title: '名称', dataIndex: 'name', width: 120 },
          { title: '匹配类型', dataIndex: 'matchType', width: 100 },
          { title: '匹配模式', dataIndex: 'pattern', ellipsis: true },
          {
            title: '状态',
            dataIndex: 'isEnabled',
            width: 80,
            render: (v: boolean) => (
              <Tag color={v ? 'success' : 'default'}>{v ? '启用' : '禁用'}</Tag>
            ),
          },
          {
            title: '操作',
            width: 120,
            render: (_, record: WhitelistItem) => (
              <>
                <Button
                  type="link"
                  size="small"
                  onClick={() => handleEdit(record)}
                >
                  编辑
                </Button>
                <Button
                  type="link"
                  size="small"
                  danger
                  onClick={() => handleDelete(record.id)}
                >
                  删除
                </Button>
              </>
            ),
          },
        ]}
      />
    </div>
  );
}
