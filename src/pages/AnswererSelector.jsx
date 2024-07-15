import styled from 'styled-components';
import Header from '../components/AnswererSelector/Header';

import DropdownBox from '../components/@shared/DropdownBox';
import editImgUrl from '../assets/images/Edit.png';

const StyledAnswererSelectorPageContainer = styled.div`
  margin: 40px auto 100px;
  width: 1200px;

  @media screen and (min-width: 768px) and (max-width: 1199px) {
    margin: 40px 0 90px;
    width: auto;
  }

  @media screen and (min-width: 375px) and (max-width: 767px) {
    margin: 40px 0 40px;
    width: auto;
  }
`;

const itemList = {
  itemNameList: ['수정', '최신순'],
  itemImgList: [editImgUrl, editImgUrl],
};

function AnswererSelector() {
  return (
    <StyledAnswererSelectorPageContainer>
      <Header />
      <DropdownBox isDropdownVisible={true} minWidth="80px" itemList={itemList} currentItem="최신순" />
    </StyledAnswererSelectorPageContainer>
  );
}

export default AnswererSelector;
