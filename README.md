# 人口構成データ可視化ツール

## デモ

[Vercelでデプロイされたアプリケーションはこちらからご覧いただけます。](https://yumemi-g00yl1e8s-kouki-shibatas-projects.vercel.app)

## 目次

- [ディレクトリ構造](#ディレクトリ構造)
- [設計思想](#設計思想)
- [使用技術](#使用技術)
- [注意事項](#注意事項)
- [詳細なディレクトリとファイルの説明](#詳細なディレクトリとファイルの説明)

## ディレクトリ構造

```
yumemi_ct/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── pages/
│   │   └── HomePage.tsx
│   └── components/
│       ├── PopulationTypeSelector.tsx
│       ├── PrefectureCheckboxList.tsx
│       └── PopulationChart.tsx
├── services/
│   └── api.ts
├── types/
│   └── types.ts
├── styles/
│   ├── globals.css
│   ├── PrefectureCheckboxList.css
│   ├── PopulationTypeSelector.css
│   └── HomePage.css
├── tests/
│   └── e2e/
│       └── example.spec.ts
├── public/
│   └── favicon.ico
├── node_modules/
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 設計思想

### モジュール化と再利用性

- **コンポーネントの分離**: 各 UI 要素を独立したコンポーネントとして作成し、再利用性と可読性を向上させました。

### 型定義の一元化

- **`types` ディレクトリ**: 型定義を `types/types.ts` にまとめ、型の再利用と一貫性を保ちました。

### API サービスの分離

- **`services/api.ts`**: API 呼び出しロジックを専用のサービス層に分離し、コンポーネントの責務を軽減しました。

### テスト駆動開発

- **Playwright を使用したテスト**: E2E テストを導入し、ユーザー視点でのアプリケーションの動作確認と品質向上を図りました。

## 使用技術

- **フレームワーク**: Next.js (React 18)
- **言語**: TypeScript
- **グラフライブラリ**: Recharts
  - *Recharts が React 19 をサポートしていなかったため、React のバージョンを 18 にダウングレードしました。*
- **スタイリング**: CSS（グローバルスタイル）
- **テスト**: Playwright
- **デプロイ**: Vercel

## 注意事項

- **React のバージョンについて**

  Recharts が React 19 をサポートしていなかったため、React のバージョンを 18 にダウングレードしました。

---

## 詳細なディレクトリとファイルの説明

### `app/` ディレクトリ

Next.js の `App Router` を使用したページやレイアウトを含む主要なディレクトリです。

- **`page.tsx`**

  - ルートパス（`/`）に対応するページコンポーネントです。
  - `HomePage` コンポーネントを読み込み、レンダリングしています。

- **`pages/`**

  - **`HomePage.tsx`**

    - アプリケーションのメインページであり、主要なロジックと状態管理を行います。
    - componentsを呼び出し、制御・表示しています。
    - 以下の機能を持ちます：
      - 都道府県データの取得と都道府県をチェックボックスで選択。
      - 人口タイプの選択。
      - 選択されたものに応じてグラフの表示。

- **`components/`**

  再利用可能な UI コンポーネントを格納しています。

  - **`PopulationTypeSelector.tsx`**

    - 人口タイプ（総人口、年少人口、生産年齢人口、老年人口）を選択するためのコンポーネントです。
    - チェックボックスを使用して、一つの人口タイプを選択します。
    - 選択された人口タイプを親コンポーネント(HomePage.tsx)に伝えます。

  - **`PrefectureCheckboxList.tsx`**

    - 都道府県の一覧をチェックボックス形式で表示するコンポーネントです。
    - ユーザーは複数の都道府県を選択・解除できます。
    - 選択された都道府県のコードを親コンポーネント(HomePage.tsx)に伝えます。

  - **`PopulationChart.tsx`**

    - 選択された人口タイプと都道府県に基づいて、人口推移をグラフで表示するコンポーネントです。
    - Recharts ライブラリを使用して折れ線グラフを描画します。
    - 都道府県や人口タイプが選択されていない場合は、適切なメッセージを表示します。

### `services/` ディレクトリ

API 呼び出しに関連するロジックをまとめています。

- **`api.ts`**

  - 都道府県一覧と人口構成データを取得する関数を定義しています。
  - `fetchPrefectures()`：都道府県の一覧を取得します。
  - `fetchPopulationComposition(prefCode: number)`：指定された都道府県コードの人口構成データを取得します。
  - エラーハンドリングとデータの整形を行い、コンポーネントで使いやすい形にします。

### `types/` ディレクトリ

TypeScript の型定義を一元管理しています。

- **`types.ts`**

  - アプリケーションで使用するデータの型を定義しています。
  - 主な型定義：
    - `Prefecture`：都道府県オブジェクトの型。
    - `PopulationData`：年ごとの人口データの型。
    - `PopulationComposition`：人口構成データの型。

### `styles/` ディレクトリ

スタイルシートを格納しています。

- **`globals.css`**

  - アプリケーション全体に適用される基本的なスタイルを定義しています。
  - フォント設定、マージン、パディングなどのリセットや共通スタイルを含みます。

- **`PrefectureCheckboxList.css`**

  - `PrefectureCheckboxList` コンポーネント専用のスタイルを定義しています。
  - チェックボックスリストのレイアウトや個々の要素のスタイルを調整します。

- **`PopulationTypeSelector.css`**

  - `PopulationTypeSelector` コンポーネント専用のスタイルを定義しています。
  - チェックボックスのデザインや配置をカスタマイズします。

- **`HomePage.css`**

  - `HomePage` コンポーネント専用のスタイルを定義しています。
  - ページ全体のレイアウトやコンポーネント間のマージンを設定します。

### `tests/` ディレクトリ

テストコードを格納しています。

- **`test-1.spec.ts`**

  - Playwright を使用して生成した テストコードです
  - アプリケーションの主要な機能（例えば、人口タイプの選択やグラフの表示）が正しく動作するかをテストします。

---
