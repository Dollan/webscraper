const puppeteer = require('puppeteer');

class Bot {
    
    async getList(url) {

        const browser = await puppeteer.launch();
        const page =  await browser.newPage();
        await page.goto(url);
        await page.click('[href="/test-sites/e-commerce/allinone/computers"]');
        await page.click('[href="/test-sites/e-commerce/allinone/computers/laptops"]');
        
        // timeout para dar tempo de carregar a pagina
        await page.waitForTimeout(5000);
    
        //pega todas as informações dos notebooks, preço, nome e descrição e concatena tudo em uma string,  
        const text = await page.evaluate(() => Array.from(document.querySelectorAll('.caption'), element => element.textContent.replace(/([\n\t]+)/g, "+")));
        const lenovo = /Lenovo/
    
        function filtra(e){
            return lenovo.test(e)
        }
    
        //filtra o array de notebooks para ter apenas os da lenovo, ele já veio ordenado por preço
        var TextFiltrado = text.filter(filtra);

        //retorna uma objeto com os notebooks nome, preco e descricao
        return TextFiltrado.map(texto => {
            const splitedText = texto.substring(1).split('+');
            return {
                nome: splitedText[1],
                preco: splitedText[0],
                descricao: splitedText[2]
            };
        });
    }
}

module.exports = Bot;
