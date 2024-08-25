import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button";

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useHTTPContext } from "@/components/contexts/HTTPContext";

const LeftSidebar: React.FC<{budgetId: string}> = ({ budgetId }) => {
  return (
    <div className="h-full w-full bg-blue-400">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full" variant="outline">{budgetId}</Button>
        </DropdownMenuTrigger>
        {/* ECP FIXME: NEED TO USE JS TO CALC THE WIDTH OF THE BUTTON AND MATCH IT */}
        <DropdownMenuContent>

        </DropdownMenuContent>
      </DropdownMenu>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button className="w-full" variant="outline">Budget</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>1</p>
          <p>2</p>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button className="w-full" variant="outline">Loans</Button>
        </CollapsibleTrigger>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button className="w-full" variant="outline">Tracking</Button>
        </CollapsibleTrigger>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button className="w-full" variant="outline">Closed</Button>
        </CollapsibleTrigger>
      </Collapsible>

    </div>
  );
}

const StatusBar: React.FC = () => {
  return (
    <div className="h-[10%] w-full bg-red-400">
      <span>This is my navbar</span>
    </div>
  );
}

const RightSidebar: React.FC = () => {
  return (
    <div className="h-full w-full bg-pink-400">
      <span>This is my other sidebar</span>
    </div>
  );
}

const BudgetOverviewTable: React.FC = () => {
  return (
    <ScrollArea className="h-full w-full">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {/* ECP TODO: SPECIFY THE WIDTH PERCENTAGE OF EACH COLUMN */}
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Assigned</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Available</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{/* ECP TODO: NEED EXPAND HERE*/}</TableCell>
            {/* ECP FIXME: TICKING THE CHECKBOX SLIGHTLY SHIFTS THE CONTENT DOWNWARDS */}
            <TableCell><Checkbox /></TableCell>
            <TableCell>CC Payments</TableCell>
            <TableCell>$100</TableCell>
            <TableCell>-$30</TableCell>
            <TableCell>$70</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

const BudgetOverviewCategoryGroup: React.FC = () => {
  return <></>
}

const BudgetOverviewRow: React.FC = () => {
  return <></>
}

const BudgetOverview: React.FC = () => {
  const { budgetId } = useParams<{budgetId: string}>();

  if (budgetId === undefined) {
    return;
  }

  const http = useHTTPContext();

  useEffect(() => {
    // http.get("/api/getBudgetOverview")
    console.log("got here");
  }, [])

  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel defaultSize={15} maxSize={30} minSize={10}>
          <LeftSidebar budgetId={budgetId}/>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={85}>
          <StatusBar />
          <ResizablePanelGroup direction="horizontal" className="w-full h-full flex flex-col">
            <ResizablePanel defaultSize={85}>
              <BudgetOverviewTable />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={15} maxSize={30} minSize={10}>
              <RightSidebar />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default BudgetOverview;
