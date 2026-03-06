'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Compass, Mail, Lock, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 9a9 9 0 1 0-10.406 8.892V11.61H5.311V9h2.283V7.015c0-2.253 1.342-3.498 3.397-3.498.984 0 2.014.175 2.014.175V5.93h-1.134c-1.118 0-1.467.694-1.467 1.406V9h2.496l-.399 2.61H10.404V17.892A9.004 9.004 0 0 0 18 9Z" fill="#1877F2"/>
      <path d="m12.501 11.61.399-2.61H10.404V8.336c0-.712.349-1.406 1.467-1.406h1.134V3.692s-1.03-.175-2.014-.175c-2.055 0-3.397 1.245-3.397 3.498V9H5.311v2.61h2.283V17.892a9.063 9.063 0 0 0 2.81 0V11.61h2.097Z" fill="white"/>
    </svg>
  );
}

export default function MerchantAuthPage() {
  const router = useRouter();
  const { login } = useApp();
  const { t } = useLanguage();
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    if (isSignIn) {
      router.push('/merchant/dashboard');
    } else {
      router.push('/merchant/onboarding');
    }
  };

  const handleSocialLogin = () => {
    login();
    router.push('/merchant/onboarding');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <img
          src="https://images.pexels.com/photos/3722811/pexels-photo-3722811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
          alt="Premium business partner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/70 via-foreground/50 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Link href="/splash" className="flex items-center gap-3">
            <Compass className="w-8 h-8" strokeWidth={1.5} />
            <span className="font-serif text-3xl">Voyager</span>
          </Link>

          <div className="space-y-6 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-orange-300" />
              </div>
              <span className="text-sm font-semibold text-orange-200 tracking-wide uppercase">Premium Partner</span>
            </div>
            <h2 className="font-serif text-5xl leading-tight">
              {t.merchantAuthTitle}
            </h2>
            <p className="text-white/75 text-lg leading-relaxed">
              {t.merchantAuthSubtitle}
            </p>
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2">
                {[
                  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
                  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
                  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <p className="text-sm text-white/80">Trusted by 500+ premium businesses</p>
            </div>
          </div>

          <div className="text-xs text-white/40 font-medium tracking-widest uppercase">
            Join Our Premium Network
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex-1 flex items-center justify-center p-8 lg:p-12"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden text-center mb-10">
            <Link href="/splash" className="inline-flex items-center gap-2">
              <Compass className="w-7 h-7 text-primary" strokeWidth={1.5} />
              <span className="font-serif text-3xl text-foreground">Voyager</span>
            </Link>
          </div>

          <div className="space-y-1">
            <h1 className="font-serif text-4xl text-foreground">{t.merchantAuthTitle}</h1>
            <p className="text-muted-foreground">Create your merchant account to get started</p>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleSocialLogin}
              className="w-full bg-white border border-slate-200 text-foreground rounded-full py-3.5 flex items-center justify-center gap-3 font-medium hover:bg-stone-50 transition-colors shadow-sm text-sm"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              type="button"
              onClick={handleSocialLogin}
              className="w-full bg-white border border-slate-200 text-foreground rounded-full py-3.5 flex items-center justify-center gap-3 font-medium hover:bg-stone-50 transition-colors shadow-sm text-sm"
            >
              <FacebookIcon />
              Continue with Facebook
            </button>
          </div>

          <div className="flex items-center gap-4">
            <hr className="flex-1 border-slate-200" />
            <span className="text-sm text-slate-400 font-medium">OR</span>
            <hr className="flex-1 border-slate-200" />
          </div>

          <Tabs defaultValue="signup" className="w-full" onValueChange={(v) => setIsSignIn(v === 'signin')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin" className="rounded-full">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="business@example.com"
                      className="pl-10 h-12 rounded-full border-slate-200 focus-visible:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                    <Link href="/auth/reset" className="text-sm text-primary hover:underline">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 rounded-full border-slate-200 focus-visible:ring-primary"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-full text-base font-medium">
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">Business Name</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your Business"
                      className="pl-10 h-12 rounded-full border-slate-200 focus-visible:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-foreground font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="business@example.com"
                      className="pl-10 h-12 rounded-full border-slate-200 focus-visible:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-foreground font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 rounded-full border-slate-200 focus-visible:ring-primary"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-full text-base font-medium bg-orange-600 hover:bg-orange-700">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="pt-4 border-t border-slate-200 space-y-4">
            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our{' '}
              <span className="underline cursor-pointer">Terms of Service</span> and{' '}
              <span className="underline cursor-pointer">Privacy Policy</span>
            </p>

            <p className="text-sm text-center text-slate-500">
              {t.travelerCtaAuth}{' '}
              <Link href="/auth" className="text-primary font-medium hover:underline">
                {t.travelerRegisterHere}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
