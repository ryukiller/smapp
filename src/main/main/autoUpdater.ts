import { BrowserWindow, Notification } from 'electron';
import { ProgressInfo } from 'builder-util-runtime';
import { autoUpdater, UpdateInfo } from 'electron-updater';
import logger from 'electron-log';
import { SemVer } from 'semver';
import { Subject } from 'rxjs';

import pkg from '../../../package.json';
import { ipcConsts } from '../../renderer/vars';
import { isDev, isNetError } from '../utils';
import { Network } from '../../shared/types';

autoUpdater.logger = logger;
// @TODO move to create window file
// autoUpdater.checkForUpdatesAndNotify();

// IPC

const notify = <T extends unknown>(channel: ipcConsts) => (
  mainWindow: BrowserWindow,
  info: T
) => {
  if (mainWindow) {
    mainWindow.webContents.send(channel, info);
    return true;
  } else return false;
};

export const notifyUpdateAvailble = notify<UpdateInfo>(ipcConsts.AU_AVAILABLE);
export const notifyDownloadProgress = notify<ProgressInfo>(
  ipcConsts.AU_DOWNLOAD_PROGRESS
);
export const notifyUpdateDownloaded = notify<UpdateInfo>(
  ipcConsts.AU_DOWNLOAD_COMPLETE
);
export const notifyDownloadStarted = notify<void>(
  ipcConsts.AU_DOWNLOAD_STARTED
);
export const notifyError = notify<Error>(ipcConsts.AU_ERROR);

// Utils
const getCurrentVersion = () =>
  isDev() ? new SemVer(pkg.version) : autoUpdater.currentVersion;

//

export const checkUpdates = async (
  mainWindow: BrowserWindow,
  currentNetwork: Network,
  autoDownload = false
) => {
  const currentVersion = getCurrentVersion();
  const { latestSmappRelease, smappBaseDownloadUrl } = currentNetwork;
  const isEqualVersion = currentVersion.compare(latestSmappRelease) === 0;
  // TODO: isOutdatedVersion is useless until we don't have a special handling for it
  // const isOutdatedVersion = currentVersion.compare(minSmappRelease) === -1;
  if (!isEqualVersion) {
    autoUpdater.allowDowngrade = true;
    autoUpdater.autoDownload = autoDownload;
    const feedUrl = `${smappBaseDownloadUrl}/v${latestSmappRelease}`;
    autoUpdater.setFeedURL(feedUrl);
    try {
      const result = await autoUpdater.checkForUpdates();
      if (!result) return null;
      const { updateInfo } = result;
      return updateInfo;
    } catch (err) {
      if (err instanceof Error && !isNetError(err)) {
        notifyError(mainWindow, err as Error);
      }
      return null;
    }
  }

  return null;
};

export const installUpdate = () => autoUpdater.quitAndInstall();
export const subscribe = (
  mainWindow: BrowserWindow,
  $downloaded: Subject<UpdateInfo>
) => {
  autoUpdater.on('update-available', (info) => {
    logger.log('update-available', info);
    notifyUpdateAvailble(mainWindow, info);

    if (mainWindow.isMinimized()) {
      const currentVersion = getCurrentVersion();
      const notification = new Notification({
        title: `New version ${info.version} is available!`,
        subtitle: `Current version: ${currentVersion.format()}`,
        body: 'Open Smapp to install update.',
      });
      notification.on('click', () => {
        mainWindow.show();
        notification.close();
      });
      notification.show();
    }
  });
  autoUpdater.on('download-progress', (info: ProgressInfo) => {
    logger.debug('download-progress', info);
    notifyDownloadProgress(mainWindow, info);
  });
  autoUpdater.on('update-downloaded', (info: UpdateInfo) => {
    logger.log('update-downloaded', info);
    autoUpdater.autoInstallOnAppQuit = true;
    notifyUpdateDownloaded(mainWindow, info);
    $downloaded.next(info);
  });
  autoUpdater.on('error', (err: Error) => {
    if (!isNetError(err)) {
      logger.error('update-error', err);
      notifyError(mainWindow, err);
    } else {
      logger.debug('update-error NetError:', err);
    }
  });
};

export const unsubscribe = () => autoUpdater.removeAllListeners();
