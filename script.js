const btn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const form = document.querySelector('.form');
const nums = document.querySelectorAll('[data-count]');

btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', false);
  });
});

const run = (el) => {
  const end = Number(el.dataset.count);
  let cur = 0;
  const step = Math.max(1, Math.ceil(end / 40));

  const t = setInterval(() => {
    cur += step;
    if (cur >= end) {
      cur = end;
      clearInterval(t);
    }
    el.textContent = cur;
  }, 30);
};

const io = new IntersectionObserver((items) => {
  items.forEach((item) => {
    if (item.isIntersecting) {
      run(item.target);
      io.unobserve(item.target);
    }
  });
}, { threshold: 0.6 });

nums.forEach((n) => io.observe(n));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.reset();
  alert('Thanks for your message. We will get back to you soon.');
});
