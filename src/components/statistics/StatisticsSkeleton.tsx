"use client";

import type { FC } from "react";

interface Props {
  tabsCount?: number;
  rowsCount?: number;
}

export const StatisticsSkeleton: FC<Readonly<Props>> = ({
  tabsCount = 5,
  rowsCount = 5,
}) => {
  const tabs = Array.from({ length: tabsCount }, (_, i) => i);
  const rows = Array.from({ length: rowsCount }, (_, i) => i);

  return (
    <div className="pt-4 w-full flex flex-col">
      {/* Tabs Container - variant="bordered" */}
      <div className="flex flex-col relative gap-2">
        {/* Tabs Header */}
        <div className="flex p-1 gap-1 h-fit items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-transparent border-2 border-default-200 rounded-large">
          {tabs.map((tabIndex) => (
            <button
              key={tabIndex}
              type="button"
              className="z-0 w-full px-3 py-1 h-8 flex items-center justify-center gap-2 rounded-medium outline-none data-[selected=true]:text-primary"
              data-selected={tabIndex === 0}
            >
              <div className="w-4 h-4 rounded-md bg-default-200 dark:bg-default-100 animate-pulse" />
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative flex w-full p-0 flex-col h-auto">
          {/* Table Container - p-0, h-80 */}
          <div className="flex flex-col relative gap-2 p-0">
            <div className="overflow-auto bg-content1 shadow-small rounded-large">
              <table className="min-w-full h-auto table-auto w-full">
                <thead className="sr-only">
                  <tr>
                    <th>Track</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((rowIndex) => (
                    <tr key={rowIndex} className="group outline-none">
                      <td className="group-first:first:before:rounded-tl-lg group-first:last:before:rounded-tr-lg group-last:first:before:rounded-bl-lg group-last:last:before:rounded-br-lg py-2 px-3 relative align-middle whitespace-normal text-small font-normal">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-default-200 dark:bg-default-100 animate-pulse flex-shrink-0" />
                          <div className="w-32 h-4 rounded-lg bg-default-200 dark:bg-default-100 animate-pulse" />
                        </div>
                      </td>
                      <td className="group-first:first:before:rounded-tl-lg group-first:last:before:rounded-tr-lg group-last:first:before:rounded-bl-lg group-last:last:before:rounded-br-lg py-2 px-3 relative align-middle whitespace-normal text-small font-normal text-end">
                        <div className="flex justify-end">
                          <div className="w-8 h-4 rounded-lg bg-default-200 dark:bg-default-100 animate-pulse" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
