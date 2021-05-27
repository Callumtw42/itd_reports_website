/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import '../style.scss';
import { Pie } from 'react-chartjs-2';

export default function PieChart({ data }) {
  return (
    <div className="PieChart">
      <div className="chart">
        <Pie
          height={1}
          width={1}
          data={data}
          options={
            {
              layout: {
              },
              labels: { display: false },
              legend: {
                display: false,
                position: 'top',
                align: 'center',
                labels: {
                  usePointStyle: true,
                  fontSize: 24,
                },
                fullWidth: true,
              },
            }
          }
        />
      </div>
    </div>
  );
}
