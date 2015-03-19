/**
 * Created by brandonantonelli on 1/28/15.
 */
export default function () {
    this.transition(
        this.toRoute('sound-selection'),
        this.use('toLeft')
    );
    this.transition(
        this.toRoute('your-kit'),
        this.use('toLeft')
    );
    this.transition(
        this.toRoute('kb-checkout'),
        this.use('toLeft')
    );
    this.transition(
        this.toRoute('register'),
        this.use('toUp')
    );
}