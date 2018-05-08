
    /**
    * 名前の文字列を渡すと診断結果を返す関数
    * @param {string} userName ユーザーの名前
    * @return {string} 診断結果
    */

(function(){
    'use stinct'
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');


        // 診断結果表示エリアの作成

        //既に同氏名の結果が表示されている場合は削除
        /*
        while(resultDivided.firstChild){
            resultDivided.removeChild(resultDivided.firstChild);
        }*/
        function removeAllChildren(element){
            while(element.firstChild){
                element.removeChild(element.firstChild);
            }
        }

        userNameInput.onkeydown = function(event){
            if(event.keyCode === 13){
                assessmentButton.onclick();
            }
        };




        assessmentButton.onclick = function(){
            const userName = userNameInput.value;
            if(userName.length === 0){
                return;
            }

            removeAllChildren(resultDivided);
            const header = document.createElement('h3');
            header.innerText = 'below:';
            resultDivided.appendChild(header);
    
            const paragraph = document.createElement('p');
            const result = assessment(userName);
            paragraph.innerText = result;
            resultDivided.appendChild(paragraph);
        
            // ツイートエリアの作成
            removeAllChildren(tweetDivided);
            const anchor = document.createElement('a');
            const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
                + encodeURIComponent('YourGoodPoint')
                + '&ref_src=twsrc%5Etfw';
            anchor.setAttribute('href', hrefValue);
            anchor.className = 'twitter-hashtag-button';
            anchor.setAttribute('data-text', result);
            anchor.setAttribute('data-lang', 'ja');
            anchor.setAttribute('data-show-count', 'false');
            anchor.innerText = '#tweet YourGoodPoint';
            tweetDivided.appendChild(anchor);

            twttr.widgets.load();

        };


    const answers = [
        '{userName}さんのいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}さんのいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}さんのいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}さんのいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}さんのいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}さんのいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}さんのいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}さんのいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}さんのいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}さんのいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}さんのいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}さんのいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}さんのいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}さんのいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}さんのいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}さんのいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    ];


    function assessment(userName){
        //全文字のコード番号を取得してそれらを足し合わせる
        let sumOfCharCode = 0;
        for (let i = 0; i < userName.length; i++){
            sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
        }

        // 文字のコード番号の合計を回答の数で割って添字の数値を求める
        const index = sumOfCharCode % answers.length;
        let result = answers[index];
        result = result.replace(/\{userName\}/g, userName);

        //userNameをユーザの名前に置き換える
        return result;
    }

    /**
    console.assert(
        assessment('taro') === assessment('taro'),
        'error'
    );
    */




})();