import EventEmitter from 'events';

const myEvtEmt = new EventEmitter();


myEvtEmt.on('start', (data) => {
    console.log(`data ${data} received`);
})

myEvtEmt.emit('start', 1);

myEvtEmt.on('end', () => {
    console.log(`bye`);
})

myEvtEmt.emit('end');

