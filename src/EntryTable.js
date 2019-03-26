import React from 'react';
import { Table } from 'antd';
import './styles.scss';

export default ({ data, day }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'entryName',
    },
  ];

  for (let i = 0; i < day; i++) {
    columns.push({
      title: `Day ${i + 1}`,
      dataIndex: `teams[${i}]`,
    });
  }

  return (
    <div className="entry-table">
      <h2>Picks for Day {day}</h2>
      <Table
        rowKey={entry => entry.uniqueID}
        rowClassName={entry => {
          return entry.status ? 'in' : 'out';
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};
