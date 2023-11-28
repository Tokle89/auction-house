import "../scss/styles.scss";
// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";
import { renderCards } from "./render/render.js";
import { renderCarousel } from "./render/render.js";

import * as url from "./api/constant.js";

renderCards(url.BASE + url.LISTINGS + url.listingsParams);
renderCarousel(url.BASE + url.LISTINGS + url.listingsParams);
