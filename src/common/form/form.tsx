import {Form, Input, InputRef, message} from 'antd';
import {LegacyRef, MutableRefObject, useEffect, useRef, useState} from 'react';
import {LightDM} from '../../lightdm';

export const FormLogin = () => {
  const [state, setState] = useState<object & {time: number}>({time: 0});

  const inputRef: LegacyRef<InputRef> = useRef(null);
  const lightdm = useRef(LightDM.create())
  const renderRef: MutableRefObject<number> = useRef<number>(0);
  const intevalRef: MutableRefObject<number | undefined> = useRef();
  const greeterInstance = lightdm.current.greeterInstance

  const onKeyPress = (e: KeyboardEvent) => {
    if (!inputRef.current) return;
    if(['Tab', 'Space', 'Enter'].includes(e.code))
      inputRef.current.focus()
  }

  useEffect(() => {
    if (renderRef.current !== 0) return
    renderRef.current = renderRef.current + 1;
		// greeterInstance.show_prompt.connect( (prompt, type) => this.show_prompt(prompt, type) );
		// greeterInstance.show_message.connect( (msg, type) => this.show_message(msg, type) );
		//
		// window.start_authentication    = event => this.start_authentication(event);
		// window.cancel_authentication   = event => this.cancel_authentication(event);
		//
		// greeterInstance.authentication_complete.connect( () => this.authentication_complete() );
		// greeterInstance.autologin_timer_expired.connect( event => this.cancel_authentication(event) );

    greeterInstance.authenticate('quan');
    // greeterInstance.start_session(greeterInstance.sessions[0].key)

    window.addEventListener('keyup', onKeyPress)
    return () => window.removeEventListener('keyup', onKeyPress)
  }, [])

  const onSubmit = (values: {password: string}) => {
    if (intevalRef.current) return;
    greeterInstance.respond(values.password);

    intevalRef.current = setInterval(() => {
      const isAuthenticated = greeterInstance.is_authenticated;
      const inAuthentication = greeterInstance.in_authentication;

      setState(prev => ({...prev, isAuthenticated, inAuthentication}))

      if (greeterInstance.in_authentication) return
      if (!greeterInstance.is_authenticated) {
        message.error('Error');
        greeterInstance.cancel_authentication()
        authenticationComplete()
        return
      }
        
      greeterInstance.start_session(greeterInstance.sessions[0].key)
      authenticationComplete()
    }, 100)
  }

  const authenticationComplete = () => {
    clearInterval(intevalRef.current)
    intevalRef.current = undefined
  }
  
  return (
    <div className="flex justify-center items-center absolute w-1/3 h-80 z-[2]">
      <div className="w-max-[200px]">
        <Form
          onFinish={onSubmit}
        >
          <Form.Item noStyle name="password">
            <Input
              required
              ref={inputRef}
              type="password"
              size="large"
              className="rounded-full"
              placeholder="Enter password"
            />
          </Form.Item>

        </Form>
      </div>
    </div>
  )
}
