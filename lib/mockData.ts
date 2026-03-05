export interface Place {
  id: string;
  name: string;
  category: string;
  location: string;
  city: string;
  country: string;
  image: string;
  rating: number;
  trustScore: number;
  verified: boolean;
  description: string;
  priceRange: string;
  coordinates: { lat: number; lng: number };
  tags: string[];
  reviews: Review[];
  verifiedBills: VerifiedBill[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
  images?: string[];
}

export interface VerifiedBill {
  id: string;
  userId: string;
  date: string;
  amount: number;
  currency: string;
  items: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  memberSince: string;
  plan: 'free' | 'vip';
  travelStyle: string[];
  dietaryPreferences: string[];
  collections: Collection[];
  trips: Trip[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  placeIds: string[];
  isPublic: boolean;
  coverImage: string;
  createdAt: string;
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  participants: number;
  travelStyle: string;
  status: 'planning' | 'locked' | 'active' | 'completed';
  itinerary: ItineraryItem[];
}

export interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  placeId: string;
  placeName: string;
  activity: string;
  duration: string;
  notes: string;
}

export interface Notification {
  id: string;
  type: 'trip' | 'community' | 'report' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionUrl?: string;
}

export interface ModerationCase {
  id: string;
  type: 'review' | 'place' | 'user' | 'media';
  reportedContentId: string;
  reportedBy: string;
  reportDate: string;
  ruleViolated: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  content: string;
  strikeCount?: number;
}

export interface GuidePlace {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  authorTip: string;
  time: string;
  day: number;
}

export interface CommunityGuide {
  id: string;
  title: string;
  destination: string;
  coverImage: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  description: string;
  places: GuidePlace[];
  placeCount: number;
  saves: number;
  clones: number;
  createdAt: string;
}

export const mockPlaces: Place[] = [
  {
    id: 'p1',
    name: 'Le Jardin Secret',
    category: 'Restaurant',
    location: 'Marais District',
    city: 'Paris',
    country: 'France',
    image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
    rating: 4.8,
    trustScore: 95,
    verified: true,
    description: 'A hidden gem in the heart of Marais, featuring seasonal French cuisine in an intimate garden setting.',
    priceRange: '$$$',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    tags: ['French Cuisine', 'Garden Dining', 'Romantic', 'Michelin Guide'],
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Sophie Chen',
        userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        rating: 5,
        date: '2024-02-15',
        content: 'Absolutely magical experience. The garden setting is breathtaking and the food is exceptional.',
        helpful: 24,
        images: ['https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg']
      }
    ],
    verifiedBills: [
      {
        id: 'vb1',
        userId: 'u1',
        date: '2024-02-15',
        amount: 145,
        currency: 'EUR',
        items: ['Tasting Menu', 'Wine Pairing', 'Dessert']
      }
    ]
  },
  {
    id: 'p2',
    name: 'Café Cultura',
    category: 'Café',
    location: 'El Born',
    city: 'Barcelona',
    country: 'Spain',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    rating: 4.6,
    trustScore: 88,
    verified: true,
    description: 'Artisanal coffee roastery with a curated selection of pastries and light bites.',
    priceRange: '$$',
    coordinates: { lat: 41.3851, lng: 2.1734 },
    tags: ['Coffee', 'Artisanal', 'Cozy', 'Instagram-worthy'],
    reviews: [],
    verifiedBills: []
  },
  {
    id: 'p3',
    name: 'Sakura Omakase',
    category: 'Restaurant',
    location: 'Ginza',
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    rating: 4.9,
    trustScore: 98,
    verified: true,
    description: 'Intimate 8-seat sushi counter serving the freshest seasonal fish.',
    priceRange: '$$$$',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    tags: ['Sushi', 'Omakase', 'Authentic', 'Luxury'],
    reviews: [],
    verifiedBills: []
  },
  {
    id: 'p4',
    name: 'The Reading Room',
    category: 'Bookstore & Café',
    location: 'Greenwich Village',
    city: 'New York',
    country: 'USA',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    rating: 4.7,
    trustScore: 92,
    verified: true,
    description: 'Independent bookstore with cozy reading nooks and exceptional coffee.',
    priceRange: '$$',
    coordinates: { lat: 40.7331, lng: -74.0014 },
    tags: ['Books', 'Coffee', 'Quiet', 'Literary'],
    reviews: [],
    verifiedBills: []
  }
];

