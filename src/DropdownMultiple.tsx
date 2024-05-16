import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck, FaAngleDown } from 'react-icons/fa6';
import { dropDownEntry } from './types';

interface MapDropdownProps<T> {
  entries: Array<dropDownEntry<T>>;
  selected: Array<dropDownEntry<T>>;
  setSelected: (val: Array<dropDownEntry<T>>) => void;
}

export default function DropdownMultiple<T>({
  entries,
  selected,
  setSelected,
}: MapDropdownProps<T>) {
  function handleChange(val: Array<dropDownEntry<T>>) {
    const newVal = val.filter(
      (el, i, arr) => arr.filter((t) => t.value === el.value).length < 2
    );
    setSelected(newVal);
  }

  if (selected) {
    return (
      <div className='w-72'>
        <Listbox
          value={selected ? selected : entries[0]}
          onChange={handleChange}
          multiple
        >
          <div className='relative'>
            <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
              <span className='block truncate'>
                {selected.map((el) => el.name).join(', ')}
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <FaAngleDown
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                {entries.map((entry, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={entry}
                  >
                    {() => (
                      <>
                        <span
                          className={`block truncate ${
                            selected.some((el) => el.value === entry.value)
                              ? 'font-medium'
                              : 'font-normal'
                          }`}
                        >
                          {entry.name}
                        </span>
                        {selected.some((el) => el.value === entry.value) ? (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                            <FaCheck className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    );
  }
}
