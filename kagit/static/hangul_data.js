const HANGUL = {
    CHOSUNG: ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'],
    JUNGSUNG: ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'],
    JONGSUNG: ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'],

    BASE: 0xAC00,
    CHOSUNG_COUNT: 19,
    JUNGSUNG_COUNT: 21,
    JONGSUNG_COUNT: 28,

    compose(cho, jung, jong) {
        const choIdx = this.CHOSUNG.indexOf(cho);
        const jungIdx = this.JUNGSUNG.indexOf(jung);
        const jongIdx = jong ? this.JONGSUNG.indexOf(jong) : 0;
        if (choIdx < 0 || jungIdx < 0 || jongIdx < 0) return null;
        return String.fromCharCode(this.BASE + (choIdx * this.JUNGSUNG_COUNT + jungIdx) * this.JONGSUNG_COUNT + jongIdx);
    },

    decompose(char) {
        const code = char.charCodeAt(0) - this.BASE;
        if (code < 0 || code > 11171) return null;
        const jong = code % this.JONGSUNG_COUNT;
        const jung = ((code - jong) / this.JONGSUNG_COUNT) % this.JUNGSUNG_COUNT;
        const cho = Math.floor((code - jong) / this.JONGSUNG_COUNT / this.JUNGSUNG_COUNT);
        return {
            cho: this.CHOSUNG[cho],
            jung: this.JUNGSUNG[jung],
            jong: jong > 0 ? this.JONGSUNG[jong] : null
        };
    },

    isChosung(ch) { return this.CHOSUNG.includes(ch); },
    isJungsung(ch) { return this.JUNGSUNG.includes(ch); },
    isJongsung(ch) { return this.JONGSUNG.includes(ch) && ch !== ''; },

    BASIC_CONSONANTS: [
        { char: 'ㄱ', name: '기역', roman: 'giyeok', sound: 'g/k', example: '가방', exampleRoman: 'gabang', exampleMeaning: 'bag' },
        { char: 'ㄴ', name: '니은', roman: 'nieun', sound: 'n', example: '나무', exampleRoman: 'namu', exampleMeaning: 'tree' },
        { char: 'ㄷ', name: '디귿', roman: 'digeut', sound: 'd/t', example: '다리', exampleRoman: 'dari', exampleMeaning: 'bridge/leg' },
        { char: 'ㄹ', name: '리을', roman: 'rieul', sound: 'r/l', example: '라면', exampleRoman: 'ramyeon', exampleMeaning: 'ramen' },
        { char: 'ㅁ', name: '미음', roman: 'mieum', sound: 'm', example: '물', exampleRoman: 'mul', exampleMeaning: 'water' },
        { char: 'ㅂ', name: '비읍', roman: 'bieup', sound: 'b/p', example: '바다', exampleRoman: 'bada', exampleMeaning: 'sea' },
        { char: 'ㅅ', name: '시옷', roman: 'siot', sound: 's', example: '사랑', exampleRoman: 'sarang', exampleMeaning: 'love' },
        { char: 'ㅇ', name: '이응', roman: 'ieung', sound: 'ng/silent', example: '아기', exampleRoman: 'agi', exampleMeaning: 'baby' },
        { char: 'ㅈ', name: '지읒', roman: 'jieut', sound: 'j', example: '자동차', exampleRoman: 'jadongcha', exampleMeaning: 'car' },
        { char: 'ㅊ', name: '치읓', roman: 'chieut', sound: 'ch', example: '치킨', exampleRoman: 'chikin', exampleMeaning: 'chicken' },
        { char: 'ㅋ', name: '키읔', roman: 'kieuk', sound: 'k', example: '커피', exampleRoman: 'keopi', exampleMeaning: 'coffee' },
        { char: 'ㅌ', name: '티읕', roman: 'tieut', sound: 't', example: '토끼', exampleRoman: 'tokki', exampleMeaning: 'rabbit' },
        { char: 'ㅍ', name: '피읖', roman: 'pieup', sound: 'p', example: '피아노', exampleRoman: 'piano', exampleMeaning: 'piano' },
        { char: 'ㅎ', name: '히읗', roman: 'hieut', sound: 'h', example: '하늘', exampleRoman: 'haneul', exampleMeaning: 'sky' },
    ],

    DOUBLE_CONSONANTS: [
        { char: 'ㄲ', name: '쌍기역', roman: 'ssang-giyeok', sound: 'kk', example: '꽃', exampleRoman: 'kkot', exampleMeaning: 'flower' },
        { char: 'ㄸ', name: '쌍디귿', roman: 'ssang-digeut', sound: 'tt', example: '땅', exampleRoman: 'ttang', exampleMeaning: 'ground' },
        { char: 'ㅃ', name: '쌍비읍', roman: 'ssang-bieup', sound: 'pp', example: '빵', exampleRoman: 'ppang', exampleMeaning: 'bread' },
        { char: 'ㅆ', name: '쌍시옷', roman: 'ssang-siot', sound: 'ss', example: '쓰다', exampleRoman: 'sseuda', exampleMeaning: 'to write' },
        { char: 'ㅉ', name: '쌍지읒', roman: 'ssang-jieut', sound: 'jj', example: '짜장면', exampleRoman: 'jjajangmyeon', exampleMeaning: 'black bean noodles' },
    ],

    BASIC_VOWELS: [
        { char: 'ㅏ', name: '아', roman: 'a', sound: 'ah', example: '아빠', exampleRoman: 'appa', exampleMeaning: 'dad' },
        { char: 'ㅑ', name: '야', roman: 'ya', sound: 'yah', example: '야구', exampleRoman: 'yagu', exampleMeaning: 'baseball' },
        { char: 'ㅓ', name: '어', roman: 'eo', sound: 'uh', example: '어머니', exampleRoman: 'eomeoni', exampleMeaning: 'mother' },
        { char: 'ㅕ', name: '여', roman: 'yeo', sound: 'yuh', example: '여름', exampleRoman: 'yeoreum', exampleMeaning: 'summer' },
        { char: 'ㅗ', name: '오', roman: 'o', sound: 'oh', example: '오빠', exampleRoman: 'oppa', exampleMeaning: 'older brother' },
        { char: 'ㅛ', name: '요', roman: 'yo', sound: 'yoh', example: '요리', exampleRoman: 'yori', exampleMeaning: 'cooking' },
        { char: 'ㅜ', name: '우', roman: 'u', sound: 'oo', example: '우유', exampleRoman: 'uyu', exampleMeaning: 'milk' },
        { char: 'ㅠ', name: '유', roman: 'yu', sound: 'yoo', example: '유리', exampleRoman: 'yuri', exampleMeaning: 'glass' },
        { char: 'ㅡ', name: '으', roman: 'eu', sound: 'uh (unrounded)', example: '으악', exampleRoman: 'euak', exampleMeaning: 'yikes' },
        { char: 'ㅣ', name: '이', roman: 'i', sound: 'ee', example: '이름', exampleRoman: 'ireum', exampleMeaning: 'name' },
    ],

    COMPLEX_VOWELS: [
        { char: 'ㅐ', name: '애', roman: 'ae', sound: 'eh', example: '개', exampleRoman: 'gae', exampleMeaning: 'dog' },
        { char: 'ㅒ', name: '얘', roman: 'yae', sound: 'yeh', example: '얘기', exampleRoman: 'yaegi', exampleMeaning: 'story' },
        { char: 'ㅔ', name: '에', roman: 'e', sound: 'eh', example: '세계', exampleRoman: 'segye', exampleMeaning: 'world' },
        { char: 'ㅖ', name: '예', roman: 'ye', sound: 'yeh', example: '예쁘다', exampleRoman: 'yeppeuda', exampleMeaning: 'pretty' },
        { char: 'ㅘ', name: '와', roman: 'wa', sound: 'wah', example: '와인', exampleRoman: 'wain', exampleMeaning: 'wine' },
        { char: 'ㅙ', name: '왜', roman: 'wae', sound: 'weh', example: '왜', exampleRoman: 'wae', exampleMeaning: 'why' },
        { char: 'ㅚ', name: '외', roman: 'oe', sound: 'weh', example: '외국', exampleRoman: 'oeguk', exampleMeaning: 'foreign country' },
        { char: 'ㅝ', name: '워', roman: 'wo', sound: 'wuh', example: '원', exampleRoman: 'won', exampleMeaning: 'won (currency)' },
        { char: 'ㅞ', name: '웨', roman: 'we', sound: 'weh', example: '웨딩', exampleRoman: 'weding', exampleMeaning: 'wedding' },
        { char: 'ㅟ', name: '위', roman: 'wi', sound: 'wee', example: '위험', exampleRoman: 'wiheom', exampleMeaning: 'danger' },
        { char: 'ㅢ', name: '의', roman: 'ui', sound: 'eui', example: '의사', exampleRoman: 'uisa', exampleMeaning: 'doctor' },
    ],

    KEYBOARD_MAP: {
        'q': 'ㅂ', 'w': 'ㅈ', 'e': 'ㄷ', 'r': 'ㄱ', 't': 'ㅅ',
        'y': 'ㅛ', 'u': 'ㅕ', 'i': 'ㅑ', 'o': 'ㅐ', 'p': 'ㅔ',
        'a': 'ㅁ', 's': 'ㄴ', 'd': 'ㅇ', 'f': 'ㄹ', 'g': 'ㅎ',
        'h': 'ㅗ', 'j': 'ㅓ', 'k': 'ㅏ', 'l': 'ㅣ',
        'z': 'ㅋ', 'x': 'ㅌ', 'c': 'ㅊ', 'v': 'ㅍ',
        'b': 'ㅠ', 'n': 'ㅜ', 'm': 'ㅡ',
    },

    KEYBOARD_SHIFT_MAP: {
        'q': 'ㅃ', 'w': 'ㅉ', 'e': 'ㄸ', 'r': 'ㄲ', 't': 'ㅆ',
    },

    KEYBOARD_ROWS: [
        ['q','w','e','r','t','y','u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l'],
        ['z','x','c','v','b','n','m'],
    ],

    COMPOUND_JONGSUNG: {
        'ㄱㅅ': 'ㄳ', 'ㄴㅈ': 'ㄵ', 'ㄴㅎ': 'ㄶ',
        'ㄹㄱ': 'ㄺ', 'ㄹㅁ': 'ㄻ', 'ㄹㅂ': 'ㄼ',
        'ㄹㅅ': 'ㄽ', 'ㄹㅌ': 'ㄾ', 'ㄹㅍ': 'ㄿ', 'ㄹㅎ': 'ㅀ',
        'ㅂㅅ': 'ㅄ',
    },

    COMPOUND_JUNGSUNG: {
        'ㅗㅏ': 'ㅘ', 'ㅗㅐ': 'ㅙ', 'ㅗㅣ': 'ㅚ',
        'ㅜㅓ': 'ㅝ', 'ㅜㅔ': 'ㅞ', 'ㅜㅣ': 'ㅟ',
        'ㅡㅣ': 'ㅢ',
    },

    DECOMPOSE_COMPOUND_JONGSUNG: {
        'ㄳ': ['ㄱ','ㅅ'], 'ㄵ': ['ㄴ','ㅈ'], 'ㄶ': ['ㄴ','ㅎ'],
        'ㄺ': ['ㄹ','ㄱ'], 'ㄻ': ['ㄹ','ㅁ'], 'ㄼ': ['ㄹ','ㅂ'],
        'ㄽ': ['ㄹ','ㅅ'], 'ㄾ': ['ㄹ','ㅌ'], 'ㄿ': ['ㄹ','ㅍ'], 'ㅀ': ['ㄹ','ㅎ'],
        'ㅄ': ['ㅂ','ㅅ'],
    },

    KEYBOARD_LABELS: {
        en: {
            q:'Q',w:'W',e:'E',r:'R',t:'T',y:'Y',u:'U',i:'I',o:'O',p:'P',
            a:'A',s:'S',d:'D',f:'F',g:'G',h:'H',j:'J',k:'K',l:'L',
            z:'Z',x:'X',c:'C',v:'V',b:'B',n:'N',m:'M'
        },
        ja: {
            q:'た',w:'て',e:'い',r:'す',t:'か',y:'ん',u:'な',i:'に',o:'ら',p:'せ',
            a:'ち',s:'と',d:'し',f:'は',g:'き',h:'く',j:'ま',k:'の',l:'り',
            z:'つ',x:'さ',c:'そ',v:'ひ',b:'こ',n:'み',m:'も'
        },
        fr: {
            q:'A',w:'Z',e:'E',r:'R',t:'T',y:'Y',u:'U',i:'I',o:'O',p:'P',
            a:'Q',s:'S',d:'D',f:'F',g:'G',h:'H',j:'J',k:'K',l:'L',
            z:'W',x:'X',c:'C',v:'V',b:'B',n:'N',m:'M'
        },
        ar: {
            q:'ض',w:'ص',e:'ث',r:'ق',t:'ف',y:'غ',u:'ع',i:'ه',o:'خ',p:'ح',
            a:'ش',s:'س',d:'ي',f:'ب',g:'ل',h:'ا',j:'ت',k:'ن',l:'م',
            z:'ئ',x:'ء',c:'ؤ',v:'ر',b:'لا',n:'ى',m:'ة'
        },
    },
};
