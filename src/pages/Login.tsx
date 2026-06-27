import React from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/services/storage';
import { Zap, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Login = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const ADMIN_EMAIL = 'ge5853987@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (isLogin) {
        const users = storage.getUsers();
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        // Special check for initial admin
        if (email === ADMIN_EMAIL && password === 'zeus123') {
          const adminUser = { name: 'Zeus', email: ADMIN_EMAIL, role: 'admin' };
          storage.setCurrentUser(adminUser);
          toast.success('Welcome back, Super Admin!');
          navigate('/admin');
        } else if (user) {
          storage.setCurrentUser(user);
          toast.success(`Welcome back, ${user.name}!`);
          navigate('/profile');
        } else {
          toast.error('Invalid email or password');
        }
      } else {
        if (!name || !email || !password) {
          toast.error('Please fill in all fields');
        } else {
          const users = storage.getUsers();
          if (users.find((u: any) => u.email === email)) {
            toast.error('Email already registered');
          } else {
            const newUser = { name, email, password, role: 'user' };
            storage.setUsers([...users, newUser]);
            storage.setCurrentUser(newUser);
            toast.success('Registration successful!');
            navigate('/profile');
          }
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-card rounded-3xl border border-primary/20 p-8 shadow-[0_0_30px_rgba(0,242,255,0.1)]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Zap className="text-primary w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Log in to your Zeus FF Journal account' : 'Join the ultimate Free Fire community'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  className="pl-10 h-12 bg-accent/10 border-primary/10 focus:border-primary"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                className="pl-10 h-12 bg-accent/10 border-primary/10 focus:border-primary"
                placeholder="email@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-medium">Password</label>
              {isLogin && <button type="button" className="text-xs text-primary hover:underline">Forgot Password?</button>}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                className="pl-10 h-12 bg-accent/10 border-primary/10 focus:border-primary"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button 
            className="w-full h-12 bg-primary text-primary-foreground font-bold text-lg shadow-[0_0_15px_rgba(0,242,255,0.3)]"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : (isLogin ? 'LOG IN' : 'CREATE ACCOUNT')}
            {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button 
            className="ml-2 text-primary font-bold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>

        {isLogin && (
          <div className="mt-8 pt-8 border-t border-border">
            <div className="bg-primary/5 rounded-xl p-4 text-xs text-muted-foreground leading-relaxed">
              <span className="font-bold text-primary block mb-1">Demo Admin Access:</span>
              Email: ge5853987@gmail.com<br />
              Password: zeus123
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
