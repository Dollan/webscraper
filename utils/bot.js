const puppeteer = require('puppeteer');

class Bot {
    
    async getList(url) {

        const browser = await puppeteer.launch({headless: true});
        const page =  await browser.newPage();
        await page.goto('https://webscraper.io/test-sites/e-commerce/allinone/product/545');
        await page.click('[href="/test-sites/e-commerce/allinone/computers"]');
        await page.click('[href="/test-sites/e-commerce/allinone/computers/laptops"]');
        
        await page.waitForTimeout(5000);
    
        //pega todas as informações dos notebooks, preço, nome e descrição e concatena tudo em uma string,  
        const text = await page.evaluate(() => Array.from(document.querySelectorAll('.title'), element => ({nome:element.title, url:element.href})));
        const lenovo = /Lenovo/
    
        function filtra(e){
            return lenovo.test(e.nome)
        }

        //filtra o array de notebooks para ter apenas os da lenovo, ele já veio ordenado por preço
        var TextFiltrado = text.filter(filtra);


        let resultadoParcial = [];
        for(let x = 0; x < TextFiltrado.length; x++) {
            await page.goto(TextFiltrado[x].url);
            const handle = await page.$('.swatches');
            const hddesabilitados = await page.evaluate(swatches => {
                let res = [];
                Object.values(swatches.children).forEach(children => {
                    if(!/disabled/.test(children.className)){
                        children.click();
                        res.push({
                            description: document.querySelector('.description').innerHTML,
                            rewier: document.querySelector('.ratings').innerText,
                            title: document.querySelector('.caption > h4:nth-child(2)').innerHTML,
                            stars: document.querySelectorAll('.glyphicon.glyphicon-star').length,
                            hd: children.value,
                            price: document.querySelector('h4.pull-right').innerHTML
                        });
                    }
                });
                return res;
            }, handle);

            resultadoParcial = [...resultadoParcial, ...hddesabilitados];
        }

        return resultadoParcial.sort((a, b) => parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
    }
}
module.exports = Bot;

module.exports = Bot;
