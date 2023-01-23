  export type GraphData = {
    id?: String
    mail?: String
    displayName?: String
  }

export type User = {
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  description: String,
  interests: [String],
  attendingEvents: [String]
}
export type Event = {
  _id: String,
  eventname: String,
  description: String,
  location: String,
  datetime: Date,
  duration: Number,
  userEmail: String,
  eventInterests: String[],
  attendingUsers: String[]
}

export type EventData = {
  _id: String,
  eventname: String,
  description: String,
  location: String,
  datetime: Date,
  duration: Number,
  userEmail: String,
  userCount: Number
}