export function debounce(fn, wait) {
  let timer
  return function (...arguments_) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(fn.bind(this, ...arguments_), wait)
  }
}

export function throttle(fn, wait) {
  let timer
  return function (...arguments_) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments_)
        timer = null
      }, wait)
    }
  }
}
