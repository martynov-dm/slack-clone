import { IRoom } from './../room/room.model'
import { Document, Model } from 'mongoose'

export interface IServer extends Document {
  title: string
  image: string
  endpoint: string
  isPrivate: boolean
  type: string
}

export interface IServerWithRooms extends IServer {
  title: string
  image: string
  rooms: IRoom[]
}

export interface IServerModel extends Model<IServer> {
  getServersArr(): Promise<IServer[]>
  getEndpoints(): Promise<string[]>
  findAndPopulateCurrentServer(endpoint: string): Promise<IServer[]>
}
