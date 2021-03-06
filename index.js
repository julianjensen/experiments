/** ******************************************************************************************************************
 * @file Description of file here.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date Thu Apr 05 2018
 *********************************************************************************************************************/
"use strict";

import functional_test from "./functional/test";
import matcher_test from "./matcher/test";
import observable_test from "./observable/index";

functional_test();
matcher_test();
observable_test();

module.exports = () => {};
