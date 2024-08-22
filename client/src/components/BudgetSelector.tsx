import budgetImage from "@/assets/placeholder-image.jpg";

import { useEffect, useState, useCallback, useRef, useId} from "react";
import { useNavigate } from "react-router-dom";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { CirclePlus } from "lucide-react";

import Budget from "@/views/Budget";

import { useHTTPContext } from "@/components/contexts/HTTPContext";
import { useUserContext } from "@/components/contexts/UserContext";

interface IBudgetButtonProps {
  budget: Budget;
}

const BudgetButton: React.FC<IBudgetButtonProps> = ({ budget }) => {
  const { id, name } = budget

  const navigate = useNavigate();

  const onBudgetSelected = () => {
    navigate("/budgetOverview/" + id);
  }

  return (
    <button onClick={onBudgetSelected} className="min-w-36 max-w-36 border-foreground border-2 rounded-md p-2">
      <div>
        <img className="max-w-[100%] rounded-sm" src={budgetImage} alt="Budget" />
      </div>
      <span>{name}</span>
    </button>
  )
}

interface ICreateBudgetProps {
  userId: string;
  addBudget: (budget: Budget) => void;
}

const CreateBudget: React.FC<ICreateBudgetProps> = ({ userId, addBudget }) => {
  const http = useHTTPContext();

  const budgetNameRef = useRef<HTMLInputElement>(null);

  const newBudgetId = useId();

  const onCreateBudget = useCallback(() => {
    const budgetName = budgetNameRef.current!.value;

    http.post("/api/createBudget", {
      userId: userId,
      budgetName: budgetName
    }).then(response => {
      // *ECP TODO: MAKE IT RETURN 201 INSTEAD
      if (response.status == 200)
        addBudget(new Budget(response.data.budgetId, response.data.budgetName));
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    })
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="min-w-36 max-w-36 border-foreground border-2 rounded-md p-2 flex flex-col items-center">
          <div>
              <CirclePlus size={96} />
          </div>
          {/* *ECP FIXME: THIS IS FIXING THE WIDHT ISSUE BUT IT WILL INCREASE THE HEIGHT. THIS APPLIES TO EVERY CONTAINER IN THE CONTAINING DIV B/C OF FLEX */}
          <span className="max-w-full text-nowrap overflow-hidden text-ellipsis">Create New Budget fklsd;afl;kdasjdkl;fjasldk;</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Budget</DialogTitle>
        </DialogHeader>
        <DialogDescription>Create a new budget</DialogDescription>
        <form onSubmit={e => e.preventDefault}>
          {/* ECP FIXME: I THINK USING SHADCN FORMS WILL FIX THE SPACING AND MAKE IT ALL CONSISTENT */}
          <Label htmlFor={newBudgetId}>Budget Name</Label>
          <Input id={newBudgetId} type="text" placeholder="New Budget" ref={budgetNameRef} />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onCreateBudget}>Create</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const BudgetSelector: React.FC = () => {
    // *ECP TODO: NEED TO HAVE A MECHANSIM TO GO BACK TO LOGIN/HOME
    const http = useHTTPContext();

    const user = useUserContext();

    const [budgets, setBudgets] = useState<Budget[]>([]);

    const addBudget = (budget: Budget) => {
      setBudgets(prevBudgets => [...prevBudgets, budget]);
    }

    useEffect(() => {
      http.get("/api/getBudgetList", {
        params: {
          userId: user.id
        }
      }).then(response => {
        console.log(response.data);
        // *ECP FIXME: NEED TO CAST THIS TO A BUDGET OBJECT
        setBudgets(response.data.map((budget: any) => new Budget(budget.budgetId, budget.budgetName)));
      }).catch(error => {
        console.error(error);
      })
    }, []);

    return (
      <div className="p-4">
        <h2 className="text-4xl">Your Budgets</h2>
        <div className="py-4 flex flex-row flex-wrap gap-4">
          {budgets.map(budget => <BudgetButton key={budget.id} budget={budget} />)}
          <CreateBudget userId={user.id} addBudget={addBudget} />
        </div>
      </div>
    )
}

export default BudgetSelector;
