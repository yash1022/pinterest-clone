import { Home, Compass, PlusCircle, Settings,Bell } from "lucide-react";
import { Link } from 'react-router-dom';


const Sidebar = ({SetQuery}) => {
  const user= localStorage.getItem('user')
  return (
    <>



    <div className="h-full w-20 bg-[#37393b] flex flex-col items-center py-6 justify-between mt-10 border-r-1 border-gray-500">

        
     

     <div className="space-y-6">
        <SidebarIcon icon={<Link to='/'><Home size={28} color="white" onClick={()=>SetQuery(null)} /></Link>} />
        <SidebarIcon icon={<Compass size={28} />} />
       <SidebarIcon icon={ <Link to='/create'><PlusCircle size={28} color="white" /></Link>} />
        <SidebarIcon icon={<Bell size={28} />} />
      </div>

      {/* Bottom Icon */}
      <div className="space-y-1 mb-7">
       
        <SidebarIcon icon={<Settings size={28} />} />
      </div>
    </div>
    
    
    </>
    
      
    
  );
};

const SidebarIcon = ({ icon }) => {
  return (
    <div className="p-3 rounded-lg hover:bg-gray-600 cursor-pointer">
      {icon}
    </div>
  );
};

export default Sidebar;
