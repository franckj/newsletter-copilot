// src/content/copy.ts
//
// This is the file Juliet edits when she wants to change wording.
// All prose lives here. Components read from it.

export const meta = {
  title: 'Newsletter Co-Pilot — Juliet Lyall',
  description:
    "Support when you're overwhelmed. Advice when you're second-guessing. An outside opinion when you need one. 1-to-1 newsletter help for B2B founders.",
  ogImage: '/og-image.png',
  canonical: 'https://newslettercopilot.co/',
};

export const nav = {
  brand: 'Your Newsletter Co-Pilot',
  links: [
    { label: 'What you get', href: '#what-you-get' },
    { label: 'Who am I?', href: '#about' },
    { label: 'Pricing', href: '#pricing' },
  ],
  cta: { label: 'Claim your spot', href: '#claim' },
};

export const hero = {
  eyebrow: '1-to-1 newsletter help for B2B founders',
  h1Prefix: 'The',
  h1Accent: '#1 solution',
  h1Suffix: 'for all your newsletter stress, mess and unrest.',
  pillars: [
    { bold: 'Support', rest: " when you're overwhelmed." },
    { bold: 'Advice', rest: " when you're second-guessing." },
    { bold: 'An outside opinion', rest: ' when you need one.' },
  ],
  intro:
    "Newsletters are hard! You and your team are overwhelmed and there's never enough time, resource or specific expertise to keep things running smoothly. It's time to change that.",
  offer:
    'I offer 1-to-1 help to B2B founders and teams who need less stress, more growth, and reliable revenue from their newsletters.',
  copilot:
    "Think of me like your newsletter co-pilot. When things get chaotic at the pointy end, I'm right there to take the pressure off you and your team.",
  formTitle: 'Claim your spot',
  formSub: 'Get on the launch waitlist to lock in early pricing.',
  formCta: 'Add me to the waitlist',
  formNote: "No commitment. You'll hear from me when a spot opens.",
};

// Success state shown after a waitlist signup (covers + blurs the form).
export const waitlist = {
  successTitle: "You're on the list!",
  successBody:
    "<strong>IMPORTANT</strong>: Please check your inbox/spam/promotion folder now for a 'confirm' message. The email gatekeepers want you to press the <strong>BIG CONFIRM BUTTON</strong> or they won't let me message you again. Thanks!",
};

export const testimonials = [
  {
    quote:
      "Juliet ran my letter for over 18 months. During that time, she doubled the open rates and increased sponsorship revenue by 1,900%. If that doesn't convince you to give this service a try, then nothing will!",
    name: 'Travis Jamison',
    role: 'Investing.io, Smash Digital',
    photo: 'travis',
  },
  {
    quote:
      "Her insights and advice are gold. We've learned more in 2 calls with Juliet than we would have stumbling around on our own for 6 months. Juliet's expertise saved us time and money. I highly recommend reaching out to her if you want results.",
    name: 'Mark Whitman',
    role: 'MAW Holdings',
    photo: 'mark',
  },
  {
    quote:
      'Juliet overdelivered on the report, which really cut to the chase on what we could do to improve our newsletter. This was a combination of small things we had embarrassingly missed, and tactical advice for ongoing improvements. Definitely recommend her service.',
    name: 'Dom Wells',
    role: 'CEO, Onfolio Holdings (Nasdaq: ONFO)',
    photo: 'dom',
  },
] as const;

export const stats = [
  { number: '107%+', label: 'Increase in open rates' },
  { number: '357%+', label: 'Boost in click-through rates' },
  { number: '243%+', label: 'Revenue growth' },
];

export const whatYouGet = {
  intro: 'Two things, done properly. No packages, no upsells, no tiers of "support."',
  items: [
    {
      title: 'One 60-minute call every month',
      desc: "A dedicated strategy session on your newsletter — content, growth, monetization, whatever's pressing that month.",
    },
    {
      title: 'Daily async access',
      desc: 'A private space where you have direct access to me. Reach out via chat, email, or video whenever something comes up.',
    },
  ],
  footnote:
    'You can bring anything to our sessions: strategy questions, content decisions, layout reviews, growth problems, email sequence feedback, signup page critiques, monetization ideas.',
};

