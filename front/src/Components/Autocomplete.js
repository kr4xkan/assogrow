const AutoComplete = ({ data, onChange, value }) => {
  return (
    <div className="input">
      <label htmlFor="nom">Partenaire</label>
      <select id="partner" value={value} onChange={onChange}>
        {data.map((suggestion, index) => {
          return (
            <option
              value={suggestion._id}
              key={index}
            >{suggestion.name}</option>
          );
        })}
        ;
      </select>
    </div>
  );
};

export default AutoComplete;
