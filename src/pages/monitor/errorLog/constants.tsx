import { Button, Tag } from 'antd';
import dayjs from 'dayjs';

import type { ErrorLogItem } from './services';
import type { ColumnsType } from 'antd/es/table';

export const SOURCE_MAP: Record<string, { color: string; text: string }> = {
  frontend: { color: 'blue', text: '前端' },
  backend: { color: 'green', text: '后端' },
  taro: { color: 'orange', text: '小程序' },
};

export const SOURCE_OPTIONS = [
  { label: '前端', value: 'frontend' },
  { label: '后端', value: 'backend' },
  { label: '小程序', value: 'taro' },
];

export const RESOLVED_OPTIONS = [
  { label: '未处理', value: '0' },
  { label: '已处理', value: '1' },
];

export const MATCH_TYPE_OPTIONS = [
  { label: '错误消息', value: 'message' },
  { label: '请求URL', value: 'url' },
  { label: '错误类型', value: 'errorType' },
  { label: '文件路径', value: 'file' },
];

export const TABLE_COLUMNS: ColumnsType<ErrorLogItem> = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '来源',
    dataIndex: 'source',
    width: 80,
    render: (source: string) => (
      <Tag color={SOURCE_MAP[source]?.color || 'default'}>
        {SOURCE_MAP[source]?.text || source}
      </Tag>
    ),
  },
  {
    title: '错误类型',
    dataIndex: 'errorType',
    width: 120,
  },
  {
    title: '错误消息',
    dataIndex: 'message',
    ellipsis: true,
    render: (message: string) => (
      <span style={{ maxWidth: 300 }} title={message}>
        {message}
      </span>
    ),
  },
  {
    title: '请求URL',
    dataIndex: 'url',
    width: 150,
    ellipsis: true,
  },
  {
    title: '状态码',
    dataIndex: 'statusCode',
    width: 80,
    render: (code: number) => code || '-',
  },
  {
    title: '状态',
    dataIndex: 'isResolved',
    width: 80,
    render: (resolved: boolean) => (
      <Tag color={resolved ? 'success' : 'error'}>
        {resolved ? '已处理' : '未处理'}
      </Tag>
    ),
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 160,
    render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
  },
];

export const getActionColumn = (
  onViewDetail: (record: ErrorLogItem) => void,
  onResolve: (id: number) => void,
): ColumnsType<ErrorLogItem>[number] => ({
  title: '操作',
  width: 150,
  fixed: 'right',
  render: (_, record: ErrorLogItem) => (
    <>
      <Button type="link" onClick={() => onViewDetail(record)}>
        详情
      </Button>
      {!record.isResolved && (
        <Button type="link" onClick={() => onResolve(record.id)}>
          处理
        </Button>
      )}
    </>
  ),
});
