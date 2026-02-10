import { useEffect, useState, useRef, memo } from 'react';

// --- CONFIGURAÇÃO ---
const BADGE_ICONS = {
    ActiveDeveloper: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/activedeveloper.svg",
    BugHunter: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbughunter1.svg",
    BugHunterGold: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbughunter2.svg",
    QuestCompleted: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/quest.png",
    EarlySupporter: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordearlysupporter.svg",
    VerifiedBotDeveloper: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbotdev.svg",
    HypeSquadEvents: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadevents.svg",
    LegacyUsername: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/username.png",
    OrbsApprentice: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/orb.svg",
    PartneredServerOwner: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordpartner.svg",
    Staff: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordstaff.svg",
    HypeSquadBravery: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbravery.svg",
    HypeSquadBrilliance: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbrilliance.svg",
    HypeSquadBalance: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbalance.svg",
    Nitro: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordnitro.svg",
    Nitro1month: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/bronze.png",
    Nitro3Months: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/silver.png",
    Nitro6Months: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/gold.png",
    Nitro1Year: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/platinum.png",
    Nitro2Years: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/diamond.png",
    Nitro3Years: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/emerald.png",
    Nitro5Years: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/ruby.png",
    Nitro6Years: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/subscriptions/badges/opal.png",
    BoostLevel1: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost1.svg",
    BoostLevel2: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost2.svg",
    BoostLevel3: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost3.svg",
    BoostLevel4: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost4.svg",
    BoostLevel5: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost5.svg",
    BoostLevel6: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost6.svg",
    BoostLevel7: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost7.svg",
    BoostLevel8: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost8.svg",
    BoostLevel9: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/boosts/discordboost9.svg"
};

const USERS_DATA = [
    { id: "1418117655293857875", insta: "https://instagram.com/daanisky", badges: ["Nitro1month", "HypeSquadBravery", "BoostLevel1", "QuestCompleted", "OrbsApprentice"] },
    { id: "1075542224730853479", insta: "https://instagram.com/memoriassepultadas", badges: [] },
    { id: "1466230736586805359", insta: "https://instagram.com/user3", badges: ["Nitro", "BoostLevel1"] },
    { id: "1243923826106961946", insta: "https://instagram.com/zxtworm", badges: ["Nitro", "BoostLevel1"] },
];

