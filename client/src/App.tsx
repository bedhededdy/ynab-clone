import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserContext } from "@/components/contexts/UserContext";

import User from "@/types/User";

import Login from "@/components/Login";
import Home from "@/components/Home";
import BudgetSelector from "@/components/BudgetSelector";

const AuthenticatedRoutes: React.FC<{ user: User }> = ({ user }) => {
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/chooseBudget" element={<BudgetSelector />} />
      </Routes>
    </UserContext.Provider>
  );
}

const App: React.FC = () => {
  const [user, setUser]  = useState<User | null>(null);

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Login setUser={setUser} isCreate />} />
          <Route path="/*" element={<AuthenticatedRoutes user={user!} />} />
        </Routes>
    </Router>
  )
}

export default App;
