import React, { useState } from 'react';
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName : "",
        email : "",
        password : "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const{signUp, isSigningUp} = useAuthStore();

    const handleSubmit = (e)=>{
        e.preventDefault();

        const success = validateForm();
        if(success === true) signUp(formData);
        console.log("📤 Submitting signup form:", formData);
    };

    const validateForm = ()=>{
        if(!formData.fullName.trim()) return toast.error("FullName is required");
        if(!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if(!formData.password.trim()) return toast.error("Password is required");
        if(formData.password.length < 6) return toast.error("Password should be atleast 6 characters");
        return true; 
    };


  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-7 sm:p-12">
        <div className="w-full max-w-md space-y-10">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

              <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="abc@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>  

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type= {showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type='button' onClick={()=> setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {showPassword ? (
                        <Eye className="size-5 text-base-content/40"/>
                    ) : <EyeOff className="size-5 text-base-content/40"/>}
                </button>
              </div>
            </div> 

            
            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <div className='text-center'>
                <p className='text-base-content/70'>Already have an Account? {" "}
                    <Link to="/login" className='link link-primary'>Sign In</Link>
                </p>
            </div>


          </form>         
        </div>
      </div>

      {/* right side */}
            <AuthImagePattern title="Join Our Community" subtitle="Connect with Friends, share moments, and stay in touch with your loved ones."/>
      
    </div>
  );
};

export default SignUpPage
