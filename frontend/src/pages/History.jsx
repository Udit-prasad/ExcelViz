import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchHistory } from '../features/history/historySlice';
import HistoryTable from '../components/HistoryTable';

const History = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
        <p className="text-gray-600">View and manage your previous analyses and charts</p>
      </div>

      <HistoryTable />
    </div>
  );
};

export default History; 