const btn = document.querySelector('.submit-button');
const loading = document.querySelector('.loading-section');
const error = document.querySelector('.error-message');
const errorMsg = document.querySelector('.error-text');
const res = document.querySelector('.result-section');

let activateReusltSection = () => {
    res.style.display = 'flex';
}

let activateErrorSection = () => {
    error.style.display = 'flex';
    errorMsg.textContent = 'invalid url.';
}

let activateLoadingSection = () => {
    loading.style.display = 'block';
    error.style.display = 'none';
    res.style.display = 'none';
    setTimeout(() => {
        loading.style.display = 'none';
        // activateReusltSection();
        activateErrorSection();
    },3000);
}

btn.addEventListener('click', activateLoadingSection);