import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import CommunityPage from '@/components/dragona/community-page';

const questions = [
    {
        question: 'How do I create an account?',
        answer: (
            <>
                Open the <Link href="/register">registration page</Link>, enter
                your display name and email address, and choose a password. Use
                at least 12 characters, including letters and numbers, then
                confirm your password.
            </>
        ),
    },
    {
        question: 'Where can I find the game client?',
        answer: (
            <>
                Visit the <Link href="/download">download page</Link> for the
                client and installation guide.
            </>
        ),
    },
    {
        question: 'What should I do if I forget my password?',
        answer: (
            <>
                Open <Link href="/forgot-password">Forgot password</Link> and
                enter the email address associated with your account. Follow the
                reset link in the email to choose a new password. Reset links
                expire after 60 minutes and can only be used once.
            </>
        ),
    },
    {
        question: 'Why can’t I log in?',
        answer: (
            <>
                Check that you are using the email address you registered with
                and that your password is entered correctly. Passwords are
                case-sensitive. After repeated attempts, wait a minute before
                trying again. If needed, use{' '}
                <Link href="/forgot-password">password recovery</Link>.
            </>
        ),
    },
    {
        question: 'Where can I check maintenance notices?',
        answer: (
            <>
                Check the <Link href="/notice">Notice page</Link> for published
                maintenance details and service updates. An empty notice board
                does not confirm server availability.
            </>
        ),
    },
    {
        question: 'Where can I read patch notes?',
        answer: (
            <>
                The{' '}
                <Link href="/patch-announcement">Patch Announcement page</Link>{' '}
                is where published update notes, fixes, and gameplay changes
                will appear.
            </>
        ),
    },
    {
        question: 'How do I find upcoming events?',
        answer: (
            <>
                Visit the <Link href="/events">Events page</Link>. When an event
                is announced, check its schedule and participation instructions
                before joining.
            </>
        ),
    },
];

export default function Faq() {
    return (
        <CommunityPage category="faq">
            <div className="divide-y divide-cyan-100/10">
                {questions.map(({ question, answer }) => (
                    <details key={question} className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-6 text-sm leading-6 font-bold text-slate-100 transition hover:bg-cyan-200/5 focus-visible:outline-2 focus-visible:outline-cyan-200 [&::-webkit-details-marker]:hidden">
                            {question}
                            <ChevronDown
                                aria-hidden="true"
                                className="size-4 shrink-0 text-cyan-200 transition group-open:rotate-180"
                            />
                        </summary>
                        <div className="px-6 pb-6 font-[Arial,sans-serif] text-sm leading-7 text-slate-300 [&_a]:text-cyan-200 [&_a]:underline [&_a]:underline-offset-4">
                            {answer}
                        </div>
                    </details>
                ))}
            </div>
        </CommunityPage>
    );
}
