const express = require('express');
const app = express();
const port = 3000;


app.get('/isPyramid', (req, res) => {
    //must check if query parameter exists
    if (req.query.string === undefined){
        return res.status(500).json({message:"string was not given"})
    }

    let input = req.query.string.toLowerCase();
    let letterArray = new Array(26).fill(0);
    let output = "is";


    //populating letterArray
    for(let i = 0; i < input.length; ++i){
        var letter = input.charAt(i);
        //ascii for 'a' is 97
        letterArray[letter.charCodeAt(0) - 97]++;
    }

    //rather than sorting array which increases complexity time (to average time of nlog(n) using quicksort), we can use another array that stores the counts
    let counterArray = [];
    for (let i = 0; i < 26; ++i){
        if (letterArray[i] != 0){
            if (counterArray[letterArray[i]] == letterArray[i]){
                counterArray[letterArray[i]]++;
            }
            else{
                counterArray[letterArray[i]] = letterArray[i];
            }
        }
    }

    //iterate through counterArray to see if all index match
    for (let i = 1; i < counterArray.length; ++i){
        if ((counterArray[i] === null) | (counterArray[i] != i)){
            output = "is not";
        }
    }

    //message will either ouput: 'string' is/is not a pyramid word
    return res.status(200).json({message:`'${input}' ${output} a pyramid word.`});
});




app.listen(port, () => {
    console.log(`Server running on http://localhost:${3000}`);
});