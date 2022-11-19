import { all } from 'redux-saga/effects';
import { watcherHangBanTraLai } from '../controllers/watcher/watcherHangBanTraLai';


export default function* rootWatcher() {
    yield all([
        watcherHangBanTraLai(),

    ])
}