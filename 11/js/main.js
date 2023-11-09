import {renderPictures} from './pictures.js';
import './form.js';
import { getData } from './server.js';

getData().then((photos) => renderPictures(photos));
