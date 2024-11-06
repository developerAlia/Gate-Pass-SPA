import { HintService } from './hint.service';
export declare class HintComponent {
    hintService: HintService;
    show: boolean;
    constructor(hintService: HintService);
    dismiss(): void;
}
