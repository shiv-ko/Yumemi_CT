'use client';

import { useEffect, useState } from 'react';
import '../styles/HomePage.css'; // CSSファイルのインポート
import PrefectureCheckboxList from '../components/PrefectureCheckboxList';
import PopulationTypeSelector from '../components/PopulationTypeSelector';
import PopulationChart from '../components/PopulationChart';
import { Prefecture } from '../types/types';
import { fetchPrefectures, fetchPopulationComposition } from '../services/api';

export default function HomePage() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);
  const [selectedType, setSelectedType] = useState<string>('総人口');

  interface ChartData {
    prefName: string;
    data: { year: number; value: number }[] | undefined;
  }

  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const getPrefectures = async () => {
      try {
        const data = await fetchPrefectures();
        setPrefectures(data);
      } catch (error) {
        console.error(error);
      }
    };

    getPrefectures();
  }, []);

  useEffect(() => {
    const getPopulationData = async () => {
      try {
        const allData = await Promise.all(
          selectedPrefs.map(async (prefCode) => {
            const compositions = await fetchPopulationComposition(prefCode);
            const populationData = compositions.find(
              (item) => item.label === selectedType
            );
            const prefName = prefectures.find((pref) => pref.prefCode === prefCode)?.prefName;
            return {
              prefName: prefName ? prefName : '',
              data: populationData?.data,
            };
          })
        );
        setChartData(allData);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedPrefs.length > 0) {
      getPopulationData();
    } else {
      setChartData([]);
    }
  }, [selectedPrefs, selectedType, prefectures]);

  return (
    <div className="page-container">
      <h1 className="title">人口構成データ可視化ツール</h1>
      <div className="section">
        <PrefectureCheckboxList
          prefectures={prefectures}
          selectedPrefs={selectedPrefs}
          setSelectedPrefs={setSelectedPrefs}
        />
      </div>
      <div className="section">
        <PopulationTypeSelector
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>
      <div className="chart-container">
        <PopulationChart data={chartData} selectedType={selectedType} />
      </div>
    </div>
  );
}
