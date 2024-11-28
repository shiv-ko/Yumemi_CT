'use client';

import { useEffect, useState } from 'react';
import PrefectureCheckboxList from '../components/PrefectureCheckboxList';
import PopulationTypeSelector from '../components/PopulationTypeSelector';
import { Prefecture } from '../types/types';
import { fetchPrefectures } from '../services/api';

export default function HomePage() {
  // 都道府県データの状態
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  // 選択された都道府県コードの状態
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);
  // 選択された人口タイプの状態（初期値：総人口）
  const [selectedType, setSelectedType] = useState<string>('総人口');

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
    </div>
  );
}