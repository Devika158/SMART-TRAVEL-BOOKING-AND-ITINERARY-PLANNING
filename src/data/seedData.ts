import { TripItineraryData, SavedTrip } from '../types/travel';

export const POPULAR_DESTINATIONS = [
  {
    name: 'Hyderabad',
    country: 'India',
    tagline: 'City of Pearls, Charminar & Royal Biryani',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=800&auto=format&fit=crop&q=80',
    avgBudget: 12000,
    idealDays: 3,
    bestFor: 'History, Food & Heritage'
  },
  {
    name: 'Goa',
    country: 'India',
    tagline: 'Sun-kissed Beaches, Forts & Portuguese Culture',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80',
    avgBudget: 18000,
    idealDays: 4,
    bestFor: 'Beaches, Nightlife & Water Sports'
  },
  {
    name: 'Manali & Solang',
    country: 'India',
    tagline: 'Snow-capped Peaks, Rohtang Pass & Pine Valleys',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=80',
    avgBudget: 22000,
    idealDays: 5,
    bestFor: 'Snow, Trekking & Mountain Serenity'
  },
  {
    name: 'Kerala Backwaters',
    country: 'India',
    tagline: "God's Own Country, Houseboats & Munnar Hills",
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80',
    avgBudget: 24000,
    idealDays: 4,
    bestFor: 'Nature, Ayurveda & Houseboats'
  },
  {
    name: 'Jaipur & Udaipur',
    country: 'India',
    tagline: 'Royal Palaces, Hawa Mahal & Desert Sunsets',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80',
    avgBudget: 19000,
    idealDays: 4,
    bestFor: 'Palaces, Folk Art & Royal Heritage'
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    tagline: 'Futuristic Metropolises, Ancient Shrines & Ramen',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    avgBudget: 95000,
    idealDays: 6,
    bestFor: 'Anime, High-Tech, Cuisine & Shrines'
  }
];

