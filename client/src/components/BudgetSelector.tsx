import budgetImage from "@/assets/placeholder-image.jpg";

import { useEffect, useState } from "react";

import { CirclePlus } from "lucide-react";

import Budget from "@/views/Budget";

import { useHTTPContext } from "@/components/contexts/HTTPContext";
import { useUserContext } from "@/components/contexts/UserContext";

const BudgetButton: React.FC<Budget> = ({ id, name }) => {
  id = id;
  name = name;
  return (
    <></>
  )
}

const BudgetSelector: React.FC = () => {
    // *ECP TODO: NEED TO HAVE A MECHANSIM TO GO BACK TO LOGIN/HOME
    const http = useHTTPContext();

    const user = useUserContext();

    const [budgets, setBudgets] = useState([]);

    console.log("uid: ", user.id);

    useEffect(() => {
      http.get("/api/getBudgetList", {
        params: {
          userId: user.id
        }
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.error(error);
      })
    }, [])

    return (
      <div className="p-4">
        <h2 className="text-4xl ">Your Budgets</h2>
        <div className="py-4 flex flex-row gap-4">
          <button className="border-slate-500 border-2 rounded-md p-2">
            <div>
              <img className="max-w-24 rounded-sm" src={budgetImage} alt="Budget" />
            </div>
            <span>Your Budget</span>
          </button>
          <button className="border-slate-500 border-2 rounded-md p-2">
            <div>
                <CirclePlus size={50} />
            </div>
            <span>Create new budget</span>
          </button>
        </div>
      </div>
    )
}

export default BudgetSelector;
