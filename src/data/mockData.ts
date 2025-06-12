import { Plant, Post, User, CareGuide } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Green',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'expert',
    bio: 'Certified horticulturist with 15 years of experience in plant care and sustainable gardening.',
    joinedAt: '2023-01-15',
    plantsContributed: 24,
    postsCount: 89
  },
  {
    id: '2',
    name: 'Mike Garden',
    email: 'mike@example.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'member',
    bio: 'Urban gardening enthusiast who loves growing herbs and vegetables in small spaces.',
    joinedAt: '2023-03-22',
    plantsContributed: 8,
    postsCount: 34
  },
  {
    id: '3',
    name: 'Emma Bloom',
    email: 'emma@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'moderator',
    bio: 'Indoor plant specialist and community moderator. Passionate about houseplants and air-purifying varieties.',
    joinedAt: '2022-11-08',
    plantsContributed: 16,
    postsCount: 127
  }
];

export const mockPlants: Plant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    category: 'houseplant',
    image: 'https://images.pexels.com/photos/6912831/pexels-photo-6912831.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A stunning tropical houseplant known for its large, glossy leaves with natural holes and splits. Perfect for adding a tropical feel to any indoor space.',
    growthTime: { min: 2, max: 5, unit: 'months' },
    season: ['spring', 'summer', 'fall', 'winter'],
    sunlightRequirement: 'partial-sun',
    waterNeeds: 'moderate',
    soilType: 'Well-draining potting mix',
    temperatureRange: { min: 65, max: 85 },
    careLevel: 'beginner',
    tags: ['indoor', 'tropical', 'air-purifying', 'low-maintenance'],
    addedBy: '3',
    addedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Basil',
    scientificName: 'Ocimum basilicum',
    category: 'herb',
    image: 'https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Aromatic herb essential for cooking. Easy to grow and provides fresh leaves throughout the growing season.',
    growthTime: { min: 6, max: 8, unit: 'weeks' },
    season: ['spring', 'summer'],
    sunlightRequirement: 'full-sun',
    waterNeeds: 'moderate',
    soilType: 'Rich, well-drained soil',
    temperatureRange: { min: 70, max: 90 },
    careLevel: 'beginner',
    tags: ['culinary', 'annual', 'container-friendly', 'aromatic'],
    addedBy: '2',
    addedAt: '2024-02-20'
  },
  {
    id: '3',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    category: 'houseplant',
    image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Extremely hardy succulent with striking upright leaves. Perfect for beginners and low-light conditions.',
    growthTime: { min: 3, max: 6, unit: 'months' },
    season: ['spring', 'summer', 'fall', 'winter'],
    sunlightRequirement: 'shade',
    waterNeeds: 'low',
    soilType: 'Cactus/succulent mix',
    temperatureRange: { min: 55, max: 85 },
    careLevel: 'beginner',
    tags: ['succulent', 'air-purifying', 'drought-tolerant', 'office-plant'],
    addedBy: '1',
    addedAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetable',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Popular vegetable plant that produces juicy, flavorful fruits. Requires regular care but rewards with abundant harvest.',
    growthTime: { min: 3, max: 4, unit: 'months' },
    season: ['spring', 'summer'],
    sunlightRequirement: 'full-sun',
    waterNeeds: 'high',
    soilType: 'Rich, loamy soil with good drainage',
    temperatureRange: { min: 65, max: 85 },
    careLevel: 'intermediate',
    tags: ['edible', 'annual', 'climbing', 'productive'],
    addedBy: '2',
    addedAt: '2024-03-01'
  },
  {
    id: '5',
    name: 'Lavender',
    scientificName: 'Lavandula angustifolia',
    category: 'flower',
    image: 'https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fragrant perennial herb with beautiful purple flowers. Excellent for aromatherapy, cooking, and attracting pollinators.',
    growthTime: { min: 4, max: 6, unit: 'months' },
    season: ['spring', 'summer'],
    sunlightRequirement: 'full-sun',
    waterNeeds: 'low',
    soilType: 'Sandy, well-draining soil',
    temperatureRange: { min: 45, max: 80 },
    careLevel: 'intermediate',
    tags: ['perennial', 'medicinal', 'aromatic', 'pollinator-friendly'],
    addedBy: '1',
    addedAt: '2024-02-14'
  },
  {
    id: '6',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    category: 'houseplant',
    image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Statement houseplant with large, violin-shaped leaves. A popular choice for modern interior design.',
    growthTime: { min: 6, max: 12, unit: 'months' },
    season: ['spring', 'summer', 'fall', 'winter'],
    sunlightRequirement: 'partial-sun',
    waterNeeds: 'moderate',
    soilType: 'Well-draining potting soil',
    temperatureRange: { min: 65, max: 75 },
    careLevel: 'advanced',
    tags: ['statement-plant', 'tree', 'decorative', 'trendy'],
    addedBy: '3',
    addedAt: '2024-01-25'
  }
];

