import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase-config";

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

  const handleAddNewMenu = async () => {
    // 모든 데이터를 입력해야 합니다.
    if (newMenuName && newPrice && newDescription && newPhotoFile) {
      try {
        // 이미지를 Firebase Storage에 업로드
        const imageRef = ref(storage, `menuImages/${newMenuName}`);
        await uploadBytes(imageRef, newPhotoFile);

        // 이미지의 다운로드 URL을 가져옴
        const imageUrl = await getDownloadURL(imageRef);

        // Firestore에 데이터 추가
        const newMenu = {
          menuName: newMenuName,
          price: newPrice,
          description: newDescription,
          photo: imageUrl,
          category: selectedCategory,
        };

        const docRef = await addDoc(collection(db, "menu"), newMenu);
        onAddMenu({
          ...newMenu,
          id: docRef.id,
        });

        setNewMenuName("");
        setNewPrice("");
        setNewDescription("");
        setNewPhoto("");
        setNewPhotoFile(null);

        window.alert("Menu added successfully!");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPhotoFile(file);
        setNewPhoto(URL.createObjectURL(file)); // 파일 URL을 사용하여 이미지를 표시
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
