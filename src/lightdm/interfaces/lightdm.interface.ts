export interface User {
  home_directory?: string
  image?: string
  language?: string
  layout?: string
  logged_in?: boolean
  name?: string
  real_name?: string
  session?: string | null,
  display_name: string,
  username: string
}

export interface Session {
  name: string,
  key: string
}

export interface Greeter {
  users: User[]
  in_authentication: boolean
  is_authenticated: boolean
  authentication_user: string | null
  sessions: Session[],
  authenticate(username: string): void
  authenticate(username: string): void
  respond(password: string): void
  cancel_authentication(): void
  start_session(session: string): void
  get_hint(name?: string): string


  show_prompt: {
    connect: (cb: Callback) => void
  }
  show_message: {
    connect: (cb: Callback) => void
  }
  authentication_complete: {
    connect: (cb: Callback) => void
  }
}

type Callback = (text: string, type: string) => void
