

limz_Backend = Class.extend({
	
    variableMap : {
        method: ["GET", "POST"]
    },

	init:function(){
	},
	
    getBotList: function(app){
        $("#selectbotlist").html(
            '<option value="1541474982388_|Bot 1|_th" selected>Bot 1</option><option value="1541474982389_|Bot 2|_th">Bot 2</option>');

        $('#selectbotlist').on('change', function() {		
            value = $(this).val();
            fields = value.split('_|_');
            const botId = fields[0];
            app.load("test/" + botId);
        });

        value = $('#selectbotlist').val();
        fields = value.split('_|_');
        const botId = fields[0];
        app.load("test/" + botId);
	},
	
    getPrerequisitVariables: function(parameterName, successCallback){
        const variables = this.variableMap[parameterName];
        if (variables)
            successCallback(variables);
        else
            successCallback([]);
    },
    	
    save: function(contextId, content, successCallback, errorCallback){
        const jsonString = JSON.stringify(content);

        console.log("(^o^)ๆ Saving..");

        sessionStorage.setItem("context", jsonString);

        console.log(jsonString);

        successCallback();
    },
    
    load:  function(contextId, successCallback, errorCallback){

        console.log("(^o^)ๆ Loading.." + contextId);
/*
        const context = sessionStorage.getItem("context");

        if (context) {
            successCallback(JSON.parse(context));
       
            console.log(context);
    
            console.log("Loaded");    
            
        } else {
            */

            const ctx = {
              "nodes": [
                {
                  "attr": {
                    "id": "9250f4b3-770f-609f-d669-6e670c5618e1",
                    "x": 1040,
                    "y": 112,
                    "isQuestion": true
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "greeting"
                    },
                    {
                      "text": "@dc682c61-38a2-0b01-d63c-193bc5bdb749",
                      "match": "Words",
                      "weight": 1
                    },
                    {
                      "text": "@a1eba6a2-bdcd-90e3-6a05-b7f345139ccc",
                      "match": "Words",
                      "weight": 1
                    },
                    {
                      "text": "@91a3e17e-dacf-edab-eef1-76ac04301ebd",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "What is your name, @9250f4b3-770f-609f-d669-6e670c5618e1?"
                },
                {
                  "attr": {
                    "id": "751ddbb0-ad8e-b3ce-50f9-87254229d05e",
                    "x": 675,
                    "y": 895,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ศุกร์"
                    },
                    {
                      "text": "@2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": ", @751ddbb0-ad8e-b3ce-50f9-87254229d05e `get://horoscope.mthai.com/apps/daily-horo`!"
                },
                {
                  "attr": {
                    "id": "7453f123-be32-1945-fa15-de3a2114ba2b",
                    "x": 547,
                    "y": 990,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "เสาร์"
                    },
                    {
                      "text": "@2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": ", @7453f123-be32-1945-fa15-de3a2114ba2b `get://horoscope.mthai.com/apps/daily-horo`!"
                },
                {
                  "attr": {
                    "id": "71e140e5-c2e2-a4d3-af52-992eb1690823",
                    "x": 943,
                    "y": 291
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ดูดวง"
                    },
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "อาทิตย์"
                    },
                    {
                      "text": "@096eb952-80da-2c30-67c0-51588dd99329",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "`jsoup://%1://#content-inner h4` `jsoup://%1://#content-inner div:eq(2) p`"
                },
                {
                  "attr": {
                    "id": "21e1a70c-2982-dca3-fdbf-f6b013402c21",
                    "x": 862,
                    "y": 439
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ดูดวง"
                    },
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "จันทร์"
                    },
                    {
                      "text": "@eeeaac2a-43f8-9e17-328b-bdeb593390dd",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "`jsoup://%1://#content-inner h4` `jsoup://%1://#content-inner div:eq(3) p`"
                },
                {
                  "attr": {
                    "id": "fa6688c3-c739-9d4f-eca0-4b5dcf541667",
                    "x": 979,
                    "y": 568
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ดูดวง"
                    },
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "อังคาร"
                    },
                    {
                      "text": "@82573377-0325-efd5-450a-c6fa0c9d2840",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "`jsoup://%1://#content-inner h4` `jsoup://%1://#content-inner div:eq(4) p`"
                },
                {
                  "attr": {
                    "id": "fbc24651-51bf-ad54-311c-609413d806e9",
                    "x": 864,
                    "y": 641
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ดูดวง"
                    },
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "พุธ"
                    },
                    {
                      "text": "@a4b8b328-8382-cb05-f1f7-f48a71ec5657",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "`jsoup://%1://#content-inner h4` `jsoup://%1://#content-inner div:eq(5) p`"
                },
                {
                  "attr": {
                    "id": "b1f80bb2-4446-844b-3790-d1b03acc68d4",
                    "x": 934,
                    "y": 781
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ดูดวง"
                    },
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "พฤหัส"
                    },
                    {
                      "text": "@b7b8feae-6449-8703-4930-6c11e0c006e3",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "`jsoup://%1://#content-inner h4` `jsoup://%1://#content-inner div:eq(6) p`"
                },
                {
                  "attr": {
                    "id": "0bb3e21a-008d-b90b-79f6-ef14d1166542",
                    "x": 902,
                    "y": 937
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ดูดวง"
                    },
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ศุกร์"
                    },
                    {
                      "text": "@751ddbb0-ad8e-b3ce-50f9-87254229d05e",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "`jsoup://%1://#content-inner h4` `jsoup://%1://#content-inner div:eq(7) p`"
                },
                {
                  "attr": {
                    "id": "1a3a5724-3811-60ec-080e-1b4f4bf55c53",
                    "x": 837,
                    "y": 1081
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ดูดวง"
                    },
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "เสาร์"
                    },
                    {
                      "text": "@7453f123-be32-1945-fa15-de3a2114ba2b",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "`jsoup://%1://#content-inner h4` `jsoup://%1://#content-inner div:eq(8) p`"
                },
                {
                  "attr": {
                    "id": "096eb952-80da-2c30-67c0-51588dd99329",
                    "x": 604,
                    "y": 312,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "อาทิตย์"
                    },
                    {
                      "text": "@2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": ", @096eb952-80da-2c30-67c0-51588dd99329 `get://horoscope.mthai.com/apps/daily-horo`!"
                },
                {
                  "attr": {
                    "id": "eeeaac2a-43f8-9e17-328b-bdeb593390dd",
                    "x": 674,
                    "y": 441,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "จันทร์"
                    },
                    {
                      "text": "@2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": ", @eeeaac2a-43f8-9e17-328b-bdeb593390dd `get://horoscope.mthai.com/apps/daily-horo`!"
                },
                {
                  "attr": {
                    "id": "82573377-0325-efd5-450a-c6fa0c9d2840",
                    "x": 706,
                    "y": 552,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "อังคาร"
                    },
                    {
                      "text": "@2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": ", @82573377-0325-efd5-450a-c6fa0c9d2840 `get://horoscope.mthai.com/apps/daily-horo`!"
                },
                {
                  "attr": {
                    "id": "a4b8b328-8382-cb05-f1f7-f48a71ec5657",
                    "x": 716,
                    "y": 654,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "พุธ"
                    },
                    {
                      "text": "@2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": ", @a4b8b328-8382-cb05-f1f7-f48a71ec5657 `get://horoscope.mthai.com/apps/daily-horo`!"
                },
                {
                  "attr": {
                    "id": "b7b8feae-6449-8703-4930-6c11e0c006e3",
                    "x": 731,
                    "y": 783,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "พฤหัส"
                    },
                    {
                      "text": "@2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": ", @b7b8feae-6449-8703-4930-6c11e0c006e3 `get://horoscope.mthai.com/apps/daily-horo`!"
                },
                {
                  "attr": {
                    "id": "a077c51d-40e4-62da-5a51-c4dae379ba69",
                    "x": 519,
                    "y": 154
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "MthaiDreamResu"
                    },
                    {
                      "text": "@c52b1af9-6f1a-013e-0d6d-ce593e19e951",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "เลขมงคลคือ `jsoup://%1://p[class=red_txt]`"
                },
                {
                  "attr": {
                    "id": "c52b1af9-6f1a-013e-0d6d-ce593e19e951",
                    "x": 267,
                    "y": 129,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "GetMthaiDream"
                    },
                    {
                      "text": "@5fe3f881-f406-1014-3227-2385c3304829",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": ", @c52b1af9-6f1a-013e-0d6d-ce593e19e951 `get://lotto.mthai.com/dream/##.html` test #name!"
                },
                {
                  "attr": {
                    "id": "1a04b961-f5fa-daf1-e646-d3b324699c3f",
                    "x": 322,
                    "y": 13
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 0.8820899980084597,
                      "text": "unknown"
                    },
                    {
                      "text": "@04852e0a-74c6-bd81-3455-eccb552bd2e0",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "ช่วยพิมพ์คำว่า ดวง เพื่อเช็คดวงประจำวัน หรือ ฝัน เพื่อทำนายหวยเข้าใจมั้ย"
                },
                {
                  "attr": {
                    "id": "395d3d6c-f572-e5f2-0836-881d6e0d8ab2",
                    "x": 1316.265625,
                    "y": 21
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "Dave"
                    },
                    {
                      "text": "@9250f4b3-770f-609f-d669-6e670c5618e1",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "Say hello to your Dad"
                },
                {
                  "attr": {
                    "id": "4a2c5f17-5471-324e-6bb3-7db9a48c7eee",
                    "x": 1333.609375,
                    "y": 116
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "John"
                    },
                    {
                      "text": "@9250f4b3-770f-609f-d669-6e670c5618e1",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "Say hello to your Mom"
                },
                {
                  "attr": {
                    "id": "91a3e17e-dacf-edab-eef1-76ac04301ebd",
                    "x": 852,
                    "y": 31,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "hello"
                    }
                  ],
                  "response": "Hi, @91a3e17e-dacf-edab-eef1-76ac04301ebd!"
                },
                {
                  "attr": {
                    "id": "5fe3f881-f406-1014-3227-2385c3304829",
                    "x": 40,
                    "y": 128,
                    "isQuestion": true
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ฝัน"
                    }
                  ],
                  "response": "เกี่ยวกับอะไร, @5fe3f881-f406-1014-3227-2385c3304829?"
                },
                {
                  "attr": {
                    "id": "2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                    "x": 269,
                    "y": 836,
                    "isQuestion": true
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ถามวันเกิด"
                    },
                    {
                      "text": "@20b9d485-80ee-97fc-24bb-effe01322484",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "เกิดวันอะไร, @2a43ed69-f93b-009d-0602-30c8ed2c5f44?"
                },
                {
                  "attr": {
                    "id": "dc682c61-38a2-0b01-d63c-193bc5bdb749",
                    "x": 833,
                    "y": 128,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "Hi"
                    }
                  ],
                  "response": "Hello, @dc682c61-38a2-0b01-d63c-193bc5bdb749!"
                },
                {
                  "attr": {
                    "id": "a1eba6a2-bdcd-90e3-6a05-b7f345139ccc",
                    "x": 780,
                    "y": 217,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "How"
                    },
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "are"
                    },
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "you"
                    }
                  ],
                  "response": "Good, @a1eba6a2-bdcd-90e3-6a05-b7f345139ccc!"
                },
                {
                  "attr": {
                    "id": "61a2532a-05e6-4ffc-9957-8615af312ee4",
                    "x": 1307.265625,
                    "y": 213
                  },
                  "hooks": [
                    {
                      "text": "@9250f4b3-770f-609f-d669-6e670c5618e1",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "Nice to meet you ##"
                },
                {
                  "attr": {
                    "id": "34d4c28a-5bb8-0578-9c5f-4a859f2037e2",
                    "x": 493,
                    "y": 1125
                  },
                  "hooks": [
                    {
                      "text": "@2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "เกิด ## แน่ใจเหรอ ชัดๆเกิดวันไหน"
                },
                {
                  "attr": {
                    "id": "20b9d485-80ee-97fc-24bb-effe01322484",
                    "x": 69,
                    "y": 797,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ดวง"
                    }
                  ],
                  "response": ", @20b9d485-80ee-97fc-24bb-effe01322484!"
                },
                {
                  "attr": {
                    "id": "63084c6c-efa6-15f4-d33d-d5b3f6941b8d",
                    "x": 96,
                    "y": 490,
                    "isQuestion": true
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "Insurrance"
                    },
                    {
                      "text": "@c1a62918-29c7-ab8f-5955-e618a4da734f",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "อายุเท่าไรครับ, @63084c6c-efa6-15f4-d33d-d5b3f6941b8d?"
                },
                {
                  "attr": {
                    "id": "a586b23d-3b9e-f066-299e-c4bda6ae4e18",
                    "x": 107,
                    "y": 700
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "มากกว่าหกสิบ"
                    },
                    {
                      "text": "@63084c6c-efa6-15f4-d33d-d5b3f6941b8d",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "คุณแก่ไปอะ เราไม่กล้ารับ https://www.pantip.com"
                },
                {
                  "attr": {
                    "id": "c1a62918-29c7-ab8f-5955-e618a4da734f",
                    "x": 77,
                    "y": 330,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ประกัน"
                    }
                  ],
                  "response": "https://wayobot.com/assets/images/Logo.png สนใจทำประกันเหรอ, @c1a62918-29c7-ab8f-5955-e618a4da734f!"
                },
                {
                  "attr": {
                    "id": "c328a84e-d9f1-a8e7-dff9-49d7b4dc65ae",
                    "x": 340,
                    "y": 468
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ระหว่างสามสิบถึงหกสิบ"
                    },
                    {
                      "text": "@63084c6c-efa6-15f4-d33d-d5b3f6941b8d",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "ทางเราจะรีบติดต่อกลับไป ทิ้งเบอร์ไว้นะ"
                },
                {
                  "attr": {
                    "id": "b9519547-82b8-6b20-aaa6-d381a8a73f3e",
                    "x": 304,
                    "y": 633
                  },
                  "hooks": [
                    {
                      "text": "@63084c6c-efa6-15f4-d33d-d5b3f6941b8d",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "ตอบเป็นตัวเลขเป็นปะ อิอิ"
                },
                {
                  "attr": {
                    "id": "f7657fc6-3da4-6693-dff8-3a6af7ac4498",
                    "x": 358,
                    "y": 554
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ต่ำกว่ากว่าสามสิบ"
                    },
                    {
                      "text": "@63084c6c-efa6-15f4-d33d-d5b3f6941b8d",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "คุณเด็กไปอะ อย่าทำเลย"
                },
                {
                  "attr": {
                    "id": "2bce2c0a-0c5b-0ebb-5769-8c5e0dfb4615",
                    "x": 1094,
                    "y": 447,
                    "isQuestion": true
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "quote"
                    }
                  ],
                  "response": "Choose your currency, @2bce2c0a-0c5b-0ebb-5769-8c5e0dfb4615 `get://bx.in.th/api/`?"
                },
                {
                  "attr": {
                    "id": "23144e87-bd23-1630-42fe-e976e54439ad",
                    "x": 1368,
                    "y": 316.9375
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "BTC"
                    },
                    {
                      "text": "@2bce2c0a-0c5b-0ebb-5769-8c5e0dfb4615",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "Last price of BTC is `json-path://%1://$.1.last_price` Bath"
                },
                {
                  "attr": {
                    "id": "70be38b9-ec2d-b913-f5a6-07427310c19e",
                    "x": 1375.515625,
                    "y": 456.9375
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "LTC"
                    },
                    {
                      "text": "@2bce2c0a-0c5b-0ebb-5769-8c5e0dfb4615",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "Last price of LTC is `json-path://%1://$.2.last_price` Bath"
                },
                {
                  "attr": {
                    "id": "5f563c8b-8593-5d25-58f2-1787bd46a000",
                    "x": 1373.3125,
                    "y": 610.9375
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ETH"
                    },
                    {
                      "text": "@2bce2c0a-0c5b-0ebb-5769-8c5e0dfb4615",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "Last price of ETH is `json-path://%1://$.21.last_price` Bath"
                },
                {
                  "attr": {
                    "id": "cb78a3db-6a3e-5ac2-e38c-2a3c5b379b2f",
                    "x": 1319,
                    "y": 739.9375
                  },
                  "hooks": [
                    {
                      "text": "@2bce2c0a-0c5b-0ebb-5769-8c5e0dfb4615",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "Unknown currency ##"
                },
                {
                  "attr": {
                    "id": "55ac0c3c-3801-62b7-da0e-f8950739ac10",
                    "x": 166,
                    "y": 1277,
                    "isQuestion": true
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "Q"
                    },
                    {
                      "text": "@9f8f17db-dd06-0cc2-1e23-286edabb94b1",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "ระบบออกบัตรคิว, @55ac0c3c-3801-62b7-da0e-f8950739ac10?"
                },
                {
                  "attr": {
                    "id": "0a657014-5e80-5653-126c-bb9b729f6f69",
                    "x": 484,
                    "y": 1309,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "#qNumber"
                    },
                    {
                      "text": "@eef43281-67bb-cc7e-3fa6-718e93dfd96a",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": ", @0a657014-5e80-5653-126c-bb9b729f6f69!"
                },
                {
                  "attr": {
                    "id": "b81db5a1-9c27-86b8-abcd-bbf488b35ec7",
                    "x": 1043,
                    "y": 1284.953125
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1.1000000014901161,
                      "text": "setQueueNumber"
                    },
                    {
                      "text": "@607880f0-d26a-4ed8-2051-eaaa5824494a",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "ระบบออกบัตรคิวหมายเลข %1 `?qNumber=%1`"
                },
                {
                  "attr": {
                    "id": "da784d40-83d5-f2c7-a2eb-4b922785e7f8",
                    "x": 481,
                    "y": 1391
                  },
                  "hooks": [
                    {
                      "text": "@eef43281-67bb-cc7e-3fa6-718e93dfd96a",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": "คุณได้คิวที่ #qNumber"
                },
                {
                  "attr": {
                    "id": "d2428dfb-f075-3e02-c0bd-028d767ecb9d",
                    "x": 409,
                    "y": 1217,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ออกบัตรคิวใหม่"
                    },
                    {
                      "text": "@55ac0c3c-3801-62b7-da0e-f8950739ac10",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": ", @d2428dfb-f075-3e02-c0bd-028d767ecb9d!"
                },
                {
                  "attr": {
                    "id": "eef43281-67bb-cc7e-3fa6-718e93dfd96a",
                    "x": 344,
                    "y": 1355,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "ดูคิว"
                    },
                    {
                      "text": "@55ac0c3c-3801-62b7-da0e-f8950739ac10",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": ", @eef43281-67bb-cc7e-3fa6-718e93dfd96a #qNumber!"
                },
                {
                  "attr": {
                    "id": "607880f0-d26a-4ed8-2051-eaaa5824494a",
                    "x": 714,
                    "y": 1241,
                    "isQuestion": false
                  },
                  "hooks": [
                    {
                      "match": "Words",
                      "weight": 1,
                      "text": "getNewQueue"
                    },
                    {
                      "text": "@0a657014-5e80-5653-126c-bb9b729f6f69",
                      "match": "Words",
                      "weight": 1
                    },
                    {
                      "text": "@d2428dfb-f075-3e02-c0bd-028d767ecb9d",
                      "match": "Words",
                      "weight": 1
                    }
                  ],
                  "response": ", @607880f0-d26a-4ed8-2051-eaaa5824494a `post://tokenId=#tokenId://wayobot.com/apiMockup/Q`!"
                }
              ],
              "attr": {
                "connections": [
                  {
                    "id": "886fc02d-4f98-3973-6ebe-969640ef3e34",
                    "source": "2bce2c0a-0c5b-0ebb-5769-8c5e0dfb4615",
                    "target": "5f563c8b-8593-5d25-58f2-1787bd46a000"
                  },
                  {
                    "id": "e0603a17-33bd-37f2-da62-9c26f8cb411b",
                    "source": "2bce2c0a-0c5b-0ebb-5769-8c5e0dfb4615",
                    "target": "23144e87-bd23-1630-42fe-e976e54439ad"
                  },
                  {
                    "id": "5f98a461-100c-5724-881c-75f15129cbf4",
                    "source": "2bce2c0a-0c5b-0ebb-5769-8c5e0dfb4615",
                    "target": "cb78a3db-6a3e-5ac2-e38c-2a3c5b379b2f"
                  },
                  {
                    "id": "9d40c810-464f-5817-365d-1eb645e15371",
                    "source": "2bce2c0a-0c5b-0ebb-5769-8c5e0dfb4615",
                    "target": "70be38b9-ec2d-b913-f5a6-07427310c19e"
                  },
                  {
                    "id": "f42dfc3b-12d1-366d-6e22-52df159ac4af",
                    "source": "2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                    "target": "34d4c28a-5bb8-0578-9c5f-4a859f2037e2"
                  },
                  {
                    "id": "22d3b89b-ee90-1a26-249e-4ea7a04b3619",
                    "source": "2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                    "target": "a4b8b328-8382-cb05-f1f7-f48a71ec5657"
                  },
                  {
                    "id": "4c9d8a65-8159-7a22-12b8-489bdb5b38f0",
                    "source": "2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                    "target": "eeeaac2a-43f8-9e17-328b-bdeb593390dd"
                  },
                  {
                    "id": "2cc6e3ee-6d27-1dc3-1c0b-e248916328f4",
                    "source": "2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                    "target": "096eb952-80da-2c30-67c0-51588dd99329"
                  },
                  {
                    "id": "033a5007-af74-9650-fee4-8d381168fcbb",
                    "source": "2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                    "target": "82573377-0325-efd5-450a-c6fa0c9d2840"
                  },
                  {
                    "id": "9891fe6e-5a1d-bd11-0756-915ea3d3be2f",
                    "source": "2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                    "target": "b7b8feae-6449-8703-4930-6c11e0c006e3"
                  },
                  {
                    "id": "209faec2-24f9-c201-4756-bf2b9c10df49",
                    "source": "2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                    "target": "751ddbb0-ad8e-b3ce-50f9-87254229d05e"
                  },
                  {
                    "id": "ac3ebc51-0a50-7748-32f0-fc92d2ef9bea",
                    "source": "2a43ed69-f93b-009d-0602-30c8ed2c5f44",
                    "target": "7453f123-be32-1945-fa15-de3a2114ba2b"
                  },
                  {
                    "id": "3e4d8c55-003b-557d-7f57-1f93ab900df1",
                    "source": "63084c6c-efa6-15f4-d33d-d5b3f6941b8d",
                    "target": "b9519547-82b8-6b20-aaa6-d381a8a73f3e"
                  },
                  {
                    "id": "fa162a02-70b9-7afd-948e-3deb14b9f288",
                    "source": "63084c6c-efa6-15f4-d33d-d5b3f6941b8d",
                    "target": "a586b23d-3b9e-f066-299e-c4bda6ae4e18"
                  },
                  {
                    "id": "cb9a2d58-6802-2978-d8cc-c938c3892790",
                    "source": "63084c6c-efa6-15f4-d33d-d5b3f6941b8d",
                    "target": "f7657fc6-3da4-6693-dff8-3a6af7ac4498"
                  },
                  {
                    "id": "0559c570-b48e-1bcf-0c24-29ca21a5aa08",
                    "source": "63084c6c-efa6-15f4-d33d-d5b3f6941b8d",
                    "target": "c328a84e-d9f1-a8e7-dff9-49d7b4dc65ae"
                  },
                  {
                    "id": "7b75c6f4-2fed-10ec-af3d-5f988f084c03",
                    "source": "91a3e17e-dacf-edab-eef1-76ac04301ebd",
                    "target": "9250f4b3-770f-609f-d669-6e670c5618e1"
                  },
                  {
                    "id": "64ecc172-59ab-cc19-38e3-137c796cfb6f",
                    "source": "a1eba6a2-bdcd-90e3-6a05-b7f345139ccc",
                    "target": "9250f4b3-770f-609f-d669-6e670c5618e1"
                  },
                  {
                    "id": "f6aaaf8c-5152-8bd3-7e2d-8724c5d8e930",
                    "source": "dc682c61-38a2-0b01-d63c-193bc5bdb749",
                    "target": "9250f4b3-770f-609f-d669-6e670c5618e1"
                  },
                  {
                    "id": "4f2a0cb1-25e2-e5b9-0f87-91fd86a50993",
                    "source": "9250f4b3-770f-609f-d669-6e670c5618e1",
                    "target": "395d3d6c-f572-e5f2-0836-881d6e0d8ab2"
                  },
                  {
                    "id": "03aa3194-62d1-3daa-a812-c3bc385c1244",
                    "source": "9250f4b3-770f-609f-d669-6e670c5618e1",
                    "target": "4a2c5f17-5471-324e-6bb3-7db9a48c7eee"
                  },
                  {
                    "id": "6d3c53dd-3db9-c150-1d73-5dc4b07f6cd8",
                    "source": "9250f4b3-770f-609f-d669-6e670c5618e1",
                    "target": "61a2532a-05e6-4ffc-9957-8615af312ee4"
                  },
                  {
                    "id": "546e16d2-da3d-da43-4601-c6cb7698bb4f",
                    "source": "eef43281-67bb-cc7e-3fa6-718e93dfd96a",
                    "target": "0a657014-5e80-5653-126c-bb9b729f6f69"
                  },
                  {
                    "id": "8669c0ca-a0da-2e80-3e40-996a6eb606b6",
                    "source": "eef43281-67bb-cc7e-3fa6-718e93dfd96a",
                    "target": "da784d40-83d5-f2c7-a2eb-4b922785e7f8"
                  },
                  {
                    "id": "fddecd7a-35b6-479c-e837-54cf5216a413",
                    "source": "55ac0c3c-3801-62b7-da0e-f8950739ac10",
                    "target": "eef43281-67bb-cc7e-3fa6-718e93dfd96a"
                  },
                  {
                    "id": "3481f62f-7554-df9e-7057-48e28aa66993",
                    "source": "55ac0c3c-3801-62b7-da0e-f8950739ac10",
                    "target": "d2428dfb-f075-3e02-c0bd-028d767ecb9d"
                  },
                  {
                    "id": "d0ef7699-d41a-8cd9-f833-f945c7088ff7",
                    "source": "0a657014-5e80-5653-126c-bb9b729f6f69",
                    "target": "607880f0-d26a-4ed8-2051-eaaa5824494a"
                  },
                  {
                    "id": "ce7c5b70-f62e-b1ef-ec48-e44e92b49e31",
                    "source": "d2428dfb-f075-3e02-c0bd-028d767ecb9d",
                    "target": "607880f0-d26a-4ed8-2051-eaaa5824494a"
                  },
                  {
                    "id": "a710b53e-593b-3aca-a08d-aeaa6923e5e1",
                    "source": "607880f0-d26a-4ed8-2051-eaaa5824494a",
                    "target": "b81db5a1-9c27-86b8-abcd-bbf488b35ec7"
                  },
                  {
                    "id": "ee6aedb4-a123-a135-4cec-ac2956816ee4",
                    "source": "c52b1af9-6f1a-013e-0d6d-ce593e19e951",
                    "target": "a077c51d-40e4-62da-5a51-c4dae379ba69"
                  },
                  {
                    "id": "05e5fcc5-b604-5502-d036-2f9990cfca13",
                    "source": "5fe3f881-f406-1014-3227-2385c3304829",
                    "target": "c52b1af9-6f1a-013e-0d6d-ce593e19e951"
                  },
                  {
                    "id": "81c5385f-c77d-1c15-1636-6a9fb8e2e43b",
                    "source": "751ddbb0-ad8e-b3ce-50f9-87254229d05e",
                    "target": "0bb3e21a-008d-b90b-79f6-ef14d1166542"
                  },
                  {
                    "id": "6fd073f3-05b3-a3ea-8729-e3752c5e9f3c",
                    "source": "a4b8b328-8382-cb05-f1f7-f48a71ec5657",
                    "target": "fbc24651-51bf-ad54-311c-609413d806e9"
                  },
                  {
                    "id": "9456fdf4-5581-8c0a-2659-768d7b6cebc9",
                    "source": "82573377-0325-efd5-450a-c6fa0c9d2840",
                    "target": "fa6688c3-c739-9d4f-eca0-4b5dcf541667"
                  },
                  {
                    "id": "bad784f6-78ef-9fb0-74f8-779a87dc0cfb",
                    "source": "9f8f17db-dd06-0cc2-1e23-286edabb94b1",
                    "target": "55ac0c3c-3801-62b7-da0e-f8950739ac10"
                  },
                  {
                    "id": "557abfc4-87f7-c0d2-d907-5bc882a093c1",
                    "source": "20b9d485-80ee-97fc-24bb-effe01322484",
                    "target": "2a43ed69-f93b-009d-0602-30c8ed2c5f44"
                  },
                  {
                    "id": "c03fad4e-3413-86e2-975c-7393c3eb3d44",
                    "source": "eeeaac2a-43f8-9e17-328b-bdeb593390dd",
                    "target": "21e1a70c-2982-dca3-fdbf-f6b013402c21"
                  },
                  {
                    "id": "d8398545-b236-79ac-d3d2-6825d7e23ee8",
                    "source": "b7b8feae-6449-8703-4930-6c11e0c006e3",
                    "target": "b1f80bb2-4446-844b-3790-d1b03acc68d4"
                  },
                  {
                    "id": "4b7ca6d9-3a44-c7b3-eab4-42e4dcb2529d",
                    "source": "7453f123-be32-1945-fa15-de3a2114ba2b",
                    "target": "1a3a5724-3811-60ec-080e-1b4f4bf55c53"
                  },
                  {
                    "id": "da1b9acf-52ba-b24f-1a34-8f7ac156406b",
                    "source": "c1a62918-29c7-ab8f-5955-e618a4da734f",
                    "target": "63084c6c-efa6-15f4-d33d-d5b3f6941b8d"
                  },
                  {
                    "id": "540f040f-7d72-cd64-1579-585245642964",
                    "source": "096eb952-80da-2c30-67c0-51588dd99329",
                    "target": "71e140e5-c2e2-a4d3-af52-992eb1690823"
                  },
                  {
                    "id": "41c899f6-6e73-b010-14aa-c7eed0238711",
                    "source": "04852e0a-74c6-bd81-3455-eccb552bd2e0",
                    "target": "1a04b961-f5fa-daf1-e646-d3b324699c3f"
                  }
                ],
                "start": {
                  "id": "9f8f17db-dd06-0cc2-1e23-286edabb94b1",
                  "x": 30,
                  "y": 1238,
                  "isQuestion": false
                },
                "end": {
                  "id": "04852e0a-74c6-bd81-3455-eccb552bd2e0",
                  "x": 52,
                  "y": 21,
                  "isQuestion": false
                },
                "silent": {
                  "id": "0333a765-9dc8-9802-26b0-0a61a73a61f4",
                  "x": 20,
                  "y": 1099
                }
              },
              "greeting": ", @9f8f17db-dd06-0cc2-1e23-286edabb94b1!",
              "unknown": ", @04852e0a-74c6-bd81-3455-eccb552bd2e0!",
              "silent": "...",
              "title": "คุยกับหนูจุก",
              "borderColor": "#ffa64d",
              "language": "TH"
            };

            successCallback(ctx);
//        }
    },

    cutWord: function(sentence, lang, successCallback, errorCallback) {
        console.log("cutting.." + sentence);
        $.get(`https://wayobot.com/cutter?sentence=${sentence}&lang=${lang}`, function(data, status) {
            successCallback(data);
        }, "text");
    },

    getPackage: function(contextId, successCallback, errorCallback) {
        successCallback({type: "E", maxEntityPerMonth:50, maxSessionPerDay:100});
    },
    
});

