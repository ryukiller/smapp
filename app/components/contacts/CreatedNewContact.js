// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Button } from '/basicComponents';
import { smColors } from '/vars';
import type { Contact } from '/types';

const isDarkModeOn = localStorage.getItem('dmMode') === 'true';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 115px;
`;

const Header = styled.div`
  font-family: SourceCodeProBold;
  font-size: 16px;
  line-height: 22px;
  color: ${isDarkModeOn ? smColors.white : smColors.realBlack};
`;

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 75px;
  margin-bottom: 20px;
`;

const MainWrapperUpperPart = styled.div`
  position: absolute;
  top: 0;
  left: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 5px);
  padding: 10px 15px;
  background-color: ${isDarkModeOn ? smColors.white : smColors.black};
  z-index: 1;
`;

const MainWrapperLowerPart = styled.div`
  position: absolute;
  top: 5px;
  left: 0;
  width: calc(100% - 5px);
  height: 65px;
  border: 1px solid ${isDarkModeOn ? smColors.white : smColors.black};
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${smColors.white};
`;

type Props = {
  contact: Contact,
  action: () => void
};

class CreatedNewContact extends PureComponent<Props> {
  render() {
    const { contact, action } = this.props;
    return (
      <Wrapper>
        <Header>
          Create a new contact
          <br />
          --
        </Header>
        <MainWrapper>
          <MainWrapperUpperPart>
            <Text>{`"${contact.nickname}" contact created`}</Text>
            <Button onClick={action} text="SEND SMH" width={100} />
          </MainWrapperUpperPart>
          <MainWrapperLowerPart />
        </MainWrapper>
      </Wrapper>
    );
  }
}

export default CreatedNewContact;