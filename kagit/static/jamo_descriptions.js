const JAMO_DESCRIPTIONS = {
  "en": {
    "ㄱ": {
      "compare": "Sounds like 'g' in 'go' or 'k' in 'kite', depending on its position in the word. It's voiceless at the beginning.",
      "tip": "Imagine the ㄱ shape as a gun pointed upwards, making a 'g' sound."
    },
    "ㄴ": {
      "compare": "This is exactly like the English 'n' as in 'no'.",
      "tip": "The ㄴ shape looks like a nose, and 'n' is for nose."
    },
    "ㄷ": {
      "compare": "Similar to the 'd' in 'dog' or 't' in 'top', depending on its position. Voiceless at the beginning.",
      "tip": "Imagine ㄷ as a door; 'd' is for door."
    },
    "ㄹ": {
      "compare": "A mix between 'r' and 'l' sounds in English. Think of the 'r' in 'water' but lighter.",
      "tip": "The ㄹ shape is like a winding road, and roads often require turns like an 'r' sound."
    },
    "ㅁ": {
      "compare": "This is exactly like the English 'm' as in 'mom'.",
      "tip": "The ㅁ shape resembles a mouth, and 'm' is for mouth."
    },
    "ㅂ": {
      "compare": "Sounds like 'b' in 'boy' or 'p' in 'pen', depending on its position. Voiceless at the beginning.",
      "tip": "Imagine ㅂ as a box; 'b' is for box."
    },
    "ㅅ": {
      "compare": "Sounds like 's' in 'sun'. Be careful, sometimes it sounds like 'sh' before the 'i' vowel.",
      "tip": "The ㅅ shape looks like a slide, and 's' is for slide."
    },
    "ㅇ": {
      "compare": "Silent when used as the first consonant in a syllable. When at the end of a syllable, it sounds like 'ng' in 'sing'.",
      "tip": "Think of ㅇ as a zero sound, silent at the beginning, but adding 'ng' at the end."
    },
    "ㅈ": {
      "compare": "Similar to the 'j' in 'jump'.",
      "tip": "Imagine ㅈ as a jagged sword; 'j' is for jagged."
    },
    "ㅊ": {
      "compare": "Like the 'ch' in 'chair'. It's an aspirated (more breath) version of 'ㅈ'.",
      "tip": "ㅊ has an extra line, like an extra puff of air for the 'ch' sound."
    },
    "ㅋ": {
      "compare": "Similar to the 'k' in 'kite', but with more aspiration (breath).",
      "tip": "ㅋ looks like ㄱ with an extra line for extra breath, like 'kuh'."
    },
    "ㅌ": {
      "compare": "Like the 't' in 'top', but with more aspiration (breath).",
      "tip": "ㅌ looks like ㄷ with an extra line for extra breath, like 'tuh'."
    },
    "ㅍ": {
      "compare": "Similar to the 'p' in 'pen', but with more aspiration (breath).",
      "tip": "ㅍ looks like ㅂ with an extra line for extra breath, like 'puh'."
    },
    "ㅎ": {
      "compare": "Sounds like the 'h' in 'hat'.",
      "tip": "The ㅎ shape looks a bit like a hat, and 'h' is for hat."
    },
    "ㄲ": {
      "compare": "A tensed (stronger, tighter) version of ㄱ, similar to a sharper 'k' sound.",
      "tip": "Double consonants are always stronger, so ㄲ is a stronger 'k'."
    },
    "ㄸ": {
      "compare": "A tensed (stronger, tighter) version of ㄷ, similar to a sharper 't' sound.",
      "tip": "Double consonants are always stronger, so ㄸ is a stronger 't'."
    },
    "ㅃ": {
      "compare": "A tensed (stronger, tighter) version of ㅂ, similar to a sharper 'p' sound.",
      "tip": "Double consonants are always stronger, so ㅃ is a stronger 'p'."
    },
    "ㅆ": {
      "compare": "A tensed (stronger, tighter) version of ㅅ, similar to a sharper 's' sound.",
      "tip": "Double consonants are always stronger, so ㅆ is a stronger 's'."
    },
    "ㅉ": {
      "compare": "A tensed (stronger, tighter) version of ㅈ, similar to a sharper 'j' sound.",
      "tip": "Double consonants are always stronger, so ㅉ is a stronger 'j'."
    },
    "ㅏ": {
      "compare": "Sounds like 'ah' as in 'father'.",
      "tip": "Imagine opening your mouth wide to say 'ah'."
    },
    "ㅑ": {
      "compare": "Sounds like 'yah' as in 'yard'. It's 'ㅣ' (ee) + 'ㅏ' (ah).",
      "tip": "Add a 'y' sound before the 'ah' sound of ㅏ."
    },
    "ㅓ": {
      "compare": "Sounds like 'uh' as in 'cup', but with a slightly more open mouth.",
      "tip": "Pronounce like 'uh', but try to drop your jaw a little bit."
    },
    "ㅕ": {
      "compare": "Sounds like 'yuh' as in 'young'. It's 'ㅣ' (ee) + 'ㅓ' (uh).",
      "tip": "Add a 'y' sound before the 'uh' sound of ㅓ."
    },
    "ㅗ": {
      "compare": "Sounds like 'oh' as in 'go'.",
      "tip": "Round your lips as you say 'oh'."
    },
    "ㅛ": {
      "compare": "Sounds like 'yoh' as in 'yo-yo'. It's 'ㅣ' (ee) + 'ㅗ' (oh).",
      "tip": "Add a 'y' sound before the 'oh' sound of ㅗ."
    },
    "ㅜ": {
      "compare": "Sounds like 'oo' as in 'moon'.",
      "tip": "Purse your lips forward to make the 'oo' sound."
    },
    "ㅠ": {
      "compare": "Sounds like 'yoo' as in 'you'. It's 'ㅣ' (ee) + 'ㅜ' (oo).",
      "tip": "Add a 'y' sound before the 'oo' sound of ㅜ."
    },
    "ㅡ": {
      "compare": "Sounds like 'uh', but with your tongue further back in your mouth and lips relaxed. There is no perfect English equivalent.",
      "tip": "Try saying 'uh' without rounding your lips at all."
    },
    "ㅣ": {
      "compare": "Sounds like 'ee' as in 'see'.",
      "tip": "Smile slightly as you say 'ee'."
    },
    "ㅐ": {
      "compare": "Sounds like 'eh' as in 'bed'.",
      "tip": "It's very close to the 'e' in 'bed'."
    },
    "ㅒ": {
      "compare": "Sounds like 'yeh'. It's 'ㅣ' (ee) + 'ㅐ' (eh).",
      "tip": "Add a 'y' sound before the 'eh' sound of ㅐ."
    },
    "ㅔ": {
      "compare": "Sounds like 'eh' as in 'bed'. In modern Korean, it sounds almost identical to ㅐ.",
      "tip": "Think of it as almost the same sound as ㅐ."
    },
    "ㅖ": {
      "compare": "Sounds like 'yeh'. It's 'ㅣ' (ee) + 'ㅔ' (eh).",
      "tip": "Add a 'y' sound before the 'eh' sound of ㅔ."
    },
    "ㅘ": {
      "compare": "Sounds like 'wah'. It's a combination of 'ㅗ' (oh) and 'ㅏ' (ah).",
      "tip": "Say 'oh' then quickly transition to 'ah'."
    },
    "ㅙ": {
      "compare": "Sounds like 'weh'. It's a combination of 'ㅗ' (oh) and 'ㅐ' (eh).",
      "tip": "Say 'oh' then quickly transition to 'eh'."
    },
    "ㅚ": {
      "compare": "Sounds like 'weh'. It's a combination of 'ㅗ' (oh) and 'ㅣ' (ee), but often pronounced like 'weh' in modern Korean.",
      "tip": "Try saying 'oh-ee' quickly, then flatten to 'weh'."
    },
    "ㅝ": {
      "compare": "Sounds like 'wuh'. It's a combination of 'ㅜ' (oo) and 'ㅓ' (uh).",
      "tip": "Say 'oo' then quickly transition to 'uh'."
    },
    "ㅞ": {
      "compare": "Sounds like 'weh'. It's a combination of 'ㅜ' (oo) and 'ㅔ' (eh).",
      "tip": "Say 'oo' then quickly transition to 'eh'."
    },
    "ㅟ": {
      "compare": "Sounds like 'wee'. It's a combination of 'ㅜ' (oo) and 'ㅣ' (ee).",
      "tip": "Say 'oo-ee' quickly."
    },
    "ㅢ": {
      "compare": "Sounds like 'eui'. The pronunciation varies; it can be 'ee', 'uh-ee', or 'eh' depending on the context.",
      "tip": "Practice saying 'uh-ee' and listen for how it changes in different words."
    }
  },
  "ko": {
    "ㄱ": {
      "compare": "'가'의 'ㄱ'과 같은 소리입니다. 단어의 처음에 오면 'ㅋ' 소리에 더 가깝게 들릴 수 있습니다.",
      "tip": "기역은 'ㄱ' 모양을 기억하세요!"
    },
    "ㄴ": {
      "compare": "'나'의 'ㄴ'과 같습니다. 코에서 소리가 나는 비음입니다.",
      "tip": "니은은 코 모양을 상상해 보세요."
    },
    "ㄷ": {
      "compare": "'다'의 'ㄷ'과 같습니다. 단어 처음에 오면 'ㅌ' 소리에 더 가깝게 들릴 수 있습니다.",
      "tip": "디귿은 ㄷ 모양을 생각하며 발음해 보세요."
    },
    "ㄹ": {
      "compare": "한국어에는 'ㄹ'과 똑같은 소리는 없지만, '라디오' 할 때 'ㄹ'과 비슷합니다. 혀를 입천장에 살짝 닿게 하면서 발음하세요.",
      "tip": "'롤러코스터'를 발음할 때 혀의 움직임을 느껴보세요."
    },
    "ㅁ": {
      "compare": "'마'의 'ㅁ'과 같습니다. 입을 다물고 내는 비음입니다.",
      "tip": "미음은 입술 모양을 상상하며 발음하세요."
    },
    "ㅂ": {
      "compare": "'바'의 'ㅂ'과 같습니다. 단어 처음에 오면 'ㅍ' 소리에 더 가깝게 들릴 수 있습니다.",
      "tip": "비읍은 입술이 붙었다 떨어지는 모양을 생각하세요."
    },
    "ㅅ": {
      "compare": "'사'의 'ㅅ'과 같습니다. '시' 발음할 때는 약간 달라집니다.",
      "tip": "시옷은 칼날처럼 날카로운 소리를 상상하세요."
    },
    "ㅇ": {
      "compare": "단어 처음에 오면 소리가 나지 않습니다. '아' 할 때 '아'만 발음하세요. 받침으로 오면 'ㅇ' 소리가 납니다.",
      "tip": "이응은 텅 빈 동그라미를 생각하세요."
    },
    "ㅈ": {
      "compare": "'자'의 'ㅈ'과 같습니다. '쥐' 발음과 비슷합니다.",
      "tip": "지읒은 혀를 튕기면서 발음하세요."
    },
    "ㅊ": {
      "compare": "'차'의 'ㅊ'과 같습니다. 'ㅈ'보다 더 강하게 발음합니다.",
      "tip": "치읓은 'ㅊ' 소리를 내면서 바람이 더 많이 나오게 하세요."
    },
    "ㅋ": {
      "compare": "'카메라' 할 때 'ㅋ'과 같습니다. 'ㄱ'보다 더 숨소리가 많이 납니다.",
      "tip": "키읔은 'ㄱ' 소리에 바람 빠지는 소리를 더하세요."
    },
    "ㅌ": {
      "compare": "'타조' 할 때 'ㅌ'과 같습니다. 'ㄷ'보다 더 숨소리가 많이 납니다.",
      "tip": "티읕은 'ㄷ' 소리에 바람 빠지는 소리를 더하세요."
    },
    "ㅍ": {
      "compare": "'파도' 할 때 'ㅍ'과 같습니다. 'ㅂ'보다 더 숨소리가 많이 납니다.",
      "tip": "피읖은 'ㅂ' 소리에 바람 빠지는 소리를 더하세요."
    },
    "ㅎ": {
      "compare": "'하마' 할 때 'ㅎ'과 같습니다. 목에서 나는 소리입니다.",
      "tip": "히읗은 숨을 내쉬는 소리를 내세요."
    },
    "ㄲ": {
      "compare": "'ㄱ'을 두 번 겹쳐 쓴 것으로, 'ㄱ' 소리를 더 세게, 딱딱하게 발음합니다.",
      "tip": "쌍기역은 목에 힘을 주고 'ㄱ' 소리를 내세요."
    },
    "ㄸ": {
      "compare": "'ㄷ'을 두 번 겹쳐 쓴 것으로, 'ㄷ' 소리를 더 세게, 딱딱하게 발음합니다.",
      "tip": "쌍디귿은 혀에 힘을 주고 'ㄷ' 소리를 내세요."
    },
    "ㅃ": {
      "compare": "'ㅂ'을 두 번 겹쳐 쓴 것으로, 'ㅂ' 소리를 더 세게, 딱딱하게 발음합니다.",
      "tip": "쌍비읍은 입술에 힘을 주고 'ㅂ' 소리를 내세요."
    },
    "ㅆ": {
      "compare": "'ㅅ'을 두 번 겹쳐 쓴 것으로, 'ㅅ' 소리를 더 세게 발음합니다.",
      "tip": "쌍시옷은 'ㅅ' 소리를 더 강하게, 쉿! 하는 소리처럼 내세요."
    },
    "ㅉ": {
      "compare": "'ㅈ'을 두 번 겹쳐 쓴 것으로, 'ㅈ' 소리를 더 세게, 딱딱하게 발음합니다.",
      "tip": "쌍지읒은 'ㅈ' 소리를 더 강하게, 목에 힘을 주고 내세요."
    },
    "ㅏ": {
      "compare": "'아'의 'ㅏ'와 같습니다. 입을 크게 벌리고 '아'라고 발음하세요.",
      "tip": "아! 하고 입을 크게 벌리세요."
    },
    "ㅑ": {
      "compare": "'야'의 'ㅑ'와 같습니다. 'ㅣ' 소리를 먼저 짧게 내고 'ㅏ'를 발음하세요.",
      "tip": "'이' 다음에 '아'를 빠르게 붙여서 발음하세요."
    },
    "ㅓ": {
      "compare": "'어'의 'ㅓ'와 같습니다. 입을 조금만 벌리고 '어'라고 발음하세요.",
      "tip": "입을 살짝만 벌리고 '어'라고 하세요."
    },
    "ㅕ": {
      "compare": "'여'의 'ㅕ'와 같습니다. 'ㅣ' 소리를 먼저 짧게 내고 'ㅓ'를 발음하세요.",
      "tip": "'이' 다음에 '어'를 빠르게 붙여서 발음하세요."
    },
    "ㅗ": {
      "compare": "'오'의 'ㅗ'와 같습니다. 입술을 동그랗게 오므리고 '오'라고 발음하세요.",
      "tip": "입술을 동그랗게 만들고 '오'라고 하세요."
    },
    "ㅛ": {
      "compare": "'요'의 'ㅛ'와 같습니다. 'ㅣ' 소리를 먼저 짧게 내고 'ㅗ'를 발음하세요.",
      "tip": "'이' 다음에 '오'를 빠르게 붙여서 발음하세요."
    },
    "ㅜ": {
      "compare": "'우'의 'ㅜ'와 같습니다. 입술을 앞으로 내밀고 '우'라고 발음하세요.",
      "tip": "입술을 앞으로 쭉 내밀고 '우'라고 하세요."
    },
    "ㅠ": {
      "compare": "'유'의 'ㅠ'와 같습니다. 'ㅣ' 소리를 먼저 짧게 내고 'ㅜ'를 발음하세요.",
      "tip": "'이' 다음에 '우'를 빠르게 붙여서 발음하세요."
    },
    "ㅡ": {
      "compare": "입술을 옆으로 길게 당기면서 '으'라고 발음하세요. 한국어에만 있는 소리입니다.",
      "tip": "입술을 옆으로 쭉 찢으면서 '으'라고 하세요."
    },
    "ㅣ": {
      "compare": "'이'의 'ㅣ'와 같습니다. 입을 옆으로 살짝 벌리고 '이'라고 발음하세요.",
      "tip": "미소를 지으면서 '이'라고 하세요."
    },
    "ㅐ": {
      "compare": "'애'의 'ㅐ'와 같습니다. 'ㅏ'와 'ㅣ'의 중간 발음입니다.",
      "tip": "'아'와 '이'를 섞어서 빠르게 발음해 보세요."
    },
    "ㅒ": {
      "compare": "'얘'의 'ㅒ'와 같습니다. 'ㅑ'와 'ㅣ'의 중간 발음입니다.",
      "tip": "'야'와 '이'를 섞어서 빠르게 발음해 보세요."
    },
    "ㅔ": {
      "compare": "'에'의 'ㅔ'와 같습니다. 'ㅓ'와 'ㅣ'의 중간 발음입니다. 'ㅐ'와 거의 비슷하게 들립니다.",
      "tip": "'어'와 '이'를 섞어서 빠르게 발음해 보세요."
    },
    "ㅖ": {
      "compare": "'예'의 'ㅖ'와 같습니다. 'ㅕ'와 'ㅣ'의 중간 발음입니다.",
      "tip": "'여'와 '이'를 섞어서 빠르게 발음해 보세요."
    },
    "ㅘ": {
      "compare": "'와'의 'ㅘ'와 같습니다. 'ㅗ'와 'ㅏ'를 합쳐서 발음합니다.",
      "tip": "'오' 다음에 '아'를 빠르게 붙여서 발음하세요."
    },
    "ㅙ": {
      "compare": "'왜'의 'ㅙ'와 같습니다. 'ㅗ'와 'ㅐ'를 합쳐서 발음합니다.",
      "tip": "'오' 다음에 '애'를 빠르게 붙여서 발음하세요."
    },
    "ㅚ": {
      "compare": "'외'의 'ㅚ'와 같습니다. 'ㅗ'와 'ㅣ'를 합쳐서 발음합니다.",
      "tip": "'오' 다음에 '이'를 빠르게 붙여서 발음하세요."
    },
    "ㅝ": {
      "compare": "'워'의 'ㅝ'와 같습니다. 'ㅜ'와 'ㅓ'를 합쳐서 발음합니다.",
      "tip": "'우' 다음에 '어'를 빠르게 붙여서 발음하세요."
    },
    "ㅞ": {
      "compare": "'웨'의 'ㅞ'와 같습니다. 'ㅜ'와 'ㅔ'를 합쳐서 발음합니다.",
      "tip": "'우' 다음에 '에'를 빠르게 붙여서 발음하세요."
    },
    "ㅟ": {
      "compare": "'위'의 'ㅟ'와 같습니다. 'ㅜ'와 'ㅣ'를 합쳐서 발음합니다.",
      "tip": "'우' 다음에 '이'를 빠르게 붙여서 발음하세요."
    },
    "ㅢ": {
      "compare": "'의'의 'ㅢ'와 같습니다. 'ㅡ'와 'ㅣ'를 합쳐서 발음합니다. 발음이 어려울 수 있습니다.",
      "tip": "'으' 다음에 '이'를 빠르게 붙여서 발음하세요. 천천히 연습하세요."
    }
  },
  "ja": {
    "ㄱ": {
      "compare": "日本語の「カ」行の音に近いです。例えば、「学校（がっこう）」の「ガ」の音に似ています。語尾に来る時は「ク」の音に近くなります。",
      "tip": "アルファベットの「L」を少し傾けた形をイメージすると覚えやすいです。"
    },
    "ㄴ": {
      "compare": "日本語の「ナ」行の音と全く同じです。例えば、「な」の音です。",
      "tip": "カタカナの「二」に似ているので、すぐに覚えられます。"
    },
    "ㄷ": {
      "compare": "日本語の「タ」行の音に近いです。例えば、「タ」の音です。語尾に来る時は「ト」と「ツ」の中間のような音になります。",
      "tip": "アルファベットの「r」に似ているので、少し練習が必要です。"
    },
    "ㄹ": {
      "compare": "日本語には完全に同じ音はありません。「ラ」行に近いですが、舌先を歯茎に軽く当ててはじくように発音します。巻き舌にしないように注意してください。",
      "tip": "日本語の「ら」行より軽く、舌を丸めないように発音練習しましょう。"
    },
    "ㅁ": {
      "compare": "日本語の「マ」行の音と全く同じです。例えば、「ま」の音です。",
      "tip": "四角い口をイメージして発音すると良いでしょう。"
    },
    "ㅂ": {
      "compare": "日本語の「バ」行の音に近いです。例えば、「ば」の音です。語尾に来る時は「プ」の音に近くなります。",
      "tip": "唇を閉じてから開くように発音します。"
    },
    "ㅅ": {
      "compare": "日本語の「サ」行の音とほぼ同じです。ただし、「シ」の音は少し違います（息を漏らす感じ）。",
      "tip": "「す」の発音で、少し息を強く出すように意識すると近づきます。"
    },
    "ㅇ": {
      "compare": "単語の最初に来る場合は、音を発しません。母音を伴う音を表す記号です。語尾に来る場合は、日本語の「ん」に近い音になります。",
      "tip": "語尾の「ん」の音は、鼻から抜けるように発音します。"
    },
    "ㅈ": {
      "compare": "日本語の「ジャ」行の音に近いです。例えば、「じゃ」の音です。",
      "tip": "少し息を混ぜるように発音すると、より自然になります。"
    },
    "ㅊ": {
      "compare": "「ㅈ」の音を強く発音する音です。日本語の「チャ」行の音に近いです。",
      "tip": "「チャ」と発音するときに、息を強く出すことを意識しましょう。"
    },
    "ㅋ": {
      "compare": "「ㄱ」の音を強く発音する音です。日本語の「カ」行の音に似ていますが、息を強く出します。",
      "tip": "「カ」と発音するときに、息を強く出すことを意識しましょう。"
    },
    "ㅌ": {
      "compare": "「ㄷ」の音を強く発音する音です。日本語の「タ」行の音に似ていますが、息を強く出します。",
      "tip": "「タ」と発音するときに、息を強く出すことを意識しましょう。"
    },
    "ㅍ": {
      "compare": "「ㅂ」の音を強く発音する音です。日本語の「パ」行の音に似ていますが、息を強く出します。",
      "tip": "「パ」と発音するときに、息を強く出すことを意識しましょう。"
    },
    "ㅎ": {
      "compare": "日本語の「ハ」行の音とほぼ同じです。例えば、「は」の音です。",
      "tip": "喉から息を出すように意識して発音します。"
    },
    "ㄲ": {
      "compare": "「ㄱ」を強く発音する音です。日本語にはない音なので、少し練習が必要です。「カ」を詰まらせるように発音します。",
      "tip": "喉を閉じるようにして「カ」を強く発音します。"
    },
    "ㄸ": {
      "compare": "「ㄷ」を強く発音する音です。日本語にはない音なので、少し練習が必要です。「タ」を詰まらせるように発音します。",
      "tip": "喉を閉じるようにして「タ」を強く発音します。"
    },
    "ㅃ": {
      "compare": "「ㅂ」を強く発音する音です。日本語にはない音なので、少し練習が必要です。「パ」を詰まらせるように発音します。",
      "tip": "喉を閉じるようにして「パ」を強く発音します。"
    },
    "ㅆ": {
      "compare": "「ㅅ」を強く発音する音です。日本語にはない音なので、少し練習が必要です。「サ」を詰まらせるように発音します。",
      "tip": "喉を閉じるようにして「サ」を強く発音します。"
    },
    "ㅉ": {
      "compare": "「ㅈ」を強く発音する音です。日本語にはない音なので、少し練習が必要です。「ジャ」を詰まらせるように発音します。",
      "tip": "喉を閉じるようにして「ジャ」を強く発音します。"
    },
    "ㅏ": {
      "compare": "日本語の「ア」の音と全く同じです。例えば、「あ」の音です。",
      "tip": "口を大きく開けて「ア」と発音します。"
    },
    "ㅑ": {
      "compare": "「ㅏ」の前に「イ」の音を付けた音です。日本語の「ヤ」の音とほぼ同じです。",
      "tip": "「イ」を小さく発音してから「ア」と発音します。"
    },
    "ㅓ": {
      "compare": "日本語には近い音はありません。口を少しすぼめて「オ」と「ア」の中間のような音を出します。",
      "tip": "口をリラックスさせて「オ」と発音する練習をしましょう。"
    },
    "ㅕ": {
      "compare": "「ㅓ」の前に「イ」の音を付けた音です。日本語の「ヨ」の音に近いです。",
      "tip": "「イ」を小さく発音してから「ㅓ」を発音します。"
    },
    "ㅗ": {
      "compare": "日本語の「オ」の音とほぼ同じです。",
      "tip": "口を丸めて「オ」と発音します。"
    },
    "ㅛ": {
      "compare": "「ㅗ」の前に「イ」の音を付けた音です。日本語の「ヨ」の音と全く同じです。",
      "tip": "「イ」を小さく発音してから「オ」と発音します。"
    },
    "ㅜ": {
      "compare": "日本語の「ウ」の音とほぼ同じです。",
      "tip": "唇を突き出して「ウ」と発音します。"
    },
    "ㅠ": {
      "compare": "「ㅜ」の前に「イ」の音を付けた音です。日本語の「ユ」の音と全く同じです。",
      "tip": "「イ」を小さく発音してから「ウ」と発音します。"
    },
    "ㅡ": {
      "compare": "日本語には近い音はありません。口を横に引いて「ウ」と「イ」の中間のような音を出します。",
      "tip": "口を横に引いて「ウ」と発音する練習をしましょう。"
    },
    "ㅣ": {
      "compare": "日本語の「イ」の音と全く同じです。",
      "tip": "口を横に引いて「イ」と発音します。"
    },
    "ㅐ": {
      "compare": "日本語の「エ」の音に近いですが、少し口を大きく開けます。「애」と「에」の発音の違いは、現代韓国語ではほとんどありません。",
      "tip": "「ア」と「エ」の中間のような音を意識すると良いでしょう。"
    },
    "ㅒ": {
      "compare": "「ㅐ」の前に「イ」の音を付けた音です。日本語の「イェ」の音に近いです。",
      "tip": "「イ」を小さく発音してから「ㅐ」を発音します。"
    },
    "ㅔ": {
      "compare": "日本語の「エ」の音に近いですが、「ㅐ」よりも少し口を小さくします。「애」と「에」の発音の違いは、現代韓国語ではほとんどありません。",
      "tip": "日本語の「エ」とほとんど同じように発音できます。"
    },
    "ㅖ": {
      "compare": "「ㅔ」の前に「イ」の音を付けた音です。日本語の「イェ」の音に近いです。",
      "tip": "「イ」を小さく発音してから「ㅔ」を発音します。"
    },
    "ㅘ": {
      "compare": "「ㅗ」と「ㅏ」を組み合わせた音です。日本語の「ワ」の音に近いです。",
      "tip": "「オ」と「ア」を続けて発音するように練習します。"
    },
    "ㅙ": {
      "compare": "「ㅗ」と「ㅐ」を組み合わせた音です。日本語の「ウェ」の音に近いです。",
      "tip": "「オ」と「エ」を続けて発音するように練習します。"
    },
    "ㅚ": {
      "compare": "「ㅗ」と「ㅣ」を組み合わせた音です。日本語の「ウェ」の音に近いです。",
      "tip": "「オ」と「イ」を続けて発音するように練習します。"
    },
    "ㅝ": {
      "compare": "「ㅜ」と「ㅓ」を組み合わせた音です。日本語には近い音はありません。",
      "tip": "「ウ」と「オ」を続けて発音するように練習します。"
    },
    "ㅞ": {
      "compare": "「ㅜ」と「ㅔ」を組み合わせた音です。日本語の「ウェ」の音に近いです。",
      "tip": "「ウ」と「エ」を続けて発音するように練習します。"
    },
    "ㅟ": {
      "compare": "「ㅜ」と「ㅣ」を組み合わせた音です。日本語の「ウィ」の音に近いです。",
      "tip": "「ウ」と「イ」を続けて発音するように練習します。"
    },
    "ㅢ": {
      "compare": "「ㅡ」と「ㅣ」を組み合わせた音です。発音は少し難しいです。",
      "tip": "「ウ」と「イ」を同時に発音するようなイメージで練習します。"
    }
  },
  "zh": {
    "ㄱ": {
      "compare": "类似于汉语拼音的 'g'，但发音时可以稍微弱一点，也可以像 'k'。例如，'哥' (gē) 字。",
      "tip": "想象一下字母 'g' 的形状，把它和韩语的 ㄱ 联系起来。"
    },
    "ㄴ": {
      "compare": "与汉语拼音的 'n' 发音相同。例如，'你' (nǐ) 字。",
      "tip": "联想字母 'n' 的形状，就像一个躺倒的韩语 'ㄴ'。"
    },
    "ㄷ": {
      "compare": "类似于汉语拼音的 'd'，但发音时可以稍微轻一点，也可以像 't'。例如，'的' (de) 字。",
      "tip": "想象 'ㄷ' 像一个小的桌子，'桌子' 的拼音开头是 'd'。"
    },
    "ㄹ": {
      "compare": "这个音在汉语中没有完全对应的音。可以尝试发 'l' 和 'r' 之间的音，舌头轻轻颤动。例如，类似 '然' (rán) 字。",
      "tip": "想象一下舌头在口腔里滑动，发出 'r/l' 的声音。"
    },
    "ㅁ": {
      "compare": "与汉语拼音的 'm' 发音相同。例如，'妈' (mā) 字。",
      "tip": "记住 'ㅁ' 的形状像一个盒子，里面可以装 'm' 的声音。"
    },
    "ㅂ": {
      "compare": "类似于汉语拼音的 'b'，但发音时可以稍微轻一点，也可以像 'p'。例如，'爸' (bà) 字。",
      "tip": "把 'ㅂ' 想象成一张嘴巴，发 'b' 的声音。"
    },
    "ㅅ": {
      "compare": "类似于汉语拼音的 's'，但有时听起来更像 'sh'。例如，'四' (sì) 字。",
      "tip": "记住 'ㅅ' 像一个锯齿，发出 's' 的声音。"
    },
    "ㅇ": {
      "compare": "在韩语中，如果 'ㅇ' 出现在音节的开头，则不发音。如果出现在音节的结尾，发 'ng' 的音，类似 'ang' 的韵尾。",
      "tip": "想象 'ㅇ' 是一个空空的圆圈，不发音，或者像一个铃铛，发出 'ng' 的声音。"
    },
    "ㅈ": {
      "compare": "类似于汉语拼音的 'j'，但发音时嘴型稍微扁一点。例如，'鸡' (jī) 字。",
      "tip": "把 'ㅈ' 想象成小鸟的嘴巴，发出 'j' 的声音。"
    },
    "ㅊ": {
      "compare": "类似于汉语拼音的 'ch'，发音时送气更强。例如，'吃' (chī) 字。",
      "tip": "在 'ㅈ' 的基础上加上一横，表示送气更强，发出 'ch' 的声音。"
    },
    "ㅋ": {
      "compare": "类似于汉语拼音的 'k'，发音时送气。例如，'可' (kě) 字。",
      "tip": " 'ㅋ' 看起来像是 'ㄱ' 加上一个送气符号。"
    },
    "ㅌ": {
      "compare": "类似于汉语拼音的 't'，发音时送气。例如，'特' (tè) 字。",
      "tip": " 'ㅌ' 看起来像是 'ㄷ' 加上一个送气符号。"
    },
    "ㅍ": {
      "compare": "类似于汉语拼音的 'p'，发音时送气。例如，'怕' (pà) 字。",
      "tip": " 'ㅍ' 看起来像是 'ㅂ' 加上一个送气符号。"
    },
    "ㅎ": {
      "compare": "类似于汉语拼音的 'h'。例如，'喝' (hē) 字。",
      "tip": "记住 'ㅎ' 像一个帽子，戴在头上时会发出 'h' 的声音。"
    },
    "ㄲ": {
      "compare": "这是 'ㄱ' 的紧音，发音时声带更紧张，更用力。类似于汉语拼音 'g'，但更重，更强。",
      "tip": "想象发 'g' 的音时，更加用力，声带绷紧。"
    },
    "ㄸ": {
      "compare": "这是 'ㄷ' 的紧音，发音时声带更紧张，更用力。类似于汉语拼音 'd'，但更重，更强。",
      "tip": "想象发 'd' 的音时，更加用力，声带绷紧。"
    },
    "ㅃ": {
      "compare": "这是 'ㅂ' 的紧音，发音时声带更紧张，更用力。类似于汉语拼音 'b'，但更重，更强。",
      "tip": "想象发 'b' 的音时，更加用力，声带绷紧。"
    },
    "ㅆ": {
      "compare": "这是 'ㅅ' 的紧音，发音时声带更紧张，更用力。 类似于汉语拼音 's'，但更重，更强。",
      "tip": "想象发 's' 的音时，更加用力，声带绷紧。"
    },
    "ㅉ": {
      "compare": "这是 'ㅈ' 的紧音，发音时声带更紧张，更用力。类似于汉语拼音 'j'，但更重，更强。",
      "tip": "想象发 'j' 的音时，更加用力，声带绷紧。"
    },
    "ㅏ": {
      "compare": "类似于汉语拼音的 'a'。例如，'啊' (ā) 字。",
      "tip": "张大嘴巴，发出 'a' 的声音。"
    },
    "ㅑ": {
      "compare": "是 'ㅣ' 和 'ㅏ' 的组合，先发 'y' 的音，然后快速过渡到 'a'。类似于汉语拼音 'ya'。例如，'呀' (yā) 字。",
      "tip": "快速地连读 'y' 和 'a'。"
    },
    "ㅓ": {
      "compare": "类似于汉语拼音的 'e'，但嘴巴稍微张大一点，发音更靠后。例如，'饿' (è) 字，但更接近 'o'。",
      "tip": "想象发 'o' 的音，但嘴巴稍微扁一点。"
    },
    "ㅕ": {
      "compare": "是 'ㅣ' 和 'ㅓ' 的组合，先发 'y' 的音，然后快速过渡到 'ㅓ'。类似于汉语拼音 'ye'。例如，'也' (yě) 字。",
      "tip": "快速地连读 'y' 和 'ㅓ'。"
    },
    "ㅗ": {
      "compare": "类似于汉语拼音的 'o'。例如，'喔' (ō) 字。",
      "tip": "嘴巴呈圆形，发出 'o' 的声音。"
    },
    "ㅛ": {
      "compare": "是 'ㅣ' 和 'ㅗ' 的组合，先发 'y' 的音，然后快速过渡到 'ㅗ'。类似于汉语拼音 'yo'。例如，'哟' (yō) 字。",
      "tip": "快速地连读 'y' 和 'o'。"
    },
    "ㅜ": {
      "compare": "类似于汉语拼音的 'u'。例如，'乌' (wū) 字。",
      "tip": "嘴巴向前突出，发出 'u' 的声音。"
    },
    "ㅠ": {
      "compare": "是 'ㅣ' 和 'ㅜ' 的组合，先发 'y' 的音，然后快速过渡到 'ㅜ'。类似于汉语拼音 'yu'。例如，'鱼' (yú) 字。",
      "tip": "快速地连读 'y' 和 'u'。"
    },
    "ㅡ": {
      "compare": "这个音在汉语中没有完全对应的音。发音时嘴唇放松，舌头放平，发一个介于 'e' 和 'u' 之间的音。",
      "tip": "想象一下你在微笑，但是没有张开嘴巴，然后发出声音。"
    },
    "ㅣ": {
      "compare": "类似于汉语拼音的 'i'。例如，'一' (yī) 字。",
      "tip": "嘴角向两边拉伸，发出 'i' 的声音。"
    },
    "ㅐ": {
      "compare": "类似于汉语拼音的 'ai'，但嘴巴张得更大一点。例如，尝试发 '哎' (āi) 字，但更开放。",
      "tip": "想象发 'a' 的音，但嘴巴更扁平。"
    },
    "ㅒ": {
      "compare": "是 'ㅣ' 和 'ㅐ' 的组合，先发 'y' 的音，然后快速过渡到 'ㅐ'。类似于 'yē' 耶。",
      "tip": "快速地连读 'y' 和 'ㅐ'。"
    },
    "ㅔ": {
      "compare": "和 'ㅐ' 的发音几乎一样，现在区分度不大，但是发音时稍微靠近 'e'。 尝试发 '诶' (ēi) 字。",
      "tip": "想象发 'e' 的音，但嘴巴更扁平。"
    },
    "ㅖ": {
      "compare": "是 'ㅣ' 和 'ㅔ' 的组合，先发 'y' 的音，然后快速过渡到 'ㅔ'。类似于 'yē' 耶。",
      "tip": "快速地连读 'y' 和 'ㅔ'。"
    },
    "ㅘ": {
      "compare": "是 'ㅗ' 和 'ㅏ' 的组合，类似于汉语拼音的 'wa'。例如，'哇' (wā) 字。",
      "tip": "快速地连读 'o' 和 'a'。"
    },
    "ㅙ": {
      "compare": "是 'ㅗ' 和 'ㅐ' 的组合，类似于 'wai'，但是嘴张更大一些。",
      "tip": "快速地连读 'o' 和 'ㅐ'。"
    },
    "ㅚ": {
      "compare": "发音和 'ㅙ' 几乎一样，现代韩语口语中 'ㅚ' 和 'ㅙ' 'ㅔ' 的发音很相似。",
      "tip": "快速地连读 'o' 和 'e'。"
    },
    "ㅝ": {
      "compare": "是 'ㅜ' 和 'ㅓ' 的组合，类似于汉语拼音的 'wo'。例如，'我' (wǒ) 字。",
      "tip": "快速地连读 'u' 和 'ㅓ'。"
    },
    "ㅞ": {
      "compare": "是 'ㅜ' 和 'ㅔ' 的组合，类似英语单词 'wet' 的发音。",
      "tip": "快速地连读 'u' 和 'ㅔ'。"
    },
    "ㅟ": {
      "compare": "是 'ㅜ' 和 'ㅣ' 的组合。类似于汉语拼音的 'wei'，但嘴巴更小更圆。例如，尝试发 '喂' (wèi) 字，但嘴唇更拢。",
      "tip": "快速地连读 'u' 和 'i'。"
    },
    "ㅢ": {
      "compare": "是 'ㅡ' 和 'ㅣ' 的组合。在不同的语境下有不同的发音。可以发成 'eui' 或者直接发成 'ㅣ'。",
      "tip": "尝试快速地连读 'ㅡ' 和 'ㅣ'。"
    }
  },
  "es": {
    "ㄱ": {
      "compare": "Suena similar a la 'g' de 'gato' o la 'c' de 'casa', dependiendo de su posición en la palabra.  A veces puede sonar más como una 'k'.",
      "tip": "Piensa en la forma de la letra como una pistola que 'ka' dispara."
    },
    "ㄴ": {
      "compare": "Es idéntica a la 'n' en español, como en 'naranja'.",
      "tip": "Visualiza la letra como una 'n' inclinada."
    },
    "ㄷ": {
      "compare": "Suena similar a la 'd' de 'dedo' o la 't' de 'taza', dependiendo de su posición en la palabra. A veces suena más como 't'.",
      "tip": "Piensa en la forma de la letra como una 't' al revés."
    },
    "ㄹ": {
      "compare": "Tiene un sonido entre la 'r' suave de 'pero' y la 'l' de 'luna'. Para coreanos suena como una mezcla de ambos.",
      "tip": "Intenta pronunciar 'pero' y 'luna' rápidamente, enfocándote en la parte central de la lengua."
    },
    "ㅁ": {
      "compare": "Es idéntica a la 'm' en español, como en 'mamá'.",
      "tip": "La forma de la letra recuerda a dos montañas 'm'etálicas."
    },
    "ㅂ": {
      "compare": "Suena similar a la 'b' de 'barco' o la 'p' de 'pato', dependiendo de su posición en la palabra. A veces suena más como 'p'.",
      "tip": "Piensa en la letra como dos 'p' juntas."
    },
    "ㅅ": {
      "compare": "Suena como la 's' en español, como en 'sol'.",
      "tip": "La forma de la letra es como un zigzag de una serpiente."
    },
    "ㅇ": {
      "compare": "Al principio de una sílaba, es muda. Al final de una sílaba, suena como 'ng' en la palabra inglesa 'sing'.",
      "tip": "Cuando está al principio, ¡ignórala! Al final, canta 'ng'."
    },
    "ㅈ": {
      "compare": "Suena similar a 'ch' en 'mucho', pero más suave.  Intenta pronunciar 'mucho' sin juntar tanto la lengua con el paladar.",
      "tip": "Imagina que estás a punto de estornudar 'achís', pero te detienes antes."
    },
    "ㅊ": {
      "compare": "Suena igual que 'ch' en español, como en 'chocolate'.",
      "tip": "Piensa en 'ch'ocolate y en la línea extra que intensifica el sonido."
    },
    "ㅋ": {
      "compare": "Es igual que la 'k' en español, como en 'kilo'. Es una 'ㄱ' aspirada.",
      "tip": "Siente el aire al pronunciar la 'k' como si estuvieras tosiendo un poco."
    },
    "ㅌ": {
      "compare": "Es igual que la 't' en español, pero más aspirada.  Imagina que sale aire al pronunciarla.",
      "tip": "Pon una mano frente a tu boca al pronunciar 't' y deberías sentir un poco de aire."
    },
    "ㅍ": {
      "compare": "Es igual que la 'p' en español, pero más aspirada.  Imagina que sale aire al pronunciarla.",
      "tip": "Siente el aire al pronunciar la 'p' como si estuvieras apagando una vela."
    },
    "ㅎ": {
      "compare": "Suena como la 'h' aspirada en inglés, como en 'house'. En español, no tenemos este sonido.",
      "tip": "Imagina que estás jadeando después de correr.  Es un sonido similar."
    },
    "ㄲ": {
      "compare": "Es una 'ㄱ' pero con un sonido mucho más fuerte y tenso, como una 'k' explosiva. Como la 'k' de 'karate' pronunciada con mucha fuerza.",
      "tip": "Tensa los músculos de la garganta al pronunciarla."
    },
    "ㄸ": {
      "compare": "Es una 'ㄷ' pero con un sonido mucho más fuerte y tenso, como una 't' explosiva. No existe un sonido exactamente igual en español.",
      "tip": "Tensa los músculos de la garganta al pronunciarla."
    },
    "ㅃ": {
      "compare": "Es una 'ㅂ' pero con un sonido mucho más fuerte y tenso, como una 'p' explosiva. No existe un sonido exactamente igual en español.",
      "tip": "Tensa los músculos de la garganta al pronunciarla."
    },
    "ㅆ": {
      "compare": "Es una 'ㅅ' pero con un sonido mucho más fuerte y tenso. Imagina una 's' siseante muy fuerte, pero breve.",
      "tip": "Tensa los músculos de la garganta al pronunciarla."
    },
    "ㅉ": {
      "compare": "Es una 'ㅈ' pero con un sonido mucho más fuerte y tenso. No existe un sonido exactamente igual en español. Intenta pronunciar 'ch' de 'mucho' con mucha fuerza y breve.",
      "tip": "Tensa los músculos de la garganta al pronunciarla."
    },
    "ㅏ": {
      "compare": "Es muy similar a la 'a' en español, como en 'casa'.",
      "tip": "Piensa en la forma de la letra como una boca abierta diciendo 'a'"
    },
    "ㅑ": {
      "compare": "Es como la 'ia' en la palabra 'piano'. Es una 'a' con una 'y' al principio.",
      "tip": "Pronuncia 'ia' rápidamente."
    },
    "ㅓ": {
      "compare": "No hay un equivalente exacto en español.  Intenta pronunciar una 'o' con la boca más abierta, como si fueras a decir 'a'.",
      "tip": "Piensa en la letra como una 'o' invertida."
    },
    "ㅕ": {
      "compare": "Es como la 'io' en la palabra 'biología'. Es una 'ㅓ' con una 'y' al principio.",
      "tip": "Pronuncia 'io' rápidamente."
    },
    "ㅗ": {
      "compare": "Es muy similar a la 'o' en español, como en 'oso'.",
      "tip": "Piensa en la forma de la letra como una cara redonda diciendo 'o'"
    },
    "ㅛ": {
      "compare": "Es como la 'io' en la palabra 'yogurt'. Es una 'ㅗ' con una 'y' al principio.",
      "tip": "Pronuncia 'io' rápidamente."
    },
    "ㅜ": {
      "compare": "Es muy similar a la 'u' en español, como en 'uva'.",
      "tip": "Piensa en la forma de la letra como una copa llena de 'u'vas."
    },
    "ㅠ": {
      "compare": "Es como la 'iu' en la palabra 'ciudad'. Es una 'ㅜ' con una 'y' al principio.",
      "tip": "Pronuncia 'iu' rápidamente."
    },
    "ㅡ": {
      "compare": "No hay un equivalente exacto en español. Intenta pronunciar una 'u' con los labios estirados.",
      "tip": "Estira tus labios como si estuvieras sonriendo mientras intentas decir 'u'."
    },
    "ㅣ": {
      "compare": "Es muy similar a la 'i' en español, como en 'iglesia'.",
      "tip": "Piensa en la forma de la letra como una línea recta, como la 'i'."
    },
    "ㅐ": {
      "compare": "Suena como la 'e' en 'elefante', un poco más abierta. Es similar a la 'e' en algunas pronunciaciones regionales del español.",
      "tip": "Piensa en la 'a' y la 'i' juntas para producir un sonido entre las dos."
    },
    "ㅒ": {
      "compare": "Es como la 'ie' en la palabra 'hielo'. Es una 'ㅐ' con una 'y' al principio.",
      "tip": "Combina la 'y' con el sonido de 'ㅐ'."
    },
    "ㅔ": {
      "compare": "Suena como la 'e' en 'elefante'. Es similar a 'ㅐ'.",
      "tip": "Recuerda que 'ㅔ' y 'ㅐ' suenan casi igual para la mayoría de los coreanos."
    },
    "ㅖ": {
      "compare": "Es como la 'ie' en la palabra 'yegua'. Es una 'ㅔ' con una 'y' al principio.",
      "tip": "Combina la 'y' con el sonido de 'ㅔ'."
    },
    "ㅘ": {
      "compare": "Es como la 'ua' en la palabra 'guante'. Es una combinación de 'ㅗ' y 'ㅏ'.",
      "tip": "Pronuncia 'ua' rápidamente."
    },
    "ㅙ": {
      "compare": "Es como la 'ue' en 'suéter', pero más abierta. Es una combinación de 'ㅗ' y 'ㅐ'.",
      "tip": "Pronuncia 'ue' de manera relajada."
    },
    "ㅚ": {
      "compare": "Suena similar a 'ue' en 'hueso'. Es una combinación de 'ㅗ' y 'ㅣ'. Algunos coreanos lo pronuncian igual que 'ㅙ' y 'ㅞ'.",
      "tip": "Intenta redondear los labios al principio y luego estirarlos."
    },
    "ㅝ": {
      "compare": "Es como la 'uo' en la palabra 'cuota'. Es una combinación de 'ㅜ' y 'ㅓ'.",
      "tip": "Pronuncia 'uo' rápidamente."
    },
    "ㅞ": {
      "compare": "Suena similar a 'ue' en 'suéter'. Es una combinación de 'ㅜ' y 'ㅔ'. Algunos coreanos lo pronuncian igual que 'ㅙ' y 'ㅚ'.",
      "tip": "Pronuncia 'ue' de manera relajada."
    },
    "ㅟ": {
      "compare": "Es como la 'ui' en la palabra 'buitre'. Es una combinación de 'ㅜ' y 'ㅣ'.",
      "tip": "Pronuncia 'ui' rápidamente."
    },
    "ㅢ": {
      "compare": "No tiene un equivalente directo. Generalmente se pronuncia como 'eu-i' muy rápido. A veces suena como 'i' al final de una palabra.",
      "tip": "Practica separando los sonidos 'eu' y 'i' al principio y luego júntalos más rápidamente."
    }
  },
  "pt": {
    "ㄱ": {
      "compare": "Este som é similar ao 'c' de 'casa' ou 'g' de 'gato', dependendo da posição na palavra. No final da sílaba, soa mais como um 'k' leve.",
      "tip": "Pense na forma do ㄱ como uma arma, o som de quando se dispara uma arma, 'Ka!'"
    },
    "ㄴ": {
      "compare": "Este som é exatamente como o 'n' em português, como em 'não'.",
      "tip": "Imagine que o ㄴ é um nariz e você está dizendo 'não'."
    },
    "ㄷ": {
      "compare": "Este som é parecido com o 'd' de 'dado', mas sem a vogal extra que os brasileiros frequentemente adicionam. No final da sílaba, soa mais como um 't' leve.",
      "tip": "Pronuncie 'dado' sem deixar o ar escapar muito após o 'd'."
    },
    "ㄹ": {
      "compare": "Este som é um pouco tricky. Às vezes soa como o 'r' fraco de 'caro' e outras como o 'l' de 'luva'. Depende da posição na palavra.",
      "tip": "Pratique alternando entre 'caro' e 'luva' para sentir a diferença."
    },
    "ㅁ": {
      "compare": "Este som é idêntico ao 'm' em português, como em 'mãe'.",
      "tip": "Imagine que o ㅁ é uma boca fechada, produzindo o som 'm'."
    },
    "ㅂ": {
      "compare": "Este som é similar ao 'b' de 'bola' ou 'p' de 'pato', dependendo da posição na palavra. No final da sílaba, soa mais como um 'p' leve.",
      "tip": "Tente pronunciar 'bola' sem deixar os lábios se separarem muito explosivamente."
    },
    "ㅅ": {
      "compare": "Este som é como o 's' de 'sapato', mas nunca como o 'z' de 'zebra'.",
      "tip": "Mantenha a língua atrás dos dentes ao pronunciar 's' para obter o som correto."
    },
    "ㅇ": {
      "compare": "Este caractere é especial. No início de uma sílaba, ele é mudo (não tem som). No final, soa como o 'ng' em 'sing' (inglês). Não existe som equivalente em português.",
      "tip": "Quando no começo, ignore-o! Quando no final, tente imitar o som do 'ng' de 'sing'."
    },
    "ㅈ": {
      "compare": "Este som é parecido com o 'j' de 'jabuti', mas com mais ar. É como um 'dj' mais rápido.",
      "tip": "Tente dizer 'dj' bem rápido, quase como uma única sílaba."
    },
    "ㅊ": {
      "compare": "Este som é como o 'tch' em 'tchau'.",
      "tip": "Pense no 'tchau' quando vir este caractere."
    },
    "ㅋ": {
      "compare": "Este som é um 'k' mais forte e aspirado do que o som de ㄱ. Imagine que você está expelindo ar.",
      "tip": "Pronuncie 'casa' com mais força, como se estivesse tossindo levemente."
    },
    "ㅌ": {
      "compare": "Este som é um 't' mais forte e aspirado do que o som de ㄷ. Imagine que você está expelindo ar.",
      "tip": "Pronuncie 'teto' com mais força, como se estivesse tossindo levemente."
    },
    "ㅍ": {
      "compare": "Este som é um 'p' mais forte e aspirado do que o som de ㅂ. Imagine que você está expelindo ar.",
      "tip": "Pronuncie 'pato' com mais força, como se estivesse soprando uma vela."
    },
    "ㅎ": {
      "compare": "Este som é como o 'rr' fraco de 'carro' ou como o 'h' aspirado do inglês ('house').",
      "tip": "Imagine que você está embaçando um espelho com a boca aberta."
    },
    "ㄲ": {
      "compare": "Este som é como um 'k' forte e tenso. É como dizer 'casa' com muita ênfase, travando um pouco a garganta.",
      "tip": "Tente dizer 'casa' com raiva, travando a garganta."
    },
    "ㄸ": {
      "compare": "Este som é como um 't' forte e tenso. É como dizer 'teto' com muita ênfase.",
      "tip": "Tente dizer 'teto' com muita força."
    },
    "ㅃ": {
      "compare": "Este som é como um 'p' forte e tenso. É como dizer 'pato' com muita ênfase.",
      "tip": "Tente dizer 'pato' com muita força, como se estivesse bravo."
    },
    "ㅆ": {
      "compare": "Este som é como um 's' forte e tenso. É como dizer 'sapato' com muita ênfase.",
      "tip": "Tente dizer 'sapato' com muita força, travando um pouco a língua."
    },
    "ㅉ": {
      "compare": "Este som é como um 'dj' forte e tenso. É como dizer 'jabuti' com muita ênfase, mas de forma mais explosiva e curta.",
      "tip": "Tente dizer 'dj' com muita força e rapidez."
    },
    "ㅏ": {
      "compare": "Este som é exatamente como o 'a' em 'pai'.",
      "tip": "Abra bem a boca ao pronunciar 'a'."
    },
    "ㅑ": {
      "compare": "Este som é como 'ia' em 'diabo'.",
      "tip": "Combine o som de 'i' e 'a' rapidamente."
    },
    "ㅓ": {
      "compare": "Este som não existe exatamente em português. É um 'o' aberto e curto, como se você estivesse surpreso. Tente dizer 'ó' sem arredondar os lábios.",
      "tip": "Imagine que você está dizendo 'ó' sem mover os lábios."
    },
    "ㅕ": {
      "compare": "Este som é como 'io' em 'iogurte', mas mais curto.",
      "tip": "Combine o som de 'i' e 'ㅓ' rapidamente."
    },
    "ㅗ": {
      "compare": "Este som é como o 'o' fechado em 'ovo'.",
      "tip": "Arredonde os lábios ao pronunciar 'o'."
    },
    "ㅛ": {
      "compare": "Este som é como 'io' em 'ioiô'.",
      "tip": "Combine o som de 'i' e 'o' rapidamente."
    },
    "ㅜ": {
      "compare": "Este som é como o 'u' em 'uva'.",
      "tip": "Feche um pouco os lábios ao pronunciar 'u'."
    },
    "ㅠ": {
      "compare": "Este som é como 'iu' em 'híbrido'.",
      "tip": "Combine o som de 'i' e 'u' rapidamente."
    },
    "ㅡ": {
      "compare": "Este som não existe exatamente em português. É um 'u' com a boca mais aberta e os lábios relaxados.",
      "tip": "Tente dizer 'u' sem mover os lábios."
    },
    "ㅣ": {
      "compare": "Este som é exatamente como o 'i' em 'ilha'.",
      "tip": "Mantenha a boca estreita ao pronunciar 'i'."
    },
    "ㅐ": {
      "compare": "Este som é muito parecido com o 'é' aberto em 'pé'.",
      "tip": "Pense na palavra 'pé' para lembrar o som."
    },
    "ㅒ": {
      "compare": "Este som é como 'ié' em 'iêmen'.",
      "tip": "Combine o som de 'i' e 'ㅐ' rapidamente."
    },
    "ㅔ": {
      "compare": "Este som é muito parecido com o 'é' aberto em 'pé'. Na Coreia moderna, a pronúncia de ㅔ e ㅐ são quase idênticas.",
      "tip": "Assim como o ㅐ, pense na palavra 'pé' para lembrar o som."
    },
    "ㅖ": {
      "compare": "Este som é como 'ié' em 'iéld'. Similar ao ㅒ.",
      "tip": "Combine o som de 'i' e 'ㅔ' rapidamente."
    },
    "ㅘ": {
      "compare": "Este som é como 'uá' em 'quase'.",
      "tip": "Combine o som de 'ㅗ' (o) e 'ㅏ' (a) rapidamente."
    },
    "ㅙ": {
      "compare": "Este som é como 'ué' em 'suéter'.",
      "tip": "Combine o som de 'ㅗ' (o) e 'ㅐ' (é) rapidamente."
    },
    "ㅚ": {
      "compare": "Este som é parecido com 'ué', como em 'suéter', mas mais curto e tenso. Outros coreanos pronunciam como 'weh'.",
      "tip": "Combine o som de 'ㅗ' (o) e 'ㅣ' (i) rapidamente."
    },
    "ㅝ": {
      "compare": "Este som é como 'uó' em 'quórum'.",
      "tip": "Combine o som de 'ㅜ' (u) e 'ㅓ' (o aberto) rapidamente."
    },
    "ㅞ": {
      "compare": "Este som é como 'ué' em 'suéter', mas mais curto. Coreanos mais jovens pronunciam como o ㅙ e ㅚ.",
      "tip": "Combine o som de 'ㅜ' (u) e 'ㅔ' (é) rapidamente."
    },
    "ㅟ": {
      "compare": "Este som é como 'uí' em 'Luís'.",
      "tip": "Combine o som de 'ㅜ' (u) e 'ㅣ' (i) rapidamente."
    },
    "ㅢ": {
      "compare": "Este som é difícil. Normalmente é pronunciado como '으이 (eui)' ou '이 (i)' dependendo da palavra e do falante.",
      "tip": "Tente pronunciar 'ㅡ' e 'ㅣ' rapidamente juntos."
    }
  },
  "fr": {
    "ㄱ": {
      "compare": "Ce son ressemble au 'g' dans 'gare' ou au 'k' dans 'koala', selon sa position dans le mot. Pensez au 'g' de 'garçon'.",
      "tip": "Imaginez la forme de la lettre comme un pistolet qui fait 'Guh!'"
    },
    "ㄴ": {
      "compare": "Ce son est identique au 'n' dans 'nez'. C'est un son très simple.",
      "tip": "La forme de la lettre ressemble à un nez."
    },
    "ㄷ": {
      "compare": "Ce son ressemble au 'd' dans 'dent' ou au 't' dans 'table', selon sa position dans le mot. Pensez au 'd' de 'dame'.",
      "tip": "Imaginez un 'd' couché sur le côté."
    },
    "ㄹ": {
      "compare": "Ce son est difficile pour les francophones. Il se situe entre le 'r' roulé espagnol et le 'l' français. Imaginez dire 'le riz' très rapidement.",
      "tip": "Entraînez-vous à dire 'la rue' rapidement pour vous rapprocher du son."
    },
    "ㅁ": {
      "compare": "Ce son est identique au 'm' dans 'mère'.  Un son nasal très clair.",
      "tip": "La forme de la lettre ressemble à une bouche fermée."
    },
    "ㅂ": {
      "compare": "Ce son ressemble au 'b' dans 'bon' ou au 'p' dans 'pomme', selon sa position dans le mot. Pensez au 'b' de 'bébé'.",
      "tip": "Visualisez deux bouches qui se rencontrent pour faire le son."
    },
    "ㅅ": {
      "compare": "Ce son est identique au 's' dans 'soleil'. Il peut parfois ressembler à 'ch' devant les voyelles 'i' et 'ya'.",
      "tip": "Imaginez un serpent qui siffle."
    },
    "ㅇ": {
      "compare": "Ce caractère est souvent silencieux au début d'une syllabe. En fin de syllabe, il se prononce comme le 'ng' anglais dans 'sing'. Il n'y a pas d'équivalent exact en français.",
      "tip": "Pensez à un cercle vide (silence) ou au son 'ng' en anglais pour la fin de syllabe."
    },
    "ㅈ": {
      "compare": "Ce son ressemble au 'j' dans 'jour' ou au 'dj' dans 'adjudant'. Pensez au 'j' de 'jeune'.",
      "tip": "Imaginez la lettre comme un toboggan avec un petit chapeau qui dit 'joue'!"
    },
    "ㅊ": {
      "compare": "Ce son est comme le 'tch' dans le mot anglais 'watch' ou le 'ch' renforcé. Il n'a pas d'équivalent direct en français, mais imaginez un 'ch' plus explosif.",
      "tip": "Pensez à un éternuement fort : 'ATCHOUM!'"
    },
    "ㅋ": {
      "compare": "Ce son est comme le 'k' dans 'kilo', mais plus aspiré, plus fort. C'est un 'k' prononcé avec plus d'air.",
      "tip": "Imaginez une toux légère quand vous le prononcez: 'K-ha!'"
    },
    "ㅌ": {
      "compare": "Ce son est comme le 't' dans 'table', mais plus aspiré, plus fort. C'est un 't' prononcé avec plus d'air.",
      "tip": "Imaginez un 't' qui souffle de l'air: 'T-ha!'"
    },
    "ㅍ": {
      "compare": "Ce son est comme le 'p' dans 'pomme', mais plus aspiré, plus fort. C'est un 'p' prononcé avec plus d'air.",
      "tip": "Imaginez une bouffée d'air qui sort de votre bouche quand vous le prononcez: 'P-ha!'"
    },
    "ㅎ": {
      "compare": "Ce son est comme le 'h' aspiré en anglais dans 'house' ou en allemand.  Il n'existe pas en français standard (il est souvent muet).",
      "tip": "Imaginez que vous haletez légèrement en prononçant ce son: 'H-ha!'"
    },
    "ㄲ": {
      "compare": "C'est un 'k' dur et tendu, comme si vous insistiez fortement sur le 'k' dans 'koala'. Imaginez un double 'k' très fort.",
      "tip": "Prononcez 'koala' très vite et en insistant sur le 'k'."
    },
    "ㄸ": {
      "compare": "C'est un 't' dur et tendu, comme si vous insistiez fortement sur le 't' dans 'table'. Imaginez un double 't' très fort.",
      "tip": "Prononcez 'table' très vite et en insistant sur le 't'."
    },
    "ㅃ": {
      "compare": "C'est un 'p' dur et tendu, comme si vous insistiez fortement sur le 'p' dans 'pomme'. Imaginez un double 'p' très fort.",
      "tip": "Prononcez 'pomme' très vite et en insistant sur le 'p'."
    },
    "ㅆ": {
      "compare": "C'est un 's' dur et tendu, comme si vous insistiez fortement sur le 's' dans 'serpent'. Imaginez un double 's' très fort.",
      "tip": "Sifflez comme un serpent en insistant sur le 's'."
    },
    "ㅉ": {
      "compare": "C'est un 'j' dur et tendu, comme si vous insistiez fortement sur le 'j' dans 'jour'. Imaginez un double 'j' très fort.",
      "tip": "Prononcez 'jour' très vite et en insistant sur le 'j'."
    },
    "ㅏ": {
      "compare": "Ce son est comme le 'a' dans 'chat'. C'est un 'a' ouvert et clair.",
      "tip": "Imaginez que vous ouvrez grand la bouche en disant 'ah!'"
    },
    "ㅑ": {
      "compare": "Ce son est comme le 'ya' dans 'yacht'. C'est un 'a' précédé d'un 'y'.",
      "tip": "Prononcez 'yaourt' très vite."
    },
    "ㅓ": {
      "compare": "Ce son est proche du 'o' ouvert dans 'pomme' ou du 'e' dans 'le' (sans le son 'uh'). C'est une voyelle neutre, plus ouverte que le 'o' français.",
      "tip": "Imaginez un 'o' que vous aplatissez."
    },
    "ㅕ": {
      "compare": "Ce son est comme le 'yo' dans 'yoga', mais plus ouvert. C'est un 'o' ouvert précédé d'un 'y'.",
      "tip": "Prononcez 'yo-yo' très vite."
    },
    "ㅗ": {
      "compare": "Ce son est comme le 'o' dans 'mot'. C'est un 'o' fermé et rond.",
      "tip": "Imaginez que vous faites une petite bouche ronde en disant 'oh!'"
    },
    "ㅛ": {
      "compare": "Ce son est comme le 'yo' dans 'yo-yo'. C'est un 'o' fermé précédé d'un 'y'.",
      "tip": "Prononcez 'yoga' en insistant sur le 'yo'."
    },
    "ㅜ": {
      "compare": "Ce son est comme le 'ou' dans 'boue'. C'est un 'ou' simple et clair.",
      "tip": "Imaginez que vous faites la moue en disant 'ou!'"
    },
    "ㅠ": {
      "compare": "Ce son est comme le 'u' dans 'tu'. C'est un 'ou' précédé d'un 'y'.",
      "tip": "Prononcez 'utile' très vite."
    },
    "ㅡ": {
      "compare": "Ce son n'existe pas en français. Il se prononce en gardant les lèvres plates et en disant un 'eu' (comme dans 'jeu') mais sans arrondir les lèvres. C'est une voyelle neutre.",
      "tip": "Tirez les lèvres sur les côtés comme pour sourire tout en essayant de dire 'eu'."
    },
    "ㅣ": {
      "compare": "Ce son est comme le 'i' dans 'lit'. C'est un 'i' simple et clair.",
      "tip": "Imaginez que vous souriez en disant 'i!'"
    },
    "ㅐ": {
      "compare": "Ce son est similaire au 'è' dans 'père' ou au 'ai' dans 'lait'. C'est un 'é' ouvert.",
      "tip": "Pensez à la phrase 'J'ai faim!'"
    },
    "ㅒ": {
      "compare": "Ce son est comme 'yè' dans 'hière', une version 'ya' du 'è'.",
      "tip": "Imaginez que vous dites 'Hier, il a fait beau!'"
    },
    "ㅔ": {
      "compare": "Ce son est similaire au 'é' dans 'été' ou au 'e' dans 'le' quand on l'entend bien. Il est proche de 'ㅐ' mais légèrement plus fermé.",
      "tip": "Pensez à la phrase 'Je vais aller à l'été!'"
    },
    "ㅖ": {
      "compare": "Ce son est comme 'yé' dans 'yeux', une version 'ya' du 'é'.",
      "tip": "Imaginez que vous dites 'J'ai de beaux yeux!'"
    },
    "ㅘ": {
      "compare": "C'est la combinaison des sons 'ㅗ' (o) et 'ㅏ' (a), prononcée rapidement: 'wa'. Comme dans 'toi et moi'.",
      "tip": "Essayez de dire 'toi et moi' très vite pour vous rapprocher du son."
    },
    "ㅙ": {
      "compare": "C'est la combinaison des sons 'ㅗ' (o) et 'ㅐ' (è), prononcée rapidement: 'wè'. Proche de 'ouais'.",
      "tip": "Pensez au mot 'ouais', en insistant sur le 'w'."
    },
    "ㅚ": {
      "compare": "Ce son est complexe et peut varier. Il peut être proche de 'wè' ou d'un 'oe' plus fermé. Dans certains dialectes, il ressemble à 'we'.",
      "tip": "Entraînez-vous en écoutant des locuteurs natifs."
    },
    "ㅝ": {
      "compare": "C'est la combinaison des sons 'ㅜ' (ou) et 'ㅓ' (o ouvert), prononcée rapidement: 'wo'.",
      "tip": "Essayez de dire 'voilà' avec un 'o' plus ouvert et rapide."
    },
    "ㅞ": {
      "compare": "C'est la combinaison des sons 'ㅜ' (ou) et 'ㅔ' (é), prononcée rapidement: 'wé'.",
      "tip": "Pensez à 'ou est' prononcé rapidement."
    },
    "ㅟ": {
      "compare": "C'est la combinaison des sons 'ㅜ' (ou) et 'ㅣ' (i), prononcée rapidement: 'wi'.",
      "tip": "Essayez de dire 'oui' très vite."
    },
    "ㅢ": {
      "compare": "Ce son est difficile. Il peut se prononcer 'eu-i' (comme dans 'feuille'), 'e' (comme dans 'le') ou 'i' (comme dans 'lit') selon le mot. Souvent réduit à 'i' en prononciation rapide.",
      "tip": "Écoutez attentivement des locuteurs natifs pour bien saisir les variations de prononciation."
    }
  },
  "vi": {
    "ㄱ": {
      "compare": "Âm 'g' trong tiếng Việt gần giống khi 'ㄱ' đứng đầu âm tiết, như trong từ 'ga'. Khi đứng cuối âm tiết, nó phát âm giống 'k'.",
      "tip": "Tưởng tượng hình dạng của 'ㄱ' giống như một khẩu súng ngắn, phát ra âm 'k' khi bắn."
    },
    "ㄴ": {
      "compare": "Âm 'ㄴ' hoàn toàn giống âm 'n' trong tiếng Việt.",
      "tip": "Hãy nhớ 'ㄴ' giống như một cây cầu có một nhịp, tượng trưng cho âm 'n' đáng tin cậy."
    },
    "ㄷ": {
      "compare": "Âm 'ㄷ' tương tự âm 'đ' trong tiếng Việt, nhưng có thể nghe giống 't' khi đứng cuối âm tiết.",
      "tip": "Hình dạng của 'ㄷ' giống như một cái kệ, hãy tưởng tượng bạn đặt đồ vật lên đó, phát ra âm 'đ' nhẹ."
    },
    "ㄹ": {
      "compare": "Âm 'ㄹ' khó so sánh trực tiếp với tiếng Việt. Nó là sự kết hợp giữa âm 'r' nhẹ và âm 'l', tùy thuộc vào vị trí trong từ.",
      "tip": "Luyện tập bằng cách nói nhanh 'ra-la-ra-la' để làm quen với âm này."
    },
    "ㅁ": {
      "compare": "Âm 'ㅁ' hoàn toàn giống âm 'm' trong tiếng Việt.",
      "tip": "Hãy tưởng tượng 'ㅁ' là một cái hộp kín, tượng trưng cho âm 'm' được giữ bên trong."
    },
    "ㅂ": {
      "compare": "Âm 'ㅂ' tương tự âm 'b' trong tiếng Việt, nhưng có thể nghe giống 'p' khi đứng cuối âm tiết.",
      "tip": "Hãy tưởng tượng 'ㅂ' là một chiếc bát úp ngược, phát ra âm 'b' khi bạn nhấc nó lên."
    },
    "ㅅ": {
      "compare": "Âm 'ㅅ' giống âm 'x' hoặc 's' trong tiếng Việt, tùy vào giọng địa phương của bạn.",
      "tip": "Hình dạng của 'ㅅ' giống như một ngọn núi, hãy nhớ đến âm 's' khi bạn leo lên nó."
    },
    "ㅇ": {
      "compare": "Khi đứng đầu âm tiết, 'ㅇ' là âm câm. Khi đứng cuối âm tiết, nó là âm 'ng', như trong 'ăng-ten'.",
      "tip": "Hãy nhớ 'ㅇ' giống như một cái giếng sâu, không có âm thanh gì khi nhìn xuống, nhưng có âm 'ng' vang vọng khi ném một hòn đá."
    },
    "ㅈ": {
      "compare": "Âm 'ㅈ' tương tự âm 'ch' trong tiếng Việt, nhưng hơi bật hơn.",
      "tip": "Hãy tưởng tượng 'ㅈ' là một con dao đang chém, tạo ra âm 'ch' mạnh mẽ."
    },
    "ㅊ": {
      "compare": "Âm 'ㅊ' là phiên bản mạnh hơn của 'ㅈ', phát âm như 'ch' mạnh, có hơi bật ra.",
      "tip": "Thêm một gạch ngang vào 'ㅈ' để biểu thị âm 'ch' mạnh hơn."
    },
    "ㅋ": {
      "compare": "Âm 'ㅋ' là âm 'k' bật hơi, tương tự như khi bạn nói 'kh' trong tiếng Việt (ví dụ: 'khăn quàng').",
      "tip": "Hãy tưởng tượng 'ㅋ' là một cái diều đang bay lên, phát ra âm 'k' mạnh mẽ."
    },
    "ㅌ": {
      "compare": "Âm 'ㅌ' là âm 't' bật hơi, tương tự như khi bạn nói 'th' trong tiếng Việt (ví dụ: 'thơ').",
      "tip": "Thêm một gạch ngang vào 'ㄷ' để biểu thị âm 't' mạnh hơn."
    },
    "ㅍ": {
      "compare": "Âm 'ㅍ' là âm 'p' bật hơi, gần giống khi bạn nói 'ph' trong tiếng Việt (ví dụ: 'phở').",
      "tip": "Hãy tưởng tượng 'ㅍ' là một cái phi tiêu đang bay, phát ra âm 'p' mạnh mẽ."
    },
    "ㅎ": {
      "compare": "Âm 'ㅎ' hoàn toàn giống âm 'h' trong tiếng Việt.",
      "tip": "Hình dạng của 'ㅎ' giống như một chiếc mũ, tượng trưng cho âm 'h' lịch sự."
    },
    "ㄲ": {
      "compare": "Âm 'ㄲ' là âm 'k' căng, mạnh hơn âm 'ㄱ' rất nhiều. Hãy siết chặt thanh quản khi phát âm.",
      "tip": "Hãy nhớ 'ㄲ' là hai chữ 'ㄱ' gộp lại, nhân đôi độ mạnh của âm 'k'."
    },
    "ㄸ": {
      "compare": "Âm 'ㄸ' là âm 't' căng, mạnh hơn âm 'ㄷ' rất nhiều. Hãy siết chặt thanh quản khi phát âm.",
      "tip": "Hãy nhớ 'ㄸ' là hai chữ 'ㄷ' gộp lại, nhân đôi độ mạnh của âm 't'."
    },
    "ㅃ": {
      "compare": "Âm 'ㅃ' là âm 'p' căng, mạnh hơn âm 'ㅂ' rất nhiều. Hãy siết chặt thanh quản khi phát âm.",
      "tip": "Hãy nhớ 'ㅃ' là hai chữ 'ㅂ' gộp lại, nhân đôi độ mạnh của âm 'p'."
    },
    "ㅆ": {
      "compare": "Âm 'ㅆ' là âm 's' căng, mạnh hơn âm 'ㅅ' rất nhiều. Hãy siết chặt thanh quản khi phát âm.",
      "tip": "Hãy nhớ 'ㅆ' là hai chữ 'ㅅ' gộp lại, nhân đôi độ mạnh của âm 's'."
    },
    "ㅉ": {
      "compare": "Âm 'ㅉ' là âm 'ch' căng, mạnh hơn âm 'ㅈ' rất nhiều. Hãy siết chặt thanh quản khi phát âm.",
      "tip": "Hãy nhớ 'ㅉ' là hai chữ 'ㅈ' gộp lại, nhân đôi độ mạnh của âm 'ch'."
    },
    "ㅏ": {
      "compare": "Âm 'ㅏ' giống âm 'a' trong tiếng Việt (ví dụ: 'ba').",
      "tip": "Hãy tưởng tượng bạn đang há miệng rộng để phát âm 'a'."
    },
    "ㅑ": {
      "compare": "Âm 'ㅑ' giống âm 'ya' trong tiếng Việt (ví dụ: 'yaourt').",
      "tip": "Thêm âm 'y' vào trước âm 'a'."
    },
    "ㅓ": {
      "compare": "Âm 'ㅓ' không có âm tương đương trực tiếp trong tiếng Việt. Phát âm gần giống âm 'o' nhưng môi hơi dẹt hơn (giữa 'o' và 'ơ').",
      "tip": "Hãy thử phát âm 'o' nhưng kéo dài miệng sang hai bên."
    },
    "ㅕ": {
      "compare": "Âm 'ㅕ' giống âm 'yo' trong tiếng Việt, nhưng ngắn và dứt khoát hơn (ví dụ: 'yoga').",
      "tip": "Thêm âm 'y' vào trước âm 'ㅓ'."
    },
    "ㅗ": {
      "compare": "Âm 'ㅗ' giống âm 'ô' trong tiếng Việt (ví dụ: 'tô').",
      "tip": "Hãy tưởng tượng bạn đang chu môi để thổi sáo, phát ra âm 'ô'."
    },
    "ㅛ": {
      "compare": "Âm 'ㅛ' giống âm 'yô' trong tiếng Việt (ví dụ: 'yô-ga').",
      "tip": "Thêm âm 'y' vào trước âm 'ㅗ'."
    },
    "ㅜ": {
      "compare": "Âm 'ㅜ' giống âm 'u' trong tiếng Việt (ví dụ: 'tú').",
      "tip": "Hãy tưởng tượng bạn đang thổi nến, phát ra âm 'u'."
    },
    "ㅠ": {
      "compare": "Âm 'ㅠ' giống âm 'iu' trong tiếng Việt (ví dụ: 'riêu').",
      "tip": "Thêm âm 'y' vào trước âm 'ㅜ'."
    },
    "ㅡ": {
      "compare": "Âm 'ㅡ' không có âm tương đương trực tiếp trong tiếng Việt. Phát âm gần giống âm 'ư' nhưng môi không tròn.",
      "tip": "Hãy giữ môi thẳng và phát âm một âm gì đó giữa 'ư' và 'ơ'."
    },
    "ㅣ": {
      "compare": "Âm 'ㅣ' giống âm 'i' trong tiếng Việt (ví dụ: 'đi').",
      "tip": "Hãy tưởng tượng bạn đang cười mỉm, phát ra âm 'i'."
    },
    "ㅐ": {
      "compare": "Âm 'ㅐ' gần giống âm 'e' trong tiếng Việt, nhưng mở miệng rộng hơn một chút (giữa 'e' và 'a').",
      "tip": "Hãy phát âm 'e' và cố gắng mở miệng rộng hơn một chút."
    },
    "ㅒ": {
      "compare": "Âm 'ㅒ' giống âm 'ye' trong tiếng Việt, như trong 'yếu'.",
      "tip": "Kết hợp âm 'ya' với âm 'e'."
    },
    "ㅔ": {
      "compare": "Âm 'ㅔ' gần giống âm 'ê' trong tiếng Việt (ví dụ: 'tê').",
      "tip": "Hãy phát âm 'ê' một cách rõ ràng."
    },
    "ㅖ": {
      "compare": "Âm 'ㅖ' giống âm 'yê' trong tiếng Việt (ví dụ: 'yết hầu').",
      "tip": "Kết hợp âm 'y' với âm 'ê'."
    },
    "ㅘ": {
      "compare": "Âm 'ㅘ' giống âm 'oa' trong tiếng Việt (ví dụ: 'hoa').",
      "tip": "Kết hợp âm 'ô' với âm 'a'."
    },
    "ㅙ": {
      "compare": "Âm 'ㅙ' giống âm 'oe' trong tiếng Việt (ví dụ: 'hoe').",
      "tip": "Kết hợp âm 'ô' với âm 'e'."
    },
    "ㅚ": {
      "compare": "Âm 'ㅚ' phát âm gần giống như 'oe' nhưng tròn môi hơn, tuy nhiên trong tiếng Hàn hiện đại, phát âm gần giống 'ㅙ' (weh).",
      "tip": "Hãy cố gắng tròn môi khi phát âm 'oe'."
    },
    "ㅝ": {
      "compare": "Âm 'ㅝ' giống âm 'uơ' trong tiếng Việt (ví dụ: 'muộn').",
      "tip": "Kết hợp âm 'u' với âm 'ơ'."
    },
    "ㅞ": {
      "compare": "Âm 'ㅞ' không có âm tương đương trực tiếp trong tiếng Việt, nhưng phát âm gần giống như 'uê', nhưng nhanh hơn. Thường được phát âm giống 'ㅙ' hoặc 'ㅚ'.",
      "tip": "Kết hợp âm 'u' với âm 'ê'."
    },
    "ㅟ": {
      "compare": "Âm 'ㅟ' giống âm 'uy' trong tiếng Việt (ví dụ: 'túy').",
      "tip": "Kết hợp âm 'u' với âm 'i'."
    },
    "ㅢ": {
      "compare": "Âm 'ㅢ' không có âm tương đương trực tiếp trong tiếng Việt. Nó thường được phát âm là 'ưi', 'ư', hoặc 'i' tùy thuộc vào vị trí trong từ.",
      "tip": "Phát âm nhanh âm 'ư' rồi chuyển sang âm 'i'."
    }
  },
  "id": {
    "ㄱ": {
      "compare": "Bunyi 'ㄱ' mirip dengan huruf 'k' pada kata 'kopi' atau 'g' pada 'gajah'. Tergantung posisinya di kata, bisa terdengar lebih seperti 'k' atau 'g'.",
      "tip": "Bayangkan bentuk 'ㄱ' seperti pistol kecil yang menembakkan suara 'k' atau 'g'."
    },
    "ㄴ": {
      "compare": "Bunyi 'ㄴ' sama persis dengan huruf 'n' pada kata 'naga'.",
      "tip": "Ingatlah bentuk 'ㄴ' seperti jembatan kecil menuju 'n' yang baru."
    },
    "ㄷ": {
      "compare": "Bunyi 'ㄷ' mirip dengan huruf 'd' pada kata 'dua' atau 't' pada 'tikus'. Tergantung posisinya di kata, bisa terdengar lebih seperti 'd' atau 't'.",
      "tip": "Bayangkan 'ㄷ' sebagai pintu yang mengeluarkan suara 'd' atau 't'."
    },
    "ㄹ": {
      "compare": "Bunyi 'ㄹ' adalah kombinasi antara 'r' dan 'l' dalam Bahasa Indonesia. Lidah menyentuh langit-langit mulut sedikit saat mengucapkan.",
      "tip": "Latih mengucapkan 'r' dan 'l' secara bergantian dengan cepat untuk mendapatkan suara 'ㄹ'."
    },
    "ㅁ": {
      "compare": "Bunyi 'ㅁ' sama persis dengan huruf 'm' pada kata 'mama'.",
      "tip": "Bentuk 'ㅁ' seperti kotak yang berisi suara 'm'."
    },
    "ㅂ": {
      "compare": "Bunyi 'ㅂ' mirip dengan huruf 'b' pada kata 'bola' atau 'p' pada 'pena'. Tergantung posisinya di kata, bisa terdengar lebih seperti 'b' atau 'p'.",
      "tip": "Bayangkan 'ㅂ' seperti bibir yang mengecup suara 'b' atau 'p'."
    },
    "ㅅ": {
      "compare": "Bunyi 'ㅅ' sama persis dengan huruf 's' pada kata 'susu'.",
      "tip": "Ingat bentuk 'ㅅ' seperti ular kecil yang mendesis 's'."
    },
    "ㅇ": {
      "compare": "Huruf 'ㅇ' tidak memiliki bunyi saat berada di awal suku kata (silent). Di akhir suku kata, bunyinya seperti 'ng' pada kata 'senang'.",
      "tip": "Bayangkan 'ㅇ' sebagai lubang kosong di awal suku kata, tetapi penuh dengan 'ng' di akhir."
    },
    "ㅈ": {
      "compare": "Bunyi 'ㅈ' mirip dengan gabungan 'j' dan 'c' pada kata 'jendela', tetapi lebih dekat ke 'j'.",
      "tip": "Latih mengucapkan 'j' dengan sedikit desisan untuk mendapatkan suara 'ㅈ'."
    },
    "ㅊ": {
      "compare": "Bunyi 'ㅊ' mirip dengan huruf 'c' pada kata 'cinta', tetapi diucapkan dengan lebih kuat.",
      "tip": "Bayangkan 'ㅊ' adalah 'c' yang marah dan berteriak lebih keras."
    },
    "ㅋ": {
      "compare": "Bunyi 'ㅋ' sama dengan huruf 'k' pada kata 'kopi', tetapi diucapkan dengan lebih banyak hembusan nafas.",
      "tip": "Ucapkan 'k' sambil merasakan hembusan nafas di tanganmu."
    },
    "ㅌ": {
      "compare": "Bunyi 'ㅌ' sama dengan huruf 't' pada kata 'tikus', tetapi diucapkan dengan lebih banyak hembusan nafas.",
      "tip": "Ucapkan 't' sambil merasakan hembusan nafas di tanganmu."
    },
    "ㅍ": {
      "compare": "Bunyi 'ㅍ' sama dengan huruf 'p' pada kata 'pena', tetapi diucapkan dengan lebih banyak hembusan nafas.",
      "tip": "Ucapkan 'p' sambil merasakan hembusan nafas di tanganmu."
    },
    "ㅎ": {
      "compare": "Bunyi 'ㅎ' sama persis dengan huruf 'h' pada kata 'hati'.",
      "tip": "Bayangkan 'ㅎ' seperti hembusan nafas hangat."
    },
    "ㄲ": {
      "compare": "Bunyi 'ㄲ' adalah versi tegang (tensed/stressed) dari 'ㄱ'. Ucapkan 'k' dengan lebih kuat dan tanpa hembusan nafas.",
      "tip": "Ucapkan 'kopi' dengan menekan lidah lebih kuat di langit-langit mulut."
    },
    "ㄸ": {
      "compare": "Bunyi 'ㄸ' adalah versi tegang (tensed/stressed) dari 'ㄷ'. Ucapkan 't' dengan lebih kuat dan tanpa hembusan nafas.",
      "tip": "Ucapkan 'tikus' dengan menekan lidah lebih kuat di langit-langit mulut."
    },
    "ㅃ": {
      "compare": "Bunyi 'ㅃ' adalah versi tegang (tensed/stressed) dari 'ㅂ'. Ucapkan 'p' dengan lebih kuat dan tanpa hembusan nafas.",
      "tip": "Ucapkan 'pena' dengan menekan bibir lebih kuat."
    },
    "ㅆ": {
      "compare": "Bunyi 'ㅆ' adalah versi tegang (tensed/stressed) dari 'ㅅ'. Ucapkan 's' dengan lebih kuat.",
      "tip": "Ucapkan 'susu' dengan lebih banyak desisan."
    },
    "ㅉ": {
      "compare": "Bunyi 'ㅉ' adalah versi tegang (tensed/stressed) dari 'ㅈ'. Ucapkan 'j' dengan lebih kuat.",
      "tip": "Ucapkan 'jendela' dengan lebih penekanan."
    },
    "ㅏ": {
      "compare": "Bunyi 'ㅏ' sama persis dengan huruf 'a' pada kata 'ayah'.",
      "tip": "Buka mulut lebar saat mengucapkan 'ㅏ'."
    },
    "ㅑ": {
      "compare": "Bunyi 'ㅑ' seperti gabungan 'y' dan 'a' pada kata 'yak'.",
      "tip": "Ucapkan 'ya' dengan cepat."
    },
    "ㅓ": {
      "compare": "Bunyi 'ㅓ' mirip dengan suara 'e' pada kata 'emas', tetapi lidah lebih rileks.",
      "tip": "Ucapkan 'e' tetapi dengan bibir sedikit lebih bulat."
    },
    "ㅕ": {
      "compare": "Bunyi 'ㅕ' seperti gabungan 'y' dan 'e' pada kata 'yellow' (dalam pengucapan Bahasa Inggris).",
      "tip": "Ucapkan 'ye' seperti 'yeah' dalam Bahasa Inggris."
    },
    "ㅗ": {
      "compare": "Bunyi 'ㅗ' sama persis dengan huruf 'o' pada kata 'bola'.",
      "tip": "Bentuk bibir bulat saat mengucapkan 'ㅗ'."
    },
    "ㅛ": {
      "compare": "Bunyi 'ㅛ' seperti gabungan 'y' dan 'o' pada kata 'yoyo'.",
      "tip": "Ucapkan 'yo' dengan cepat."
    },
    "ㅜ": {
      "compare": "Bunyi 'ㅜ' sama persis dengan huruf 'u' pada kata 'ibu'.",
      "tip": "Kerucutkan bibir saat mengucapkan 'ㅜ'."
    },
    "ㅠ": {
      "compare": "Bunyi 'ㅠ' seperti gabungan 'y' dan 'u' pada kata 'yupi'.",
      "tip": "Ucapkan 'yu' dengan cepat."
    },
    "ㅡ": {
      "compare": "Bunyi 'ㅡ' mirip dengan suara antara 'u' dan 'e', tetapi tanpa membulatkan bibir (unrounded).",
      "tip": "Letakkan lidah di dasar mulut dan ucapkan suara 'u' tanpa membulatkan bibir."
    },
    "ㅣ": {
      "compare": "Bunyi 'ㅣ' sama persis dengan huruf 'i' pada kata 'ibu'.",
      "tip": "Tarik sudut bibir ke samping saat mengucapkan 'ㅣ'."
    },
    "ㅐ": {
      "compare": "Bunyi 'ㅐ' mirip dengan 'e' pada kata 'ember', tetapi sedikit lebih terbuka.",
      "tip": "Ucapkan 'e' tetapi sedikit lebih lebar."
    },
    "ㅒ": {
      "compare": "Bunyi 'ㅒ' adalah gabungan 'y' dan 'ㅐ'. Mirip seperti 'yeh' (dalam pengucapan informal).",
      "tip": "Ucapkan 'yae' dengan cepat, seperti 'yeah'."
    },
    "ㅔ": {
      "compare": "Bunyi 'ㅔ' mirip dengan 'e' pada kata 'ember'.",
      "tip": "Ucapkan 'e' seperti biasa."
    },
    "ㅖ": {
      "compare": "Bunyi 'ㅖ' adalah gabungan 'y' dan 'ㅔ'. Mirip seperti 'yeh'.",
      "tip": "Ucapkan 'ye' dengan cepat."
    },
    "ㅘ": {
      "compare": "Bunyi 'ㅘ' adalah gabungan 'ㅗ' dan 'ㅏ'. Ucapkan 'wa'.",
      "tip": "Ucapkan 'o' diikuti 'a' dengan cepat."
    },
    "ㅙ": {
      "compare": "Bunyi 'ㅙ' adalah gabungan 'ㅗ' dan 'ㅐ'. Mirip 'weh'.",
      "tip": "Ucapkan 'o' diikuti 'e' (seperti ember) dengan cepat."
    },
    "ㅚ": {
      "compare": "Bunyi 'ㅚ' modern terdengar mirip dengan 'ㅙ' dan 'ㅞ', yaitu 'weh'.",
      "tip": "Ucapkan 'o' diikuti 'e' (seperti ember) dengan cepat."
    },
    "ㅝ": {
      "compare": "Bunyi 'ㅝ' adalah gabungan 'ㅜ' dan 'ㅓ'. Ucapkan 'wo'.",
      "tip": "Ucapkan 'u' diikuti 'e' (seperti emas) dengan cepat."
    },
    "ㅞ": {
      "compare": "Bunyi 'ㅞ' adalah gabungan 'ㅜ' dan 'ㅔ'. Mirip 'weh'.",
      "tip": "Ucapkan 'u' diikuti 'e' (seperti ember) dengan cepat."
    },
    "ㅟ": {
      "compare": "Bunyi 'ㅟ' adalah gabungan 'ㅜ' dan 'ㅣ'. Ucapkan 'wi'.",
      "tip": "Ucapkan 'u' diikuti 'i' dengan cepat."
    },
    "ㅢ": {
      "compare": "Bunyi 'ㅢ' bisa bervariasi. Sering terdengar seperti 'eu-i', 'e', atau 'i', tergantung pada kata.",
      "tip": "Latih mengucapkan 'eu' (seperti 'ㅡ') diikuti 'i' dengan cepat."
    }
  },
  "ar": {
    "ㄱ": {
      "compare": "يشبه صوت حرف 'ق' في كلمة 'قلم' ولكن قد يكون أخف في بعض الأحيان.",
      "tip": "تخيل شكل الحرف كأنه زاوية قائمة، فكر في 'ق' الزاوية."
    },
    "ㄴ": {
      "compare": "يشبه صوت حرف 'ن' في كلمة 'نجم'.",
      "tip": "الحرف يشبه نصف قمر، تذكر كلمة 'نصف' تبدأ بحرف 'ن'."
    },
    "ㄷ": {
      "compare": "يشبه صوت حرف 'د' في كلمة 'دجاجة' ولكن قد يكون أقرب إلى 'ت' في بعض الحالات.",
      "tip": "تخيل الحرف كباب صغير، فكر في 'د' الباب."
    },
    "ㄹ": {
      "compare": "صوته بين 'ر' و 'ل'. حاول نطق 'ر' بشكل خفيف، أو 'ل' بلمسة خفيفة.",
      "tip": "تخيل الحرف كلسان يرتفع وينخفض، حاول أن ترقق صوت 'ر' أو 'ل'."
    },
    "ㅁ": {
      "compare": "يشبه صوت حرف 'م' في كلمة 'ماء'.",
      "tip": "الحرف مربع، تذكر 'مربع' تبدأ بحرف 'م'."
    },
    "ㅂ": {
      "compare": "يشبه صوت حرف 'ب' في كلمة 'بيت' ولكن قد يكون أقرب إلى 'پ' في بعض الحالات.",
      "tip": "تخيل الحرف كفم مغلق، فكر في 'ب' فم."
    },
    "ㅅ": {
      "compare": "يشبه صوت حرف 'س' في كلمة 'شمس'.",
      "tip": "تخيل الحرف كأنه خط منحدر، فكر في 'س' منحدر."
    },
    "ㅇ": {
      "compare": "صامت في بداية المقطع الصوتي، لكن يُنطق 'ng' في نهاية المقطع، مثل نهاية كلمة 'song' بالإنجليزية.",
      "tip": "دائرة صامتة في البداية، 'ng' في النهاية كأغنية."
    },
    "ㅈ": {
      "compare": "يشبه صوت 'ج' المصرية أو 'ج' الإنجليزية في كلمة 'jam'.",
      "tip": "تخيل الحرف كخطاف صيد، فكر في 'ج' صيد."
    },
    "ㅊ": {
      "compare": "يشبه صوت 'تش' في كلمة 'تشيكن' الإنجليزية أو 'ج' مع نفخة هواء.",
      "tip": "هو 'ㅈ' مع خط إضافي، زد النفخة الهوائية."
    },
    "ㅋ": {
      "compare": "يشبه صوت حرف 'ك' في كلمة 'كتاب' مع نفخة هواء.",
      "tip": "هو 'ㄱ' مع خط إضافي، زد النفخة الهوائية."
    },
    "ㅌ": {
      "compare": "يشبه صوت حرف 'ت' في كلمة 'تمر' مع نفخة هواء.",
      "tip": "هو 'ㄷ' مع خط إضافي، زد النفخة الهوائية."
    },
    "ㅍ": {
      "compare": "يشبه صوت حرف 'ب' في كلمة 'باب' مع نفخة هواء.",
      "tip": "هو 'ㅂ' مع خط إضافي، زد النفخة الهوائية."
    },
    "ㅎ": {
      "compare": "يشبه صوت حرف 'ه' في كلمة 'هواء'.",
      "tip": "تخيل الحرف كقبعة، فكر في 'ه' قبعة."
    },
    "ㄲ": {
      "compare": "هو حرف 'ㄱ' ولكن مشدد، أنطقه بقوة أكبر كأنك تضغط عليه.",
      "tip": "ضعف صوت 'ㄱ'، اضغط بقوة!"
    },
    "ㄸ": {
      "compare": "هو حرف 'ㄷ' ولكن مشدد، أنطقه بقوة أكبر كأنك تضغط عليه.",
      "tip": "ضعف صوت 'ㄷ'، اضغط بقوة!"
    },
    "ㅃ": {
      "compare": "هو حرف 'ㅂ' ولكن مشدد، أنطقه بقوة أكبر كأنك تضغط عليه.",
      "tip": "ضعف صوت 'ㅂ'، اضغط بقوة!"
    },
    "ㅆ": {
      "compare": "هو حرف 'ㅅ' ولكن مشدد، أنطقه بقوة أكبر كأنك تضغط عليه.",
      "tip": "ضعف صوت 'ㅅ'، اضغط بقوة!"
    },
    "ㅉ": {
      "compare": "هو حرف 'ㅈ' ولكن مشدد، أنطقه بقوة أكبر كأنك تضغط عليه.",
      "tip": "ضعف صوت 'ㅈ'، اضغط بقوة!"
    },
    "ㅏ": {
      "compare": "يشبه صوت حرف 'أ' في كلمة 'أب'.",
      "tip": "تخيل الشمس تشرق، فكر في 'أ' الشمس."
    },
    "ㅑ": {
      "compare": "يشبه صوت 'يا' في كلمة 'يا هلا'.",
      "tip": "أضف 'ي' قبل 'ㅏ' يصبح 'ㅑ'."
    },
    "ㅓ": {
      "compare": "لا يوجد صوت مطابق تمامًا، حاول فتح فمك بشكل أقل من نطق 'أ'.",
      "tip": "فمك شبه مغلق عند نطق هذا الحرف."
    },
    "ㅕ": {
      "compare": "يشبه صوت 'يو' في كلمة 'يوم'.",
      "tip": "أضف 'ي' قبل 'ㅓ' يصبح 'ㅕ'."
    },
    "ㅗ": {
      "compare": "يشبه صوت حرف 'و' في كلمة 'ورد'.",
      "tip": "تخيل الحرف كحرف 'و' مقلوب."
    },
    "ㅛ": {
      "compare": "يشبه صوت 'يو' في كلمة 'يوسف'.",
      "tip": "أضف 'ي' قبل 'ㅗ' يصبح 'ㅛ'."
    },
    "ㅜ": {
      "compare": "يشبه صوت حرف 'و' المضمومة في كلمة 'وجود'.",
      "tip": "تخيل الحرف كحرف 'و' صغير."
    },
    "ㅠ": {
      "compare": "يشبه صوت 'يو' المضمومة في كلمة 'يونس'.",
      "tip": "أضف 'ي' قبل 'ㅜ' يصبح 'ㅠ'."
    },
    "ㅡ": {
      "compare": "لا يوجد صوت مطابق تمامًا، حاول نطق صوت بين 'إ' و 'أ' مع عدم تدوير الشفاه.",
      "tip": "حافظ على استقامة شفتيك عند النطق."
    },
    "ㅣ": {
      "compare": "يشبه صوت حرف 'ي' في كلمة 'يمين'.",
      "tip": "خط مستقيم يشبه حرف 'ي'."
    },
    "ㅐ": {
      "compare": "يشبه صوت 'e' في كلمة 'bed' الإنجليزية أو فتحة خفيفة.",
      "tip": "افتح فمك قليلاً عند نطق 'أ' لصنع 'ㅐ'."
    },
    "ㅒ": {
      "compare": "يشبه صوت 'ياي' (ياء + فتحة خفيفة).",
      "tip": "أضف 'ي' قبل 'ㅐ' يصبح 'ㅒ'."
    },
    "ㅔ": {
      "compare": "يشبه صوت 'e' في كلمة 'bed' الإنجليزية أو فتحة خفيفة. (نفس صوت ㅐ)",
      "tip": "صوته مطابق لصوت 'ㅐ'."
    },
    "ㅖ": {
      "compare": "يشبه صوت 'ياي' (ياء + فتحة خفيفة). (نفس صوت ㅒ)",
      "tip": "صوته مطابق لصوت 'ㅒ'."
    },
    "ㅘ": {
      "compare": "مركب من 'ㅗ' و 'ㅏ'، ينطق 'وا'.",
      "tip": "انطق 'و' ثم 'أ' بسرعة."
    },
    "ㅙ": {
      "compare": "مركب من 'ㅗ' و 'ㅐ'، ينطق 'واي'.",
      "tip": "انطق 'و' ثم 'اي' بسرعة."
    },
    "ㅚ": {
      "compare": "مركب من 'ㅗ' و 'ㅣ'، ينطق 'واي'. (نفس صوت ㅙ)",
      "tip": "صوته مشابه لصوت 'ㅙ'."
    },
    "ㅝ": {
      "compare": "مركب من 'ㅜ' و 'ㅓ'، ينطق 'وُ'.",
      "tip": "انطق 'و' المضمومة ثم 'أ' خفيفة بسرعة."
    },
    "ㅞ": {
      "compare": "مركب من 'ㅜ' و 'ㅔ'، ينطق 'وي'. (نفس صوت ㅚ, ㅙ)",
      "tip": "صوته مشابه لصوت 'ㅚ' و 'ㅙ'."
    },
    "ㅟ": {
      "compare": "مركب من 'ㅜ' و 'ㅣ'، ينطق 'وي'. (نفس صوت ㅞ, ㅚ, ㅙ)",
      "tip": "صوته مشابه لصوت 'ㅞ' و 'ㅚ' و 'ㅙ'."
    },
    "ㅢ": {
      "compare": "مركب من 'ㅡ' و 'ㅣ'، ينطق 'أُيْ'.",
      "tip": "انطق 'أُ' خفيفة ثم 'ي' بسرعة."
    }
  }
};