export const forYouIf = {
  intro: "Six situations I see over and over again. If any of these sound familiar, let's talk.",
  items: [
    {
      heading: "You're building a list but you're unsure what to write about.",
      question:
        'How do you take your knowledge and expertise and package it so readers are excited to hear (and buy!) from you?',
      answer:
        "I've done this for B2B clients in a variety of niches, but you'll get advice that works for your specific newsletter.",
    },
    {
      heading: 'Your list growth is a rollercoaster.',
      question:
        'What if you could add the right type of subscribers to your newsletter every week?',
      answer:
        "I'll show you exactly how to compound growth by doing 3 easy things I learned the hard way (after trying 50 things that failed).",
    },
    {
      heading: 'You get few replies or clicks.',
      question: "If your readers don't click or write back, the problem isn't always them.",
      answer:
        "I'll tell you what's killing your engagement and what to swap in. It's usually not more content.",
    },
    {
      heading: "Your signup page doesn't convert.",
      question:
        'Visitors land on your signup page and then… leave. A non-converting signup page cancels out all the effort you put into growing your list.',
      answer:
        "I'll review your page and tell you what makes people hesitate. We'll fix that.",
    },
    {
      heading: 'You get zero engagement on your welcome sequences.',
      question:
        "Your welcome sequence is the most-read email you'll ever send, and its power is underestimated.",
      answer:
        "If your new subs go cold fast, you're probably underselling yourself. I'll show you how to get them to say, \"I need to keep reading this.\"",
    },
    {
      heading: "Your offers aren't making money.",
      question:
        "You've built a list and you publish consistently, but leads and sales are slower than a wet week.",
      answer:
        "This is never a list-size problem, but a trust, timing, or framing problem. I've reviewed 100s of B2B newsletters, so I can quickly spot where the disconnect lies.",
    },
  ],
};

export const about = {
  intro: 'A direct line to my B2B newsletter experience.',
  paragraphs: [
    "Hi, I'm Juliet.",
    'Few B2B businesses have the luxury of a dedicated expert on hand to help run their newsletter.',
    "I designed this advisory to fill the gap. The reason no other consultant or agency wants to offer this type of service is because it's tailored, personal, and it won't scale. I'm okay with that!",
  ],
  paymentHeading: "When you work with me, you're not paying for information.",
  paymentIntro: "90% of that is already in blogs, YouTube videos, and courses. You're paying for:",
  benefits: [
    { title: 'Faster growth', desc: 'I help you avoid months of mistakes and frustration.' },
    {
      title: 'Confidence',
      desc: "You'll know exactly what to do next. No more confusing advice or second-guessing your decisions.",
    },
    {
      title: 'Expertise',
      desc: "I've worked on dozens of B2B newsletters. I know what works, what's tired, and how your letter compares to your competitors'.",
    },
  ],
  outro: "I'm keeping this small on purpose because I want you to feel like you have a genuine co-pilot at your side. If this is what you're looking for, I'd love to work together.",
  cta: 'Now, go smash that waitlist button!',
  name: 'Juliet Lyall',
  photoRole: 'Your Newsletter Co‑Pilot',
  linkedIn: 'https://www.linkedin.com/in/julietlyall/',
};

export const pricing = {
  intro: 'One flat annual fee covers everything — calls, async support, strategy, growth, monetization advice, the lot.',
  eyebrow: 'The Fast Lane',
  price: '$500',
  period: '/ month',
  billed: 'Billed annually at $6,000 · payment plans available (3-month minimum)',
  ctaLabel: 'Claim your spot',
  scarcity: 'Only 15 founders. It will never be cheaper than this.',
  includedHeading: 'Everything included:',
  features: [
    'One 60-minute strategy call every month',
    'Daily async access — chat, email, or video',
    'Content, growth and monetization advice',
    'Layout, signup page and sequence reviews',
    "Juliet's full attention — no juniors, no handoffs",
  ],
};

export const finalCta = {
  h2Prefix: 'What are you',
  h2Accent: 'waiting for?',
  body: "Drop your name on the form to claim your spot. No commitment. Waitlist only — you'll hear from me when a spot opens.",
  buttonLabel: 'Add me to the waitlist',
  note: "No spam. I'll only reach out when there's space.",
};

export const footer = {
  copyright: '© Juliet Lyall — Your Newsletter Co-Pilot. All rights reserved.',
  linkedInLabel: 'LinkedIn',
  linkedIn: 'https://www.linkedin.com/in/julietlyall/',
};

// Section headings (H2s). Kept here so no prose is hardcoded in components.
export const sections = {
  testimonials: {
    h2Prefix: 'What clients',
    h2Accent: 'say',
    lead: 'Real founders, real newsletters, real results from working together — one-to-one.',
  },
  coPilot: {
    h2Prefix: 'Your newsletter co-pilot:',
    h2Accent: 'expert help when you need it',
    lead: "I've spent the past 7+ years writing, growing, and monetizing newsletters that have sold for 6 and 7 figures. Well-known names across investing, finance, tech, SEO, SaaS, and marketing trusted me to help build and publish newsletters that achieved results like these:",
  },
  whatYouGet: { h2Prefix: 'What', h2Accent: 'you get' },
  forYouIf: { h2Prefix: 'This is', h2Accent: 'for you', h2Suffix: ' if…' },
  about: { h2Prefix: 'Who am', h2Accent: 'I?' },
  pricing: { h2Prefix: "What's", h2Accent: 'my investment?' },
};
