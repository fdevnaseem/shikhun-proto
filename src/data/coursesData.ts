import { Course, CommunityThread, LeaderboardEntry } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'web-dev-fullstack',
    titleBn: 'Full-Stack Web Development with React ও Node.js',
    subtitleBn: 'জিরো থেকে শুরু করে JavaScript, React, Node.js আর Database দিয়ে সরাসরি প্রোডাকশন-রেডি ওয়েব অ্যাপ বানাতে শিখুন।',
    category: 'web-dev',
    categoryLabelBn: 'Web Development',
    instructor: 'মাহমুদুল হাসান',
    instructorRole: 'Lead Software Engineer, Dhaka',
    enrolledCount: 1420,
    rating: 4.9,
    levelBn: 'বিগিনার থেকে প্রো',
    totalHours: '৩৬ ঘণ্টা',
    colorScheme: 'indigo',
    featured: true,
    chapters: [
      {
        id: 'wd-ch-1',
        titleBn: 'অধ্যায় ১: Web Foundation ও আধুনিক JavaScript',
        lessons: [
          {
            id: 'wd-l-101',
            titleBn: '১.১ Modern Web Architecture ও Client-Server মডেল',
            duration: '১৪ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/SccSCuHhOw0',
            summaryBn: 'DNS কীভাবে কাজ করে, ব্রাউজার আর সার্ভারের মধ্যে ডেটা আদান-প্রদান এবং ব্যাকএন্ড প্রসেসিংয়ের প্র্যাক্টিক্যাল ধারণা।',
            pdfResourceUrl: '#download-pdf-architecture',
            pdfTitle: 'Web_Architecture_Foundations_BN.pdf',
          },
          {
            id: 'wd-l-102',
            titleBn: '১.২ ES6+ Syntax, Arrow Functions ও Destructuring',
            duration: '২২ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/NCwa_xi0Uuc',
            summaryBn: 'Modern JavaScript-এর প্রয়োজনীয় ফিচার: const, let, spread operator এবং object destructuring দিয়ে পরিষ্কার কোড লেখার নিয়ম।',
            pdfResourceUrl: '#download-pdf-es6',
            pdfTitle: 'Modern_ES6_Cheatsheet_Shikhun.pdf',
            quiz: {
              id: 'quiz-wd-1',
              titleBn: 'Modern JavaScript কুইজ',
              passPercentage: 70,
              xpReward: 150,
              questions: [
                {
                  id: 'q-wd-1',
                  questionBn: 'JavaScript-এ const দিয়ে ডিক্লেয়ার করা variable-এর ক্ষেত্রে কোনটি সঠিক?',
                  optionsBn: [
                    'variable-টি পুনরায় re-assign করা যাবে না',
                    'variable-টি সবসময় global scope-এ থাকবে',
                    'variable-এর মান কখনো মেমরিতে সেভ হয় না',
                    'এটি শুধুমাত্র loop-এর ভেতরে ব্যবহার করা যায়'
                  ],
                  correctIndex: 0,
                  explanationBn: 'const দিয়ে ডিক্লেয়ার করা variable-এর রেফারেন্স ফিক্সড থাকে, তাই একে নতুন মান দিয়ে re-assign করা যায় না।'
                },
                {
                  id: 'q-wd-2',
                  questionBn: 'Array বা Object থেকে ভ্যালু সহজে আলাদা করার আধুনিক syntax কোনটি?',
                  optionsBn: [
                    'Array Concatenation',
                    'Destructuring Assignment',
                    'Event Bubbling',
                    'Currying Function'
                  ],
                  correctIndex: 1,
                  explanationBn: 'Destructuring Assignment দিয়ে এক লাইনেই Array বা Object থেকে প্রোপার্টিগুলো আলাদা variable-এ নেওয়া যায়।'
                },
                {
                  id: 'q-wd-3',
                  questionBn: 'JavaScript-এ Promise-এর ৩টি প্রধান state কী কী?',
                  optionsBn: [
                    'Pending, Fulfilled, Rejected',
                    'Start, Running, End',
                    'True, False, Null',
                    'Open, Wait, Closed'
                  ],
                  correctIndex: 0,
                  explanationBn: 'Promise-এর তিনটি স্টেট: Pending (কাজ চলছে), Fulfilled (সফল) এবং Rejected (ব্যর্থ বা এরর)।'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'wd-ch-2',
        titleBn: 'অধ্যায় ২: React Components ও State Management',
        lessons: [
          {
            id: 'wd-l-201',
            titleBn: '২.১ Functional Components ও JSX ধারণা',
            duration: '১৯ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
            summaryBn: 'React-এর মূল ভিত্তি: রি-ইউজেবল কম্পোনেন্ট তৈরি করা এবং props দিয়ে এক কম্পোনেন্ট থেকে আরেকটিতে ডেটা পাঠানো।',
            pdfResourceUrl: '#download-pdf-react-basics',
            pdfTitle: 'React_Component_Mindmap_BN.pdf',
          },
          {
            id: 'wd-l-202',
            titleBn: '২.২ useState ও useEffect Hook প্র্যাক্টিক্যাল ব্যবহার',
            duration: '২৬ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/O6P86uwfdR0',
            summaryBn: 'কম্পোনেন্টে State হ্যান্ডলিং, API থেকে ডেটা ফেচিং এবং Lifecycle ম্যানেজমেন্টের সহজ গাইড।',
            pdfResourceUrl: '#download-pdf-hooks',
            pdfTitle: 'React_Hooks_DeepDive_Guide.pdf',
            quiz: {
              id: 'quiz-wd-2',
              titleBn: 'React State ও Hooks কুইজ',
              passPercentage: 70,
              xpReward: 200,
              questions: [
                {
                  id: 'q-wd-201',
                  questionBn: 'useEffect-এ dependency array [] ফাঁকা রাখলে কী ঘটবে?',
                  optionsBn: [
                    'Effect-টি প্রতি render-এ চলবে',
                    'Effect-টি কম্পোনেন্ট প্রথমবার mount হলে একবারই চলবে',
                    'ব্রাউজারে সরাসরি error আসবে',
                    'কম্পোনেন্ট আর কখনো re-render হবে না'
                  ],
                  correctIndex: 1,
                  explanationBn: 'ফাঁকা dependency array [] দিলে React কম্পোনেন্ট প্রথমবার রেন্ডার (mount) হওয়ার পর কোডটি কেবল একবারই রান করে।'
                },
                {
                  id: 'q-wd-202',
                  questionBn: 'React-এ state সরাসরি mutate বা পরিবর্তন করা কেন ভুল?',
                  optionsBn: [
                    'কারণ সরাসরি mutate করলে React re-render ট্রিগার করতে পারে না',
                    'কারণ এতে ব্রাউজার ক্র্যাশ করে',
                    'কারণ CSS ফাইল ডিলিট হয়ে যায়',
                    'JavaScript-এ অবজেক্ট পরিবর্তন নিষিদ্ধ'
                  ],
                  correctIndex: 0,
                  explanationBn: 'React স্টেট পরিবর্তনের রেফারেন্স ট্র্যাক করে re-render ট্রিগার করে। সরাসরি mutate করলে React টের পায় না, ফলে UI আপডেট হয় না।'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'uiux-figma-mastery',
    titleBn: 'UI/UX Design ও Figma Mastery',
    subtitleBn: 'User Research, Wireframing, Color Theory এবং Figma Auto Layout দিয়ে বাস্তব প্রজেক্টের ইন্টারফেস ডিজাইন তৈরি করুন।',
    category: 'ui-ux',
    categoryLabelBn: 'UI/UX Design',
    instructor: 'সাবরিনা আক্তার',
    instructorRole: 'Product Designer at FinTech, Singapore',
    enrolledCount: 980,
    rating: 4.8,
    levelBn: 'সব স্তরের শিক্ষার্থীদের জন্য',
    totalHours: '২৮ ঘণ্টা',
    colorScheme: 'rose',
    featured: true,
    chapters: [
      {
        id: 'ui-ch-1',
        titleBn: 'অধ্যায় ১: Design Thinking ও Wireframing',
        lessons: [
          {
            id: 'ui-l-101',
            titleBn: '১.১ User-Centric Design ও Problem Statement',
            duration: '১৭ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
            summaryBn: 'ইউজারের মূল সমস্যা খুঁজে বের করে সমাধানমুখী পরিষ্কার লেআউট দাঁড় করানোর প্র্যাক্টিক্যাল গাইডলাইন।',
            pdfResourceUrl: '#download-pdf-design-thinking',
            pdfTitle: 'Design_Thinking_Workbook_BN.pdf',
          },
          {
            id: 'ui-l-102',
            titleBn: '১.২ Low-Fidelity Wireframe ও Information Architecture',
            duration: '২৪ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/FTFaQWZBqQ8',
            summaryBn: 'কাগজে স্কেচ করা আইডিয়াকে ডিজিটাল ওয়্যারফ্রেমে রূপান্তর এবং কন্টেন্ট বিন্যাসের নিয়মাবলী।',
            pdfResourceUrl: '#download-pdf-wireframe',
            pdfTitle: 'Wireframing_Checklist_Figma.pdf',
            quiz: {
              id: 'quiz-ui-1',
              titleBn: 'Design Thinking ও User Journey কুইজ',
              passPercentage: 66,
              xpReward: 160,
              questions: [
                {
                  id: 'q-ui-101',
                  questionBn: 'Design Thinking প্রসেসের প্রথম ধাপ কোনটি?',
                  optionsBn: [
                    'Prototype তৈরি করা',
                    'ইউজারের সমস্যা ও অনুভূতি বোঝা (Empathize)',
                    'Visual CSS কোডিং',
                    'সরাসরি ফাইনাল ডিজাইন শুরু করা'
                  ],
                  correctIndex: 1,
                  explanationBn: 'Design Thinking শুরু হয় ইউজারের আসল প্রয়োজন এবং পেইন-পয়েন্ট গভীরভাবে বোঝার (Empathize) মাধ্যমে।'
                },
                {
                  id: 'q-ui-102',
                  questionBn: 'Low-fidelity wireframe-এ কালার বা ফ্যান্সি ফন্ট এড়িয়ে চলার প্রধান কারণ কী?',
                  optionsBn: [
                    'যাতে লেআউট ও কন্টেন্ট স্ট্রাকচারের ওপর পূর্ণ মনোযোগ থাকে',
                    'Figma-তে কালার ব্যবহার করা কঠিন তাই',
                    'ক্লায়েন্টরা কালার অপছন্দ করে',
                    'কারণ এতে ফাইল সাইজ ছোট হয়'
                  ],
                  correctIndex: 0,
                  explanationBn: 'শুরুতেই সাজসজ্জায় সময় নষ্ট না করে কন্টেন্ট স্ট্রাকচার ও ইউজার ফ্লো নিখুঁত রাখাই ওয়্যারফ্রেমের মূল উদ্দেশ্য।'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'ui-ch-2',
        titleBn: 'অধ্যায় ২: Figma Auto Layout ও Component Library',
        lessons: [
          {
            id: 'ui-l-201',
            titleBn: '২.১ Auto Layout ও Responsive Constraints',
            duration: '৩১ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/NrKX46DzkGQ',
            summaryBn: 'Padding, gap, flexible resizing এবং nested auto layout দিয়ে রেসপনসিভ কম্পোনেন্ট তৈরির টেকনিক।',
            pdfResourceUrl: '#download-pdf-autolayout',
            pdfTitle: 'Figma_AutoLayout_Bible_BN.pdf',
          }
        ]
      }
    ]
  },
  {
    id: 'freelancing-upwork-mastery',
    titleBn: 'Freelancing Blueprint: Upwork ও Fiverr',
    subtitleBn: 'আন্তর্জাতিক মার্কেটপ্লেসে হাই-কনভার্টিং প্রোফাইল তৈরি, ক্লায়েন্ট কমিউনিকেশন এবং উইনিং প্রপোজাল লেখার প্র্যাক্টিক্যাল গাইড।',
    category: 'freelancing',
    categoryLabelBn: 'Freelancing',
    instructor: 'আরিফুর রহমান',
    instructorRole: 'Top Rated Plus Freelancer, Upwork',
    enrolledCount: 2150,
    rating: 4.9,
    levelBn: 'সব স্তরের পেশাদার',
    totalHours: '২০ ঘণ্টা',
    colorScheme: 'emerald',
    featured: true,
    chapters: [
      {
        id: 'fl-ch-1',
        titleBn: 'অধ্যায় ১: প্রোফাইল সেটআপ ও ক্লায়েন্ট কমিউনিকেশন',
        lessons: [
          {
            id: 'fl-l-101',
            titleBn: '১.১ Upwork 100% কমপ্লিট প্রোফাইল ও Title অপটিমাইজেশন',
            duration: '১৮ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/5p8eE9i_p6M',
            summaryBn: 'ক্লিন বায়ো রাইটিং, প্রাসঙ্গিক পোর্টফোলিও শোকেস এবং সঠিক কি-ওয়ার্ড যাতে ক্লায়েন্ট সহজে খুঁজে পায়।',
            pdfResourceUrl: '#download-pdf-freelance-profile',
            pdfTitle: 'Upwork_Profile_Winning_Formula.pdf',
          },
          {
            id: 'fl-l-102',
            titleBn: '১.২ Winning Proposal Writing ও Client Interview টেকনিক',
            duration: '২৫ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/7V3jF1lC77U',
            summaryBn: 'কপি-পেস্ট কভার লেটার বাদ দিয়ে প্রথম দুই লাইনে ক্লায়েন্টের মূল সমস্যার সরাসরি সমাধান তুলে ধরার উপায়।',
            pdfResourceUrl: '#download-pdf-proposals',
            pdfTitle: '10_Winning_Cover_Letter_Templates.pdf',
            quiz: {
              id: 'quiz-fl-1',
              titleBn: 'Cover Letter ও Client Communication কুইজ',
              passPercentage: 70,
              xpReward: 180,
              questions: [
                {
                  id: 'q-fl-101',
                  questionBn: 'একটি কার্যকর কভার লেটারের প্রথম দুই লাইনে ঠিক কী লেখা উচিত?',
                  optionsBn: [
                    'ক্লায়েন্টের নির্দিষ্ট সমস্যার স্পষ্ট সমাধান প্রস্তাব',
                    'নিজের পুরো জীবনের শিক্ষাগত যোগ্যতার তালিকা',
                    'একটি লম্বা ভূমিকা ও জন্মস্থানের গল্প',
                    'দাম কমানোর জন্য অনুনয়-বিনয়'
                  ],
                  correctIndex: 0,
                  explanationBn: 'ক্লায়েন্ট নোটিফিকেশনে কেবল প্রথম ২ লাইন প্রিভিউ দেখে। তাই শুরুতেই সমাধান নিয়ে কথা বললে রেসপন্স রেট বাড়ে।'
                },
                {
                  id: 'q-fl-102',
                  questionBn: 'ইন্টারভিউ মেসেজে কোন জিনিসটি ক্লায়েন্টকে সবচেয়ে বেশি ভরসা দেয়?',
                  optionsBn: [
                    'কাজের ডেলিভারি টাইমলাইন ও স্টেপ-বাই-স্টেপ স্পষ্ট প্ল্যান তুলে ধরা',
                    'তাড়াহুড়ো করে অগ্রিম পেমেন্ট চেয়ে ফেলা',
                    'মার্কেটপ্লেসের বাইরে কথা বলতে জোর করা',
                    'অবাস্তব প্রতিশ্রুতি দিয়ে ভুল তথ্য দেওয়া'
                  ],
                  correctIndex: 0,
                  explanationBn: 'প্রফেশনাল ফ্রিল্যান্সাররা সবসময় ক্লায়েন্টকে স্পষ্ট ডেডলাইন ও ডেলিভারি প্ল্যান দিয়ে ভরসা যোগান।'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'motion-graphics-editing',
    titleBn: 'Video Editing ও Motion Graphics with Premiere Pro',
    subtitleBn: 'YouTube কনটেন্ট, বিজ্ঞাপন ও সোশ্যাল মিডিয়ার জন্য ট্রেন্ডি ভিডিও এডিটিং, কালার গ্রেডিং ও অ্যানিমেশন ক্রাফট।',
    category: 'graphics',
    categoryLabelBn: 'Video & Motion',
    instructor: 'রাকিব তানজিম',
    instructorRole: 'Visual Director & Animator',
    enrolledCount: 740,
    rating: 4.8,
    levelBn: 'ইন্টারমিডিয়েট',
    totalHours: '২২ ঘণ্টা',
    colorScheme: 'amber',
    chapters: [
      {
        id: 'mg-ch-1',
        titleBn: 'অধ্যায় ১: ভিডিও এডিটিং টাইমলাইন ও কাটিং ক্রাফট',
        lessons: [
          {
            id: 'mg-l-101',
            titleBn: '১.১ Sequence Settings, Proxy Workflow ও B-Roll Sync',
            duration: '২১ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/u73-zM4pWqE',
            summaryBn: 'স্মুথ প্লেব্যাকের জন্য Proxy তৈরি এবং গল্পের ছন্দ বজায় রেখে A-Roll ও B-Roll কাটার নিয়মাবলী।',
            pdfResourceUrl: '#download-pdf-premiere',
            pdfTitle: 'Premiere_Pro_Shortcuts_Map_BN.pdf',
          }
        ]
      }
    ]
  }
];

export const INITIAL_COMMUNITY_THREADS: CommunityThread[] = [
  {
    id: 'thread-1',
    courseId: 'web-dev-fullstack',
    courseTitleBn: 'Full-Stack Web Development with React ও Node.js',
    authorName: 'তানভীর আহমেদ',
    authorRole: 'student',
    createdAt: '২ ঘণ্টা আগে',
    titleBn: 'useEffect-এ object dependency দিলে কি infinite loop হতে পারে?',
    contentBn: 'আমি যখন useEffect-এর dependency-তে একটা local object দিচ্ছি, প্রতি render-এ নতুন মেমরি রেফারেন্স তৈরি হয়ে আবার effect রান করছে। এটা সমাধান করার সঠিক নিয়ম কী? useMemo ব্যবহার করব নাকি specific properties পাস করব?',
    upvotes: 18,
    userUpvoted: false,
    isPinned: true,
    replies: [
      {
        id: 'reply-1',
        authorName: 'মাহমুদুল হাসান',
        authorRole: 'instructor',
        createdAt: '১ ঘণ্টা আগে',
        contentBn: 'দারুণ ও প্রাসঙ্গিক প্রশ্ন তানভীর! JavaScript-এ objects চেক হয় memory reference দিয়ে (===)। সমাধান হিসেবে object-এর নির্দিষ্ট primitive property (যেমন user.id) dependency হিসেবে দিতে পারো, অথবা পুরো অবজেক্ট দরকার হলে useMemo হুক দিয়ে memoize করে নিতে পারো।',
        upvotes: 14
      },
      {
        id: 'reply-2',
        authorName: 'নুসরাত জাহান',
        authorRole: 'student',
        createdAt: '৪৫ মিনিট আগে',
        contentBn: 'থ্যাংকস ভাইয়া! আমিও সেইম সমস্যায় পড়েছিলাম, specific property পাস করতে এখন একদম ঠিক কাজ করছে।',
        upvotes: 4
      }
    ]
  },
  {
    id: 'thread-2',
    courseId: 'freelancing-upwork-mastery',
    courseTitleBn: 'Freelancing Blueprint: Upwork ও Fiverr',
    authorName: 'সাদিয়া ইসলাম',
    authorRole: 'student',
    createdAt: '৫ ঘণ্টা আগে',
    titleBn: 'নতুন একাউন্টে কত connects দিয়ে প্রথম proposal পাঠানো ভালো?',
    contentBn: 'Upwork-এ প্রোফাইল approve হওয়ার পর শুরুতেই connects খরচ করে boost করা ভালো, নাকি সাধারণ ৮ বা ১২ connects-এ বিড করাই যথেষ্ট?',
    upvotes: 12,
    userUpvoted: true,
    replies: [
      {
        id: 'reply-3',
        authorName: 'আরিফুর রহমান',
        authorRole: 'instructor',
        createdAt: '৩ ঘণ্টা আগে',
        contentBn: 'শুরুতেই boosting-এ connects নষ্ট না করে যেসব জবে proposal সংখ্যা ৫-এর কম আর ক্লায়েন্টের পেমেন্ট ভেরিফাইড, সেখানে দ্রুত ও প্রাসঙ্গিক কভার লেটার পাঠাও। শুরুর কাজ পেতে এটাই সবচেয়ে কার্যকর উপায়।',
        upvotes: 19
      }
    ]
  },
  {
    id: 'thread-3',
    courseId: 'uiux-figma-mastery',
    courseTitleBn: 'UI/UX Design ও Figma Mastery',
    authorName: 'তাহমিদ হক',
    authorRole: 'student',
    createdAt: '১ দিন আগে',
    titleBn: 'বাংলা ফন্টের ক্ষেত্রে Figma Auto Layout-এ line height কত রাখা ভালো?',
    contentBn: 'ইংরেজি ফন্টের তুলনায় বাংলা যুক্তবর্ণ বা হ্রস্ব-ই/দীর্ঘ-ঈ কার উপরে-নিচে কেটে যায় যদি line height কম থাকে। আপনারা সচরাচর কত রাখেন?',
    upvotes: 21,
    userUpvoted: false,
    replies: [
      {
        id: 'reply-4',
        authorName: 'সাবরিনা আক্তার',
        authorRole: 'instructor',
        createdAt: '১৮ ঘণ্টা আগে',
        contentBn: 'বাংলা ফন্টের জন্য সবসময় font-size-এর চেয়ে অন্তত ৬০% থেকে ৭০% বেশি line-height (যেমন ১৬px ফন্টের জন্য ২৫-২৬px line-height) রাখা ভালো। Hind Siliguri বা Tiro Bangla-য় এটা ব্যবহার করলে টাইপোগ্রাফি দারুণ দেখায়।',
        upvotes: 17
      }
    ]
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb-1',
    nameBn: 'শাকিল আহমেদ',
    districtBn: 'চট্টগ্রাম',
    xp: 2850,
    streakDays: 14,
    completedQuizzes: 18,
    avatarBg: 'bg-emerald-500'
  },
  {
    id: 'lb-2',
    nameBn: 'তানভীর আহমেদ',
    districtBn: 'ঢাকা (আপনি)',
    xp: 2420,
    streakDays: 8,
    completedQuizzes: 12,
    avatarBg: 'bg-indigo-500',
    isCurrentUser: true
  },
  {
    id: 'lb-3',
    nameBn: 'ফারহানা বিনতে রফিক',
    districtBn: 'সিলেট',
    xp: 2190,
    streakDays: 11,
    completedQuizzes: 14,
    avatarBg: 'bg-rose-500'
  },
  {
    id: 'lb-4',
    nameBn: 'তাহমিদুর রহমান',
    districtBn: 'রাজশাহী',
    xp: 1950,
    streakDays: 6,
    completedQuizzes: 10,
    avatarBg: 'bg-amber-500'
  },
  {
    id: 'lb-5',
    nameBn: 'জান্নাতুল ফেরদৌস',
    districtBn: 'খুলনা',
    xp: 1840,
    streakDays: 9,
    completedQuizzes: 9,
    avatarBg: 'bg-sky-500'
  }
];
