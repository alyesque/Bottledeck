import W from "./images/whitemana.png";
import R from "./images/redmana.png";
import G from "./images/greenmana.png";
import U from "./images/bluemana.png";
import B from "./images/blackmana.png";
import C0 from "./images/zeromana.png";
import CX from "./images/xmana.png";
import C1 from "./images/onemana.png";
import C2 from "./images/twomana.png";
import C3 from "./images/threemana.png";
import C4 from "./images/fourmana.png";
import C5 from "./images/fivemana.png";
import C6 from "./images/sixmana.png";
import C7 from "./images/sevenmana.png";
import C8 from "./images/eightmana.png";
import C9 from "./images/9.png";
import C10 from "./images/tenmana.png";
import C11 from "./images/c11.png";
import C12 from "./images/twelvemana.png";
import C13 from "./images/c13.png";
import C15 from "./images/fifteenmana.png";
import C16 from "./images/c16.png";
import BU from "./images/blackbluemana.png";
import BG from "./images/blackgreenmana.png";
import BR from "./images/blackredmana.png";
import UG from "./images/bluegreenmana.png";
import UW from "./images/bluewhitemana.png";
import UR from "./images/blueredmana.png";
import GW from "./images/greenwhitemana.png";
import RG from "./images/redgreenmana.png";
import WB from "./images/whiteblackmana.png";
import WR from "./images/whiteredmana.png";
import RP from "./images/redphyrexianmana.png";
import GP from "./images/greenphyrexianmana.png";
import WP from "./images/whitephyrexianmana.png";
import UP from "./images/bluephyrexianmana.png";
import BP from "./images/blackphyrexianmana.png";
import B2 from "./images/twoblackmana.png";
import U2 from "./images/twobluemana.png";
import G2 from "./images/twogreenmana.png";
import R2 from "./images/tworedmana.png";
import W2 from "./images/twowhitemana.png";
import C from "./images/colorless.png";
import T from "./images/tap.png";

function parseColor(x) {
  if (x === "W") {
    return W;
  } else if (x === "B") {
    return B;
  } else if (x === "G") {
    return G;
  } else if (x === "R") {
    return R;
  } else if (x === "U") {
    return U;
  } else if (x === "{W}") {
    return W;
  } else if (x === "{B}") {
    return B;
  } else if (x === "{G}") {
    return G;
  } else if (x === "{R}") {
    return R;
  } else if (x === "{U}") {
    return U;
  } else if (x === "{0}") {
    return C0;
  } else if (x === "{1}") {
    return C1;
  } else if (x === "{2}") {
    return C2;
  } else if (x === "{3}") {
    return C3;
  } else if (x === "{4}") {
    return C4;
  } else if (x === "{5}") {
    return C5;
  } else if (x === "{6}") {
    return C6;
  } else if (x === "{7}") {
    return C7;
  } else if (x === "{8}") {
    return C8;
  } else if (x === "{9}") {
    return C9;
  } else if (x === "{10}") {
    return C10;
  } else if (x === "{11}") {
    return C11;
  } else if (x === "{12}") {
    return C12;
  } else if (x === "{13}") {
    return C13;
  } else if (x === "{15}") {
    return C15;
  } else if (x === "{16}") {
    return C16;
  } else if (x === "{X}") {
    return CX;
  } else if (x === "{B/P}") {
    return BP;
  } else if (x === "{W/P}") {
    return WP;
  } else if (x === "{U/P}") {
    return UP;
  } else if (x === "{G/P}") {
    return GP;
  } else if (x === "{R/P}") {
    return RP;
  } else if (x === "{U/B}") {
    return BU;
  } else if (x === "{B/G}") {
    return BG;
  } else if (x === "{B/R}") {
    return BR;
  } else if (x === "{G/U}") {
    return UG;
  } else if (x === "{W/U}") {
    return UW;
  } else if (x === "{U/R}") {
    return UR;
  } else if (x === "{G/W}") {
    return GW;
  } else if (x === "{R/G}") {
    return RG;
  } else if (x === "{W/R}") {
    return WR;
  } else if (x === "{R/W}") {
    return WR;
  } else if (x === "{W/B}") {
    return WB;
  } else if (x === "{W/U}") {
    return UW;
  } else if (x === "{2/R}") {
    return R2;
  } else if (x === "{2/W}") {
    return W2;
  } else if (x === "{2/G}") {
    return G2;
  } else if (x === "{2/B}") {
    return B2;
  } else if (x === "{2/U}") {
    return U2;
  } else if (x === "{C}") {
    return C;
  } else if (x === "{T}") {
    return T;
  } else {
    let array = [];
    return array;
  }
}

export default parseColor;
