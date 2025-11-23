import React from 'react';
import { User } from '../types';
import { Search } from 'lucide-react';
import { Button } from 'antd';

const RightSidebar: React.FC<{ users: User[]; currentUser: User }> = ({ users }) => {
  return (
    <div className="hidden xl:block w-80 flex-shrink-0">
       <div className="bg-white rounded-xl shadow-sm p-3 mb-6">
          <div className="flex justify-between items-center border-b border-gray-100  mb-4">
            <h6 className="!font-bold text-gray-900">You Might Like</h6>
            <Button className="text-xs text-primary font-medium !border-none">See All</Button>
          </div>
          <div className="flex items-center gap-3 mb-4">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Radovan" className="w-10 h-10 rounded-full bg-gray-100" alt=""/>
             <div>
                <p className="font-bold text-sm !mb-1">Radovan SkillArena</p>
                <p className="text-xs text-gray-500">Founder & CEO at Trophy</p>
             </div>
          </div>
          <div className="flex gap-2 mt-4">
             <Button className="flex-1 border border-gray-300 rounded-lg p-4 text-sm font-medium text-gray-600 hover:bg-gray-50">Ignore</Button>
             <Button className="flex-1 bg-primary text-white rounded-lg p-4 text-sm font-medium hover:bg-blue-600">Follow</Button>
          </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm p-4">
         <div className="flex justify-between items-center mb-4">
            <h6 className="font-bold text-gray-900">Your Friends</h6>
            <Button className="text-xs text-primary font-medium !border-none">See All</Button>
          </div>
          <div className="mb-4">
            <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input type="text" placeholder="Input search text" className="bg-transparent text-sm w-full outline-none" />
            </div>
          </div>
          <ul className="space-y-4">
            {users.map(user => (
              <li key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt="" className="w-9 h-9 rounded-full bg-gray-200" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">CEO of Company</p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </li>
            ))}
          </ul>
       </div>
    </div>
  );
};

export default RightSidebar;
