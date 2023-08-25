export type RootStackParamList = {
  WELCOME_SCREEN: undefined
  INFO_SCREEN: undefined
  CONTINUE_SCREEN: undefined
  PLAYER_SCREEN: { oldPlan: number; isStartGame: boolean }
  GAME_SCREEN: undefined
  PLANS_SCREEN: undefined
  PLAN_SCREEN: { key: string }
  REPORTS_SCREEN: undefined
  REPORT_SCREEN: { item: Report }
  UI_KIT_SCREEN: undefined
  SEED_SCREEN: undefined
}

export interface Player {
  id: string
  rallyAccount: string
  fullName: string
  plan: number
  avatar: string
  email: string
  intention: string
  previousPlan?: number
  isStart?: boolean
  isFinished?: boolean
  consecutiveSixes?: number
  positionBeforeThreeSixes?: number
  message?: string
}
export interface ProfileData {
  createPlayer: Player
}

export interface GameBoardProps {
  players: Player[]
}

export interface Comment {
  id: string
  title: string
  author: Player
  createdAt: string
}

export interface UserActions {
  handleProfile: () => void
  handleAdminMenu: () => void
  handleShareLink: () => void
  handleLike: () => void
  handleComment: () => void
}

export interface Report extends UserActions {
  id: string
  player: Player
  text: string
  title: string
  comments: Comment[]
  onPress: () => void
  plan: number
  accept: boolean
  isAdmin: boolean
  isLikedByCurrentUser: boolean
  likes: Like[]
  commentCount: number
  likeCount: number
  createdAt: string
}

export interface MessageAIT {
  systemMessage: string
  message: string
  planText: string
}

export interface HandleCommentAiParamsT {
  curItem: Report | undefined
  systemMessage: string
  message: string
  planText?: string
}

export interface Like {
  id: string
  report: Report
  player: Player
  createdAt: string
}

export interface PlayerInput {
  rallyAccount: string
  fullName: string
  avatar: string
  intention: string
  email: string
  plan: number
  previousPlan: number
  isStart: boolean
  isFinished: boolean
  consecutiveSixes: number
  positionBeforeThreeSixes: number
}
