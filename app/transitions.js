/**
 * Created by brandonantonelli on 1/28/15.
 */
export default function () {
    // this.transition(
    //     this.hasClass('kb-template-save-form'),

    //     // this makes our rule apply when the liquid-if transitions to the
    //     // true state.
    //     this.toValue(true),
    //     this.use('toLeft', {duration: 220})

    //     // which means we can also apply a reverse rule for transitions to
    //     // the false state.
    //     // this.reverse(, {duration})
    // );
    // MODAL
    this.transition(
        this.inHelper('liquid-modal'),
        this.use('explode', {
            pick: '.lf-overlay',
            use: ['fade', { maxOpacity: 0.5, duration: 520}]
        }, {
            pick: '.lm-container',
            use: ['toDown', {duration: 520}]
        }, {
            pick: '.login-modal',
            use: ['crossFade', {duration: 50}]
        }, {
            pick: '.modal-form-area',
            use: ['crossFade', {duration: 50}]
        })
    );
    // KITBUILDER ROUTES
    this.transition(
        // From 1 to 2
        this.fromRoute('sound-selection'),
        this.toRoute('your-kit'),
        this.use('toLeft', { duration: 800, easing: "easeOutQuart" })
    );
    this.transition(
        // From 3 to 2
        this.fromRoute('kb-checkout'),
        this.toRoute('your-kit'),
        this.use('toRight', { duration: 800, easing: "easeOutQuart" })
    );
    this.transition(
        this.toRoute('sound-selection'),
        this.use('toRight', { duration: 800, easing: "easeOutQuart" })
    );
    this.transition(
        this.toRoute('kb-checkout'),
        this.use('toLeft', { duration: 800, easing: "easeOutQuart" })
    );
    // CHECKOUT SUBROUTES
    this.transition(
        this.toRoute('kb-payment-method'),
        this.use('toRight', { duration: 500, easing: "easeOutQuart" })
    );
    this.transition(
        this.toRoute('kb-billing'),
        this.use('toLeft', { duration: 500, easing: "easeOutQuart" })
    );    
    this.transition(
        this.toRoute('kb-thank-you'),
        this.use('toLeft', { duration: 500, easing: "easeOutQuart" })
    );
    // STATIC PAGES
    this.transition(
        this.toRoute('register'),
        this.use('crossFade', { duration: 750, easing: "easeOutQuart" })
    );
    this.transition(
        this.toRoute('index'),
        this.use('crossFade', { duration: 550, easing: "easeOutQuart" })
    );
    this.transition(
        this.toRoute('legal'),
        this.use('crossFade', { duration: 550, easing: "easeOutQuart" })
    );
    this.transition(
        this.toRoute('about'),
        this.use('crossFade', { duration: 550, easing: "easeOutQuart" })
    );
}