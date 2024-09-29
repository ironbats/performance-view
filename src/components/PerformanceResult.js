import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import TestResults from './Result';
import Chart from './Chart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

function PerformanceResult() {
  const [data, setData] = useState(null);
  const [selectedTest, setSelectedTest] = useState('');
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(false);

  const testFiles = [
    { name: 'Listar Pedidos', file: 'list_orders_test.json' },
    // Adicione mais se quiser !!!PUSH_NA_MASTER!!!
  ];

  useEffect(() => {
    setLoading(true);
    Promise.all(
      testFiles.map((test) =>
        fetch(`/data/${test.file}`)
          .then((response) => response.json())
          .then((jsonData) => ({ [test.name]: jsonData }))
          .catch((error) => console.error(`Erro ao carregar ${test.file}:`, error))
      )
    ).then((results) => {
      const dataMap = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setAllData(dataMap);
      setLoading(false);
    });
  }, []);

  const handleTestChange = (e) => {
    const testName = e.target.value;
    setSelectedTest(testName);
    setData(allData[testName]);
  };

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div>
      <h1>Resultados do Teste de Performance</h1>

      <select value={selectedTest} onChange={handleTestChange}>
        <option value="">Selecione um teste</option>
        {testFiles.map((test) => (
          <option key={test.file} value={test.name}>
            {test.name}
          </option>
        ))}
      </select>

      {data ? (
        <TestResults data={data} testName={selectedTest} />
      ) : (
        <p>Selecione um teste para visualizar os resultados.</p>
      )}

      {Object.keys(allData).length > 1 && <Chart allData={allData} />}
    </div>
  );
}

export default PerformanceResult;
