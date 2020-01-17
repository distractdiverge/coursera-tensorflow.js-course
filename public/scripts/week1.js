(function(tf){

    const doTraining = async (aModel, xs, ys) => {
        const history = 
            await aModel.fit(
                xs,
                ys,
                {
                    epochs: 500,
                    callbacks: {
                        onEpochEnd: async(epoch, logs) => {
                            logging.log(`Epoch: ${epoch} Loss: ${logs.loss}`);
                        }
                    }
                }
            )
    };


    logging.log('Creating Model', 'INFO');
    const layer = tf.layers.dense({
        units: 1,
        inputShape: [1],
    });

    const model = tf.sequential();
    model.add(layer);

    logging.log('Compiling Model', 'INFO');
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd',
    });
    model.summary(null, null, x => logging.log(x));


    logging.log('Training the Model', 'INFO');

    const xs = tf.tensor2d(
        [-1.0, 0.0, 1.0, 2.0, 3.0, 4.0],
        [6, 1],
    );
    const ys = tf.tensor2d(
        [-3.0, -1.0, 2.0, 3.0, 5.0, 7.0],
        [6, 1],
    );

    doTraining(model, xs, ys)
        .then(() => {
            const input = 10;
            logging.log(`Training Complete, Using the model on input = ${input}`);
            const desiredOutput = tf.tensor2d([input], [1,1]);
            const prediction = model.predict(desiredOutput);
            logging.log(prediction, 'MODEL PREDICTION');
        })

})(tf);