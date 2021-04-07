const ipcConsts = {
  PRINT: 'PRINT',
  RELOAD_APP: 'RELOAD_APP',
  TOGGLE_AUTO_START: 'TOGGLE_AUTO_START',
  IS_AUTO_START_ENABLED_REQUEST: 'IS_AUTO_START_ENABLED_REQUEST',
  SET_NODE_PORT: 'SET_NODE_PORT',
  // Theme
  GET_OS_THEME_COLOR: 'GET_OS_THEME_COLOR',
  OPEN_BROWSER_VIEW: 'OPEN_BROWSER_VIEW',
  DESTROY_BROWSER_VIEW: 'DESTROY_BROWSER_VIEW',
  SEND_THEME_COLOR: 'SEND_THEME_COLOR',

  // Other
  OPEN_EXTERNAL_LINK: 'OPEN_EXTERNAL_LINK',
  OPEN_EXPLORER_LINK: 'OPEN_EXPLORER_LINK',
  /** *********************************************************************** API 2.0 ********************************************************** */
  // Services activation calls
  START_SMESHER_SERVICE: 'START_SMESHER_SERVICE',
  // Smesher Service calls
  SMESHER_GET_SETTINGS: 'SMESHER_GET_SETTINGS',
  SMESHER_SELECT_POST_FOLDER: 'SMESHER_SELECT_POST_FOLDER',
  SMESHER_CHECK_FREE_SPACE: 'SMESHER_CHECK_FREE_SPACE',
  SMESHER_IS_SMESHING: 'SMESHER_IS_SMESHING',
  SMESHER_START_SMESHING: 'SMESHER_START_SMESHING',
  SMESHER_STOP_SMESHING: 'SMESHER_STOP_SMESHING',
  SMESHER_GET_SMESHER_ID: 'SMESHER_GET_SMESHER_ID',
  SMESHER_GET_COINBASE: 'SMESHER_GET_COINBASE',
  SMESHER_SET_COINBASE: 'SMESHER_SET_COINBASE',
  SMESHER_GET_MIN_GAS: 'SMESHER_GET_MIN_GAS',
  SMESHER_GET_ESTIMATED_REWARDS: 'SMESHER_GET_ESTIMATED_REWARDS',
  SMESHER_GET_POST_STATUS: 'SMESHER_GET_POST_STATUS',
  SMESHER_GET_POST_COMPUTE_PROVIDERS: 'SMESHER_GET_POST_COMPUTE_PROVIDERS',
  SMESHER_CREATE_POST_DATA: 'SMESHER_CREATE_POST_DATA',
  SMESHER_STOP_POST_DATA_CREATION: 'SMESHER_STOP_POST_DATA_CREATION',
  SMESHER_POST_DATA_CREATION_PROGRESS: 'SMESHER_POST_DATA_CREATION_PROGRESS',
  // Wallet Manager
  W_M_ACTIVATE: 'W_M_ACTIVATE',
  W_M_GET_NETWORK_DEFINITIONS: 'W_M_GET_NETWORK_DEFINITIONS',
  W_M_GET_GLOBAL_STATE_HASH: 'W_M_GET_GLOBAL_STATE_HASH',
  W_M_GET_CURRENT_LAYER: 'W_M_GET_CURRENT_LAYER',
  W_M_CREATE_WALLET: 'W_M_CREATE_WALLET',
  W_M_UNLOCK_WALLET: 'W_M_UNLOCK_WALLET',
  W_M_COPY_FILE: 'W_M_COPY_FILE',
  W_M_UPDATE_WALLET: 'W_M_UPDATE_WALLET',
  W_M_CREATE_NEW_ACCOUNT: 'W_M_CREATE_NEW_ACCOUNT',
  W_M_READ_WALLET_FILES: 'W_M_READ_WALLET_FILES',
  W_M_SHOW_FILE_IN_FOLDER: 'W_M_SHOW_FILE_IN_FOLDER',
  W_M_SHOW_DELETE_FILE: 'W_M_SHOW_DELETE_FILE',
  W_M_WIPE_OUT: 'W_M_WIPE_OUT',
  W_M_SIGN_MESSAGE: 'W_M_SIGN_MESSAGE',
  W_M_GET_GET_ACCOUNT_REWARDS: 'W_M_GET_GET_ACCOUNT_REWARDS',
  W_M_SEND_TX: 'W_M_SEND_TX',
  W_M_UPDATE_TX: 'W_M_UPDATE_TX',
  // Transactions Manager
  T_M_UPDATE_ACCOUNT: 'T_M_UPDATE_ACCOUNT',
  T_M_UPDATE_TXS: 'T_M_UPDATE_TXS',
  T_M_UPDATE_REWARDS: 'T_M_UPDATE_REWARDS',
  // Node Manager
  N_M_ACTIVATE_NODE: 'N_M_ACTIVATE_NODE',
  N_M_GET_VERSION_AND_BUILD: 'N_M_GET_VERSION_AND_BUILD',
  N_M_SET_NODE_STATUS: 'N_M_SET_NODE_STATUS',
  N_M_SET_NODE_ERROR: 'N_M_SET_NODE_ERROR'
};

export default ipcConsts;
