import { OnInit } from '@angular/core';
import { HintService } from '../hint.service';
export declare class TourComponent implements OnInit {
    hintService: HintService;
    title: string;
    selector: string;
    order: number;
    position: string;
    customCss: string;
    showme: boolean;
    hasNext: boolean;
    hasPrev: boolean;
    topPos: number;
    leftPos: number;
    transformClass: string;
    transformY: boolean;
    transformX: boolean;
    constructor(hintService: HintService);
    ngOnInit(): void;
    showStep(): void;
    hideStep(): void;
    exit(): void;
    next(): void;
    prev(): void;
    private disableClick(element);
    private enableClick(element);
}
