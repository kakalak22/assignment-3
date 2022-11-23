import { all } from 'redux-saga/effects';
import { watcherHangBanTraLai } from '../controllers/watcher/watcherHangBanTraLai';
import { watcherSearch } from '../controllers/watcher/watcherSearch';


export default function* rootWatcher() {
    yield all([
        watcherHangBanTraLai(),
        watcherSearch()
    ])
}