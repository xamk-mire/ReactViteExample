import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./components/root";
import ErrorPage from "./error-page";
import Index from "./components";
import Contact from "./components/contact";
import EditContact from "./components/edit";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Index />} />
          <Route path="contacts/:contactId" element={<Contact />} />
          <Route path="contacts/:contactId/edit" element={<EditContact />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
