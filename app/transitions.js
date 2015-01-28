/**
 * Created by brandonantonelli on 1/28/15.
 */
export default function () {
    this.transition(
        this.toRoute('protected'),
        this.use('toLeft')
    );
};