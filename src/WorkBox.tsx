import { ComponentType, ReactNode, useState } from 'react';
import { FaAngleRight, FaAngleDown, FaXmark } from 'react-icons/fa6';

type HeaderProps = {
  color?: string;
};

type WorkBoxProps = {
  children?: ReactNode;
  Element: ComponentType<HeaderProps>;
};

export default function WorkBox({ children, Element }: WorkBoxProps) {
  const [vis, setVis] = useState(true);

  function handleVisChange() {
    setVis(!vis);
  }

  return (
    <>
      <div className='bg-gray-500 rounded-md p-5 h-full'>
        <div className='flex flex-row space-x-5 justify-end mb-5'>
          <div className='flex-none'>
            {vis ? (
              <button onClick={handleVisChange} className='bg-red-50'>
                <FaAngleDown color='black' />
              </button>
            ) : (
              <button onClick={handleVisChange} className='bg-red-50'>
                <FaAngleRight color='black' />
              </button>
            )}
          </div>
          <div className='flex-none'>
            <button className='bg-red-50'>
              <FaXmark color='black' />
            </button>
          </div>
        </div>
        <Element />
        {children}
      </div>
    </>
  );
}