export const mockUser: User = {
  id: 'u1',
  name: 'Sophie Chen',
  email: 'sophie@example.com',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  bio: 'Design enthusiast and slow travel advocate. Always seeking hidden gems off the beaten path.',
  location: 'San Francisco, CA',
  memberSince: '2023-01-15',
  plan: 'vip',
  travelStyle: ['Cultural Immersion', 'Food & Wine', 'Slow Travel'],
  dietaryPreferences: ['Vegetarian-friendly', 'Local Specialties'],
  collections: [
    {
      id: 'c1',
      name: 'European Hideaways',
      description: 'Charming spots across Europe that feel like secret gardens',
      placeIds: ['p1', 'p2'],
      isPublic: true,
      coverImage: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
      createdAt: '2024-01-10'
    },
    {
      id: 'c2',
      name: 'Coffee Destinations',
      description: 'The best independent coffee roasters around the world',
      placeIds: ['p2', 'p4'],
      isPublic: true,
      coverImage: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      createdAt: '2024-02-01'
    }
  ],
  trips: [
    {
      id: 't1',
      destination: 'Kyoto, Japan',
      startDate: '2024-04-10',
      endDate: '2024-04-17',
      budget: 3500,
      participants: 2,
      travelStyle: 'Cultural Immersion',
      status: 'planning',
      itinerary: [
        {
          id: 'i1',
          day: 1,
          time: '09:00',
          placeId: 'p3',
          placeName: 'Fushimi Inari Temple',
          activity: 'Morning temple visit',
          duration: '3 hours',
          notes: 'Arrive early to avoid crowds'
        },
        {
          id: 'i2',
          day: 1,
          time: '14:00',
          placeId: 'p3',
          placeName: 'Nishiki Market',
          activity: 'Food market exploration',
          duration: '2 hours',
          notes: 'Try local street food'
        }
      ]
    }
  ]
};

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'trip',
    title: 'Trip Update',
    message: 'Your Kyoto itinerary has been optimized based on local events',
    date: '2024-03-01T10:30:00',
    read: false,
    actionUrl: '/trip/t1'
  },
  {
    id: 'n2',
    type: 'community',
    title: 'New Review Reply',
    message: 'Someone replied to your review of Le Jardin Secret',
    date: '2024-02-28T15:45:00',
    read: false,
    actionUrl: '/place/p1'
  },
  {
    id: 'n3',
    type: 'system',
    title: 'VIP Benefits Updated',
    message: 'New perks added to your VIP membership',
    date: '2024-02-25T09:00:00',
    read: true,
    actionUrl: '/profile/plan'
  }
];

export const mockModerationCases: ModerationCase[] = [
  {
    id: 'mc1',
    type: 'review',
    reportedContentId: 'r5',
    reportedBy: 'u3',
    reportDate: '2024-03-01',
    ruleViolated: 'Spam/Commercial Content',
    severity: 'medium',
    status: 'pending',
    content: 'This place is terrible! Check out [competitor link] instead...',
    strikeCount: 0
  },
  {
    id: 'mc2',
    type: 'place',
    reportedContentId: 'p8',
    reportedBy: 'u7',
    reportDate: '2024-02-29',
    ruleViolated: 'Fraudulent Information',
    severity: 'high',
    status: 'investigating',
    content: 'Merchant claiming false certifications and inflated trust score',
    strikeCount: 2
  },
  {
    id: 'mc3',
    type: 'user',
    reportedContentId: 'u12',
    reportedBy: 'u9',
    reportDate: '2024-02-28',
    ruleViolated: 'Harassment',
    severity: 'critical',
    status: 'investigating',
    content: 'User sending threatening messages to multiple community members',
    strikeCount: 1
  }
];