export const mockCareGuides: CareGuide[] = [
  {
    id: '1',
    plantId: '1',
    stage: 'Initial Setup',
    instruction: 'Place in bright, indirect light and water when top inch of soil feels dry.',
    timeframe: 'First 2 weeks',
    tips: ['Use a pot with drainage holes', 'Avoid direct sunlight', 'Mist leaves occasionally']
  },
  {
    id: '2',
    plantId: '1',
    stage: 'Growth Phase',
    instruction: 'Provide support for climbing and fertilize monthly during growing season.',
    timeframe: '2-6 months',
    tips: ['Add moss pole for climbing', 'Rotate plant weekly', 'Increase humidity around plant']
  },
  {
    id: '3',
    plantId: '2',
    stage: 'Seedling',
    instruction: 'Start seeds indoors 6-8 weeks before last frost. Keep soil moist and warm.',
    timeframe: '1-2 weeks',
    tips: ['Use seed starting mix', 'Maintain 70-75°F temperature', 'Provide 12-16 hours of light']
  },
  {
    id: '4',
    plantId: '2',
    stage: 'Transplanting',
    instruction: 'Move outdoors after all danger of frost has passed. Harden off gradually.',
    timeframe: '2-3 weeks',
    tips: ['Gradually expose to outdoor conditions', 'Choose sunny location', 'Space plants 6-12 inches apart']
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '2',
    username: 'Mike Garden',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    plantId: '1',
    plantName: 'Monstera Deliciosa',
    title: 'My Monstera is developing brown spots - help!',
    body: 'I noticed some brown spots appearing on the leaves of my Monstera. The plant has been doing well for months, but suddenly these spots appeared. They seem to be getting bigger. Has anyone experienced this before? What could be causing it?',
    type: 'problem',
    images: ['https://images.pexels.com/photos/7728108/pexels-photo-7728108.jpeg?auto=compress&cs=tinysrgb&w=600'],
    tags: ['monstera', 'plant-problem', 'houseplant', 'brown-spots'],
    likes: 12,
    comments: [
      {
        id: '1',
        userId: '1',
        username: 'Sarah Green',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        body: 'This looks like overwatering to me. Brown spots often indicate root rot or fungal issues. Check if the soil is staying too wet and reduce watering frequency.',
        likes: 8,
        createdAt: '2024-03-15T14:30:00Z'
      },
      {
        id: '2',
        userId: '3',
        username: 'Emma Bloom',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        body: 'I agree with Sarah. Also, check for pests like spider mites or thrips. Sometimes they can cause similar damage. Improve air circulation around the plant.',
        likes: 5,
        createdAt: '2024-03-15T15:45:00Z'
      }
    ],
    createdAt: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    userId: '1',
    username: 'Sarah Green',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    title: '5 Essential Tips for Growing Healthy Herbs Indoors',
    body: 'After years of growing herbs indoors, here are my top 5 tips for success: 1) Choose the right location with 6+ hours of light, 2) Use well-draining pots and soil, 3) Water consistently but don\'t overwater, 4) Harvest regularly to encourage growth, 5) Watch for pests and act quickly. What are your favorite herbs to grow indoors?',
    type: 'tip',
    images: ['https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?auto=compress&cs=tinysrgb&w=600'],
    tags: ['herbs', 'indoor-gardening', 'beginner-tips', 'growing-guide'],
    likes: 45,
    comments: [
      {
        id: '3',
        userId: '2',
        username: 'Mike Garden',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        body: 'Great tips! I\'ve had amazing success with basil and oregano following similar guidelines. Mint is also super easy but be careful - it spreads like crazy!',
        likes: 12,
        createdAt: '2024-03-14T09:15:00Z'
      }
    ],
    createdAt: '2024-03-14T08:00:00Z'
  },
  {
    id: '3',
    userId: '3',
    username: 'Emma Bloom',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    plantId: '3',
    plantName: 'Snake Plant',
    title: 'Look at this snake plant propagation success!',
    body: 'I\'m so excited to share my snake plant propagation journey! Started with just one leaf cutting 6 months ago, and now I have 5 new plants. The key is patience and not overwatering. These are going to friends and family as gifts!',
    type: 'showcase',
    images: ['https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=600'],
    tags: ['snake-plant', 'propagation', 'success-story', 'plant-gifts'],
    likes: 78,
    comments: [
      {
        id: '4',
        userId: '1',
        username: 'Sarah Green',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        body: 'Wow, those look fantastic! Snake plants are such rewarding plants to propagate. Your friends are lucky to receive such thoughtful gifts.',
        likes: 15,
        createdAt: '2024-03-13T16:20:00Z'
      },
      {
        id: '5',
        userId: '2',
        username: 'Mike Garden',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        body: 'Could you share your propagation method? I\'ve tried a few times but haven\'t had much success with leaf cuttings.',
        likes: 8,
        createdAt: '2024-03-13T17:30:00Z'
      }
    ],
    createdAt: '2024-03-13T14:00:00Z'
  }
];