import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

function TestResults({ data, testName }) {
  const formatNumber = (num, decimals = 0) => {
    if (typeof num === 'number') {
      return num.toFixed(decimals);
    }
    return num;
  };

  const formatPercentage = (num) => {
    if (typeof num === 'number') {
      return (num * 100).toFixed() + '%';
    }
    return num;
  };

  const responseTimeHistogramData = Object.keys(data.responseTimeHistogram)
    .map((key) => ({
      time: parseFloat(key),
      count: data.responseTimeHistogram[key],
    }))
    .sort((a, b) => a.time - b.time);

  const responseTimeHistogramSuccessfulData = data.responseTimeHistogramSuccessful
    ? Object.keys(data.responseTimeHistogramSuccessful)
        .map((key) => ({
          time: parseFloat(key),
          count: data.responseTimeHistogramSuccessful[key],
        }))
        .sort((a, b) => a.time - b.time)
    : [];

  const responseTimeHistogramNotSuccessfulData = data.responseTimeHistogramNotSuccessful
    ? Object.keys(data.responseTimeHistogramNotSuccessful)
        .map((key) => ({
          time: parseFloat(key),
          count: data.responseTimeHistogramNotSuccessful[key],
        }))
        .sort((a, b) => a.time - b.time)
    : [];

  const latencyPercentilesOrder = ["p10", "p25", "p50", "p75", "p90", "p95", "p99", "p99.9", "p99.99"];

  const latencyPercentilesData = latencyPercentilesOrder.map((key) => ({
    percentile: key,
    latency: data.latencyPercentiles[key],
  }));

  const latencyPercentilesSuccessfulData = data.latencyPercentilesSuccessful
    ? latencyPercentilesOrder.map((key) => ({
        percentile: key,
        latency: data.latencyPercentilesSuccessful[key],
      }))
    : [];

  const latencyPercentilesNotSuccessfulData = data.latencyPercentilesNotSuccessful
    ? latencyPercentilesOrder.map((key) => ({
        percentile: key,
        latency: data.latencyPercentilesNotSuccessful[key],
      }))
    : [];

  const rpsPercentilesOrder = ["p10", "p25", "p50", "p75", "p90", "p95", "p99", "p99.9", "p99.99"];

  const rpsPercentilesData = rpsPercentilesOrder.map((key) => ({
    percentile: key,
    rps: data.rps.percentiles[key],
  }));

  const statusCodeDistributionData = Object.keys(data.statusCodeDistribution).map((key) => ({
    statusCode: key,
    count: data.statusCodeDistribution[key],
  }));

  const errorDistributionData = data.errorDistribution
    ? Object.keys(data.errorDistribution).map((key) => ({
        error: key,
        count: data.errorDistribution[key],
      }))
    : [];

  return (
    <div>
      <h2>Resultados para: {testName}</h2>

      <h3>Resumo</h3>
      <ul>
        <li>Taxa de Sucesso: {formatPercentage(data.summary.successRate)}</li>
        <li>Tempo Total: {formatNumber(data.summary.total)}s</li>
        <li>Maior Tempo de Resposta: {formatNumber(data.summary.slowest)}s</li>
        <li>Menor Tempo de Resposta: {formatNumber(data.summary.fastest)}s</li>
        <li>Tempo Médio de Resposta: {formatNumber(data.summary.average)}s</li>
        <li>Requisições por Segundo: {formatNumber(data.summary.requestsPerSec)}</li>
        <li>Dados Totais: {data.summary.totalData}</li>
        <li>Tamanho por Requisição: {data.summary.sizePerRequest}</li>
        <li>Tamanho por Segundo: {formatNumber(data.summary.sizePerSec)}</li>
      </ul>

      <h3>Histograma de Tempo de Resposta</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={responseTimeHistogramData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            label={{ value: 'Tempo de Resposta (s)', position: 'insideBottomRight', offset: -10 }}
            tickFormatter={(tick) => formatNumber(tick)}
          />
          <YAxis
            label={{ value: 'Contagem', angle: -90, position: 'insideLeft' }}
            tickFormatter={(tick) => formatNumber(tick, 0)}
          />
          <Tooltip formatter={(value) => formatNumber(value)} />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Quantidade de Requisições" />
        </BarChart>
      </ResponsiveContainer>

      {responseTimeHistogramSuccessfulData.length > 0 && (
        <>
          <h3>Histograma de Tempo de Resposta (Requisições Bem-sucedidas)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={responseTimeHistogramSuccessfulData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                label={{ value: 'Tempo de Resposta (s)', position: 'insideBottomRight', offset: -10 }}
                tickFormatter={(tick) => formatNumber(tick)}
              />
              <YAxis
                label={{ value: 'Contagem', angle: -90, position: 'insideLeft' }}
                tickFormatter={(tick) => formatNumber(tick, 0)}
              />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" name="Requisições Bem-sucedidas" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      {responseTimeHistogramNotSuccessfulData.length > 0 && (
        <>
          <h3>Histograma de Tempo de Resposta (Requisições Não Bem-sucedidas)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={responseTimeHistogramNotSuccessfulData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                label={{ value: 'Tempo de Resposta (s)', position: 'insideBottomRight', offset: -10 }}
                tickFormatter={(tick) => formatNumber(tick)}
              />
              <YAxis
                label={{ value: 'Contagem', angle: -90, position: 'insideLeft' }}
                tickFormatter={(tick) => formatNumber(tick, 0)}
              />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Bar dataKey="count" fill="#ff6666" name="Requisições Não Bem-sucedidas" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      <h3>Percentis de Latência</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={latencyPercentilesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="percentile" />
          <YAxis
            label={{ value: 'Latência (s)', angle: -90, position: 'insideLeft' }}
            tickFormatter={(tick) => formatNumber(tick)}
          />
          <Tooltip formatter={(value) => formatNumber(value)} />
          <Legend />
          <Line type="monotone" dataKey="latency" stroke="#8884d8" name="Latência" />
        </LineChart>
      </ResponsiveContainer>

      {latencyPercentilesSuccessfulData.length > 0 && (
        <>
          <h3>Percentis de Latência (Requisições Bem-sucedidas)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={latencyPercentilesSuccessfulData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="percentile" />
              <YAxis
                label={{ value: 'Latência (s)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(tick) => formatNumber(tick)}
              />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Line type="monotone" dataKey="latency" stroke="#82ca9d" name="Latência" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}

      {latencyPercentilesNotSuccessfulData.length > 0 && (
        <>
          <h3>Percentis de Latência (Requisições Não Bem-sucedidas)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={latencyPercentilesNotSuccessfulData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="percentile" />
              <YAxis
                label={{ value: 'Latência (s)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(tick) => formatNumber(tick)}
              />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Line type="monotone" dataKey="latency" stroke="#ff6666" name="Latência" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}

      <h3>Percentis de Requisições por Segundo (RPS)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={rpsPercentilesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="percentile" />
          <YAxis
            label={{ value: 'RPS', angle: -90, position: 'insideLeft' }}
            tickFormatter={(tick) => formatNumber(tick)}
          />
          <Tooltip formatter={(value) => formatNumber(value)} />
          <Legend />
          <Line type="monotone" dataKey="rps" stroke="#8884d8" name="RPS" />
        </LineChart>
      </ResponsiveContainer>

      <h3>Distribuição de Código de Status</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusCodeDistributionData}
            dataKey="count"
            nameKey="statusCode"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(entry) => `${entry.statusCode}: ${entry.count}`}
          >
            {statusCodeDistributionData.map((entry, index) => (
              <Cell key={`cell-status-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatNumber(value, 0)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {errorDistributionData.length > 0 && (
        <>
          <h3>Detalhamento de Erros</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={errorDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="error" />
              <YAxis
                label={{ value: 'Contagem', angle: -90, position: 'insideLeft' }}
                tickFormatter={(tick) => formatNumber(tick, 0)}
              />
              <Tooltip formatter={(value) => formatNumber(value, 0)} />
              <Legend />
              <Bar dataKey="count" fill="#ff6666" name="Quantidade de Erros" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      <h3>Detalhes de DNS e Conexões</h3>
      <ul>
        <li>
          DNS Lookup - Médio: {formatNumber(data.details.DNSLookup.average)}s, Mais Rápido: {formatNumber(data.details.DNSLookup.fastest)}s, Mais Lento: {formatNumber(data.details.DNSLookup.slowest)}s
        </li>
        <li>
          DNS Dialup - Médio: {formatNumber(data.details.DNSDialup.average)}s, Mais Rápido: {formatNumber(data.details.DNSDialup.fastest)}s, Mais Lento: {formatNumber(data.details.DNSDialup.slowest)}s
        </li>
      </ul>
    </div>
  );
}

export default TestResults;
