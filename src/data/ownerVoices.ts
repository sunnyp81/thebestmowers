// Owner sentiment aggregated from real, named UK sources (owner reviews, forums,
// expert testers). Statements are representative of recurring owner feedback and are
// attributed to the platform they were drawn from. NOT first-party testing.
// Keyed by a model slug used on the flagship and review pages.

export type Voice = { text: string; kind: 'praise' | 'gripe'; source: string };
export type OwnerVoice = {
  model: string;
  consensus: string;
  voices: Voice[];
  sources: string[];
};

export const OWNER_VOICES: Record<string, OwnerVoice> = {
  'ego-lm2122e-sp': {
    model: 'EGO Power+ LM2122E-SP',
    consensus: 'Owners rate it the closest cordless to petrol: the wide 52 cm deck and 56 V motor power through long grass, with a charge lasting close to the claimed runtime. The recurring gripe is ergonomics, not cutting.',
    voices: [
      { text: 'Ploughs into overgrown grass without slowing; the motor ramps up power to cope rather than stalling.', kind: 'praise', source: 'Trusted Reviews' },
      { text: 'Big wheels make straight lines and stripes easy, and one charge gives close to 50 minutes of real mowing.', kind: 'praise', source: 'Trusted Reviews' },
      { text: 'The grass bag sticks out so you can kick it on every step at higher drive speeds, and there is no bag-full indicator.', kind: 'gripe', source: 'Trusted Reviews' },
      { text: 'The variable drive-speed controller is finicky to set to a comfortable pace.', kind: 'gripe', source: 'Lawn Care Forum' },
    ],
    sources: ['Trusted Reviews', 'Lawn Care Forum', 'Amazon UK owner reviews'],
  },
  'gtech-clm50': {
    model: 'Gtech CLM 2.0',
    consensus: 'Owners love the 50 L box and how simple it is to live with, but two complaints recur: it can cut out on the lowest height settings, and real runtime falls well short of the claim on long or damp grass.',
    voices: [
      { text: 'The 50 L grass box is far bigger than most cordless rivals, so far less stopping to empty it.', kind: 'praise', source: 'EasyLawnMowing' },
      { text: 'Hard to fault for the price; build quality and reliability hold up well.', kind: 'praise', source: 'Ideal Home' },
      { text: 'It keeps cutting out on the lowest cutting height when the ground is uneven and the blade catches.', kind: 'gripe', source: 'Owner reviews, EasyLawnMowing' },
      { text: 'Real runtime is closer to 20 minutes than the headline figure once the grass is long or wet.', kind: 'gripe', source: 'Owner reviews, EasyLawnMowing' },
    ],
    sources: ['EasyLawnMowing', 'Ideal Home', 'Trustpilot'],
  },
  'bosch-easyrotak-36-550-lawnmower': {
    model: 'Bosch UniversalRotak 36-550',
    consensus: 'Owners rate it well overall (around 3.9 / 5 across UK reviews) for its genuinely quiet ProSilence motor and ~50 minute runtime. The common niggles are a fiddly grass box and casing, not the cut.',
    voices: [
      { text: 'The ProSilence motor is noticeably quieter than rivals, and one charge covers a lawn up to about 550 m².', kind: 'praise', source: 'Which?' },
      { text: 'One-touch height adjustment and the LeafCollect blade make it easy to live with day to day.', kind: 'praise', source: 'EasyLawnMowing' },
      { text: 'The grass box can be tricky to empty and the plastic casing is stiff to open.', kind: 'gripe', source: 'Which? owner reviews' },
      { text: 'A single 4.0 Ah battery is more than a small garden needs; it suits medium lawns better.', kind: 'gripe', source: 'Owner reviews' },
    ],
    sources: ['Which?', 'EasyLawnMowing', 'Amazon UK owner reviews'],
  },
  'ryobi-cordless': {
    model: 'Ryobi 18V ONE+ mower',
    consensus: 'Owners praise how light it is and the value of the ONE+ ecosystem, but the single complaint dominates every review: battery life. A second pack quickly goes from nice-to-have to essential.',
    voices: [
      { text: 'Ultra-light, easy to store, and the mulching function works well for a small lawn.', kind: 'praise', source: 'DIY Garden' },
      { text: 'Slots into the 18 V ONE+ system, so the battery runs your other Ryobi tools too.', kind: 'praise', source: 'The Review Guy' },
      { text: 'A genuine 5.0 Ah pack gives roughly 15 to 20 minutes, best kept to lawns under about 150 m².', kind: 'gripe', source: 'The Gadgeteer' },
      { text: 'A spare battery stops being a luxury and becomes a necessity for anything but a small garden.', kind: 'gripe', source: 'DIY Garden' },
    ],
    sources: ['DIY Garden', 'The Gadgeteer', 'The Review Guy'],
  },
  'mountfield-princess-34': {
    model: 'Mountfield Princess 34 Li-48',
    consensus: 'Owners buy it for the rear roller and the classic British stripe, and on that it delivers. The honest caveat from reviewers: being lightweight, the stripes are not as deep or long-lasting as a heavy petrol mower.',
    voices: [
      { text: 'The integrated rear roller leaves neat classic stripes with no extra effort.', kind: 'praise', source: 'Mountfield owner reviews' },
      { text: 'A solid steel deck and proper roller at a fraction of a petrol Princess.', kind: 'praise', source: 'EasyLawnMowing' },
      { text: 'Being lightweight, the stripes it presses in do not last as long as a heavier mower would manage.', kind: 'gripe', source: "Paul's Mower Reviews" },
      { text: 'The 34 cm model ships with a single 2 Ah battery; the 38 cm version adds a second for bigger lawns.', kind: 'gripe', source: 'Owner reviews' },
    ],
    sources: ['EasyLawnMowing', "Paul's Mower Reviews", 'Mountfield owner reviews'],
  },
  'makita-dlm382': {
    model: 'Makita DLM382',
    consensus: 'Owners rate it highly on Amazon for being quiet, light and sturdily built, with the twin-battery setup giving a long cut. The limits are large or steep lawns and long wet grass.',
    voices: [
      { text: 'Quiet, lightweight and cuts even high grass with ease, then drops low for a clean finish.', kind: 'praise', source: 'Amazon UK owner reviews' },
      { text: 'Twin 18 V LXT batteries mean it cuts for ages, and the build is sturdy as you expect from Makita.', kind: 'praise', source: 'eBay owner reviews' },
      { text: 'The 40 L box has a fill-level indicator and pops off easily to empty.', kind: 'praise', source: 'Which?' },
      { text: 'It can struggle on long grass, especially when wet, and is not the one for very large or steep lawns.', kind: 'gripe', source: 'PistonHeads' },
    ],
    sources: ['Amazon UK owner reviews', 'Which?', 'PistonHeads'],
  },
};