export const INTEREST_TAGS = [
  { id: 'heritage', label: 'Historical & Forts', icon: 'Landmark' },
  { id: 'beaches', label: 'Beaches & Water', icon: 'Waves' },
  { id: 'food', label: 'Local Food & Street Dining', icon: 'Utensils' },
  { id: 'adventure', label: 'Adventure & Trekking', icon: 'Compass' },
  { id: 'shopping', label: 'Bazaars & Souvenirs', icon: 'ShoppingBag' },
  { id: 'nature', label: 'Nature & Scenery', icon: 'Trees' },
  { id: 'spiritual', label: 'Temples & Spiritual', icon: 'Flame' },
  { id: 'nightlife', label: 'Nightlife & Lounges', icon: 'Moon' },
  { id: 'relaxation', label: 'Spa & Relaxation', icon: 'Coffee' },
  { id: 'photography', label: 'Photography Spots', icon: 'Camera' }
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    appTitle: 'AI TravelMate',
    appSubtitle: 'Smart Travel Booking & AI Itinerary Planner',
    planTrip: 'Plan My Trip',
    myTrips: 'My Trips & Bookings',
    explore: 'Explore Places',
    expenseTracker: 'Expense Tracker & Splitter',
    aiConcierge: 'AI Travel Assistant',
    adminPresentation: 'Project Overview & Tech Stack',
    destinationLabel: 'Where do you want to travel?',
    daysLabel: 'Number of Days',
    budgetLabel: 'Total Budget (INR ₹)',
    travelersLabel: 'Travelers',
    travelerTypeLabel: 'Who is traveling?',
    interestsLabel: 'Select Interests & Passions',
    hotelPrefLabel: 'Accommodation Preference',
    transportPrefLabel: 'Preferred Transport',
    dietPrefLabel: 'Dietary Preference',
    paceLabel: 'Travel Pace',
    generateButton: 'Generate AI Smart Itinerary',
    regenerating: 'AI is crafting your personalized dream itinerary...',
    budgetOptimization: 'AI Budget Optimizer',
    dynamicReplan: 'Smart Day Replanner',
    packingList: 'Smart Packing Checklist',
    emergencySOS: 'Emergency & Local Support',
    bookingTickets: 'Simulated Booking Desk',
    downloadPdf: 'Print / Save Travel Guide',
    saveTrip: 'Save to My Trips',
    savedNotification: 'Trip saved successfully!'
  },
  hi: {
    appTitle: 'एआई ट्रैवलमेट',
    appSubtitle: 'स्मार्ट यात्रा बुकिंग और एआई यात्रा कार्यक्रम योजनाकार',
    planTrip: 'यात्रा की योजना बनाएं',
    myTrips: 'मेरी यात्राएं और बुकिंग',
    explore: 'स्थान अन्वेषण',
    expenseTracker: 'खर्च ट्रैकर और स्प्लिटर',
    aiConcierge: 'एआई यात्रा सहायक',
    adminPresentation: 'परियोजना अवलोकन और तकनीक',
    destinationLabel: 'आप कहाँ यात्रा करना चाहते हैं?',
    daysLabel: 'दिनों की संख्या',
    budgetLabel: 'कुल बजट (₹)',
    travelersLabel: 'यात्रियों की संख्या',
    travelerTypeLabel: 'साथ में कौन यात्रा कर रहा है?',
    interestsLabel: 'रुचियां चुनें',
    hotelPrefLabel: 'होटल प्राथमिकता',
    transportPrefLabel: 'परिवहन प्राथमिकता',
    dietPrefLabel: 'आहार प्राथमिकता',
    paceLabel: 'यात्रा की गति',
    generateButton: 'स्मार्ट यात्रा कार्यक्रम बनाएं',
    regenerating: 'एआई आपका व्यक्तिगत यात्रा कार्यक्रम तैयार कर रहा है...',
    budgetOptimization: 'बजट अनुकूलक',
    dynamicReplan: 'दिन पुनर्नियोजन',
    packingList: 'पैकिंग सूची',
    emergencySOS: 'आपातकालीन सहायता',
    bookingTickets: 'बुकिंग डेस्क',
    downloadPdf: 'डाउनलोड / प्रिंट गाइड',
    saveTrip: 'यात्रा सहेजें',
    savedNotification: 'यात्रा सफलतापूर्वक सहेजी गई!'
  },
  te: {
    appTitle: 'ఏఐ ట్రావెల్‌మేట్',
    appSubtitle: 'స్మార్ట్ ట్రావెల్ బుకింగ్ & ఏఐ పర్యటన ప్లానర్',
    planTrip: 'నా ప్రయాణాన్ని ప్లాన్ చేయండి',
    myTrips: 'నా పర్యటనలు & బుకింగ్స్',
    explore: 'ప్రదేశాల అన్వేషణ',
    expenseTracker: 'ఖర్చుల ట్రాకర్ & స్ప్లిటర్',
    aiConcierge: 'ఏఐ ప్రయాణ సహాయకుడు',
    adminPresentation: 'ప్రాజెక్ట్ వివరాలు & టెక్నాలజీ',
    destinationLabel: 'మీరు ఎక్కడికి ప్రయాణించాలనుకుంటున్నారు?',
    daysLabel: 'రోజుల సంఖ్య',
    budgetLabel: 'మొత్తం బడ్జెట్ (₹)',
    travelersLabel: 'ప్రయాణికుల సంఖ్య',
    travelerTypeLabel: 'ఎవరు ప్రయాణిస్తున్నారు?',
    interestsLabel: 'మీ ఆసక్తులు ఎంచుకోండి',
    hotelPrefLabel: 'హోటల్ ప్రాధాన్యత',
    transportPrefLabel: 'రవాణా ప్రాధాన్యత',
    dietPrefLabel: 'ఆహార ప్రాధాన్యత',
    paceLabel: 'ప్రయాణ వేగం',
    generateButton: 'ఏఐ ప్రయాణ ప్రణాళికను రూపొందించండి',
    regenerating: 'ఏఐ మీ ప్రయాణ ప్రణాళికను సిద్ధం చేస్తోంది...',
    budgetOptimization: 'బడ్జెట్ ఆప్టిమైజర్',
    dynamicReplan: 'రీప్లాన్ చేయండి',
    packingList: 'ప్యాకింగ్ జాబితా',
    emergencySOS: 'అత్యవసర సహాయం',
    bookingTickets: 'బుకింగ్ డెస్క్',
    downloadPdf: 'డౌన్‌లోడ్ / ప్రింట్ చేయండి',
    saveTrip: 'ట్రిప్ సేవ్ చేయండి',
    savedNotification: 'ట్రిప్ విజయవంతంగా సేవ్ చేయబడింది!'
  }
};

