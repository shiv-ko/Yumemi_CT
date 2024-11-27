//API呼び出し関数の定義ファイル
import { Prefecture, PopulationComposition } from '../types/types';

// APIのエンドポイントとAPIキーを定数として定義
const API_ENDPOINT = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

// 都道府県データを取得する関数
export const fetchPrefectures = async (): Promise<Prefecture[]> => {
  const res = await fetch(`${API_ENDPOINT}/prefectures`, {
    headers: {
      'X-API-KEY': API_KEY, // APIキーをヘッダーに設定
    },
  });

  if (!res.ok) {
    throw new Error('都道府県データの取得に失敗しました。');
  }

  const data = await res.json();
  return data.result as Prefecture[]; // 都道府県データを返す
};

// 人口構成データを取得する関数
export const fetchPopulationComposition = async (prefCode: number): Promise<PopulationComposition[]> => {
  const res = await fetch(`${API_ENDPOINT}/population/composition/perYear?prefCode=${prefCode}`, {
    headers: {
      'X-API-KEY': API_KEY, // APIキーをヘッダーに設定
    },
  });

  if (!res.ok) {
    throw new Error('人口構成データの取得に失敗しました。');
  }

  const data = await res.json();
  return data.result.data as PopulationComposition[]; // 人口構成データを返す
};
