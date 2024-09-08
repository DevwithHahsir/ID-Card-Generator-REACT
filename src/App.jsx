/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [data, SetData] = useState([]); // this stored the saved info of cards
  const [formData, setFormData] = useState({
    // this will save the current info of cards
    username: "",
    degree: "",
    class: "",
    img: "",
  });

  // Load initial data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data"));
    if (storedData) {
      SetData(storedData);
    }
  }, []);

  // HANDEL THE CHANGE EVENT
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // SAVE ALL THE DATA IN FORM
  const HandleSave = (e) => {
    e.preventDefault();

    const NewCard = {
      id: uuidv4(),
      ...formData,
      isCompleted: false,
    };

    const UpdateCard = [...data, NewCard];
    SetData(UpdateCard);
    // Store updated data in localStorage
    localStorage.setItem("data", JSON.stringify(UpdateCard));

    // Reset form data after saving
    setFormData({
      username: "",
      degree: "",
      class: "",
      img: "",
    });
  };

  // TO SAVE IMAG
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      img: URL.createObjectURL(e.target.files[0]),
    }));
  };

  // TO EDIT THE DATA IN THE CARDS

  const HandelEdit = (e, id) => {
    const index = data.findIndex((item) => item.id === id); // Use `data` instead of `formData`
    if (index !== -1) {
      const CardToEdit = data[index]; // Access the correct card object to edit
      setFormData({
        // Update the formData with the selected card's data
        username: CardToEdit.username,
        degree: CardToEdit.degree,
        class: CardToEdit.class,
        img: CardToEdit.img,
      });
    }
    const NewData = data.filter((item) => {
      return item.id !== id;
    });
    SetData(NewData);

    localStorage.setItem("data", JSON.stringify(NewData));
  };

  // REMOVEEEEEEEEEE

  const HandelRemove = (e, id) => {
    // const Index=data.findIndex((item)=>{ return item.id!==id})

    const NewData = data.filter((item) => {
      return item.id !== id;
    });
    SetData(NewData);

    localStorage.setItem("data",JSON.stringify(NewData))
  };

  return (
    <>
      <div className="main-container">
        <div className="form-container">
          <form onSubmit={HandleSave}>
            <h3>Enter the details</h3>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Name"
              onChange={HandleChange}
            />
            <input
              type="text"
              name="degree"
              value={formData.degree}
              placeholder="Degree"
              onChange={HandleChange}
            />
            <input
              type="number"
              name="class"
              value={formData.class}
              placeholder="Class"
              onChange={HandleChange}
            />
            <input type="file" name="img" onChange={handleFileChange} />
            <button type="submit" onClick={HandleSave}>
              Save Card
            </button>
          </form>
        </div>

        {/* Render the cards */}
        <div className="Main-card-container">
          {data.map((element, index) => (
            <div className="card-container" key={element.id}>
              <div className="img-container">
                {element.img && <img src={element.img} alt="User uploaded" />}
              </div>
              <div className="info-container">
                <div className="name">{element.username}</div>
                <div className="degree">{element.degree}</div>
                <div className="class">{element.class}</div>
              </div>

              <div className="btn-container">
                <button
                  className="edit"
                  onClick={(e) => {
                    HandelEdit(e, element.id);
                  }}
                >
                  Edit
                </button>

                <button
                  className="remove"
                  onClick={(e) => {
                    HandelRemove(e, element.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
