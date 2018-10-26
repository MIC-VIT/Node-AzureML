var express = require('express')
var axios = require('axios');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('titanic');
});

router.post('/', (req, res) => {
    let pid = req.body.passenger_id;
    let pclass = req.body.p_class;
    let name = req.body.name;
    let sex = req.body.sex;
    let age = req.body.age;
    let siblings = req.body.siblings;
    let parents = req.body.parents;
    let ticket = req.body.ticket;
    let fare = req.body.fare;
    let cabin_no = req.body.cabin_no;
    let embarked = req.body.embarked;

    let url = 'https://ussouthcentral.services.azureml.net/workspaces/9be386f79770405f970769a61499f0e9/services/df9ace5e1f9f479380de116dba8ac574/execute?api-version=2.0&details=true';
    let api = '97B1UL+USC/SdqwbEpawYB3sEWepoeQCd9xWj6tgZWCMKRjtNAkGSA1bOyLyHEiBz7scrW3TQ7Sq47mERNZKVA==';
    let header = {
        'Content-Type': 'application/json',
        'Authorization': ('Bearer ' + api)
    };
    let data = {
        "Inputs": {
            "input1": {
                "ColumnNames": ["PassengerId", "Survived", "Pclass", "Name", "Sex", "Age", "SibSp", "Parch", "Ticket", "Fare", "Cabin", "Embarked"],
                "Values": [
                    [pid, null, pclass, name, sex, age, siblings, parents, ticket, fare, cabin_no, embarked],
                    [pid, null, pclass, name, sex, age, siblings, parents, ticket, fare, cabin_no, embarked],
                ]
            },
        },
        "GlobalParameters": {}
    }

    let result = null;
    axios.post(url, data, {
            headers: header
        })
        .then((rest) => {
            result = rest.data.Results.output1.value;
            console.log(result);
            if(result){
                let len=result.Values[0].length;
                console.log("Length-->",len);
                res.render('result',{
                    result: result,
                    len: len
                });
                // res.json(result);
            }
        })
        .catch((err) => {
            console.log("Error ", err);
        });
});

module.exports = router;