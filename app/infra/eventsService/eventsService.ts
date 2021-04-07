import { ipcRenderer } from 'electron';
import { ipcConsts } from '../../vars';
import { Tx } from '../../types';
import { setNodeError, setNodeStatus } from '../../redux/node/actions';
import { updateAccountData, setTransactions } from '../../redux/wallet/actions';
import { setRewards } from '../../redux/smesher/actions';
import store from '../../redux/store';

class EventsService {
  static createWallet = ({ password, existingMnemonic, ip, port }: { password: string; existingMnemonic: string; ip?: string; port?: string }) =>
    ipcRenderer.invoke(ipcConsts.W_M_CREATE_WALLET, { password, existingMnemonic, ip, port });

  static readWalletFiles = () => ipcRenderer.invoke(ipcConsts.W_M_READ_WALLET_FILES);

  static getOsThemeColor = () => ipcRenderer.invoke(ipcConsts.GET_OS_THEME_COLOR);

  static openBrowserView = () => ipcRenderer.send(ipcConsts.OPEN_BROWSER_VIEW);

  static openExternalLink = ({ link }: { link: string }) => ipcRenderer.send(ipcConsts.OPEN_EXTERNAL_LINK, { link });

  static openExplorerLink = ({ uri }: { uri: string }) => ipcRenderer.send(ipcConsts.OPEN_EXPLORER_LINK, { uri });

  static updateBrowserViewTheme = ({ isDarkMode }: { isDarkMode: boolean }) => ipcRenderer.send(ipcConsts.SEND_THEME_COLOR, { isDarkMode });

  static destroyBrowserView = () => ipcRenderer.send(ipcConsts.DESTROY_BROWSER_VIEW);

  static unlockWallet = ({ path, password }: { path: string; password: string }) => ipcRenderer.invoke(ipcConsts.W_M_UNLOCK_WALLET, { path, password });

  static updateWalletFile = ({ fileName, password, data }: { fileName: string; password?: string; data: any }) =>
    ipcRenderer.send(ipcConsts.W_M_UPDATE_WALLET, { fileName, password, data });

  static createNewAccount = ({ fileName, password }: { fileName: string; password: string }) => ipcRenderer.invoke(ipcConsts.W_M_CREATE_NEW_ACCOUNT, { fileName, password });

  static copyFile = ({ filePath, copyToDocuments }: { filePath: string; copyToDocuments?: boolean }) => ipcRenderer.invoke(ipcConsts.W_M_COPY_FILE, { filePath, copyToDocuments });

  static showFileInFolder = ({ isBackupFile, isLogFile }: { isBackupFile?: boolean; isLogFile?: boolean }) =>
    ipcRenderer.send(ipcConsts.W_M_SHOW_FILE_IN_FOLDER, { isBackupFile, isLogFile });

  static deleteWalletFile = ({ fileName }: { fileName: string }) => ipcRenderer.send(ipcConsts.W_M_SHOW_DELETE_FILE, { fileName });

  static wipeOut = () => ipcRenderer.send(ipcConsts.W_M_WIPE_OUT);

  /** ************************************   SMESHER   ****************************************** */
  static getSmesherSettings = () => ipcRenderer.invoke(ipcConsts.SMESHER_GET_SETTINGS);

  static selectPostFolder = () => ipcRenderer.invoke(ipcConsts.SMESHER_SELECT_POST_FOLDER);

  static checkFreeSpace = ({ dataDir }: { dataDir: string }) => ipcRenderer.invoke(ipcConsts.SMESHER_CHECK_FREE_SPACE, { dataDir });

  static getEstimatedRewards = () => ipcRenderer.invoke(ipcConsts.SMESHER_GET_ESTIMATED_REWARDS);

  static getPostComputeProviders = () => ipcRenderer.invoke(ipcConsts.SMESHER_GET_POST_COMPUTE_PROVIDERS);

  static createPosData = ({
    coinbase,
    dataDir,
    commitmentSize,
    append,
    throttle,
    providerId
  }: {
    coinbase: string;
    dataDir: string;
    commitmentSize: number;
    append: boolean;
    throttle: boolean;
    providerId: number;
  }) => ipcRenderer.invoke(ipcConsts.SMESHER_CREATE_POST_DATA, { coinbase, dataDir, commitmentSize, append, throttle, providerId });

