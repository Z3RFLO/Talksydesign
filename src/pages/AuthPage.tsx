import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import {
    ArrowRight, User, Lock, Mail, LucideIcon,
    Heart, MessageCircle, Share2, Sparkles
} from 'lucide-react';

/* --- COMPONENT: LIVE VOID BACKGROUND --- */
const LiveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth / 2;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;

            constructor() {
                this.x = Math.random() * (canvas!.width);
                this.y = Math.random() * (canvas!.height);
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas!.width) this.x = 0;
                if (this.x < 0) this.x = canvas!.width;
                if (this.y > canvas!.height) this.y = 0;
                if (this.y < 0) this.y = canvas!.height;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < 80; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* --- COMPONENT: PHONE MOCKUP (HIGH CONTRAST) --- */
const PhoneMockup = () => {
    return (
        // FIXED: bg-zinc-800 (lighter), border-zinc-600 (lighter), ring-4 (outline), shadow-xl (glow)
        <div className="relative w-[300px] h-[600px] bg-zinc-800 border-[8px] border-zinc-600 ring-4 ring-white/10 rounded-[40px] shadow-[0_0_100px_rgba(99,102,241,0.4)] overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-700 ease-out z-20">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-700 rounded-b-xl z-20"></div>

            {/* Screen Content */}
            <div className="w-full h-full bg-zinc-900 flex flex-col pt-10 px-4 space-y-4 relative overflow-hidden">
                {/* Status Bar */}
                <div className="flex justify-between items-center text-[10px] text-zinc-500 px-2">
                    <span>9:41</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-zinc-700 rounded-full"></div>
                        <div className="w-3 h-3 bg-zinc-700 rounded-full"></div>
                    </div>
                </div>

                {/* Fake Posts */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-zinc-800/50 rounded-2xl p-3 space-y-2 animate-in slide-in-from-bottom duration-1000" style={{ animationDelay: `${i * 200}ms` }}>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20"></div>
                            <div className="h-2 w-20 bg-zinc-700 rounded-full"></div>
                        </div>
                        <div className="h-24 w-full bg-zinc-800 rounded-xl"></div>
                        <div className="flex gap-2">
                            <Heart size={14} className="text-zinc-600" />
                            <MessageCircle size={14} className="text-zinc-600" />
                            <Share2 size={14} className="text-zinc-600" />
                        </div>
                    </div>
                ))}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
            </div>
        </div>
    );
};

/* --- COMPONENT: WELCOME HERO (FOR SIGNUP) --- */
const WelcomeHero = () => {
    return (
        <div className="relative flex flex-col items-center justify-center text-center p-12 animate-in fade-in zoom-in duration-700">
            <div className="w-32 h-32 bg-indigo-500/10 rounded-full flex items-center justify-center mb-8 relative">
                <Sparkles size={64} className="text-indigo-400 animate-pulse" />
                <div className="absolute inset-0 border border-indigo-500/30 rounded-full animate-ping duration-[3000ms]"></div>
            </div>
            <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">
                Welcome to <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Talksy</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-md leading-relaxed">
                Join the conversation. <br />
                Explore the void. <br />
                Connect with the world.
            </p>
        </div>
    );
};

/* --- ASSET: GOOGLE ICON --- */
const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

interface AuthPageProps {
    onLogin: (user: any) => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
    const [isSignup, setIsSignup] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [slideDirection, setSlideDirection] = useState('right');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleModeSwitch = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setSlideDirection(isSignup ? 'right' : 'left');

        setTimeout(() => {
            setIsSignup(!isSignup);
            setIsAnimating(false);
        }, 400);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const btn = document.getElementById('auth-btn');
        if (btn) {
            btn.innerHTML = `<span class="animate-pulse flex items-center gap-2"><div class="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div> Authenticating...</span>`;
        }

