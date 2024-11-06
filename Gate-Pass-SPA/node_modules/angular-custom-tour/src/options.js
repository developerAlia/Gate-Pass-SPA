"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variables_1 = require("./variables");
var HintOptions = /** @class */ (function () {
    function HintOptions() {
        this.elementsDisabled = true;
        this.defaultPosition = variables_1.HintConfig.DEFAULT_POSITION;
        this.defaultOrder = variables_1.HintConfig.DEFAULT_ORDER;
        this.defaultLayer = variables_1.HintConfig.DEFAULT_PX_LAYER;
        this.applyRelative = variables_1.HintConfig.APPLY_RELATIVE;
        this.stepTag = variables_1.HintConfig.HINT_TAG;
        this.dismissOnOverlay = variables_1.HintConfig.DISMISS_ON_OVERLAY;
    }
    return HintOptions;
}());
exports.HintOptions = HintOptions;
//# sourceMappingURL=options.js.map