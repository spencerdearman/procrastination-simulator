export const notificationData = [
  {
    header: "Morning Yoga Session",
    description:
      "A friend invited you to a relaxing yoga session at the park. It could help clear your mind and boost your energy for the day ahead.",
    option1: "Join the yoga session",
    option2: "Skip and continue your routine",
    impacts: {
      option1Impact: {
        energy: 10,
        mentalHealth: 15,
        academics: -5,
        socialLife: 5,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: -5,
        academics: 0,
        socialLife: 0,
      },
    },
    narrativeOutcome:
      "You feel refreshed and more focused after the session, ready to take on the day!",
    notificationDuration: 1,
    forced: false,
  },
  {
    header: "Poetry Slam Night",
    description:
      "The local cafe is hosting a poetry slam tonight. You could share your work or just enjoy listening to others express themselves.",
    option1: "Attend the poetry slam",
    option2: "Stay home and write privately",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 10,
        academics: 5,
        socialLife: 15,
      },
      option2Impact: {
        energy: 5,
        mentalHealth: 5,
        academics: 8,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "The creative atmosphere inspires you and you make connections with other writers!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Pottery Workshop",
    description:
      "There's a one-day pottery workshop at the community center. You could learn to make your own clay creations!",
    option1: "Join the workshop",
    option2: "Skip this creative opportunity",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 15,
        academics: 0,
        socialLife: 10,
      },
      option2Impact: {
        energy: 5,
        mentalHealth: -5,
        academics: 5,
        socialLife: 0,
      },
    },
    narrativeOutcome:
      "Working with clay proves therapeutic, and you're proud of the bowl you created!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Campus Art Exhibition",
    description:
      "The art department is showcasing student work. It might spark some creative inspiration!",
    option1: "Explore the exhibition",
    option2: "Focus on your studies instead",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 10,
        academics: 5,
        socialLife: 5,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: -5,
        academics: 10,
        socialLife: 0,
      },
    },
    narrativeOutcome:
      "The diverse artwork broadens your perspective and leaves you feeling inspired!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Dance Workshop",
    description:
      "There's a free dance workshop teaching a new style you've been curious about. It could be a fun way to express yourself!",
    option1: "Try the dance workshop",
    option2: "Maybe another time",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 15,
        academics: -5,
        socialLife: 15,
      },
      option2Impact: {
        energy: 5,
        mentalHealth: -5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Moving to the rhythm feels liberating, and you discover a new favorite hobby!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Creative Writing Circle",
    description:
      "A group of fellow students meets weekly to share their writing and offer feedback. Today might be a good day to join!",
    option1: "Join the writing circle",
    option2: "Write on your own instead",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 10,
        academics: 10,
        socialLife: 15,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: 5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "The constructive feedback helps you improve your writing, and you feel part of a community!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Photography Walk",
    description:
      "A student photography club is hosting a walk around campus to capture interesting shots. No experience needed!",
    option1: "Grab your camera and join",
    option2: "Stay focused on other tasks",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 15,
        academics: 0,
        socialLife: 10,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: -5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "You discover beauty in unexpected places and capture some amazing photos!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Open Mic Night",
    description:
      "The student union is hosting an open mic night. You could perform or just enjoy watching others share their talents.",
    option1: "Attend the open mic",
    option2: "Have a quiet evening instead",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 15,
        academics: -5,
        socialLife: 20,
      },
      option2Impact: {
        energy: 10,
        mentalHealth: 0,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "The supportive atmosphere makes for a memorable night of diverse performances!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Campus Music Jam",
    description:
      "Musicians of all levels are gathering for an impromptu jam session. Bring an instrument or just come listen!",
    option1: "Join the jam session",
    option2: "Pass on this musical gathering",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 15,
        academics: -5,
        socialLife: 15,
      },
      option2Impact: {
        energy: 5,
        mentalHealth: -5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Making music with others creates an instant bond, and the creative energy is contagious!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "DIY Craft Fair",
    description:
      "Local artisans are showcasing their handmade goods at a campus craft fair. You might find inspiration for your own projects!",
    option1: "Explore the craft fair",
    option2: "Skip the fair",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 10,
        academics: 0,
        socialLife: 10,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: -5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "You're amazed by the creativity on display and pick up some tips for your own crafting!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Improv Comedy Workshop",
    description:
      "The theater department is running an improv comedy workshop open to all students. It could be a fun way to boost your confidence!",
    option1: "Try improv comedy",
    option2: "Maybe another time",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 20,
        academics: -5,
        socialLife: 15,
      },
      option2Impact: {
        energy: 5,
        mentalHealth: -5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Stepping outside your comfort zone pays off with laughter and new friendships!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Meditation Session",
    description:
      "The wellness center is offering a guided meditation session focusing on creativity and mental clarity.",
    option1: "Attend the meditation",
    option2: "Skip meditation today",
    impacts: {
      option1Impact: {
        energy: 10,
        mentalHealth: 20,
        academics: 5,
        socialLife: 0,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: -5,
        academics: 0,
        socialLife: 0,
      },
    },
    narrativeOutcome:
      "The meditation clears your mind and helps you approach problems with fresh perspective!",
    notificationDuration: 1,
    forced: false,
  },
  {
    header: "Coding Hackathon",
    description:
      "The computer science department is hosting a mini-hackathon. You could work on a creative project with other coders!",
    option1: "Join the hackathon",
    option2: "Code on your own projects instead",
    impacts: {
      option1Impact: {
        energy: -15,
        mentalHealth: 5,
        academics: 15,
        socialLife: 10,
      },
      option2Impact: {
        energy: -5,
        mentalHealth: 0,
        academics: 10,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Working with a team pushes you to new coding heights, and your project impresses everyone!",
    notificationDuration: 4,
    forced: false,
  },
  {
    header: "Nature Sketching Outing",
    description:
      "A group is heading to the botanical gardens to sketch plants and landscapes. All skill levels welcome!",
    option1: "Go sketching outdoors",
    option2: "Stay indoors today",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 15,
        academics: 5,
        socialLife: 10,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: -5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "The peaceful setting enhances your focus, and your sketches capture the beauty around you!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Film Screening and Discussion",
    description:
      "The film studies department is showing an acclaimed independent film followed by a creative discussion.",
    option1: "Attend the screening",
    option2: "Watch something at home instead",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 10,
        academics: 10,
        socialLife: 10,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: 5,
        academics: 0,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "The film's unique perspective sparks an engaging discussion that broadens your thinking!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Community Garden Project",
    description:
      "The sustainability club needs help with their creative garden designs. No experience needed!",
    option1: "Help with the garden",
    option2: "Skip the gardening",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 15,
        academics: 0,
        socialLife: 10,
      },
      option2Impact: {
        energy: 5,
        mentalHealth: -5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Getting your hands in the soil feels grounding, and the garden transformation is remarkable!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Acapella Group Rehearsal",
    description:
      "A campus acapella group is looking for new voices for their creative arrangements. No formal training required!",
    option1: "Try out singing with the group",
    option2: "Listen to music on your own",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 15,
        academics: -5,
        socialLife: 20,
      },
      option2Impact: {
        energy: 5,
        mentalHealth: 5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Finding your voice within the group harmony creates an amazing sense of belonging!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Interactive Science Exhibit",
    description:
      "The science department created an interactive exhibit that combines art and science. It's a feast for curious minds!",
    option1: "Explore the exhibit",
    option2: "Focus on other activities",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 10,
        academics: 15,
        socialLife: 5,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: -5,
        academics: 5,
        socialLife: 0,
      },
    },
    narrativeOutcome:
      "The creative approach to scientific concepts helps you see connections you'd never noticed before!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Upcycling Workshop",
    description:
      "Turn trash into treasure at this workshop focused on creative reuse of everyday materials.",
    option1: "Join the upcycling workshop",
    option2: "Skip this creative opportunity",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 15,
        academics: 5,
        socialLife: 10,
      },
      option2Impact: {
        energy: 5,
        mentalHealth: -5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Your creative transformation of discarded items gives you a new perspective on consumption!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Campus Radio Show",
    description:
      "The student radio station is looking for guest DJs to create themed music sets. You could share your musical taste!",
    option1: "Be a guest DJ",
    option2: "Listen to the radio instead",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 15,
        academics: -5,
        socialLife: 15,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: 5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Sharing your musical selections with listeners gives you a creative high!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Short Story Competition",
    description:
      "The English department announced a flash fiction contest with submissions due today. Could you craft a story in time?",
    option1: "Write and submit a story",
    option2: "Skip this competition",
    impacts: {
      option1Impact: {
        energy: -15,
        mentalHealth: 10,
        academics: 15,
        socialLife: 0,
      },
      option2Impact: {
        energy: 5,
        mentalHealth: -5,
        academics: 0,
        socialLife: 0,
      },
    },
    narrativeOutcome:
      "The deadline pressure sparks your creativity, and you're proud of the story you created!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Campus Orchestra Practice",
    description:
      "The student orchestra welcomes drop-in musicians for today's practice session. All skill levels welcome!",
    option1: "Join the orchestra practice",
    option2: "Practice music alone instead",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 15,
        academics: -5,
        socialLife: 15,
      },
      option2Impact: {
        energy: -5,
        mentalHealth: 5,
        academics: 0,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Being part of something larger than yourself creates a magical musical experience!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Cooking Class",
    description:
      "The culinary club is hosting a creative cooking class featuring fusion cuisine. No experience required!",
    option1: "Take the cooking class",
    option2: "Cook something simple at home",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 15,
        academics: 0,
        socialLife: 15,
      },
      option2Impact: {
        energy: -5,
        mentalHealth: 5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Experimenting with new flavors awakens your senses, and sharing the meal creates instant bonds!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Digital Art Workshop",
    description:
      "Learn the basics of digital illustration in this hands-on workshop. Bring your own device or use the lab computers.",
    option1: "Attend the digital art workshop",
    option2: "Explore art on your own time",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 10,
        academics: 5,
        socialLife: 10,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: 0,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Mastering the basics of digital tools opens up exciting new creative possibilities!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Storytelling Festival",
    description:
      "A multicultural storytelling festival is happening on campus. Listen to tales from around the world or share your own!",
    option1: "Attend the storytelling festival",
    option2: "Read stories on your own",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 15,
        academics: 10,
        socialLife: 15,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: 5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "The diverse stories transport you to different worlds and connect you to shared human experiences!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Campus Mural Project",
    description:
      "The art department needs volunteers to help with a collaborative mural. All skill levels welcome!",
    option1: "Help with the mural",
    option2: "Admire from afar",
    impacts: {
      option1Impact: {
        energy: -15,
        mentalHealth: 15,
        academics: 0,
        socialLife: 15,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: -5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Adding your contribution to the collective artwork gives you a sense of campus belonging!",
    notificationDuration: 4,
    forced: false,
  },
  {
    header: "Origami Workshop",
    description:
      "Learn the art of paper folding in this relaxing and meditative workshop. Materials provided!",
    option1: "Learn origami techniques",
    option2: "Try a different activity",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 15,
        academics: 5,
        socialLife: 10,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: 0,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "The precise folding requires focused attention that quiets your mind, and you create beautiful pieces!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Creative Writing Prompt Challenge",
    description:
      "The library is hosting a writing sprint with intriguing prompts to spark your imagination.",
    option1: "Accept the writing challenge",
    option2: "Write on your own terms",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 10,
        academics: 15,
        socialLife: 5,
      },
      option2Impact: {
        energy: -5,
        mentalHealth: 5,
        academics: 10,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "The unexpected prompts push your creativity in new directions with surprising results!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Podcast Recording Session",
    description:
      "The media studies department needs volunteer voices for a creative audio project. No experience necessary!",
    option1: "Participate in the podcast",
    option2: "Listen to podcasts instead",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 10,
        academics: 5,
        socialLife: 15,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: 5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Hearing your voice in the final production gives you a confidence boost!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Architecture Walking Tour",
    description:
      "Explore the creative designs of campus buildings with an architecture student guide. Learn about design principles!",
    option1: "Join the architecture tour",
    option2: "Explore campus on your own",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 10,
        academics: 15,
        socialLife: 5,
      },
      option2Impact: {
        energy: -5,
        mentalHealth: 5,
        academics: 0,
        socialLife: 0,
      },
    },
    narrativeOutcome:
      "You'll never see the campus buildings the same way again after learning their design stories!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Experimental Music Jam",
    description:
      "Join musicians exploring non-traditional sounds and instruments. No musical background required!",
    option1: "Join the experimental jam",
    option2: "Listen to conventional music",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 15,
        academics: 0,
        socialLife: 10,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: 5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Breaking musical conventions frees your mind and helps you approach other areas with fresh creativity!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Spoken Word Poetry Night",
    description:
      "Express yourself at this intimate gathering of poets sharing personal and powerful pieces.",
    option1: "Participate in spoken word night",
    option2: "Write poetry privately",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 20,
        academics: 0,
        socialLife: 15,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: 10,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Sharing your truth through poetry creates a powerful connection with the audience!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Collaborative Puzzle Challenge",
    description:
      "The mathematics department set up a room of interconnected puzzles that require creative thinking and teamwork.",
    option1: "Take on the puzzle challenge",
    option2: "Solve puzzles independently",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 15,
        academics: 15,
        socialLife: 15,
      },
      option2Impact: {
        energy: -5,
        mentalHealth: 5,
        academics: 10,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Working together to crack the puzzles leads to breakthrough thinking and new friendships!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "International Dance Workshop",
    description:
      "Learn dance moves from around the world in this high-energy cultural exchange. No experience needed!",
    option1: "Try international dance",
    option2: "Dance to your own rhythm",
    impacts: {
      option1Impact: {
        energy: -15,
        mentalHealth: 15,
        academics: 0,
        socialLife: 20,
      },
      option2Impact: {
        energy: -5,
        mentalHealth: 5,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Moving to global rhythms connects you to different cultures and fellow dance enthusiasts!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Mindfulness Art Therapy",
    description:
      "Combine meditation with creative expression in this session focused on present-moment awareness.",
    option1: "Try mindfulness art therapy",
    option2: "Practice mindfulness alone",
    impacts: {
      option1Impact: {
        energy: 5,
        mentalHealth: 25,
        academics: 0,
        socialLife: 5,
      },
      option2Impact: {
        energy: 10,
        mentalHealth: 15,
        academics: 0,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "The combination of mindfulness and creativity leaves you feeling centered and renewed!",
    notificationDuration: 2,
    forced: false,
  },
  {
    header: "Costume Design Workshop",
    description:
      "The theater department needs help creating costumes for the upcoming production. Learn design and sewing skills!",
    option1: "Help with costume design",
    option2: "Work on personal projects",
    impacts: {
      option1Impact: {
        energy: -15,
        mentalHealth: 10,
        academics: 5,
        socialLife: 15,
      },
      option2Impact: {
        energy: -5,
        mentalHealth: 5,
        academics: 10,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Your creative contributions will be seen on stage, and you gain practical design skills!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Stargazing Night",
    description:
      "The astronomy club is hosting a creative night of constellation storytelling and star observation.",
    option1: "Join the stargazing event",
    option2: "Stay in tonight",
    impacts: {
      option1Impact: {
        energy: -5,
        mentalHealth: 20,
        academics: 10,
        socialLife: 10,
      },
      option2Impact: {
        energy: 5,
        mentalHealth: 0,
        academics: 5,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "Connecting ancient stories to the stars gives you perspective on your place in the universe!",
    notificationDuration: 3,
    forced: false,
  },
  {
    header: "Creative Problem-Solving Workshop",
    description:
      "Learn techniques to approach problems from new angles in this interactive session.",
    option1: "Attend the workshop",
    option2: "Solve problems your way",
    impacts: {
      option1Impact: {
        energy: -10,
        mentalHealth: 10,
        academics: 20,
        socialLife: 5,
      },
      option2Impact: {
        energy: 0,
        mentalHealth: 0,
        academics: 10,
        socialLife: -5,
      },
    },
    narrativeOutcome:
      "The creative thinking techniques prove useful far beyond the workshop itself!",
    notificationDuration: 2,
    forced: false,
  },
];
