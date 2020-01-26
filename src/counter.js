import * as $ from 'jquery'

function counter(){
    const obj = {
        i: 0,
        getCount() {
            console.log(this.i)
        },
        destroy() {
            document.removeChild('click',func)
        }
    };
    const func = () => obj.i++;

    document.addEventListener('click',func);

    return obj
}

window.counter = counter()