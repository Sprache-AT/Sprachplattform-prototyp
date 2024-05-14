import { useState } from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6';

interface MapProps {
  headerTitle: string;
  headerDesc: string;
  tableHeads: Array<{ title: string; isSortable: boolean }>;
  tableContent: Array<Array<string | number>>;
  registerName: string;
}

export default function Table({
  headerTitle,
  headerDesc,
  tableHeads,
  tableContent,
  registerName,
}: MapProps) {
  const [sortAscending, setSortAscending] = useState<boolean | undefined>(
    undefined
  );
  const [sortIdx, setSortIdx] = useState<number | undefined>(undefined);
  const originalContent: Array<Array<string | number>> = tableContent;

  function sortTable(idx: number, ascending: boolean | undefined) {
    tableContent = tableContent.sort((a, b) => {
      setSortIdx(idx);
      if (ascending === false) {
        setSortIdx(undefined);
        setSortAscending(undefined);
        tableContent = originalContent;
        return -1;
      }
      if (Number.isInteger(a[idx])) {
        if (ascending) {
          setSortAscending(false);
          return a[idx] < b[idx] ? -1 : 1;
        }
        setSortAscending(true);
        return a[idx] > b[idx] ? -1 : 1;
      }
      if (ascending) {
        setSortAscending(false);
        return a[idx].toString().toLowerCase() < b[idx].toString().toLowerCase()
          ? -1
          : 1;
      }
      setSortAscending(true);
      return a[idx].toString().toLowerCase() > b[idx].toString().toLowerCase()
        ? -1
        : 1;
    });
  }

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
                  {head.title}
                  {head.isSortable && (
                    <button
                      className='ml-5'
                      onClick={() => sortTable(index, sortAscending)}
                    >
                      {sortAscending === undefined || sortIdx !== index ? (
                        <FaSort color='black' />
                      ) : sortAscending ? (
                        <FaSortDown color='black' />
                      ) : (
                        <FaSortUp color='black' />
                      )}
                    </button>
                  )}
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
              {row.length === tableHeads.length &&
                row.map((cell, idx) => (
                  <td key={`cell-${index}-${idx}`} className='px-6 py-4'>
                    {cell}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
        <tfoot className='sticky bottom-0 font-semibold text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th colSpan={2} scope='row' className='px-6 py-3 text-base'>
              Summe
            </th>
            <td>
              {tableContent.reduce((prev, curr) => {
                const num = curr[2] as number;
                return prev + (isNaN(num) ? 0 : num);
              }, 0)}
            </td>
            <td>{registerName}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
