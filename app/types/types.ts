// 都道府県データの型定義
export type Prefecture = {
  prefCode: number; // 都道府県コード
  prefName: string; // 都道府県名
};

// 人口データの型定義
export type PopulationData = {
  year: number; // 年
  value: number; // 人口数
};

// 人口構成データの型定義
export type PopulationComposition = {
  label: string; // 人口タイプのラベル（例：総人口、年少人口など）
  data: PopulationData[]; // 各年の人口データ
};
