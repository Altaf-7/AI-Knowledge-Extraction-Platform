alert("This website is still under test phase, errors can occur.");

const btn = document.querySelector('.submit-button');
const loading = document.querySelector('.loader-area');
const error = document.querySelector('.error-message-area');
const errorMsg = document.querySelector('.error-text');
const urlInput = document.querySelector('.url-input');
const resSection = document.querySelector('.result-section');
const resultBox = document.querySelector('.result-box');

const activateErrorSection = (msg) => {
    loading.style.display = 'none';
    error.style.display = 'flex';
    errorMsg.innerHTML = msg;
}

const activateReusltSection = () => {
    loading.style.display = 'none';
    error.style.display = 'none';
    resSection.style.display = 'flex';
            
    resSection.scrollIntoView({behavior:'smooth',block:'start'});
}

const activateLoader = () => {
    loading.style.display = 'block';
    error.style.display = 'none';
    resSection.style.display = 'none';
}

const fetchAPI = async (url) => {
    const data = {url:url};

    try{
        const response =  await fetch("/api/analyze",{
            method: 'POST',
            headers:{'content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        
        return await response.json();
    }
    catch(error){
        activateErrorSection(error.message);
        return null;
    }
}

const action = async () => {
    // console.log("jello");
    activateLoader();

    const url = urlInput.value;

    const result = validateURL(url);

    if (!result.valid) {
        activateErrorSection(result.message);
        loading.style.display = "none";
        return;
    }

    const response = await fetchAPI(url.trim());

    if(response){
        
        if(response.success){
            const {title, summary, keywords, mainTopics, faq, sentiment, readingTime} = response.data;

            const processedFaq = faq.map(obj => {
                return (`
                    <p><span>Question:</span> ${obj.question}</p>
                    <p><span>Answer:</span> ${obj.answer}</p>
                    <br>
                `);
            });

            activateReusltSection();
            
            resultBox.innerHTML = `
                <h3>${title}</h3>
                <p>${summary}</p>
                <br>
                <p><span>Main Topics:</span> ${mainTopics.join(', ')}</p>
                <br>
                <p><span>Keywords:</span> ${keywords.join(', ')}</p>
                <br>
                <p><span>Sentiment:</span> ${sentiment}</p>
                <br>
                <p><span>Reading Time:</span> ${readingTime}</p>

                <br><br>
                <p><span>FAQs</span></p>
                ${processedFaq}
            `;
        }
        else{
            console.log("error here " + response.message);
            activateErrorSection(response.message);
        }
    }
    console.log("cached" + response.data.cached);
    loading.style.display = 'none';
}

btn.addEventListener('click', action);
urlInput.addEventListener('keydown', (event) =>{
    if(event.key==='Enter'){
        action();
    }
});