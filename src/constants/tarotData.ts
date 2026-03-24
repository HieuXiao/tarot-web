import type { TarotMeaning } from '../types';

export const CARD_MEANINGS: Record<string, TarotMeaning> = {
  "00-TheFool.webp": {
    name: "The Fool",
    upright: "Beginnings, innocence, spontaneity, a free spirit.",
    reversed: "Holding back, recklessness, risk-taking.",
    advice: {
      upright: "Embrace new opportunities with an open mind and heart.",
      reversed: "Pause and consider the risks before acting impulsively.",
    },
  },
  "01-TheMagician.webp": {
    name: "The Magician",
    upright: "Manifestation, resourcefulness, power, inspired action.",
    reversed: "Manipulation, poor planning, untapped talents.",
    advice: {
      upright: "Use your skills and willpower to manifest your goals.",
      reversed: "Focus your energy and avoid manipulation.",
    },
  },
  "02-TheHighPriestess.webp": {
    name: "The High Priestess",
    upright: "Intuition, sacred knowledge, divine feminine.",
    reversed: "Secrets, disconnected from intuition, withdrawal.",
    advice: {
      upright: "Trust your intuition and seek inner wisdom.",
      reversed: "Reconnect with your inner voice and reflect.",
    },
  },
  "03-TheEmpress.webp": {
    name: "The Empress",
    upright: "Femininity, beauty, nature, nurturing, abundance.",
    reversed: "Creative block, dependence on others.",
    advice: {
      upright: "Nurture yourself and others; embrace creativity.",
      reversed: "Find your own strength and creativity.",
    },
  },
  "04-TheEmperor.webp": {
    name: "The Emperor",
    upright: "Authority, structure, control, fatherhood.",
    reversed: "Domination, excessive control, rigidity.",
    advice: {
      upright: "Take control and lead with confidence.",
      reversed: "Be flexible and avoid being overly controlling.",
    },
  },
  "05-TheHierophant.webp": {
    name: "The Hierophant",
    upright: "Tradition, conformity, morality, ethics.",
    reversed: "Rebellion, subversiveness, new approaches.",
    advice: {
      upright: "Seek guidance from tradition or a mentor.",
      reversed: "Consider new perspectives and question tradition.",
    },
  },
  "06-TheLovers.webp": {
    name: "The Lovers",
    upright: "Love, harmony, relationships, values alignment.",
    reversed: "Imbalance, misalignment of values, disharmony.",
    advice: {
      upright: "Make choices aligned with your values.",
      reversed: "Restore balance and communicate openly.",
    },
  },
  "07-TheChariot.webp": {
    name: "The Chariot",
    upright: "Control, willpower, success, determination.",
    reversed: "Lack of control, aggression, self-doubt.",
    advice: {
      upright: "Stay focused and drive forward with confidence.",
      reversed: "Regain control and avoid rash actions.",
    },
  },
  "08-Strength.webp": {
    name: "Strength",
    upright: "Courage, persuasion, influence, compassion.",
    reversed: "Self-doubt, weakness, insecurity.",
    advice: {
      upright: "Face challenges with compassion and resolve.",
      reversed: "Believe in yourself and your abilities.",
    },
  },
  "09-TheHermit.webp": {
    name: "The Hermit",
    upright: "Soul-searching, introspection, being alone.",
    reversed: "Isolation, loneliness, withdrawal.",
    advice: {
      upright: "Take time for introspection and seek inner truth.",
      reversed: "Reconnect with others and share your wisdom.",
    },
  },
  "10-WheelOfFortune.webp": {
    name: "Wheel of Fortune",
    upright: "Good luck, karma, life cycles, destiny.",
    reversed: "Bad luck, resistance to change, breaking cycles.",
    advice: {
      upright: "Embrace change and trust the cycles of life.",
      reversed: "Let go of resistance and accept change.",
    },
  },
  "11-Justice.webp": {
    name: "Justice",
    upright: "Justice, fairness, truth, law.",
    reversed: "Unfairness, lack of accountability, dishonesty.",
    advice: {
      upright: "Act with integrity and seek balance.",
      reversed: "Take responsibility and correct injustices.",
    },
  },
  "12-TheHangedMan.webp": {
    name: "The Hanged Man",
    upright: "Pause, surrender, letting go, new perspectives.",
    reversed: "Delays, resistance, stalling.",
    advice: {
      upright: "Let go and see things from a different angle.",
      reversed: "Release resistance and allow change.",
    },
  },
  "13-Death.webp": {
    name: "Death",
    upright: "Endings, change, transformation, transition.",
    reversed: "Resistance to change, personal transformation.",
    advice: {
      upright: "Release the old to make way for the new.",
      reversed: "Embrace transformation and let go of fear.",
    },
  },
  "14-Temperance.webp": {
    name: "Temperance",
    upright: "Balance, moderation, patience, purpose.",
    reversed: "Imbalance, excess, lack of long-term vision.",
    advice: {
      upright: "Practice moderation and find your center.",
      reversed: "Restore balance and avoid extremes.",
    },
  },
  "15-TheDevil.webp": {
    name: "The Devil",
    upright: "Shadow self, attachment, addiction, restriction.",
    reversed: "Releasing limiting beliefs, detachment.",
    advice: {
      upright: "Acknowledge unhealthy patterns and break free.",
      reversed: "Let go of what holds you back.",
    },
  },
  "16-TheTower.webp": {
    name: "The Tower",
    upright: "Sudden change, upheaval, chaos, revelation.",
    reversed: "Fear of change, averting disaster.",
    advice: {
      upright: "Accept necessary change and rebuild stronger.",
      reversed: "Face change with courage and adaptability.",
    },
  },
  "17-TheStar.webp": {
    name: "The Star",
    upright: "Hope, faith, purpose, renewal, spirituality.",
    reversed: "Lack of faith, despair, discouragement.",
    advice: {
      upright: "Stay optimistic and trust in the future.",
      reversed: "Renew your hope and seek inspiration.",
    },
  },
  "18-TheMoon.webp": {
    name: "The Moon",
    upright: "Illusion, fear, anxiety, intuition.",
    reversed: "Confusion, misinterpretation, clarity.",
    advice: {
      upright: "Trust your instincts and move through uncertainty.",
      reversed: "Seek clarity and dispel illusions.",
    },
  },
  "19-TheSun.webp": {
    name: "The Sun",
    upright: "Positivity, fun, warmth, success, vitality.",
    reversed: "Inner child, feeling down, overly optimistic.",
    advice: {
      upright: "Celebrate your achievements and share your light.",
      reversed: "Reconnect with joy and optimism.",
    },
  },
  "20-Judgement.webp": {
    name: "Judgement",
    upright: "Judgement, rebirth, inner calling, absolution.",
    reversed: "Self-doubt, refusal of self-examination.",
    advice: {
      upright: "Reflect, forgive, and embrace renewal.",
      reversed: "Release self-judgment and accept growth.",
    },
  },
  "21-TheWorld.webp": {
    name: "The World",
    upright: "Completion, accomplishment, travel, integration.",
    reversed: "Short cuts, delays, lack of closure.",
    advice: {
      upright: "Celebrate your achievements and embrace new cycles.",
      reversed: "Tie up loose ends before moving forward.",
    },
  },

  // Cups
  "Cups01.webp": {
    name: "Ace of Cups",
    upright: "New feelings, spirituality, intuition, love.",
    reversed: "Emotional loss, blocked creativity, emptiness.",
    advice: {
      upright: "Open your heart to new emotional experiences.",
      reversed: "Address emotional blockages before moving on.",
    },
  },
  "Cups02.webp": {
    name: "Two of Cups",
    upright: "Partnership, unity, love, connection.",
    reversed: "Imbalance, broken communication, tension.",
    advice: {
      upright: "Cherish your relationships and seek harmony.",
      reversed: "Work on communication and restore balance.",
    },
  },
  "Cups03.webp": {
    name: "Three of Cups",
    upright: "Celebration, friendship, creativity, community.",
    reversed: "Independence, alone time, gossip.",
    advice: {
      upright: "Celebrate with friends and share your joy.",
      reversed: "Value your independence and avoid drama.",
    },
  },
  "Cups04.webp": {
    name: "Four of Cups",
    upright: "Apathy, contemplation, reevaluation.",
    reversed: "Retreat, withdrawal, checking in for alignment.",
    advice: {
      upright: "Look for opportunities you may be missing.",
      reversed: "Take time to reflect and realign.",
    },
  },
  "Cups05.webp": {
    name: "Five of Cups",
    upright: "Loss, regret, disappointment, grief.",
    reversed: "Personal setbacks, moving on, acceptance.",
    advice: {
      upright: "Accept your feelings and focus on what remains.",
      reversed: "Forgive yourself and move forward.",
    },
  },
  "Cups06.webp": {
    name: "Six of Cups",
    upright: "Nostalgia, memories, reunion, innocence.",
    reversed: "Stuck in the past, naivety, unrealistic.",
    advice: {
      upright: "Reconnect with your past in a healthy way.",
      reversed: "Live in the present and let go of the past.",
    },
  },
  "Cups07.webp": {
    name: "Seven of Cups",
    upright: "Choices, fantasy, illusion, wishful thinking.",
    reversed: "Alignment, personal values, overwhelmed by options.",
    advice: {
      upright: "Clarify your desires and choose wisely.",
      reversed: "Focus on what truly matters to you.",
    },
  },
  "Cups08.webp": {
    name: "Eight of Cups",
    upright: "Withdrawal, moving on, seeking meaning.",
    reversed: "Avoidance, fear of change, aimless drifting.",
    advice: {
      upright: "Leave behind what no longer serves you.",
      reversed: "Face your fears and seek your true path.",
    },
  },
  "Cups09.webp": {
    name: "Nine of Cups",
    upright: "Contentment, satisfaction, wish come true.",
    reversed: "Lack of inner joy, dissatisfaction, indulgence.",
    advice: {
      upright: "Enjoy your achievements and be grateful.",
      reversed: "Seek fulfillment within, not just externally.",
    },
  },
  "Cups10.webp": {
    name: "Ten of Cups",
    upright: "Harmony, fulfillment, happiness, alignment.",
    reversed: "Disconnection, misaligned values, struggling relationships.",
    advice: {
      upright: "Appreciate the love and joy in your life.",
      reversed: "Work on restoring harmony in your relationships.",
    },
  },
  "Cups11.webp": {
    name: "Page of Cups",
    upright: "Creative opportunities, curiosity, possibility.",
    reversed: "Emotional immaturity, creative blocks.",
    advice: {
      upright: "Be open to inspiration and new ideas.",
      reversed: "Address emotional blocks and grow.",
    },
  },
  "Cups12.webp": {
    name: "Knight of Cups",
    upright: "Romance, charm, imagination, beauty.",
    reversed: "Moodiness, disappointment, unrealistic.",
    advice: {
      upright: "Follow your heart and express your feelings.",
      reversed: "Balance dreams with reality.",
    },
  },
  "Cups13.webp": {
    name: "Queen of Cups",
    upright: "Compassion, calm, comfort, intuition.",
    reversed: "Insecurity, dependence, emotional instability.",
    advice: {
      upright: "Nurture yourself and others with empathy.",
      reversed: "Strengthen your emotional boundaries.",
    },
  },
  "Cups14.webp": {
    name: "King of Cups",
    upright: "Emotional balance, generosity, wisdom.",
    reversed: "Emotional manipulation, moodiness, volatility.",
    advice: {
      upright: "Lead with compassion and emotional maturity.",
      reversed: "Control your emotions and avoid manipulation.",
    },
  },

  // Swords
  "Swords01.webp": {
    name: "Ace of Swords",
    upright: "Breakthroughs, clarity, sharp mind, new ideas.",
    reversed: "Confusion, brutality, chaos.",
    advice: {
      upright: "Trust your intellect and speak your truth.",
      reversed: "Seek clarity before making decisions.",
    },
  },
  "Swords02.webp": {
    name: "Two of Swords",
    upright: "Difficult choices, indecision, stalemate.",
    reversed: "Indecision, confusion, information overload.",
    advice: {
      upright: "Weigh your options and seek clarity.",
      reversed: "Take a break and clear your mind.",
    },
  },
  "Swords03.webp": {
    name: "Three of Swords",
    upright: "Heartbreak, sorrow, grief, hurt.",
    reversed: "Releasing pain, optimism, forgiveness.",
    advice: {
      upright: "Allow yourself to heal and release pain.",
      reversed: "Forgive and let go of past hurts.",
    },
  },
  "Swords04.webp": {
    name: "Four of Swords",
    upright: "Rest, recovery, contemplation, passivity.",
    reversed: "Restlessness, burnout, stress.",
    advice: {
      upright: "Take time to rest and restore your energy.",
      reversed: "Prioritize self-care and relaxation.",
    },
  },
  "Swords05.webp": {
    name: "Five of Swords",
    upright: "Conflict, defeat, tension, betrayal.",
    reversed: "Reconciliation, making amends, past resentment.",
    advice: {
      upright: "Pick your battles and seek resolution.",
      reversed: "Let go of grudges and move forward.",
    },
  },
  "Swords06.webp": {
    name: "Six of Swords",
    upright: "Transition, change, rite of passage.",
    reversed: "Resistance to change, unfinished business.",
    advice: {
      upright: "Move forward and leave difficulties behind.",
      reversed: "Address unresolved issues before moving on.",
    },
  },
  "Swords07.webp": {
    name: "Seven of Swords",
    upright: "Deception, strategy, betrayal, cunning.",
    reversed: "Coming clean, rethinking approach.",
    advice: {
      upright: "Act with integrity and be cautious of others.",
      reversed: "Be honest and reconsider your strategy.",
    },
  },
  "Swords08.webp": {
    name: "Eight of Swords",
    upright: "Restriction, limitation, confusion, imprisonment.",
    reversed: "Freedom, release, finding solutions.",
    advice: {
      upright: "Free yourself from self-imposed limitations.",
      reversed: "Take action to liberate yourself.",
    },
  },
  "Swords09.webp": {
    name: "Nine of Swords",
    upright: "Anxiety, worry, fear, nightmares.",
    reversed: "Inner turmoil, deep fears, secrets.",
    advice: {
      upright: "Face your fears and seek support if needed.",
      reversed: "Share your worries and seek help.",
    },
  },
  "Swords10.webp": {
    name: "Ten of Swords",
    upright: "Endings, betrayal, loss, crisis.",
    reversed: "Recovery, regeneration, resisting an end.",
    advice: {
      upright: "Accept what is over and prepare for renewal.",
      reversed: "Allow yourself to heal and move on.",
    },
  },
  "Swords11.webp": {
    name: "Page of Swords",
    upright: "Curiosity, new ideas, vigilance.",
    reversed: "Deception, manipulation, all talk.",
    advice: {
      upright: "Be open to learning and stay alert.",
      reversed: "Be honest and avoid gossip.",
    },
  },
  "Swords12.webp": {
    name: "Knight of Swords",
    upright: "Ambition, action, drive, bravery.",
    reversed: "No direction, disregard for consequences.",
    advice: {
      upright: "Pursue your goals with determination.",
      reversed: "Think before you act impulsively.",
    },
  },
  "Swords13.webp": {
    name: "Queen of Swords",
    upright: "Perceptiveness, independence, clarity.",
    reversed: "Cold-heartedness, criticism, bitterness.",
    advice: {
      upright: "Communicate clearly and think logically.",
      reversed: "Balance logic with compassion.",
    },
  },
  "Swords14.webp": {
    name: "King of Swords",
    upright: "Intellectual power, authority, truth.",
    reversed: "Manipulation, misuse of power, cruelty.",
    advice: {
      upright: "Lead with wisdom and fairness.",
      reversed: "Use your intellect responsibly.",
    },
  },

  // Pentacles
  "Pentacles01.webp": {
    name: "Ace of Pentacles",
    upright: "Opportunity, prosperity, new venture, abundance.",
    reversed: "Lost opportunity, lack of planning, scarcity.",
    advice: {
      upright: "Take practical steps toward your goals.",
      reversed: "Plan carefully to avoid missed opportunities.",
    },
  },
  "Pentacles02.webp": {
    name: "Two of Pentacles",
    upright: "Balance, adaptability, time management.",
    reversed: "Overwhelmed, disorganization, imbalance.",
    advice: {
      upright: "Stay flexible and manage your priorities.",
      reversed: "Simplify and focus on essentials.",
    },
  },
  "Pentacles03.webp": {
    name: "Three of Pentacles",
    upright: "Teamwork, collaboration, skill.",
    reversed: "Disharmony, misalignment, working alone.",
    advice: {
      upright: "Work with others and value their input.",
      reversed: "Seek collaboration and resolve conflicts.",
    },
  },
  "Pentacles04.webp": {
    name: "Four of Pentacles",
    upright: "Conservation, security, control.",
    reversed: "Greed, materialism, self-protection.",
    advice: {
      upright: "Be mindful of holding on too tightly.",
      reversed: "Let go and share your resources.",
    },
  },
  "Pentacles05.webp": {
    name: "Five of Pentacles",
    upright: "Poverty, insecurity, worry.",
    reversed: "Recovery, improvement, spiritual poverty.",
    advice: {
      upright: "Seek support and remember this will pass.",
      reversed: "Accept help and focus on recovery.",
    },
  },
  "Pentacles06.webp": {
    name: "Six of Pentacles",
    upright: "Generosity, charity, sharing.",
    reversed: "Strings attached, inequality, debt.",
    advice: {
      upright: "Give and receive with gratitude.",
      reversed: "Be fair and avoid conditions on generosity.",
    },
  },
  "Pentacles07.webp": {
    name: "Seven of Pentacles",
    upright: "Assessment, patience, investment.",
    reversed: "Lack of reward, impatience, wasted effort.",
    advice: {
      upright: "Review your progress and be patient.",
      reversed: "Reevaluate your efforts and adjust.",
    },
  },
  "Pentacles08.webp": {
    name: "Eight of Pentacles",
    upright: "Apprenticeship, skill development, mastery.",
    reversed: "Perfectionism, lack of focus, uninspired.",
    advice: {
      upright: "Focus on learning and improving your craft.",
      reversed: "Find passion in your work again.",
    },
  },
  "Pentacles09.webp": {
    name: "Nine of Pentacles",
    upright: "Abundance, luxury, self-sufficiency.",
    reversed: "Overinvestment, hustling, setbacks.",
    advice: {
      upright: "Enjoy the fruits of your labor.",
      reversed: "Balance work with enjoyment.",
    },
  },
  "Pentacles10.webp": {
    name: "Ten of Pentacles",
    upright: "Legacy, inheritance, family, establishment.",
    reversed: "Financial failure, loss, family disputes.",
    advice: {
      upright: "Value tradition and long-term security.",
      reversed: "Resolve family or financial issues.",
    },
  },
  "Pentacles11.webp": {
    name: "Page of Pentacles",
    upright: "Ambition, diligence, opportunity.",
    reversed: "Laziness, lack of progress, procrastination.",
    advice: {
      upright: "Be open to new ventures and study hard.",
      reversed: "Take initiative and avoid delays.",
    },
  },
  "Pentacles12.webp": {
    name: "Knight of Pentacles",
    upright: "Efficiency, routine, responsibility.",
    reversed: "Laziness, boredom, feeling stuck.",
    advice: {
      upright: "Stay committed and work steadily.",
      reversed: "Break monotony and find motivation.",
    },
  },
  "Pentacles13.webp": {
    name: "Queen of Pentacles",
    upright: "Practicality, security, nurturing.",
    reversed: "Imbalance, self-centeredness, work-home conflict.",
    advice: {
      upright: "Care for yourself and your resources.",
      reversed: "Balance your priorities and nurture yourself.",
    },
  },
  "Pentacles14.webp": {
    name: "King of Pentacles",
    upright: "Wealth, leadership, discipline.",
    reversed: "Greed, indulgence, stubbornness.",
    advice: {
      upright: "Lead with reliability and generosity.",
      reversed: "Share your wealth and avoid rigidity.",
    },
  },

  // Wands
  "Wands01.webp": {
    name: "Ace of Wands",
    upright: "Inspiration, new opportunities, growth, potential.",
    reversed: "Delays, lack of motivation, weighed down.",
    advice: {
      upright: "Act on your creative impulses.",
      reversed: "Find your spark before proceeding.",
    },
  },
  "Wands02.webp": {
    name: "Two of Wands",
    upright: "Planning, progress, decisions, discovery.",
    reversed: "Fear of change, playing safe, bad planning.",
    advice: {
      upright: "Look ahead and make bold plans.",
      reversed: "Step out of your comfort zone.",
    },
  },
  "Wands03.webp": {
    name: "Three of Wands",
    upright: "Expansion, foresight, growth, overseas opportunities.",
    reversed: "Obstacles, delays, frustration.",
    advice: {
      upright: "Be patient and trust your vision.",
      reversed: "Adapt to changes and stay flexible.",
    },
  },
  "Wands04.webp": {
    name: "Four of Wands",
    upright: "Celebration, harmony, home, community.",
    reversed: "Personal celebration, transition, instability.",
    advice: {
      upright: "Enjoy your achievements with loved ones.",
      reversed: "Find stability and celebrate small wins.",
    },
  },
  "Wands05.webp": {
    name: "Five of Wands",
    upright: "Conflict, competition, tension, diversity.",
    reversed: "Avoiding conflict, harmony, inner conflict.",
    advice: {
      upright: "Embrace healthy competition and resolve disputes.",
      reversed: "Seek harmony and avoid unnecessary fights.",
    },
  },
  "Wands06.webp": {
    name: "Six of Wands",
    upright: "Victory, recognition, success, progress.",
    reversed: "Ego, lack of recognition, fall from grace.",
    advice: {
      upright: "Celebrate your wins and inspire others.",
      reversed: "Stay humble and keep working.",
    },
  },
  "Wands07.webp": {
    name: "Seven of Wands",
    upright: "Challenge, perseverance, defense.",
    reversed: "Giving up, overwhelmed, lack of confidence.",
    advice: {
      upright: "Stand your ground and defend your beliefs.",
      reversed: "Regain your confidence and keep going.",
    },
  },
  "Wands08.webp": {
    name: "Eight of Wands",
    upright: "Speed, action, movement, swift change.",
    reversed: "Delays, frustration, holding off.",
    advice: {
      upright: "Act quickly and go with the flow.",
      reversed: "Be patient and avoid rushing.",
    },
  },
  "Wands09.webp": {
    name: "Nine of Wands",
    upright: "Resilience, persistence, boundaries.",
    reversed: "Exhaustion, fatigue, defensiveness.",
    advice: {
      upright: "Protect your energy and keep going.",
      reversed: "Rest and recharge before continuing.",
    },
  },
  "Wands10.webp": {
    name: "Ten of Wands",
    upright: "Burden, responsibility, stress, hard work.",
    reversed: "Taking on too much, burnout, burden.",
    advice: {
      upright: "Delegate and lighten your load.",
      reversed: "Ask for help and release burdens.",
    },
  },
  "Wands11.webp": {
    name: "Page of Wands",
    upright: "Exploration, excitement, freedom, discovery.",
    reversed: "Lack of direction, procrastination.",
    advice: {
      upright: "Be curious and try new things.",
      reversed: "Find your passion and take action.",
    },
  },
  "Wands12.webp": {
    name: "Knight of Wands",
    upright: "Energy, passion, adventure, impulsiveness.",
    reversed: "Recklessness, impatience, anger.",
    advice: {
      upright: "Pursue your goals with enthusiasm.",
      reversed: "Channel your energy constructively.",
    },
  },
  "Wands13.webp": {
    name: "Queen of Wands",
    upright: "Confidence, independence, determination.",
    reversed: "Selfishness, jealousy, insecurity.",
    advice: {
      upright: "Shine brightly and inspire others.",
      reversed: "Build your confidence and avoid comparison.",
    },
  },
  "Wands14.webp": {
    name: "King of Wands",
    upright: "Leadership, vision, honor, entrepreneurship.",
    reversed: "Impulsiveness, haste, ruthless.",
    advice: {
      upright: "Lead with vision and courage.",
      reversed: "Think before you act and lead with integrity.",
    },
  },
};

export const CARD_IMAGES = Object.keys(CARD_MEANINGS).map(key => `Cards/${key}`);
