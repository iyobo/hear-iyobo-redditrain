import path from 'path';
import fs from 'fs';

export enum EWorker {
  TweetProcessor = "TweetProcessorWorker"
}

/**
 * This is to work around the fact that Node's worker thread's do not support loading typescript files.
 * This is a sync call so use only when determining worker paths during initialization.
 * If you need to use this beyond initialization, consider making an async version of this.
 * @param path
 */
export function getWorkerPathSync(worker: EWorker): string | undefined {
  // if file path does not exist as is, then
  const distPath = path.join(__dirname, '..', '..', 'dist', 'workers', worker + '.js');
  const localPath = path.join(__dirname, '..', 'workers', worker + '.js');

  if (fs.existsSync(localPath)) return localPath;
  else if (fs.existsSync(distPath)) return distPath;
  else return undefined;
}

export function getDomain(urlPath) {
  let url;
  try {
    url = new URL(urlPath);
  } catch (err) {
    //ignore
    console.error('could not process url', urlPath)
  }
  return url?.hostname;
}

/**
 * FIXME: This is a limited image url checker. It could be expanded to identify more image sources.
 * @param url
 */
export function isImageUrl(url){
  const domain = getDomain(url);

  return domain.includes('pic.twitter.com') || domain.includes('instagram.com')
}

