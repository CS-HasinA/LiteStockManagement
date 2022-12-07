import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import StockCount from "./components/StockCount/StockCount";
import ReplenishStock from "./components/ReplenishStockCount/ReplenishStock";
import Wastage from "./components/Wastage/Wastage";
import MenuOptions from "./components/MenuOptions";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout title="Lite Stock App">
              <Home />
            </Layout>
          }
        />
        <Route
          path="/LiteStockManagement"
          element={
            <Layout title="Lite Stock App">
              <Home />
            </Layout>
          }
        />
        <Route
          path="/LiteStockManagement/:id"
          element={
            <Layout title="Lite Stock App">
              <MenuOptions />
            </Layout>
          }
        />
        <Route
          path="/LiteStockManagement/:id/StockCount"
          element={
            <Layout title="Stock Count">
              <StockCount />
            </Layout>
          }
        />
        <Route
          path="/LiteStockManagement/:id/ReplenishStock"
          element={
            <Layout title="Replenish Stock">
              <ReplenishStock />
            </Layout>
          }
        />
        <Route
          path="/LiteStockManagement/:id/Wastage"
          element={
            <Layout title="Wastage Count">
              <Wastage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
