import styled from 'styled-components';
import SubjectListGridSkeleton from './SubjectListGridSkeleton';
import { Suspense, lazy, useState, useEffect } from 'react';

const SubjectListArea = styled.section`
  margin: 0 auto 40px;
  width: 940px;

  @media screen and (min-width: 768px) and (max-width: 1199px) {
    margin: 0 32px 40px;
    width: auto;
  }

  @media screen and (min-width: 375px) and (max-width: 767px) {
    margin: 0 24px 60px;
    width: auto;
  }
`;

const SubjectListGrid = lazy(() => import('./SubjectListGrid'));

/**
 * 로딩 시간이 WAIT_TIME(단위: ms) 이상인 경우 skeleton UI를 보여주고 아닌 경우에 보여주지 않는 컴포넌트
 * @returns null 또는 Skeleton UI를 반환합니다.
 */
function DeferredComponent() {
  const [isDeferred, setIsDeferred] = useState(false);
  const WAIT_TIME = 200;

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsDeferred(true);
    }, WAIT_TIME);
    return () => clearInterval(timeOut);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <SubjectListGridSkeleton />;
}

function SubjectList({ sortBy }) {
  return (
    <SubjectListArea>
      <Suspense fallback={<DeferredComponent />}>
        <SubjectListGrid sortBy={sortBy} />
      </Suspense>
    </SubjectListArea>
  );
}

export default SubjectList;
