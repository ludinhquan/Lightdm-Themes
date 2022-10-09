import {Greeter} from "./interfaces";

const greeterDefault: Greeter = {
  in_authentication: false,
  is_authenticated: false,
  authentication_user: null,
  users: [
    {
      display_name: 'Lu Dinh Quan',
      username: 'quan',
    },
    {
      display_name: 'John Doe',
      username: 'johnd'
    },
  ],
  sessions: [
    {
      name: 'KDE 5',
      key: 'plasma-shell'
    },
  ],
  authenticate: (username: string) => {
    console.log(`Starting authenticating : '${username}'`);
    greeterDefault.authentication_user = username;
  },

  respond: (password: string) => {
    console.log(`Password provided : '${password}'`);
    greeterDefault.in_authentication = true

    if(password === 'dada') {
      return setTimeout(() => {
        greeterDefault.is_authenticated = true;
        greeterDefault.in_authentication = false;
      }, 3000)
    }

    return setTimeout(() => {
      greeterDefault.is_authenticated = false;
      greeterDefault.in_authentication = false;
    }, 3000)
  },

  cancel_authentication: () => {
    console.log('Auth cancelled');
  },

  start_session: (session: string) => {
    console.log('Starting new session', session);
  },

  show_prompt: {
    connect: () => {}
  },
  show_message: {
    connect: () => {}
  },

  authentication_complete: {
    connect: () => {}
  },

  get_hint: (name: string) => ''
};

const getGreeter = () => {
  return window.lightdm ?? greeterDefault
}

export {
  getGreeter
}
