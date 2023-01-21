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