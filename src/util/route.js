import { hashHistory } from 'react-router';

export let routeTo = (route: string) => {
  hashHistory.push(route);
};
