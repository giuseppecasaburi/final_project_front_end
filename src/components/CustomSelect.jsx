// MultiSelect.jsx
import Select from 'react-select';

function CustomSelect({ optionsData = [], onChange, placeholder = "Seleziona opzioni" }) {
  // Mappatura dati in formato accettato da react-select
  const options = optionsData.map(item => ({
    value: item.id,
    label: item.name
  }));

  return (
    <Select
      options={options}
      isMulti
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default CustomSelect