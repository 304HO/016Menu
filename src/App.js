import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuList from "./components/MenuList";
import AdminPage from "./components/AdminPage";
import Header from "./components/Header";
import BusinessInfo from "./components/BusinessInfo";
import Footer from "./components/Footer";
import HeaderMenu from "./components/HeaderMenu";
import styled from "styled-components";
import { db } from "./firebase-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const App = () => {
  const [menuData, setMenuData] = useState([]);
  const [menuType, setMenuType] = useState("menu");

  const handleMenuTypeChange = (newMenuType) => {
    setMenuType(newMenuType);
  };
  // 추가된부분

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "menu"), orderBy("menuName"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setMenuData(data);
    };
    fetchData();
  }, []);

  const categorizedMenuData = {
    menu: menuData.filter((menu) => menu.category === "menu"),
    sideMenu: menuData.filter((menu) => menu.category === "sideMenu"),
    drinkMenu: menuData.filter((menu) => menu.category === "drinkMenu"),
  };

  return (
    <Router>
      <ContentContainer>
        <BackgroundImage />
        <Header />
        <Logo />
        <HeaderMenu onMenuTypeChange={handleMenuTypeChange} />{" "}
        <Routes>
          <Route
            exact
            path="/016Menu"
            element={<MenuList menus={categorizedMenuData[menuType]} />}
          />
          <Route
            path="/admin"
            element={
              <AdminPage
                menus={menuData}
                onAddMenu={(newMenu) => setMenuData([...menuData, newMenu])}
                onDeleteMenu={(menuName) =>
                  setMenuData(
                    menuData.filter((menu) => menu.menuName !== menuName)
                  )
                }
                onUpdateMenu={(menuName, updatedMenu) => {
                  setMenuData(
                    menuData.map((menu) =>
                      menu.menuName === menuName ? updatedMenu : menu
                    )
                  );
                }}
              />
            }
          />
        </Routes>
        <BusinessInfo />
        <Footer />
      </ContentContainer>
    </Router>
  );
};

export default App;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://304HO.github.io/016Menu/background.jpeg");
  background-size: cover;
  background-position: center;
  filter: blur(5px) brightness(0.5);
  z-index: -1;
`;

const Logo = styled.img`
  background-image: url("https://304HO.github.io/016Menu/logo.PNG");
`;
