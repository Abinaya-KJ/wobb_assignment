import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage";
import { ProfileDetailPage } from "@/pages/ProfileDetailPage";
import { SavedListProvider } from "@/context/SavedListContext";

function App() {
  return (
    <SavedListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/profile/:username" element={<ProfileDetailPage />} />
        </Routes>
      </BrowserRouter>
    </SavedListProvider>
  );
}

export default App;
