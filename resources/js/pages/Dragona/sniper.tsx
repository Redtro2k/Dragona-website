import { Head, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import {
    BadgeCheck,
    Crosshair,
    EyeOff,
    ShieldAlert,
    Sparkles,
    Swords,
    Target,
    Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

const combatTraits = [
    {
        label: 'Role',
        value: 'Long-Range Execution',
        icon: EyeOff,
    },
    {
        label: 'Weapon',
        value: 'Mana Generator Cannon',
        icon: Target,
    },
    {
        label: 'Armor',
        value: 'Light Armor',
        icon: Swords,
    },
];

const abilities = [
    {
        title: 'Second Sight',
        description:
            'A device improves aim, increasing Min. Attack, Max. Attack, and Critical Hit.',
        icon: Target,
    },
    {
        title: 'Sniper Stance',
        description:
            'Focus on sharpshooting to increase Min. Attack, Max. Attack, and Critical Hit. You cannot move while in this stance.',
        icon: Crosshair,
    },
    {
        title: 'Head Shot',
        description:
            'Aim at the target’s head to deal immense damage with Critical Hit and temporarily reduce Protection, Evasion, and all resistances.',
        icon: Zap,
    },
];

const strengths = [
    'Uses a long-ranged ethereal blaster to execute priority targets',
    'Can strike major targets behind the enemy front line',
    'Accelerates piercing rounds through a mana-powered cannon',
    'Moves swiftly in light armor while staying concealed',
    'Converts stamina and mana to respond to changing battles',
    'Excels when distance, positioning, and patience are rewarded',
];

const transformations = [
    {
        name: 'Alphard',
        type: 'Partial Transformation',
    },
    {
        name: 'Mira',
        type: 'Full Transformation',
    },
];

const sniperSkills = [
    {
        name: 'Fire Cannon',
        description: 'Fires Material Cannon and deals damage.',
        iconRow: 0,
    },
    {
        name: 'Pressure Point Penetration',
        description: 'Detects vulnerable points and deals damage.',
        iconRow: 1,
    },
    {
        name: 'Flame Shot',
        description:
            'Fires a fire shot, dealing damage and additional fire damage.',
        iconRow: 2,
    },
    {
        name: 'Explosion Shot',
        description: 'N/A',
        iconRow: 3,
    },
    {
        name: 'Second Sight',
        description:
            'A device is installed to help the aim, increasing Min. Attack, Max. Attack and Critical Hit.',
        iconRow: 4,
    },
    {
        name: 'Tracking Disruption',
        description:
            'Inflicts a sudden blow to the pursuer, dealing damage and stunning the target.',
        iconRow: 5,
    },
    {
        name: 'Quadruple Loading',
        description: 'Consecutive rounds deal damage.',
        iconRow: 6,
    },
    {
        name: 'Ice Bolt',
        description:
            'Fires a cold shot, dealing damage and additional cold damage, and reduces Movement Speed.',
        iconRow: 7,
    },
    {
        name: 'Wedge Bullet Fire',
        description:
            'You deal ice damage to target and nearby enemies and decrease movement speed.',
        iconRow: 8,
    },
    {
        name: 'Protective Wall',
        description:
            'A device is installed to block external attacks, increasing Evasion and Protection.',
        iconRow: 9,
    },
    {
        name: 'Stamina Conversion',
        description:
            'Takes a certain amount of MP and forcibly converts it into HP in the event of an emergency. This skill cannot be used without sufficient MP.',
        iconRow: 10,
    },
    {
        name: 'Pressure Ammo',
        description:
            'Fires a heavy shell, dealing damage and stunning the target.',
        iconRow: 11,
    },
    {
        name: 'Lightning Shot',
        description:
            'Fires a lightning shot, dealing damage and additional lightning damage.',
        iconRow: 12,
    },
    {
        name: 'Thunder Shot',
        description: 'N/A',
        iconRow: 13,
    },
    {
        name: 'Concentrate Fire',
        description:
            'Focusing on short-term firing increases Min./Max. Attack.',
        iconRow: 14,
    },
    {
        name: 'Lightning Movement',
        description:
            'To secure an advantageous firing position, Movement Speed is increased for a short period of time.',
        iconRow: 15,
    },
    {
        name: 'Gaze of Annihilation',
        description: 'Brings destruction and deals damage.',
        iconRow: 16,
    },
    {
        name: 'Venom Shot',
        description:
            'Fires a poison shot, dealing damage and additional poison damage. The attacked target suffers DoT from poison.',
        iconRow: 17,
    },
    {
        name: 'Crusher Fire',
        description:
            'You deal damage to target and nearby enemies. The attacked target suffers DoT from poison.',
        iconRow: 18,
    },
    {
        name: 'Sniper Stance',
        description:
            'Temporarily focusing on sharpshooting increases Min. Attack, Max. Attack, and Critical Hit. You cannot move while assuming the stance.',
        iconRow: 19,
    },
    {
        name: 'Eliminate Traces',
        description:
            'You can conceal yourself while not in combat. However, you cannot move when concealed.',
        iconRow: 20,
    },
    {
        name: 'Head Shot',
        description:
            "You carefully aim at the target's head and deal immense damage with Critical Hit, reducing for a time the target's Protection, Evasion, and All Resistance (fire, cold, lightning, poison, dark).",
        iconRow: 21,
    },
    {
        name: 'Ready Specialized Shot',
        description:
            'Preparing optimized ammo for each target increases Critical Hit.',
        iconRow: 22,
    },
    {
        name: 'Master Sniper',
        description:
            'Ample experience in firing allows for more effective aiming skills, increasing Max. Damage.',
        iconRow: 23,
    },
    {
        name: 'Train Body',
        description:
            'Training the body allows you to survive longer in dangerous situations. Max. HP increases.',
        iconRow: 24,
    },
    {
        name: 'Mental Discipline',
        description:
            'Training the mind allows you to use mind-consuming skills endlessly. Max. HP Increased.',
        iconRow: 25,
    },
    {
        name: 'Source Awakening',
        description:
            'Becoming aware of the dormant power of the dragon within increases Max. CORE.',
        iconRow: 26,
    },
    {
        name: 'Property Hit Training',
        description: 'Elemental Attack is increased.',
        iconRow: 27,
    },
    {
        name: 'Fire Resistance',
        description: 'Resistance to fire attack is increased.',
        iconRow: 28,
    },
    {
        name: 'Cold Resistance',
        description: 'Resistance to cold attack is increased.',
        iconRow: 29,
    },
    {
        name: 'Lightning Resistance',
        description: 'Resistance to lightning attack is increased.',
        iconRow: 30,
    },
    {
        name: 'Poison Resistance',
        description: 'Resistance to poison attack is increased.',
        iconRow: 31,
    },
];

export default function Sniper() {
    const [skillSearch, setSkillSearch] = useState('');
    const filteredSkills = useMemo(() => {
        const search = skillSearch.trim().toLowerCase();

        if (!search) {
            return sniperSkills;
        }

        return sniperSkills.filter((skill) =>
            `${skill.name} ${skill.description}`.toLowerCase().includes(search),
        );
    }, [skillSearch]);
    const isSearching = skillSearch.trim().length > 0;

    return (
        <>
            <Head title="Sniper Bio" />
            <section
                className="relative min-h-screen overflow-hidden bg-black bg-cover bg-fixed bg-center px-6 pt-36 pb-20 text-white"
                style={{
                    backgroundImage: "url('/storage/Assets/background1.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black/74" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_38%,rgba(59,130,246,0.18),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.94),rgba(0,0,0,0.68),rgba(0,0,0,0.88))]" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#05070b]" />

                <div className="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
                    <div>
                        <div className="inline-flex items-center gap-3 border border-blue-200/30 bg-blue-400/10 px-4 py-2 text-xs font-black tracking-[0.2em] text-blue-100 uppercase shadow-[0_0_24px_rgba(59,130,246,0.16)]">
                            <BadgeCheck className="size-4" />
                            Class Biography
                        </div>
                        <h1 className="mt-7 text-5xl font-black tracking-[0.1em] text-white uppercase drop-shadow-[0_0_26px_rgba(59,130,246,0.42)] sm:text-7xl lg:text-8xl">
                            Sniper
                        </h1>
                        <div className="mt-6 h-1 w-28 bg-gradient-to-r from-blue-300 via-cyan-100 to-transparent" />
                        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
                            The Sniper is a swift and covert fighter wrapped in
                            agile dragon-skin armor. Built for shadow warfare,
                            Snipers strike supply lines, isolate commanders, and
                            end battles before the enemy can understand where
                            the fatal blow came from.
                        </p>
                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            {combatTraits.map((trait) => (
                                <div
                                    className="border border-white/14 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[4px]"
                                    key={trait.label}
                                >
                                    <trait.icon className="size-5 text-blue-200" />
                                    <p className="mt-4 text-xs font-black tracking-[0.18em] text-white/48 uppercase">
                                        {trait.label}
                                    </p>
                                    <p className="mt-2 text-sm font-black text-white">
                                        {trait.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                className="download-rank-button group relative inline-flex h-14 items-center justify-center overflow-hidden border-2 border-blue-200/45 bg-blue-400/12 px-6 text-sm font-black tracking-[0.16em] text-white uppercase transition hover:border-blue-100 hover:bg-blue-300/18 hover:text-blue-50"
                                href="/download"
                            >
                                <span className="relative z-10">
                                    Play Sniper
                                </span>
                            </Link>
                            <Link
                                className="inline-flex h-14 items-center justify-center border border-cyan-100/35 bg-cyan-200/8 px-6 text-sm font-black tracking-[0.16em] text-cyan-100 uppercase transition hover:border-cyan-100 hover:bg-cyan-200/14 hover:text-white"
                                href="/"
                            >
                                View Classes
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-6 bg-[radial-gradient(circle,rgba(59,130,246,0.22),transparent_62%)] blur-2xl" />
                        <div className="relative overflow-hidden rounded-2xl border-2 border-blue-200/35 bg-black/24 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_34px_rgba(59,130,246,0.24),0_28px_70px_rgba(0,0,0,0.58)] backdrop-blur-[2px]">
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_18%,transparent_82%,rgba(59,130,246,0.18))]" />
                            <div className="pointer-events-none absolute top-5 left-5 z-20 size-10 border-t-2 border-l-2 border-cyan-100/70" />
                            <div className="pointer-events-none absolute top-5 right-5 z-20 size-10 border-t-2 border-r-2 border-blue-100/70" />
                            <div className="pointer-events-none absolute bottom-5 left-5 z-20 size-10 border-b-2 border-l-2 border-blue-100/70" />
                            <div className="pointer-events-none absolute right-5 bottom-5 z-20 size-10 border-r-2 border-b-2 border-cyan-100/70" />
                            <img
                                alt="Sniper class showcase"
                                className="relative z-10 aspect-[4/5] w-full rounded-xl object-contain object-center p-12"
                                src="/storage/Assets/Class/sniper_logo.png"
                            />
                            <img
                                alt="Sniper class sigil"
                                className="absolute bottom-8 left-8 z-20 h-24 w-24 object-contain drop-shadow-[0_0_22px_rgba(59,130,246,0.85)]"
                                src="/storage/Assets/Class/sniper_logo.png"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="relative bg-black bg-cover bg-fixed bg-center px-6 py-24 text-white"
                style={{
                    backgroundImage: "url('/storage/Assets/background1.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black/80" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.76),rgba(0,0,0,0.88))]" />
                <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#05070b] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-black" />

                <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <h2 className="text-3xl font-black tracking-[0.1em] uppercase sm:text-5xl">
                            Battle Identity
                        </h2>
                        <div className="mt-6 h-1 w-20 bg-gradient-to-r from-blue-300 to-transparent" />
                        <p className="mt-7 text-base leading-8 text-white/70 sm:text-lg">
                            Snipers observe the battlefield from the shadows,
                            moving among enemy and allied forces until the exact
                            moment their power is needed. Their attacks are
                            sudden, precise, and designed to leave the enemy no
                            chance to recover.
                        </p>
                        <div className="mt-8 border-l-2 border-blue-200/50 bg-blue-400/8 p-5">
                            <div className="flex items-center gap-3 text-blue-100">
                                <ShieldAlert className="size-5" />
                                <h3 className="text-sm font-black tracking-[0.18em] uppercase">
                                    Combat Note
                                </h3>
                            </div>
                            <p className="mt-4 text-sm leading-7 text-white/68">
                                The Sniper is strongest when choosing the timing
                                of the fight. Patience, target selection, and
                                clean positioning matter more than direct
                                front-line trading.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {abilities.map((ability) => (
                            <article
                                className="border border-white/14 bg-white/[0.045] p-5 transition hover:border-blue-200/45 hover:bg-blue-300/[0.07] hover:shadow-[0_0_28px_rgba(59,130,246,0.16)]"
                                key={ability.title}
                            >
                                <span className="flex size-12 items-center justify-center border border-blue-200/35 bg-blue-300/10 text-blue-100">
                                    <ability.icon className="size-6" />
                                </span>
                                <h3 className="mt-5 text-lg font-black text-white">
                                    {ability.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-white/66">
                                    {ability.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mx-auto mt-16 max-w-7xl border border-white/12 bg-[linear-gradient(135deg,rgba(59,130,246,0.14),rgba(6,10,17,0.9),rgba(14,116,144,0.1))] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.32)] sm:p-8">
                    <h2 className="text-2xl font-black tracking-[0.12em] uppercase">
                        Strengths
                    </h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {strengths.map((strength) => (
                            <div
                                className="flex items-center gap-3 border border-white/10 bg-black/30 p-4 text-sm font-bold text-white/78"
                                key={strength}
                            >
                                <Crosshair className="size-5 shrink-0 text-blue-200" />
                                {strength}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mx-auto mt-8 grid max-w-7xl gap-5 md:grid-cols-2">
                    {transformations.map((transformation) => (
                        <article
                            className="border border-cyan-100/16 bg-black/42 p-6 backdrop-blur-[3px]"
                            key={transformation.name}
                        >
                            <div className="flex items-center gap-3 text-cyan-100">
                                <Sparkles className="size-5" />
                                <p className="text-xs font-black tracking-[0.18em] uppercase">
                                    {transformation.type}
                                </p>
                            </div>
                            <h3 className="mt-4 text-2xl font-black tracking-[0.1em] text-white uppercase">
                                {transformation.name}
                            </h3>
                        </article>
                    ))}
                </div>

                <div className="relative z-10 mx-auto mt-16 max-w-7xl">
                    <div className="flex flex-col gap-4 border-b border-white/12 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-black tracking-[0.2em] text-blue-100/70 uppercase">
                                Sniper Arsenal
                            </p>
                            <h2 className="mt-3 text-3xl font-black tracking-[0.1em] text-white uppercase sm:text-5xl">
                                Skills
                            </h2>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-white/58">
                            Cannon fire, elemental shots, precision aiming,
                            concealment, and survival training available to the
                            Sniper class.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <label className="group relative block w-full max-w-xl">
                            <Search
                                className={cn(
                                    'pointer-events-none absolute top-1/2 left-4 z-10 size-5 -translate-y-1/2 text-blue-100/58 transition duration-300',
                                    isSearching &&
                                        'text-blue-100 drop-shadow-[0_0_10px_rgba(59,130,246,0.75)]',
                                )}
                            />
                            <input
                                className={cn(
                                    'h-14 w-full rounded-xl border border-blue-100/22 bg-black/58 pr-4 pl-12 text-sm font-bold text-white backdrop-blur-[4px] transition outline-none placeholder:text-white/34 focus:border-blue-100/55 focus:shadow-[0_0_24px_rgba(59,130,246,0.16)]',
                                    isSearching &&
                                        'border-blue-100/45 shadow-[0_0_28px_rgba(59,130,246,0.18)]',
                                )}
                                onChange={(event) =>
                                    setSkillSearch(event.target.value)
                                }
                                placeholder="Search skill arsenal..."
                                type="search"
                                value={skillSearch}
                            />
                            <span
                                className={cn(
                                    'pointer-events-none absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 rounded-full bg-gradient-to-r from-blue-100/0 via-blue-100 to-cyan-100/0 transition duration-300',
                                    isSearching &&
                                        'dragona-search-scan scale-x-100',
                                )}
                            />
                        </label>
                        <p className="text-xs font-black tracking-[0.16em] text-white/42 uppercase">
                            {filteredSkills.length} / {sniperSkills.length}{' '}
                            Skills
                        </p>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {filteredSkills.map((skill, index) => (
                            <article
                                className={cn(
                                    'group relative min-h-64 overflow-hidden rounded-xl border border-blue-100/18 bg-black/58 p-5 shadow-[0_18px_46px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[4px] transition duration-300 hover:-translate-y-1 hover:border-blue-100/55 hover:bg-[linear-gradient(145deg,rgba(59,130,246,0.16),rgba(0,0,0,0.68),rgba(8,47,73,0.18))] hover:shadow-[0_0_30px_rgba(59,130,246,0.2),0_22px_58px_rgba(0,0,0,0.5)]',
                                    isSearching && 'dragona-skill-result',
                                )}
                                key={skill.name}
                                style={
                                    {
                                        '--skill-result-delay': `${Math.min(index, 11) * 28}ms`,
                                    } as React.CSSProperties
                                }
                            >
                                <div className="pointer-events-none absolute inset-x-5 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-blue-100/80 to-transparent transition duration-300 group-hover:scale-x-100" />
                                <div className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.08)_45%,transparent_70%)] transition duration-700 group-hover:translate-x-[120%]" />
                                <div className="relative flex items-start justify-between gap-4">
                                    <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-blue-100/35 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.24),rgba(59,130,246,0.24),rgba(8,47,73,0.28))] text-sm font-black text-white shadow-[0_0_18px_rgba(59,130,246,0.18)] transition duration-300 group-hover:scale-105 group-hover:border-blue-100/70 group-hover:shadow-[0_0_24px_rgba(59,130,246,0.34)]">
                                        <span
                                            role="img"
                                            aria-label={`${skill.name} skill icon`}
                                            className="absolute inset-0 z-10 bg-no-repeat transition duration-300 group-hover:scale-110"
                                            style={{
                                                backgroundImage:
                                                    "url('/storage/Assets/Skills/Sniper/skill-reference.png')",
                                                backgroundSize: `${(415 / 31) * 100}% ${(1024 / 30) * 100}%`,
                                                backgroundPosition: `${(4 / (415 - 31)) * 100}% ${((1 + skill.iconRow * 32) / (1024 - 30)) * 100}%`,
                                            }}
                                        />
                                        {String(skill.iconRow + 1).padStart(
                                            2,
                                            '0',
                                        )}
                                    </span>
                                    <span className="text-xs font-black tracking-[0.16em] text-white/32 transition group-hover:text-blue-100/62">
                                        {String(skill.iconRow + 1).padStart(
                                            2,
                                            '0',
                                        )}
                                    </span>
                                </div>
                                <h3 className="relative mt-5 text-lg leading-6 font-black text-white transition group-hover:text-blue-50 group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.32)]">
                                    {skill.name}
                                </h3>
                                <p className="relative mt-3 text-sm leading-6 text-white/64 transition group-hover:text-white/82">
                                    {skill.description}
                                </p>
                            </article>
                        ))}
                    </div>
                    {!filteredSkills.length && (
                        <div className="mt-8 rounded-xl border border-blue-100/18 bg-black/58 p-8 text-center text-sm font-bold text-white/62">
                            No Sniper skills matched your search.
                        </div>
                    )}
                </div>

                <p className="relative z-10 mx-auto mt-8 max-w-7xl text-xs leading-6 text-white/42">
                    Character information adapted from the Dragona Online Wiki
                    Sniper entry.
                </p>
            </section>
        </>
    );
}
