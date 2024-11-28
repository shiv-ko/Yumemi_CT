'use client';

import { useEffect, useState } from 'react';
import PrefectureCheckboxList from '../components/PrefectureCheckboxList';
import PopulationTypeSelector from '../components/PopulationTypeSelector';
import PopulationChart from '../components/PopulationChart';
import { Prefecture } from '../types/types';
import { fetchPrefectures, fetchPopulationComposition } from '../services/api';

export default function HomePage() {
  // 都道府県データの状態
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  // 選択された都道府県コードの状態
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);
  // 選択された人口タイプの状態（初期値：総人口）
  const [selectedType, setSelectedType] = useState<string>('総人口');
  // グラフに表示するデータの状態
  interface ChartData {
    prefName: string;
    data: { year: number; value: number }[] | undefined;
  }

  const [chartData, setChartData] = useState<ChartData[]>([]);

  // 初回レンダリング時に都道府県データを取得
  useEffect(() => {
    const getPrefectures = async () => {
      try {
        // 都道府県データを取得
        const data = await fetchPrefectures(); 
        // 状態を更新
        setPrefectures(data); 
      } catch (error) {
        console.error(error); // エラーをコンソールに表示
      }
    };

    getPrefectures(); // 関数を実行
  }, []);

  // 選択された都道府県や人口タイプが変わったときにデータを取得
  useEffect(() => {
    const getPopulationData = async () => {
      try {
        // 選択された都道府県ごとに人口データを取得
        const allData = await Promise.all(
          selectedPrefs.map(async (prefCode) => {
            // 人口構成データを取得
            const compositions = await fetchPopulationComposition(prefCode);
            // 選択された人口タイプのデータを抽出
            const populationData = compositions.find(
              (item) => item.label === selectedType
            );
            const prefName = prefectures.find((pref) => pref.prefCode === prefCode)?.prefName;
            return {
              prefName: prefName ? prefName : '', // 都道府県名
              data: populationData?.data, // 人口データ
            };
          })
        );
        setChartData(allData); // グラフ用のデータを更新
      } catch (error) {
        console.error(error); // エラーをコンソールに表示
      }
    };

    if (selectedPrefs.length > 0) {
      getPopulationData(); // 選択された都道府県がある場合、データを取得
    } else {
      setChartData([]); // 都道府県が選択されていない場合、グラフデータをクリア
    }
  }, [selectedPrefs, selectedType, prefectures]); // 依存配列

  return (
    <div>
      <h1>人口構成データ可視化ツール</h1>
      {/* 都道府県のチェックボックスリスト */}
      <PrefectureCheckboxList
        prefectures={prefectures}
        selectedPrefs={selectedPrefs}
        setSelectedPrefs={setSelectedPrefs}
      />
      {/* 人口タイプのセレクター */}
      <PopulationTypeSelector
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {/* 人口推移グラフ */}
      <PopulationChart data={chartData} selectedType={selectedType} />
    </div>
  );
}