import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { ThemeProvider } from './components/ThemeProvider';


function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider >
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </>
  )
}

export default App
