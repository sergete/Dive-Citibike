import {Dashboard} from "@/pages/dashboard/Dashboard.tsx";
import {Route, Routes} from "react-router-dom";
import LinksPage from "@/pages/dashboard/links/LinksPage.tsx";
import StatsPage from "@/pages/dashboard/stats/StatsPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function App() {
    return (
        <div className="absolute inset-4 flex flex-col">
            <QueryClientProvider client={queryClient}>
                <Dashboard>
                    <Routes>
                        <Route path='/links' element={<LinksPage/>}/>
                        <Route path='/stats' element={<StatsPage/>}/>
                    </Routes>
                </Dashboard>
            </QueryClientProvider>
        </div>
    )
}
