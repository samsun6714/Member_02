/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Bell, 
  ChevronRight, 
  Coffee, 
  CreditCard, 
  Edit3, 
  EyeOff, 
  Globe, 
  LayoutDashboard, 
  Lock, 
  LogOut, 
  Mail, 
  Settings as SettingsIcon, 
  ShieldCheck, 
  ShoppingBag, 
  Star, 
  User 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Screen = 'login' | 'dashboard' | 'profile' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {currentScreen === 'login' && (
          <Login key="login" onLogin={handleLogin} />
        )}
        
        {isLoggedIn && currentScreen !== 'login' && (
          <Layout key="app-layout" currentScreen={currentScreen} onNavigate={setCurrentScreen}>
            {currentScreen === 'dashboard' && <Dashboard />}
            {currentScreen === 'profile' && <Profile />}
            {currentScreen === 'settings' && <Settings onLogout={handleLogout} />}
          </Layout>
        )}
      </AnimatePresence>
    </div>
  );
}

// Components

function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="w-full max-w-md p-6"
    >
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-50/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-brand-primary">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">เข้าสู่ระบบ</h1>
          <p className="text-sm text-gray-500 mt-2">ยินดีต้อนรับกลับสู่ระบบสมาชิก</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="example@email.com"
                className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900 placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full h-14 pl-12 pr-12 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900 placeholder:text-gray-300"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <EyeOff size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-200 text-brand-primary focus:ring-brand-primary" />
              <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">จดจำฉัน</span>
            </label>
            <a href="#" className="text-sm text-brand-primary font-semibold hover:underline">ลืมรหัสผ่าน?</a>
          </div>

          <button 
            type="submit"
            className="w-full h-14 bg-brand-primary text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-transform"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function Layout({ children, currentScreen, onNavigate }: { children: React.ReactNode, currentScreen: Screen, onNavigate: (s: Screen) => void }) {
  return (
    <div className="w-full max-w-md h-screen flex flex-col bg-brand-surface relative overflow-hidden">
      {/* Top Header */}
      <header className="h-16 flex items-center justify-between px-6 bg-white shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" 
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-brand-primary text-lg">Membership</span>
        </div>
        <button className="p-2 text-brand-primary relative">
          <Bell size={24} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 flex justify-around items-center h-20 px-4 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-20">
        <NavButton 
          active={currentScreen === 'dashboard'} 
          icon={<LayoutDashboard />} 
          label="Dashboard" 
          onClick={() => onNavigate('dashboard')} 
        />
        <NavButton 
          active={currentScreen === 'profile'} 
          icon={<User />} 
          label="Profile" 
          onClick={() => onNavigate('profile')} 
        />
        <NavButton 
          active={currentScreen === 'settings'} 
          icon={<SettingsIcon />} 
          label="Settings" 
          onClick={() => onNavigate('settings')} 
        />
      </nav>
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${active ? 'text-brand-primary' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <div className={`p-2 rounded-xl transition-all ${active ? 'bg-blue-50' : 'bg-transparent'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}

function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">สวัสดี, สมชาย</h2>
        <p className="text-gray-500 mt-2">Here is your membership overview.</p>
      </div>

      {/* Points Card */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <Star size={20} fill="currentColor" />
          <span className="text-xs font-bold uppercase tracking-widest">Available Points</span>
        </div>
        <div className="text-5xl font-extrabold text-gray-900 tracking-tight">1,250</div>
        <button className="flex items-center gap-2 mt-6 text-brand-primary font-bold group">
          <span>Redeem Rewards</span>
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Membership Status */}
      <div className="bg-brand-primary rounded-3xl p-8 text-white shadow-lg shadow-blue-600/20">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[2px] opacity-70">Current Status</span>
            <div className="text-2xl font-bold mt-1">Gold Member</div>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <ShieldCheck size={28} />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold">
            <span className="opacity-70">Progress to Platinum</span>
            <span>2,500 pts</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "50%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-lg">Recent Activity</h3>
          <button className="text-brand-primary text-sm font-bold">View All</button>
        </div>
        <div className="divide-y divide-gray-50">
          <ActivityItem 
            icon={<Coffee className="text-blue-600" />} 
            title="Coffee Purchase" 
            time="Today, 08:30 AM" 
            points="+25 pts" 
          />
          <ActivityItem 
            icon={<ShoppingBag className="text-blue-600" />} 
            title="Merchandise Store" 
            time="Yesterday, 14:15 PM" 
            points="+120 pts" 
          />
          <ActivityItem 
            icon={<CreditCard className="text-red-500" />} 
            title="Reward Claimed" 
            time="Oct 12, 2023" 
            points="-500 pts" 
            isNegative
          />
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, time, points, isNegative }: { icon: React.ReactNode, title: string, time: string, points: string, isNegative?: boolean }) {
  return (
    <div className="px-6 py-4 flex items-center justify-between active:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="font-bold text-gray-900">{title}</div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
      </div>
      <div className={`font-bold ${isNegative ? 'text-red-500' : 'text-brand-primary'}`}>
        {points}
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="space-y-6 pt-4">
      <div className="relative flex flex-col items-center">
        <div className="relative z-10 w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden mb-[-40px]">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
            alt="Somchai"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full bg-white rounded-3xl pt-16 pb-8 px-6 text-center shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">สมชาย ใจดี</h2>
          <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-2 mb-6">
            Silver Member
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Mail size={18} />
            <span>somchai@example.com</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <ProfileInfo icon={<ShieldCheck className="text-brand-primary" />} label="Phone Number" value="081-234-5678" />
        <ProfileInfo icon={<ShieldCheck className="text-brand-primary" />} label="Member Since" value="Oct 2023" />
      </div>

      <button className="w-full h-14 bg-white border border-gray-100 font-bold text-brand-primary rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-sm">
        <Edit3 size={20} />
        แก้ไขข้อมูล
      </button>
    </div>
  );
}

function ProfileInfo({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl flex items-center gap-5 shadow-sm border border-gray-100">
      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-400 font-medium mb-0.5">{label}</div>
        <div className="font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

function Settings({ onLogout }: { onLogout: () => void }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold px-1">Settings</h2>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-brand-primary">
              <Bell size={20} />
            </div>
            <span className="font-bold">การแจ้งเตือน</span>
          </div>
          <button 
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-brand-primary' : 'bg-gray-200'}`}
          >
            <motion.div 
              animate={{ x: notifications ? 24 : 4 }}
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
            />
          </button>
        </div>

        <button className="p-6 w-full flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-brand-primary">
              <Lock size={20} />
            </div>
            <span className="font-bold">เปลี่ยนรหัสผ่าน</span>
          </div>
          <ChevronRight size={20} className="text-gray-300" />
        </button>

        <button className="p-6 w-full flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-brand-primary">
              <Globe size={20} />
            </div>
            <span className="font-bold">เลือกภาษา</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
            <span>ไทย</span>
            <ChevronRight size={18} className="rotate-90" />
          </div>
        </button>
      </div>

      <button 
        onClick={onLogout}
        className="w-full h-14 bg-red-50 border border-red-100 text-red-500 font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}
