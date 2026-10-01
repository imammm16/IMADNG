import React, { useState } from 'react';
import { UserProfile } from './Header';
import { ProfileHub } from './ProfileHub';
import { OrderItem } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onSignOut: () => void;
  onUpdateUser?: (user: UserProfile) => void;
  userOrders?: OrderItem[];
  onNavigateShop?: () => void;
  isMandatory?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onSignOut,
  onUpdateUser,
  userOrders,
  onNavigateShop,
  isMandatory = false,
}) => {
  const { language, t } = useLocalization();
  const isEn = language === 'en';

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Form states initialized with empty or clean defaults
  const [fullName, setFullName] = useState('');
  const [emailOrName, setEmailOrName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation & Error states
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitError, setIsSubmitError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dedicated Social Login Modal State ('Gmail' | 'Apple' | 'Facebook' | null)
  const [socialProvider, setSocialProvider] = useState<'Gmail' | 'Apple' | 'Facebook' | null>(null);
  const [socialAccount, setSocialAccount] = useState('');
  const [socialPassword, setSocialPassword] = useState('');
  const [socialShowPassword, setSocialShowPassword] = useState(false);
  const [socialError, setSocialError] = useState<string | null>(null);
  const [isSocialError, setIsSocialError] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

  if (!isOpen) return null;

  const canClose = true;

  const handleBackdropClick = () => {
    onClose();
  };

  // Main Form Validation & Submit Logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitError(false);

    if (isLogin) {
      const inputIdentifier = emailOrName.trim().toLowerCase();
      const inputPassword = password.trim();

      // Only admin (imam@gmail.com / zxcvbnm) is allowed to log in
      const isAdmin = inputIdentifier === 'imam@gmail.com' && inputPassword === 'zxcvbnm';

      if (!isAdmin) {
        setIsSubmitError(true);
        if (!emailOrName.trim() || !password) {
          setFormError('Nama/Email dan Password harus diisi dengan benar!');
        } else {
          setFormError('Nama/Email atau password yang Anda masukkan salah!');
        }
        return;
      }

      // Valid Admin Credentials -> Proceed to Login
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess({
          name: 'Imam (Admin)',
          email: 'imam@gmail.com',
        });
      }, 500);

    } else {
      // Registration is completely disabled
      setIsSubmitError(true);
      setFormError('Pendaftaran akun baru saat ini tidak tersedia.');
    }
  };

  // Open Social Auth Dedicated Modal
  const openSocialAuth = (provider: 'Gmail' | 'Apple' | 'Facebook') => {
    setSocialProvider(provider);
    setSocialAccount('');
    setSocialPassword('');
    setSocialError(null);
    setIsSocialError(false);
    setIsSocialLoading(false);
  };

  // Submit Social Auth Verification
  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSocialError(null);
    setIsSocialError(false);

    const inputAcc = socialAccount.trim().toLowerCase();
    const inputPass = socialPassword.trim();

    // Only admin is allowed via social auth as well
    const isAdmin = inputAcc === 'imam@gmail.com' && inputPass === 'zxcvbnm';

    if (!isAdmin) {
      setIsSocialError(true);
      setSocialError('Data verifikasi atau password yang Anda masukkan salah.');
      return;
    }

    setIsSocialLoading(true);
    setTimeout(() => {
      setIsSocialLoading(false);
      onLoginSuccess({
        name: 'Imam (Admin)',
        email: 'imam@gmail.com',
      });
      setSocialProvider(null);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 animate-fade-in">
      {/* High-blur Luxury Overlay Backdrop */}
      <div
        onClick={handleBackdropClick}
        className="absolute inset-0 bg-[#0a0a0b]/80 backdrop-blur-xl transition-opacity duration-300"
      />

      {/* Main Combined Rectangular Card Frame */}
      <div className={`relative z-10 w-full ${currentUser ? 'max-w-5xl flex flex-col' : 'max-w-4xl flex flex-col md:flex-row'} max-h-[92vh] overflow-hidden bg-[#faf9f8] rounded-2xl md:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.4)] border border-white/20 transform transition-all duration-300 animate-scale-in`}>
        
        {/* Subtle Pro Close Button (Rendered only if closing is allowed and not logged in, as ProfileHub has its own close) */}
        {canClose && !currentUser && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/5 hover:bg-black/80 hover:text-white text-gray-700 flex items-center justify-center transition-all duration-200 btn-spring group"
            title="Close Window"
          >
            <svg className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {currentUser ? (
          /* ================= LOGGED IN FULL VIP PROFILE HUB ================= */
          <ProfileHub
            currentUser={currentUser}
            onClose={onClose}
            onSignOut={onSignOut}
            onUpdateUser={onUpdateUser}
            userOrders={userOrders}
            onNavigateShop={onNavigateShop}
          />
        ) : (
          /* ================= LOGIN / REGISTRATION DUAL PANELS ================= */
          <>
            {/* ================= LEFT PANEL (SISI KIRI: IMM / ADN / GRH) ================= */}
            <div className="w-full md:w-5/12 bg-white text-[#1c1b1b] p-4 sm:p-8 md:p-12 flex flex-col justify-center relative overflow-hidden select-none border-b md:border-b-0 md:border-r border-gray-200/80">
              
              {/* Luxurious Blue Grain & Ambient Glow Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,86,200,0.18),transparent_65%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.12),transparent_70%)] pointer-events-none" />
              <div 
                className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%230056c8'/%3E%3C/svg%3E")`
                }}
              />

              {/* Center Brand Logo Stack: IMM -> ADN -> GRH */}
              <div className="relative z-10 my-auto text-left">
                <div className="font-display font-black text-3xl sm:text-6xl md:text-7xl tracking-[0.22em] leading-[0.88] text-black select-none flex md:flex-col gap-2 md:gap-0 space-y-0 md:space-y-1">
                  <div className="transition-all duration-300 hover:text-[#0056c8] hover:translate-x-1 cursor-default">IMM</div>
                  <div className="transition-all duration-300 hover:text-[#0056c8] hover:translate-x-1 cursor-default">ADN</div>
                  <div className="transition-all duration-300 hover:text-[#0056c8] hover:translate-x-1 cursor-default">GRH</div>
                </div>
              </div>

            </div>

            {/* ================= RIGHT PANEL (SISI KANAN: FORM & SOCIAL LOGINS) ================= */}
            <div className="w-full md:w-7/12 p-5 sm:p-8 md:p-12 bg-[#faf9f8] text-[#1c1b1b] flex flex-col justify-center relative">
              <div className="space-y-5">
                
                {/* Header Title */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1c1b1b] tracking-tight">
                    {isLogin ? (isEn ? 'Sign in to ImmAdNgrh.' : 'Masuk ke Akun ImmAdNgrh.') : (isEn ? 'Create your ImmAdNgrh. account' : 'Buat Akun Klien ImmAdNgrh.')}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {isLogin ? t.authWelcomeBack : t.authJoinAtelier}
                  </p>
                </div>

              {/* Validation Error Alert Notice */}
              {formError && (
                <div className="px-3.5 py-2.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center space-x-2 animate-shake">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formError}</span>
                </div>
              )}

              {/* Form Controls */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block">
                      {t.authFullName}
                    </label>
                    <input
                      type="text"
                      placeholder={isEn ? 'Enter your full name' : 'Isi nama lengkap'}
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (isSubmitError) setIsSubmitError(false);
                      }}
                      className={`w-full px-4 py-3 rounded-2xl bg-white border text-xs text-[#1c1b1b] placeholder-gray-400 focus:outline-none transition-all duration-200 shadow-2xs ${
                        isSubmitError && fullName.trim().length < 2
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-gray-200 focus:border-[#0056c8] focus:ring-2 focus:ring-[#0056c8]/10'
                      }`}
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block">
                    {isLogin ? t.authIdentifier : t.authEmail}
                  </label>
                  <input
                    type={isLogin ? 'text' : 'email'}
                    placeholder="Enter email address"
                    value={isLogin ? emailOrName : email}
                    onChange={(e) => {
                      if (isLogin) setEmailOrName(e.target.value);
                      else setEmail(e.target.value);
                      if (isSubmitError) setIsSubmitError(false);
                    }}
                    className={`w-full px-4 py-3 rounded-2xl bg-white border text-xs text-[#1c1b1b] placeholder-gray-400 focus:outline-none transition-all duration-200 shadow-2xs ${
                      isSubmitError && (isLogin ? emailOrName.trim().length < 3 : !email.includes('@'))
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-gray-200 focus:border-[#0056c8] focus:ring-2 focus:ring-[#0056c8]/10'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block">
                      {t.authPassword}
                    </label>
                    {isLogin && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitError(false);
                          setFormError(isEn ? 'Password recovery instructions have been sent to your email.' : 'Instruksi pemulihan password telah dikirim ke alamat email Anda.');
                        }}
                        className="text-[10px] text-[#0056c8] hover:underline font-bold"
                      >
                        {isEn ? 'Forgot Password?' : 'Lupa Password?'}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={isEn ? 'Enter password' : 'Isi password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (isSubmitError) setIsSubmitError(false);
                      }}
                      className={`w-full px-4 py-3 pr-10 rounded-2xl bg-white border text-xs text-[#1c1b1b] placeholder-gray-400 focus:outline-none transition-all duration-200 shadow-2xs ${
                        isSubmitError && password.trim().length < 4
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-gray-200 focus:border-[#0056c8] focus:ring-2 focus:ring-[#0056c8]/10'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block">
                      {t.authConfirmPass}
                    </label>
                    <input
                      type="password"
                      placeholder={isEn ? 'Confirm password' : 'Isi konfirmasi password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (isSubmitError) setIsSubmitError(false);
                      }}
                      className={`w-full px-4 py-3 rounded-2xl bg-white border text-xs text-[#1c1b1b] placeholder-gray-400 focus:outline-none transition-all duration-200 shadow-2xs ${
                        isSubmitError && password !== confirmPassword
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-gray-200 focus:border-[#0056c8] focus:ring-2 focus:ring-[#0056c8]/10'
                      }`}
                    />
                  </div>
                )}

                {/* Primary Submit Button: turns RED if isSubmitError is true */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 mt-2 rounded-2xl text-white text-xs font-bold tracking-[0.15em] uppercase shadow-md transition-all duration-300 btn-spring flex items-center justify-center space-x-2 ${
                    isSubmitError
                      ? 'bg-red-600 hover:bg-red-700 shadow-red-600/30 animate-shake'
                      : 'bg-[#1c1b1b] hover:bg-[#0056c8] shadow-md hover:shadow-lg'
                  }`}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSubmitError ? (
                    <span>{isEn ? 'Failed — Please Check Credentials!' : 'Gagal — Isi Data Dengan Benar!'}</span>
                  ) : (
                    <span>{isLogin ? t.authLoginSubmit : t.authRegisterSubmit}</span>
                  )}
                </button>
              </form>

              {/* Social Login Separator */}
              <div className="relative my-3 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200/80" />
                </div>
                <span className="relative px-3 bg-[#faf9f8] text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  {isEn ? 'Or continue with' : 'Atau masuk melalui'}
                </span>
              </div>

              {/* Social Login Options: Gmail, Apple, Facebook */}
              <div className="grid grid-cols-3 gap-2.5">
                
                {/* Gmail */}
                <button
                  type="button"
                  onClick={() => openSocialAuth('Gmail')}
                  className="flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-[#1c1b1b] text-xs font-semibold shadow-2xs hover:shadow-xs transition-all duration-200 btn-spring group"
                  title="Gmail"
                >
                  <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 duration-200" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span className="hidden sm:inline font-medium">Gmail</span>
                </button>

                {/* Apple */}
                <button
                  type="button"
                  onClick={() => openSocialAuth('Apple')}
                  className="flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl border border-black bg-[#111] hover:bg-black text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition-all duration-200 btn-spring group"
                  title="Apple ID"
                >
                  <svg className="w-4 h-4 fill-current shrink-0 transition-transform group-hover:scale-110 duration-200" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.84.13-9.74-1.92-14.71-6.14-3.23-2.67-7.14-7.27-11.75-13.82-6.53-9.28-11.66-19.64-15.39-31.08-3.73-11.43-5.6-22.37-5.6-32.8 0-14.86 3.82-27.18 11.46-36.95 7.64-9.78 17.29-14.79 28.96-15.05 4.67 0 9.87 1.18 15.61 3.55 5.73 2.37 9.8 3.56 12.21 3.56 2.04 0 6.22-1.25 12.56-3.75 6.34-2.5 11.46-3.62 15.37-3.37 11.56.89 20.89 5.3 27.99 13.23-10.29 6.24-15.33 14.89-15.12 25.96.22 8.7 3.48 16.03 9.78 21.99 6.3 5.96 13.88 9.38 22.73 10.27-1.12 5.96-2.82 11.73-5.1 17.31zM119.22 31.81c0-6.84 2.5-13.41 7.5-19.71 5-6.3 11.41-10.36 19.23-12.18.5 2.12.75 4.19.75 6.21 0 6.94-2.58 13.58-7.75 19.92-5.17 6.34-11.66 10.35-19.48 12.03-.25-.87-.25-2.97-.25-6.27z"/>
                  </svg>
                  <span className="hidden sm:inline font-medium">Apple</span>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  onClick={() => openSocialAuth('Facebook')}
                  className="flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl border border-blue-600/20 bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition-all duration-200 btn-spring group"
                  title="Facebook"
                >
                  <svg className="w-4 h-4 fill-current shrink-0 transition-transform group-hover:scale-110 duration-200" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="hidden sm:inline font-medium">Facebook</span>
                </button>

              </div>

              {/* Bottom Toggle Text Link */}
              <div className="pt-2 text-center border-t border-gray-200/60">
                <p className="text-xs text-gray-500">
                  {isLogin ? t.authNoAccount : t.authHaveAccount}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setFormError(null);
                      setIsSubmitError(false);
                    }}
                    className="text-[#0056c8] font-bold hover:underline transition-all duration-200 ml-1 inline-flex items-center group"
                  >
                    <span>{isLogin ? t.authRegisterLink : t.authLoginLink}</span>
                    <svg className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </p>
              </div>
            </div>
            </div>
          </>
        )}

      </div>

      {/* ================= DEDICATED SOCIAL LOGIN POPUP WINDOW (GMAIL, APPLE, FACEBOOK) ================= */}
      {socialProvider && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-scale-in">
            
            {/* Header branding according to provider */}
            {socialProvider === 'Gmail' && (
              <div className="p-6 bg-white border-b border-gray-100 text-center relative">
                <button
                  type="button"
                  onClick={() => setSocialProvider(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-sans text-gray-900">Sign in with Google</h3>
                <p className="text-xs text-gray-500 mt-1">Gunakan akun Gmail terverifikasi untuk melanjutkan</p>
              </div>
            )}

            {socialProvider === 'Apple' && (
              <div className="p-6 bg-[#111] text-white text-center relative border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setSocialProvider(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.84.13-9.74-1.92-14.71-6.14-3.23-2.67-7.14-7.27-11.75-13.82-6.53-9.28-11.66-19.64-15.39-31.08-3.73-11.43-5.6-22.37-5.6-32.8 0-14.86 3.82-27.18 11.46-36.95 7.64-9.78 17.29-14.79 28.96-15.05 4.67 0 9.87 1.18 15.61 3.55 5.73 2.37 9.8 3.56 12.21 3.56 2.04 0 6.22-1.25 12.56-3.75 6.34-2.5 11.46-3.62 15.37-3.37 11.56.89 20.89 5.3 27.99 13.23-10.29 6.24-15.33 14.89-15.12 25.96.22 8.7 3.48 16.03 9.78 21.99 6.3 5.96 13.88 9.38 22.73 10.27-1.12 5.96-2.82 11.73-5.1 17.31zM119.22 31.81c0-6.84 2.5-13.41 7.5-19.71 5-6.3 11.41-10.36 19.23-12.18.5 2.12.75 4.19.75 6.21 0 6.94-2.58 13.58-7.75 19.92-5.17 6.34-11.66 10.35-19.48 12.03-.25-.87-.25-2.97-.25-6.27z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-sans">Masuk dengan Apple ID</h3>
                <p className="text-xs text-gray-400 mt-1">Otentikasi aman Apple ID atau Passkey</p>
              </div>
            )}

            {socialProvider === 'Facebook' && (
              <div className="p-6 bg-[#1877F2] text-white text-center relative">
                <button
                  type="button"
                  onClick={() => setSocialProvider(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-sans">Log In to Facebook</h3>
                <p className="text-xs text-blue-100 mt-1">Hubungkan akun Facebook resmi Anda</p>
              </div>
            )}

            {/* Social Form Content */}
            <form onSubmit={handleSocialSubmit} className="p-6 space-y-4 bg-white">
              
              {socialError && (
                <div className="px-3.5 py-2.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold animate-shake flex items-center space-x-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{socialError}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block">
                  {socialProvider === 'Gmail' ? 'Email Gmail' : socialProvider === 'Apple' ? 'Apple ID / Email' : 'Email atau Nomor HP Facebook'}
                </label>
                <input
                  type="text"
                  placeholder="isi dengan benar"
                  value={socialAccount}
                  onChange={(e) => {
                    setSocialAccount(e.target.value);
                    if (isSocialError) setIsSocialError(false);
                  }}
                  className={`w-full px-4 py-3 rounded-2xl bg-gray-50 border text-xs text-gray-900 placeholder-gray-400 focus:outline-none transition-all ${
                    isSocialError && socialAccount.trim().length < 3
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-gray-200 focus:border-[#0056c8] focus:bg-white'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block">
                  Password Akun {socialProvider}
                </label>
                <div className="relative">
                  <input
                    type={socialShowPassword ? 'text' : 'password'}
                    placeholder="isi dengan benar"
                    value={socialPassword}
                    onChange={(e) => {
                      setSocialPassword(e.target.value);
                      if (isSocialError) setIsSocialError(false);
                    }}
                    className={`w-full px-4 py-3 pr-10 rounded-2xl bg-gray-50 border text-xs text-gray-900 placeholder-gray-400 focus:outline-none transition-all ${
                      isSocialError && socialPassword.trim().length < 4
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-gray-200 focus:border-[#0056c8] focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setSocialShowPassword(!socialShowPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {socialShowPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setSocialProvider(null)}
                  className="w-1/3 py-3 rounded-2xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSocialLoading}
                  className={`w-2/3 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSocialError
                      ? 'bg-red-600 hover:bg-red-700 animate-shake'
                      : socialProvider === 'Facebook'
                      ? 'bg-[#1877F2] hover:bg-[#166FE5]'
                      : socialProvider === 'Apple'
                      ? 'bg-black hover:bg-gray-800'
                      : 'bg-[#0056c8] hover:bg-[#0041a3]'
                  }`}
                >
                  {isSocialLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSocialError ? (
                    <span>Gagal — Isi Dengan Benar!</span>
                  ) : (
                    <span>Masuk & Verifikasi</span>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
