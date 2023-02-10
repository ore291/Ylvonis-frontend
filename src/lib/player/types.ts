export type AudioState = {
  duration: number
  playing: boolean
  volume: number
}

export type Track = {
  id?: string
  url?: string
  title?: string
  artist?: Artist
}

export type State = AudioState & {
  playlist: Playlist
  currentTrack: Song | null
  currentTrackIndex: number | null
}

export type Playlist = {
  id: string
  title: string
  imageUrl: string
  tracks?: Song[]
}

export type Artist = {
  id?: string
  name?: string
  imageUrl?: string
  tracks?: Track[]
}

export interface Song {
  name: string;
  caption: string;
  user: User;
  artist: string;
  slug: string;
  featured?: (string)[] | null;
  producers?: (null)[] | null;
  contentType: string;
  release: string;
  uploaded: string;
  lyrics: string;
  album?: null;
  genres?: (string)[] | null;
  country: string;
  trackLength: number;
  coverArt: string;
  coverArtId: string;
  fileUrl: string;
  fileId: string;
  likes?: (null)[] | null;
  createdAt: string;
  updatedAt: string;
  id: string;
}
export interface User {
  username: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  firstname: string;
  lastname: string;
  bio: string;
  profile_pic: string;
  followers: Followers;
  following: Following;
  createdAt: string;
  updatedAt: string;
  location: string;
  id: string;
}
export interface Followers {
}
export interface Following {
  ore291: Ore291;
}
export interface Ore291 {
  user: string;
  _id: string;
}

