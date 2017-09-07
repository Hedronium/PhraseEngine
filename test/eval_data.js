const is = require('chai').assert;
const en = require('../dist/').default;

describe('EVAL: data', function () {
    describe('.iterate()', function () {

        it('should render the data', function () {
            let engine = en.compile(`
                <sentence>
                    <data key="x" />
                </sentence>
            `);

            engine.vars();
            engine.count({
                x: 'XXX'
            });

            let li = [...engine.iterate({
                    x: 'XXX'
                })];

            is.equal(li[0], 'XXX');
        });

        it('should render the first available data', function () {
            let engine = en.compile(`
                <sentence>
                    <data key="z|x|y" />
                </sentence>
            `);

            engine.vars();
            engine.count({
                x: 'XXX',
                y: 'YYY'
            });

            let li = [...engine.iterate({
                    x: 'XXX',
                    y: 'YYY'
                })];

            is.equal(li[0], 'XXX');
        });

        it('should render ignore unavailable data', function () {
            let engine = en.compile(`
                <sentence>
                    <data key="x|y" />
                </sentence>
            `);

            engine.vars();
            engine.count({
                y: 'YYY'
            });

            let li = [...engine.iterate({
                    y: 'YYY'
                })];

            is.equal(li[0], 'YYY');
        });


        it('should throw if data isn\'t found', function () {
            let engine = en.compile(`
                    <sentence>
                        <data key="x|y" />
                    </sentence>
                `);

            engine.vars();
            engine.count({});

            is.throws(() => {
                let li = [...engine.iterate({})];
            });
        });

    });
});