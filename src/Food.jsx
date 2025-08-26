const Food = (props) => {
  return (
    <div className="food">
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      <img
        src={props.image ? props.image : "https://picsum.photos/200"}
        alt={props.name}
        height="200"
        width="200"
      />
    </div>
  );
};

export default Food;
