import { Prefecture } from './../types/types';

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
    <div>
      <h2>都道府県</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {prefectures.map((pref) => (
          <label key={pref.prefCode} style={{ margin: '5px' }}>
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
