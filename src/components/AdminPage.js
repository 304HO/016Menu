import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = ({ menus, onAddMenu, onDeleteMenu, onUpdateMenu }) => {
  const history = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("menu");
  const [editingMenu, setEditingMenu] = useState(null);
  const [editedPrice, setEditedPrice] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPhoto, setEditedPhoto] = useState("");
  const [newMenuName, setNewMenuName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const [newPhotoFile, setNewPhotoFile] = useState(null);

  const handleEditMenu = (menuName) => {
    const menuToEdit = menus.find((menu) => menu.menuName === menuName);
    setEditingMenu(menuToEdit);
    setEditedPrice(menuToEdit.price);
    setEditedDescription(menuToEdit.description);
    setEditedPhoto(menuToEdit.photo);
  };

  const handleCancelEdit = () => {
    setEditingMenu(null);
    setEditedPrice("");
    setEditedDescription("");
    setEditedPhoto("");
  };

  const handleSaveEdit = () => {
    if (editingMenu) {
      onUpdateMenu(editingMenu.menuName, {
        ...editingMenu,
        price: editedPrice,
        description: editedDescription,
        photo: editedPhoto,
      });
      setEditingMenu(null);
      setEditedPrice("");
      setEditedDescription("");
      setEditedPhoto("");
    }
  };

  const handleAddNewMenu = () => {
    onAddMenu({
      menuName: newMenuName,
      price: newPrice,
      description: newDescription,
      photo: newPhoto,
      category: selectedCategory,
    });
    setNewMenuName("");
    setNewPrice("");
    setNewDescription("");
    setNewPhoto("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPhotoFile(file);
        setNewPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredMenus = menus.filter(
    (menu) => menu.category === selectedCategory
  );

  return (
    <div>
      <h2>Admin Page</h2>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="menu">Menu</option>
        <option value="sideMenu">Side Menu</option>
        <option value="drinkMenu">Drink Menu</option>
      </select>
      <div>
        <h3>Add New Menu</h3>
        <input
          type="text"
          placeholder="Menu Name"
          value={newMenuName}
          onChange={(e) => setNewMenuName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {newPhoto && <img src={newPhoto} alt="New Menu" />}
        <button onClick={handleAddNewMenu}>Add Menu</button>
      </div>
      <div>
        {filteredMenus.map((menu) => (
          <div key={menu.menuName}>
            <p>{menu.menuName}</p>
            {editingMenu === menu ? (
              <>
                <input
                  type="number"
                  placeholder="Price"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Photo URL"
                  value={editedPhoto}
                  onChange={(e) => setEditedPhoto(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEditMenu(menu.menuName)}>
                  Edit
                </button>
                <button onClick={() => onDeleteMenu(menu.menuName)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => history("/016Menu")}>Go to Home</button>
    </div>
  );
};

export default AdminPage;