const DiscordUser = ({ userId, instagramUrl, manualBadges }) => {
    const [data, setData] = useState(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Link do seu Render
                const res = await fetch(`https://site-discord.onrender.com/user/${userId}`);
                const json = await res.json();
                setData({ ...json, badges: manualBadges });
            } catch (err) {
                console.error("Erro ao conectar com o Bot:", err);
            }
        };
        fetchData();
    }, [userId, manualBadges]);

    // Lógica de movimento 3D (PC)
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -20; 
        const rotateY = ((x - centerX) / centerX) * 20;
        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setRotate({ x: 0, y: 0 });
    };

    // Skeleton
    if (!data) return <div className="w-64 h-80 flex-shrink-0 animate-pulse rounded-2xl border-2 border-white/10 snap-center" />;

    return (
        <div 
            // Adicionado 'flex-shrink-0' e 'snap-center' para o carrossel mobile funcionar
            className="relative w-64 h-80 perspective-[1000px] group z-20 cursor-pointer flex-shrink-0 snap-center"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                className={`
                    relative w-full h-full rounded-2xl p-8 flex flex-col items-center
                    
                    /* Borda Transparente */
                    border-2 border-white/20 group-hover:border-white
                    
                    /* Transição */
                    transition-all ease-out
                    ${isHovering ? 'duration-75' : 'duration-500'}
                `}
                style={{
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`,
                    transformStyle: 'preserve-3d'
                }}
            >
                <div style={{ transform: 'translateZ(30px)' }}>
                    <img src={data.avatar} className="w-24 h-24 rounded-full border-[3px] border-white/20 group-hover:border-white transition-colors object-cover shadow-lg" alt={data.username} />
                </div>
                
                <h1 className="mt-4 text-white font-bold text-lg tracking-wider lowercase opacity-90 text-center break-words drop-shadow-md" style={{ transform: 'translateZ(20px)' }}>
                    {data.username}
                </h1>
                
                <div className="flex gap-3 mt-4 h-[24px] justify-center items-center flex-wrap" style={{ transform: 'translateZ(15px)' }}>
                    {data.badges.map((badgeKey, index) => (
                        <div key={index} className="w-[22px] h-[22px] flex items-center justify-center">
                            {BADGE_ICONS[badgeKey] ? (
                                <img src={BADGE_ICONS[badgeKey]} className="w-full h-full object-contain drop-shadow" alt={badgeKey} />
                            ) : (
                                <div className="w-[8px] h-[8px] bg-white/50 rounded-full animate-pulse" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="w-full h-px bg-white/10 my-6" style={{ transform: 'translateZ(10px)' }}></div>

                <div className="flex gap-6 opacity-60 group-hover:opacity-100 transition-all duration-300" style={{ transform: 'translateZ(25px)' }}>
                    <a href={`https://discord.com/users/${userId}`} target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform duration-300">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/discord-logo.png" className="w-6 h-6 drop-shadow" alt="Discord" />
                    </a>
                    <a href={instagramUrl} target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform duration-300">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" className="w-6 h-6 drop-shadow" alt="Instagram" />
                    </a>
                </div>
            </div>
        </div>
    );
};

const BackgroundEffects = memo(() => {
    const stars = useRef([...Array(80)].map(() => ({
        width: Math.random() * 2 + 'px',
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        duration: Math.random() * 3 + 2 + 's',
        delay: Math.random() * 5 + 's',
        moveDuration: Math.random() * 20 + 10 + 's'
    })));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden bg-black" style={{ zIndex: -1 }}>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,118,0.03))] z-10 bg-[length:100%_4px,3px_100%] opacity-50" />
            {stars.current.map((star, i) => (
                <div key={i} className="absolute bg-white rounded-full animate-pulse-slow" 
                    style={{ width: star.width, height: star.width, top: star.top, left: star.left, opacity: 0.5, animation: `floatingStars ${star.moveDuration} linear infinite, pulse ${star.duration} ease-in-out infinite` }} 
                />
            ))}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes floatingStars { from { transform: translateY(0); } to { transform: translateY(-100vh); } }
                @keyframes pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }
            `}} />
        </div>
    );
});

export default function App() {
    const [started, setStarted] = useState(false);
    const [volume, setVolume] = useState(0.4);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const musicName = "Lil Peep - Hellboy";

    useEffect(() => {
        audioRef.current = new Audio('/musica.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = volume;
        
        audioRef.current.addEventListener('error', (e) => {
            console.error("ERRO NO PLAYER: Verifique se 'musica.mp3' está na pasta public.", e);
        });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const handleStart = () => {
        if (audioRef.current) {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.log("Erro ao tocar:", e));
        }
        setStarted(true);
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handleVolumeChange = (e) => {
        e.stopPropagation();
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    if (!started) {
        return (
            <div className="h-screen w-full bg-black flex flex-col items-center justify-center cursor-pointer select-none relative overflow-hidden" onClick={handleStart}>
                <BackgroundEffects />
                <span className="relative z-20 text-white/60 font-light text-[10px] animate-pulse tracking-[0.8em] uppercase border-y border-white/5 py-5 px-10 text-center">
                    Click to enter
                </span>
            </div>
        );
    }

    return (
        <main className="min-h-screen w-full flex flex-col justify-center items-center relative select-none bg-transparent overflow-hidden pb-40">
            <BackgroundEffects />
            
            {/* CONTROLES DE MÚSICA */}
            <div 
                className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 bg-black/50 backdrop-blur-sm border border-white/10 p-4 rounded-xl z-[100] group w-[90%] max-w-[400px]"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex items-center gap-3 w-full justify-center">
                    <button onClick={togglePlay} className="text-white/80 hover:text-white transition-colors p-2">
                        {isPlaying ? (
                            <img src="https://img.icons8.com/ios-filled/50/ffffff/pause--v1.png" className="w-5 h-5" alt="pause" />
                        ) : (
                            <img src="https://img.icons8.com/ios-filled/50/ffffff/play--v1.png" className="w-5 h-5" alt="play" />
                        )}
                    </button>
                    
                    <div className="flex flex-col truncate">
                        <span className="text-[8px] text-white/40 uppercase tracking-widest">
                            {isPlaying ? "Playing:" : "Paused:"}
                        </span>
                        <span className="text-xs text-white/80 font-medium tracking-wider truncate max-w-[200px]">{musicName}</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 w-full px-2">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/low-volume.png" className="w-4 h-4 opacity-40" alt="vol-down" />
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        value={volume} 
                        onChange={handleVolumeChange}
                        onPointerDown={(e) => e.stopPropagation()} 
                        onMouseDown={(e) => e.stopPropagation()}
                        style={{ touchAction: 'none' }} 
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500 touch-none"
                    />
                    <img src="https://img.icons8.com/?size=100&id=11475&format=png&color=ffffff" className="w-4 h-4 opacity-40" alt="vol-up" />
                </div>
            </div>

            {/* --- CARROSSEL RESPONSIVO --- */}
            <div className="
                /* MOBILE: Horizontal (flex), sem quebra (nowrap), scrollável (overflow-x-auto) */
                flex flex-nowrap overflow-x-auto justify-start items-center
                /* PC: Quebra linha (flex-wrap), centralizado (justify-center) */
                md:flex-wrap md:justify-center md:overflow-visible
                
                gap-8 w-full max-w-6xl mx-auto relative z-20 px-8
                snap-x snap-mandatory scrollbar-hide
            ">
                {USERS_DATA.map(user => (
                    <DiscordUser key={user.id} userId={user.id} instagramUrl={user.insta} manualBadges={user.badges} />
                ))}
            </div>
        </main>
    );
}