"use strict";

$(document).ready(function(){

    const inputConta = $('input.conta')
    const inputCustom = $('input.customTip')
    const inputPeoples = $('input.peoples')
    const percentageBtn = $('button.selectTip')
    
    let txtTotal = $("span.result_value.total");
    let txtGorjeta = $("span.result_value.gorjeta");

    let conta = 0;
    let percentagem = 0;
    let peoples = 1;

    $(inputConta).change(function(){
        conta = inputConta.val().replace(',',".")
        inputConta.val(conta)
        conta = parseFloat(conta)  

        attText(txtTotal, conta)          
    })

    $(percentageBtn).click(function(){
        percentagem = $(this).text().replace('%',"")  
        attText(txtGorjeta, calc(conta,percentagem))  
        attText(txtTotal, calc(conta,percentagem)+ conta)  
        conta = calc(conta,percentagem)+ conta
        peoples = peoples
    })

    $(inputPeoples).change(function(){
        peoples = parseInt(inputPeoples.val())

        attText(txtGorjeta, calc(conta,percentagem,peoples).toFixed(2))
        attText(txtTotal,calcPeoples(conta, percentagem ,peoples).toFixed(2))

        percentagem = calc(conta,percentagem,peoples).toFixed(2)
        conta = calcPeoples(conta, percentagem ,peoples).toFixed(2)
        peoples = peoples
    })    

    //Calcula a porcentagem
    function calc(conta, percentagem, peoples){
        if(peoples == "" || peoples == null){
            peoples = 1;
        }
        let count1 = (conta * percentagem) / 100 / peoples
        return count1
    }

    //Calcula a conta com base no numero de pessoas
    function calcPeoples(conta, peoples){
        let sum = conta / peoples 
        return sum
    }

    //Atualiza o campo
    function attText(input, value){
        $(input).text(value)
    }

    //Coverte para dinheiro
    function maskMoney(valor){
        let value;
        console.log(valor.indexOf('.',','))
        if(valor.indexOf('.',',') == -1){           
            value = valor+('.00')
        }else if (valor.indexOf('.',',') == undefined){
            value = value;
        }
        
        return value
    }
})