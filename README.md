# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://github.com/Daucko/frontend-mentor-interactive-card-details-form-solution)
- Live Site URL: [Add live site URL here](https://vercel.com/daudas-projects/frontend-mentor-interactive-card-details-form-solution)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Javascript

### What I learned

I used this project to further my javaScript learning. I learnt how to display a typed text in input, number by number and letter by letter as they are typed. The snippet of the code is shown below:

```js
document.getElementById('continue').addEventListener('click', () => {
  form.reset();
  Object.keys(display).forEach(
    (key) => (display[key].textContent = defaults[key]),
  );
  Object.values(fields).forEach((input) => input.classList.remove('invalid'));
  Object.values(errors).forEach((el) => (el.textContent = ''));
  thanks.hidden = true;
  form.hidden = false;
  fields.name.focus();
});
```

### Continued development

I want to focus more on my javaScript development.

### Useful resources

- [Example resource 1](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Containing_block) - This helped me with the decision why top: 18.5% and bottom: -18.5% are measured against body. I really liked this pattern and will use it going forward.
- [Example resource 2](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) - This is an amazing article which helped me greatly with text clamps. I'd recommend it to anyone still learning this concept.

## Author

- Website - [Add your name here](https://www.daucode-portfolio.vercel.app)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/daucko)
- Twitter - [@yourusername](https://www.twitter.com/daucoooflife)
