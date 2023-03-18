import Layout from "#/layout";  
import { TypeAnimation } from 'react-type-animation';
import {Container} from '@nextui-org/react';
function Typing() {
  return (
    <TypeAnimation
      sequence={[
        'Simple info',
        2000,
        '前所未有的簡單', // '
        2000,
        '還在這𥚃?',
        3000,
        '找你所要的資訊吧！',
        2000,
      ]}
      wrapper="div"
      cursor={true}
      repeat={3}
      speed={45}
      style={{ fontSize: '3em' }}
    />
  );
}
export default function Home() {
  return <>

            <div
            className=" d-flex   justify-content-center align-items-center"
            style={{ backgroundColor: 'transparent', height: '150px' }}
            >
              <Typing/>
            </div>
            <body>

            </body>
        </>;
}
