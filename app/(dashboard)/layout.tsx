 
 import Navbar from "@/components/navbar";
 import { getApiLimitCount } from "@/lib/api-limit";
import Sidebar from "@/components/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
   
  //-----------------------------------
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-500">
        <Sidebar apiLimitCount={apiLimitCount}/>
      </div>
      <main className="h-screen md:pl-72 pb-10   bg-blue-200 ">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
