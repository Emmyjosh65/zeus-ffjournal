import React from 'react';
import { Routes, Route, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { storage } from '@/services/storage';
import { 
  LayoutDashboard, FileText, Gift, Calendar, Users, 
  Settings, LogOut, Plus, Search, Edit, Trash2, CheckCircle, XCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Admin Sub-pages
const AdminDashboard = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold">Dashboard Overview</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-card/50 border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">1,284</div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Active Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">24</div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase">News Published</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">156</div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Daily Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-secondary">4,890</div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const RedeemManagement = () => {
  const [codes, setCodes] = React.useState(storage.getCodes());
  const [newCode, setNewCode] = React.useState({ code: '', region: 'Global', status: 'Active' as const });

  const handleAddCode = () => {
    if (!newCode.code) return toast.error('Enter a code');
    const updated = [{ 
      id: Date.now().toString(), 
      ...newCode, 
      addedAt: new Date().toISOString().split('T')[0] 
    }, ...codes];
    setCodes(updated);
    storage.setCodes(updated);
    setNewCode({ code: '', region: 'Global', status: 'Active' });
    toast.success('Redeem code added!');
  };

  const toggleStatus = (id: string) => {
    const updated = codes.map(c => 
      c.id === id ? { ...c, status: (c.status === 'Active' ? 'Expired' : 'Active') as 'Active' | 'Expired' } : c
    );
    setCodes(updated);
    storage.setCodes(updated);
  };

  const deleteCode = (id: string) => {
    const updated = codes.filter(c => c.id !== id);
    setCodes(updated);
    storage.setCodes(updated);
    toast.success('Code deleted');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Redeem Codes</h2>
        <Badge variant="outline" className="text-primary border-primary/30">Total: {codes.length}</Badge>
      </div>

      <Card className="bg-accent/5 border-primary/20">
        <CardHeader><CardTitle className="text-lg">Add New Code</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-4 items-end">
          <div className="flex-grow min-w-[200px] space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Redeem Code</label>
            <Input 
              placeholder="e.g. FF1234567890" 
              className="bg-background"
              value={newCode.code}
              onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
            />
          </div>
          <div className="w-40 space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Region</label>
            <select 
              className="w-full bg-background border border-input rounded-md px-3 h-10 text-sm"
              value={newCode.region}
              onChange={(e) => setNewCode({ ...newCode, region: e.target.value })}
            >
              <option value="Global">Global</option>
              <option value="IND">India</option>
              <option value="BR">Brazil</option>
              <option value="NA">North America</option>
            </select>
          </div>
          <Button onClick={handleAddCode} className="h-10 bg-primary text-primary-foreground">
            <Plus size={18} className="mr-2" /> ADD CODE
          </Button>
        </CardContent>
      </Card>

      <div className="bg-card rounded-xl border border-primary/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-accent/10 border-b border-primary/10">
            <tr>
              <th className="p-4 font-bold text-sm">CODE</th>
              <th className="p-4 font-bold text-sm">REGION</th>
              <th className="p-4 font-bold text-sm">STATUS</th>
              <th className="p-4 font-bold text-sm text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            {codes.map((c) => (
              <tr key={c.id} className="hover:bg-primary/5 transition-colors">
                <td className="p-4 font-mono font-bold">{c.code}</td>
                <td className="p-4"><Badge variant="outline">{c.region}</Badge></td>
                <td className="p-4">
                  <button onClick={() => toggleStatus(c.id)}>
                    {c.status === 'Active' ? (
                      <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Active</Badge>
                    ) : (
                      <Badge variant="destructive" className="opacity-50">Expired</Badge>
                    )}
                  </button>
                </td>
                <td className="p-4 text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => deleteCode(c.id)} className="text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Admin = () => {
  const user = storage.getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const sidebarLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Redeem Codes', path: '/admin/codes', icon: Gift },
    { name: 'News Content', path: '/admin/news', icon: FileText },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    storage.setCurrentUser(null);
    navigate('/');
    toast.info('Logged out from admin panel');
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-primary/10 bg-accent/5 p-6 hidden lg:block">
        <div className="mb-10">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Administration</p>
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-3" /> LOG OUT
        </Button>
      </aside>

      {/* Admin Content */}
      <main className="flex-grow p-8">
        <div className="max-w-5xl mx-auto">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="codes" element={<RedeemManagement />} />
            <Route path="*" element={<div className="py-20 text-center text-muted-foreground">Module under development</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Admin;