  static getPostStatus = () => ipcRenderer.invoke(ipcConsts.SMESHER_GET_POST_STATUS);

  static stopCreatingPosData = ({ deleteFiles }: { deleteFiles: boolean }) => ipcRenderer.invoke(ipcConsts.SMESHER_STOP_POST_DATA_CREATION, { deleteFiles });

  static isSmeshing = () => ipcRenderer.invoke(ipcConsts.SMESHER_IS_SMESHING);

  static stopSmeshing = ({ deleteFiles }: { deleteFiles: boolean }) => ipcRenderer.invoke(ipcConsts.SMESHER_STOP_SMESHING, { deleteFiles });

  /** **********************************   TRANSACTIONS   ************************************** */

  static sendTx = ({ fullTx, accountIndex }: { fullTx: Tx; accountIndex: number }) => ipcRenderer.invoke(ipcConsts.W_M_SEND_TX, { fullTx, accountIndex });

  static updateTransaction = ({ newData, accountIndex, txId }: { newData: any; accountIndex: number; txId?: string }) =>
    ipcRenderer.invoke(ipcConsts.W_M_UPDATE_TX, { newData, accountIndex, txId });

  /** ************************************   AUTOSTART   ************************************** */

  static isAutoStartEnabled = () => ipcRenderer.invoke(ipcConsts.IS_AUTO_START_ENABLED_REQUEST);

  static toggleAutoStart = () => ipcRenderer.send(ipcConsts.TOGGLE_AUTO_START);

  /** **************************************   MISC   ***************************************** */

  static reloadApp = () => ipcRenderer.send(ipcConsts.RELOAD_APP);

  static print = ({ content }: { content: string }) => ipcRenderer.send(ipcConsts.PRINT, { content });

  static signMessage = ({ message, accountIndex }: { message: string; accountIndex: number }) => ipcRenderer.invoke(ipcConsts.W_M_SIGN_MESSAGE, { message, accountIndex });

  /** **************************************  WALLET MANAGER  **************************************** */

  static activateWalletManager = ({ url, port }: { url: string; port: string }) => ipcRenderer.invoke(ipcConsts.W_M_ACTIVATE, { url, port });

  static getNetworkDefinitions = () => ipcRenderer.invoke(ipcConsts.W_M_GET_NETWORK_DEFINITIONS);

  static getCurrentLayer = () => ipcRenderer.invoke(ipcConsts.W_M_GET_CURRENT_LAYER);

  static getGlobalStateHash = () => ipcRenderer.invoke(ipcConsts.W_M_GET_GLOBAL_STATE_HASH);

  /** **************************************  NODE MANAGER  **************************************** */

  static activateNodeManager = () => ipcRenderer.send(ipcConsts.N_M_ACTIVATE_NODE);

  static getVersionAndBuild = () => ipcRenderer.invoke(ipcConsts.N_M_GET_VERSION_AND_BUILD);

  static setPort = ({ port }: { port: string }) => ipcRenderer.send(ipcConsts.SET_NODE_PORT, { port });
}

ipcRenderer.on(ipcConsts.N_M_SET_NODE_STATUS, (_event, request) => {
  store.dispatch(setNodeStatus({ status: request.status }));
});

ipcRenderer.on(ipcConsts.N_M_SET_NODE_ERROR, (_event, request) => {
  store.dispatch(setNodeError({ error: request.error }));
});

ipcRenderer.on(ipcConsts.T_M_UPDATE_ACCOUNT, (_event, request) => {
  store.dispatch(updateAccountData({ account: request.account }));
});

ipcRenderer.on(ipcConsts.T_M_UPDATE_TXS, (_event, request) => {
  store.dispatch(setTransactions({ txs: request.data }));
});

ipcRenderer.on(ipcConsts.T_M_UPDATE_REWARDS, (_event, request) => {
  store.dispatch(setRewards({ rewards: request.rewards }));
});

export default EventsService;
