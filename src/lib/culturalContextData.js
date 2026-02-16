// lib/culturalContextData.js

const culturalContexts = [
    // GREETINGS & BASIC INTERACTIONS (Lesson 1)
    {
        scenario_text: "When greeting elders, 'Sat Sri Akal' is respectful and appropriate. For peers, 'Kiddan' or 'Ki haal hai' is more casual and friendly.",
        scenario_type: "greeting",
        formality_level: "varies",
        cultural_domain: "greetings",
        lesson_applicability: [1],
        keywords: ["sat sri akal", "kiddan", "greeting", "respect"],
        example_usage: "Use 'Sat Sri Akal' with parents, 'Kiddan' with cousins your age"
    },
    {
        scenario_text: "In Punjabi culture, asking about someone's family before discussing other matters shows care and respect. 'Tuhada parivar kive hai?' (How is your family?) is a common conversation opener.",
        scenario_type: "greeting",
        formality_level: "formal",
        cultural_domain: "greetings",
        lesson_applicability: [1, 2],
        keywords: ["family inquiry", "greeting", "conversation starter"],
        example_usage: "Before asking your uncle for help, first ask about his family's wellbeing"
    },
    {
        scenario_text: "When answering 'How are you?', Punjabis often deflect to ask about the other person's wellbeing. It's polite to say 'Theek haan, tusi dasao' (I'm fine, how about you?).",
        scenario_type: "greeting",
        formality_level: "informal",
        cultural_domain: "greetings",
        lesson_applicability: [1],
        keywords: ["reciprocal greeting", "politeness", "deflection"],
        example_usage: "Don't just say 'I'm fine' - show interest in the other person's wellbeing"
    },

    // RESPECT & HIERARCHY (Lessons 2-3)
    {
        scenario_text: "When addressing an elder in the family, always use 'tusi' (formal you) instead of 'tu' (informal you). This shows respect and maintains family hierarchy.",
        scenario_type: "respect_hierarchy",
        formality_level: "formal",
        cultural_domain: "family_relationships",
        lesson_applicability: [2, 3],
        keywords: ["respect", "elder", "tusi", "formal address"],
        example_usage: "If speaking to your grandmother, say 'Tusi kive ho?' not 'Tu kive hai?'"
    },
    {
        scenario_text: "In Punjabi families, addressing older siblings requires respectful terms: 'Veerji' for older brother, 'Bhenji' for older sister. Using just names without these suffixes can be considered disrespectful.",
        scenario_type: "family_conversation",
        formality_level: "informal",
        cultural_domain: "family_relationships",
        lesson_applicability: [3, 4],
        keywords: ["siblings", "veerji", "bhenji", "family titles"],
        example_usage: "Don't say 'Raj, help me' - say 'Veerji, help me' if Raj is your older brother"
    },
    {
        scenario_text: "The concept of 'ijjat' (honor/respect) is central to Punjabi culture. Actions that preserve family ijjat are valued, and public disagreement with elders can be seen as damaging family honor.",
        scenario_type: "cultural_value",
        formality_level: "formal",
        cultural_domain: "family_relationships",
        lesson_applicability: [2, 3, 4],
        keywords: ["ijjat", "honor", "respect", "family values"],
        example_usage: "If you disagree with a parent's decision, discuss it privately rather than in front of guests"
    },
    {
        scenario_text: "Using diminutives shows affection: Adding 'a' or 'u' to names makes them endearing. 'Simran' becomes 'Simmu', 'Rajveer' becomes 'Raju'. This is common among family and close friends.",
        scenario_type: "family_conversation",
        formality_level: "informal",
        cultural_domain: "family_relationships",
        lesson_applicability: [2, 3],
        keywords: ["nicknames", "affection", "diminutives", "family names"],
        example_usage: "Your mother might call you 'Puttar' (son/daughter) or use your nickname at home"
    },
    {
        scenario_text: "Younger family members typically serve tea or food to elders first. Saying 'Ji, main leke aunda' (Yes, I'll bring it) shows willingness to serve and respect.",
        scenario_type: "family_conversation",
        formality_level: "formal",
        cultural_domain: "family_relationships",
        lesson_applicability: [3, 6],
        keywords: ["serving", "tea", "respect", "hospitality"],
        example_usage: "When grandmother asks for chai, offer to bring it before she finishes asking"
    },

    // FAMILY RELATIONSHIPS & TITLES (Lessons 3-4)
    {
        scenario_text: "Punjabi has specific terms for maternal vs paternal relatives: 'Nana/Nani' (maternal grandparents) vs 'Dada/Dadi' (paternal grandparents). Using the correct term shows cultural awareness.",
        scenario_type: "family_conversation",
        formality_level: "formal",
        cultural_domain: "family_relationships",
        lesson_applicability: [3],
        keywords: ["grandparents", "nana", "dada", "family terms"],
        example_usage: "Don't call your mother's father 'Dada' - he's 'Nana'"
    },
    {
        scenario_text: "The term 'Chacha/Chachi' refers to father's younger brother and his wife, while 'Taya/Tai' refers to father's older brother and his wife. The distinction by age is important.",
        scenario_type: "family_conversation",
        formality_level: "formal",
        cultural_domain: "family_relationships",
        lesson_applicability: [3, 4],
        keywords: ["uncle", "aunt", "chacha", "taya", "age distinction"],
        example_usage: "Your father's older brother is 'Tayaji', not 'Chachaji'"
    },
    {
        scenario_text: "When introducing family members to outsiders, Punjabis often mention the relationship first: 'Eh meri bhenji hai' (This is my older sister) rather than just the name.",
        scenario_type: "family_conversation",
        formality_level: "informal",
        cultural_domain: "family_relationships",
        lesson_applicability: [2, 3],
        keywords: ["introduction", "family relationship", "context"],
        example_usage: "Say 'This is my Veerji, Raj' not just 'This is Raj'"
    },
    {
        scenario_text: "In joint families, it's common to refer to cousins as 'brother' or 'sister' rather than 'cousin'. This reflects the close-knit family structure.",
        scenario_type: "family_conversation",
        formality_level: "informal",
        cultural_domain: "family_relationships",
        lesson_applicability: [3],
        keywords: ["cousins", "joint family", "siblings", "family closeness"],
        example_usage: "Your cousin might introduce you as 'Mera veer' (my brother) to their friends"
    },

    // FOOD & HOSPITALITY (Lesson 6)
    {
        scenario_text: "At Punjabi family meals, elders eat first or are served first. It's polite to wait until they begin eating before starting yourself.",
        scenario_type: "family_conversation",
        formality_level: "formal",
        cultural_domain: "food_etiquette",
        lesson_applicability: [6],
        keywords: ["meal", "eating", "respect", "family dinner"],
        example_usage: "Wait for your Dadaji to start eating before you begin your meal"
    },
    {
        scenario_text: "When refusing food offered by elders, do it politely: 'Shukriya ji, par main bharpoor haan' (Thank you, but I'm full) rather than a direct 'Nahi' (No).",
        scenario_type: "family_conversation",
        formality_level: "formal",
        cultural_domain: "food_etiquette",
        lesson_applicability: [6],
        keywords: ["refusing", "food", "politeness", "shukriya"],
        example_usage: "Don't just say 'No' - soften it with gratitude and explanation"
    },
    {
        scenario_text: "Punjabi hospitality means always offering food or chai to guests, even if they just stopped by briefly. Refusing the first offer is expected - accept on the second or third offer.",
        scenario_type: "social_etiquette",
        formality_level: "formal",
        cultural_domain: "food_etiquette",
        lesson_applicability: [6],
        keywords: ["hospitality", "chai", "refusing", "social norms"],
        example_usage: "When visiting, refuse chai once, then accept when offered again"
    },
    {
        scenario_text: "Complimenting the food is important in Punjabi culture. Saying 'Bahut swaad si' (It was very delicious) shows appreciation for the host's effort.",
        scenario_type: "family_conversation",
        formality_level: "informal",
        cultural_domain: "food_etiquette",
        lesson_applicability: [6],
        keywords: ["compliment", "food", "appreciation", "swaad"],
        example_usage: "After eating at aunt's house, compliment the specific dishes"
    },
    {
        scenario_text: "When visiting a Punjabi home, it's customary to bring a gift, especially sweets. Saying 'Mithai leke aye haan' (I've brought sweets) is a warm gesture.",
        scenario_type: "social_etiquette",
        formality_level: "formal",
        cultural_domain: "food_etiquette",
        lesson_applicability: [6, 8],
        keywords: ["gift", "mithai", "visiting", "sweets"],
        example_usage: "Don't show up empty-handed to your aunt's house - bring a box of mithai"
    },
    {
        scenario_text: "Saying 'Hor khao' (Eat more) is a common way hosts show love. As a guest, it's polite to take at least a small second helping before firmly declining.",
        scenario_type: "family_conversation",
        formality_level: "informal",
        cultural_domain: "food_etiquette",
        lesson_applicability: [6],
        keywords: ["hospitality", "second helping", "hor khao"],
        example_usage: "When aunt insists 'Hor khao', take a small amount even if you're full"
    },

    // DAILY ROUTINES & HOUSEHOLD (Lesson 5)
    {
        scenario_text: "In traditional households, younger members touch elders' feet in the morning for blessings. This is called 'pair pauna' and shows deep respect.",
        scenario_type: "cultural_practice",
        formality_level: "very_formal",
        cultural_domain: "daily_routines",
        lesson_applicability: [5],
        keywords: ["morning", "blessings", "pair pauna", "respect"],
        example_usage: "In the morning, touch your grandparents' feet and say 'Sat Sri Akal ji'"
    },
    {
        scenario_text: "Before leaving the house, it's respectful to inform elders: 'Main school/kaam ja raha/rahi haan' (I'm going to school/work). Seeking permission shows respect.",
        scenario_type: "family_conversation",
        formality_level: "formal",
        cultural_domain: "daily_routines",
        lesson_applicability: [5],
        keywords: ["leaving house", "permission", "respect", "routine"],
        example_usage: "Don't just leave - tell your parents where you're going"
    },
    {
        scenario_text: "Removing shoes before entering a Punjabi home is mandatory, not optional. This applies to both the main house and especially the kitchen or prayer room.",
        scenario_type: "social_etiquette",
        formality_level: "formal",
        cultural_domain: "daily_routines",
        lesson_applicability: [5, 8],
        keywords: ["shoes", "entering home", "cleanliness", "respect"],
        example_usage: "Always remove your shoes at the door, even if visiting casually"
    },

    // SOCIAL INTERACTIONS & VISITING (Lesson 8)
    {
        scenario_text: "When visiting someone's home unannounced, start with 'Disturb tan nahi kita?' (I hope I'm not disturbing?) to show consideration.",
        scenario_type: "social_etiquette",
        formality_level: "formal",
        cultural_domain: "social_customs",
        lesson_applicability: [8],
        keywords: ["visiting", "unannounced", "politeness", "consideration"],
        example_usage: "Even when visiting close relatives, acknowledge you might be interrupting"
    },
    {
        scenario_text: "Overstaying is considered impolite. Reading social cues about when to leave is important. Saying 'Hun assi chaliye' (Now we should go) is a polite exit.",
        scenario_type: "social_etiquette",
        formality_level: "formal",
        cultural_domain: "social_customs",
        lesson_applicability: [8],
        keywords: ["leaving", "overstaying", "social cues", "hun assi chaliye"],
        example_usage: "After chai and conversation, initiate leaving rather than waiting to be asked to stay longer"
    },
    {
        scenario_text: "When someone visits your home, see them to the door when they leave. This is called 'vidai karna' and shows respect and hospitality.",
        scenario_type: "social_etiquette",
        formality_level: "formal",
        cultural_domain: "social_customs",
        lesson_applicability: [8],
        keywords: ["leaving", "vidai", "seeing off", "hospitality"],
        example_usage: "Don't stay seated when guests leave - walk them to the door"
    },

    // CELEBRATIONS & FESTIVALS (Lesson 10)
    {
        scenario_text: "During Vaisakhi or other celebrations, younger family members touch elders' feet as a sign of respect and receive blessings in return.",
        scenario_type: "cultural_practice",
        formality_level: "very_formal",
        cultural_domain: "celebrations",
        lesson_applicability: [10],
        keywords: ["vaisakhi", "blessings", "respect", "pairi paina"],
        example_usage: "On festival days, touch your grandparents' feet and say 'Pair pauna ji'"
    },
    {
        scenario_text: "During Lohri, it's traditional to throw popcorn, peanuts, and sweets into the bonfire while circling it. This symbolizes thanksgiving for the harvest.",
        scenario_type: "cultural_practice",
        formality_level: "informal",
        cultural_domain: "celebrations",
        lesson_applicability: [10],
        keywords: ["lohri", "bonfire", "harvest", "celebration"],
        example_usage: "At Lohri gatherings, participate in circling the fire and throwing offerings"
    },
    {
        scenario_text: "Giving 'shagun' (auspicious gift of money) to younger family members during celebrations is common. Recipients should accept with both hands and touch elder's feet.",
        scenario_type: "cultural_practice",
        formality_level: "formal",
        cultural_domain: "celebrations",
        lesson_applicability: [10],
        keywords: ["shagun", "money gift", "celebrations", "respect"],
        example_usage: "When receiving shagun from aunt, use both hands and touch her feet"
    },
    {
        scenario_text: "During Gurpurab or other Sikh celebrations, covering your head in the Gurdwara is mandatory. Say 'Sat Sri Akal ji' when greeting community members.",
        scenario_type: "cultural_practice",
        formality_level: "very_formal",
        cultural_domain: "celebrations",
        lesson_applicability: [10],
        keywords: ["gurpurab", "gurdwara", "head covering", "respect"],
        example_usage: "Always bring a head covering when visiting Gurdwara during festivals"
    },

    // LANGUAGE & COMMUNICATION NUANCES
    {
        scenario_text: "Adding 'ji' after someone's name or title shows respect. 'Mata ji' (mother), 'Pita ji' (father), 'Bhenji' (older sister) are common.",
        scenario_type: "respect_hierarchy",
        formality_level: "formal",
        cultural_domain: "family_relationships",
        lesson_applicability: [1, 2, 3],
        keywords: ["ji", "respect", "suffix", "titles"],
        example_usage: "Don't just say 'Mata' - say 'Mata ji' when addressing your mother"
    },
    {
        scenario_text: "Indirect communication is valued. Instead of direct commands, use requests: 'Tusi eh kar sakde ho?' (Could you do this?) is more polite than 'Eh karo' (Do this).",
        scenario_type: "communication_style",
        formality_level: "formal",
        cultural_domain: "family_relationships",
        lesson_applicability: [2, 4],
        keywords: ["indirect", "politeness", "requests", "commands"],
        example_usage: "Ask your brother 'Can you help me?' rather than 'Help me'"
    },
    {
        scenario_text: "Expressing disagreement directly with elders is avoided. Use phrases like 'Haan, par...' (Yes, but...) to soften disagreement while showing respect.",
        scenario_type: "communication_style",
        formality_level: "formal",
        cultural_domain: "family_relationships",
        lesson_applicability: [2, 3, 4],
        keywords: ["disagreement", "softening", "respect", "indirect"],
        example_usage: "If you disagree with grandfather, say 'Haan ji, par shayad...' (Yes, but perhaps...)"
    },
    {
        scenario_text: "Punjabis often use exaggeration for emphasis or affection. 'Main tan mar gaya' (I'm dying) might just mean 'I'm very tired', not literal death.",
        scenario_type: "communication_style",
        formality_level: "informal",
        cultural_domain: "daily_routines",
        lesson_applicability: [5, 6],
        keywords: ["exaggeration", "emphasis", "idioms", "expressions"],
        example_usage: "When mother says 'Main tan thak gayi' (I'm exhausted), it's emphasis not emergency"
    },

    // EMOTIONAL EXPRESSION & AFFECTION
    {
        scenario_text: "Physical affection like hugging or kissing is not common in traditional Punjabi families, especially between genders. Verbal affection through nicknames is more typical.",
        scenario_type: "cultural_value",
        formality_level: "formal",
        cultural_domain: "family_relationships",
        lesson_applicability: [3],
        keywords: ["affection", "physical contact", "cultural norms"],
        example_usage: "Don't expect hugs from grandparents - they show love through cooking and nicknames"
    },
    {
        scenario_text: "Saying 'I love you' directly is rare in traditional families. Love is shown through actions: cooking favorite foods, offering help, showing concern.",
        scenario_type: "cultural_value",
        formality_level: "informal",
        cultural_domain: "family_relationships",
        lesson_applicability: [3, 6],
        keywords: ["love", "affection", "actions", "indirect"],
        example_usage: "Your grandmother making your favorite paratha is her way of saying 'I love you'"
    },
    {
        scenario_text: "Asking repeatedly 'Tusi theek ho?' (Are you okay?) shows deep concern in Punjabi culture. It's not annoying - it's caring.",
        scenario_type: "communication_style",
        formality_level: "informal",
        cultural_domain: "family_relationships",
        lesson_applicability: [1, 2],
        keywords: ["concern", "caring", "repetition", "checking in"],
        example_usage: "When you're sick, expect family to ask about your health multiple times daily"
    },

    // PRACTICAL HOUSEHOLD COMMUNICATION
    {
        scenario_text: "When calling someone from another room, wait for their response before continuing. Just yelling instructions without acknowledgment is rude.",
        scenario_type: "communication_style",
        formality_level: "informal",
        cultural_domain: "daily_routines",
        lesson_applicability: [5],
        keywords: ["calling", "household", "communication", "respect"],
        example_usage: "Say 'Veerji!' then wait for 'Haan?' before asking them to come"
    },
    {
        scenario_text: "Offering to help with household tasks without being asked shows respect. Saying 'Main madad karan?' (Should I help?) is appreciated.",
        scenario_type: "family_conversation",
        formality_level: "informal",
        cultural_domain: "daily_routines",
        lesson_applicability: [5],
        keywords: ["help", "household", "volunteering", "respect"],
        example_usage: "When mother is cooking, offer help rather than waiting to be asked"
    },

    // PHONE & MODERN COMMUNICATION
    {
        scenario_text: "When answering calls from elders, always start with 'Sat Sri Akal ji' or 'Hello ji', never just 'Hello' or 'Yeah'.",
        scenario_type: "communication_style",
        formality_level: "formal",
        cultural_domain: "social_customs",
        lesson_applicability: [1, 8],
        keywords: ["phone", "greeting", "respect", "technology"],
        example_usage: "When grandmother calls, answer 'Sat Sri Akal Dadi ji' not just 'Hi'"
    },
    {
        scenario_text: "Video calling elders should be done at their convenience, not yours. Ask 'Main call kar sakda/sakdi?' (Can I call?) via text first.",
        scenario_type: "social_etiquette",
        formality_level: "formal",
        cultural_domain: "social_customs",
        lesson_applicability: [8],
        keywords: ["video call", "technology", "respect", "timing"],
        example_usage: "Don't video call grandparents unexpectedly - message first to check timing"
    },

    // MONEY & GIFTS
    {
        scenario_text: "When receiving money or gifts from elders, never count it in front of them. Accept graciously and express thanks.",
        scenario_type: "social_etiquette",
        formality_level: "formal",
        cultural_domain: "social_customs",
        lesson_applicability: [8, 10],
        keywords: ["money", "gifts", "etiquette", "gratitude"],
        example_usage: "When uncle gives you money, say thank you and put it away without counting"
    },
    {
        scenario_text: "If you borrowed money from family, returning it promptly is important for maintaining ijjat. Don't wait to be reminded.",
        scenario_type: "social_etiquette",
        formality_level: "formal",
        cultural_domain: "social_customs",
        lesson_applicability: [8],
        keywords: ["money", "borrowing", "ijjat", "responsibility"],
        example_usage: "If you borrowed from chacha, return it before he needs to ask"
    },

    // ADDITIONAL FAMILY DYNAMICS
    {
        scenario_text: "In joint families, privacy is limited. Closed doors are unusual - family members often enter without knocking.",
        scenario_type: "cultural_value",
        formality_level: "informal",
        cultural_domain: "family_relationships",
        lesson_applicability: [5],
        keywords: ["privacy", "joint family", "cultural norms", "space"],
        example_usage: "Don't be surprised if aunt enters your room without knocking - it's normal in joint families"
    },
    {
        scenario_text: "Decision-making often involves the whole family, not just parents. Major decisions may require approval from grandparents or uncles.",
        scenario_type: "cultural_value",
        formality_level: "formal",
        cultural_domain: "family_relationships",
        lesson_applicability: [3, 4],
        keywords: ["decisions", "family input", "collective", "hierarchy"],
        example_usage: "Career or marriage decisions often involve extended family discussions"
    },

    // RELIGIOUS & SPIRITUAL PRACTICES
    {
        scenario_text: "Many Punjabi families pray together in the morning or evening. Joining even briefly shows respect, even if you're not religious.",
        scenario_type: "cultural_practice",
        formality_level: "formal",
        cultural_domain: "daily_routines",
        lesson_applicability: [5, 10],
        keywords: ["prayer", "religion", "family", "respect"],
        example_usage: "When visiting grandparents, sit quietly during evening prayer time"
    },
    {
        scenario_text: "Saying 'Waheguru' or 'Rab rakha' (God bless) when someone sneezes or leaves is common. It shows care and invokes blessings.",
        scenario_type: "communication_style",
        formality_level: "informal",
        cultural_domain: "social_customs",
        lesson_applicability: [1, 8],
        keywords: ["blessings", "waheguru", "rab rakha", "care"],
        example_usage: "When sibling leaves for work, say 'Rab rakha' (God protect you)"
    },

    // GENDER-SPECIFIC NORMS (Important for diaspora to understand)
    {
        scenario_text: "In traditional families, younger daughters-in-law often serve food to the family before eating themselves. This is changing but still common.",
        scenario_type: "cultural_value",
        formality_level: "formal",
        cultural_domain: "food_etiquette",
        lesson_applicability: [6],
        keywords: ["gender roles", "serving", "tradition", "family"],
        example_usage: "If you're a new bride, expect to serve elders during meals initially"
    },
    {
        scenario_text: "Physical contact between opposite genders, even family members, is minimal in traditional settings. Handshakes with elders of opposite gender may be avoided.",
        scenario_type: "cultural_value",
        formality_level: "formal",
        cultural_domain: "social_customs",
        lesson_applicability: [8],
        keywords: ["gender", "physical contact", "tradition", "boundaries"],
        example_usage: "Some elderly relatives may prefer not to shake hands with opposite gender"
    }
];

export default culturalContexts;

