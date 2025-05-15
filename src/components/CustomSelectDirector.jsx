import Select from 'react-select';

function CustomSelectDirector({ optionsData = [], onChange, placeholder = "Seleziona persone", value }) {
  const options = optionsData.map(person => ({
    value: person.id,  // puoi personalizzare la value
    label: `${person.name} ${person.surname}`
  }));

  return (
    <Select
      options={options}
      isMulti
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

export default CustomSelectDirector