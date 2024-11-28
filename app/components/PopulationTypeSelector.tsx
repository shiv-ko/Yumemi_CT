import '../styles/PopulationTypeSelector.css'; 

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
      setSelectedType('');
    } else {
      setSelectedType(type);
    }
  };

  return (
    <div className="population-type-selector-container">
      {populationTypes.map((type) => (
        <label
          key={type}
          className="population-type-selector-label"
          style={{ marginRight: '10px' }}
        >
          <input
            type="checkbox"
            value={type}
            checked={selectedType === type}
            onChange={() => handleCheckboxChange(type)}
            className="population-type-selector-checkbox"
          />
          <span className="population-type-selector-text">{type}</span>
        </label>
      ))}
    </div>
  );
}