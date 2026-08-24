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

            const faqSectionHtml = (faq && faq.length > 0) ? `
                <div class="faq-section">
                    <h4 class="faq-heading">Frequently Asked Questions</h4>
                    ${faq.map(obj => `
                        <div class="faq-item">
                            <p class="faq-q">${obj.question}</p>
                            <p class="faq-a">${obj.answer}</p>
                        </div>
                    `).join('')}
                </div>
            ` : '';

            activateReusltSection();
            
            resultBox.innerHTML = `
                <h3>${title}</h3>
                <p class="summary">${summary}</p>
                
                <div class="data-group">
                    <span class="label">Main Topics</span>
                    <div class="badge-container">
                        ${mainTopics.map(topic => `<span class="badge">${topic}</span>`).join('')}
                    </div>
                </div>
                
                <div class="data-group">
                    <span class="label">Keywords</span>
                    <div class="badge-container">
                        ${keywords.map(keyword => `<span class="badge">${keyword}</span>`).join('')}
                    </div>
                </div>
                
                <div class="data-group">
                    <span class="label">Sentiment</span>
                    <div class="badge-container">
                        <span class="badge badge-sentiment">${sentiment}</span>
                    </div>
                </div>
                
                <div class="data-group">
                    <span class="label">Reading Time</span>
                    <p>${readingTime}</p>
                </div>

                ${faqSectionHtml}
            `;
            
            // Scroll after content is populated
            setTimeout(() => {
                resSection.scrollIntoView({behavior:'smooth',block:'start'});
            }, 100);
        }
        else{
            console.log("error here " + response.message);
            activateErrorSection(response.message);
        }
    }
    // console.log("cached" + response.data.cached);
    loading.style.display = 'none';
}

btn.addEventListener('click', action);
urlInput.addEventListener('keydown', (event) =>{
    if(event.key==='Enter'){
        action();
    }
});