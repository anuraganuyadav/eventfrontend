import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventForm from "./Components/EventForm";
import EventList from "./Components/EventList";
import { SUBFOLDER_NAME } from "./Components/Common/https";

function App() {
  return (
    <Router basename={SUBFOLDER_NAME}>
      <Routes>
        <Route path="/" element={<EventForm />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/edit/:id" element={<EventForm />} />
      </Routes>
    </Router>
  );
}

export default App;
