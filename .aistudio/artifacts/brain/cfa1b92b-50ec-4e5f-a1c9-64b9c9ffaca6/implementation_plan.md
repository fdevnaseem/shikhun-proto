# Content Modernization & Anti-Slop Text Refactoring

A comprehensive sweep across the entire platform to remove AI buzzwords, hyperbolic marketing claims, and robotic phrasing, replacing them with student-friendly, natural conversational Bangla, standard English technical terminology (e.g., React, Full-Stack, Figma), and concrete outcome-oriented copy.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were confirmed by the user in Phase 1 and govern all text revisions across the platform:

- **Tone & Voice**: Casual, modern conversational Bangla tailored for students and young tech professionals (e.g., friendly, approachable, grounded).
- **Technical Terminology**: Retain industry-standard English spelling in Latin script (e.g., `React`, `Node.js`, `Full-Stack`, `Figma`, `API`, `Git`, `UI/UX`, `REST APIs`) rather than awkward phonetic Bengali transliterations.
- **Headlines & Value Propositions**: Outcome-focused copy centered on real project building, portfolio work, and practical tech skills.
- **Anti-Slop Cleanliness**: Eradicate all redundant AI buzzwords (e.g., "বিশ্বমঞ্চে অনন্য", "অতুলনীয় প্ল্যাটফর্ম", "কৃত্রিম বুদ্ধিমত্তা চালিত", "গেম-চেঞ্জিং বৈপ্লবিক সমাধান") and replace them with direct, honest descriptions of what students will actually code and build.

---

### 1. Overview & Core Concept

- **What It Does**: Refactors all visible UI text, headlines, descriptions, callouts, course details, chapter summaries, quiz explanations, community discussions, and footer notes across the entire application into authentic, conversational Bangla with clean English tech terms.
- **Target Audience / Persona**: Bangladeshi students, self-taught developers, and career switchers looking for straightforward, practical coding and design education without fluffy marketing promises.
- **Key Value**: Clear, actionable learning expectations; zero confusion from forced Bengali tech jargon; authentic community tone that encourages active participation.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  - **Landing & Discovery**: Students read grounded, direct value props (e.g., "প্রজেক্ট বানিয়ে React ও Node.js শিখুন" instead of inflated corporate claims).
  - **Course Exploration & Syllabus**: Clear topic titles, realistic project outcomes, and concise lecture overviews.
  - **Interactive Learning & Quizzes**: Natural quiz questions, direct explanations explaining *why* an answer is correct, and encouraging milestone messages.
  - **Community Discussion**: Compact, natural forum threads where learners ask questions without stiff bureaucratic phrasing.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Clean, distraction-free modern educational interface.
  - *Color Palette & Mood*: Dominant clean neutral canvas (slate-50 / white), crisp border hairlines (slate-200), intentional indigo accent for primary actions.
  - *Typography & Hierarchy*: Sans-serif display paired with high-legibility Bengali typography; English technical terms styled cleanly inline without font mismatch.
  - *Component Styling & Layout*: Maintain the existing balanced alternating layout (left/right corridors) so the 3D mascot continues to glide smoothly through open space without obstructing text.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Natural English Tech Loanwords in Latin Script**
  - *Chosen Approach*: Write `React`, `Node.js`, `REST API`, `Figma`, `State Management` in Latin script inline with Bangla sentences.
  - *Why*: Developers and design students naturally search for and talk about "React" and "Figma", not "রিঅ্যাক্ট" or "ফিগুমা". This reflects real industry practice.
  - *Alternatives Considered*: Pure Bengali phonetic transliteration (creates visual clutter and feels artificial to students).

- **Decision 2: Outcome-Driven Hero & Section Headlines**
  - *Chosen Approach*: Replace generic superlatives ("বিশ্বমানের অতুলনীয় প্ল্যাটফর্ম") with concrete actions and deliverables ("বাস্তব প্রজেক্ট বানিয়ে ফুলস্ট্যাক ও ডিজাইন শিখুন").
  - *Why*: Builds immediate credibility with learners who want to know what they can build and achieve.
  - *Alternatives Considered*: Minimalist one-word headlines (fails to convey course depth).

