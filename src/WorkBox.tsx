import { ComponentType, ReactNode, useState } from 'react';
import { FaAngleRight, FaAngleDown, FaXmark } from 'react-icons/fa6';

type WorkBoxProps = {
  children?: ReactNode;
  Element: ComponentType;
  UiElements?: Array<ComponentType>;
};

export default function WorkBox({
  children,
  Element,
  UiElements,
}: WorkBoxProps) {
  const [vis, setVis] = useState(true);

  function handleVisChange() {
    setVis(!vis);
  }

  return (
    <>
      <div className='bg-gray-500 rounded-md p-5 h-full'>
        <div className='flex flex-row'>
          <div
            className={`basis-5/6 flex flex-row space-x-10 justify-items-center justify-start`}
          >
            {UiElements &&
              UiElements.map((UiElement, idx) => {
                return (
                  <div key={`uielement-${idx}`}>
                    <UiElement />
                  </div>
                );
              })}
          </div>
          <div className='basis-1/6 justify-end justify-items-end justify-self-end space-x-5 mb-5'>
            {vis ? (
              <button onClick={handleVisChange} className='bg-red-50'>
                <FaAngleDown color='black' />
              </button>
            ) : (
              <button onClick={handleVisChange} className='bg-red-50'>
                <FaAngleRight color='black' />
              </button>
            )}
            <button className='bg-red-50'>
              <FaXmark color='black' />
            </button>
          </div>
        </div>
        <div className={`${vis ? 'visible' : 'hidden'}`}>
          <Element />
        </div>
        {children}
      </div>
    </>
  );
}
