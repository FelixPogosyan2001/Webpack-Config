import Car from '@/Car';
import '@css/App.scss';
import * as $ from 'jquery'

$('.box > p').css('color','lightblue')

const bmw = new Car('BMW')
console.log(bmw)