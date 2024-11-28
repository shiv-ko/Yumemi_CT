type Props = {
  selectedType: string; // 選択された人口タイプ
  setSelectedType: (type: string) => void; // 人口タイプを更新する関数
};

const populationTypes = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

export default function PopulationTypeSelector({
  selectedType,
  setSelectedType,
}: Props) {
  // チェックボックスの変更ハンドラー
  const handleCheckboxChange = (type: string) => {
    if (selectedType === type) {
      // クリックしたチェックボックスが既に選択されている場合、選択を解除
      setSelectedType('');
    } else {
      // 他のチェックボックスが選択されている場合、それを解除し、新たに選択
      setSelectedType(type);
    }
  };

  return (
    <div>
      <h2>人口タイプ</h2>
      {populationTypes.map((type) => (
        <label key={type} style={{ marginRight: '10px' }}>
          <input
            type="checkbox"
            value={type}
            checked={selectedType === type}
            onChange={() => handleCheckboxChange(type)}
          />
          {type}
        </label>
      ))}
    </div>
  );
}
