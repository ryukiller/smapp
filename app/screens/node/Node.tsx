import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { SmesherIntro, SmesherLog } from '../../components/node';
import { WrapperWith2SideBars, Button, Link } from '../../basicComponents';
import { hideSmesherLeftPanel, setUiError } from '../../redux/ui/actions';
import { formatBytes, getFormattedTimestamp } from '../../infra/utils';
import {
  posIcon,
  posSmesher,
  posDirectoryWhite,
  pauseIcon,
  playIcon,
  walletSecond,
  posSmesherOrange,
} from '../../assets/images';
import { smColors } from '../../vars';
import { BITS, RootState } from '../../types';
import {
  HexString,
  NodeStatus,
  PostSetupState,
  RewardsInfo,
  Reward,
} from '../../../shared/types';
import { isWalletOnly } from '../../redux/wallet/selectors';
import * as SmesherSelectors from '../../redux/smesher/selectors';
import { pauseSmeshing, resumeSmeshing } from '../../redux/smesher/actions';
import SubHeader from '../../basicComponents/SubHeader';
import ErrorMessage from '../../basicComponents/ErrorMessage';
import { eventsService } from '../../infra/eventsService';
import { ExternalLinks, LOCAL_NODE_API_URL } from '../../../shared/constants';
import Address, { AddressType } from '../../components/common/Address';
import { AuthPath, MainPath } from '../../routerPaths';
import { getGenesisID } from '../../redux/network/selectors';
import {
  timestampByLayer,
  epochByLayer,
  nextEpochTime,
} from '../../../shared/layerUtils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.div`
  font-size: 15px;
  display: flex;
  line-height: 20px;
  color: ${({ theme }) => theme.color.contrast};
  &.progress {
    min-width: 170px;
  }
`;

const ProgressError = styled.div`
  color: ${smColors.red};
  font-size: 15px;
  display: flex;
  line-height: 20px;
  &.progress {
    min-width: 170px;
  }
`;

const BoldText = styled(Text)`
  font-weight: 800;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: flex-end;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: flex-start;
`;

const SmesherId = styled.span`
  display: inline-block;
  margin: 0 5px;
`;

const StatusSpan = styled.span<{ status?: NodeStatus | null }>`
  display: inline-block;
  color: ${({ status }) => (status ? smColors.green : smColors.orange)};
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-between;
  width: 100%;
`;

const TextWrapperFirst = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  justify-content: flex-start;
  width: 100%;
`;

const LineWrap = styled.div`
  position: relative;
  width: 100%;
  &:after {
    position: absolute;
    bottom: 5px;
    content: '';
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) =>
      theme.isDarkMode ? smColors.disabledGray10Alpha : smColors.black};
  }
`;

const PosSmesherIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const PosDirLink = styled.span`
  display: flex;
  cursor: pointer;

  &:hover span,
  &:focus span {
    text-decoration: none;
  }
`;

const PosFolderIcon = styled.img.attrs(
  ({
    theme: {
      icons: { posDirectory },
    },
  }) => ({
    src: posDirectory,
  })
)`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  cursor: pointer;
`;

const PathDir = styled.span`
  color: ${smColors.blue};
  text-decoration: underline;
  cursor: pointer;
`;