        setTimeout(() => {
            const user = {
                ...formData,
                username: formData.username || "Design God",
                bio: "Digital minimalist.",
                birthday: "2000-01-01" // Defaults for now
            };
            onLogin(user);
        }, 1500);
    };

    return (
        <div className="flex min-h-screen w-full bg-black font-sans selection:bg-indigo-500/30 overflow-hidden">

            {/* --- LEFT SIDE: DYNAMIC HERO (Desktop Only) --- */}
            <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-[#050505] overflow-hidden transition-all duration-700">
                <LiveBackground />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-black/50 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center w-full h-full justify-center">

                    {/* LOGIN MODE: PHONE + LOGO */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform ${!isSignup ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-95 pointer-events-none'}`}>
                        <div className="mb-8 text-center relative z-30">
                            <h1 className="text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl">Talksy<span className="text-indigo-500">.</span></h1>
                            <p className="text-zinc-400 text-lg">Connect with the Void.</p>
                        </div>
                        <PhoneMockup />
                    </div>

                    {/* SIGNUP MODE: WELCOME HERO */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform ${isSignup ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
                        <WelcomeHero />
                    </div>

                </div>
            </div>

            {/* --- RIGHT SIDE: AUTH FORM --- */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
                <div className="absolute inset-0 lg:hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

                <div className="w-full max-w-md space-y-6">

                    {/* Header */}
                    <div className="text-center lg:text-left">
                        <div className="lg:hidden mb-6 inline-block">
                            <h1 className="text-4xl font-black text-white tracking-tighter">Talksy<span className="text-indigo-500">.</span></h1>
                        </div>

                        <div className={`transition-all duration-500 ease-in-out transform ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                                {isSignup ? "Create an account" : "Welcome back"}
                            </h2>
                            <p className="text-zinc-500 text-base">
                                {isSignup ? "Enter your details to join the network." : "Please enter your details to sign in."}
                            </p>
                        </div>
                    </div>

                    {/* --- GOOGLE BUTTON (TOP) --- */}
                    <button
                        type="button"
                        onClick={() => alert("Google Auth coming soon!")}
                        className="w-full py-3.5 bg-white text-black rounded-xl flex items-center justify-center gap-3 font-bold text-base hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-lg shadow-white/5"
                    >
                        <GoogleIcon />
                        Continue with Google
                    </button>

                    {/* --- DIVIDER --- */}
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-800"></div>
                        </div>
                        <div className="relative bg-black px-4 text-xs text-zinc-500 font-medium uppercase tracking-wider">
                            Or continue with email
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="relative overflow-hidden">
                        <form onSubmit={handleSubmit} className={`transition-all duration-500 ease-in-out transform ${isAnimating
                            ? (slideDirection === 'left' ? '-translate-x-[20%] opacity-0' : 'translate-x-[20%] opacity-0')
                            : 'translate-x-0 opacity-100'
                            }`}>

                            {/* --- LOGIN FIELDS --- */}
                            {!isSignup && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <InputField
                                        icon={Mail}
                                        type="email"
                                        placeholder="Email Address"
                                        required
                                    />
                                    <InputField
                                        icon={Lock}
                                        type="password"
                                        placeholder="Password"
                                        required
                                    />
                                    <div className="flex justify-between items-center pt-1">
                                        <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer hover:text-white transition-colors">
                                            <input type="checkbox" className="rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-indigo-500/20" />
                                            Remember me
                                        </label>
                                        <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium">Forgot Password?</a>
                                    </div>
                                </div>
                            )}

                            {/* --- SIGNUP FIELDS (COMPACT) --- */}
                            {isSignup && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <InputField
                                        icon={User}
                                        name="username"
                                        placeholder="Username"
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputField
                                        icon={Mail}
                                        name="email"
                                        type="email"
                                        placeholder="Email Address"
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputField
                                        icon={Lock}
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}

                            {/* --- SUBMIT BUTTON --- */}
                            <button
                                id="auth-btn"
                                type="submit"
                                className="w-full py-3.5 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl text-lg hover:bg-zinc-800 hover:border-zinc-700 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 mt-6"
                            >
                                {isSignup ? "Create Account" : "Sign In"}
                                <ArrowRight size={20} />
                            </button>

                            {/* --- TOGGLE --- */}
                            <div className="mt-6 text-center">
                                <p className="text-zinc-500 text-sm">
                                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                                    <button
                                        type="button"
                                        onClick={handleModeSwitch}
                                        className="ml-2 text-white font-bold hover:underline underline-offset-4"
                                    >
                                        {isSignup ? "Sign In" : "Sign Up"}
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

/* --- REUSABLE INPUT COMPONENT --- */
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: LucideIcon;
}

const InputField: React.FC<InputFieldProps> = ({ icon: Icon, ...props }) => (
    <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors duration-300">
            <Icon size={20} />
        </div>
        <input
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-5 pl-14 pr-5 text-white placeholder:text-zinc-600 outline-none focus:border-indigo-500 focus:bg-zinc-900 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 text-lg"
            {...props}
        />
    </div>
);

export default AuthPage;
