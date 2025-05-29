import { DateTime } from 'https://cdn.skypack.dev/luxon';

const age = datepicker('.age-calculate', { id: 1 });

const button = document.getElementById('button');
button.addEventListener('click', function (e) {
    e.preventDefault();
    let ageInput = document.querySelector('.age-calculate').value;
    const result = document.getElementById('result');

    if (!ageInput) {
        result.innerText = 'Please enter your birth date!';
        return;
    }

    let dateObj = DateTime.fromJSDate(new Date(ageInput));

    if (!dateObj.isValid) {
        result.innerText = 'Invalid date format!';
        return;
    }

    const now = DateTime.now();
    if (
        dateObj.year > now.year ||
        (dateObj.year === now.year && dateObj.month > now.month) ||
        (dateObj.year === now.year && dateObj.month === now.month && dateObj.day > now.day)
    ) {
        result.innerText = 'Birth date cannot be in the future!';
        return;
    }

    const diff = now.diff(dateObj, ['years', 'months', 'days']).shiftTo('years', 'months', 'days');

    const years = Math.floor(diff.years);
    const months = Math.floor(diff.months);
    const days = Math.floor(diff.days);

    result.innerText = `You are ${years} years, ${months} months, and ${days} days old.`;
});