- **Decision 3: Conversational Community & Forum Tone**
  - *Chosen Approach*: Warm, peer-to-peer student tone in the community board ("কোডে এরর আসছে? এখানে প্রশ্ন করুন, একসাথে সমাধান বের করি").
  - *Why*: Lowers the barrier to entry for beginners hesitant to ask questions.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            SHIKHUN PLATFORM                                 │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        ▼                              ▼                              ▼
┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│  MarketingHome.tsx   │   │   CommunityBoard     │   │   ClassroomPlayer    │
│  - Hero copy         │   │   - Forum guidelines │   │   - Lesson notes     │
│  - Feature cards     │   │   - Thread titles    │   │   - Quiz feedback    │
│  - 3-step roadmap    │   │   - Filter labels    │   │   - Completion modal │
│  - Career tracks     │   │   - Facebook replies │   │   - Handout text     │
└──────────────────────┘   └──────────────────────┘   └──────────────────────┘
        │                              │                              │
        └──────────────────────────────┼──────────────────────────────┘
                                       ▼
                     ┌──────────────────────────────────┐
                     │         coursesData.ts           │
                     │  - Initial course titles         │
                     │  - Subtitles & chapter outlines  │
                     │  - Realistic quiz questions      │
                     │  - Natural student discussions   │
                     └──────────────────────────────────┘
```

#### Content Transformation Plan:

1. **`MarketingHome.tsx`**:
   - Hero Badge: Replace "বাঙালি শিক্ষার্থীদের আন্তর্জাতিক ক্যারিয়ার গড়ার অনন্য প্ল্যাটফর্ম" with "হাতে-কলমে ওয়েব ডেভেলপমেন্ট ও প্রজেক্ট বিল্ডিং".
   - Hero Heading: Replace "মাতৃভাষায় স্কিল শিখুন, বিশ্বমঞ্চে গড়ে তুলুন আপনার ক্যারিয়ার" with "সহজ বাংলায় কোডিং ও ডিজাইন শিখুন, তৈরি করুন নিজস্ব পোর্টফোলিও".
   - Hero Subtitle: Crisp description focusing on building real web apps, mastering Figma, and freelancing.
   - About Cards & Methodology: Remove buzzwords like "গেইমিফাইড দৈনিক কুইজ", replace with clear, student-friendly terms ("প্র্যাকটিস কুইজ ও পয়েন্ট", "ভিডিও ও প্রজেক্ট ফাইল", "অ্যাসাইনমেন্ট ফিডব্যাক").
   - Testimonial Quotes: Tighten wording to make stories punchy, realistic, and authentic.
   - Career Tracks: Clean, standard English stack tags (`React`, `Node.js`, `Express`, `PostgreSQL`, `Figma Auto-Layout 5.0`).

2. **`coursesData.ts`**:
   - Course Titles: "Full-Stack Web Development with React & Node.js", "UI/UX Design with Figma Pro", "Freelancing on Upwork & Fiverr".
   - Subtitles: Conversational descriptions of projects (e.g. "ই-কমার্স সাইট তৈরি, REST API ইন্টিগ্রেশন এবং ডেটাবেজ সেটআপ").
   - Lesson Summaries: Clear, technical overviews of each lecture without fluff.
   - Quiz Questions: Clear, accurate technical multiple-choice tests with direct explanations.
   - Community Threads: Realistic questions like "React useEffect এ dependency array নিয়ে একটু সমস্যা হচ্ছে", "Upwork এ প্রথম কভার লেটার লেখার সময় পোর্টফোলিও লিঙ্ক কোথায় দেব?".

3. **`CommunityBoard.tsx` & `ClassroomPlayer.tsx`**:
   - Header titles, action buttons, search placeholders, filter dropdowns, and status badges will be revised to match the conversational student tone.
