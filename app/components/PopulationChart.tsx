import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { PopulationData } from './../types/types';

// 都道府県ごとの人口データの型定義
type PrefData = {
  prefName: string; // 都道府県名
  data: PopulationData[] | undefined; // 人口データ
};

type Props = {
  data: PrefData[]; // グラフに表示するデータの配列
  selectedType: string; // 選択された人口タイプ
};

export default function PopulationChart({ data, selectedType }: Props) {
  // 人口タイプが選択されていない場合のメッセージ  
  if (!selectedType) {
    return <p>人口タイプを選択してください。</p>; 
  }
  // 都道府県が選択されていない場合のメッセージ
  if (data.length === 0) {
    return <p>都道府県を選択してください。</p>; 
  }

  // グラフ用のデータを整形
  const years = data[0].data?.map((item) => item.year) || []; // 年のリストを取得
  const chartData = years.map((year: number, index: number) => {
    const obj: { [key: string]: number | null } = { year }; // 年をキーにオブジェクトを作成
    data.forEach((prefData) => {
      obj[prefData.prefName] = prefData.data
        ? prefData.data[index]?.value
        : null; // 都道府県名をキーに人口値を設定
    });
    return obj;
  });

  return (
    <div>
      <h2>人口推移グラフ</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey="year" /> {/* X軸に年を設定 */}
          <YAxis /> {/* Y軸 */}
          <Tooltip /> {/* ツールチップ */}
          <Legend /> {/* 凡例 */}
          {data.map((prefData, idx) => (
            <Line
              key={idx}
              type="monotone"
              dataKey={prefData.prefName} // 都道府県名をデータキーに設定
              stroke={`hsl(${(idx * 50) % 360}, 70%, 50%)`} // 線の色を設定
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}