import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLoyOut from "./loyout/MainLoyOut";

import Home from "./pages/Home";
import JobsInformation from "./pages/JobsInformation";
import PostsJob from "./pages/PostsJob";
import SingleJobInformation from "./component/SingleJobInformation";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Login from "./component/Login";
import Register from "./component/Register";
import SingleUser from "./pages/SingleUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLoyOut />}>
          <Route index element={<Home />} />
          <Route path="/jobs" element={<JobsInformation />} />
          <Route path="/post-job" element={<PostsJob />} />
          <Route path="/jobs/:id" element={<SingleJobInformation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/:id" element={<SingleUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
