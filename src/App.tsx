import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import PageOne from "@/pages/pageOne";
import PageTwo from "@/pages/pageTwo";
import TeamPage from "@/pages/team";

function App() {
    return (
        <Routes>
            <Route element={<IndexPage />} path="/" />
            <Route element={<PageOne />} path="/carcinogens" />
            <Route element={<PageTwo />} path="/page2" />
            <Route element={<TeamPage />} path="/team" />
        </Routes>
    );
}

export default App;
