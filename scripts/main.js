/*jshint esversion: 6 */

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let frames = 0;
let interval;
let gravity = 8.9;
const trashCan = [];
const fishCan = [];
let heartSpace = 34;
let heartSpace2 = 34;
let keys = [];