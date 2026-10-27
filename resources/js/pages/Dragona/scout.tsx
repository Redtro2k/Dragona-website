import { Head, Link } from '@inertiajs/react';
import {
    BadgeCheck,
    Crosshair,
    Eye,
    Search,
    ShieldAlert,
    Sparkles,
    Wind,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

const traits = [
    { label: 'Role', value: 'Agile Trapper', icon: Crosshair },
    { label: 'Weapon', value: 'Shuriken', icon: Sparkles },
    { label: 'Specialty', value: 'Stealth & Evasion', icon: Eye },
];

const abilities = [
    {
        title: 'Ghost Shuriken',
        description:
            'Throws a shuriken at the target, dealing damage with Critical Hit.',
        icon: Crosshair,
    },
    {
        title: 'Igniting Trap',
        description:
            'Sets a trap that deals fire explosion damage and continuous fire damage to trapped enemies.',
        icon: ShieldAlert,
    },
    {
        title: 'Riding the Wind',
        description:
            'Riding the flow of the wind increases your Movement Speed.',
        icon: Wind,
    },
];

const strengths = [
    'Fastest class with exceptional movement speed',
    'Uses stealth, back attacks, and high evasion to survive',
    'Controls space with damaging elemental traps',
    'Can reveal concealed enemies with sharp senses',
    'Strong regeneration and resilience from nature’s power',
    'Supports allies by improving movement and combat stats',
];

const transformations = [
    {
        name: 'Hamal',
        type: 'Partial Transformation',
        description:
            'Improves attack power, MP regeneration, movement speed, and HP resilience through the Hamal set.',
    },
    {
        name: 'Spica',
        type: 'Full Transformation',
        description:
            'Takes the form of a powerful feline avatar with debuffs, speed, extra HP, and concealed-enemy detection.',
    },
];

const scoutSkills = [
    {
        name: 'Shuriken Attack',
        description:
            'Throwing a shuriken deals damage.',
        iconRow: 0,
    },
    {
        name: 'Ghost Shuriken',
        description:
            'Throwing a shuriken at the target deals damage with Critical Hit.',
        iconRow: 1,
    },
    {
        name: 'Spray Darkness',
        description:
            'Spraying the target location with numerous ice energies deals damage and reduces Movement Speed.',
        iconRow: 2,
    },
    {
        name: 'Concealment',
        description:
            'Conceal yourself while not in combat.',
        iconRow: 3,
    },
    {
        name: 'HP Recovery',
        description:
            'Exuding powerful life energy restores HP to yourself or to an ally.',
        iconRow: 4,
    },
    {
        name: 'Igniting Trap',
        description:
            'Installs an ignition trap on the ground. Trapped enemies will suffer fire explosion damage and damage from continuous fire damage. As skill level increases, more enemies can be trapped. At maximum skill level, you can deliver trap damage to a maximum of 7 enemies.',
        iconRow: 5,
    },
    {
        name: 'Evasive Instinct',
        description:
            'Maximizing the instinctive sense of evasion increases Evasion.',
        iconRow: 6,
    },
    {
        name: 'Shadow Strike',
        description:
            'Stabbing the shadow with the shuriken deals damage, and additional dark damage.',
        iconRow: 7,
    },
    {
        name: 'Attack in the Dark',
        description:
            'Ambushing the target out of concealment deals damage and additional dark damage, and stuns the target.',
        iconRow: 8,
    },
    {
        name: 'Stir of Life',
        description:
            'Increases HP recovery for the effective duration.',
        iconRow: 9,
    },
    {
        name: 'Cold Energy Trap',
        description:
            'Installs a cold trap on the ground. Trapped enemies will suffer cold explosion damage and damage, along with decreased Movement Speed. As skill level increases, more enemies can be trapped. At maximum skill level, you can deliver trap damage to a maximum of 7 enemies.',
        iconRow: 10,
    },
    {
        name: 'Rapid Movement',
        description:
            'Maximizes instant reflex and moves the character to the desired location.',
        iconRow: 11,
    },
    {
        name: 'Apply Poison',
        description:
            'Throwing a shuriken with poison applied deals damage and poison damage continually.',
        iconRow: 12,
    },
    {
        name: 'Complete Immersion',
        description:
            'Conceal yourself during combat. However, you are immobilized for the duration of the skill.',
        iconRow: 13,
    },
    {
        name: 'Survive',
        description:
            'In order to survive to the very end, you instantly restore HP and total HP amount.',
        iconRow: 14,
    },
    {
        name: 'Binding Trap',
        description:
            'Installs a binding trap on the ground. Trapped enemies will suffer trap explosion damage and damage, and cannot move for a while. As skill level increases, more enemies can be trapped. At maximum skill level, you can deliver trap damage to a maximum of 7 enemies.',
        iconRow: 15,
    },
    {
        name: 'Riding the Wind',
        description:
            'Riding the flow of the wind increases your Movement Speed.',
        iconRow: 16,
    },
    {
        name: 'Hawk Strike',
        description:
            'The attack with the precision of a hawk deals damage and Critical Hit.',
        iconRow: 17,
    },
    {
        name: 'Lightning Trap',
        description:
            'Installs a lightning trap on the ground. Trapped enemies will suffer lightning explosion damage and damage, but will suffer from continuous lightning damage. As skill level increases, more enemies can be trapped. At maximum level, more enemies can be trapped.',
        iconRow: 18,
    },
    {
        name: 'Nature\'s Harmony',
        description:
            'Assimilating to the flow of nature increases Elemental Attack of yourself and nearby allies.',
        iconRow: 19,
    },
    {
        name: 'Apply Oil',
        description:
            'Setting an oily shuriken on fire and throwing it deals damage and additional fire damage, and fire damage continually.',
        iconRow: 20,
    },
    {
        name: 'Zombie Trap',
        description:
            'Installs a zombie trap on the ground. Trapped enemies will suffer dark damage and damage, along with decreased Movement Speed and continuous MP consumption, and while stunning it.',
        iconRow: 21,
    },
    {
        name: 'Shape of Tiger',
        description:
            'Use the buff to increase Protection, Magic Protection, and Elemental Attack for you and your ally. However, it reduces MP Recovery.',
        iconRow: 22,
    },
    {
        name: 'Mind\'s Eye Strike',
        description:
            'Seeing the enemy through the eyes of your heart and striking him deals damage and additional dark damage, and disrupts their skill casting.',
        iconRow: 23,
    },
    {
        name: 'Sense Presence',
        description:
            'Detecting the smallest hint of your enemy\'s movement allows you to detect concealed enemies more easily.',
        iconRow: 24,
    },
    {
        name: 'Agility',
        description:
            'Enhancing agile movement increases Evasion, Fire Resistance, Cold Resistance, Lightning Resistance, and Poison Resistance.',
        iconRow: 25,
    },
    {
        name: 'Predator Instinct',
        description:
            'Decreases Movement Speed but increases Min. Attack and Max Attack.',
        iconRow: 26,
    },
    {
        name: 'Quickness',
        description:
            'Developing excellent motor skill increases Movement Speed.',
        iconRow: 27,
    },
    {
        name: 'Train Body',
        description:
            'Training the body allows you to survive longer in dangerous situations. Max. HP increases.',
        iconRow: 28,
    },
    {
        name: 'Mental Discipline',
        description:
            'Training the mind allows you to use mind-consuming skills endlessly. Max. MP increases.',
        iconRow: 29,
    },
    {
        name: 'Source Awakening',
        description:
            'Becoming aware of the dormant power of the dragon within increases Max. CORE.',
        iconRow: 30,
    },
    {
        name: 'Property Hit Training',
        description:
            'Elemental Attack is increased.',
        iconRow: 31,
    },
    {
        name: 'Fire Resistance',
        description:
            'Resistance to fire attack is increased.',
        iconRow: 32,
    },
    {
        name: 'Cold Resistance',
        description:
            'Resistance to cold attack is increased.',
        iconRow: 33,
    },
    {
        name: 'Lightning Resistance',
        description:
            'Resistance to lightning attack is increased.',
        iconRow: 34,
    },
    {
        name: 'Poison Resistance',
        description:
            'Resistance to poison attack is increased.',
        iconRow: 35,
    },
];

export default function Scout() {
    const [skillSearch, setSkillSearch] = useState('');
    const filteredSkills = useMemo(() => {
        const search = skillSearch.trim().toLowerCase();

        if (!search) {
            return scoutSkills;
        }

        return scoutSkills.filter((skill) =>
            `${skill.name} ${skill.description}`.toLowerCase().includes(search),
        );
    }, [skillSearch]);
    const isSearching = skillSearch.trim().length > 0;

    return (
        <>
            <Head title="Scout Bio" />
            <section
                className="relative min-h-screen overflow-hidden bg-black bg-cover bg-fixed bg-center px-6 pt-36 pb-20 text-white"
                style={{
                    backgroundImage: "url('/storage/Assets/background1.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black/74" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_38%,rgba(132,204,22,0.18),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.94),rgba(0,0,0,0.68),rgba(0,0,0,0.88))]" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#05070b]" />

                <div className="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
                    <div>
                        <div className="inline-flex items-center gap-3 border border-lime-200/30 bg-lime-400/10 px-4 py-2 text-xs font-black tracking-[0.2em] text-lime-100 uppercase shadow-[0_0_24px_rgba(132,204,22,0.16)]">
                            <BadgeCheck className="size-4" />
                            Class Biography
                        </div>
                        <h1 className="mt-7 text-5xl font-black tracking-[0.1em] text-white uppercase drop-shadow-[0_0_26px_rgba(132,204,22,0.42)] sm:text-7xl lg:text-8xl">
                            Scout
                        </h1>
                        <div className="mt-6 h-1 w-28 bg-gradient-to-r from-lime-300 via-cyan-100 to-transparent" />
                        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
                            A cunning mid-range hunter who turns the battlefield
                            into a maze of shuriken, traps, stealth, and speed.
                            Scouts rely on patience, precision, and nature-born
                            agility to outmaneuver their prey.
                        </p>
                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            {traits.map((trait) => (
                                <div
                                    className="border border-white/14 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[4px]"
                                    key={trait.label}
                                >
                                    <trait.icon className="size-5 text-lime-200" />
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
                                className="download-rank-button group relative inline-flex h-14 items-center justify-center overflow-hidden border-2 border-lime-200/45 bg-lime-400/12 px-6 text-sm font-black tracking-[0.16em] text-white uppercase transition hover:border-lime-100 hover:bg-lime-300/18 hover:text-lime-50"
                                href="/download"
                            >
                                <span className="relative z-10">
                                    Play Scout
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
                        <div className="absolute -inset-6 bg-[radial-gradient(circle,rgba(132,204,22,0.22),transparent_62%)] blur-2xl" />
                        <div className="relative overflow-hidden rounded-2xl border-2 border-lime-200/35 bg-black/24 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_34px_rgba(132,204,22,0.24),0_28px_70px_rgba(0,0,0,0.58)] backdrop-blur-[2px]">
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_18%,transparent_82%,rgba(132,204,22,0.18))]" />
                            <div className="pointer-events-none absolute top-5 left-5 z-20 size-10 border-t-2 border-l-2 border-cyan-100/70" />
                            <div className="pointer-events-none absolute top-5 right-5 z-20 size-10 border-t-2 border-r-2 border-lime-100/70" />
                            <div className="pointer-events-none absolute bottom-5 left-5 z-20 size-10 border-b-2 border-l-2 border-lime-100/70" />
                            <div className="pointer-events-none absolute right-5 bottom-5 z-20 size-10 border-r-2 border-b-2 border-cyan-100/70" />
                            <img
                                alt="Scout class showcase"
                                className="relative z-10 aspect-[4/5] w-full rounded-xl object-contain object-center p-12"
                                src="/storage/Assets/Class/scout_logo.png"
                            />
                            <img
                                alt="Scout class sigil"
                                className="absolute bottom-8 left-8 z-20 h-24 w-24 object-contain drop-shadow-[0_0_22px_rgba(132,204,22,0.85)]"
                                src="/storage/Assets/Class/scout_logo.png"
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
                        <div className="mt-6 h-1 w-20 bg-gradient-to-r from-lime-300 to-transparent" />
                        <p className="mt-7 text-base leading-8 text-white/70 sm:text-lg">
                                Scouts are flexible battlefield controllers. Their
                                shuriken provide reliable mid-range pressure while
                                traps create danger zones and elemental debuffs.
                                Their speed, evasion, regeneration, and keen senses
                                let them choose when to engage and when to vanish.
                            </p>
                        <div className="mt-8 border-l-2 border-lime-200/50 bg-lime-400/8 p-5">
                            <div className="flex items-center gap-3 text-lime-100">
                                <ShieldAlert className="size-5" />
                                <h3 className="text-sm font-black tracking-[0.18em] uppercase">
                                    Combat Note
                                </h3>
                            </div>
                            <p className="mt-4 text-sm leading-7 text-white/68">
                                    A Scout rewards planning. Lay traps, exploit
                                    openings, strike from hiding, and use movement
                                    speed to keep enemies fighting on your terms.
                                </p>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {abilities.map((ability) => (
                            <article
                                className="border border-white/14 bg-white/[0.045] p-5 transition hover:border-lime-200/45 hover:bg-lime-300/[0.07] hover:shadow-[0_0_28px_rgba(132,204,22,0.16)]"
                                key={ability.title}
                            >
                                <span className="flex size-12 items-center justify-center border border-lime-200/35 bg-lime-300/10 text-lime-100">
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

                <div className="relative z-10 mx-auto mt-16 max-w-7xl border border-white/12 bg-[linear-gradient(135deg,rgba(132,204,22,0.14),rgba(6,10,17,0.9),rgba(14,116,144,0.1))] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.32)] sm:p-8">
                    <h2 className="text-2xl font-black tracking-[0.12em] uppercase">
                        Strengths
                    </h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {strengths.map((strength) => (
                            <div
                                className="flex items-center gap-3 border border-white/10 bg-black/30 p-4 text-sm font-bold text-white/78"
                                key={strength}
                            >
                                <Crosshair className="size-5 shrink-0 text-lime-200" />
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
                            <p className="mt-4 text-sm leading-7 text-white/65">
                                {transformation.description}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="relative z-10 mx-auto mt-16 max-w-7xl">
                    <div className="flex flex-col gap-4 border-b border-white/12 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-black tracking-[0.2em] text-lime-100/70 uppercase">
                                Scout Arsenal
                            </p>
                            <h2 className="mt-3 text-3xl font-black tracking-[0.1em] text-white uppercase sm:text-5xl">
                                Skills
                            </h2>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-white/58">
                            Shuriken attacks, elemental traps, stealth techniques, nature buffs, and passive skills available to the Scout class.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <label className="group relative block w-full max-w-xl">
                            <Search
                                className={cn(
                                    'pointer-events-none absolute top-1/2 left-4 z-10 size-5 -translate-y-1/2 text-lime-100/58 transition duration-300',
                                    isSearching &&
                                        'text-lime-100 drop-shadow-[0_0_10px_rgba(132,204,22,0.75)]',
                                )}
                            />
                            <input
                                className={cn(
                                    'h-14 w-full rounded-xl border border-lime-100/22 bg-black/58 pr-4 pl-12 text-sm font-bold text-white backdrop-blur-[4px] transition outline-none placeholder:text-white/34 focus:border-lime-100/55 focus:shadow-[0_0_24px_rgba(132,204,22,0.16)]',
                                    isSearching &&
                                        'border-lime-100/45 shadow-[0_0_28px_rgba(132,204,22,0.18)]',
                                )}
                                onChange={(event) =>
                                    setSkillSearch(event.target.value)
                                }
                                aria-label="Search Scout skills"
                                placeholder="Search Scout skills..."
                                type="search"
                                value={skillSearch}
                            />
                            <span
                                className={cn(
                                    'pointer-events-none absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 rounded-full bg-gradient-to-r from-lime-100/0 via-lime-100 to-cyan-100/0 transition duration-300',
                                    isSearching &&
                                        'dragona-search-scan scale-x-100',
                                )}
                            />
                        </label>
                        <p className="text-xs font-black tracking-[0.16em] text-white/42 uppercase">
                            {filteredSkills.length} / {scoutSkills.length}{' '}
                            Skills
                        </p>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {filteredSkills.map((skill, index) => (
                            <article
                                className={cn(
                                    'group relative min-h-64 overflow-hidden rounded-xl border border-lime-100/18 bg-black/58 p-5 shadow-[0_18px_46px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[4px] transition duration-300 hover:-translate-y-1 hover:border-lime-100/55 hover:bg-[linear-gradient(145deg,rgba(132,204,22,0.16),rgba(0,0,0,0.68),rgba(8,47,73,0.18))] hover:shadow-[0_0_30px_rgba(132,204,22,0.2),0_22px_58px_rgba(0,0,0,0.5)]',
                                    isSearching && 'dragona-skill-result',
                                )}
                                key={skill.name}
                                style={
                                    {
                                        '--skill-result-delay': `${Math.min(index, 11) * 28}ms`,
                                    } as React.CSSProperties
                                }
                            >
                                <div className="pointer-events-none absolute inset-x-5 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-lime-100/80 to-transparent transition duration-300 group-hover:scale-x-100" />
                                <div className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.08)_45%,transparent_70%)] transition duration-700 group-hover:translate-x-[120%]" />
                                <div className="relative flex items-start justify-between gap-4">
                                    <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-lime-100/35 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.24),rgba(132,204,22,0.24),rgba(8,47,73,0.28))] text-sm font-black text-white shadow-[0_0_18px_rgba(132,204,22,0.18)] transition duration-300 group-hover:scale-105 group-hover:border-lime-100/70 group-hover:shadow-[0_0_24px_rgba(132,204,22,0.34)]">
                                        <span
                                            role="img"
                                            aria-label={`${skill.name} skill icon`}
                                            className="absolute inset-0 z-10 bg-no-repeat transition duration-300 group-hover:scale-110"
                                            style={{
                                                backgroundImage:
                                                    "url('/storage/Assets/Skills/Scout/skill-reference.png')",
                                                backgroundSize: `${(492 / 35) * 100}% ${(1367 / 35) * 100}%`,
                                                backgroundPosition: `${(5 / (492 - 35)) * 100}% ${((1 + skill.iconRow * 38) / (1367 - 35)) * 100}%`,
                                            }}
                                        />
                                        {String(skill.iconRow + 1).padStart(
                                            2,
                                            '0',
                                        )}
                                    </span>
                                    <span className="text-xs font-black tracking-[0.16em] text-white/32 transition group-hover:text-lime-100/62">
                                        {String(skill.iconRow + 1).padStart(
                                            2,
                                            '0',
                                        )}
                                    </span>
                                </div>
                                <h3 className="relative mt-5 text-lg leading-6 font-black text-white transition group-hover:text-lime-50 group-hover:drop-shadow-[0_0_12px_rgba(132,204,22,0.32)]">
                                    {skill.name}
                                </h3>
                                <p className="relative mt-3 text-sm leading-6 text-white/64 transition group-hover:text-white/82">
                                    {skill.description}
                                </p>
                            </article>
                        ))}
                    </div>
                    {!filteredSkills.length && (
                        <div className="mt-8 rounded-xl border border-lime-100/18 bg-black/58 p-8 text-center text-sm font-bold text-white/62">
                            No Scout skills matched your search.
                        </div>
                    )}
                </div>

                <p className="relative z-10 mx-auto mt-8 max-w-7xl text-xs leading-6 text-white/42">
                    Character information adapted from the Dragona Online Wiki
                    Scout entry.
                </p>
            </section>
        </>
    );
}
