import { GITHUB_USER, GITHUB_REPO } from '../config';

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com';
const BRANCH = 'master';

export function getGithubContentURL(event: FetchEvent, path: string = ''): string {
  return `${GITHUB_RAW_URL}/${getGithubUser(event)}/${getGithubWorkingRepo(
    event,
  )}/${BRANCH}/${path}`;
}

export function getGithubUser(event: FetchEvent): string {
  const headers = event.request.headers;
  const user = headers.get('github-user') || GITHUB_USER;

  return user;
}

export function getGithubWorkingRepo(event: FetchEvent): string {
  const headers = event.request.headers;
  const repo = headers.get('working-repo') || GITHUB_REPO;

  return repo;
}
