/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
    allPass,
    propEq,
    equals,
    all,
    complement,
    converge,
    prop,
    count
} from "ramda";

const isGreen = x => x === 'green';
const isRed = x => x === 'red';
const isBlue = x => x === 'blue';
const isOrange = x => x === 'orange';

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({star, square, triangle, circle}) => {
    const isStarRed = propEq('star', 'red');
    const isSquareGreen = propEq('square', 'green');
    const isTriangleWhite = propEq('triangle', 'white');
    const isCircleWhite = propEq('circle', 'white');
    return allPass([isStarRed, isSquareGreen, isTriangleWhite, isCircleWhite])({star, square, triangle, circle});
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({star, square, triangle, circle}) => {
    return count(isGreen, [star, square, triangle, circle]) >= 2;
};


// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({star, square, triangle, circle}) => {
    return equals(count(isBlue, [star, square, triangle, circle]), count(isRed, [star, square, triangle, circle]))
};


// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({star, square, triangle, circle}) => {
    const isStarRed = propEq('star', 'red');
    const isSquareOrange = propEq('square', 'orange');
    const isCircleBlue = propEq('circle', 'blue');
    return allPass([isStarRed, isSquareOrange, isCircleBlue])({star, square, triangle, circle});
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({star, square, triangle, circle}) => {
    const threeBlues = count(isBlue, [star, square, triangle, circle]) >= 3;
    const threeReds = count(isRed, [star, square, triangle, circle]) >= 3;
    const threeOranges = count(isOrange, [star, square, triangle, circle]) >= 3;
    const threeGreens = count(isGreen, [star, square, triangle, circle]) >= 3;
    return threeOranges || threeGreens || threeReds || threeBlues
};


// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = ({star, square, triangle, circle}) => {
    const isTriangleGreen = propEq('triangle', 'green');
    const countGreen = count(isGreen, [star, square, triangle, circle]);
    const countRed = count(isRed, [star, square, triangle, circle])
    const twoGreen = equals(countGreen, 2);
    const oneRed = equals(countRed, 1);
    return twoGreen && oneRed && isTriangleGreen({star, square, triangle, circle})
};


// 7. Все фигуры оранжевые.
export const validateFieldN7 = ({star, square, triangle, circle}) => {
    const isOrange = equals('orange');
    return all(isOrange)([star, square, triangle, circle]);
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({star, square, triangle, circle}) => {
    const starNotWhite = complement(propEq('star', 'white'));
    const starNotRed = complement(propEq('star', 'red'));
    return allPass([starNotRed, starNotWhite])({star, square, triangle, circle});
};


// 9. Все фигуры зеленые.
export const validateFieldN9 = ({star, square, triangle, circle}) => {
    const isGreen = equals('green');
    return all(isGreen)([star, square, triangle, circle]);
};


// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({star, square, triangle, circle}) => {
    const triangleNotWhite = complement(propEq('triangle', 'white'));
    const squareNotWhite = complement(propEq('square', 'white'));
    const triangleSquareEqual = converge(equals, [prop('triangle'), prop('square')]);
    return allPass([triangleNotWhite, squareNotWhite, triangleSquareEqual])({star, square, triangle, circle})
};

