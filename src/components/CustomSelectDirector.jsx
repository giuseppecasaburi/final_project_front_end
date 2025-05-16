import Select from 'react-select';

function CustomSelectDirector({ optionsData = [], onChange, placeholder = "Seleziona opzioni", value }) {

  // Mappatura dati in formato accettato da react-select
  const options = optionsData.map(person => ({
    value: person.id,
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