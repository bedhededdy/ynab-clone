import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    }

    return (
        <Button onClick={goToLogin}>Go to login</Button>
    )
}

export default Home;
