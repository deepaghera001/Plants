export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: 'flower' | 'vegetable' | 'herb' | 'tree' | 'succulent' | 'houseplant';
  image: string;
  description: string;
  growthTime: {
    min: number;
    max: number;
    unit: 'days' | 'weeks' | 'months';
  };
  season: string[];
  sunlightRequirement: 'full-sun' | 'partial-sun' | 'shade';
  waterNeeds: 'low' | 'moderate' | 'high';
  soilType: string;
  temperatureRange: {
    min: number;
    max: number;
  };
  careLevel: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  addedBy: string;
  addedAt: string;
}

export interface CareGuide {
  id: string;
  plantId: string;
  stage: string;
  instruction: string;
  timeframe: string;
  tips: string[];
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  plantId?: string;
  plantName?: string;
  title: string;
  body: string;
  type: 'question' | 'tip' | 'showcase' | 'problem';
  images: string[];
  tags: string[];
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  body: string;
  likes: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'member' | 'expert' | 'moderator' | 'admin';
  bio: string;
  joinedAt: string;
  plantsContributed: number;
  postsCount: number;
}