export const mockCommunityGuides: CommunityGuide[] = [
  {
    id: 'guide1',
    title: 'Hidden Gems of Kyoto',
    destination: 'Kyoto, Japan',
    coverImage: 'https://images.pexels.com/photos/3408349/pexels-photo-3408349.jpeg',
    authorId: 'u1',
    authorName: 'Sophie Chen',
    authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    description: 'Discover the authentic side of Kyoto beyond the crowded temples. A carefully curated itinerary featuring traditional teahouses, local artisan workshops, and quiet gardens.',
    placeCount: 12,
    saves: 342,
    clones: 128,
    createdAt: '2024-02-15',
    places: [
      {
        id: 'gp1',
        name: 'Fushimi Inari Temple',
        category: 'tourist',
        image: 'https://images.pexels.com/photos/3408349/pexels-photo-3408349.jpeg',
        description: 'Ancient temple famous for thousands of vermillion torii gates winding up the mountainside.',
        authorTip: 'Arrive at dawn to beat the crowds. The quiet morning atmosphere is absolutely magical.',
        time: '06:00',
        day: 1
      },
      {
        id: 'gp2',
        name: 'Vermillion Café',
        category: 'cafe',
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
        description: 'Hidden café near Fushimi Inari with excellent matcha lattes and homemade pastries.',
        authorTip: 'Order their seasonal pastries – they change daily and sell out quickly.',
        time: '09:00',
        day: 1
      },
      {
        id: 'gp3',
        name: 'Nishiki Market',
        category: 'food',
        image: 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg',
        description: 'Over 100 shops selling fresh produce, seafood, prepared foods, and local specialties.',
        authorTip: 'Come hungry! Try the fresh uni and sea urchin from the fishmongers.',
        time: '12:00',
        day: 1
      },
      {
        id: 'gp4',
        name: 'Gion District Walk',
        category: 'tourist',
        image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg',
        description: 'Stroll through the historic geisha district with traditional wooden machiya houses.',
        authorTip: 'Walk during golden hour (around 5 PM) for the best lighting and fewer tourists.',
        time: '16:00',
        day: 1
      }
    ]
  },
  {
    id: 'guide2',
    title: 'Barcelona Food Trail',
    destination: 'Barcelona, Spain',
    coverImage: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg',
    authorId: 'u2',
    authorName: 'Marco Delgado',
    authorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    description: 'A food lover\'s paradise. From tapas bars to Michelin-starred restaurants, explore Barcelona\'s incredible culinary scene like a local.',
    placeCount: 15,
    saves: 521,
    clones: 203,
    createdAt: '2024-02-10',
    places: [
      {
        id: 'gp5',
        name: 'Café Cultura',
        category: 'cafe',
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
        description: 'Artisanal coffee roastery with curated pastries and light bites in the heart of El Born.',
        authorTip: 'The horchata and pastry combo is unbeatable. Go early for the fresh batch.',
        time: '08:30',
        day: 1
      },
      {
        id: 'gp6',
        name: 'La Boqueria Market',
        category: 'food',
        image: 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg',
        description: 'Barcelona\'s most famous market with fresh produce, seafood, and local prepared foods.',
        authorTip: 'Skip the crowded restaurant stalls and grab fresh fruit and juice from the vendors.',
        time: '11:00',
        day: 1
      },
      {
        id: 'gp7',
        name: 'Cervecería Catalana',
        category: 'food',
        image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg',
        description: 'Historic tavern serving traditional Catalan tapas in a lively atmosphere.',
        authorTip: 'Order the jamón serrano, patatas bravas, and their daily specials. Budget 20-30€ per person.',
        time: '19:00',
        day: 1
      },
      {
        id: 'gp8',
        name: 'Park Güell Sunset',
        category: 'tourist',
        image: 'https://images.pexels.com/photos/1420514/pexels-photo-1420514.jpeg',
        description: 'Gaudí\'s modernist masterpiece offers stunning views of Barcelona at sunset.',
        authorTip: 'Book tickets in advance. Go just before sunset for the best light and fewer crowds.',
        time: '17:00',
        day: 2
      }
    ]
  },
  {
    id: 'guide3',
    title: 'Paris in Four Days',
    destination: 'Paris, France',
    coverImage: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
    authorId: 'u3',
    authorName: 'Amélie Dubois',
    authorAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    description: 'Experience Paris like a Parisian. Skip the usual tourist traps and discover charming neighborhoods, hidden cafés, and authentic French culture.',
    placeCount: 16,
    saves: 612,
    clones: 287,
    createdAt: '2024-02-05',
    places: [
      {
        id: 'gp9',
        name: 'Café de Flore',
        category: 'cafe',
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
        description: 'Iconic café in Saint-Germain-des-Prés, beloved by intellectuals and artists.',
        authorTip: 'Go early morning or late evening to avoid the tourist crowds.',
        time: '08:00',
        day: 1
      },
      {
        id: 'gp10',
        name: 'Le Jardin Secret',
        category: 'food',
        image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
        description: 'A hidden gem in the Marais featuring seasonal French cuisine in an intimate garden setting.',
        authorTip: 'The garden is limited seating, so come early. The tasting menu is exceptional.',
        time: '13:00',
        day: 2
      },
      {
        id: 'gp11',
        name: 'Louvre Museum',
        category: 'tourist',
        image: 'https://images.pexels.com/photos/2393220/pexels-photo-2393220.jpeg',
        description: 'World\'s largest art museum with masterpieces spanning millennia.',
        authorTip: 'Book tickets online to skip queues. Focus on a few galleries rather than rushing through.',
        time: '10:00',
        day: 3
      },
      {
        id: 'gp12',
        name: 'Montmartre District',
        category: 'tourist',
        image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg',
        description: 'Historic bohemian neighborhood with charming streets, artists, and Sacré-Cœur Basilica.',
        authorTip: 'Walk during the day to avoid the sketchy evening scene. The views from the steps are stunning.',
        time: '15:00',
        day: 3
      }
    ]
  },
  {
    id: 'guide4',
    title: 'Tokyo Modern & Traditional',
    destination: 'Tokyo, Japan',
    coverImage: 'https://images.pexels.com/photos/3408349/pexels-photo-3408349.jpeg',
    authorId: 'u4',
    authorName: 'Yuki Tanaka',
    authorAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    description: 'Where ancient tradition meets cutting-edge modernity. Experience Tokyo\'s unique blend of old temples and neon-lit streets.',
    placeCount: 18,
    saves: 489,
    clones: 164,
    createdAt: '2024-01-28',
    places: [
      {
        id: 'gp13',
        name: 'Sakura Omakase',
        category: 'food',
        image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
        description: 'Intimate 8-seat sushi counter serving the freshest seasonal fish and sea urchin.',
        authorTip: 'Reserve weeks in advance. The chef\'s selection is perfection – don\'t ask for substitutions.',
        time: '19:00',
        day: 1
      },
      {
        id: 'gp14',
        name: 'Shibuya Crossing',
        category: 'tourist',
        image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg',
        description: 'World\'s busiest pedestrian crossing with an electric energy unlike anywhere else.',
        authorTip: 'Watch from Starbucks overlooking the crossing for photos without being in the chaos.',
        time: '18:00',
        day: 1
      },
      {
        id: 'gp15',
        name: 'Senso-ji Temple',
        category: 'tourist',
        image: 'https://images.pexels.com/photos/3408349/pexels-photo-3408349.jpeg',
        description: 'Tokyo\'s oldest temple with traditional architecture and a bustling shopping street.',
        authorTip: 'Come early morning (before 7 AM) or very late evening for a peaceful experience.',
        time: '07:00',
        day: 2
      },
      {
        id: 'gp16',
        name: 'Harajuku Fashion District',
        category: 'tourist',
        image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
        description: 'Vibrant shopping district known for youth culture, fashion, and quirky boutiques.',
        authorTip: 'Skip the main drag and explore the side streets for independent designer shops.',
        time: '14:00',
        day: 2
      }
    ]
  }
];
