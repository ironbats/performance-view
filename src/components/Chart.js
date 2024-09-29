import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart({ allData }) {
  const summaryData = Object.keys(allData).map((testName) => ({
    endpoint: testName,
    averageResponseTime: allData[testName].summary.average,
    requestsPerSec: allData[testName].summary.requestsPerSec,
    successRate: allData[testName].summary.successRate * 100,
  }));

  return (
    <div>
      <h2>Comparação Entre Endpoints</h2>

      <h3>Tempo Médio de Resposta</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={summaryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="endpoint" />
          <YAxis label={{ value: 'Tempo Médio (s)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="averageResponseTime" fill="#8884d8" name="Tempo Médio de Resposta" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Requisições por Segundo (RPS)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={summaryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="endpoint" />
          <YAxis label={{ value: 'RPS', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="requestsPerSec" fill="#82ca9d" name="RPS" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Taxa de Sucesso (%)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={summaryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="endpoint" />
          <YAxis label={{ value: 'Taxa de Sucesso (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="successRate" fill="#FFBB28" name="Taxa de Sucesso" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
