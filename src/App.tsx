import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import SignUpPage from "./pages/SignUp/SignUpPage";
import Stepper from "./components/common/stepper/Stepper";
import CampaignViewDetails from "./components/details/CampaignViewDetails";
import DependentDropdown from "./components/campignForm/ScheduleGroup copy";
import ProductHirarchy from "./components/productHirarchy/ProductHirarchy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
        <Route path="/" element={<MainLayout />}>
            {routes}
        </Route>
        <Route path="/sign-up" element={<SignUpPage/>} />
        {/* <Route path="/campaign/view-details" element={<CampaignViewDetails/>} /> */}
        
        </Route>
      </Routes>
    </BrowserRouter>
    // <ProductHirarchy/>
  );
}

export default App;
