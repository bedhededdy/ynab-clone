import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const BudgetOverview: React.FC = () => {
  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel defaultSize={15} maxSize={30} minSize={10}>
          <div className="h-full w-full bg-blue-400">
            <span>This is my sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={85}>
          <div className="h-[10%] w-full bg-red-400">
            <span>This is my navbar</span>
          </div>
          <ResizablePanelGroup direction="horizontal" className="w-full h-full flex flex-col">
            <ResizablePanel defaultSize={85}>
              <div className="h-full w-full bg-yellow-400 flex flex-row justify-between">
                {/* All of this inner content functions as 1 table row */}
                <div className="h-full min-w-[50%] flex-1 bg-slate-500">
                  <span>Category</span>
                </div>
                <div className="h-full min-w-[40%] flex flex-row justify-between bg-amber-600">
                  <div>
                    <span>Assigned</span>
                  </div>
                  <div>
                    <span>Activity</span>
                  </div>
                  <div>
                    <span>Available</span>
                  </div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={15} maxSize={30} minSize={10}>
              <div className="h-full w-full bg-pink-400">
                <span>This is my other sidebar</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default BudgetOverview;
