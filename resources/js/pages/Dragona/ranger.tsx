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
    { label: 'Role', value: 'Ranged Support', icon: EyeOff },
    { label: 'Weapon', value: 'Bow & Arrows', icon: Target },
    { label: 'Race', value: 'Eldin', icon: Swords },
];

const abilities = [
    {
        title: 'Aimed Shot',
        description: 'Targets a vulnerable point for a critical hit.',
        icon: Target,
    },
    {
        title: 'Shower of Arrows',
        description: 'Fires multiple arrows at enemies within range.',
        icon: Crosshair,
    },
    {
        title: 'Flash Trace',
        description: 'Lightning damage interrupts enemy skill casting.',
        icon: Zap,
    },
];

const strengths = [
    'Punishes exposed targets with precise critical shots',
    'Pressures groups with volleys and elemental arrows',
    'Reveals concealed enemies with Keen Senses',
    'Controls approaching enemies with snares and stuns',
    'Weakens enemy defenses with hunting marks',
    'Maintains distance through movement and evasion',
];

const transformations = [
    {
        name: 'Acubens',
        type: 'Partial Transformation',
    },
    {
        name: 'Graffias',
        type: 'Full Transformation',
    },
];

const rangerSkills = [
    {
        name: 'Arrow Shot',
        description: 'Fires an arrow and deals damage.',
        iconRow: 0,
    },
    {
        name: 'Aimed Shot',
        description:
            "Fires an arrow at the target's vulnerable point and deals damage with Critical Hit.",
        iconRow: 1,
    },
    {
        name: 'Fire Arrow',
        description:
            'Fires a burning arrow, dealing damage and additional initial damage.',
        iconRow: 2,
    },
    {
        name: 'Scattered Arrow',
        description:
            'The arrow explodes upon impact and deals damage to the target and other targets nearby, and additional fire damage.',
        iconRow: 3,
    },
    {
        name: 'Show Tracks',
        description:
            'Marking the enemy as a hunting target decreases Defense, Protection, and Evasion.',
        iconRow: 4,
    },
    {
        name: 'Keen Senses',
        description:
            'Maximizing all senses allows you to clearly see targets that are self-concealed, and increases Movement Speed.',
        iconRow: 5,
    },
    {
        name: 'Ghost Arrow',
        description:
            'Immediately fires an arrow to a dangerous target and deals damage with Critical Hit.',
        iconRow: 6,
    },
    {
        name: 'Ice Arrow',
        description:
            'Fires a cold arrow, dealing damage and additional initial damage.',
        iconRow: 7,
    },
    {
        name: 'Adhesive Arrowhead',
        description:
            'Fires an arrow covered in adhesive substance, dealing damage and additional ice damage to the main target and others nearby.',
        iconRow: 8,
    },
    {
        name: 'Hunting Mark',
        description:
            'Leaving a hunting mark on the target decreases Critical Hit, Elemental Attack, Dark Resistance, Fire Resistance, Cold Resistance, Lightning Resistance, and Poison Resistance.',
        iconRow: 9,
    },
    {
        name: 'Energy of an Arch-Nemesis',
        description:
            "Discovering the target's weakness by intuition increases Critical Hit.",
        iconRow: 10,
    },
    {
        name: 'Paralyzing Arrow',
        description:
            'Fires a paralyzing poison arrow, dealing damage, while reducing Min. Attack and Max. Attack.',
        iconRow: 11,
    },
    {
        name: 'Flash Trace',
        description:
            'Fires a bright lightning arrow, dealing damage and additional lightning damage, and interrupts skill casting.',
        iconRow: 12,
    },
    {
        name: 'Shower of Arrows',
        description:
            'Firing multiple arrows deals damage to targets within range.',
        iconRow: 13,
    },
    {
        name: 'Soul of a Leader',
        description:
            'Communing with the spirits allows you to find the fastest route and increases your Movement Speed.',
        iconRow: 14,
    },
    {
        name: 'Share Arrow',
        description:
            'Fires a special entangling arrow, dealing damage and stuns it.',
        iconRow: 15,
    },
    {
        name: 'Poison Arrow',
        description:
            'Fires a poisonous arrow, dealing damage and additional initial damage, while dealing poison DoT.',
        iconRow: 16,
    },
    {
        name: 'Shower of Wedges',
        description:
            'You deal damage to the enemies of the target area, and additional initial damage, while dealing poison DoT.',
        iconRow: 17,
    },
    {
        name: 'Natural Regeneration',
        description:
            'Natural recovery power is maximized and HP Recovery is increased.',
        iconRow: 18,
    },
    {
        name: 'Adaptability',
        description:
            'Stabbing a close target with an arrow deals damage and stuns it.',
        iconRow: 19,
    },
    {
        name: 'Spirit Protection',
        description: 'Protection increases and Evasion increases.',
        iconRow: 20,
    },
    {
        name: 'Dark Arrow',
        description:
            'Fires a darkness-charged arrow and deals damage and dark damage.',
        iconRow: 21,
    },
    {
        name: 'Agile Steps',
        description: 'Maintaining quick and agile steps increases evasion.',
        iconRow: 22,
    },
    {
        name: 'Stable Aim',
        description:
            'Maintaining a stable firing stance in any kind of turbulence increases Min. Attack and Max. Attack.',
        iconRow: 23,
    },
    {
        name: 'Magic Protection',
        description: 'Magic Defense is increased.',
        iconRow: 24,
    },
    {
        name: 'Train Body',
        description:
            'Training the body allows you to survive longer in dangerous situations. Max. HP increases.',
        iconRow: 25,
    },
    {
        name: 'Mental Discipline',
        description:
            'Training the mind allows you to use mind-consuming skills endlessly. Max. HP Increased.',
        iconRow: 26,
    },
    {
        name: 'Source Awakening',
        description:
            'Becoming aware of the dormant power of the dragon within increases Max. CORE.',
        iconRow: 27,
    },
    {
        name: 'Property Hit Training',
        description: 'Elemental Attack is increased.',
        iconRow: 28,
    },
    {
        name: 'Fire Resistance',
        description: 'Resistance to fire attack is increased.',
        iconRow: 29,
    },
    {
        name: 'Cold Resistance',
        description: 'Resistance to cold attack is increased.',
        iconRow: 30,
    },
    {
        name: 'Lightning Resistance',
        description: 'Resistance to lightning attack is increased.',
        iconRow: 31,
    },
    {
        name: 'Poison Resistance',
        description: 'Resistance to poison attack is increased.',
        iconRow: 32,
    },
];

