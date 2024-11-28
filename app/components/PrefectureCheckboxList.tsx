import React from 'react';
import { Prefecture } from './../types/types';
import '../styles/PrefectureCheckboxList.css'; // CSSファイルをインポート

type Props = {
  prefectures: Prefecture[]; // 都道府県データの配列
  selectedPrefs: number[]; // 選択された都道府県コードの配列
  setSelectedPrefs: (prefs: number[]) => void; // 選択された都道府県コードを更新する関数
};

export default function PrefectureCheckboxList({
  prefectures,
  selectedPrefs,
  setSelectedPrefs,
}: Props) {
  // チェックボックスの変更ハンドラー
  const handleCheckboxChange = (prefCode: number) => {
    if (selectedPrefs.includes(prefCode)) {
      // 既に選択されている場合は解除
      setSelectedPrefs(selectedPrefs.filter((code) => code !== prefCode));
    } else {
      // 選択されていない場合は追加
      setSelectedPrefs([...selectedPrefs, prefCode]);
    }
  };

  return (
    <div className="prefecture-checkbox-list">
      <h2>都道府県を選択してください</h2>
      <div className="prefectures">
        {prefectures.map((pref) => (
          <label key={pref.prefCode} className="prefecture-label">
            <input
              type="checkbox"
              value={pref.prefCode}
              checked={selectedPrefs.includes(pref.prefCode)} // チェック状態を設定
              onChange={() => handleCheckboxChange(pref.prefCode)} // チェックボックスの変更ハンドラー
            />
            {pref.prefName} {/* 都道府県名を表示 */}
          </label>
        ))}
      </div>
    </div>
  );
}
