import { FaSort } from 'react-icons/fa6';

interface MapProps {
  headerTitle: string;
  headerDesc: string;
  tableHeads: Array<{ title: string; isSortable: boolean }>;
  tableContent: Array<Array<string>>;
}

export default function Table({
  headerTitle,
  headerDesc,
  tableHeads,
  tableContent,
}: MapProps) {
  return (
    <div className='relative h-[50vh] overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <caption className='p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800'>
          {headerTitle}
          <p className='mt-1 text-sm font-normal text-gray-500 dark:text-gray-400'>
            {headerDesc}
          </p>
        </caption>
        <thead className='sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            {tableHeads.map((head, index) => (
              <th scope='col' key={`header-${index}`} className='px-6 py-3'>
                <div className='flex items-center space-x3'>
                  {head.title} {head.isSortable && <FaSort color='black' />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableContent.map((row, index) => (
            <tr
              key={`row-${index}`}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-60'
            >
              {row.map((cell, idx) => (
                <td key={`cell-${index}-${idx}`} className='px-6 py-4'>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
