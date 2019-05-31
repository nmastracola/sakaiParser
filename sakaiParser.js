const convert       = require("xml-js");
const xml           = require('fs').readFileSync('./xml/exportAssessment.xml', 'utf8')
const options       = {ignoreComment: true, compact: true}

console.log("converting")

let result = convert.xml2js(xml, options);

let items = result.questestinterop.assessment.section.item;

let outputArr = [];


//     TO DO:
//Conditional for multiple choice questions. Right now it's hard coded but it would be more idea to have something that loops through

items.forEach(item => {
    
    let shell = {
        questionTitle : item._attributes.title,
        questionText: item.presentation._attributes.label === "FIB" ? item.presentation.flow.flow.material[0].mattext._cdata : item.presentation.flow.material[0].mattext._cdata,
        answers:  
            item.presentation._attributes.label === "Resp003" ? {
                "A" : {
                    text: item.resprocessing.respcondition[0].conditionvar.varequal.__text,
                    isCorrect: item.resprocessing.respcondition[0].displayfeedback[0]._linkrefid === "Correct" ? true : false
                },
                "B" : {
                    text: item.resprocessing.respcondition[0].conditionvar.varequal.__text,
                    isCorrect: item.resprocessing.respcondition[1].displayfeedback[0]._linkrefid === "Correct" ? true : false
                },
                "C" : {
                    text: item.resprocessing.respcondition[0].conditionvar.varequal.__text,
                    isCorrect: item.resprocessing.respcondition[2].displayfeedback[0]._linkrefid === "Correct" ? true : false
                },
                "D" : {
                    text: item.resprocessing.respcondition[0].conditionvar.varequal.__text,
                    isCorrect: item.resprocessing.respcondition[3].displayfeedback[0]._linkrefid === "Correct" ? true : false
                }
            }
        : item.presentation._attributes.label === "Model Short Answer" ? {
                text: "No Answer ",
                isCorrect: "Essay Question"
        }
        
        : item.presentation._attributes.label === "FIB" ? {
            text: item.resprocessing.respcondition.conditionvar.or.varequal._cdata
        }

        : null

    }
    outputArr.push(shell)
})

console.log(outputArr)