export const INITIAL_SAVED_TRIP: SavedTrip = {
  id: 'trip-demo-hyderabad',
  destination: 'Hyderabad, Telangana, India',
  title: 'Hyderabad Royal Heritage, Biryani & Forts Tour',
  dates: 'Oct 14 - Oct 17, 2026',
  travelers: 3,
  budget: 12000,
  currency: 'INR',
  status: 'upcoming',
  createdAt: new Date().toISOString(),
  packedItems: ['Government photo ID', 'Power bank', 'Comfortable walking shoes', 'Cotton tees'],
  bookings: [
    {
      id: 'bk-hotel-1',
      type: 'hotel',
      title: 'Taj Deccan Banjara Heritage Suites',
      provider: 'Taj Hospitality Direct',
      details: 'Deluxe Heritage City View Room (King Bed + Extra Rollaway)',
      dates: 'Check-in: Oct 14, 2026 | Check-out: Oct 17, 2026 (3 Nights)',
      travelersCount: 3,
      totalAmount: 5400,
      status: 'confirmed',
      pnrCode: 'HYD-TJ-88491',
      bookedAt: '2026-09-25T10:14:00Z'
    },
    {
      id: 'bk-cab-1',
      type: 'cab',
      title: 'Full Day Chauffeur Sedan Sightseeing',
      provider: 'TravelMate Cab Assist',
      details: 'Dedicated Air-Conditioned Sedan for Historic Circuit & Food Walk',
      dates: 'Oct 14 - Oct 16, 2026 (3 Days Full Package)',
      travelersCount: 3,
      totalAmount: 2800,
      status: 'confirmed',
      pnrCode: 'CAB-HYD-5501',
      bookedAt: '2026-09-25T11:00:00Z'
    }
  ],
  expenses: [
    {
      id: 'exp-1',
      title: 'Advance Hotel Booking Deposit',
      amount: 2700,
      category: 'accommodation',
      paidBy: 'Akhil',
      date: '2026-09-25'
    },
    {
      id: 'exp-2',
      title: 'Charminar & Chowmahalla Palace Tickets',
      amount: 450,
      category: 'activities',
      paidBy: 'Praveen',
      date: '2026-09-26'
    },
    {
      id: 'exp-3',
      title: 'Shadab Restaurant Dinner & Irani Chai',
      amount: 980,
      category: 'food',
      paidBy: 'Rahul',
      date: '2026-09-26'
    }
  ],
  data: {
    tripSummary: {
      title: 'Hyderabad Royal Heritage & Culinary Trail',
      overview: 'Experience the 400-year-old Nizami heritage, majestic Golconda ramparts, authentic dum biryani, and bustling pearl bazaars with optimized zero-traffic routes.',
      bestTimeToVisit: 'October to February for cool, pleasant sightseeing days.',
      localCultureTips: 'Charminar evening illumination is best observed between 6:30 PM and 8:00 PM; enjoy hot Irani chai with Osmania biscuits near Nimrah Cafe.',
      weatherForecast: {
        condition: 'Clear, Sunny with mild evening breeze',
        temp: '28°C - 32°C',
        advisory: 'Low humidity. Carry sunglasses and a reusable water bottle.',
        indoorFallbackTip: 'In case of rain, explore the Salar Jung Museum with over 40,000 antiquities in air-conditioned halls.'
      }
    },
    budgetBreakdown: {
      transport: 2800,
      accommodation: 4500,
      food: 2200,
      activities: 1200,
      shopping: 800,
      emergency: 500,
      totalEstimated: 12000,
      status: 'within_budget',
      savingsTips: [
        'Use Hyderabad Metro from Miyapur/Ameerpet to MGBS for quick crosstown travel without traffic jams.',
        'Purchase the Chowmahalla + Salar Jung combo pass online to skip ticket counter queues.',
        'Savor legendary local biryani at historic eateries like Shadab, Cafe Bahar, or Bawarchi where portion sizes easily feed two.'
      ]
    },
    days: [
      {
        dayNumber: 1,
        title: 'Day 1: Charminar, Chowmahalla Palace & Laad Bazaar Bangles',
        theme: 'The Nizami Heartland & Old City Street Flavors',
        weatherNotice: 'Pleasant 29°C. Best to cover Charminar in the morning before crowds peak.',
        morning: {
          time: '08:30 AM - 11:30 AM',
          title: 'Charminar Monument Climb & Mecca Masjid',
          description: 'Ascend the four iconic minarets built in 1591 AD. Admire the arches, Quranic calligraphy, and view of the bustling Old City.',
          locationName: 'Charminar & Mecca Masjid, Old City',
          category: 'Historic Monument',
          duration: '3 hrs',
          estimatedCost: 200,
          whyIncluded: 'The ultimate symbol of Hyderabad; morning offers best lighting for photography.',
          travelTransitToNext: {
            mode: 'Walking through pedestrian heritage plaza',
            duration: '8 mins',
            distance: '650 m',
            tip: 'Heritage corridor is fully paved and vehicle-free.'
          }
        },
        afternoon: {
          time: '12:00 PM - 03:30 PM',
          title: 'Chowmahalla Palace & Royal Vintage Car Fleet',
          description: 'Tour the opulent seat of the Asaf Jahi dynasty. Marvel at Belgian crystal chandeliers in Khilwat Mubarak and royal vintage cars.',
          locationName: 'Chowmahalla Palace, Motigalli',
          category: 'Royal Palace & Museum',
          duration: '3.5 hrs',
          estimatedCost: 350,
          whyIncluded: 'Recognized with UNESCO Asia Pacific Heritage Award; quiet shady courtyards.',
          travelTransitToNext: {
            mode: 'Auto Rickshaw or walking via Ghansi Bazaar',
            duration: '10 mins',
            distance: '1.1 km',
            tip: 'Fix auto meter or pay nominal ₹50-₹70.'
          }
        },
        evening: {
          time: '04:30 PM - 07:30 PM',
          title: 'Laad Bazaar Shopping & Evening Sunset at Hussain Sagar',
          description: 'Shop for lac bangles, pearls, and attar perfumes in Laad Bazaar, then head to Hussain Sagar promenade to see the illuminated Buddha Statue.',
          locationName: 'Laad Bazaar & Hussain Sagar Tank Bund',
          category: 'Shopping & Scenic Promenade',
          duration: '3 hrs',
          estimatedCost: 400,
          whyIncluded: 'Vibrant evening atmosphere and golden-hour sunset boat ride.',
          travelTransitToNext: {
            mode: 'Metro from MGBS to Necklace Road / Cab',
            duration: '20 mins',
            distance: '7.5 km',
            tip: 'Metro avoids evening traffic around Abids.'
          }
        },
        night: {
          time: '08:30 PM - 10:30 PM',
          title: 'Authentic Hyderabadi Dum Biryani Feast',
          description: 'Savor slow-cooked mutton/chicken or paneer dum biryani with mirchi ka salan and double ka meetha dessert.',
          locationName: 'Hotel Shadab / Cafe Bahar, Old City',
          category: 'Culinary Masterpiece',
          duration: '2 hrs',
          estimatedCost: 750,
          whyIncluded: 'Rated #1 for authentic heritage biryani taste since 1953.'
        },
        meals: {
          breakfast: {
            dish: 'Butter Dosa & Irani Chai with Osmania Biscuits',
            restaurantOrSpot: 'Nimrah Cafe and Bakery, Charminar',
            type: 'veg',
            estimatedCost: 150
          },
          lunch: {
            dish: 'Traditional Nizami Thali with Bagara Baingan & Roti',
            restaurantOrSpot: 'Pista House Heritage Restaurant',
            type: 'both',
            estimatedCost: 350
          },
          dinner: {
            dish: 'Hyderabadi Dum Biryani with Mirchi Ka Salan',
            restaurantOrSpot: 'Hotel Shadab, High Court Road',
            type: 'both',
            estimatedCost: 550
          },
          mustTrySnack: 'Warm Luqmi (crispy stuffed pastry) & Sulaimani Chai at Medina'
        }
      },
      {
        dayNumber: 2,
        title: 'Day 2: Golconda Fort, Whispering Arches & Qutb Shahi Tombs',
        theme: 'Acoustic Marvels, Fortresses & Sultan Tombs',
        weatherNotice: 'Sunny 30°C. Carry a wide hat for the fortress stairs.',
        morning: {
          time: '08:30 AM - 12:30 PM',
          title: 'Golconda Fort Acoustic Clapping Portico & Citadel Climb',
          description: 'Witness the sound engineering miracle where a clap at the Fateh Darwaza is clearly heard at Bala Hissar peak 1 km away.',
          locationName: 'Golconda Fort, Ibrahim Bagh',
          category: 'Fortress & Military Architecture',
          duration: '4 hrs',
          estimatedCost: 300,
          whyIncluded: 'One of India’s most magnificent fort complexes; breathtaking view of Hyderabad city.',
          travelTransitToNext: {
            mode: 'Cab / Shared Shuttle',
            duration: '10 mins',
            distance: '2.5 km',
            tip: 'Direct link road from Golconda Gate 2 to Qutb Shahi Tombs.'
          }
        },
        afternoon: {
          time: '01:30 PM - 04:30 PM',
          title: 'Qutb Shahi Tombs & Seven Royal Gardens',
          description: 'Stroll among the serene domed mausoleums blending Persian and Hindu architecture, surrounded by manicured gardens and baolis.',
          locationName: 'Qutb Shahi Tombs Complex',
          category: 'Historic Gardens & Architecture',
          duration: '3 hrs',
          estimatedCost: 200,
          whyIncluded: 'Restored by Aga Khan Trust; quiet and peaceful escape from city noise.',
          travelTransitToNext: {
            mode: 'Cab via Banjara Hills',
            duration: '22 mins',
            distance: '8.2 km',
            tip: 'Great cafe stops along Banjara Hills Road No. 12.'
          }
        },
        evening: {
          time: '05:30 PM - 08:30 PM',
          title: 'Durgam Cheruvu Cable-Stayed Bridge & Inorbit Terrace',
          description: 'Admire the architectural cable bridge illuminated with LED light waves, with lakefront sunset walkway.',
          locationName: 'Durgam Cheruvu Lakefront, Hitec City',
          category: 'Modern Landmark & Lakefront',
          duration: '3 hrs',
          estimatedCost: 250,
          whyIncluded: 'Shows Hyderabad’s dynamic modern IT tech-hub personality next to old world charm.'
        },
        meals: {
          breakfast: {
            dish: 'Ghee Karam Dosa with Allam Chutney',
            restaurantOrSpot: 'Govind Dosa / Chutneys Banjara Hills',
            type: 'veg',
            estimatedCost: 180
          },
          lunch: {
            dish: 'Tandoori Platters & Dal Makhani / Kebab Feast',
            restaurantOrSpot: 'Jewel of Nizam / 4 Seasons Towlichowki',
            type: 'both',
            estimatedCost: 400
          },
          dinner: {
            dish: 'Gongura Mutton/Paneer Biryani & Apricot Delight Dessert',
            restaurantOrSpot: 'Spicy Venue / Kritunga, Jubilee Hills',
            type: 'both',
            estimatedCost: 550
          },
          mustTrySnack: 'Famous Spicy Mirchi Bajji near Durgam Cheruvu promenade'
        }
      },
      {
        dayNumber: 3,
        title: 'Day 3: Salar Jung Museum Treasures & Shilparamam Crafts',
        theme: 'World Treasures, Handlooms & Souvenir Memories',
        weatherNotice: 'Indoor temperature-controlled museum halls during peak sun hours.',
        morning: {
          time: '09:30 AM - 01:00 PM',
          title: 'Salar Jung Museum & Musical Clock Chiming',
          description: 'Marvel at the Veiled Rebecca marble sculpture, the double-sided wood sculpture of Mephistopheles and Margaretta, and watch the 19th-century mechanical clock chime at 12 PM sharp.',
          locationName: 'Salar Jung Museum, Darulshifa',
          category: 'World Heritage Museum',
          duration: '3.5 hrs',
          estimatedCost: 250,
          whyIncluded: 'Third largest museum in India; single-man collection of global antiquity.',
          travelTransitToNext: {
            mode: 'Metro from Salar Jung station to Hitec City',
            duration: '30 mins',
            distance: '16 km',
            tip: 'Air-conditioned metro bypasses all junction signals.'
          }
        },
        afternoon: {
          time: '02:00 PM - 05:00 PM',
          title: 'Shilparamam Arts & Crafts Village',
          description: 'Browse rural artisan stalls for Pochampally Ikat sarees, Bidri metalware, pearls, and terracotta pottery.',
          locationName: 'Shilparamam, Madhapur',
          category: 'Artisans & Handicrafts',
          duration: '3 hrs',
          estimatedCost: 200,
          whyIncluded: 'Direct-from-weaver prices for genuine GI-tagged handlooms.'
        },
        evening: {
          time: '06:00 PM - 09:30 PM',
          title: 'Farewell Royal Feast & Live Ghazal Music',
          description: 'Conclude your Hyderabad voyage with Nizami kebabs, Qubani ka Meetha, and celebratory travel group photos.',
          locationName: 'Exotic Rooftop Terrace, Jubilee Hills',
          category: 'Celebration Dining',
          duration: '3.5 hrs',
          estimatedCost: 800,
          whyIncluded: 'Unforgettable night skyline view overlooking the city lights.'
        },
        meals: {
          breakfast: {
            dish: 'Pesarattu Upma & Filter Coffee',
            restaurantOrSpot: 'Pragathi Tiffin Center, Hanuman Tekdi',
            type: 'veg',
            estimatedCost: 120
          },
          lunch: {
            dish: 'Telangana Royyala Iguru or Gutti Vankaya Koora with Steamed Rice',
            restaurantOrSpot: 'Ulavacharu Restaurant, Jubilee Hills',
            type: 'both',
            estimatedCost: 450
          },
          dinner: {
            dish: 'Pathar Ka Gosht (Stone-grilled meat) & Paneer Tikka with Roomali Roti',
            restaurantOrSpot: 'Bade Miyan Kababs / Terrace Lounge',
            type: 'both',
            estimatedCost: 650
          },
          mustTrySnack: 'Qubani ka Meetha with rich vanilla cream'
        }
      }
    ],
    recommendedHotels: [
      {
        id: 'h-hyd-1',
        name: 'Taj Deccan & Heritage Grand Court',
        category: 'luxury',
        starRating: 5,
        pricePerNight: 5500,
        distanceToCenter: '1.5 km to City Center Banjara Hills',
        amenities: ['Olympic Pool', 'High Speed Wi-Fi', 'Complimentary Breakfast', 'Chauffeur Desk', 'Spa & Fitness'],
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
        description: 'Immaculate Nizami hospitality, lush gardens, and central access to heritage sights.',
        rating: 4.8,
        reviewsCount: 2310
      },
      {
        id: 'h-hyd-2',
        name: 'The Park Boutique Cityscape',
        category: 'standard',
        starRating: 4,
        pricePerNight: 2800,
        distanceToCenter: 'Overlooking Hussain Sagar Lake',
        amenities: ['Lake View Infinity Lounge', 'Free Wi-Fi', 'Breakfast Buffet', 'Airport Shuttle', 'Bar'],
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80',
        description: 'Contemporary metallic design, panoramic lake views, and energetic rooftop dining.',
        rating: 4.5,
        reviewsCount: 1650
      },
      {
        id: 'h-hyd-3',
        name: 'Zostel / Bloom Heritage Hub',
        category: 'budget',
        starRating: 3,
        pricePerNight: 1100,
        distanceToCenter: 'Near Metro Station & Old City corridor',
        amenities: ['Clean Air-con Rooms', 'Superfast Wi-Fi', 'Workstation Pods', 'Travel Desk', '24/7 Security'],
        imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80',
        description: 'Pocket-friendly haven for students, solo travelers, and groups with vibrant community vibe.',
        rating: 4.4,
        reviewsCount: 890
      }
    ],
    transportOptions: [
      {
        id: 't-hyd-1',
        type: 'flight',
        provider: 'IndiGo / Air India Express',
        route: 'Direct Flight to Rajiv Gandhi International Airport (HYD)',
        duration: '1h 35m',
        departureTime: '06:45 AM / 08:30 PM',
        pricePerPerson: 3800,
        features: ['Fast baggage clearance', 'Direct Pushpak Airport AC Electric Bus access to city']
      },
      {
        id: 't-hyd-2',
        type: 'train',
        provider: 'Vande Bharat / Superfast Express',
        route: 'Direct Intercity to Secunderabad / Kacheguda Junction',
        duration: '4h 50m',
        departureTime: '06:00 AM Daily',
        pricePerPerson: 1250,
        features: ['Executive AC Chair car', 'Hot breakfast & tea included', 'Station metro interchange']
      },
      {
        id: 't-hyd-3',
        type: 'cab_rental',
        provider: 'TravelMate Chauffeur Sedan / SUV',
        route: '3-Day Full City & Sightseeing Package with Chauffeur',
        duration: '72 Hours Flexible On-Demand',
        departureTime: '24/7 At Hotel Porch',
        pricePerPerson: 1400,
        features: ['Tolls and parking covered', 'Local driver acting as local food advisor', 'Air conditioned']
      }
    ],
    placesToExplore: [
      {
        id: 'pl-1',
        name: 'Charminar & Laad Pearl Bazaar',
        category: 'Heritage & Shopping',
        duration: '3 Hours',
        approxCost: 200,
        bestTime: '08:30 AM or 06:30 PM (Illuminated)',
        highlights: '400-year-old arches, Nizami bangles, pearls, and aroma spices.',
        imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 'pl-2',
        name: 'Golconda Fort & Whispering Galleries',
        category: 'Military Fortress',
        duration: '4 Hours',
        approxCost: 300,
        bestTime: '08:30 AM (Cool breeze)',
        highlights: 'Acoustic marvel, Koh-i-Noor diamond history, panoramic summit.',
        imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 'pl-3',
        name: 'Chowmahalla Palace',
        category: 'Royal Palace',
        duration: '3 Hours',
        approxCost: 250,
        bestTime: '11:00 AM - 03:00 PM',
        highlights: 'Crystal chandeliers, royal vintage car collection, manicured fountains.',
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 'pl-4',
        name: 'Salar Jung Museum',
        category: 'World Antiquity Museum',
        duration: '3.5 Hours',
        approxCost: 200,
        bestTime: '11:30 AM (In time for 12 PM clock)',
        highlights: 'Veiled Rebecca, mechanical musical clock, 40,000 global artifacts.',
        imageUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&auto=format&fit=crop&q=80'
      }
    ],
    packingChecklist: [
      {
        category: 'Clothes',
        items: [
          'Lightweight cotton tees & comfortable trousers',
          'Comfortable walking sneakers for Golconda Fort stone stairs',
          'Modest attire covering shoulders & knees for Mecca Masjid & temples',
          'Sunglasses and sunhat'
        ]
      },
      {
        category: 'Electronics',
        items: [
          '10,000+ mAh power bank for full-day photo exploration',
          'Fast charger & universal adapter',
          'Wireless earphones for museum audio tours',
          'Extra SD card or cloud backup for photos'
        ]
      },
      {
        category: 'Essentials & Meds',
        items: [
          'Hydration electrolyte sachets & water bottle',
          'Digestive enzyme tablets (for rich biryani indulgence!)',
          'Sunscreen SPF 50 & hand sanitizer',
          'Band-aids & blister protection'
        ]
      },
      {
        category: 'Documents',
        items: [
          'Government Photo ID (Aadhaar / Passport / Voter ID)',
          'Confirmed Hotel & Cab booking voucher copies',
          'Emergency cash in ₹100 and ₹500 bills'
        ]
      }
    ],
    emergencyInfo: {
      country: 'India (Telangana)',
      police: '100 / 112 (Telangana Police)',
      ambulance: '108 (Emergency Medical Service)',
      fire: '101',
      touristHelpline: '1363 / 040-23450444 (Telangana Tourism Support)',
      localHospitalSuggestion: 'Apollo Hospitals Jubilee Hills / Care Hospitals Banjara Hills',
      embassyOrSafetyNote: 'Emergency police kiosks available right at Charminar plaza and Golconda gate. Safe & tourist-friendly environment.'
    }
  }
};
