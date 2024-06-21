import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ComposeEmail from "../components/composeEmail";
import EmailHistory from "../components/EmailHistory";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <ComposeEmail />
        <EmailHistory />
      </div>
    </div>
  );
};

export default Dashboard;