interface Props extends RouteComponentProps {
  location: {
    hash: string;
    pathname: string;
    search: string;
    state: { showIntro?: boolean };
  };
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
`;

const Icon = styled.img`
  display: flex;
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const IconSmesher = styled.img`
  display: flex;
  width: 40px;
  height: 25px;
  margin-right: 5px;
  color: ${smColors.darkOrange};
`;

const RowText = styled.div<{ weight: number }>`
  display: flex;
  font-size: 16px;
  font-weight: ${({ weight }) => weight};
  line-height: 20px;
  color: ${({ color }) => color};
`;

const BottomPart = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const BottomActionSection = styled.div`
  position: relative;
  display: flex;
`;

const ERR_MESSAGE_ERR_STATE =
  'PoS initialization failed. Try to delete it and re-initialize.';
const ERR_MESSAGE_NODE_ERROR =
  'The Node is not syncing. Please check the Network tab';
const getStatus = (
  state: PostSetupState,
  isPaused: boolean,
  rewards: Reward[],
  epoch: number,
  isNodeSynced: boolean
) => {
  switch (state) {
    case PostSetupState.STATE_IN_PROGRESS:
      return 'Creating PoS data';
    case PostSetupState.STATE_COMPLETE:
      // eslint-disable-next-line no-nested-ternary
      return rewards.length > 0 && epoch && isNodeSynced
        ? `Smeshing: epoch ${epoch}`
        : isNodeSynced
        ? 'Waiting for next epoch'
        : 'Syncing the Node';
    case PostSetupState.STATE_ERROR:
      return 'Error';
    case PostSetupState.STATE_PAUSED:
      return isPaused ? 'Paused creation PoS Data' : 'Not started';
    default:
    case PostSetupState.STATE_NOT_STARTED:
      return 'Waiting Node to sync';
  }
};

const SmesherStatus = ({
  smesherId,
  status,
  networkName,
}: {
  smesherId: HexString;
  status: NodeStatus | null;
  networkName: string;
}) => (
  <SubHeader>
    Smesher
    <SmesherId>
      <Address type={AddressType.SMESHER} address={smesherId} />
    </SmesherId>
    is&nbsp;
    <StatusSpan status={status}> {status ? 'ONLINE' : ' OFFLINE'} </StatusSpan>
    &nbsp;on {networkName}.
  </SubHeader>
);

const Node = ({ history, location }: Props) => {
  const [showIntro, setShowIntro] = useState(location?.state?.showIntro);

  const curNet = useSelector(getGenesisID);
  const status = useSelector((state: RootState) => state.node.status);
  const networkName = useSelector((state: RootState) => state.network.netName);
  const smesherId = useSelector((state: RootState) => state.smesher.smesherId);
  const coinbase = useSelector((state: RootState) => state.smesher.coinbase);
  const posDataPath = useSelector((state: RootState) => state.smesher.dataDir);
  const smesherConfig = useSelector((state: RootState) => state.smesher.config);
  const maxFileSize = useSelector(
    (state: RootState) => state.smesher.maxFileSize
  );

  const rewards = useSelector((state: RootState) =>
    state.smesher.rewards.slice(0).reverse()
  );
  const rewardsInfo = useSelector(
    (state: RootState) => state.smesher.rewardsInfo
  );
  const genesisTime = useSelector(
    (state: RootState) => state.network.genesisTime
  );
  const layerDurationSec = useSelector(
    (state: RootState) => state.network.layerDurationSec
  );
  const layersPerEpoch = useSelector(
    (state: RootState) => state.network.layersPerEpoch
  );

  const getEpochByLayer = epochByLayer(layersPerEpoch);
  const getTimestampByLayer = timestampByLayer(genesisTime, layerDurationSec);
  const getNextEpochTime = nextEpochTime(
    genesisTime,
    layerDurationSec,
    layersPerEpoch
  );
  const currentEpoch = getEpochByLayer(status?.topLayer || 0);

  const commitmentSize = useSelector(
    (state: RootState) => state.smesher.commitmentSize
  );
  const isSmeshing = useSelector(SmesherSelectors.isSmeshing);
  const isCreatingPostData = useSelector(SmesherSelectors.isCreatingPostData);
  const isPausedSmeshing = useSelector(SmesherSelectors.isSmeshingPaused);
  const isErrorState = useSelector(SmesherSelectors.isErrorState);
  const nodeStatusError = useSelector(
    (state: RootState) => state.node.error?.msg || null
  );
  const isSmesherActive = isSmeshing || isCreatingPostData || isPausedSmeshing;
  const postSetupState = useSelector(
    (state: RootState) => state.smesher.postSetupState
  );
  const numLabelsWritten = useSelector(
    (state: RootState) => state.smesher.numLabelsWritten
  );
  // const rewards = useSelector((state: RootState) => state.smesher.rewards);
  // const rewardsAddress = useSelector((state: RootState) => state.node.rewardsAddress);
  const isWalletMode = useSelector(isWalletOnly);

  const dispatch = useDispatch();

  let smesherInitTimestamp = localStorage.getItem('smesherInitTimestamp');
  smesherInitTimestamp = smesherInitTimestamp
    ? getFormattedTimestamp(JSON.parse(smesherInitTimestamp))
    : '';
  let smesherSmeshingTimestamp = localStorage.getItem(
    'smesherSmeshingTimestamp'
  );
  smesherSmeshingTimestamp = smesherSmeshingTimestamp
    ? getFormattedTimestamp(JSON.parse(smesherSmeshingTimestamp))
    : '';

  type RowData = [string, string | JSX.Element];
  const renderTable = (data: RowData[]) =>
    data.map(([label, value], idx) => {
      return (
        <LineWrap key={`smeshing-status-${idx}`}>
          <TextWrapper>
            <Text>{label}</Text>
            <Text>{value}</Text>
          </TextWrapper>
        </LineWrap>
      );
    });

  const getTableData = (): RowData[] => {
    const progress =
      ((numLabelsWritten * smesherConfig.bitsPerLabel) /
        (BITS * commitmentSize)) *
      100;
    const progressRow: RowData[] = !isSmeshing
      ? [
          [
            'Progress',
            isErrorState ? (
              <ProgressError>STOPPED</ProgressError>
            ) : (
              <Text className="progress">
                {formatBytes(
                  (numLabelsWritten * smesherConfig.bitsPerLabel) / BITS
                )}{' '}
                / {formatBytes(commitmentSize)}, {progress.toFixed(2)}%
              </Text>
            ),
          ],
        ]
      : [];

    return [
      [
        'Smesher ID',
        <Address
          key="smesherId"
          type={AddressType.SMESHER}
          address={smesherId}
        />,
      ],
      [
        'Status',
        getStatus(
          postSetupState,
          isPausedSmeshing,
          rewards,
          getEpochByLayer(status?.topLayer || 0),
          status?.isSynced || false
        ),
      ],
      ['Current epoch', <>{currentEpoch}</>],
      [
        'Next epoch in',
        <>
          &#8776;
          {getFormattedTimestamp(getNextEpochTime(status?.topLayer || 0))}
        </>,
      ],
      ...progressRow,
      [
        'Data Directory',
        <PosDirLink
          onClick={() =>
            eventsService.showFileInFolder({ filePath: posDataPath })
          }
        >
          <PosFolderIcon />
          <PathDir>{posDataPath}</PathDir>
        </PosDirLink>,
      ],
      ['Data Size', formatBytes(commitmentSize)],
      ['Max File Size', formatBytes(maxFileSize)],
      [
        'Rewards Address',
        <Address
          key="smesherCoinbase"
          type={AddressType.ACCOUNT}
          address={coinbase}
        />,
      ],
    ];
  };

  const handlePauseSmeshing = () => dispatch(pauseSmeshing());
  const handleResumeSmeshing = () => dispatch(resumeSmeshing());
  const renderNodeDashboard = () => {
    // TODO: Refactor screen and Node Dashboard
    //       to avoid excessive re-rendering of the whole screen
    //       on each progress update, which causes blinking
    return (
      <>
        {isErrorState && (
          <ErrorMessage oneLine={false} align="right">
            {ERR_MESSAGE_ERR_STATE}
          </ErrorMessage>
        )}
        {nodeStatusError && (
          <ErrorMessage oneLine={false} align="right">
            {ERR_MESSAGE_NODE_ERROR}
          </ErrorMessage>
        )}
        {renderTable(getTableData())}
        <Footer>
          <FooterSection>
            <Button
              onClick={() =>
                history.push(MainPath.SmeshingSetup, { modifyPostData: true })
              }
              img={posDirectoryWhite}
              text="EDIT"
              isPrimary={false}
              style={{ marginRight: 15 }}
              imgPosition="before"
              width={180}
            />
            {postSetupState === PostSetupState.STATE_IN_PROGRESS && (
              <Button
                onClick={handlePauseSmeshing}
                text="PAUSE POST DATA GENERATION"
                img={pauseIcon}
                isPrimary={false}
                width={280}
                imgPosition="before"
              />
            )}
            {isPausedSmeshing && (
              <Button
                onClick={handleResumeSmeshing}
                text="RESUME SMESHING"
                img={playIcon}
                isPrimary
                width={280}
                imgPosition="before"
              />
            )}
          </FooterSection>
        </Footer>
      </>
    );
  };

  const buttonHandler = () => {
    dispatch(hideSmesherLeftPanel());
    history.push(MainPath.SmeshingSetup);
  };

  const renderMainSection = () => {
    if (showIntro) {
      return <SmesherIntro hideIntro={() => setShowIntro(false)} />;
    }
    if (!isSmesherActive && !isErrorState) {
      return (
        <>
          <SmesherStatus
            smesherId={smesherId}
            status={status}
            networkName={networkName}
          />
          <TextWrapperFirst>
            <PosSmesherIcon src={posSmesher} />
            <BoldText>Proof of Space Status</BoldText>
          </TextWrapperFirst>
          <Text>Proof of Space data is not setup yet</Text>
          <br />
          <BottomActionSection>
            <Button
              onClick={buttonHandler}
              text="SETUP PROOF OF SPACE"
              width={250}
            />
          </BottomActionSection>
        </>
      );
    }

    return renderNodeDashboard();
  };

  const navigateToExplanation = () => window.open(ExternalLinks.SetupGuide);

  const handleSetupSmesher = () => {
    eventsService.switchApiProvider(LOCAL_NODE_API_URL, curNet).catch((err) => {
      console.error(err); // eslint-disable-line no-console
      dispatch(setUiError(err));
    });

    history.push(AuthPath.Unlock, { redirect: MainPath.Smeshing });
  };

  const renderWalletOnlyMode = () => {
    return (
      <>
        <Row>
          <RowText color={smColors.purple} weight={700}>
            <Icon src={walletSecond} /> Your app is currently in wallet-only
            mode and smeshing is not set up.
          </RowText>
        </Row>
        <Row>
          <RowText color={smColors.darkOrange} weight={400}>
            <IconSmesher src={posSmesherOrange} />
            Click on the setup semsher button below to start using a local
            managed full Spacemesh p2p node and to smesh.
          </RowText>
        </Row>
        <BottomPart>
          <Link onClick={navigateToExplanation} text="SMESHER GUIDE" />
          <Button
            width={120}
            onClick={handleSetupSmesher}
            text="SETUP SMESHER"
          />
        </BottomPart>
      </>
    );
  };

  return (
    <Wrapper>
      <WrapperWith2SideBars
        width={650}
        height={450}
        header="SMESHER"
        headerIcon={posIcon}
      >
        {isWalletMode ? renderWalletOnlyMode() : renderMainSection()}
      </WrapperWith2SideBars>
      <SmesherLog
        rewards={rewards}
        rewardsInfo={rewardsInfo as RewardsInfo}
        initTimestamp={smesherInitTimestamp}
        smeshingTimestamp={smesherSmeshingTimestamp}
        epochByLayer={getEpochByLayer}
        timestampByLayer={getTimestampByLayer}
      />
    </Wrapper>
  );
};

export default Node;