export default function Ranger() {
    const [skillSearch, setSkillSearch] = useState('');
    const filteredSkills = useMemo(() => {
        const search = skillSearch.trim().toLowerCase();

        if (!search) {
            return rangerSkills;
        }

        return rangerSkills.filter((skill) =>
            `${skill.name} ${skill.description}`.toLowerCase().includes(search),
        );
    }, [skillSearch]);
    const isSearching = skillSearch.trim().length > 0;

    return (
        <>
            <Head title="Ranger Bio" />
            <section
                className="relative min-h-screen overflow-hidden bg-black bg-cover bg-fixed bg-center px-6 pt-36 pb-20 text-white"
                style={{
                    backgroundImage: "url('/storage/Assets/background1.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black/74" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_38%,rgba(52,211,153,0.18),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.94),rgba(0,0,0,0.68),rgba(0,0,0,0.88))]" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#05070b]" />

                <div className="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
                    <div>
                        <div className="inline-flex items-center gap-3 border border-emerald-200/30 bg-emerald-400/10 px-4 py-2 text-xs font-black tracking-[0.2em] text-emerald-100 uppercase shadow-[0_0_24px_rgba(52,211,153,0.16)]">
                            <BadgeCheck className="size-4" />
                            Class Biography
                        </div>
                        <h1 className="mt-7 text-5xl font-black tracking-[0.1em] text-white uppercase drop-shadow-[0_0_26px_rgba(52,211,153,0.42)] sm:text-7xl lg:text-8xl">
                            Ranger
                        </h1>
                        <div className="mt-6 h-1 w-28 bg-gradient-to-r from-emerald-300 via-cyan-100 to-transparent" />
                        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
                            Rangers are cool-headed Eldin archers who draw on
                            their bond with nature. Aurora gems woven into their
                            tunics channel magic, empowering precise arrows that
                            can turn the course of a battle.
                        </p>
                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            {combatTraits.map((trait) => (
                                <div
                                    className="border border-white/14 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[4px]"
                                    key={trait.label}
                                >
                                    <trait.icon className="size-5 text-emerald-200" />
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
                                className="download-rank-button group relative inline-flex h-14 items-center justify-center overflow-hidden border-2 border-emerald-200/45 bg-emerald-400/12 px-6 text-sm font-black tracking-[0.16em] text-white uppercase transition hover:border-emerald-100 hover:bg-emerald-300/18 hover:text-emerald-50"
                                href="/download"
                            >
                                <span className="relative z-10">
                                    Play Ranger
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
                        <div className="absolute -inset-6 bg-[radial-gradient(circle,rgba(52,211,153,0.22),transparent_62%)] blur-2xl" />
                        <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-200/35 bg-black/24 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_34px_rgba(52,211,153,0.24),0_28px_70px_rgba(0,0,0,0.58)] backdrop-blur-[2px]">
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_18%,transparent_82%,rgba(52,211,153,0.18))]" />
                            <div className="pointer-events-none absolute top-5 left-5 z-20 size-10 border-t-2 border-l-2 border-cyan-100/70" />
                            <div className="pointer-events-none absolute top-5 right-5 z-20 size-10 border-t-2 border-r-2 border-emerald-100/70" />
                            <div className="pointer-events-none absolute bottom-5 left-5 z-20 size-10 border-b-2 border-l-2 border-emerald-100/70" />
                            <div className="pointer-events-none absolute right-5 bottom-5 z-20 size-10 border-r-2 border-b-2 border-cyan-100/70" />
                            <img
                                alt="Ranger class showcase"
                                className="relative z-10 aspect-[4/5] w-full rounded-xl object-contain object-center p-12"
                                src="/storage/Assets/Class/rander_logo.png"
                            />
                            <img
                                alt="Ranger class sigil"
                                className="absolute bottom-8 left-8 z-20 h-24 w-24 object-contain drop-shadow-[0_0_22px_rgba(52,211,153,0.85)]"
                                src="/storage/Assets/Class/rander_logo.png"
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
                        <div className="mt-6 h-1 w-20 bg-gradient-to-r from-emerald-300 to-transparent" />
                        <p className="mt-7 text-base leading-8 text-white/70 sm:text-lg">
                            From the rear of a formation, Rangers watch for
                            surprise attacks and cover their allies with warning
                            shots. They assess the battlefield carefully,
                            choosing between concentrated precision and volleys
                            that strike groups of enemies.
                        </p>
                        <div className="mt-8 border-l-2 border-emerald-200/50 bg-emerald-400/8 p-5">
                            <div className="flex items-center gap-3 text-emerald-100">
                                <ShieldAlert className="size-5" />
                                <h3 className="text-sm font-black tracking-[0.18em] uppercase">
                                    Combat Note
                                </h3>
                            </div>
                            <p className="mt-4 text-sm leading-7 text-white/68">
                                Keep enemies at a distance. Enchanted arrows
                                disrupt approaching foes, while ice and snares
                                help a Ranger escape pursuers and regain a safe
                                firing position.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {abilities.map((ability) => (
                            <article
                                className="border border-white/14 bg-white/[0.045] p-5 transition hover:border-emerald-200/45 hover:bg-emerald-300/[0.07] hover:shadow-[0_0_28px_rgba(52,211,153,0.16)]"
                                key={ability.title}
                            >
                                <span className="flex size-12 items-center justify-center border border-emerald-200/35 bg-emerald-300/10 text-emerald-100">
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

                <div className="relative z-10 mx-auto mt-16 max-w-7xl border border-white/12 bg-[linear-gradient(135deg,rgba(52,211,153,0.14),rgba(6,10,17,0.9),rgba(14,116,144,0.1))] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.32)] sm:p-8">
                    <h2 className="text-2xl font-black tracking-[0.12em] uppercase">
                        Strengths
                    </h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {strengths.map((strength) => (
                            <div
                                className="flex items-center gap-3 border border-white/10 bg-black/30 p-4 text-sm font-bold text-white/78"
                                key={strength}
                            >
                                <Crosshair className="size-5 shrink-0 text-emerald-200" />
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
                            <p className="text-xs font-black tracking-[0.2em] text-emerald-100/70 uppercase">
                                Ranger Arsenal
                            </p>
                            <h2 className="mt-3 text-3xl font-black tracking-[0.1em] text-white uppercase sm:text-5xl">
                                Skills
                            </h2>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-white/58">
                            Precision shots, elemental arrows, hunting marks,
                            and survival skills available to the Ranger class.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <label className="group relative block w-full max-w-xl">
                            <Search
                                className={cn(
                                    'pointer-events-none absolute top-1/2 left-4 z-10 size-5 -translate-y-1/2 text-emerald-100/58 transition duration-300',
                                    isSearching &&
                                        'text-emerald-100 drop-shadow-[0_0_10px_rgba(52,211,153,0.75)]',
                                )}
                            />
                            <input
                                className={cn(
                                    'h-14 w-full rounded-xl border border-emerald-100/22 bg-black/58 pr-4 pl-12 text-sm font-bold text-white backdrop-blur-[4px] transition outline-none placeholder:text-white/34 focus:border-emerald-100/55 focus:shadow-[0_0_24px_rgba(52,211,153,0.16)]',
                                    isSearching &&
                                        'border-emerald-100/45 shadow-[0_0_28px_rgba(52,211,153,0.18)]',
                                )}
                                onChange={(event) =>
                                    setSkillSearch(event.target.value)
                                }
                                aria-label="Search Ranger skills"
                                placeholder="Search skill arsenal..."
                                type="search"
                                value={skillSearch}
                            />
                            <span
                                className={cn(
                                    'pointer-events-none absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 rounded-full bg-gradient-to-r from-emerald-100/0 via-emerald-100 to-cyan-100/0 transition duration-300',
                                    isSearching &&
                                        'dragona-search-scan scale-x-100',
                                )}
                            />
                        </label>
                        <p className="text-xs font-black tracking-[0.16em] text-white/42 uppercase">
                            {filteredSkills.length} / {rangerSkills.length}{' '}
                            Skills
                        </p>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {filteredSkills.map((skill, index) => (
                            <article
                                className={cn(
                                    'group relative min-h-64 overflow-hidden rounded-xl border border-emerald-100/18 bg-black/58 p-5 shadow-[0_18px_46px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[4px] transition duration-300 hover:-translate-y-1 hover:border-emerald-100/55 hover:bg-[linear-gradient(145deg,rgba(52,211,153,0.16),rgba(0,0,0,0.68),rgba(8,47,73,0.18))] hover:shadow-[0_0_30px_rgba(52,211,153,0.2),0_22px_58px_rgba(0,0,0,0.5)]',
                                    isSearching && 'dragona-skill-result',
                                )}
                                key={skill.name}
                                style={
                                    {
                                        '--skill-result-delay': `${Math.min(index, 11) * 28}ms`,
                                    } as React.CSSProperties
                                }
                            >
                                <div className="pointer-events-none absolute inset-x-5 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-emerald-100/80 to-transparent transition duration-300 group-hover:scale-x-100" />
                                <div className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.08)_45%,transparent_70%)] transition duration-700 group-hover:translate-x-[120%]" />
                                <div className="relative flex items-start justify-between gap-4">
                                    <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-emerald-100/35 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.24),rgba(52,211,153,0.24),rgba(8,47,73,0.28))] text-sm font-black text-white shadow-[0_0_18px_rgba(52,211,153,0.18)] transition duration-300 group-hover:scale-105 group-hover:border-emerald-100/70 group-hover:shadow-[0_0_24px_rgba(52,211,153,0.34)]">
                                        <span
                                            role="img"
                                            aria-label={`${skill.name} skill icon`}
                                            className="absolute inset-0 z-10 bg-no-repeat transition duration-300 group-hover:scale-110"
                                            style={{
                                                backgroundImage:
                                                    "url('/storage/Assets/Skills/Ranger/skill-reference.png')",
                                                backgroundSize: `${(493 / 35) * 100}% ${(1254 / 35) * 100}%`,
                                                backgroundPosition: `${(6 / (493 - 35)) * 100}% ${((1 + skill.iconRow * 38) / (1254 - 35)) * 100}%`,
                                            }}
                                        />
                                        {String(skill.iconRow + 1).padStart(
                                            2,
                                            '0',
                                        )}
                                    </span>
                                    <span className="text-xs font-black tracking-[0.16em] text-white/32 transition group-hover:text-emerald-100/62">
                                        {String(skill.iconRow + 1).padStart(
                                            2,
                                            '0',
                                        )}
                                    </span>
                                </div>
                                <h3 className="relative mt-5 text-lg leading-6 font-black text-white transition group-hover:text-emerald-50 group-hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.32)]">
                                    {skill.name}
                                </h3>
                                <p className="relative mt-3 text-sm leading-6 text-white/64 transition group-hover:text-white/82">
                                    {skill.description}
                                </p>
                            </article>
                        ))}
                    </div>
                    {!filteredSkills.length && (
                        <div className="mt-8 rounded-xl border border-emerald-100/18 bg-black/58 p-8 text-center text-sm font-bold text-white/62">
                            No Ranger skills matched your search.
                        </div>
                    )}
                </div>

                <p className="relative z-10 mx-auto mt-8 max-w-7xl text-xs leading-6 text-white/42">
                    Biography adapted from the{' '}
                    <a
                        href="https://dragona.fandom.com/wiki/Ranger"
                        className="text-emerald-200 underline underline-offset-4 hover:text-white"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Dragona Online Wiki: Ranger
                    </a>{' '}
                    (CC BY-SA). Skill details follow the supplied Ranger
                    reference.
                </p>
            </section>
        </>
    );
}
