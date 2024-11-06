import { Subject } from 'rxjs/Subject';
import { TourComponent } from './intro-tour/tour.component';
import { HintOptions } from './options';
export interface Step {
    selector: string;
    order: number;
}
export declare class HintService {
    currentStep: Step;
    steps: Step[];
    hintOptions: HintOptions;
    anchors: {
        [selector: string]: TourComponent;
    };
    overlay$: Subject<boolean>;
    registration$: Subject<boolean>;
    finish$: Subject<boolean>;
    showingStep$: Subject<Step>;
    /**
     * Initialize hint service
     * @method initialize
     * @param  {HintOptions} options init options
     * @return void
     */
    initialize(options?: HintOptions): void;
    /**
     * Show step
     * @method show
     * @param  {Step} step [description]
     */
    show(step: Step): void;
    /**
     * Show step next to {Step} this.currentStep
     * @method showNext
     */
    showNext(): void;
    /**
     * On overlay click behaviour
     * @method overlayNext
     */
    overlayNext(): void;
    /**
     * Show step previous to {Step} this.currentStep
     * @method showPrev
     */
    showPrev(): void;
    /**
     * Register hint component
     * @method register
     * @param  {string}            selector  binded to
     * @param  {TourComponent} component itself
     */
    register(selector: string, component: TourComponent): void;
    /**
     * Is {Step} this.currentStep has next
     * @method hasNext
     * @return {boolean}
     */
    hasNext(): boolean;
    /**
     * Is {Step} this.currentStep has previous
     * @method hasPrev
     * @return {boolean}
     */
    hasPrev(): boolean;
    /**
     * Finalize our hint tour.
     * @method end
     */
    end(): void;
    /**
     * Start hint tour at some position
     * @method startAt
     * @param  {number} stepId position in this.steps
     */
    startAt(stepId: number): void;
    /**
     * Convert Element[] to Step[]
     * @method initSteps
     * @param  {NodeListOf<Element>} nodes
     * @return {Step[]}
     */
    private initSteps(nodes);
    private putOverlay();
}
