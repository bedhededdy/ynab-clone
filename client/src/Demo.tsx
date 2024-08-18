//import { ScrollArea } from "@/components/ui/scroll-area";
//import { Separator } from "@/components/ui/separator";
//import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/ui/collapsible";
//
//import {
//  ResizableHandle,
//  ResizablePanel,
//  ResizablePanelGroup,
//} from "@/components/ui/resizable"
//
//import "./App.css";
//
//const LeftSidebar = () => {
//  return (
//    <></>
//  );
//}
//
//const RightSidebar = () => {
//  return (
//    <></>
//  );
//}
//
//const Header = () => {
//  return (
//    <></>
//  );
//}
//
//const tags = Array.from({ length: 700 }).map(
//  (_, i, a) => `v1.2.0-beta.${a.length - i}`
//)
//
//const MainContent = () => {
//  return (
//    <div className="h-full flex flex-col p-10">
//      <div className="h-1/6">
//        <p>foobar</p>
//      </div>
//        <ScrollArea className="flex-1 w-fit rounded-md border">
//          <div className="p-4">
//            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
//            {tags.map((tag) => (
//              <>
//                <div key={tag} className="text-sm">
//                  {tag}
//                </div>
//                <Separator className="my-2" />
//              </>
//            ))}
//          </div>
//        </ScrollArea>
//    </div>
//  );
//}
//
//export function ResizableDemo() {
//  return (
//    <ResizablePanelGroup
//      direction="horizontal"
//      className="max-w-md rounded-lg border"
//    >
//      <ResizablePanel defaultSize={50} minSize={10}>
//        <div className="flex h-[200px] items-center justify-center p-6">
//          <span className="font-semibold">One</span>
//        </div>
//      </ResizablePanel>
//      <ResizableHandle />
//      <ResizablePanel defaultSize={50}>
//        <ResizablePanelGroup direction="vertical">
//          <ResizablePanel defaultSize={25}>
//            <div className="flex h-full items-center justify-center p-6">
//              <span className="font-semibold">Two</span>
//            </div>
//          </ResizablePanel>
//          <ResizableHandle />
//          <ResizablePanel defaultSize={75}>
//            <div className="flex h-full items-center justify-center p-6">
//              <span className="font-semibold">Three</span>
//            </div>
//          </ResizablePanel>
//        </ResizablePanelGroup>
//      </ResizablePanel>
//    </ResizablePanelGroup>
//  )
//}
//
//const App = () => {
//  return (
//    <div className="h-dvh w-dvw">
//      <div className="h-full w-full">
//        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
//          <ResizablePanel defaultSize={15} maxSize={30} minSize={10}>
//            <div className="h-full w-full bg-blue-400">
//              <span>This is my sidebar</span>
//            </div>
//          </ResizablePanel>
//          <ResizableHandle />
//          <ResizablePanel defaultSize={85}>
//            <div className="h-[10%] w-full bg-red-400">
//              <span>This is my navbar</span>
//            </div>
//            <ResizablePanelGroup direction="horizontal" className="w-full h-full flex flex-col">
//              <ResizablePanel defaultSize={85}>
//                <div className="h-full w-full bg-yellow-400 flex flex-row justify-between">
//                  {/* All of this inner content functions as 1 table row */}
//                  <div className="h-full min-w-[50%] flex-1 bg-slate-500">
//                    <span>Category</span>
//                  </div>
//                  <div className="h-full min-w-[40%] flex flex-row justify-between bg-amber-600">
//                    <div>
//                      <span>Assigned</span>
//                    </div>
//                    <div>
//                      <span>Activity</span>
//                    </div>
//                    <div>
//                      <span>Available</span>
//                    </div>
//                  </div>
//                </div>
//              </ResizablePanel>
//              <ResizableHandle />
//              <ResizablePanel defaultSize={15} maxSize={30} minSize={10}>
//                <div className="h-full w-full bg-pink-400">
//                  <span>This is my other sidebar</span>
//                </div>
//              </ResizablePanel>
//            </ResizablePanelGroup>
//          </ResizablePanel>
//        </ResizablePanelGroup>
//      </div>
//    </div>
//  );
//}
//
//export default App;
//
