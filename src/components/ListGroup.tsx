import {  useState, useEffect } from "react";

function ListGroup() {
  let items = ["New york", "San Fransisco", "Tokyo", "London", "Paris"];

  //Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [text_h1, setTextH1] = useState("List");
  const [is_title_clicked, setTitleClicked] = useState(false);

  // React Component Lifecycle :
  // - on loading state
  // - on load state
  // - ketika component nya udah pengen dibuang / diapus

  // React Hooks :
  // useEffect
  // useState
  // useMemo
  // useFetch
  // useContext
  // dll......

  
  useEffect(() => {
    setTextH1("Last");
  }, []); // <-- array kosong = // -> trigerred by on load state

  // ganti judul ketika state is_title_clicked berubah value nya
  useEffect(() => {
    // ternary operator => if-else jadi -> ? :
    is_title_clicked == true ? setTextH1("Im the Last") :  setTextH1("Last")
  }, [is_title_clicked]); // -> trigerred by on state change

  // Atomic design atau component based
  // memecah tampilan menjadi komponen-komponen sekecil mungkin 
  // dan membuat komponen tersebut menjadi ReUsable, dengan tujuan coding efisiensi 
  // Dalam clean code metode disebut DRY (Dont Repeat Yourself)

  // Namun dalam Frontend tidak semuanya bersifat Component, ada juga yg bersifat atau biasa disebut Screen

  return (
    <>
      {/* Ganti List jadi Last pake React  */}
      <h1>{text_h1}</h1>
      <button
        onClick={() => {
          setTitleClicked(!is_title_clicked);
        }}
      >Ganti Judul</button>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
