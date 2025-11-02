import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch } from "react-redux";
import { authService } from "@/service/auth.service";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const response = await authService.login({ email, password });
      const { token, user } = response;
      dispatch(loginSuccess({ token, user }));
      toast({ title: "Signed in successfully" });
      navigate("/");
    } catch (error: any) {
      dispatch(loginFailure());
      toast({ title: "Login failed", description: error?.response?.data?.message || "Please check your credentials.", variant: "destructive" });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      // Backend signup likely requires: firstName, lastName (optional), email, password, accountType, contactNumber, and otp flow.
      // For now, call direct signup with minimal fields used in current service.
      const response = await authService.signup({ firstName: name, email, password });
      const { token, user } = response;
      dispatch(loginSuccess({ token, user }));
      toast({ title: "Account created" });
      navigate("/");
    } catch (error: any) {
      dispatch(loginFailure());
      toast({ title: "Signup failed", description: error?.response?.data?.message || "Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <Card className="w-full max-w-md p-8 backdrop-blur-sm bg-card/80 border-primary/20 relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-gradient">
            Shell Entertainment
          </Link>
          <p className="text-muted-foreground mt-2">Welcome back! Please enter your details.</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;