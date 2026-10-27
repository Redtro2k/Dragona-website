import { Head, Link } from '@inertiajs/react';
import { Search, Sparkles, Target, WandSparkles, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

const traits = [
    { label: 'Role', value: 'Destructive Caster', icon: WandSparkles },
    { label: 'Focus', value: 'Elemental Magic', icon: Sparkles },
    { label: 'Race', value: 'Eldin', icon: Target },
];

const abilities = [
    {
        title: 'Discharge Mana Field',
        description:
            'Fires a ray of mana that deals damage.',
        icon: Sparkles,
    },
    {
        title: 'Freezing Point',
        description:
            'Instantly freezes the target, dealing damage and additional cold damage while reducing Movement Speed.',
        icon: WandSparkles,
    },
    {
        title: 'Shower of Fires',
        description:
            'Deals damage and additional fire damage to enemies in the target area, leaving them burning over time.',
        icon: Zap,
    },
];

const strengths = [
    'Delivers exceptional magical firepower from a safe distance',
    'Uses elemental spells to damage groups of enemies',
    'Slows, confuses, and traps enemies with mana-field control',
    'Combines Draconic magic with powerful destruction spells',
    'Can keep fragile targets protected by denying enemy approach',
    'Rewards careful positioning and deliberate spell timing',
];

const transformations = [
    { name: 'Denebola', type: 'Partial Transformation' },
    { name: 'Deneb', type: 'Full Transformation' },
];

const magicianSkills = [
    {
        name: 'Discharge Mana Field',
        description: 'Firing a ray of mana deals damage.',
        iconRow: 0,
    },
    {
        name: 'Magic Arrow',
        description: 'Firing refined mana deals damage and additional dark damage.',
        iconRow: 1,
    },
    {
        name: 'Fireball',
        description: 'Firing a burning ball of flame deals damage and additional fire damage.',
        iconRow: 2,
    },
    {
        name: 'Ice Spear',
        description: 'Gathering the essence of coldness and firing it in the form of a spear deals damage and additional cold damage.',
        iconRow: 3,
    },
    {
        name: 'Electric Discharge Particles',
        description: 'Firing a laser that pulls in electricity deals damage and additional lightning damage.',
        iconRow: 4,
    },
    {
        name: 'Swarm',
        description: 'Summoning a variety of poisonous insects to the target location deals damage continually to all enemies that enter.',
        iconRow: 5,
    },
    {
        name: 'Mind Freeze',
        description: 'Instantly blocking the flow of mana deals damage and drains MP.',
        iconRow: 6,
    },
    {
        name: 'Falling Rocks',
        description: 'Calling down a magic boulder deals damage and stuns the target.',
        iconRow: 7,
    },
    {
        name: 'Ignite',
        description: 'Igniting the target deals damage and additional fire damage.',
        iconRow: 8,
    },
    {
        name: 'Freezing Point',
        description: 'Instantly freezing the target deals damage and additional cold damage, while reducing Movement Speed.',
        iconRow: 9,
    },
    {
        name: 'Electrocution',
        description: 'Electrocuting the target deals damage and additional lightning damage, while interrupting skill casting.',
        iconRow: 10,
    },
    {
        name: 'Infection',
        description: 'Deals damage and additional poison damage, while inflicting poison DoT.',
        iconRow: 11,
    },
    {
        name: 'Dimensional Gateway',
        description: 'You remove yourself to another dimension, avoiding all damage. However, you cannot take any actions in this state.',
        iconRow: 12,
    },
    {
        name: 'Cause Confusion',
        description: 'Confuses the target and stuns it.',
        iconRow: 13,
    },
    {
        name: 'Shower of Fires',
        description: 'You deal damage and additional fire damage to enemies in the target area. The attacked enemies suffer DoT from burning.',
        iconRow: 14,
    },
    {
        name: 'Disturb Gravity',
        description: 'Increases the gravity of the target location and reduces Movement Speed, with additional ice damage.',
        iconRow: 15,
    },
    {
        name: 'Spike',
        description: 'You deal damage and additional lightning damage to enemies in the target area. The attacked enemies cannot use skills for a while and their movement speed decreases.',
        iconRow: 16,
    },
    {
        name: 'Infectious Disease',
        description: 'You deal DoT from poisoning to the target and nearby enemies.',
        iconRow: 17,
    },
    {
        name: 'Conceal Mana',
        description: 'Erasing traces of mana removes you from the sight of hostile enemies nearby.',
        iconRow: 18,
    },
    {
        name: 'Summon Tornado',
        description: 'Instantly summoning a powerful whirlwind deals damage and additional dark damage to enemies nearby.',
        iconRow: 19,
    },
    {
        name: 'Restoration',
        description: 'You tap into the vitality reserve, instantly restoring your HP and removing Status Anomalies.',
        iconRow: 20,
    },
    {
        name: 'Mana Bomb',
        description: 'Making pure mana explode deals damage and additional dark damage to enemies within the area and drains MP.',
        iconRow: 21,
    },
    {
        name: 'Gaze of Frenzy',
        description: 'Indicates the amount of HP the magician recovers while not in combat.',
        iconRow: 22,
    },
    {
        name: 'Find the Source',
        description: 'Researching the origin of elements increases Elemental Attack.',
        iconRow: 23,
    },
    {
        name: 'Magic Protection',
        description: 'Magic Defense is increased.',
        iconRow: 24,
    },
    {
        name: 'Train Body',
        description: 'Training the body allows you to survive longer in dangerous situations. Max. HP increases.',
        iconRow: 25,
    },
    {
        name: 'Mental Discipline',
        description: 'Training the mind allows you to use mind-consuming skills endlessly. Max. HP increased.',
        iconRow: 26,
    },
    {
        name: 'Source Awakening',
        description: 'Becoming aware of the dormant power of the dragon within increases Max. CORE.',
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

export default function Magician() {
    const [skillSearch, setSkillSearch] = useState('');
    const filteredSkills = useMemo(() => {
        const search = skillSearch.trim().toLowerCase();

        if (!search) {
            return magicianSkills;
        }

        return magicianSkills.filter((skill) =>
            `${skill.name} ${skill.description}`.toLowerCase().includes(search),
        );
    }, [skillSearch]);

    return (
        <>
            <Head title="Magician Bio" />
            <section
                className="relative min-h-screen overflow-hidden bg-black bg-cover bg-fixed bg-center px-6 pt-36 pb-20 text-white"
                style={{
                    backgroundImage: "url('/storage/Assets/background1.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black/75" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_38%,rgba(168,85,247,0.24),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.94),rgba(0,0,0,0.68),rgba(0,0,0,0.88))]" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#05070b]" />

                <div className="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
                    <div>
                        <div className="inline-flex items-center gap-3 border border-purple-200/30 bg-purple-400/10 px-4 py-2 text-xs font-black tracking-[0.2em] text-purple-100 uppercase shadow-[0_0_24px_rgba(168,85,247,0.16)]">
                            <Sparkles className="size-4" />
                            Class Biography
                        </div>
                        <h1 className="mt-7 text-5xl font-black tracking-[0.1em] text-white uppercase drop-shadow-[0_0_26px_rgba(168,85,247,0.48)] sm:text-7xl lg:text-8xl">
                            Magician
                        </h1>
                        <div className="mt-6 h-1 w-28 bg-gradient-to-r from-purple-300 via-fuchsia-100 to-transparent" />
                        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
                            Magicians are Eldin spellcasters who combine the power
                            of aurora gems with ancient Draconic magic. Their
                            immense destructive power controls the battlefield
                            before enemies can close the distance.
                        </p>
                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            {traits.map((trait) => (
                                <div
                                    className="border border-white/14 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[4px]"
                                    key={trait.label}
                                >
                                    <trait.icon className="size-5 text-purple-200" />
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
                                className="inline-flex h-14 items-center justify-center border-2 border-purple-200/45 bg-purple-400/12 px-6 text-sm font-black tracking-[0.16em] text-white uppercase transition hover:border-purple-100 hover:bg-purple-300/18 hover:text-purple-50"
                                href="/download"
                            >
                                Play Magician
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
                        <div className="absolute -inset-6 bg-[radial-gradient(circle,rgba(168,85,247,0.24),transparent_62%)] blur-2xl" />
                        <div className="relative overflow-hidden rounded-2xl border-2 border-purple-200/35 bg-black/24 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_34px_rgba(168,85,247,0.24),0_28px_70px_rgba(0,0,0,0.58)] backdrop-blur-[2px]">
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_18%,transparent_82%,rgba(168,85,247,0.18))]" />
                            <img
                                alt="Magician class showcase"
                                className="relative z-10 aspect-[4/5] w-full rounded-xl object-contain object-center p-12"
                                src="/storage/Assets/Class/mage_logo.png"
                            />
                            <img
                                alt="Magician class sigil"
                                className="absolute bottom-8 left-8 z-20 h-24 w-24 object-contain drop-shadow-[0_0_22px_rgba(168,85,247,0.85)]"
                                src="/storage/Assets/Class/mage_logo.png"
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
                <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <h2 className="text-3xl font-black tracking-[0.1em] uppercase sm:text-5xl">
                            Battle Identity
                        </h2>
                        <div className="mt-6 h-1 w-20 bg-gradient-to-r from-purple-300 to-transparent" />
                        <p className="mt-7 text-base leading-8 text-white/70 sm:text-lg">
                            A Magician wins by controlling space. Slow the enemy,
                            create a trap, and then unleash overwhelming magic
                            before the opposing force can reach you.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {abilities.map((ability) => (
                            <article
                                className="border border-white/14 bg-white/[0.045] p-5 transition hover:border-purple-200/45 hover:bg-purple-300/[0.07] hover:shadow-[0_0_28px_rgba(168,85,247,0.16)]"
                                key={ability.title}
                            >
                                <span className="flex size-12 items-center justify-center border border-purple-200/35 bg-purple-300/10 text-purple-100">
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

                <div className="relative z-10 mx-auto mt-16 max-w-7xl border border-white/12 bg-[linear-gradient(135deg,rgba(168,85,247,0.14),rgba(6,10,17,0.9),rgba(14,116,144,0.1))] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.32)] sm:p-8">
                    <h2 className="text-2xl font-black tracking-[0.12em] uppercase">
                        Strengths
                    </h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {strengths.map((strength) => (
                            <div
                                className="flex items-center gap-3 border border-white/10 bg-black/30 p-4 text-sm font-bold text-white/78"
                                key={strength}
                            >
                                <Target className="size-5 shrink-0 text-purple-200" />
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
                            <p className="text-xs font-black tracking-[0.2em] text-purple-100/70 uppercase">
                                Magician Arsenal
                            </p>
                            <h2 className="mt-3 text-3xl font-black tracking-[0.1em] text-white uppercase sm:text-5xl">
                                Skills
                            </h2>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-white/58">
                            Destructive spells, Draconic magic, and control tools
                            available to the Magician class.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <label className="group relative block w-full max-w-xl">
                            <Search className="pointer-events-none absolute top-1/2 left-4 z-10 size-5 -translate-y-1/2 text-purple-100/58" />
                            <input
                                className={cn(
                                    'h-14 w-full rounded-xl border border-purple-100/22 bg-black/58 pr-4 pl-12 text-sm font-bold text-white backdrop-blur-[4px] transition outline-none placeholder:text-white/34 focus:border-purple-100/55 focus:shadow-[0_0_24px_rgba(168,85,247,0.16)]',
                                    skillSearch && 'border-purple-100/45',
                                )}
                                onChange={(event) => setSkillSearch(event.target.value)}
                                aria-label="Search Magician skills"
                                placeholder="Search spell arsenal..."
                                type="search"
                                value={skillSearch}
                            />
                        </label>
                        <p className="text-xs font-black tracking-[0.16em] text-white/42 uppercase">
                            {filteredSkills.length} / {magicianSkills.length} Skills
                        </p>
                    </div>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredSkills.map((skill) => (
                            <article
                                className="group min-h-52 border border-purple-100/18 bg-black/58 p-5 shadow-[0_18px_46px_rgba(0,0,0,0.32)] backdrop-blur-[4px] transition duration-300 hover:-translate-y-1 hover:border-purple-100/55 hover:bg-purple-300/[0.08]"
                                key={skill.name}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <span className="flex size-12 items-center justify-center rounded-lg border border-purple-100/35 bg-purple-300/10 text-purple-100">
                                        <span
                                            role="img"
                                            aria-label={`${skill.name} skill icon`}
                                            className="block size-full rounded-lg bg-no-repeat"
                                            style={{
                                                backgroundImage:
                                                    "url('/storage/Assets/Skills/Magician/skill-reference.png')",
                                                backgroundSize: `${(491 / 35) * 100}% ${(1254 / 35) * 100}%`,
                                                backgroundPosition: `${(5 / (491 - 35)) * 100}% ${((1 + skill.iconRow * 38) / (1254 - 35)) * 100}%`,
                                            }}
                                        />
                                    </span>
                                    <span className="text-xs font-black tracking-[0.16em] text-white/32">
                                        {String(skill.iconRow + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <h3 className="mt-5 text-lg font-black text-white transition group-hover:text-purple-50">
                                    {skill.name}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-white/64">
                                    {skill.description}
                                </p>
                            </article>
                        ))}
                    </div>
                    {!filteredSkills.length && (
                        <div className="mt-8 rounded-xl border border-purple-100/18 bg-black/58 p-8 text-center text-sm font-bold text-white/62">
                            No Magician skills matched your search.
                        </div>
                    )}
                </div>

                <p className="relative z-10 mx-auto mt-8 max-w-7xl text-xs leading-6 text-white/42">
                    Biography adapted from the{' '}
                    <a
                        href="https://dragona.fandom.com/wiki/Magician"
                        className="text-purple-200 underline underline-offset-4 hover:text-white"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Dragona Online Wiki: Magician
                    </a>{' '}
                    (CC BY-SA). Class details follow the supplied Magician reference.
                </p>
            </section>
        </>
    );
}
