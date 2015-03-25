/**
 * Created by brandonantonelli on 1/28/15.
 */
export default function () {
    this.transition(
        // From 1 to 2
        this.fromRoute('sound-selection'),
        this.toRoute('your-kit'),
        this.use('toLeft')
    );
    this.transition(
        // From 3 to 2
        this.fromRoute('kb-checkout'),
        this.toRoute('your-kit'),
        this.use('toRight')
    );
    this.transition(
        this.toRoute('sound-selection'),
        this.use('toRight')
    );
    this.transition(
        this.toRoute('kb-checkout'),
        this.use('toLeft')
    );
    this.transition(
        this.toRoute('register'),
        this.use('toDown', { duration: 750, easing: "easeOutQuart" })
    );
    this.transition(
        this.toRoute('index'),
        this.use('crossFade', { duration: 650, easing: "easeOutQuart" })
    );
    this.transition(
        this.toRoute('legal'),
        this.use('crossFade', { duration: 650, easing: "easeOutQuart" })
    );
    this.transition(
        this.toRoute('about'),
        this.use('crossFade', { duration: 650, easing: "easeOutQuart" })
    );
}