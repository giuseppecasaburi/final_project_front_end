import Select from 'react-select';

function CustomSelectDirector({ optionsData = [], onChange, placeholder = "Seleziona persone" }) {
  const options = optionsData.map(person => ({
    value: `${person.name}-${person.surname}`,  // puoi personalizzare la value
    label: `${person.name} ${person.surname}`
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

export default CustomSelectDirector