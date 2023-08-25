import { faker } from '@faker-js/faker'

interface Player {
  id: number
  plan: number
  avatar: string | number
  previousPlan?: number
  isStart?: boolean
  isFinished?: boolean
  consecutiveSixes?: number
  positionBeforeThreeSixes?: number
  message?: string
}

export const avatar = faker.image.avatar()

export const diceProps = {
  count: 6,
  players: 4,
  disabled: false,
  canGo: true,
  isReported: false,
  updateStep: () => {
    // Implement the logic for updating steps here
  },
  random: () => {
    // Implement the logic for rolling the dice randomly here
  },
}

export const plansPlayers: Player[] = [
  {
    id: 2,
    plan: 72,
    avatar: 106,
  },
  {
    id: 4,
    plan: 34,
    avatar: avatar,
  },
]

export const id = faker.string.uuid()
export const fullName = faker.internet.userName()
export const isAdmin = false
export const isLiked = faker.datatype.boolean()
export const likeCount = faker.number.int({ max: 100 })
export const commCount = faker.number.int({ max: 100 })
export const date = faker.date.past().toISOString().substring(0, 10)

export const handleProfile = () => {
  console.log('Profile Pressed')
}

export const handleAdminMenu = () => {
  console.log('Admin Menu Pressed')
}

export const handleShareLink = () => {
  console.log('Share Link Pressed')
}

export const handleLike = () => {
  console.log('Like Pressed')
}

export const handleComment = () => {
  console.log('Comment Pressed')
}

interface Comment {
  id: string
  text: string
  createTime: number
}

interface UserActions {
  handleProfile: () => void
  handleAdminMenu: () => void
  handleShareLink: () => void
  handleLike: () => void
  handleComment: () => void
}

interface Post extends UserActions {
  id: number
  player: Player
  text: string
  liked: string[]
  comments: Comment[]
  plan: number
  accept: boolean
  isAdmin: boolean
  isLiked: boolean
  likeCount: number
  commCount: number
  createTime: number
}

export const post: Post = {
  id: 1,
  player: {
    id: 1,
    plan: 72,
    avatar: avatar,
  },
  text: faker.lorem.paragraphs(2),
  liked: [faker.string.uuid(), faker.string.uuid()],
  comments: [
    {
      id: faker.string.uuid(),
      text: 'This is the first comment.',
      createTime: faker.number.int(),
    },
    {
      id: faker.string.uuid(),
      text: 'This is the second comment.',
      createTime: faker.number.int(),
    },
  ],
  plan: faker.number.int(),
  accept: true,
  isAdmin: false,
  isLiked: faker.datatype.boolean(),
  likeCount: faker.number.int(),
  commCount: faker.number.int(),
  createTime: faker.number.int(),
}

interface MockedCommentData extends UserActions {
  id: string
  post: Post
  fullName: string
  avatar: string
  isAdmin: boolean
  isLiked: boolean
  likeCount: number
  commCount: number
  date: string
}

export const createMockedCommentData = (): MockedCommentData => {
  return {
    id: faker.string.uuid(),
    post,
    fullName: faker.internet.userName(),
    avatar: avatar,
    isAdmin: isAdmin,
    isLiked: isLiked,
    likeCount: likeCount,
    commCount: commCount,
    date: date,
    handleProfile: handleProfile,
    handleAdminMenu: handleAdminMenu,
    handleShareLink: handleShareLink,
    handleLike: handleLike,
    handleComment: handleComment,
  }
}

export const mockedCommentDataArray: MockedCommentData[] = Array.from(
  { length: 10 },
  createMockedCommentData,
)
