import { useEffect, useState, createContext, useContext } from 'react';

const DarkModeContext = createContext();

/**
 * 사용자의 이전 테마 설정 또는 시스템 테마 설정을 가져오는 함수
 * @returns {boolean} 사용자의 이전 테마 설정 또는 시스템 테마 설정이 다크모드인지?
 */
const getIsDarkMode = () => {
  const isDarkMode = localStorage.getItem('isDarkMode');

  if (isDarkMode === null) {
    // 지정해둔 themeStorage가 없다면 사용자 시스템 설정을 가져옴
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  return isDarkMode === 'true';
};

/**
 * DarkModeContext.Provider를 반환하는 컴포넌트
 * @param {ReactNode} children
 */
export default function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode());

  const toggleDarkMode = () => {
    setIsDarkMode(prevState => !prevState);
  };

  useEffect(() => {
    // 다크 모드를 토글하고 로컬 스토리지에 상태를 저장
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}

/**
 * DarkModeContext에서 isDarkMode 꺼내는 훅
 * @returns {boolean} isDarkMode 사용자의 이전 테마 설정 또는 시스템 테마 설정이 다크모드인지?
 */
export const useIsDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error('반드시 DarkModeProvider 안에서 사용해야 합니다.');
  }

  return context.isDarkMode;
};

/**
 * DarkModeContext 에서 toggleDarkMode 함수를 꺼내는 훅
 * @returns {Function} toggleDarkMode 테마 설정을 바꾸는 함수
 */
export const useToggleDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error('반드시 DarkModeProvider 안에서 사용해야 합니다.');
  }

  return context.toggleDarkMode;
};
