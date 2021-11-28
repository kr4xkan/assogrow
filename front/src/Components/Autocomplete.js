const AutoComplete = ({ data, onChange, value, title }) => {
  return (
    <div className="input">
      <label htmlFor="nom">{title}</label>
      <select id="partner" value={value} onChange={onChange}>
        {data.map((suggestion, index) => {
          return (
            <option
              value={suggestion._id}
              key={index}
            >{suggestion.name || suggestion.nom || suggestion.item}</option>
          );
        })}
        ;
      </select>
    </div>
  );
};

export default AutoComplete;
