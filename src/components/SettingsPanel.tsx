import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const THEMES = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'System', value: 'system' },
];

const REFRESH_RATES = [
  { name: 'Off', value: 0 },
  { name: '30 seconds', value: 30000 },
  { name: '1 minute', value: 60000 },
  { name: '5 minutes', value: 300000 },
  { name: '15 minutes', value: 900000 },
];

const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('system');
  const [refreshRate, setRefreshRate] = useState(300000); // 5 minutes default
  const { toggleTheme } = useTheme();

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    const savedRefreshRate = parseInt(localStorage.getItem('refreshRate') || '300000', 10);
    
    setTheme(savedTheme);
    setRefreshRate(savedRefreshRate);
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (theme !== 'system') {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } else {
      localStorage.removeItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('refreshRate', refreshRate.toString());
    // In a real app, you would update the refresh interval here
  }, [refreshRate]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (newTheme !== 'system') {
      toggleTheme();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Settings"
      >
        <Cog6ToothIcon className="h-5 w-5" />
      </button>

      <Transition.Root show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={React.Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white dark:bg-gray-800 shadow-xl">
                      <div className="px-4 py-6 sm:px-6 bg-gray-50 dark:bg-gray-900">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                            Settings
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex-1 px-4 py-6 sm:px-6 overflow-y-auto">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                              Theme
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                              {THEMES.map((t) => (
                                <button
                                  key={t.value}
                                  type="button"
                                  onClick={() => handleThemeChange(t.value)}
                                  className={`flex flex-col items-center p-3 rounded-lg border ${
                                    theme === t.value
                                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                  }`}
                                >
                                  <div
                                    className={`h-12 w-full rounded ${
                                      t.value === 'dark'
                                        ? 'bg-gray-800'
                                        : t.value === 'light'
                                        ? 'bg-white border border-gray-200'
                                        : 'bg-gradient-to-r from-white to-gray-800 border border-gray-200'
                                    }`}
                                  />
                                  <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                    {t.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                              Data Refresh Rate
                            </h3>
                            <div className="space-y-2">
                              {REFRESH_RATES.map((rate) => (
                                <div key={rate.value} className="flex items-center">
                                  <input
                                    id={`refresh-${rate.value}`}
                                    name="refresh-rate"
                                    type="radio"
                                    checked={refreshRate === rate.value}
                                    onChange={() => setRefreshRate(rate.value)}
                                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                                  />
                                  <label
                                    htmlFor={`refresh-${rate.value}`}
                                    className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                  >
                                    {rate.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                              About
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              E-Cell Dashboard v1.0.0
                              <br />
                              Made by Apaarshakti for E-Cell
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            onClick={() => setIsOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            onClick={() => {
                              // Save settings
                              setIsOpen(false);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SettingsPanel;
