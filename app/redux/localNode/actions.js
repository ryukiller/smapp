// @flow
import { diskStorageService } from '/infra/diskStorageService';
import { httpService } from '/infra/httpService';
import { Action, Dispatch } from '/types';

export const SET_ALLOCATION: string = 'SET_ALLOCATION';
export const GET_DRIVES_LIST: string = 'GET_DRIVES_LIST';
export const RESET_NODE_SETTINGS: string = 'RESET_NODE_SETTINGS';
export const SET_LOCAL_NODE_SETUP_PROGRESS: string = 'SET_LOCAL_NODE_SETUP_PROGRESS';
export const SET_TOTAL_EARNINGS: string = 'SET_TOTAL_EARNINGS';
export const SET_UPCOMING_EARNINGS: string = 'SET_UPCOMING_EARNINGS';
export const SET_AWARDS_ADDRESS: string = 'SET_AWARDS_ADDRESS';

export const getDrivesList = (): Action => async (dispatch: Dispatch): Dispatch => {
  try {
    const drives = await diskStorageService.getDriveList();
    dispatch({ type: GET_DRIVES_LIST, payload: { drives } });
  } catch (err) {
    dispatch({ type: GET_DRIVES_LIST, payload: { drives: [] } });
    throw err;
  }
};

export const resetNodeSettings = (): Action => ({ type: RESET_NODE_SETTINGS });

export const getLocalNodeSetupProgress = (): Action => async (dispatch: Dispatch): Dispatch => {
  try {
    const progress = await httpService.getLocalNodeSetupProgress();
    dispatch({ type: SET_LOCAL_NODE_SETUP_PROGRESS, payload: { progress } });
  } catch (err) {
    dispatch({ type: SET_LOCAL_NODE_SETUP_PROGRESS, payload: { progress: null } });
    throw err;
  }
};

export const getTotalEarnings = (): Action => async (dispatch: Dispatch): Dispatch => {
  try {
    const totalEarnings = await httpService.getTotalEarnings();
    dispatch({ type: SET_TOTAL_EARNINGS, payload: { totalEarnings } });
  } catch (err) {
    dispatch({ type: SET_TOTAL_EARNINGS, payload: { progress: null } });
    throw err;
  }
};

export const getUpcomingEarnings = (): Action => async (dispatch: Dispatch): Dispatch => {
  try {
    const upcomingEarnings = await httpService.getUpcomingEarnings();
    dispatch({ type: SET_UPCOMING_EARNINGS, payload: { upcomingEarnings } });
  } catch (err) {
    dispatch({ type: SET_UPCOMING_EARNINGS, payload: { progress: null } });
    throw err;
  }
};

export const setLocalNodeStorage = ({ capacity, drive }: { capacity: { id: number, label: string }, drive: { id: number, label: string } }): Action => async (
  dispatch: Dispatch
): Dispatch => {
  try {
    const commitmentSize = Math.floor(capacity.id / 1048576); // Bytes to MB
    const logicalDrive = drive.label;
    await httpService.setCommitmentSize({ commitmentSize });
    await httpService.setLogicalDrive({ logicalDrive });
    dispatch({ type: SET_ALLOCATION, payload: { capacity, drive } });
  } catch (err) {
    throw err;
  }
};

export const setAwardsAddress = ({ awardsAddress }: { awardsAddress: string }): Action => async (dispatch: Dispatch): Dispatch => {
  try {
    await httpService.setAwardsAddress({ awardsAddress });
    dispatch({ type: SET_AWARDS_ADDRESS, payload: { awardsAddress } });
  } catch (err) {
    throw err;
  }
};